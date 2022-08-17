import React, { useState, useContext, useEffect } from "react"
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import ImagePicker from "./ImagePicker";
import CameraImagePicker from "./CameraImagePicker";
import AudioRecorder from "./AudioRecorder";
import GetLocation from "./GetLocation"
import NoteContext from "../context/NoteContext";
import ImagePicked from "./ImagePicked";
import CameraImagePicked from "./CameraImagePicked";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";

const AddNote = ({navigation, ...props}) => {

  /* State from Context */
  const { note, setNote, notes } = useContext(NoteContext)

  const [showAudioRecorder, setShowAudioRecorder] = useState(false)
  const [showLocation, setShowLocation] = useState(false)

  const notesColors = ["#FFCE3A", "#FFA348", "#EF785E", "#7ECCFF", "#1ECDC4", "#BB8EFF"]

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  function handleNoteColor(color) {
    setNote({ ...note, color: color })
  }

  function formatDate() {
    let newDate = new Date();
    let dd = String(newDate.getDate()).padStart(2, '0');
    let mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = newDate.getFullYear();
    let hh = newDate.getHours();
    let mins = (newDate.getMinutes() < 10) ? `0${newDate.getMinutes()}` : newDate.getMinutes();

    newDate = `${dd}/${mm}/${yyyy}, ${hh}:${mins}hs.`;
    /* TODO replace noteId currently created with date */
    setNote({ ...note, date: newDate, noteId: new Date().getTime() })
  }

  useEffect( () => {
    formatDate();
  }, [])

  console.log(note)

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={{padding: 20, justifyContent: "space-around"}}>

            <TextInput
              style={styles.textInputTitle}
              placeholder="Title"
              value={note.title}
              onChangeText={(text) => setNote({ ...note, title: text })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Type Here"
              multiline={true}
              value={note.body}
              onChangeText={(text) => setNote({ ...note, body: text })}
            />

            <View style={styles.colorPickerContainer}>
              <Text style={styles.colorPickerTitle}>Pick a color:</Text>
              <View style={styles.colorBtnsContainer}>
                {
                  notesColors.map( (color, index) => {
                    return (
                      <TouchableOpacity 
                        key={color} 
                        style={[styles.buttonColor, { backgroundColor: color }, note.color === color ? styles.colorSelected : styles.colorNotSelected ]} 
                        onPress={() => handleNoteColor(color)}
                      >
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>

            <View style={styles.addMediaContainer}>
              <Text style={styles.attachTitle}>Attach:</Text>
              <ImagePicker />
              <CameraImagePicker />

              <TouchableOpacity onPress={ () => setShowAudioRecorder(!showAudioRecorder)} style={Style.buttonIcon}>
                <Icon name="mic-outline" fill="white" style={{width: 36, height: 36 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={ () => setShowLocation(!showLocation)} style={Style.buttonIcon}>
                <Icon name="navigation-2-outline" fill="white" style={{width: 36, height: 36 }} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 15, borderTopWidth: 1, borderTopColor: Style.color, paddingTop: 15 }}>
              <Icon name="image-outline" fill={Style.greyDarkercolor} style={{width: 20, height: 20, marginRight: 4 }} />
              <Text style={Style.smallTitle}>Attached Images:</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <ImagePicked />
              </View>

              <View style={{ marginLeft: 20 }}>
                <CameraImagePicked />
              </View>
            </View>

            {
              showAudioRecorder &&
                <>
                  <View style={{ flexDirection: "row", marginTop: 20, borderTopWidth: 1, borderTopColor: Style.color, paddingTop: 15 }}>
                    <Icon name="mic-outline" fill={Style.greyDarkercolor} style={{width: 20, height: 20, marginRight: 4 }} />
                    <Text style={Style.smallTitle}>Attached Audios:</Text>
                  </View>
                  <AudioRecorder />
                </>
            }

            {
              showLocation &&
                <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: Style.color, paddingTop: 0 }}>
                  <GetLocation />
                </View>
            }

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!note.title){
                  Alert.alert("Please Add a title to the note")
                  return
                }
                if (!note.color){
                  Alert.alert("Please select a color for the note")
                  return
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
    paddingTop: 6,
    paddingLeft: 0,
    borderBottomWidth: 2,
    borderBottomColor: Style.color,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Poppins_600SemiBold"
  },
  textInput: {
    height: 200,
    fontSize: 16,
    textAlignVertical : 'top',
    fontFamily: "Poppins_400Regular"
  },
  button: {
    backgroundColor: "#02B283",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: Style.greyDarkercolor,
    ...Style.shadow
  },
  buttoAddNote:  {
    color: "#fff",
    fontFamily: "Poppins_400Regular",
    fontSize: 17,
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
    borderRadius: Style.borderRadius,
    borderColor: Style.greyDarkcolor,
    ...Style.shadow
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
    marginBottom: 30,
    alignItems: "center",
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
  /* buttonIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#8F9BB3",
    marginLeft: 5
  } */
})

export default AddNote