import AsyncStorage from "@react-native-async-storage/async-storage";
// user authentication
const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };
  const fetchUserData = async () => {
    const token = await getToken(); // Fetch token here
    if (!token) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    try {
      const response = await axios.get("http://192.168.100.3:5001/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token for Authorization
        },
      });
      setUser(response.data);
      console.log(response.data) // Store the user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);
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

  module.exports ={getToken,verifyToken,fetchUserData}


