// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, FlatList, Button, TextInput, Modal, Pressable } from 'react-native';
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { firestore } from '../../Api/firebase';

// const GetEvent = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventName, setUpdatedEventName] = useState('');
//   const [updatedEventDate, setUpdatedEventDate] = useState('');
//   const [updatedDescription, setUpdatedDescription] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterCategory, setFilterCategory] = useState('');

//   // Available categories and dates for filters
//   const categories = ['Music', 'Tech', 'Sports'];
//   const dates = [...new Set(events.map(event => event.eventDate))].sort();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchQuery, filterDate, filterCategory, events]);

//   const fetchEvents = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(firestore, 'events'));
//       const eventsList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setEvents(eventsList);
//       setFilteredEvents(eventsList);
//     } catch (err) {
//       console.error('Error fetching events:', err.message);
//     }
//   };

//   const applyFilters = () => {
//     let updatedList = events;

//     if (searchQuery) {
//       updatedList = updatedList.filter((event) =>
//         event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (filterDate) {
//       updatedList = updatedList.filter((event) => event.eventDate === filterDate);
//     }

//     if (filterCategory) {
//       updatedList = updatedList.filter((event) => event.category === filterCategory);
//     }

//     setFilteredEvents(updatedList);
//   };

//   const clearFilters = () => {
//     setFilterDate('');
//     setFilterCategory('');
//     setSearchQuery('');
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, 'events', id));
//       setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
//     } catch (err) {
//       console.error('Failed to delete event:', err.message);
//     }
//   };

//   const handleEdit = (event) => {
//     setSelectedEvent(event);
//     setUpdatedEventName(event.eventName);
//     setUpdatedEventDate(event.eventDate);
//     setUpdatedDescription(event.description);
//     setModalVisible(true);
//   };

//   const handleSave = async () => {
//     if (!selectedEvent) return;

//     try {
//       const eventDoc = doc(firestore, 'events', selectedEvent.id);
//       await updateDoc(eventDoc, {
//         eventName: updatedEventName,
//         eventDate: updatedEventDate,
//         description: updatedDescription,
//       });

//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event.id === selectedEvent.id
//             ? { ...event, eventName: updatedEventName, eventDate: updatedEventDate, description: updatedDescription }
//             : event
//         )
//       );

//       setModalVisible(false);
//       setSelectedEvent(null);
//     } catch (err) {
//       console.error('Failed to update event:', err.message);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.eventCard}>
//       <Text style={styles.eventName}>{item.eventName}</Text>
//       <Text style={styles.eventDate}>Date: {item.eventDate}</Text>
//       <Text style={styles.eventCategory}>Category: {item.category}</Text>
//       <Text style={styles.eventDescription}>{item.description}</Text>

//       <View style={styles.actionButtons}>
//         <Button title="Edit" onPress={() => handleEdit(item)} />
//         <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Events</Text>

//       {/* Search and Filter Bar */}
//       <View style={styles.searchFilterContainer}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search events..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           <Pressable
//             style={styles.searchButton}
//             onPress={applyFilters}
//           >
//             <Text style={styles.buttonText}>Search</Text>
//           </Pressable>
//         </View>

//         <View style={styles.filterButtonsContainer}>
//           <Pressable
//             style={styles.filterButton}
//             onPress={() => setFilterModalVisible(true)}
//           >
//             <Text style={styles.buttonText}>Filters</Text>
//           </Pressable>
//           {(filterDate || filterCategory) && (
//             <Pressable
//               style={styles.clearButton}
//               onPress={clearFilters}
//             >
//               <Text style={styles.buttonText}>Clear Filters</Text>
//             </Pressable>
//           )}
//         </View>
//       </View>

//       {/* Active Filters Display */}
//       {(filterDate || filterCategory) && (
//         <View style={styles.activeFilters}>
//           {filterDate && (
//             <View style={styles.filterTag}>
//               <Text style={styles.filterTagText}>Date: {filterDate}</Text>
//             </View>
//           )}
//           {filterCategory && (
//             <View style={styles.filterTag}>
//               <Text style={styles.filterTagText}>Category: {filterCategory}</Text>
//             </View>
//           )}
//         </View>
//       )}

