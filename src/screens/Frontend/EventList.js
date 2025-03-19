// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
//   TextInput,
//   SafeAreaView,
//   StatusBar,
//   RefreshControl,
//   Image,
//   Dimensions,
// } from "react-native";
// import { Card, Button, Chip, Appbar } from "react-native-paper";
// import axios from "axios";
// import dayjs from "dayjs";

// const API_BASE_URL = 'http://192.168.100.7:5001/api';
// const CATEGORIES = ["All", "Sports", "Music", "Tech", "Workshop", "Meetup"];
// const { width } = Dimensions.get('window');

// const EventListScreen = ({ navigation }) => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateFilter, setDateFilter] = useState("All");
//   const [error, setError] = useState(null);

//   const fetchEvents = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/readEvents`);
//       setEvents(response.data);
//       setFilteredEvents(response.data);
//     } catch (err) {
//       setError("Failed to load events. Please try again later.");
//       console.error("Error fetching events:", err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchEvents();
//     setIsRefreshing(false);
//   };

//   const filterEvents = () => {
//     let filtered = [...events];

//     if (categoryFilter !== "All") {
//       filtered = filtered.filter((event) => event.category === categoryFilter);
//     }

//     if (dateFilter !== "All") {
//       const today = dayjs();
//       filtered = filtered.filter((event) => {
//         const eventDate = dayjs(event.eventDate);
//         if (dateFilter === "Upcoming") return eventDate.isAfter(today, "day");
//         if (dateFilter === "Today") return eventDate.isSame(today, "day");
//         if (dateFilter === "Past") return eventDate.isBefore(today, "day");
//         return true;
//       });
//     }

//     if (searchTerm) {
//       filtered = filtered.filter((event) =>
//         event.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredEvents(filtered);
//   };

//   const handleEnroll = async (eventId) => {
//     try {
//       await axios.post(`${API_BASE_URL}/enrollEvent`, { eventId });
//       // Show success message or update UI accordingly
//     } catch (error) {
//       console.error("Error enrolling in event:", error);
//       // Handle error appropriately
//     }
//   };

//   const handleAddToWishlist = async (eventId) => {
//     try {
//       await axios.post(`${API_BASE_URL}/addToWishlist`, { eventId });
//       // Show success message or update UI accordingly
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       // Handle error appropriately
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     filterEvents();
//   }, [categoryFilter, dateFilter, searchTerm, events]);

//   const renderEventCard = ({ item }) => {
//     if (!item) return null;

//     const today = dayjs();
//     const eventDate = dayjs(item.eventDate);
//     const badgeText =
//       eventDate.isAfter(today, "day")
//         ? "Upcoming"
//         : eventDate.isSame(today, "day")
//         ? "Today"
//         : "Past";
//     const badgeColor =
//       badgeText === "Upcoming" ? "#4caf50" : badgeText === "Today" ? "#2196f3" : "#f44336";

//     return (
//       <Card style={styles.card}>
//         {item.imageUrl && (
//           <Card.Cover 
//             source={{ uri: item.imageUrl }} 
//             style={styles.cardImage}
//             resizeMode="cover"
//           />
//         )}
//         <View style={styles.badgeContainer}>
//           <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
//             {badgeText}
//           </Text>
//         </View>
//         <Card.Title 
//           title={item.eventName || 'Untitled Event'}
//           subtitle={`${item.category || 'Uncategorized'} • ${item.location || 'TBA'}`}
//           titleStyle={styles.cardTitle}
//           subtitleStyle={styles.cardSubtitle}
//         />
//         <Card.Content>
//           <Text style={styles.dateText}>
//             {dayjs(item.eventDate).format("dddd, MMMM D, YYYY")}
//           </Text>
//           <Text style={styles.description}>{item.description || 'No description available'}</Text>
//         </Card.Content>
//         <Card.Actions style={styles.cardActions}>
//           <Button 
//             mode="contained" 
//             onPress={() => handleEnroll(item._id)}
//             style={styles.enrollButton}
//           >
//             Enroll
//           </Button>
//           <Button 
//             mode="outlined"
//             onPress={() => handleAddToWishlist(item._id)}
//             style={styles.wishlistButton}
//           >
//             Add to Wishlist
//           </Button>
//         </Card.Actions>
//       </Card>
//     );
//   };

//   const renderEmptyList = () => (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyText}>No events found</Text>
//       <Text style={styles.emptySubText}>Try adjusting your filters</Text>
//     </View>
//   );

//   const renderError = () => (
//     <View style={styles.errorContainer}>
//       <Text style={styles.errorText}>{error}</Text>
//       <Button mode="contained" onPress={fetchEvents} style={styles.retryButton}>
//         Retry
//       </Button>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
      
