import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import ImagePickerComp from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import AudioRecorder from "./AudioRecorder";
import GetLocation from "./GetLocation"
import NoteContext from "../context/NoteContext";
import ImagePicked from "./ImagePicked";
import CameraImagePicked from "./CameraImagePicked";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const AddNote = ({navigation, ...props}) => {

  /* State from Context */
  const {noteTitle, setNoteTitle, noteBody, setNoteBody, noteColor, setNoteColor } = useContext(NoteContext)

  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  const notesColors = ["#FFF495", "#FFDBA6", "#AEFFF5", "#FFB7F8"]

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_700Bold
  });

  function handleNoteColor(color) {
    setNoteColor(color)
  }

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback /* onPress={Keyboard.dismiss} */>
          <View style={{padding: 20, justifyContent: "space-around"}}>

            <TextInput
              style={styles.textInputTitle}
              placeholder="Title"
              value={noteTitle}
              onChangeText={(text) => setNoteTitle(text)}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Type Here"
              multiline={true}
              value={noteBody}
              onChangeText={(text) => setNoteBody(text)}
            />

            <View style={styles.colorPickerContainer}>
              <Text style={styles.colorPickerTitle}>Pick a color:</Text>
              <View style={styles.colorBtnsContainer}>
                {
                  notesColors.map( (color, index) => {
                    return (
                      <TouchableOpacity 
                        key={color} 
                        style={[styles.buttonColor, { backgroundColor: color }, noteColor === color ? styles.colorSelected : styles.colorNotSelected ]} 
                        onPress={() => handleNoteColor(color)}
                      >
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>

            <View style={styles.addMediaContainer}>
              <ImagePickerComp />
              <CameraImagePicker />

              <TouchableOpacity style={styles.buttonIcon} onPress={ () => setShowAudioRecorder(!showAudioRecorder)}>
                <Icon name="mic-outline" fill="white" style={{width: 30, height: 30 }} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonIcon} onPress={ () => setShowLocation(!showLocation)}>
                <Icon name="navigation-2-outline" fill="white" style={{width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>

            <ImagePicked />
            <CameraImagePicked />

            {
              showAudioRecorder &&
                <AudioRecorder recordings={props.recordings} setRecordings={props.setRecordings} />
            }

            {
              showLocation &&
                <GetLocation
                  location={props.location}
                  setLocation={props.setLocation}
                  myAddress={props.myAddress}
                  setMyAddress={props.setMyAddress}
                />
            }



            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (noteTitle === ""){
                  Alert.alert("Please Add a title to the note")
                }
                if (noteColor === ""){
                  Alert.alert("Please select a color for the note")
                }
                else{
                  props.handleNote()
                  navigation.navigate('Notes')
                }
                }
              }
            >
              <Text style={ styles.buttoAddNote } >Add Note</Text>
            </TouchableOpacity>

          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  textInputTitle: {
    height: 46,
    paddingTop: 6,
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: Style.color,
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Poppins_400Regular"
  },
  textInput: {
    height: 200,
    fontSize: 16,
    textAlignVertical : 'top',
    fontFamily: "Poppins_400Regular"
  },
  button: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttoAddNote:  {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 17
  },
  emptyButton: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  colorBtnsContainer: {
    flexDirection: "row"
  },
  buttonColor: {
    height: 40,
    width: 40,
    marginRight: 5,
    borderRadius: 50,
    borderColor: Style.color
  },
  colorSelected: {
    borderWidth: 3,
  },
  colorNotSelected: {
    borderWidth: 0,
  },
  addMediaContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  colorPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 0
  },
  colorPickerTitle: {
    marginRight: 10,
    fontFamily: "Poppins_400Regular"
  },
  buttonIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
    marginLeft: 5
  }
})

export default AddNote