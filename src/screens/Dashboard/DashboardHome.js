import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Add Image Before the Heading */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        }}
        style={styles.image}
      />
      <Text style={styles.heading}>Admin Dashboard</Text>

      <View style={styles.cardContainer}>
        {/* Add Event Card */}
        <Card style={styles.card} onPress={() => navigation.navigate('AddEvent')}>
          <Card.Content>
            <Title style={styles.cardTitle}>Add Event</Title>
            <Paragraph>Create and schedule new events easily .</Paragraph>
          </Card.Content>
        </Card>

        {/* Manage Event Card */}
        <Card style={styles.card} onPress={() => navigation.navigate('GetEvent')}>
          <Card.Content>
            <Title style={styles.cardTitle}>Manage Events</Title>
            <Paragraph>View, edit, and delete events in one place.</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5, // Shadow effect
    padding: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E64FF', // Eye-catching blue color
  },
  image: {
    width: Dimensions.get('window').width * 0.9, // 90% of screen width
    height: 200,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
});

// import React from 'react';
// import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// import { Card, Title, Paragraph } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// const AdminDashboard = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Full-Width Image at the Top */}
//       <Image
//         source={{
//           uri: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         }}
//         style={styles.image}
//       />

//       <Text style={styles.heading}>Admin Dashboard</Text>

//       <View style={styles.cardContainer}>
//         {/* Add Event Card */}
//         <Card style={styles.card} onPress={() => navigation.navigate('AddEvent')}>
//           <Card.Content>
//             <Title style={styles.cardTitle}>Add Event</Title>
//             <Paragraph>Create and schedule new events easily.</Paragraph>
//           </Card.Content>
//         </Card>

//         {/* Manage Event Card */}
//         <Card style={styles.card} onPress={() => navigation.navigate('ManageEvent')}>
//           <Card.Content>
//             <Title style={styles.cardTitle}>Manage Events</Title>
//             <Paragraph>View, edit, and delete events in one place.</Paragraph>
//           </Card.Content>
//         </Card>
//       </View>
//     </View>
//   );
// };

// export default AdminDashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   image: {
//     width: Dimensions.get('window').width, // 100vw
//     height: 220, // Adjust height as needed
//     marginTop: 0, // No top margin
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//     color: '#333',
//   },
//   cardContainer: {
//     paddingHorizontal: 20,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     elevation: 5, // Shadow effect
//     padding: 10,
//     marginBottom: 20,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3E64FF', // Eye-catching blue color
//   },
// });
