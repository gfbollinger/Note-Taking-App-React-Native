import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComp({...props}) {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    /* If I am editing: */
    if (props.isEdit){
      props.setNewEditImg(pickerResult.uri)
    }

    /* If I am not editing */
    if (!props.isEdit){
      props.setSelectedImage({ localUri: pickerResult.uri });
    }

  }

  /* If adding a new note and selected an image */
  if (props.selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Text style={styles.thumbnailText}>Image:</Text>
        <Image
          source={{ uri: props.selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => props.setSelectedImage(null)}>
          <Text>Remove Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* If editing a note with existing image */
  if (props.newEditImg && props.isEdit){
    return (
      <View style={styles.container}>
        <Text style={styles.thumbnailText}>Image:</Text>
        <Image
          source={{ uri: props.newEditImg }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => props.setNewEditImg(null)}>
          <Text>Remove Image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* If editing a note with no image */
  /* if (props.newEditImg === "" && props.isEdit){
    return (
      <View style={styles.container}>
        <Text>sss</Text>
      </View>
    );
  } */

  /* If creating a new note and haven´t selected an image yet  */
  return (
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>
        Press the button below to select an image!
      </Text> */}

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.buttonIcon}>
        <Icon name="image-outline" fill="white" style={{width: 30, height: 30 }} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  instructions: {
    marginTop: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#555",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff"
  },
  thumbnailText: {
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
  }
})