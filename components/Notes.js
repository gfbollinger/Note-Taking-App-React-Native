import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, Keyboard } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

/* const StarIcon = (props) => (
  <Icon {...props} name='star'/>
); */

const Notes = ({navigation, ...props}) => {

  const [searchNote, setSearchNote] = useState("")

  let notesFilteredNewArr = []

  function handleSearch(inputText) {
    /* console.log(props.notes) */
    /* Keyboard.dismiss */
    setSearchNote(inputText)
    notesFilteredNewArr = props.notes.filter( p => 
        /* console.log(p.title) */
        p.title.toLowerCase().includes(inputText)
    )
    console.log(notesFilteredNewArr)
    props.setNotesFiltered(notesFilteredNewArr)
  }

  function clearAllNotes() {
    let emptyArray = [...props.notes]
    let deletedCompArray = [...props.archived]
    emptyArray.forEach( (item, index) => {
      deletedCompArray.push(item)
    })

    emptyArray = []
    props.setNotes(emptyArray)
    props.setArchived(deletedCompArray)

    AsyncStorage.setItem("storedNotes", JSON.stringify(emptyArray))
      .then( () => {
        props.setNotes(emptyArray)
      })
      .catch( error => console.log(error) )

    AsyncStorage.setItem("archivedNotes", JSON.stringify(deletedCompArray))
      .then( () => {
        props.setArchived(deletedCompArray)
      })
      .catch( error => console.log(error) )

  }

  return (
    <View style={styles.notesContainer}>

      {/* Heading */}
      {/* <View style={styles.headingContainer}>
        <Text style={styles.heading} >My Notes</Text>
      </View> */}


      {/* Total notes counter */}
      {/* <View style={styles.notesCounterCont}>
        <Text style={styles.notesCounter} >Total notes: {props.notes.length}</Text>
      </View> */}


      {/* Divider */}
      {/* <View style={styles.divider}></View> */}


      {/* Search */}
      <View style={styles.searchContainer}>

        {/* <TextInput 
          placeholder="Search"
          placeholderTextColor={Style.color}
          style={styles.searchInput}
          value={searchNote}
          onChangeText={ (text) => handleSearch(text) }
        /> */}


        <TouchableOpacity style={styles.clearBtn} onPress={ () => clearAllNotes() }>
          <Text style={{color:"#fff"}}>Archive all</Text>
        </TouchableOpacity>

      </View>


      {/* Notes */}
      <ScrollView style={styles.notesList} /* showsVerticalScrollIndicator="false" */>

          {props.notes.length === 0
            ?
            <View>
              <Text>There are no notes yet.</Text>
            </View>
            :
            props.notes.map( (item, index) =>

              <TouchableOpacity
                key={index}
                style={[styles.note, {backgroundColor: item.color}]}
                onPress={ () => navigation.navigate("Note", {
                  i: index,
                  n: item,
                })}
              >

                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15}}>{item.title}</Text>
                </View>

                <Text style={{ textAlign: "right"}}>{item.date}</Text>

                {/* <TouchableOpacity onPress={ () => deleteNote(index) } >
                  <Text>X</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => navigation.navigate("EditNote", {
                  i: index,
                  n: item
                }

                )}>
                  <Text>Edit</Text>
                </TouchableOpacity> */}

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
    /* alignContent: "space-between", */
  },
  heading: {
    color: Style.color,
    fontSize: 30,
  },
  flexRow: {
    flexDirection: "row"
  },
  button: {
    /* backgroundColor: Style.color, */
    /* padding: 10,
    borderRadius: "50%", */
    marginLeft: 5
  },
  notesList: {
    paddingTop: 20
  },
  buttonAdd: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20
  },
  buttonArchive: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    left: 20
  },
  notesCounterCont: {
    flexDirection: "row",
    alignItems: "center"
  },
  notesCounter: {
    //fontWeight: 700,
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