import type { ReactNode } from 'react';

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  visuals: ReactNode[];
};
