// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import axios from "axios";
// import { getToken } from "../../utils/AuthUtils";

// const API_URL = "http://192.168.100.3:5001/api";

// const ProfileScreen = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState("");
//   const [enrollment, setEnrollment] = useState([]);

//   useEffect(() => {
//     const initializeData = async () => {
//       await fetchUserData();
//     };
//     initializeData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = await getToken();
//       if (!token) {
//         Alert.alert("Error", "User is not authenticated.");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`${API_URL}/user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const fetchedUserId = response.data.userId;
//       setUserId(fetchedUserId);

//       // Fetch enrollment and profile in sequence
//       const enrollmentFetched = await fetchUserEnrollment(fetchedUserId);
//       if (enrollmentFetched) {
//         await fetchUserProfile(fetchedUserId, enrollmentFetched);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setLoading(false);
//     }
//   };

//   const fetchUserEnrollment = async (userId) => {
//     console.log("Fetching enrollment for user:", userId);
//     try {
//       const response = await axios.get(`${API_URL}/user/${userId}`);
//       setEnrollment(response.data);
//       console.log("Enrollment data:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching user enrollment:", error.message);
//       return null;
//     }
//   };

//   const fetchUserProfile = async (userId, enrollmentFetched) => {
//     try {
//       const token = await getToken();

//       const response = await axios.get(`${API_URL}/getProfile/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProfile(response.data.profile.enrolledEvents[0]);
//       console.log(response.data.profile.enrolledEvents[0]);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         // Profile not found, create a new one with fetched enrollment
//         await createProfile(userId, enrollmentFetched);
//       } else {
//         Alert.alert("Error", "Failed to fetch profile");
//         console.error("Error fetching profile:", error.message);
//       }
//     }
//   };

//   const createProfile = async (userId, enrollmentFetched) => {
//     try {
//       const token = await getToken();

//       const response = await axios.post(
//         `${API_URL}/profile/${userId}`,
//         {
//           enrolledEvents: enrollmentFetched,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setProfile(response.data.profile);
//       Alert.alert("Profile Created", "Profile created successfully");

//       // Fetch profile again after creation
//       fetchUserProfile(userId, enrollmentFetched);
//     } catch (error) {
//       Alert.alert("Error", "Failed to create profile");
//       console.error("Error creating profile:", error.message);
//     }
//   };

//   const handleImageUpload = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         quality: 0.7,
//       },
//       async (response) => {
//         if (response.didCancel) {
//           console.log("User cancelled image picker");
//           return;
//         }
//         if (response.errorMessage) {
//           Alert.alert("Error", response.errorMessage);
//           return;
//         }

//         const source = response.assets[0].uri;
//         const formData = new FormData();
//         formData.append("profilePicture", {
//           uri: source,
//           type: "image/jpeg",
//           name: "profile.jpg",
//         });

