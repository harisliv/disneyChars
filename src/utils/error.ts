import type { INormalizedError } from '@/types';
import axios from 'axios';

export const handleError = (error: unknown): INormalizedError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return {
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        type: 'server',
        details: `HTTP ${error.response.status}: ${error.response.statusText}`
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: `Something went wrong: ${error.message}`,
      type: 'unknown',
      details: error.name !== 'Error' ? error.name : undefined
    };
  }

  if (typeof error === 'string') {
    return {
      message: `Something went wrong: ${error}`,
      type: 'unknown'
    };
  }

  return {
    message: 'An unexpected error occurred',
    type: 'unknown',
    details: String(error)
  };
};
