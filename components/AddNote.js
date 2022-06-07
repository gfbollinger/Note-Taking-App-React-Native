import React, { useState } from "react"
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Text, Alert } from "react-native"
import * as Style from "./../assets/styles"

const AddNote = ({navigation, ...props}) => {


  return (
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
                value={props.note}
                onChangeText={(text) => props.setNote(text)}
              /> */}

              <TextInput
                style={styles.textInputTitle}
                placeholder="Title"
                value={props.noteTitle}
                onChangeText={(text) => props.setNoteTitle(text)}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Type Here"
                multiline={true}
                value={props.noteBody}
                onChangeText={(text) => props.setNoteBody(text)}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (props.note === ""){
                    Alert.alert("Please Type Something")
                  }
                  else{
                    props.handleNote()
                    navigation.navigate('Notes')
                  }
                  }
                }
              >
                <Text style={{ color: "#fff"}} >Add</Text>
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
  }
})

export default AddNote