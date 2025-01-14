// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   StyleSheet,
//   Modal,
// } from "react-native";
// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { firestore } from "../../Api/firebase";
// import DateTimePicker from "@react-native-community/datetimepicker";

// export default function AddEvent() {
//   const initialState = {
//     eventName: "",
//     eventDate: "",
//     location: "",
//     description: "",
//     category: "", // Added category field
//   };

//   const [eventData, setEventData] = useState(initialState);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//   const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
//   const navigation = useNavigation();

//   // Predefined categories
//   const categories = ["Music", "Tech", "Sports", "Art", "Business"];

//   function getId() {
//     const timestamp = Date.now();
//     const randomNum = Math.floor(Math.random() * 1000);
//     return `${timestamp}-${randomNum}`;
//   }

//   const handleSubmit = async () => {
//     if (isProcessing) return;

//     const { eventName, eventDate, location, description, category } = eventData;

//     if (!eventName.trim() || eventName.length < 3) {
//       ToastAndroid.show("Please enter a valid event name.", ToastAndroid.SHORT);
//       return;
//     }

//     if (!eventDate.trim()) {
//       ToastAndroid.show("Please select an event date.", ToastAndroid.SHORT);
//       return;
//     }

//     if (!category) {
//       ToastAndroid.show("Please select a category.", ToastAndroid.SHORT);
//       return;
//     }

//     const formData = {
//       eventName: eventName.trim(),
//       eventDate,
//       location,
//       description,
//       category,
//       dateCreated: serverTimestamp(),
//       id: getId(),
//     };

//     setIsProcessing(true);

//     try {
//       await setDoc(doc(firestore, "events", formData.id), formData);
//       ToastAndroid.show("Event added successfully!", ToastAndroid.SHORT);
//       setEventData(initialState);
//       navigation.navigate("GetEvent");
//     } catch (error) {
//       console.error("Error adding event: ", error);
//       ToastAndroid.show("Failed to add event.", ToastAndroid.SHORT);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setIsDatePickerVisible(false);
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString().split("T")[0];
//       setEventData((prev) => ({ ...prev, eventDate: formattedDate }));
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setEventData((prev) => ({ ...prev, category }));
//     setIsCategoryModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Event</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Event Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter event name"
//           value={eventData.eventName}
//           onChangeText={(text) =>
//             setEventData((prev) => ({ ...prev, eventName: text }))
//           }
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Category</Text>
//         <TouchableOpacity
//           style={[styles.input, styles.categoryInput]}
//           onPress={() => setIsCategoryModalVisible(true)}
//         >
//           <Text style={[styles.categoryText, eventData.category && styles.selectedText]}>
//             {eventData.category || "Select category"}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Event Date</Text>
//         <TouchableOpacity
//           style={[styles.input, styles.dateInput]}
//           onPress={() => setIsDatePickerVisible(true)}
//         >
//           <Text style={styles.dateText}>
//             {eventData.eventDate || "Select event date"}
//           </Text>
//         </TouchableOpacity>
//         {isDatePickerVisible && (
//           <DateTimePicker
//             value={new Date()}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Location</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter event location"
//           value={eventData.location}
//           onChangeText={(text) =>
//             setEventData((prev) => ({ ...prev, location: text }))
//           }
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Enter event description"
//           multiline
//           numberOfLines={4}
//           value={eventData.description}
//           onChangeText={(text) =>
//             setEventData((prev) => ({ ...prev, description: text }))
//           }
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmit}
//         disabled={isProcessing}
//       >
//         <Text style={styles.submitButtonText}>
//           {isProcessing ? "Adding..." : "Add Event"}
//         </Text>
//       </TouchableOpacity>

//       {/* Category Selection Modal */}
//       <Modal
//         visible={isCategoryModalVisible}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Category</Text>
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category}
//                 style={styles.categoryOption}
//                 onPress={() => handleCategorySelect(category)}
//               >
//                 <Text style={styles.categoryOptionText}>{category}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setIsCategoryModalVisible(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   StyleSheet,
//   Modal,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios'; // Axios for API calls

// export default function AddEvent() {
//   const initialState = {
//     eventName: '',
//     eventDate: '',
//     location: '',
//     description: '',
//     category: '',
//   };

//   const [eventData, setEventData] = useState(initialState);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//   const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
//   const navigation = useNavigation();

//   // Predefined categories
//   const categories = ['Sports', 'Music', 'Tech', 'Workshop', 'Meetup'];

//   const handleSubmit = async () => {
//     if (isProcessing) return;

//     const {eventName, eventDate, location, description, category} = eventData;

