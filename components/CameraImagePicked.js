import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteContext from "../context/NoteContext";

const CameraImagePicked = (props) => {
  const { cameraImage, setCameraImage } = useContext(NoteContext)

  /* If adding a new note and selected an image */
  if (cameraImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: cameraImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={ () => setCameraImage(null)}>
          <Text>Remove Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* If editing a note with existing image */
  if (props.newEditCameraImg && props.isEdit){
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
  }
  return <></>
}

export default CameraImagePicked

const styles = StyleSheet.create({
  container: {},
  instructions: {
    marginTop: 15,
    marginBottom: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
})