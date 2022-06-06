import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import AddNote from './components/AddNote';
import DeletedNotes from './components/DeletedNotes';
import EditNote from './components/EditNote';
import Note from './components/Note';
import React, { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';


import Notes from './components/Notes';

const Stack = createStackNavigator();

export default function App() {

  const [note, setNote] = useState()
  const [notes, setNotes] = useState([])
  const [date, setDate] = useState(new Date().toUTCString())
  const [archived, setArchived] = useState([])

  function handleNote() {
    let newNote = note
    let newNotes = [newNote, ...notes]
    setNotes(newNotes)
    setNote('')

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
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="Notes">
          { props => <Notes {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote} date={date} setDate={setDate} archived={archived} setArchived={setArchived} /> }
        </Stack.Screen>

        <Stack.Screen name="Note">
          { props => <Note {...props} notes={notes} setNotes={setNotes} note={note} setNote={setNote} archived={archived} setArchived={setArchived}/> }
        </Stack.Screen>

        <Stack.Screen name="AddNote">
          {props => <AddNote {...props} note={note} setNote={setNote} handleNote={handleNote} />}
        </Stack.Screen>

        <Stack.Screen name="DeletedNotes">
          {props => <DeletedNotes {...props} archived={archived} setArchived={setArchived} notes={notes} setNotes={setNotes} date={date} />}
        </Stack.Screen>

        <Stack.Screen name="EditNote">
          {props => <EditNote {...props} notes={notes} setNotes={setNotes} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
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