//     if (!eventName.trim() || eventName.length < 3) {
//       ToastAndroid.show('Please enter a valid event name.', ToastAndroid.SHORT);
//       return;
//     }

//     if (!eventDate.trim()) {
//       ToastAndroid.show('Please select an event date.', ToastAndroid.SHORT);
//       return;
//     }

//     if (!category) {
//       ToastAndroid.show('Please select a category.', ToastAndroid.SHORT);
//       return;
//     }

//     const formData = {
//       eventName: eventName.trim(),
//       eventDate,
//       location,
//       description,
//       category,
//       dateCreated: Date.now(),
//     };

//     setIsProcessing(true);

//     try {
//       // Replace the URL with your backend API endpoint
//       await axios.post('http://192.168.100.4:5001/api/createEvents', formData);
//       ToastAndroid.show('Event added successfully!', ToastAndroid.SHORT);
//       setEventData(initialState);
//       navigation.navigate("GetEvent");
//     } catch (error) {
//       console.error('Error adding event: ', error);
//       ToastAndroid.show('Failed to add event.', ToastAndroid.SHORT);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setIsDatePickerVisible(false);
//     if (selectedDate) {
//       const formattedDate = selectedDate.toISOString().split('T')[0];
//       setEventData(prev => ({...prev, eventDate: formattedDate}));
//     }
//   };

//   const handleCategorySelect = category => {
//     setEventData(prev => ({...prev, category}));
//     setIsCategoryModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Event</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Event Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter event name"
//           value={eventData.eventName}
//           onChangeText={text =>
//             setEventData(prev => ({...prev, eventName: text}))
//           }
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Category</Text>
//         <TouchableOpacity
//           style={[styles.input, styles.categoryInput]}
//           onPress={() => setIsCategoryModalVisible(true)}>
//           <Text
//             style={[
//               styles.categoryText,
//               eventData.category && styles.selectedText,
//             ]}>
//             {eventData.category || 'Select category'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Event Date</Text>
//         <TouchableOpacity
//           style={[styles.input, styles.dateInput]}
//           onPress={() => setIsDatePickerVisible(true)}>
//           <Text style={styles.dateText}>
//             {eventData.eventDate || 'Select event date'}
//           </Text>
//         </TouchableOpacity>
//         {isDatePickerVisible && (
//           <DateTimePicker
//             value={new Date()}
//             mode="date"
//             display="default"
//             onChange={handleDateChange}
//           />
//         )}
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Location</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter event location"
//           value={eventData.location}
//           onChangeText={text =>
//             setEventData(prev => ({...prev, location: text}))
//           }
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           placeholder="Enter event description"
//           multiline
//           numberOfLines={4}
//           value={eventData.description}
//           onChangeText={text =>
//             setEventData(prev => ({...prev, description: text}))
//           }
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmit}
//         disabled={isProcessing}>
//         <Text style={styles.submitButtonText}>
//           {isProcessing ? 'Adding...' : 'Add Event'}
//         </Text>
//       </TouchableOpacity>

//       {/* Category Selection Modal */}
//       <Modal
//         visible={isCategoryModalVisible}
//         transparent={true}
//         animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Category</Text>
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category}
//                 style={styles.categoryOption}
//                 onPress={() => handleCategorySelect(category)}>
//                 <Text style={styles.categoryOptionText}>{category}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setIsCategoryModalVisible(false)}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ToastAndroid,
//   StyleSheet,
//   Modal,
//   Image,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';

// export default function AddEvent() {
//   const initialState = {
//     eventName: '',
//     eventDate: '',
//     location: '',
//     description: '',
//     category: '',
//     imageUri: '',
//   };

//   const [eventData, setEventData] = useState(initialState);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//   const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
//   const navigation = useNavigation();

//   const categories = ['Sports', 'Music', 'Tech', 'Workshop', 'Meetup'];

//   const handleImagePicker = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         maxWidth: 300,
//         maxHeight: 300,
//         quality: 0.7,
//       },
//       response => {
//         if (response.didCancel) {
//           ToastAndroid.show('Image selection canceled.', ToastAndroid.SHORT);
//         } else if (response.errorMessage) {
//           ToastAndroid.show(`Error: ${response.errorMessage}`, ToastAndroid.SHORT);
//         } else {
//           const uri = response.assets[0].uri;
//           setEventData(prev => ({ ...prev, imageUri: uri }));
//         }
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (isProcessing) return;

//     const { eventName, eventDate, location, description, category, imageUri } = eventData;

//     if (!eventName.trim() || eventName.length < 3) {
//       ToastAndroid.show('Please enter a valid event name.', ToastAndroid.SHORT);
//       return;
//     }

//     if (!eventDate.trim()) {
//       ToastAndroid.show('Please select an event date.', ToastAndroid.SHORT);
//       return;
//     }

