import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* import SafeAreaView from 'react-native-safe-area-view'; */
import AddNote from './components/AddNote';
import DeletedNotes from './components/DeletedNotes';
import EditNote from './components/EditNote';
import Note from './components/Note';
import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Icon, Button, Card } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Notes from './components/Notes';

const Stack = createStackNavigator();

export default function App() {

  const [note, setNote] = useState()

  /* const [noteData, setNoteData] = useState({ title:"" , body:""}) */
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")

  const [notes, setNotes] = useState([])
  const [date, setDate] = useState(new Date().toUTCString())
  const [archived, setArchived] = useState([])

  function handleNote() {
    /* setNoteData( {title: noteTitle, body: noteBody} )
    let newNote = noteData */
    let newDate= new Date().toUTCString()
    setDate(newDate)
    let newNotes = [{ title: noteTitle, body: noteBody, date: date }, ...notes]
    setNotes(newNotes)
    setNoteTitle('')
    setNoteBody('')
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

            <Stack.Screen name="Notes">
              { props => <Notes {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote} date={date} setDate={setDate} archived={archived} setArchived={setArchived} /> }
            </Stack.Screen>

            <Stack.Screen name="Note">
              { props => <Note {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote} archived={archived} setArchived={setArchived}/> }
            </Stack.Screen>

            <Stack.Screen name="AddNote">
              {props => <AddNote {...props} noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteBody={noteBody} setNoteBody={setNoteBody} note={note} setNote={setNote} handleNote={handleNote} />}
            </Stack.Screen>

            <Stack.Screen name="DeletedNotes">
              {props => <DeletedNotes {...props} archived={archived} setArchived={setArchived} notes={notes} setNotes={setNotes} date={date} />}
            </Stack.Screen>

            <Stack.Screen name="EditNote">
              {props => <EditNote {...props} notes={notes} setNotes={setNotes} noteTitle={noteTitle} setNoteTitle={setNoteTitle} noteBody={noteBody} setNoteBody={setNoteBody} />}
            </Stack.Screen>

          </Stack.Navigator>

        </NavigationContainer>

      </ApplicationProvider>
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
