import React, { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import ImagePickerComp from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import AudioRecorder from "./AudioRecorder";
import GetLocation from "./GetLocation"

const AddNote = ({navigation, ...props}) => {

  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  const notesColors = ["#FFF495", "#FFDBA6", "#AEFFF5", "#FFB7F8"]

  function handleNoteColor(color) {
    props.setNoteColor(color)
  }

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView
          /* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */
          /* behavior={'padding'} */
        >
          <TouchableWithoutFeedback /* onPress={Keyboard.dismiss} */>
            <View style={{padding: 20, justifyContent: "space-around"}}>

              {/* <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={props.note}
                onChangeText={(text) => props.setNote(text)}
              /> */}

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={props.noteTitle}
                onChangeText={(text) => props.setNoteTitle(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={props.noteBody}
                onChangeText={(text) => props.setNoteBody(text)}
              />

              <View style={styles.colorPickerContainer}>
                <Text style={styles.colorPickerTitle}>Pick a color:</Text>
                <View style={styles.colorBtnsContainer}>
                  {
                    notesColors.map( (color, index) => {
                      return (
                        <TouchableOpacity 
                          key={color} 
                          style={[styles.buttonColor, { backgroundColor: color }, props.noteColor === color ? styles.colorSelected : styles.colorNotSelected ]} 
                          onPress={() => handleNoteColor(color)}
                        >
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>

              <View style={styles.addMediaContainer}>
                <ImagePickerComp
                  selectedImage={props.selectedImage}
                  setSelectedImage={props.setSelectedImage}
                />
                <CameraImagePicker
                  cameraImage={props.cameraImage}
                  setCameraImage={props.setCameraImage}
                />

                <TouchableOpacity style={styles.buttonIcon} onPress={ () => setShowAudioRecorder(!showAudioRecorder)}>
                  <Icon name="mic-outline" fill="white" style={{width: 30, height: 30 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonIcon} onPress={ () => setShowLocation(!showLocation)}>
                  <Icon name="navigation-2-outline" fill="white" style={{width: 30, height: 30 }} />
                </TouchableOpacity>

              </View>

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
                  if (props.noteTitle === ""){
                    Alert.alert("Please Add a title to the note")
                  }
                  if (props.noteColor === ""){
                    Alert.alert("Please select a color for the note")
                  }
                  else{
                    props.handleNote()
                    navigation.navigate('Notes')
                  }
                  }
                }
              >
                <Text style={{ color: "#fff"}} >Add Note</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>


        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  textInputTitle: {
    height: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10
  },
  textInput: {
    height: 200,
    padding: 10,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
    textAlignVertical : 'top'
  },
  button: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
    marginRight: 10
  },
  buttonIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
    marginLeft: 5
  }
})

export default AddNote