//       <FlatList
//         data={filteredEvents}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.filterModalContainer}>
//           <View style={styles.filterModalContent}>
//             <Text style={styles.modalTitle}>Filter Events</Text>

//             <Text style={styles.filterLabel}>Select Date</Text>
//             <View style={styles.filterOptions}>
//               {dates.map((date) => (
//                 <Pressable
//                   key={date}
//                   style={[
//                     styles.filterOption,
//                     filterDate === date && styles.filterOptionSelected
//                   ]}
//                   onPress={() => setFilterDate(date)}
//                 >
//                   <Text style={styles.filterOptionText}>{date}</Text>
//                 </Pressable>
//               ))}
//             </View>

//             <Text style={styles.filterLabel}>Select Category</Text>
//             <View style={styles.filterOptions}>
//               {categories.map((category) => (
//                 <Pressable
//                   key={category}
//                   style={[
//                     styles.filterOption,
//                     filterCategory === category && styles.filterOptionSelected
//                   ]}
//                   onPress={() => setFilterCategory(category)}
//                 >
//                   <Text style={styles.filterOptionText}>{category}</Text>
//                 </Pressable>
//               ))}
//             </View>

//             <View style={styles.modalButtons}>
//               <Button
//                 title="Apply Filters"
//                 onPress={() => {
//                   setFilterModalVisible(false);
//                   applyFilters();
//                 }}
//               />
//               <Button
//                 title="Cancel"
//                 onPress={() => setFilterModalVisible(false)}
//                 color="red"
//               />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Event Modal */}
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Edit Event</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Event Name"
//             value={updatedEventName}
//             onChangeText={setUpdatedEventName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Event Date"
//             value={updatedEventDate}
//             onChangeText={setUpdatedEventDate}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Description"
//             value={updatedDescription}
//             onChangeText={setUpdatedDescription}
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Save" onPress={handleSave} />
//             <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Button,
//   TextInput,
//   Modal,
//   Pressable,
// } from 'react-native';
// import axios from 'axios'; // Using axios to make HTTP requests

// const GetEvent = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [updatedEventName, setUpdatedEventName] = useState('');
//   const [updatedEventDate, setUpdatedEventDate] = useState('');
//   const [updatedDescription, setUpdatedDescription] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterDate, setFilterDate] = useState('');
//   const [filterCategory, setFilterCategory] = useState('');

//   // Available categories and dates for filters
//   const categories = ['All','Sports', 'Music', 'Tech', 'Workshop', 'Meetup'];
//   const dates = [...new Set(events.map(event => event.eventDate))].sort();

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [searchQuery, filterDate, filterCategory, events]);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(
//         'http://192.168.100.4:5001/api/readEvents',
//       ); // Replace with your API URL
//       setEvents(response.data);
//       setFilteredEvents(response.data);
//     } catch (err) {
//       console.error('Error fetching events:', err.message);
//     }
//   };

//   const applyFilters = () => {
//     let updatedList = events;

//     if (searchQuery) {
//       updatedList = updatedList.filter(event =>
//         event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
//       );
//     }

//     if (filterDate) {
//       updatedList = updatedList.filter(event => event.eventDate === filterDate);
//     }

//     if (filterCategory && filterCategory !== 'All') {
//       updatedList = updatedList.filter(
//         event => event.category === filterCategory,
//       );
//     }

//     setFilteredEvents(updatedList);
//   };

//   const clearFilters = () => {
//     setFilterDate('');
//     setFilterCategory('');
//     setSearchQuery('');
//   };

//   const handleDelete = async _id => {
//     console.log(_id); // Ensure _id is being passed correctly
//     try {
//       await axios.delete(`http://192.168.100.4:5001/api/deleteEvents/${_id}`); // Use _id in the URL
//       setEvents(prevEvents => prevEvents.filter(event => event._id !== _id)); // Use _id here as well
//     } catch (err) {
//       console.error('Failed to delete event:', err);
//     }
//   };

//   const handleEdit = event => {
//     setSelectedEvent(event);
//     setUpdatedEventName(event.eventName);
//     setUpdatedEventDate(event.eventDate);
//     setUpdatedDescription(event.description);
//     setModalVisible(true);
//   };

//   const handleSave = async () => {
//     if (!selectedEvent) return;

//     try {
//       await axios.put(
//         `http://192.168.100.4:5001/api/updateEvents/${selectedEvent._id}`,
//         {
//           // Replace with your API URL
//           eventName: updatedEventName,
//           eventDate: updatedEventDate,
//           description: updatedDescription,
//         },
//       );

//       setEvents(prevEvents =>
//         prevEvents.map(event =>
//           event.id === selectedEvent.id
//             ? {
//                 ...event,
//                 eventName: updatedEventName,
//                 eventDate: updatedEventDate,
//                 description: updatedDescription,
//               }
//             : event,
//         ),
//       );

//       setModalVisible(false);
//       setSelectedEvent(null);
//     } catch (err) {
//       console.error('Failed to update event:', err.message);
//     }
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.eventCard}>
//       <Text style={styles.eventName}>{item.eventName}</Text>
//       <Text style={styles.eventDate}>Date: {item.eventDate}</Text>
//       <Text style={styles.eventCategory}>Category: {item.category}</Text>
//       <Text style={styles.eventDescription}>{item.description}</Text>