//     if (!category) {
//       ToastAndroid.show('Please select a category.', ToastAndroid.SHORT);
//       return;
//     }

//     if (!imageUri) {
//       ToastAndroid.show('Please add an image.', ToastAndroid.SHORT);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('eventName', eventName.trim());
//     formData.append('eventDate', eventDate);
//     formData.append('location', location);
//     formData.append('description', description);
//     formData.append('category', category);
//     formData.append('image', {
//       uri: imageUri,
//       type: 'image/jpeg',
//       name: 'event.jpg',
//     });

//     setIsProcessing(true);

//     try {
//       await axios.post('http://192.168.100.4:5001/api/createEvents', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       ToastAndroid.show('Event added successfully!', ToastAndroid.SHORT);
//       setEventData(initialState);
//       navigation.navigate('GetEvent');
//     } catch (error) {
//       console.error('Error adding event: ', error);
//       ToastAndroid.show('Failed to add event.', ToastAndroid.SHORT);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Add New Event</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Event Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter event name"
//             value={eventData.eventName}
//             onChangeText={text => setEventData(prev => ({ ...prev, eventName: text }))}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Category</Text>
//           <TouchableOpacity
//             style={[styles.input, styles.categoryInput]}
//             onPress={() => setIsCategoryModalVisible(true)}>
//             <Text style={styles.categoryText}>
//               {eventData.category || 'Select category'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Event Date</Text>
//           <TouchableOpacity
//             style={[styles.input, styles.dateInput]}
//             onPress={() => setIsDatePickerVisible(true)}>
//             <Text style={styles.dateText}>
//               {eventData.eventDate || 'Select event date'}
//             </Text>
//           </TouchableOpacity>
//           {isDatePickerVisible && (
//             <DateTimePicker
//               value={new Date()}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setIsDatePickerVisible(false);
//                 if (selectedDate) {
//                   const formattedDate = selectedDate.toISOString().split('T')[0];
//                   setEventData(prev => ({ ...prev, eventDate: formattedDate }));
//                 }
//               }}
//             />
//           )}
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Location</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter event location"
//             value={eventData.location}
//             onChangeText={text => setEventData(prev => ({ ...prev, location: text }))}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Enter event description"
//             multiline
//             numberOfLines={4}
//             value={eventData.description}
//             onChangeText={text => setEventData(prev => ({ ...prev, description: text }))}
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Event Image</Text>
//           <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
//             <Text style={styles.imagePickerButtonText}>Select Image</Text>
//           </TouchableOpacity>
//           {eventData.imageUri ? (
//             <Image source={{ uri: eventData.imageUri }} style={styles.imagePreview} />
//           ) : null}
//         </View>

//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmit}
//           disabled={isProcessing}>
//           <Text style={styles.submitButtonText}>
//             {isProcessing ? 'Adding...' : 'Add Event'}
//           </Text>
//         </TouchableOpacity>
//         {/* Category Selection Modal */}
//      <Modal
//         visible={isCategoryModalVisible}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Category</Text>
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category}
//                 style={styles.categoryOption}
//                 onPress={() => handleCategorySelect(category)}
//               >
//                 <Text style={styles.categoryOptionText}>{category}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setIsCategoryModalVisible(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//     color: '#222',
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#444',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   dateInput: {
//     justifyContent: 'center',
//   },
//   categoryInput: {
//     justifyContent: 'center',
//   },
//   dateText: {
//     color: '#555',
//   },
//   categoryText: {
//     color: '#555',
//   },
//   textArea: {
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   submitButton: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 16,
//     borderRadius: 10,
//     marginTop: 12,
//   },
//   submitButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   imagePickerButton: {
//     backgroundColor: '#e0e0e0',
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   imagePickerButtonText: {
//     color: '#007BFF',
//     fontSize: 16,
//   },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginTop: 12,
//     borderRadius: 10,
//   },
// });




import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'; 
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

// Constants
const CATEGORIES = ['Sports', 'Music', 'Tech', 'Workshop', 'Meetup'];
const API_URL = 'http://000.000.000.0:5001/api/createEvents';
const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.7,
};

