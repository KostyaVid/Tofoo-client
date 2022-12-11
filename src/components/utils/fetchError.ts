const fetchError = async (
  res: Response,
  setServerError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const errorData = await res.json();
  if (errorData?.massage) {
    setServerError(errorData.massage);
  } else {
    setServerError('Unknown Error');
  }
};

export default fetchError;
