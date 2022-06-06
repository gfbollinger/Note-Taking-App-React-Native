import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert, Keyboard } from "react-native"
import * as Style from "./../assets/styles"
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Icon, Button, Card } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StarIcon = (props) => (
  <Icon {...props} name='star'/>
);

const Notes = ({navigation, ...props}) => {

  const [searchNote, setSearchNote] = useState("")


  /* Este buscador busca y ordena */
  function handleSearch() {
    if(searchNote === ""){
      Alert.alert("Type something in search box")
    }
    else {
      props.notes.forEach( (item, index) => {
        if (item.includes(searchNote)) {
          let searchItem = [...props.notes]
          let firstElOfArray = searchItem[0]
          let index = [...props.notes].indexOf(item)
          searchItem[0] = item
          searchItem[index] = firstElOfArray
          props.setNotes(searchItem)
        }
      })
    }
    setSearchNote("")
    Keyboard.dismiss
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
      <View style={styles.headingContainer}>
        <Text style={styles.heading} >Your Notes...</Text>

        <View style={styles.flexRow}>

          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light} >
            <Button style={styles.btn} status='danger' accessoryLeft={StarIcon}/>
          </ApplicationProvider>

          <TouchableOpacity style={[styles.button, {marginLeft:40}]}  onPress={ () => navigation.navigate('DeletedNotes') }>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light} >
              <Icon name="trash-2-outline" fill="white" style={{width: 25, height: 25 }} />
            </ApplicationProvider>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('AddNote') }>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light} >
              <Icon name="plus-outline" fill="white" style={{width: 25, height: 25 }} />
            </ApplicationProvider>
          </TouchableOpacity>

        </View>


      </View>



      {/* Total notes counter */}
      <View style={styles.notesCounterCont}>
        <Text style={styles.notesCounter} >Total: {props.notes.length}</Text>
      </View>



      {/* Divider */}
      <View style={styles.divider}></View>



      {/* Search */}
      <View style={styles.searchContainer}>

        <TextInput 
          placeholder="Search"
          placeholderTextColor={Style.color}
          style={styles.searchInput}
          value={searchNote}
          onChangeText={ (text) => setSearchNote(text) }
        />

        <TouchableOpacity style={styles.searchBtn} onPress={ () => handleSearch() }>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light} >
            <Icon name="search" fill="white" style={{width: 25, height: 25 }} />
          </ApplicationProvider>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearBtn} onPress={ () => clearAllNotes() }>
          <Text style={{color:"#fff"}}>Archive all</Text>
        </TouchableOpacity>

      </View>


      {/* Notes */}
      <ScrollView style={styles.scrollView} /* showsVerticalScrollIndicator="false" */>
          <Text>Notes:</Text>
          {props.notes.length === 0
            ?
            <View>
              <Text>There are no notes yet.</Text>
            </View>
            :
            props.notes.map( (item, index) =>

              <TouchableOpacity
                key={index}
                style={styles.note}
                onPress={ () => navigation.navigate("Note", {
                  i: index,
                  n: item, 
                  
                })}
              >

                <View>
                  <Text>{item}</Text>
                </View>

                {/* <TouchableOpacity onPress={ () => deleteNote(index) } >
                  <Text>X</Text>
                </TouchableOpacity>

                <Text>{props.date}</Text>

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


    </View>
  )
}

export const styles = StyleSheet.create({
  notesContainer: {
    padding: 10
  },
  headingContainer: {
    flexDirection: "row"
  },
  heading: {
    color: Style.color,
    fontSize: 30,
  },
  flexRow: {
    flexDirection: "row"
  },
  button: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    marginLeft: 5
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
    padding: 10,
    backgroundColor: "#FFF495",
    marginBottom: 10
  }
})

export default Notes