import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import NoteContext from "../context/NoteContext";
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComp({...props}) {

  const { setSelectedImage } = useContext(NoteContext)

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
      setSelectedImage({ localUri: pickerResult.uri });
    }

  }

  /* If adding a new note and selected an image */
  /* if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => setSelectedImage(null)}>
          <Text>Remove Image</Text>
        </TouchableOpacity>
      </View>
    );
  } */

  /* Button to select image  */
  return (
    <View style={styles.container}>
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
  buttonIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
  }
})