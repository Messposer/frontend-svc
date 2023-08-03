import { useState } from 'react';

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const withLoading = async (promise: Promise<any>): Promise<any> => {
    setLoading(true);
    try {
      const result = await promise;
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return [loading, withLoading] as const; // Return as a tuple
};