const AddEvent = () => {
  // State management
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    description: '',
    category: '',
    imageUri: '',
  });
  const [uiState, setUiState] = useState({
    isProcessing: false,
    isDatePickerVisible: false,
    isCategoryModalVisible: false,
  });
  
  const navigation = useNavigation();

  // Form field update handlers
  const updateField = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const updateUiState = (field, value) => {
    setUiState(prev => ({ ...prev, [field]: value }));
  };

  // Image handling
  const handleImagePicker = async () => {
    try {
      const response = await new Promise((resolve) => {
        launchImageLibrary(IMAGE_PICKER_OPTIONS, resolve);
      });

      if (response.didCancel) {
        showToast('Image selection canceled.');
      } else if (response.errorMessage) {
        throw new Error(response.errorMessage);
      } else if (response.assets?.[0]?.uri) {
        updateField('imageUri', response.assets[0].uri);
      }
    } catch (error) {
      showToast(`Error selecting image: ${error.message}`);
    }
  };

  // Category handling
  const handleCategorySelect = (category) => {
    updateField('category', category);
    updateUiState('isCategoryModalVisible', false);
  };

  // Date handling
  const handleDateChange = (event, selectedDate) => {
    updateUiState('isDatePickerVisible', false);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Formatting with date-fns
      updateField('eventDate', formattedDate);
    }  
  };
  

  // Validation
  const validateForm = () => {
    const { eventName, eventDate, category, imageUri } = eventData;
    
    if (!eventName.trim() || eventName.length < 3) {
      throw new Error('Please enter a valid event name.');
    }
    if (!eventDate.trim()) {
      throw new Error('Please select an event date.');
    }
    if (!category) {
      throw new Error('Please select a category.');
    }
    if (!imageUri) {
      throw new Error('Please add an image.');
    }
  };

  // Toast helper
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  // Form submission
  const handleSubmit = async () => {
    if (uiState.isProcessing) return;

    try {
      validateForm();

      updateUiState('isProcessing', true);
      const formData = createFormData();
      
      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showToast('Event added successfully!');
      setEventData({
        eventName: '',
        eventDate: '',
        location: '',
        description: '',
        category: '',
        imageUri: '',
      });
      navigation.navigate('GetEvent');
    } catch (error) {
      showToast(error.message || 'Failed to add event.');
      console.error('Error adding event:', error);
    } finally {
      updateUiState('isProcessing', false);
    }
  };

  // Helper function to create form data
  const createFormData = () => {
    const formData = new FormData();
    const { eventName, eventDate, location, description, category, imageUri } = eventData;

    formData.append('eventName', eventName.trim());
    formData.append('eventDate', eventDate);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'event.jpg',
    });

    return formData;
  };

  // Render functions
  const renderInputField = (label, field, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, options.multiline && styles.textArea]}
        placeholder={placeholder}
        value={eventData[field]}
        onChangeText={(text) => updateField(field, text)}
        {...options}
      />
    </View>
  );

  const renderDatePicker = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Event Date</Text>
      <TouchableOpacity
        style={[styles.input, styles.dateInput]}
        onPress={() => updateUiState('isDatePickerVisible', true)}>
        <Text style={styles.dateText}>
          {eventData.eventDate 
            ? format(new Date(eventData.eventDate), 'yyyy-MM-dd') // Format to display only date
            : 'Select event date'}
        </Text>
      </TouchableOpacity>
      {uiState.isDatePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );

  const renderCategoryModal = () => (
    <Modal
      visible={uiState.isCategoryModalVisible}
      transparent={true}
      animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Category</Text>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryOption}
              onPress={() => handleCategorySelect(category)}>
              <Text style={styles.categoryOptionText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => updateUiState('isCategoryModalVisible', false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Event</Text>

        {renderInputField('Event Name', 'eventName', 'Enter event name')}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={[styles.input, styles.categoryInput]}
            onPress={() => updateUiState('isCategoryModalVisible', true)}>
            <Text style={styles.categoryText}>
              {eventData.category || 'Select category'}
            </Text>
          </TouchableOpacity>
        </View>

        {renderDatePicker()}
        
        {renderInputField('Location', 'location', 'Enter event location')}
        
        {renderInputField('Description', 'description', 'Enter event description', {
          multiline: true,
          numberOfLines: 4,
        })}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Event Image</Text>
          <TouchableOpacity 
            style={styles.imagePickerButton} 
            onPress={handleImagePicker}>
            <Text style={styles.imagePickerButtonText}>Select Image</Text>
          </TouchableOpacity>
          {eventData.imageUri ? (
            <Image 
              source={{ uri: eventData.imageUri }} 
              style={styles.imagePreview} 
            />
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={uiState.isProcessing}>
          <Text style={styles.submitButtonText}>
            {uiState.isProcessing ? 'Adding...' : 'Add Event'}
          </Text>
        </TouchableOpacity>

        {renderCategoryModal()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateInput: {
    justifyContent: 'center',
  },
  categoryInput: {
    justifyContent: 'center',
  },
  dateText: {
    color: '#555',
  },
  categoryText: {
    color: '#555',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 12,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  imagePickerButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default AddEvent;