//         try {
//           const token = await getToken();
//           const uploadResponse = await axios.post(
//             `${API_URL}/upload/${userId}`,
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           setProfile((prev) => ({
//             ...prev,
//             profilePicture: uploadResponse.data.profilePicture,
//           }));
//         } catch (error) {
//           Alert.alert("Upload Failed", "Could not upload profile picture");
//         }
//       }
//     );
//   };

//   const renderEnrolledEvents = () => {
//     return profile?.enrolledEvents.map((event, index) => (
//       <View key={index} style={styles.eventCard}>
//         <Text style={styles.eventName}>{event.name}</Text>
//         <Text>{event.date}</Text>
//         <Text>Location: {event.location}</Text>
//       </View>
//     ));
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileHeader}>
//         <TouchableOpacity onPress={handleImageUpload}>
//           <Image
//             source={{
//               uri:
//                 profile?.profilePicture ||
//                 "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
//             }}
//             style={styles.profileImage}
//           />
//           <Text style={styles.uploadText}>Change Picture</Text>
//         </TouchableOpacity>

//         <Text style={styles.name}>{profile?.username || "Name not available"}</Text>
//         <Text style={styles.email}>
//           {profile?.email || "Email not available"}
//         </Text>
//       </View>

//       <View style={styles.profileDetails}>
//         <Text style={styles.sectionTitle}>Profile Details</Text>
//         <Text>Role: {profile?.role || "Role not available"}</Text>
//         <Text>Total Enrolled Events: {profile?.enrolledEvents?.length || 0}</Text>
//       </View>

//       <View style={styles.eventsSection}>
//         <Text style={styles.sectionTitle}>Enrolled Events</Text>
//         {profile?.enrolledEvents?.length ? (
//           renderEnrolledEvents()
//         ) : (
//           <Text>No enrolled events</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   profileHeader: { alignItems: "center", marginBottom: 20 },
//   profileImage: { width: 100, height: 100, borderRadius: 50 },
//   uploadText: { color: "blue", marginTop: 8 },
//   name: { fontSize: 20, fontWeight: "bold" },
//   email: { color: "gray", marginBottom: 16 },
//   profileDetails: { marginBottom: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
//   eventsSection: { marginTop: 16 },
//   eventCard: {
//     backgroundColor: "#f9f9f9",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   eventName: { fontWeight: "bold" },
// });

// export default ProfileScreen;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../utils/AuthUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.100.3:5001/api";

const ProfileScreen = ({setIsLoggedIn,setRole}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [enrollment, setEnrollment] = useState([]);
  const navigation = useNavigation();

  
  // useEffect(() => {
  //   const initializeData = async () => {
  //     await fetchUserData();
  //   };
  //   initializeData();
  // }, []);

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = await getToken();
      console.log("Token:", token);
      if (!token) {
        navigation.replace("LoginScreen");
        return;
      }
      await fetchUserData();
    };
    checkAuthAndFetchData();
  }, []);
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        const role = await AsyncStorage.getItem('userRole'); 
        console.log(role)// Fetch saved role
  
        if (token) {
          setIsLoggedIn(true);
          setRole(role);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error retrieving auth state:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
  
    initializeAuth();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "User is not authenticated.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUserId = response.data.userId;
      setUserId(fetchedUserId);

      // Fetch enrollment and profile in sequence
      const enrollmentFetched = await fetchUserEnrollment(fetchedUserId);
      if (enrollmentFetched) {
        await fetchUserProfile(fetchedUserId, enrollmentFetched);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const fetchUserEnrollment = async (userId) => {
    // console.log("Fetching enrollment for user:", userId);
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      setEnrollment(response.data);
      // console.log("Enrollment data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user enrollment:", error.message);
      return null;
    }
  };

  const fetchUserProfile = async (userId, enrollmentFetched) => {
    try {
      const token = await getToken();

      const response = await axios.get(`${API_URL}/getProfile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data.profile);
      // console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Profile not found, create a new one with fetched enrollment
        await createProfile(userId, enrollmentFetched);
      } else {
        Alert.alert("Error", "Failed to fetch profile");
        console.error("Error fetching profile:", error.message);
      }
    }
  };

  const createProfile = async (userId, enrollmentFetched) => {
    try {
      const token = await getToken();

      const response = await axios.post(
        `${API_URL}/profile/${userId}`,
        {
          enrolledEvents: enrollmentFetched,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(response.data.profile);
      Alert.alert("Profile Created", "Profile created successfully");

      // Fetch profile again after creation
      fetchUserProfile(userId, enrollmentFetched);
    } catch (error) {
      Alert.alert("Error", "Failed to create profile");
      console.error("Error creating profile:", error.message);
    }
  };

  const handleImageUpload = () => {
    const profileID = profile._id;
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
      },
      async (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
          return;
        }
        if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
          return;
        }
  
        const source = response.assets[0].uri;
        const formData = new FormData();
        formData.append("profilePicture", {
          uri: source,
          type: "image/jpeg",
          name: "profile.jpg",
        });
  
        try {
          const token = await getToken();
          const uploadResponse = await axios.post(
            `${API_URL}/upload/${profileID}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          console.log("Upload Response:", uploadResponse.data);
  
          if (uploadResponse.data && uploadResponse.data.profilePicture) {
            setProfile((prev) => ({
              ...prev,
              profilePicture: uploadResponse.data.profilePicture,
            }));
          } else {
            throw new Error("Invalid server response");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          console.log("Error uploading image:", error.message);
          console.log("Error uploading image:", error.response.data);
          Alert.alert("Upload Failed", "Could not upload profile picture");
        }
      }
    );
  };
  
  

  const renderEnrolledEvents = () => {
    if (!profile?.enrolledEvents || profile.enrolledEvents.length === 0) {
      return <Text style={styles.noEvents}>No enrolled events found.</Text>;
    }
  
    console.log("Enrolled Events:", profile.enrolledEvents);
  
    return profile.enrolledEvents.map((event, index) => {
      // Extract the event details from eventId
      const eventDetails = event.eventId;
  
      return (
        <View key={event._id || index} style={styles.eventCard}>
          <Text style={styles.eventName}>
            Name: {eventDetails.eventName || "N/A"}
          </Text>
          <Text style={styles.eventDate}>
  Date: {eventDetails.eventDate ? dayjs(eventDetails.eventDate).format("dddd, MMMM D, YYYY") : "N/A"}
</Text>
          <Text style={styles.eventLocation}>
            Location: {eventDetails.location || "N/A"}
          </Text>
        </View>
      );
    });
  };
  
  const handleLogout = async () => {
    try {
        // Send logout request to backend
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

        // Remove auth token from AsyncStorage
        await AsyncStorage.removeItem("authToken");

        await AsyncStorage.removeItem("userRole");

        setIsLoggedIn(false); 
        setRole(null);
    
        // Use a small delay to allow state updates before navigation
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }, 100); 

    } catch (error) {
        console.error("Error logging out:", error.message);
        console.error("Server Response:", error.response?.data || "No response from server");

        Alert.alert("Logout Failed", error.response?.data?.message || "Could not log out. Please try again.");
    }
};

  
  // const handleLogout = async () => {
  //   try {
  //     await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  //     await AsyncStorage.removeItem("authToken");

  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "LoginScreen" }],
  //     });
  //   } catch (error) {
  //     console.error("Error logging out:", error.message);
  //     Alert.alert("Logout Failed", "Could not log out.");
  //   }
  // };
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image
            source={{
              uri:
                profile?.profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.uploadText}>Change Picture</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{profile?.name || "Name not available"}</Text>
        <Text style={styles.email}>
          {profile?.email || "Email not available"}
        </Text>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.sectionTitle}>Profile Details</Text>
        <Text>Role: {profile?.role.toUpperCase() || "Role not available"}</Text>
        <Text>Total Enrolled Events: {profile?.enrolledEvents?.length || 0}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>Enrolled Events</Text>
        {profile?.enrolledEvents?.length ? (
          renderEnrolledEvents()
        ) : (
          <Text>No enrolled events</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 155,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',  // Center horizontally
    resizeMode: 'cover',  // Ensure the image covers the area
    objectPosition: 'top',  // Focus on the top of the image
  }
  
,  
  uploadText: {
    fontSize: 14,
    color: "#007BFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  profileDetails: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventsSection: {
    marginTop: 20,
  },
  eventCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;

