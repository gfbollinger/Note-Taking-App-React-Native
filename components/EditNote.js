import React, { useState, useContext } from "react"
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text  } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import ImagePicked from "./ImagePicked";
import CameraImagePicked from "./CameraImagePicked";
import GetLocation from "./GetLocation";
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";

const EditNote = ({route, navigation, ...props}) => {

  const { i, n } = route.params

  const {notes, setNotes} = useContext(NoteContext)

  const [newEdit, setNewEdit]  = useState(n)
  const [newEditImg, setNewEditImg] = useState(n.image)
  const [newEditCameraImg, setNewEditCameraImg] = useState(n.cameraImage)
  const [showLocation, setShowLocation] = useState(false)

  const notesColors = ["#FFCE3A", "#FFA348", "#EF785E", "#7ECCFF", "#1ECDC4", "#BB8EFF"]

  let editedNote = [...notes]
  let thisNoteImg = editedNote[i].image
  let thisNoteCameraImg = editedNote[i].cameraImage

  function updateNote() {
    editedNote[i] = newEdit
    editedNote[i].title = newEdit.title
    editedNote[i].body = newEdit.body
    editedNote[i].color = newEdit.color
    editedNote[i].date = newEdit.date
    editedNote[i].image = newEditImg
    editedNote[i].cameraImage = newEditCameraImg
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

              { showLocation &&
                <GetLocation />
              }

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
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: Style.color,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Poppins_600SemiBold"
  },
  textInput: {
    height: 200,
    padding: 10,
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
})

export default EditNote