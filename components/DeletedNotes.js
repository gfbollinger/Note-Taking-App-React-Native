import React, { useContext } from "react"
import { ScrollView, View, Text, StyleSheet,TouchableOpacity, Alert } from "react-native"
/* import { styles } from "./AddNote" */
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteContext from "../context/NoteContext";

const DeletedNotes = ({...props}) => {

  const {notes} = useContext(NoteContext)
  const {setNotes} = useContext(NoteContext)

  console.log(props.archived)

  function emptyBin() {
    Alert.alert(
      "Delete All",
      "Are you sure you want to permanently delete all notes?",
      [
        {
          text: "No",
          onPress: () => console.log("Pressed: NO"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            let emptyArray = [...props.archived]
            emptyArray = []
            props.setArchived(emptyArray)

            AsyncStorage.setItem("archivedNotes", JSON.stringify(emptyArray))
              .then( () => {
                props.setArchived(emptyArray)
              })
              .catch( error => console.log(error) )
          }
        }
      ]
    )
  }

  function undoAllNotes(){
    let deletedNotes = [...props.archived]
    let notes2 = [...notes]

    deletedNotes.forEach( (item, index) => {
      notes2.push(item)
    })
    console.log(notes2)
    props.setArchived([])
    setNotes(notes2)

    AsyncStorage.setItem("storedNotes", JSON.stringify(notes))
      .then( () => {
        setNotes(notes2)
      })
      .catch( error => console.log(error) )

    AsyncStorage.setItem("archivedNotes", JSON.stringify([]))
    .then( () => {
      props.setArchived([])
    })
    .catch( error => console.log(error) )
  }

  function undoNote(index){
    let getBack = props.archived[index]
    let arr = [getBack, ...notes]
    setNotes(arr)

    let newArr = [...props.archived]
    newArr.splice(index, 1)
    props.setArchived(newArr)

    AsyncStorage.setItem("storedNotes", JSON.stringify(arr))
      .then( () => {
        setNotes(arr)
      })
      .catch( error => console.log(error) )

      /* TODO: Fix this */
    /* AsyncStorage.setItem("archivedNotes", () => {
      return;
    }) */
  }

  function deleteNote(index) {
    Alert.alert(
      "Delete",
      "Are you sure that you want to delete this note permanently?",
      [
        {
          text: "No",
          onPress: () => console.log("Pressed: NO"),
          style: "cancel"
        },
        {
          text: " Yes",
          onPress: () => {
            let newArr = [...props.archived]
            newArr.splice( index, 1 )
            props.setArchived(newArr)

            AsyncStorage.setItem("archivedNotes", JSON.stringify(newArr))
              .then( () => {
                props.setArchived(newArr)
              })
              .catch( error => console.log(error) )
          }
        }
      ]
    )
  }


  return (
    <>
      <ScrollView>

        <View style={styles.notesContainer}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

            <TouchableOpacity style={styles.emptyButton} onPress={ () => undoAllNotes() }>
              <Text>Undo all</Text>
            </TouchableOpacity>

            <Text>
              Total: {props.archived.length}
            </Text>

            <TouchableOpacity style={styles.emptyButton} onPress={() => emptyBin()}>
              <Text>Empty</Text>
            </TouchableOpacity>

          </View>



          {/* Divider */}
          <View style={styles.divider}></View>

          {
            props.archived.length === 0
            ?
              <Text>No archived noted</Text>
            :
              props.archived.map( (item, index) =>

                <View key={index} style={[styles.note, /* {backgroundColor: item.color} */]}>

                  <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15}}>  {item.title}  </Text>
                  </View>

                  <TouchableOpacity onPress={ () => undoNote(index)} >
                    <Text>Undo</Text>
                  </TouchableOpacity>

                  <Text>{item.date}</Text>

                  <TouchableOpacity onPress={ () => deleteNote(index) }>
                    <Text>Delete</Text>
                  </TouchableOpacity>

                </View>
              )
          }

        </View>
      </ScrollView>
    </>
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
    marginBottom: 10,
    borderRadius: 8
  }
})


export default DeletedNotes