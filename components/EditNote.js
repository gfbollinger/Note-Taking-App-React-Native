import React, { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text  } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePickerComp from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";

const EditNote = ({route, navigation, ...props}) => {

  const { i, n } = route.params

  const [newEdit, setNewEdit]  = useState(n)
  const [newEditImg, setNewEditImg] = useState(n.img)
  const [newEditCameraImg, setNewEditCameraImg] = useState(n.camImg)

  const notesColors = ["#FFF495", "#FFDBA6", "#AEFFF5", "#FFB7F8"]

  let editedNote = [...props.notes]
  let thisNoteImg = editedNote[i].img
  let thisNoteCameraImg = editedNote[i].camImg

  function updateNote() {
    editedNote[i] = newEdit
    editedNote[i].title = newEdit.title
    editedNote[i].body = newEdit.body
    editedNote[i].color = newEdit.color
    editedNote[i].img = newEditImg
    editedNote[i].camImg = newEditCameraImg
    editedNote[i].audios = newEdit.audios
    editedNote[i].myAddress = newEdit.myAddress

    props.setNotes(editedNote)
    navigation.navigate('Notes')

    AsyncStorage.setItem("storedNotes", JSON.stringify(editedNote))
      .then( () => {
        props.setNotes(editedNote)
      })
      .catch( error => console.log(error) )

  }


  return(
    <>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          /* behavior={'padding'} */
        >
          <TouchableWithoutFeedback /* onPress={Keyboard.dismiss} */>

            <View style={{padding: 20, justifyContent: "space-around"}}>

              {/* <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.toString()}
                onChangeText={(text) => setNewEdit(text)}
              /> */}

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={newEdit.title}
                onChangeText={(text) => setNewEdit({ title: text, body: newEdit.body, color: newEdit.color})}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.body}
                onChangeText={(text) => setNewEdit({ title: newEdit.title, body: text, color: newEdit.color })}
              />

              <View style={styles.colorPickerContainer}>
                <Text style={styles.colorPickerTitle}>Pick a color:</Text>
                <View style={styles.colorBtnsContainer}>
                  {
                    notesColors.map( newColor => {
                      return (
                        <TouchableOpacity
                          key={newColor}
                          style={[styles.buttonColor, { backgroundColor: newColor}, newEdit.color === newColor ? styles.colorSelected : styles.colorNotSelected]} 
                          onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: newColor, img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}>
                        </TouchableOpacity>
                      )
                    })
                  }
                  {/* <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFF495"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFF495", img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFDBA6"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFDBA6", img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#AEFFF5"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#AEFFF5", img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}></TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFB7F8"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFB7F8", img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}></TouchableOpacity> */}
                </View>
              </View>

              <ImagePickerComp
                selectedImage={props.selectedImage}
                setSelectedImage={props.setSelectedImage}
                setNewEdit={setNewEdit}
                thisNoteImg={thisNoteImg}
                isEdit={true}
                newEditImg={newEditImg}
                setNewEditImg={setNewEditImg}
              />

              <CameraImagePicker
                cameraImage={props.cameraImage}
                setCameraImage={props.setCameraImage}
                setNewEdit={setNewEdit}
                thisNoteCameraImg={thisNoteCameraImg}
                isEdit={true}
                newEditCameraImg={newEditCameraImg}
                setNewEditCameraImg={setNewEditCameraImg}
              />

              {/* TODO: Add button to remove audios if it has, setting setRecordings to empty array */}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (props.note === ""){
                    Alert.alert("Please Type Something")
                  }
                  else{
                    updateNote()
                  }
                  }
                }

              >
                <Text style={{ color: "#fff"}} >Update</Text>
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
    padding: 5,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10
  },
  textInput: {
    height: 200,
    padding: 5,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
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
    marginRight: 5
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
})

export default EditNote