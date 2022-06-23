import React, { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import * as Style from "./../assets/styles"
import { Button, ButtonGroup } from '@ui-kitten/components';
import ImagePickerComp from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import AudioRecorder from "./AudioRecorder";
import GetLocation from "./GetLocation"

const AddNote = ({navigation, ...props}) => {


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
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFF495"}]} onPress={() => props.setNoteColor('#FFF495')}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFDBA6"}]} onPress={() => props.setNoteColor('#FFDBA6')}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#AEFFF5"}]} onPress={() => props.setNoteColor('#AEFFF5')}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFB7F8"}]} onPress={() => props.setNoteColor('#FFB7F8')}></TouchableOpacity>
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
              </View>

              <AudioRecorder recordings={props.recordings} setRecordings={props.setRecordings} />

              <GetLocation
                location={props.location}
                setLocation={props.setLocation}
                myAddress={props.myAddress}
                setMyAddress={props.setMyAddress}
              />

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
                <Text style={{ color: "#fff"}} >Add</Text>
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
    borderRadius: 50
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
  }
})

export default AddNote