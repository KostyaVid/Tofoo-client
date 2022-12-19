const fetchError = async (res: Response) => {
  try {
    const { message } = await res.json();
    return message ? message : 'Unknown Error';
  } catch (err) {
    return 'Unknown Error';
  }
};

export default fetchError;
