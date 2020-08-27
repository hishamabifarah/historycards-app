import React, { useState, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Context as TimelineContext } from "../context/timelinesContext";
import { NavigationEvents } from 'react-navigation';
import noImage from '../../assets/images/no-image.jpg';

const TimelineAddImage = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { state, uploadImageTimeline , clearErrorMessage } = useContext(TimelineContext);

  const [title] = useState(navigation.getParam('title'));
  const [description] = useState(navigation.getParam('description'));
  const [id] = useState(navigation.getParam('id'));

  // console.log('state in add image' , state.loading);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (

      <ScrollView style={styles.container}>
        <NavigationEvents
          onWillBlur={clearErrorMessage}
        />

        <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
        <Text style={styles.instructions}>
          Add Image to Timeline?
            </Text>

        <Text style={styles.title}>Title: {title}</Text>
        <Text style={styles.description}>Description: {description}</Text>

        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />

        {state.loading && <ActivityIndicator style={{ padding: 15 }} size="small" color="#00bcd4" />}

        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={state.loading}
          onPress={openImagePickerAsync}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          disabled={state.loading}
          onPress={() => uploadImageTimeline({ timelineId : id, image: selectedImage.localUri })}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TimelinesHome')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: noImage }} style={styles.logo} />
        <Text style={styles.instructions}>
          Add Image to Timeline?
            </Text>

        <Text style={styles.title}>Title: {title}</Text>
        <Text style={styles.description}>Description: {description}</Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={openImagePickerAsync}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => uploadImageTimeline({ id, image: selectedImage.localUri })}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('TimelinesHome')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  thumbnail: {
    width: 360,
    height: 280,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  instructions: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  title: {
    margin: 5,
    fontSize: 18
  },
  description: {
    margin: 5,
    fontSize: 18,
    marginVertical: 10
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#3498db",
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20
  },
  buttonText: {
    color: '#fff',

  }
});

export default TimelineAddImage;