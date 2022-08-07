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


const Stack = createStackNavigator();

export default function Main() {

  const [recordings, setRecordings] = useState([]);
  const [location, setLocation] = useState();
  const [myAddress, setMyAddress] = useState([{}]);
  const [archived, setArchived] = useState([])

  /* From context */
  const { note, setNote, notes, setNotes } = useContext(NoteContext)

  const menuOptions = {
    headerTitleStyle: {
      fontFamily: "Poppins_700Bold",
      color: "#8F9BB3",
      fontSize: 21,
    },
    headerTintColor: "#8F9BB3"
  }

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

    let newNotes = [{ title: note.title, body: note.body, date: note.date, color: note.color, image: selectedImgUri, cameraImage: selectedCameraImgUri, audios: recordings, location: location, myAddress: myAddress }, ...notes]
    setNotes(newNotes)
    setNote({title: '', body: '', color:'', date:'', image: '', cameraImage:''})
    setLocation()
    setMyAddress()

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
    return <Text>Loading</Text>
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Notes"
            options={
              ({ navigation, route }) => ({
                headerRight: () => (
                  <MenuNavigation navigation={navigation} archiveAllNotes={archiveAllNotes} />
                ), 
                title: "My Notes",
                ...menuOptions
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
              ...menuOptions
            }}
          >
            { props => <Note {...props}
              archived={archived}
              setArchived={setArchived}
              /* recordings={recordings} */
              location={location}
              myAddress={myAddress}
            />}
          </Stack.Screen>

          <Stack.Screen
            name="AddNote"
            options={{
              title: 'Add New Note',
              ...menuOptions
            }}
          >
            {props => <AddNote {...props}
              handleNote={handleNote}
              recordings={recordings}
              setRecordings={setRecordings}
              location={location}
              setLocation={setLocation}
              myAddress={myAddress}
              setMyAddress={setMyAddress}
            />}
          </Stack.Screen>

          <Stack.Screen
            name="ArchivedNotes"
            options={{
              title: 'Archived Notes',
              ...menuOptions
            }}>
            {props => <ArchivedNotes {...props} archived={archived} setArchived={setArchived} />}
          </Stack.Screen>

          <Stack.Screen
            name="EditNote"
            options={{
              title: 'Edit Note',
              ...menuOptions
            }}
          >
            {props => <EditNote {...props} />}
          </Stack.Screen>

          <Stack.Screen
            name="About"
            options={{
              title: 'About Page',
              ...menuOptions
            }}
          >
            {props => <About {...props} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
