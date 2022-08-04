import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity, Text  } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePickerComp from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import ImagePicked from "./ImagePicked";
import CameraImagePicked from "./CameraImagePicked";
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const EditNote = ({route, navigation, ...props}) => {

  const { i, n } = route.params

  const {notes, setNotes} = useContext(NoteContext)

  const [newEdit, setNewEdit]  = useState(n)
  const [newEditImg, setNewEditImg] = useState(n.img)
  const [newEditCameraImg, setNewEditCameraImg] = useState(n.camImg)

  const notesColors = ["#FFF495", "#FFDBA6", "#AEFFF5", "#FFB7F8"]

  let editedNote = [...notes]
  let thisNoteImg = editedNote[i].img
  let thisNoteCameraImg = editedNote[i].camImg

  function updateNote() {
    editedNote[i] = newEdit
    editedNote[i].title = newEdit.title
    editedNote[i].body = newEdit.body
    editedNote[i].color = newEdit.color
    editedNote[i].date = newEdit.date
    editedNote[i].img = newEditImg
    editedNote[i].camImg = newEditCameraImg
    editedNote[i].audios = newEdit.audios
    editedNote[i].myAddress = newEdit.myAddress

    setNotes(editedNote)
    navigation.navigate('Notes')

    AsyncStorage.setItem("storedNotes", JSON.stringify(editedNote))
      .then( () => {
        setNotes(editedNote)
      })
      .catch( error => console.log(error) )

  }

  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return(
    <>
      <ScrollView>

          <TouchableWithoutFeedback /* onPress={Keyboard.dismiss} */>

            <View style={{padding: 20, justifyContent: "space-around"}}>

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={newEdit.title}
                onChangeText={(text) => setNewEdit({ title: text, body: newEdit.body, color: newEdit.color, date: newEdit.date, img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress})}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.body}
                onChangeText={(text) => setNewEdit({ title: newEdit.title, body: text, color: newEdit.color, date: newEdit.date, img: newEdit.img, camImg: newEdit.camImg, audios: newEdit.audios, myAddress: newEdit.myAddress })}
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
                </View>
              </View>


              <View style={styles.addMediaContainer}>

                <ImagePickerComp
                  setNewEdit={setNewEdit}
                  thisNoteImg={thisNoteImg}
                  isEdit={true}
                  newEditImg={newEditImg}
                  setNewEditImg={setNewEditImg}
                />

                <CameraImagePicker
                  setNewEdit={setNewEdit}
                  thisNoteCameraImg={thisNoteCameraImg}
                  isEdit={true}
                  newEditCameraImg={newEditCameraImg}
                  setNewEditCameraImg={setNewEditCameraImg}
                />

              </View>

              <ImagePicked
                isEdit={true}
                newEditImg={newEditImg}
                setNewEditImg={setNewEditImg}
              />

              <CameraImagePicked 
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
                <Text style={ styles.buttonUpdateNote } >Update</Text>
              </TouchableOpacity>

            </View>

          </TouchableWithoutFeedback>

      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  textInputTitle: {
    height: 50,
    paddingTop: 6,
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular"
  },
  textInput: {
    height: 200,
    padding: 10,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
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
    marginTop: 10
  },
  buttonUpdateNote:  {
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
    marginRight: 5
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
})

export default EditNote