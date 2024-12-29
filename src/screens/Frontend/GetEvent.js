import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Modal, Pressable } from 'react-native';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../Api/firebase';

const GetEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEventName, setUpdatedEventName] = useState('');
  const [updatedEventDate, setUpdatedEventDate] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  // Available categories and dates for filters
  const categories = ['Music', 'Tech', 'Sports'];
  const dates = [...new Set(events.map(event => event.eventDate))].sort();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterDate, filterCategory, events]);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'events'));
      const eventsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
      setFilteredEvents(eventsList);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    }
  };

  const applyFilters = () => {
    let updatedList = events;

    if (searchQuery) {
      updatedList = updatedList.filter((event) =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterDate) {
      updatedList = updatedList.filter((event) => event.eventDate === filterDate);
    }

    if (filterCategory) {
      updatedList = updatedList.filter((event) => event.category === filterCategory);
    }

    setFilteredEvents(updatedList);
  };

  const clearFilters = () => {
    setFilterDate('');
    setFilterCategory('');
    setSearchQuery('');
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
      <Text style={styles.eventDate}>Date: {item.eventDate}</Text>
      <Text style={styles.eventCategory}>Category: {item.category}</Text>
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
      
      {/* Search and Filter Bar */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable 
            style={styles.searchButton}
            onPress={applyFilters}
          >
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
        </View>
        
        <View style={styles.filterButtonsContainer}>
          <Pressable 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.buttonText}>Filters</Text>
          </Pressable>
          {(filterDate || filterCategory) && (
            <Pressable 
              style={styles.clearButton}
              onPress={clearFilters}
            >
              <Text style={styles.buttonText}>Clear Filters</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Active Filters Display */}
      {(filterDate || filterCategory) && (
        <View style={styles.activeFilters}>
          {filterDate && (
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Date: {filterDate}</Text>
            </View>
          )}
          {filterCategory && (
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Category: {filterCategory}</Text>
            </View>
          )}
        </View>
      )}

      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModalContent}>
            <Text style={styles.modalTitle}>Filter Events</Text>
            
            <Text style={styles.filterLabel}>Select Date</Text>
            <View style={styles.filterOptions}>
              {dates.map((date) => (
                <Pressable
                  key={date}
                  style={[
                    styles.filterOption,
                    filterDate === date && styles.filterOptionSelected
                  ]}
                  onPress={() => setFilterDate(date)}
                >
                  <Text style={styles.filterOptionText}>{date}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.filterLabel}>Select Category</Text>
            <View style={styles.filterOptions}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.filterOption,
                    filterCategory === category && styles.filterOptionSelected
                  ]}
                  onPress={() => setFilterCategory(category)}
                >
                  <Text style={styles.filterOptionText}>{category}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Button 
                title="Apply Filters" 
                onPress={() => {
                  setFilterModalVisible(false);
                  applyFilters();
                }}
              />
              <Button 
                title="Cancel" 
                onPress={() => setFilterModalVisible(false)} 
                color="red" 
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Event Modal */}
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
  searchFilterContainer: {
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  filterTag: {
    backgroundColor: '#E5E5EA',
    padding: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  filterTagText: {
    color: '#007AFF',
    fontSize: 14,
  },
  filterModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  filterOption: {
    backgroundColor: '#E5E5EA',
    padding: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    color: '#000',
    fontSize: 14,
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
  eventCategory: {
    fontSize: 14,
    color: '#888',
  },
  eventDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
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