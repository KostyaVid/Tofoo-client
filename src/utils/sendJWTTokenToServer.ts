const sendJWTTokenToServer = async (JWTToken: string | null | undefined) => {
  if (!JWTToken) JWTToken = localStorage.getItem('JWTToken');
  if (JWTToken) {
    const resAuth = await fetch('/api/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JWTToken}` },
    });
    if (resAuth.status === 200) return true;

    if (resAuth.status >= 400 && resAuth.status < 500) {
      const { message } = await resAuth.json();
      throw new Error(message);
    }
    if (resAuth.status >= 500) throw new Error(`Server error: ${resAuth.statusText}`);
  }
  return false;
};

export default sendJWTTokenToServer;
