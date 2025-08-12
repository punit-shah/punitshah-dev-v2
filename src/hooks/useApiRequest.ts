import { useState } from 'react';

class HttpError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = 'HttpError';
    this.response = response;
  }
}

type UseApiRequestOptions<ResponseData> = {
  onSuccess?: (data: ResponseData) => void;
  onError?: (error: unknown) => void;
  testResult?: 'success' | 'error';
};

export type Status = 'idle' | 'loading' | 'success' | 'error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApiRequest = <RequestBody = any, ResponseData = any>(
  url: string,
  method: string,
  { onSuccess, onError, testResult }: UseApiRequestOptions<ResponseData> = {},
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ResponseData | null>(null);

  const sendRequest = async (body?: RequestBody) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    if (testResult) {
      setTimeout(() => {
        setIsLoading(false);
        if (testResult === 'error') {
          setIsError(true);
          onError?.(new Error('Test error'));
        }
        if (testResult === 'success') {
          setIsSuccess(true);
          const responseData = { message: 'Test success' } as ResponseData;
          setData(responseData);
          onSuccess?.(responseData);
        }
      }, 2000);
      return;
    }

    try {
      const response = await fetch(url, {
        method,
        body: body && JSON.stringify(body),
        headers: body ? { 'Content-Type': 'application/json' } : {},
      });
      if (!response.ok) throw new HttpError('Failed to fetch', response);

      const responseData = (await response.json()) as ResponseData;
      setData(responseData);
      setIsSuccess(true);
      setIsLoading(false);
      onSuccess?.(responseData);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message, error.response);
      } else {
        console.error('Unexpected Error:', error);
      }
      setIsError(true);
      setIsLoading(false);
      onError?.(error);
    }
  };

  let status: Status = 'idle';
  if (isLoading) status = 'loading';
  if (isError) status = 'error';
  if (isSuccess) status = 'success';

  return { sendRequest, isLoading, isError, isSuccess, data, status };
};

export default useApiRequest;
