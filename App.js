import React, { useState, useEffect } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import SafeAreaView from 'react-native-safe-area-view'; */
import AddNote from './components/AddNote';
import DeletedNotes from './components/DeletedNotes';
import EditNote from './components/EditNote';
import Note from './components/Note';
import About from './components/About';
import MenuNavigation from "./components/MenuNavigation";

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Icon, Card } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Notes from './components/Notes';
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {

  const [note, setNote] = useState()

  /* const [noteData, setNoteData] = useState({ title:"" , body:""}) */
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")
  const [noteColor, setNoteColor] = useState("")
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [cameraImage, setCameraImage] = React.useState(null);
  /* const [audioRecording, setAudioRecording] = React.useState(null); */
  const [recordings, setRecordings] = React.useState([]);
  const [location, setLocation] = useState();
  const [myAddress, setMyAddress] = useState([{}]);

  const [notes, setNotes] = useState([])
  const [date, setDate] = useState(new Date().toUTCString())
  const [archived, setArchived] = useState([])

  const [notesFiltered, setNotesFiltered] = useState([])

  function handleNote() {
    /* setNoteData( {title: noteTitle, body: noteBody} )
    let newNote = noteData */
    let newDate= new Date().toUTCString()
    setDate(newDate)

    let selectedImgUri = ""
    let selectedCameraImgUri = ""

    /* Check if there is an img */
    if (selectedImage != null && selectedImage != "") {
      selectedImgUri = selectedImage.localUri
    }

    /* Check if there an img from camera */
    if (cameraImage != null && cameraImage != "") {
      selectedCameraImgUri = cameraImage.localUri
    }

    let newNotes = [{ title: noteTitle, body: noteBody, date: date, color: noteColor, img: selectedImgUri, camImg: selectedCameraImgUri, audios: recordings, location: location, myAddress: myAddress }, ...notes]
    setNotes(newNotes)
    setNotesFiltered(newNotes)
    setNoteTitle('')
    setNoteBody('')
    setSelectedImage(null)
    setCameraImage(null)
    setRecordings([])
    setLocation(null)
    setMyAddress(null)
    console.log(notes)

    AsyncStorage.setItem("storedNotes", JSON.stringify(newNotes))
      .then( () => {
        setNotes(newNotes)
      }).catch( error => console.log(error) )

    AsyncStorage.setItem("date", JSON.stringify(date))
      .then( () => {
        setDate(date)
      })
  }

  useEffect( () => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    AsyncStorage.getItem("storedNotes")
      .then ( data => {
        if( data != null){
          setNotes(JSON.parse(data))
          /* Initial notes filtered same as notes */
          setNotesFiltered(JSON.parse(data))
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

  return (
    <>

      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>

        <NavigationContainer>

          <Stack.Navigator>

            <Stack.Screen name="Notes"
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <MenuNavigation navigation={navigation} />
                )
              })}
            >
              { props => <Notes {...props}
                notes={notes} 
                setNotes={setNotes}
                note={note}
                setNote={setNote}
                date={date}
                setDate={setDate}
                archived={archived}
                setArchived={setArchived}
                notesFiltered={notesFiltered}
                setNotesFiltered={setNotesFiltered}
              /> }
            </Stack.Screen>

            <Stack.Screen name="Note">
              { props => <Note {...props}
                notes={notes}
                setNotes={setNotes}
                note={note}
                setNote={setNote}
                archived={archived}
                setArchived={setArchived}
                recordings={recordings}
                location={location}
                myAddress={myAddress}
              />}
            </Stack.Screen>

            <Stack.Screen name="AddNote">
              {props => <AddNote {...props}
                noteTitle={noteTitle}
                setNoteTitle={setNoteTitle}
                noteBody={noteBody}
                setNoteBody={setNoteBody}
                note={note}
                setNote={setNote}
                handleNote={handleNote}
                noteColor={noteColor}
                setNoteColor={setNoteColor}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                cameraImage={cameraImage}
                setCameraImage={setCameraImage}
                recordings={recordings}
                setRecordings={setRecordings}
                location={location}
                setLocation={setLocation}
                myAddress={myAddress}
                setMyAddress={setMyAddress}
              />}
            </Stack.Screen>

            <Stack.Screen name="DeletedNotes">
              {props => <DeletedNotes {...props} archived={archived} setArchived={setArchived} notes={notes} setNotes={setNotes} date={date} />}
            </Stack.Screen>

            <Stack.Screen name="EditNote">
              {props => <EditNote {...props}
                notes={notes}
                setNotes={setNotes}
                noteTitle={noteTitle}
                setNoteTitle={setNoteTitle}
                noteBody={noteBody}
                setNoteBody={setNoteBody}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                cameraImage={cameraImage}
                setCameraImage={setCameraImage}
              />}
            </Stack.Screen>

            <Stack.Screen name="About">
              {props => <About {...props} />}
            </Stack.Screen>

          </Stack.Navigator>

        </NavigationContainer>

      </ApplicationProvider>
    </>
  );
}

/* function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);

  return <Text>Count: {count}</Text>;
} */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
