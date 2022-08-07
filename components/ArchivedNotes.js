import React, { useContext } from "react"
import { ScrollView, View, Text, StyleSheet,TouchableOpacity, Alert } from "react-native"
import { Icon } from '@ui-kitten/components';
import * as Style from "../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const ArchivedNotes = ({...props}) => {

  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_700Bold });

  const {notes} = useContext(NoteContext)
  const {setNotes} = useContext(NoteContext)

  /* console.log(props.archived) */

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
    let archivedNotes = [...props.archived]
    let notes2 = [...notes]

    archivedNotes.forEach( (item, index) => {
      notes2.push(item)
    })
    /* console.log(notes2) */
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

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <ScrollView>

        <View style={styles.notesContainer}>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

            <TouchableOpacity style={styles.iconButtonText} onPress={ () => undoAllNotes() }>
              <Icon name="undo-outline" fill="#8F9BB3" style={{width: 25, height: 25 }} />
              <Text style={{ fontFamily: 'Poppins_700Bold', color: '#8F9BB3', fontSize: 16 , marginLeft: 4 }}>Undo all</Text>
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#8F9BB3'}}>
              Total: {props.archived.length}
            </Text>

            <TouchableOpacity style={styles.iconButtonText} onPress={() => emptyBin()}>
              <Icon name="trash-2-outline" fill="#8F9BB3" style={{width: 25, height: 25 }} />
              <Text style={{ fontFamily: 'Poppins_700Bold', color: '#8F9BB3', fontSize: 16 , marginLeft: 4 }}>Delete All</Text>
            </TouchableOpacity>

          </View>



          {/* Divider */}
          <View style={styles.divider}></View>

          {
            props.archived.length === 0
            ?
              <Text>No archived notes</Text>
            :
              props.archived.map( (item, index) =>

                <View key={index} style={[styles.note, {backgroundColor: item.color}]}>
                  <Text style={{ fontSize: 20, marginBottom: 0, fontFamily: 'Poppins_700Bold', lineHeight: 25 }}>{item.title}</Text>
                  <Text style={{ marginBottom: 20, fontFamily: 'Poppins_300Light' }}>Created: {item.date}</Text>

                  <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={ () => undoNote(index)} style={styles.undoButton}>
                      <Text style={{ fontFamily: 'Poppins_400Regular'}}>Undo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => deleteNote(index)} style={styles.removeButton}>
                      <Text style={{ fontFamily: 'Poppins_400Regular'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>

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
    marginBottom: 10
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
  },
  undoButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins_400Regular',
    borderRadius: 8
  },
  removeButton: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: 'Poppins_400Regular',
    borderRadius: 8
  },
  iconButtonText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default ArchivedNotes