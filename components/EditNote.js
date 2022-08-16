import React, { useState, useContext, useEffect } from "react"
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text, Alert  } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import ImagePicked from "./ImagePicked";
import CameraImagePicked from "./CameraImagePicked";
import GetLocation from "./GetLocation";
import AudioRecorder from "./AudioRecorder";
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";

const EditNote = ({route, navigation, ...props}) => {

  const { i, noteId } = route.params

  const {notes, setNotes} = useContext(NoteContext)

  const [newEdit, setNewEdit] = useState(notes.find( x => x.noteId === noteId))
  console.log(newEdit)

  const [newEditImg, setNewEditImg] = useState(newEdit.image)
  const [newEditCameraImg, setNewEditCameraImg] = useState(newEdit.cameraImage)
  const [showAudios, setShowAudios] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  useEffect( () => {
    setNewEdit(notes.find( x => x.noteId === noteId))
  }, [])

  const notesColors = ["#FFCE3A", "#FFA348", "#EF785E", "#7ECCFF", "#1ECDC4", "#BB8EFF"]

  /* TODO change editedNote (variable named wrong)  */
  let editedNote = [...notes]
  let thisNoteImg = editedNote[i].image
  let thisNoteCameraImg = editedNote[i].cameraImage

  /* TODO change the use of editedNote[i] */
  function updateNote() {
    editedNote[i] = newEdit
    editedNote[i].title = newEdit.title
    editedNote[i].body = newEdit.body
    editedNote[i].color = newEdit.color
    editedNote[i].date = newEdit.date
    editedNote[i].image = newEdit.image
    editedNote[i].cameraImage = newEdit.cameraImage
    editedNote[i].audios = newEdit.audios
    editedNote[i].location = newEdit.location
    editedNote[i].address = newEdit.address

    setNotes(editedNote)
    navigation.navigate('Notes')

    AsyncStorage.setItem("storedNotes", JSON.stringify(editedNote))
      .then( () => {
        setNotes(editedNote)
      })
      .catch( error => console.log(error) )

  }

  function deleteAudios(){
    Alert.alert(
      "Delete",
      "Are you sure that you want to delete this note's audios?",
      [
        {
          text: "No",
          onPress: () => console.log("Pressed: NO"),
          style: "cancel"
        },
        {
          text: " Yes",
          onPress: () => {
            setNewEdit({ ...newEdit, audios: ''})
          }
        }
      ]
    )
  }

  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) {
    return <Loading />
  }

  return(
    <View style={styles.container}>
      <ScrollView>

            <View style={{padding: 20, justifyContent: "space-around"}}>

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={newEdit.title}
                onChangeText={(text) => setNewEdit({ ...newEdit, title: text})}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.body}
                onChangeText={(text) => setNewEdit({ ...newEdit, body: text })}
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
                          onPress={() => setNewEdit({ ...newEdit, color: newColor })}>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>


              <View style={styles.addMediaContainer}>
                <Text style={styles.attachTitle}>Attach:</Text>

                <ImagePicker
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

                {/* TODO: Add the Audio recorder to add new audios to the note */}
                {/* <TouchableOpacity onPress={ () => setShowAudios(!showAudios)} style={Style.buttonIcon}>
                  <Icon name="mic-outline" fill="white" style={{width: 36, height: 36 }} />
                </TouchableOpacity> */}

                <TouchableOpacity onPress={ () => setShowLocation(!showLocation)} style={Style.buttonIcon}>
                  <Icon name="navigation-2-outline" fill="white" style={{width: 36, height: 36 }} />
                </TouchableOpacity>

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

              {/* TODO Add confirmation to remove audios */}
              { newEdit.audios ?
                <TouchableOpacity style={styles.btnDeleteAudios} onPress= { () => deleteAudios() }>
                  <Icon name="trash-2-outline" fill="white" style={{width: 30, height: 30 }} />
                  <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular", marginLeft: 5 }}>Delete Audios</Text>
                </TouchableOpacity>
                : <></>
              }

              { showLocation &&
                <GetLocation />
              }


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
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  textInputTitle: {
    height: 46,
    paddingLeft: 0,
    borderBottomWidth: 2,
    borderBottomColor: Style.color,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Poppins_600SemiBold"
  },
  textInput: {
    height: 200,
    padding: 0,
    /* borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8, */
    fontSize: 16,
    textAlignVertical : 'top',
    fontFamily: "Poppins_400Regular"
  },
  button: {
    backgroundColor: Style.greyDarkercolor,
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
  attachTitle: {
    marginRight: 10,
    fontFamily: "Poppins_400Regular"
  },
  buttonColor: {
    height: 40,
    width: 40,
    marginRight: 5,
    borderRadius: Style.borderRadius,
    borderColor: Style.greyDarkcolor
  },
  colorSelected: {
    borderWidth: 3,
  },
  colorNotSelected: {
    borderWidth: 0,
  },
  addMediaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30
  },
  btnDeleteAudios: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
  }
})

export default EditNote