//       <Appbar.Header>
//         <Appbar.Content title="Events" />
//         <Appbar.Action icon="filter" onPress={() => {/* Add filter modal logic */}} />
//       </Appbar.Header>

//       {isLoading && !isRefreshing ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#6200ee" />
//         </View>
//       ) : error ? (
//         renderError()
//       ) : (
//         <View style={styles.content}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search events"
//             onChangeText={setSearchTerm}
//             value={searchTerm}
//             placeholderTextColor="#666"
//           />

//           <View style={styles.filterContainer}>
//             <FlatList
//               horizontal
//               data={CATEGORIES}
//               renderItem={({ item }) => (
//                 <Chip
//                   selected={categoryFilter === item}
//                   onPress={() => setCategoryFilter(item)}
//                   style={styles.chip}
//                 >
//                   {item}
//                 </Chip>
//               )}
//               keyExtractor={(item) => item}
//               showsHorizontalScrollIndicator={false}
//             />
//           </View>

//           <View style={styles.dateFilterContainer}>
//             <FlatList
//               horizontal
//               data={["All", "Upcoming", "Today", "Past"]}
//               renderItem={({ item }) => (
//                 <Chip
//                   selected={dateFilter === item}
//                   onPress={() => setDateFilter(item)}
//                   style={styles.chip}
//                 >
//                   {item}
//                 </Chip>
//               )}
//               keyExtractor={(item) => item}
//               showsHorizontalScrollIndicator={false}
//             />
//           </View>

//           <FlatList
//             data={filteredEvents}
//             renderItem={renderEventCard}
//             keyExtractor={(item) => item._id}
//             contentContainerStyle={styles.listContainer}
//             ListEmptyComponent={renderEmptyList}
//             refreshControl={
//               <RefreshControl
//                 refreshing={isRefreshing}
//                 onRefresh={handleRefresh}
//                 colors={["#6200ee"]}
//               />
//             }
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchInput: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     fontSize: 16,
//   },
//   filterContainer: {
//     marginBottom: 12,
//   },
//   dateFilterContainer: {
//     marginBottom: 16,
//   },
//   chip: {
//     margin: 4,
//   },
//   listContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 12,
//     elevation: 4,
//     backgroundColor: '#ffffff',
//   },
//   cardImage: {
//     height: 200,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   badgeContainer: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     zIndex: 1,
//   },
//   badge: {
//     color: "#fff",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     overflow: "hidden",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   description: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 12,
//     lineHeight: 20,
//   },
//   cardActions: {
//     padding: 8,
//     justifyContent: "space-between",
//   },
//   enrollButton: {
//     flex: 1,
//     marginRight: 8,
//   },
//   wishlistButton: {
//     flex: 1,
//     marginLeft: 8,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 32,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#666",
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: "#999",
//     marginTop: 8,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#f44336",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   retryButton: {
//     paddingHorizontal: 32,
//   },
// });

// export default EventListScreen;



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Image,
  Dimensions,
} from "react-native";
import { Card, Button, Chip, Appbar } from "react-native-paper";
import axios from "axios";
import dayjs from "dayjs";
import EnrollmentModal from "../../components/EnrollmentModel";
import { getToken } from "../../utils/AuthUtils";

