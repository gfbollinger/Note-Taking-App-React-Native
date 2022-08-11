import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from "react-native"
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";

const Notes = ({navigation, ...props}) => {

  let [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });

  const {notes} = useContext(NoteContext)
  const [searchQuery, setSearchQuery] = useState("")

  function handleSearch(inputText) {
    setSearchQuery(inputText)
  }

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View style={styles.notesContainer}>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search Note"
          placeholderTextColor={Style.color}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={ (text) => handleSearch(text) }
        />
        <Icon name="search-outline" fill={Style.color} style={{width: 30, height: 30, position: 'absolute', left: -35 }} />
      </View>


      {/* Notes */}
      { notes.length === 0
        ?
        <View style={styles.WrappernoNotesMsg}>
          <Text style={styles.noNotesMsg}>There are no notes yet.</Text>
        </View>
        :
        <ScrollView /* showsVerticalScrollIndicator="false" */>
          { notes.filter(noteItem => {
            if (searchQuery === ''){
              return noteItem
            } else if (noteItem.title.toLowerCase().includes(searchQuery.toLowerCase())){
              return noteItem
            }
            }).map( (item, index) =>

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
                  <Text style={{ fontSize: 20, marginBottom: 15, fontFamily: 'Poppins_600SemiBold', lineHeight: 25 }}>{item.title}</Text>
                </View>

                <Text style={{ textAlign: "right", fontFamily: 'Poppins_300Light', fontSize: 13 }}> {item.date} </Text>

              </TouchableOpacity>

            )
          }
        </ScrollView>
      }


      <TouchableOpacity style={[styles.buttonArchive, {marginLeft:0}]}  onPress={ () => navigation.navigate('ArchivedNotes') }>
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
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 15,
    height: "100%",
    backgroundColor: "#fff"
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
    height: "100%"
  },
  buttonAdd: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 25,
    ...Style.shadow
  },
  buttonArchive: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    left: 25,
    ...Style.shadow
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
    paddingTop: 4,
    paddingRight: 44,
    paddingBottom: 4,
    paddingLeft: 5,
    borderBottomWidth: 2,
    borderColor: Style.color,
    fontSize: 16,
    width: '100%',
    marginBottom: 15,
    zIndex: 6,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15
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
    borderRadius: Style.borderRadius,
    ...Style.shadow
  },
  WrappernoNotesMsg: {
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  noNotesMsg: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    textAlign: "center",
  }
})

export default Notes