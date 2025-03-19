// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const EventDetails = ({ route }) => {
//   const { eventId } = route.params;
//   console.log(eventId) // Get eventId passed via navigation params
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const [message, setMessage] = useState('');
//   const [rating, setRating] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoadingEvent, setIsLoadingEvent] = useState(true);
//   const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);

//   useEffect(() => {
//     // Fetch event details
//     axios
//       .get(`http://192.168.100.3:5001/api/events/${eventId}`)
//       .then(response => {
//         setEvent(response.data);
//         console.log(event)
//         setIsLoadingEvent(false);
//       })
//       .catch(error => {
//         console.error('Error fetching event details:', error);
//         console.log(error.message)
//         setIsLoadingEvent(false);
//       });

//     // Fetch feedback for the event
//     axios
//       .get(`http://192.168.100.3:5001/api/getFeedback?eventId=${eventId}`)
//       .then(response => {
//         setFeedback(response.data.feedback);
//         setIsLoadingFeedback(false);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback:', error);
//         setIsLoadingFeedback(false);
//       });
//   }, [eventId]);

//   const handleSubmitFeedback = () => {
//     if (!message.trim()) {
//       Alert.alert('Error', 'Feedback message cannot be empty.');
//       return;
//     }

//     if (rating < 1 || rating > 5) {
//       Alert.alert('Error', 'Rating must be between 1 and 5.');
//       return;
//     }

//     setIsSubmitting(true);

//     const feedbackData = { eventId, message, rating };

//     axios
//       .post('http://192.168.100.3:5001/api/feedback', feedbackData)
//       .then(response => {
//         setFeedback([response.data.feedback, ...feedback]); // Add new feedback to the top
//         setMessage('');
//         setRating(1);
//         Alert.alert('Success', 'Your feedback has been submitted.');
//       })
//       .catch(error => {
//         console.error('Error submitting feedback:', error);
//         console.log(error.message)
//         console.log(error.response.data.error)
//         Alert.alert('Error', 'There was an issue submitting your feedback.');
//       })
//       .finally(() => setIsSubmitting(false));
//   };

//   if (isLoadingEvent) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading event details...</Text>
//       </View>
//     );
//   }

//   if (!event) {
//     return (
//       <View style={styles.centered}>
//         <Text>Error loading event details. Please try again later.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{event.eventName}</Text>
//       <Text style={styles.description}>{event.description}</Text>
//       <Text style={styles.date}>Date: {new Date(event.eventDate).toLocaleDateString()}</Text>

//       <View style={styles.feedbackContainer}>
//         <Text style={styles.feedbackTitle}>Leave Feedback:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Write your feedback..."
//           value={message}
//           onChangeText={setMessage}
//           multiline
//         />
//         <Picker
//           selectedValue={rating}
//           onValueChange={(itemValue) => setRating(itemValue)}
//           style={styles.picker}
//         >
//           {[1, 2, 3, 4, 5].map((value) => (
//             <Picker.Item key={value} label={`${value} Star${value > 1 ? 's' : ''}`} value={value} />
//           ))}
//         </Picker>
//         <Button
//           title={isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//           onPress={handleSubmitFeedback}
//           disabled={isSubmitting}
//           color="#007BFF"
//         />
//       </View>

//       <Text style={styles.feedbackListTitle}>Previous Feedback:</Text>
//       {isLoadingFeedback ? (
//         <View style={styles.centered}>
//           <ActivityIndicator size="small" color="#007BFF" />
//           <Text>Loading feedback...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={feedback}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.feedbackItem}>
//               <Text style={styles.feedbackUser}>{item.user?.name || 'Anonymous'}</Text>
//               <Text>{item.message}</Text>
//               <Text>Rating: {item.rating}</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   date: {
//     fontSize: 14,
//     marginBottom: 20,
//     color: 'gray',
//   },
//   feedbackContainer: {
//     marginBottom: 20,
//   },
//   feedbackTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 80,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     textAlignVertical: 'top',
//   },
//   picker: {
//     height: 50,
//     marginBottom: 10,
//   },
//   feedbackListTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   feedbackItem: {
//     marginBottom: 15,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//   },
//   feedbackUser: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default EventDetails;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { getToken } from '../../utils/AuthUtils'; // Ensure this is your token retrieval function

const EventDetails = ({ route }) => {
  const { eventId } = route.params; // Get eventId passed via navigation params
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    // Fetch event details
    axios
      .get(`http://192.168.100.3:5001/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEvent(response.data);
        setIsLoadingEvent(false);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error.response?.data || error.message);
        Alert.alert('Error', 'Unable to fetch event details.');
        setIsLoadingEvent(false);
      });

    // Fetch feedback for the event
    axios
      .get(`http://192.168.100.3:5001/api/${eventId}/getFeedback`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFeedback(response.data.feedback);
        console.log(feedback);
        setIsLoadingFeedback(false);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error.response?.data || error.message);
        Alert.alert('Error', 'Unable to fetch feedback.');
        setIsLoadingFeedback(false);
      });
  }, [eventId, token]);

  const handleSubmitFeedback = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Feedback message cannot be empty.');
      return;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert('Error', 'Rating must be between 1 and 5.');
      return;
    }

    setIsSubmitting(true);

    const feedbackData = { eventId, message, rating };
    axios
      .post(
        'http://192.168.100.3:5001/api/feedback',
        feedbackData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setFeedback([response.data.feedback, ...feedback]);
        setMessage('');
        setRating(1);
        Alert.alert('Success', 'Your feedback has been submitted.');
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error.response?.data || error.message);
        Alert.alert('Error', error.response?.data?.error || 'There was an issue submitting your feedback.');
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoadingEvent) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading event details...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text>Error loading event details. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Event Details Section */}
        {event.imageUrl && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: event.imageUrl }} style={styles.image} />
          </View>
        )}
        <Text style={styles.title}>{event.eventName}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>{new Date(event.eventDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{event.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category:</Text>
          <Text style={styles.infoValue}>{event.category}</Text>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Leave Feedback:</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your feedback..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <Picker
            selectedValue={rating}
            onValueChange={(itemValue) => setRating(itemValue)}
            style={styles.picker}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Picker.Item key={value} label={`${value} Star${value > 1 ? 's' : ''}`} value={value} />
            ))}
          </Picker>
          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmitFeedback}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</Text>
          </TouchableOpacity>
        </View>

        {/* Feedback List Section */}
        <Text style={styles.feedbackListTitle}>Previous Feedback:</Text>
        {isLoadingFeedback ? (
          <View style={styles.centered}>
            <ActivityIndicator size="small" color="#007BFF" />
            <Text>Loading feedback...</Text>
          </View>
        ) : (
          <FlatList
            data={feedback}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.feedbackItem}>
                <Text style={styles.feedbackUser}>{item.user?.name || 'Anonymous'}</Text>
                <Text>{item.message}</Text>
                <Text>Rating: {item.rating}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    color: '#555',
  },
  feedbackContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  picker: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  feedbackListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  feedbackItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  feedbackUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating:{
    color: 'yellow',
  },
});

export default EventDetails;


