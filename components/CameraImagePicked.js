import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteContext from "../context/NoteContext";
import { Icon } from '@ui-kitten/components';

const CameraImagePicked = (props) => {
  const { note, setNote } = useContext(NoteContext)

  /* If adding a new note and selected an image */
  if (note.cameraImage) {
    return (
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: note.cameraImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={ () => setNote({ ...note, cameraImage: null})} style={styles.closeButton}>
            <Icon name="close-circle-outline" fill="white" style={{width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* If editing a note with existing image */
  if (props.newEditCameraImg && props.isEdit){
    return (
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: props.newEditCameraImg }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={ () => props.setNewEditCameraImg(null)} style={styles.closeButton}>
            <Icon name="close-circle-outline" fill="white" style={{width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
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
  thumbnailContainer: {
    position: 'relative',
    width: 100
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -17,
    right: -17,
    backgroundColor: 'black',
    borderRadius: 80
  }
})