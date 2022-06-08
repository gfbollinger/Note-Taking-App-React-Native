import React, { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text  } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNote = ({route, navigation, ...props}) => {

  const { i, n } = route.params
  const [newEdit, setNewEdit]  = useState(n)


  function updateNote() {

    let editedNote = [...props.notes]
    editedNote[i] = newEdit
    editedNote[i].title = newEdit.title
    editedNote[i].body = newEdit.body
    editedNote[i].color = newEdit.color

    props.setNotes(editedNote)
    navigation.navigate('Notes')

    AsyncStorage.setItem("storedNotes", JSON.stringify(editedNote))
      .then( () => {
        props.setNotes(editedNote)
      })
      .catch( error => console.log(error) )

  }


  return(
    <>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          /* behavior={'padding'} */
        >
          <TouchableWithoutFeedback /* onPress={Keyboard.dismiss} */>

            <View style={{padding: 20, justifyContent: "space-around"}}>

              {/* <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.toString()}
                onChangeText={(text) => setNewEdit(text)}
              /> */}

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={newEdit.title}
                onChangeText={(text) => setNewEdit({ title: text, body: newEdit.body})}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={newEdit.body}
                onChangeText={(text) => setNewEdit({ title: newEdit.title, body: text })}
              />

              <Text style={{ marginTop: 15, marginBottom:5 }}>Pick a color:</Text>
              <View style={styles.colorBtnsContainer}>
                <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFF495"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFF495" })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFDBA6"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFDBA6" })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#AEFFF5"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#AEFFF5" })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, { backgroundColor: "#FFB7F8"}]} onPress={() => setNewEdit({ title: newEdit.title, body: newEdit.body, date: newEdit.date, color: "#FFB7F8" })}></TouchableOpacity>
              </View>

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
                <Text style={{ color: "#fff"}} >Update</Text>
              </TouchableOpacity>

            </View>

          </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  textInputTitle: {
    height: 50,
    padding: 5,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10
  },
  textInput: {
    height: 200,
    padding: 5,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
  }
})

export default EditNote