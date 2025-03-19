import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you import AsyncStorage

// API base URL (replace with your backend's address)
const API_BASE_URL = "http://192.168.100.3:5001/api";

const EnrollmentModal = ({ visible, onClose, eventId, onEnrollSuccess }) => {
  // State for form fields and user data
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data after component mounts
  useEffect(() => {
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

    fetchUserData();
  }, []);

  // Function to retrieve JWT token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Fetch the token
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  // Handle the enrollment process
  const handleEnroll = async () => {
    if (!username || !email) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User data not available.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/enroll`, {
        eventId,
        username,
        email,
        userId: user.userId, // Use user._id for enrollment
      });
      Alert.alert("Success", "Enrollment successful!");
      onEnrollSuccess(); // Notify parent component
      onClose(); // Close the modal
      // navigation.navigate('EnrolledEventsScreen');
        } 
      catch (error) {
      console.error("Error during enrollment:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Enrollment failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Enroll in Event</Text>

        {/* Username Input */}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} color="red" />
          <Button
            title={isSubmitting ? "Submitting..." : "Enroll"}
            onPress={handleEnroll} // Pass the function to onPress
            disabled={isSubmitting || !user} // Disable button if user is not fetched yet
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
});

export default EnrollmentModal;