//       <View style={styles.actionButtons}>
//         <Button title="Edit" onPress={() => handleEdit(item)} />
//         <Button
//           title="Delete"
//           onPress={() => handleDelete(item._id)}
//           color="red"
//         />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Events</Text>

//       {/* Search and Filter Bar */}
//       <View style={styles.searchFilterContainer}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search events..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//           <Pressable style={styles.searchButton} onPress={applyFilters}>
//             <Text style={styles.buttonText}>Search</Text>
//           </Pressable>
//         </View>

//         <View style={styles.filterButtonsContainer}>
//           <Pressable
//             style={styles.filterButton}
//             onPress={() => setFilterModalVisible(true)}>
//             <Text style={styles.buttonText}>Filters</Text>
//           </Pressable>
//           {(filterDate || filterCategory) && (
//             <Pressable style={styles.clearButton} onPress={clearFilters}>
//               <Text style={styles.buttonText}>Clear Filters</Text>
//             </Pressable>
//           )}
//         </View>
//       </View>

//       {/* Active Filters Display */}
//       {(filterDate || filterCategory) && (
//         <View style={styles.activeFilters}>
//           {filterDate && (
//             <View style={styles.filterTag}>
//               <Text style={styles.filterTagText}>Date: {filterDate}</Text>
//             </View>
//           )}
//           {filterCategory && (
//             <View style={styles.filterTag}>
//               <Text style={styles.filterTagText}>
//                 Category: {filterCategory}
//               </Text>
//             </View>
//           )}
//         </View>
//       )}

//       {filteredEvents.length === 0 ? (
//         <Text style={styles.noEventsText}>No events found.</Text>
//       ) : (
//         <FlatList
//           data={filteredEvents}
//           renderItem={renderItem}
//           keyExtractor={item => item._id.toString()} // Ensure each item has a unique key prop
//         />
//       )}

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         animationType="slide"
//         transparent={true}>
//         <View style={styles.filterModalContainer}>
//           <View style={styles.filterModalContent}>
//             <Text style={styles.modalTitle}>Filter Events</Text>

//             <Text style={styles.filterLabel}>Select Date</Text>
//             <View style={styles.filterOptions}>
//               {dates.map(date => (
//                 <Pressable
//                   key={date}
//                   style={[
//                     styles.filterOption,
//                     filterDate === date && styles.filterOptionSelected,
//                   ]}
//                   onPress={() => setFilterDate(date)}>
//                   <Text style={styles.filterOptionText}>{date}</Text>
//                 </Pressable>
//               ))}
//             </View>

