import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

const API_BASE_URL = "http://192.168.100.3:5001/api";

const EnrolledEventsScreen = () => {
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await getToken();
        if (token) {
          const userInfo = await axios.get(`${API_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (userInfo.data.userId) {
            setUserId(userInfo.data.userId); // Assuming the response contains 'userId'
          } else {
            Alert.alert("Error", "User not found. Please log in again.");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Alert.alert("Error", "User not found. Please log in again.");
        } else {
          console.error("Error fetching user ID:", error);
          Alert.alert("Error", "Failed to fetch user information.");
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchEnrolledEvents = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const token = await getToken();
        const userResponse = await axios.get(
          `${API_BASE_URL}/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEnrolledEvents(userResponse.data);
        console.log("EnrolledEvents", userResponse.data); // Assuming the response contains 'enrolledEvents' field
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Alert.alert("Error", "No enrolled events found.");
        } else {
          console.error("Error fetching enrolled events:", error);
          Alert.alert("Error", "Failed to fetch enrolled events.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledEvents();
  }, [userId]); // Trigger when userId changes

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  const confirmCancelEnrollment = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCancelEnrollment = async () => {
    if (!selectedEvent) return;

    try {
      setLoading(true);
      const token = await getToken();
      await axios.delete(`${API_BASE_URL}/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEnrolledEvents((prev) =>
        prev.filter((event) => event._id !== selectedEvent._id)
      );
      Alert.alert("Success", "Enrollment canceled successfully.");
    } catch (error) {
      console.error("Error canceling enrollment:", error);
      Alert.alert("Error", "Failed to cancel enrollment.");
    } finally {
      setLoading(false);
      setModalVisible(false);
      setSelectedEvent(null);
    }
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.eventId.eventName}</Text>
        <Text style={styles.eventMeta}>Location: {item.eventId.location}</Text>
        <Text style={styles.eventMeta}>
          Date: {format(new Date(item.eventId.eventDate), "eeee, MMMM d, yyyy")}
        </Text>
        <Text style={styles.eventMeta}>
          Enrolled At: {format(new Date(item.enrolledAt), "eeee, MMMM d, yyyy")}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => confirmCancelEnrollment(item)}
      >
        <Text style={styles.cancelButtonText}>Cancel Enrollment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Enrolled Events</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : enrolledEvents.length ? (
        <FlatList
          data={enrolledEvents}
          keyExtractor={(item) => item._id}
          renderItem={renderEvent}
        />
      ) : (
        <Text style={styles.noEventsText}>No enrolled events found.</Text>
      )}

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to cancel enrollment for "
              {selectedEvent?.eventId?.eventName}"?
            </Text>
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#888"
              />
              <Button
                title="Confirm"
                onPress={handleCancelEnrollment}
                color="#d9534f"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f8",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  eventDetails: {
    flex: 1,
    marginRight: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#2c3e50",
  },
  eventMeta: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  noEventsText: {
    fontSize: 18,
    textAlign: "center",
    color: "#95a5a6",
    marginTop: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
    color: "#34495e",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});


export default EnrolledEventsScreen;
