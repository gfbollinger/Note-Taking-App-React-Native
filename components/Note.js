import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@ui-kitten/components';

const Note = ({route, navigation, ...props}) => {

  const { i, n } = route.params

  function deleteNote(index){
    let newArray = [...props.notes]
    let archivedNote = newArray.splice(index, 1)
    props.setNotes(newArray)
    /* props.setArchived(archivedNote) */

    console.log(archivedNote)
    let bin = [{title: archivedNote[0].title, body: archivedNote[0].body}, ...props.archived]
    props.setArchived(bin)
    navigation.navigate("Notes")

    AsyncStorage.setItem("storedNotes", JSON.stringify(newArray))
      .then( () => {
        props.setNotes(newArray)
      })
      .catch( error => console.log(error) )

    AsyncStorage.setItem("archivedNotes", JSON.stringify(bin))
    .then( () => {
      props.setArchived(bin)
    })
    .catch( error => console.log(error) )
  }

  return (
    <View style={stylesNote.noteContainer}>

      <Text style={stylesNote.noteTitle}>{n.title}</Text>
      <Text>Description: {n.body}</Text>

      <TouchableOpacity style={stylesNote.buttonEdit} onPress={ () => navigation.navigate("EditNote", {
        i: i,
        n: n
      }

      )}>
          <Icon name="edit-outline" fill="white" style={{width: 40, height: 40 }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => deleteNote(i) } >
        <Text>Archive</Text>
      </TouchableOpacity>
    </View>
  )
}

const stylesNote = StyleSheet.create({
  noteContainer: {
    padding: 10,
    height: "100%"
  },
  noteTitle: {
    fontSize: 28,
    marginBottom: 10
  },
  buttonEdit: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20
  },
})

export default Note