//             <Text style={styles.filterLabel}>Select Category</Text>
//             <View style={styles.filterOptions}>
//               {categories.map(category => (
//                 <Pressable
//                   key={category}
//                   style={[
//                     styles.filterOption,
//                     filterCategory === category && styles.filterOptionSelected,
//                   ]}
//                   onPress={() => setFilterCategory(category)}>
//                   <Text style={styles.filterOptionText}>{category}</Text>
//                 </Pressable>
//               ))}
//             </View>

//             <View style={styles.modalButtons}>
//               <Button
//                 title="Apply Filters"
//                 onPress={() => {
//                   setFilterModalVisible(false);
//                   applyFilters();
//                 }}
//               />
//               <Button
//                 title="Cancel"
//                 onPress={() => setFilterModalVisible(false)}
//                 color="red"
//               />
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Event Modal */}
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Edit Event</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Event Name"
//             value={updatedEventName}
//             onChangeText={setUpdatedEventName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Event Date"
//             value={updatedEventDate}
//             onChangeText={setUpdatedEventDate}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Description"
//             value={updatedDescription}
//             onChangeText={setUpdatedDescription}
//           />
//           <View style={styles.modalButtons}>
//             <Button title="Save" onPress={handleSave} />
//             <Button
//               title="Cancel"
//               onPress={() => setModalVisible(false)}
//               color="red"
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   searchFilterContainer: {
//     marginBottom: 15,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   searchInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     fontSize: 16,
//   },
//   searchButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     justifyContent: 'center',
//   },
//   filterButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   filterButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//   },
//   clearButton: {
//     backgroundColor: '#FF3B30',
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   activeFilters: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 15,
//   },
//   filterTag: {
//     backgroundColor: '#E5E5EA',
//     padding: 8,
//     borderRadius: 15,
//     marginRight: 10,
//     marginBottom: 5,
//   },
//   filterTagText: {
//     color: '#007AFF',
//     fontSize: 14,
//   },
//   filterModalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   filterModalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   filterLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   filterOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 15,
//   },
//   filterOption: {
//     backgroundColor: '#E5E5EA',
//     padding: 8,
//     borderRadius: 15,
//     marginRight: 10,
//     marginBottom: 8,
//   },
//   filterOptionSelected: {
//     backgroundColor: '#007AFF',
//   },
//   filterOptionText: {
//     color: '#000',
//     fontSize: 14,
//   },
//   eventCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   eventName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   eventDate: {
//     fontSize: 16,
//     color: '#666',
//     marginVertical: 5,
//   },
//   eventCategory: {
//     fontSize: 14,
//     color: '#888',
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 10,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   modalContent: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   noEventsText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginVertical: 20,
//     color: 'gray',
//   },
// });

// export default GetEvent;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const API_BASE_URL = 'http://192.168.100.3:5001/api';
const CATEGORIES = ['All', 'Sports', 'Music', 'Tech', 'Workshop', 'Meetup'];

const GetEvent = () => {
  // State Management
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Edit Form States
  const [editForm, setEditForm] = useState({
    eventName: '',
    eventDate: '',
    description: '',
  });

  // Available dates for filters
  const dates = [
    ...new Set(
      events.map(event =>
        new Date(event.eventDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      ),
    ),
  ].sort();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterDate, filterCategory, events]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/readEvents`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = event => {
    setSelectedEvent(event);
    setEditForm({
      eventName: event.eventName,
      eventDate: event.eventDate,
      description: event.description,
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!selectedEvent) return;

    try {
      await axios.put(
        `${API_BASE_URL}/updateEvents/${selectedEvent._id}`,
        editForm,
      );

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event._id === selectedEvent._id ? {...event, ...editForm} : event,
        ),
      );

      setModalVisible(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Failed to update event:', err.message);
    }
  };

  const handleDelete = async _id => {
    try {
      await axios.delete(`${API_BASE_URL}/deleteEvents/${_id}`);
      setEvents(prevEvents => prevEvents.filter(event => event._id !== _id));
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const applyFilters = () => {
    let updatedList = events;

    if (searchQuery) {
      updatedList = updatedList.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filterDate) {
      updatedList = updatedList.filter(event => event.eventDate === filterDate);
    }

    if (filterCategory && filterCategory !== 'All') {
      updatedList = updatedList.filter(
        event => event.category === filterCategory,
      );
    }

    setFilteredEvents(updatedList);
  };

  const clearFilters = () => {
    setFilterDate('');
    setFilterCategory('');
    setSearchQuery('');
  };

  const renderEventCard = ({item}) => (
    <View style={styles.eventCard}>
      {item.imageUrl && (
        <Image
          source={{uri: item.imageUrl}}
          style={styles.eventImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.eventContent}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.eventDate}>
          Date: {new Date(item.eventDate).toDateString()}
        </Text>
        <Text style={styles.eventCategory}>Category: {item.category}</Text>
        <Text style={styles.eventDescription} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEdit(item)}>
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item._id)}>
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEditModal = () => (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Edit Event</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Name</Text>
              <TextInput
                style={styles.input}
                value={editForm.eventName}
                onChangeText={text => handleEditFormChange('eventName', text)}
                placeholder="Event Name"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setIsDatePickerVisible(true)}>
                <Text style={styles.dateText}>
                  {editForm.eventDate
                    ? new Date(editForm.eventDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Select date'}
                </Text>
              </TouchableOpacity>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={
                    editForm.eventDate
                      ? new Date(editForm.eventDate)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setIsDatePickerVisible(false);
                    if (selectedDate) {
                      handleEditFormChange(
                        'eventDate',
                        selectedDate.toISOString().split('T')[0],
                      );
                    }
                  }}
                />
              )}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editForm.description}
                onChangeText={text => handleEditFormChange('description', text)}
                placeholder="Description"
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}>
                <Text style={styles.modalButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Events</Text>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}>
            <Text style={styles.buttonText}>Filters</Text>
          </TouchableOpacity>
          {(filterDate || filterCategory) && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.buttonText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {(filterDate || filterCategory) && (
        <View style={styles.activeFilters}>
          {filterDate && (
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>Date: {filterDate}</Text>
            </View>
          )}
          {filterCategory && (
            <View style={styles.filterTag}>
              <Text style={styles.filterTagText}>
                Category: {filterCategory}
              </Text>
            </View>
          )}
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : filteredEvents.length === 0 ? (
        <Text style={styles.noEventsText}>No events found.</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {renderEditModal()}

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModalContent}>
            <Text style={styles.modalTitle}>Filter Events</Text>

            <Text style={styles.filterLabel}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterOptions}>
                {dates.map(date => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.filterOption,
                      filterDate === date && styles.filterOptionSelected,
                    ]}
                    onPress={() => setFilterDate(date)}>
                    <Text
                      style={[
                        styles.filterOptionText,
                        filterDate === date && styles.filterOptionTextSelected,
                      ]}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={styles.filterLabel}>Select Category</Text>
            <View style={styles.filterOptions}>
              {CATEGORIES.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterOption,
                    filterCategory === category && styles.filterOptionSelected,
                  ]}
                  onPress={() => setFilterCategory(category)}>
                  <Text
                    style={[
                      styles.filterOptionText,
                      filterCategory === category &&
                        styles.filterOptionTextSelected,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  setFilterModalVisible(false);
                  applyFilters();
                }}>
                <Text style={styles.modalButtonText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main Container Styles
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  listContainer: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Search and Filter Styles
  searchFilterContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    height: 46,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FF5252',
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Event Card Styles
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  eventContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 14,
    color: '#2196F3',
    marginBottom: 8,
    fontWeight: '500',
  },
  eventDescription: {
    fontSize: 15,
    color: '#616161',
    lineHeight: 22,
    marginBottom: 16,
    scrollY: 'auto',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    color: '#757575',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#FF5252',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Filter Modal Styles
  filterModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginTop: 16,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterOption: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterOptionSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterOptionText: {
    color: '#616161',
    fontSize: 14,
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },

  // Active Filters Display
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterTag: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  filterTagText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  noEventsText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#757575',
  },
});

export default GetEvent;
