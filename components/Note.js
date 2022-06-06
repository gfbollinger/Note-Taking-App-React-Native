import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react/cjs/react.development"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Note = ({route, navigation, ...props}) => {

  const { i, n } = route.params

  function deleteNote(index){
    let newArray = [...props.notes]
    let archivedNote = newArray.splice(index, 1)
    props.setNotes(newArray)
    props.setArchived(archivedNote)

    let bin = [archivedNote, ...props.archived]
    props.setArchived(bin)
    navigation.navigate("Notes")
    /* console.log(bin) */

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
    <View>

      {/* <TouchableOpacity onPress={ () => navigation.navigate("Notes")}>
        <Text>Back</Text>
      </TouchableOpacity> */}

      <Text>Note: {n}</Text>

      <TouchableOpacity onPress={ () => navigation.navigate("EditNote", {
        i: i,
        n: n
      }

      )}>
        <Text>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => deleteNote(i) } >
        <Text>Archive</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Note