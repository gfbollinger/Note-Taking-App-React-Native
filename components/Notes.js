import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, Keyboard } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Notes = ({navigation, ...props}) => {

  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_700Bold });

  const {notes} = useContext(NoteContext)
  /* console.log(notes) */
  const [searchNote, setSearchNote] = useState("")

  let notesFilteredNewArr = []

  function handleSearch(inputText) {
    /* console.log(notes) */
    /* Keyboard.dismiss */
    setSearchNote(inputText)
    notesFilteredNewArr = notes.filter( p => 
        /* console.log(p.title) */
        p.title.toLowerCase().includes(inputText)
    )
    /* console.log(notesFilteredNewArr) */
    props.setNotesFiltered(notesFilteredNewArr)
  }

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <View style={styles.notesContainer}>


      {/* Search */}
      {/* <View style={styles.searchContainer}> */}

        {/* <TextInput 
          placeholder="Search"
          placeholderTextColor={Style.color}
          style={styles.searchInput}
          value={searchNote}
          onChangeText={ (text) => handleSearch(text) }
        /> */}


        {/* <TouchableOpacity style={styles.clearBtn} onPress={ () => props.archiveAllNotes() }>
          <Text style={{color:"#fff"}}>Archive all</Text>
        </TouchableOpacity> */}

      {/* </View> */}


      {/* Notes */}
      <ScrollView style={styles.notesList} /* showsVerticalScrollIndicator="false" */>

          {notes.length === 0
            ?
            <View>
              <Text>There are no notes yet.</Text>
            </View>
            :
            notes.map( (item, index) =>

              <TouchableOpacity
                key={index}
                style={[styles.note,  {backgroundColor: item.color} ]}
                onPress={ () => navigation.navigate("Note", {
                  i: index,
                  n: item,
                  /* TODO Agregar selected note index o algo asi para acceder desde el estado?? */
                })}
              >

                <View>
                  <Text style={{ fontSize: 20, marginBottom: 15, fontFamily: 'Poppins_700Bold', lineHeight: 25}}>{item.title}</Text>
                </View>

                <Text style={{ textAlign: "right", fontFamily: 'Poppins_300Light'}}> {item.date} </Text>

              </TouchableOpacity>

            )
          }

      </ScrollView>

      <TouchableOpacity style={[styles.buttonArchive, {marginLeft:0}]}  onPress={ () => navigation.navigate('DeletedNotes') }>
          <Icon name="archive-outline" fill="white" style={{width: 25, height: 25 }} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAdd} onPress={ () => navigation.navigate('AddNote') }>
        <Icon name="plus-outline" fill="white" style={{width: 50, height: 50 }} />
      </TouchableOpacity>


    </View>
  )
}

export const styles = StyleSheet.create({
  notesContainer: {
    padding: 15,
    height: "100%"
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  heading: {
    color: Style.color,
    fontSize: 30,
  },
  flexRow: {
    flexDirection: "row"
  },
  button: {
    marginLeft: 5
  },
  notesList: {
  },
  buttonAdd: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 25
  },
  buttonArchive: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    left: 25
  },
  notesCounterCont: {
    flexDirection: "row",
    alignItems: "center"
  },
  notesCounter: {
    fontSize: 18,
    color: Style.color
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  searchContainer: {
    flexDirection: "row"
  },
  searchInput: {
    padding: 5,
    borderWidth: 2,
    borderColor: Style.color,
    borderRadius: 8,
    fontSize: 16,
    width: 200
  },
  searchBtn: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    marginLeft: 5
  },
  clearBtn: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
    color: "#fff",
    justifyContent: "center"
  },
  note: {
    padding: 20,
    backgroundColor: "#FFF495",
    marginBottom: 10,
    borderRadius: 8
  }
})

export default Notes