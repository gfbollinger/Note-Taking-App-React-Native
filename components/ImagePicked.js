import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteContext from "../context/NoteContext";
import { Icon } from '@ui-kitten/components';
import Note from "./Note";

const ImagePicked = (props) => {
  const { note, setNote } = useContext(NoteContext)

  /* If adding a new note and selected an image */
  if (note.image) {
    return (
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: note.image.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={ () => setNote( {...note, image: null} )} style={styles.closeButton}>
            <Icon name="close-circle-outline" fill="white" style={{width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* If editing a note with existing image */
  if (props.newEditImg && props.isEdit){
    return (
      <View style={styles.container}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: props.newEditImg }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={ () => props.setNewEditImg(null)} style={styles.closeButton}>
            <Icon name="close-circle-outline" fill="white" style={{width: 35, height: 35 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return <></>
}

export default ImagePicked

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