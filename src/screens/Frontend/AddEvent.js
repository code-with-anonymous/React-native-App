import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../Api/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEvent() {
  const initialState = {
    eventName: "",
    eventDate: "",
    location: "",
    description: "",
  };

  const [eventData, setEventData] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  function getId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomNum}`;
  }

  const handleSubmit = async () => {
    if (isProcessing) return;

    const { eventName, eventDate, location, description } = eventData;

    if (!eventName.trim() || eventName.length < 3) {
      ToastAndroid.show("Please enter a valid event name.", ToastAndroid.SHORT);
      return;
    }

    if (!eventDate.trim()) {
      ToastAndroid.show("Please select an event date.", ToastAndroid.SHORT);
      return;
    }

    const formData = {
      eventName: eventName.trim(),
      eventDate,
      location,
      description,
      dateCreated: serverTimestamp(),
      id: getId(),
    };

    setIsProcessing(true);

    try {
      await setDoc(doc(firestore, "events", formData.id), formData);
      ToastAndroid.show("Event added successfully!", ToastAndroid.SHORT);
      setEventData(initialState);
      navigation.navigate("GetEvent");
    } catch (error) {
      console.error("Error adding event: ", error);
      ToastAndroid.show("Failed to add event.", ToastAndroid.SHORT);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setIsDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setEventData((prev) => ({ ...prev, eventDate: formattedDate }));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event name"
          value={eventData.eventName}
          onChangeText={(text) =>
            setEventData((prev) => ({ ...prev, eventName: text }))
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={[styles.input, styles.dateInput]}
          onPress={() => setIsDatePickerVisible(true)}
        >
          <Text style={styles.dateText}>
            {eventData.eventDate || "Select event date"}
          </Text>
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event location"
          value={eventData.location}
          onChangeText={(text) =>
            setEventData((prev) => ({ ...prev, location: text }))
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter event description"
          multiline
          numberOfLines={4}
          value={eventData.description}
          onChangeText={(text) =>
            setEventData((prev) => ({ ...prev, description: text }))
          }
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isProcessing}
      >
        <Text style={styles.submitButtonText}>
          {isProcessing ? "Adding..." : "Add Event"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    color: "#666",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});