const API_BASE_URL = 'http://192.168.100.3:5001/api';
const CATEGORIES = ["All", "Sports", "Music", "Tech", "Workshop", "Meetup"];
const { width } = Dimensions.get('window');

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

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
      } 
    };

    fetchEnrolledEvents();
  }, [userId]);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/readEvents`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
      console.error("Error fetching events:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  

  // const handleEnroll = (eventId) => {
  //   setSelectedEventId(eventId);
  //   setModalVisible(true);
  // };

  const handleEnroll = (eventId, eventDate) => {
    const isAlreadyEnrolled = enrolledEvents.includes(eventId);
    const isUpcoming = dayjs(eventDate).isAfter(dayjs(), "day");
  
    if (isAlreadyEnrolled) {
      alert("You are already enrolled in this event.");
      return;
    }
  
    if (!isUpcoming) {
      alert("Only upcoming events are available for enrollment.");
      return;
    }
  
    setSelectedEventId(eventId);
    setModalVisible(true);
  };

  const handleEnrollSuccess = () => {
    fetchEvents();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchEvents();
    setIsRefreshing(false);
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (categoryFilter !== "All") {
      filtered = filtered.filter((event) => event.category === categoryFilter);
    }

    if (dateFilter !== "All") {
      const today = dayjs();
      filtered = filtered.filter((event) => {
        const eventDate = dayjs(event.eventDate);
        if (dateFilter === "Upcoming") return eventDate.isAfter(today, "day");
        if (dateFilter === "Today") return eventDate.isSame(today, "day");
        if (dateFilter === "Past") return eventDate.isBefore(today, "day");
        return true;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.eventName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleFeedback = async (eventId) => {
    navigation.navigate("SingleEventScreen", { eventId });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [categoryFilter, dateFilter, searchTerm, events]);

  const renderEventCard = ({ item }) => {
    if (!item) return null;

    const today = dayjs();
    const eventDate = dayjs(item.eventDate);
    const badgeText =
      eventDate.isAfter(today, "day")
        ? "Upcoming"
        : eventDate.isSame(today, "day")
        ? "Today"
        : "Past";
    const badgeColor =
      badgeText === "Upcoming" ? "#4caf50" : badgeText === "Today" ? "#2196f3" : "#f44336";
      const isAlreadyEnrolled = enrolledEvents.includes(item._id);
      const isUpcoming = eventDate.isAfter(today, "day");
      
     
    return (
      <Card style={styles.card}>
        {item.imageUrl && (
          <Card.Cover 
            source={{ uri: item.imageUrl }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
            {badgeText}
          </Text>
        </View>
        <Card.Title 
          title={item.eventName || 'Untitled Event'}
          subtitle={`${item.category || 'Uncategorized'} • ${item.location || 'TBA'}`}
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubtitle}
        />
        <Card.Content>
          <Text style={styles.dateText}>
            {dayjs(item.eventDate).format("dddd, MMMM D, YYYY")}
          </Text>
          <Text style={styles.description}>{item.description || 'No description available'}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
        <Button 
        mode="contained" 
        onPress={() => handleEnroll(item._id, item.eventDate)}
        style={styles.enrollButton}
        disabled={!isUpcoming || isAlreadyEnrolled}
      >
        {isAlreadyEnrolled ? "Enrolled" : "Enroll"}
      </Button>
          <Button 
            mode="outlined"
            onPress={() => handleFeedback(item._id)}
            style={styles.feedbackButton}
          >
            Feedback
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No events found</Text>
      <Text style={styles.emptySubText}>Try adjusting your filters</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <Button mode="contained" onPress={fetchEvents} style={styles.retryButton}>
        Retry
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Appbar.Header>
        <Appbar.Content title="Events" />
        <Appbar.Action icon="filter" onPress={() => {/* Add filter modal logic */}} />
      </Appbar.Header>

      {isLoading && !isRefreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : error ? (
        renderError()
      ) : (
        <View style={styles.content}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events"
            onChangeText={setSearchTerm}
            value={searchTerm}
            placeholderTextColor="#666"
          />

          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              data={CATEGORIES}
              renderItem={({ item }) => (
                <Chip
                  selected={categoryFilter === item}
                  onPress={() => setCategoryFilter(item)}
                  style={styles.chip}
                >
                  {item}
                </Chip>
              )}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.dateFilterContainer}>
            <FlatList
              horizontal
              data={["All", "Upcoming", "Today", "Past"]}
              renderItem={({ item }) => (
                <Chip
                  selected={dateFilter === item}
                  onPress={() => setDateFilter(item)}
                  style={styles.chip}
                >
                  {item}
                </Chip>
              )}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <FlatList
            data={filteredEvents}
            renderItem={renderEventCard}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={renderEmptyList}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={["#6200ee"]}
              />
            }
          />

          <EnrollmentModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            eventId={selectedEventId}
            onEnrollSuccess={handleEnrollSuccess}
          />
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9",
    },
    content: {
      flex: 1,
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    searchInput: {
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#ddd",
      fontSize: 16,
    },
    filterContainer: {
      marginBottom: 12,
    },
    dateFilterContainer: {
      marginBottom: 16,
    },
    chip: {
      margin: 4,
    },
    listContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    card: {
      marginBottom: 16,
      borderRadius: 12,
      elevation: 4,
      backgroundColor: '#ffffff',
    },
    cardImage: {
      height: 200,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    badgeContainer: {
      position: "absolute",
      top: 12,
      right: 12,
      zIndex: 1,
    },
    badge: {
      color: "#fff",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      overflow: "hidden",
      fontSize: 12,
      fontWeight: "bold",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#666',
    },
    dateText: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
      fontWeight: '500',
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
      lineHeight: 20,
    },
    cardActions: {
      padding: 8,
      justifyContent: "space-between",
    },
    enrollButton: {
      flex: 1,
      marginRight: 8,
    },
    wishlistButton: {
      flex: 1,
      marginLeft: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#666",
    },
    emptySubText: {
      fontSize: 14,
      color: "#999",
      marginTop: 8,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    errorText: {
      fontSize: 16,
      color: "#f44336",
      textAlign: "center",
      marginBottom: 16,
    },
    retryButton: {
      paddingHorizontal: 32,
    },
  });

export default EventListScreen;