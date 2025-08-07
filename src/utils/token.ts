export const getToken = (): string | null => {
    return localStorage.getItem('access_token');
  };
  
  export const clearToken = () => {
    localStorage.removeItem('access_token');
  };
  