import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoteContext from "../context/NoteContext";

const ImagePicked = (props) => {
  const { selectedImage, setSelectedImage } = useContext(NoteContext)

  /* If adding a new note and selected an image */
  if (selectedImage !== null) {
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
  }

  /* If editing a note with existing image */
  if (props.newEditImg && props.isEdit){
    return (
      <View style={styles.container}>
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
  return <></>
}

export default ImagePicked

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