// user authentication

const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await apiClient.post('/api/verify-token', { token });
      return response.data.isValid; // Assume the server responds with { isValid: true/false }
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

module.exports ={getToken,verifyToken}