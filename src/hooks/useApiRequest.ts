import { useState } from 'react';

class HttpError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = 'HttpError';
    this.response = response;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApiRequest = <RequestBody = any, ResponseData = any>(
  url: string,
  method: string,
  isTesting = false,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<ResponseData | null>(null);

  const apiRequest = async (body?: RequestBody) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    if (isTesting) {
      setTimeout(() => {
        setData({ message: 'Test successful' } as ResponseData);
        setIsSuccess(true);
        setIsLoading(false);
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
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message, error.response);
      } else {
        console.error('Unexpected Error:', error);
      }
      setIsError(true);
      setIsLoading(false);
    }
  };

  return { apiRequest, isLoading, isError, isSuccess, data };
};

export default useApiRequest;
