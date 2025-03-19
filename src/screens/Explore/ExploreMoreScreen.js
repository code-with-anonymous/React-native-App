import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';


const LandingPage = ({ navigation }) => {
  

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1472673/pexels-photo-1472673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} // Replace with your actual image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>

        <SafeAreaView style={styles.container}>
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Event Hub</Text>
            <Text style={styles.subtitle}>
              Your complete event management solution
            </Text>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('AddEvent')}
            >
              <Text style={styles.buttonTitle}>Create Event</Text>
              <Text style={styles.buttonSubtext}>Start planning your next event</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EventsList')}
            >
              <Text style={styles.buttonTitle}>Explore Events</Text>
              <Text style={styles.buttonSubtext}>Discover amazing events</Text>
            </TouchableOpacity>

            

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EnrolledEventsScreen')}
            >
              <Text style={styles.buttonTitle}>Enrolled Events</Text>
              <Text style={styles.buttonSubtext}>View your enrolled events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('UserProfileScreen')}
            >
              <Text style={styles.buttonTitle}>User Profile</Text>
              <Text style={styles.buttonSubtext}>Manage your account and settings</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    gap: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default LandingPage;
