import React, { useState, useEffect, useContext } from "react"
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNote from './components/AddNote';
import ArchivedNotes from './components/ArchivedNotes';
import EditNote from './components/EditNote';
import Note from './components/Note';
import About from './components/About';
import MenuNavigation from "./components/MenuNavigation";
import NoteContext, { NoteProvider } from "./context/NoteContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from './components/Notes';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./components/UI/Loading";


const Stack = createStackNavigator();

export default function Main() {

  /* const [recordings, setRecordings] = useState([]); */
  const [archived, setArchived] = useState([])

  /* From context */
  const { note, setNote, notes, setNotes } = useContext(NoteContext)
  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_700Bold });

  function handleNote() {
    let selectedImgUri = ""
    let selectedCameraImgUri = ""

    /* Check if there is an img */
    if (note.image) {
      selectedImgUri = note.image.localUri
    }

    /* Check if there an img from camera */
    if (note.cameraImage) {
      selectedCameraImgUri = note.cameraImage.localUri
    }

    /* TODO improve ID setting (currently using timestamp) */
    /* const noteNewId = notes.length ;
    console.log( typeof(noteNewId)) */

    let newNotes = [{
      noteId: note.noteId,
      title: note.title,
      body: note.body,
      date: note.date,
      color: note.color,
      image: selectedImgUri,
      cameraImage: selectedCameraImgUri,
      audios: note.audios,
      location: note.location,
      address: note.address
    }, ...notes]

    setNotes(newNotes)
    setNote({noteId: '', title: '', body: '', color:'', date:'', image: '', cameraImage:'', location:'', address: '', audios: ''})

    AsyncStorage.setItem("storedNotes", JSON.stringify(newNotes))
      .then( () => {
        setNotes(newNotes)
      }).catch( error => console.log(error) )

  }

  function archiveAllNotes() {
    let emptyArray = [...notes]
    let deletedCompArray = [...archived]
    emptyArray.forEach( (item, index) => {
      deletedCompArray.push(item)
    })

    emptyArray = []
    setNotes(emptyArray)
    setArchived(deletedCompArray)

    AsyncStorage.setItem("storedNotes", JSON.stringify(emptyArray))
      .then( () => {
        setNotes(emptyArray)
      })
      .catch( error => console.log(error) )

    AsyncStorage.setItem("archivedNotes", JSON.stringify(deletedCompArray))
      .then( () => {
        setArchived(deletedCompArray)
      })
      .catch( error => console.log(error) )
  }

  useEffect( () => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    AsyncStorage.getItem("storedNotes")
      .then ( data => {
        if( data != null){
          setNotes(JSON.parse(data))
        }
      }).catch( (error) => console.log(error))

      AsyncStorage.getItem("archivedNotes")
      .then ( data => {
        if( data != null){
          setArchived(JSON.parse(data))
        }
      }).catch( (error) => console.log(error))

      AsyncStorage.getItem("date")
  }

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
              fontFamily: "Poppins_700Bold",
              color: "#111",
              fontSize: 23,
              marginLeft: -15,
              marginTop: 2
            },
            headerTintColor: "#111"
          }
        }>

          <Stack.Screen name="Notes"
            options={
              ({ navigation, route }) => ({
                headerRight: () => (
                  <MenuNavigation navigation={navigation} archiveAllNotes={archiveAllNotes} />
                ), 
                title: "Notes",
                headerTitleStyle: {
                  fontFamily: "Poppins_700Bold",
                  color: "#111",
                  fontSize: 26,
                  paddingTop: 16
                },
              })
            }
          >
            { props => <Notes {...props}
              archived={archived}
              setArchived={setArchived}
              archiveAllNotes={archiveAllNotes}
            /> }
          </Stack.Screen>

          <Stack.Screen name="Note"
            options={{
              title: 'Note',
            }}
          >
            { props => <Note {...props}
              archived={archived}
              setArchived={setArchived}
            />}
          </Stack.Screen>

          <Stack.Screen
            name="AddNote"
            options={{
              title: 'Add New Note',
            }}
          >
            {props => <AddNote {...props}
              handleNote={handleNote}
              /* recordings={recordings}
              setRecordings={setRecordings} */
            />}
          </Stack.Screen>

          <Stack.Screen
            name="ArchivedNotes"
            options={{
              title: 'Archived Notes',
            }}>
            {props => <ArchivedNotes {...props} archived={archived} setArchived={setArchived} />}
          </Stack.Screen>

          <Stack.Screen
            name="EditNote"
            options={{
              title: 'Edit Note',
            }}
          >
            {props => <EditNote {...props} />}
          </Stack.Screen>

          <Stack.Screen
            name="About"
            options={{
              title: 'About Page',
            }}
          >
            {props => <About {...props} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
