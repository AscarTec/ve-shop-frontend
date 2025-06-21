
export const authService = {
  logout: () => {
    // Clear any stored tokens or session data
    localStorage.removeItem('auth-token');
    // You can add more cleanup logic here
  },
};
