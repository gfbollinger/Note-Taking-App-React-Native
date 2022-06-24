import React, { useState, useEffect, useContext } from "react"
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
import NoteContext, { NoteProvider } from "./context/NoteContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from './components/Notes';


const Stack = createStackNavigator();

export default function Main() {

  const [note, setNote] = useState()

  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")
  const [noteColor, setNoteColor] = useState("")
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [cameraImage, setCameraImage] = React.useState(null);
  const [recordings, setRecordings] = useState([]);
  const [location, setLocation] = useState();
  const [myAddress, setMyAddress] = useState([{}]);

  
  const [date, setDate] = useState(new Date().toUTCString())
  const [archived, setArchived] = useState([])

  const [notesFiltered, setNotesFiltered] = useState([])

  /* From context */
  const {notes} = useContext(NoteContext)
  const {setNotes} = useContext(NoteContext)

  function handleNote() {
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
    setNoteColor('')
    setSelectedImage(null)
    setCameraImage(null)
    setRecordings([])
    setLocation()
    setMyAddress()
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
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Notes"
            options={
              ({ navigation, route }) => ({
                headerRight: () => (
                  <MenuNavigation navigation={navigation} archiveAllNotes={archiveAllNotes} />
                ), 
                title: "My Notes"
              })
            }
          >
            { props => <Notes {...props}
              note={note}
              setNote={setNote}
              date={date}
              setDate={setDate}
              archived={archived}
              setArchived={setArchived}
              notesFiltered={notesFiltered}
              setNotesFiltered={setNotesFiltered}
              archiveAllNotes={archiveAllNotes}
            /> }
          </Stack.Screen>

          <Stack.Screen name="Note" options={{ title: 'Note Content' }}>
            { props => <Note {...props}
              note={note}
              setNote={setNote}
              archived={archived}
              setArchived={setArchived}
              /* recordings={recordings} */
              location={location}
              myAddress={myAddress}
            />}
          </Stack.Screen>

          <Stack.Screen name="AddNote" options={{ title: 'Add New Note' }}>
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

          <Stack.Screen name="DeletedNotes" options={{ title: 'Archived Notes' }}>
            {props => <DeletedNotes {...props} archived={archived} setArchived={setArchived} notes={notes} setNotes={setNotes} date={date} />}
          </Stack.Screen>

          <Stack.Screen name="EditNote" options={{ title: 'Edit Note' }}>
            {props => <EditNote {...props}
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

          <Stack.Screen name="About" options={{ title: 'About Page' }}>
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
