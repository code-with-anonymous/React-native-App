import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Modal } from 'react-native';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../Api/firebase';

const GetEvent = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState('');
  const [updatedEventDate, setUpdatedEventDate] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'events'));
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'events', id));
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err.message);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setUpdatedEventName(event.eventName);
    setUpdatedEventDate(event.eventDate);
    setUpdatedDescription(event.description);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!selectedEvent) return;

    try {
      const eventDoc = doc(firestore, 'events', selectedEvent.id);
      await updateDoc(eventDoc, {
        eventName: updatedEventName,
        eventDate: updatedEventDate,
        description: updatedDescription,
      });

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, eventName: updatedEventName, eventDate: updatedEventDate, description: updatedDescription }
            : event
        )
      );

      setModalVisible(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Failed to update event:', err.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventName}>{item.eventName}</Text>
      <Text style={styles.eventDate}>{item.eventDate}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>

      <View style={styles.actionButtons}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={updatedEventName}
            onChangeText={setUpdatedEventName}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Date"
            value={updatedEventDate}
            onChangeText={setUpdatedEventDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={updatedDescription}
            onChangeText={setUpdatedDescription}
          />
          <View style={styles.modalButtons}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default GetEvent;
