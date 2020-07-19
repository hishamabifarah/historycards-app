import React, { useState, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Context as TimelineContext } from "../context/timelinesContext";

const TimelineAddImage = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { state, uploadImageTimeline } = useContext(TimelineContext);
  const [title] = useState('title ');
  const [description] = useState('desc asd');
  const [id] = useState('vqMcIgKRhkU3f20okm0j');

   //  const [title] = useState(navigation.getParam('title'));
  // const [description] = useState(navigation.getParam('description'));
  // const [id] = useState(navigation.getParam('id'));

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
  
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={openImagePickerAsync}>
              <Text style={styles.buttonText}>Choose Photo</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => uploadImageTimeline({ timelineId : id, image : selectedImage.localUri})}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('TimelinesHome')}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
          );
        }else{
          return (
            <ScrollView style={styles.container}>
            <Image source={{ uri: 'https://pianomaster.ie/wp-content/uploads/2019/04/no-image.jpg' }} style={styles.logo} />
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
              onPress={() => uploadImageTimeline({ id, image : selectedImage.localUri})}>
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
          alignSelf:'center'
        },
        instructions: {
          marginLeft: 5,
          marginTop: 5,
          fontWeight: 'bold',
          fontSize:18
        },
        title:{
          margin:5,
          fontSize:18
        },
        description:{
          margin:5,
          fontSize:18,
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