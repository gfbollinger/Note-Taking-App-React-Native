import React, { useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import NoteContext from "../context/NoteContext";
import { Icon } from '@ui-kitten/components';
import * as Style from "./../assets/styles"

const CameraImagePicker = ({...props}) =>{

  const { note, setNote } = useContext(NoteContext)

  let openCameraImagePickerAsync = async () => {
    let permissionCameraResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionCameraResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerCameraResult = await ImagePicker.launchCameraAsync();
    /* console.log(pickerCameraResult); */

    if (pickerCameraResult.cancelled === true) {
      return;
    }

    /* If I am editing: */
    if (props.isEdit){
      props.setNewEditCameraImg(pickerCameraResult.uri)
    }

    /* If I am not editing */
    if (!props.isEdit){
      setNote({ ...note, cameraImage: { localUri: pickerCameraResult.uri }});
    }

  }


  /* If adding a new note and selected an image */
  /* if (cameraImage !== null) {
    return (
      <View style={styles.container}>
        <Text style={styles.thumbnailText}>Image took with camera:</Text>
        <Image
          source={{ uri: cameraImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => setCameraImage(null)}>
          <Text>Remove Photo</Text>
        </TouchableOpacity>
      </View>
    );
  } */

  /* If editing a note with existing image */
  /* if (props.newEditCameraImg && props.isEdit){
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: props.newEditCameraImg }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => props.setNewEditCameraImg(null)}>
          <Text>Remove Photo</Text>
        </TouchableOpacity>
      </View>
    );
  } */

  /* If creating a new note and haven´t selected an image yet  */
  return (
    <View style={styles.container}>
      {/* <Text style={styles.instructions}>
        Press the button below to take a picture!
      </Text> */}

      <TouchableOpacity onPress={openCameraImagePickerAsync} style={Style.buttonIcon}>
        <Icon name="camera-outline" fill="white" style={{width: 36, height: 36 }} />
      </TouchableOpacity>

    </View>
  );

}

export default CameraImagePicker

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
    marginBottom: 10,
  },
  /* buttonIcon: {
    padding: 8,
    borderRadius: Style.borderRadius,
    backgroundColor: Style.color,
    marginLeft: 8,
    ...Style.shadow,
  } */
})