import { useEffect, useState } from 'react';

export const useServerErrorForms = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
] => {
  const [serverError, setServerError] = useState<null | string>(null);
  useEffect(() => {
    if (serverError !== null) {
      setTimeout(() => {
        setServerError(null);
      }, 5000);
    }
  }, [serverError]);
  return [serverError, setServerError];
};
