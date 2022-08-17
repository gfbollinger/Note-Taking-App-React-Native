import React, { useState, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Button } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@ui-kitten/components';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

import AudioPlayer from "./AudioPlayer";
import LocationPlace from "./LocationPlace";

import NoteContext from "../context/NoteContext";
import Loading from "./UI/Loading";
/* import AudioRecordingsPlayer from "./AudioRecordingsPlayer"; */

const Note = ({route, navigation, ...props}) => {

  const { i, noteId } = route.params
  const {notes, setNotes} = useContext(NoteContext)

  const [currentNote, setCurrentNote] = useState(notes.find( x => x.noteId === noteId))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalCamVisible, setIsModalCamVisible] = useState(false)
  console.log(currentNote)
  
  useEffect( () => {
    setCurrentNote(notes.find( x => x.noteId === noteId))
  }, [])

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  function deleteNote(index){
    let newArray = [...notes]
    let archivedNote = newArray.splice(index, 1)
    setNotes(newArray)
    /* props.setArchived(archivedNote) */

    /* console.log(n) */

    /* console.log(archivedNote) */
    let bin = [
      {
        id: archivedNote[0].id,
        title: archivedNote[0].title,
        body: archivedNote[0].body,
        color: archivedNote[0].color,
        date: archivedNote[0].date,
        image: archivedNote[0].image,
        cameraImage: archivedNote[0].cameraImage,
        audios: archivedNote[0].audios,
        location: archivedNote[0].location,
        address: archivedNote[0].address
      },
      ...props.archived
    ]

    props.setArchived(bin)
    navigation.navigate("Notes")

    AsyncStorage.setItem("storedNotes", JSON.stringify(newArray))
      .then( () => {
        setNotes(newArray)
      })
      .catch( error => console.log(error) )

    AsyncStorage.setItem("archivedNotes", JSON.stringify(bin))
    .then( () => {
      props.setArchived(bin)
    })
    .catch( error => console.log(error) )
  }

  const images = [{
    // Simplest usage.
    url: currentNote.image,

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
  }]

  const camImages =[{
    url: currentNote.cameraImage
  }]

  if (!fontsLoaded) {
    return <Loading />
  }

  /* console.log(n) */

  return (
    <View style={stylesNote.noteContainer}>
      <View style={[ stylesNote.noteWrapper, { backgroundColor: currentNote.color }]}>
        <ScrollView  showsVerticalScrollIndicator ={false}>
          <Text style={stylesNote.noteTitle}>{currentNote.title}</Text>
          <Text style={stylesNote.noteDate}>Created: {currentNote.date}</Text>
          { currentNote.body ?
            <Text style={stylesNote.noteBody}>{currentNote.body}</Text>
            : <></>
          }
          { currentNote.image || currentNote.cameraImage ?
            <View style={stylesNote.containerLighter}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="image-outline" fill={Style.greyDarkercolor} style={{width: 20, height: 20, marginRight: 4 }} />
                <Text style={stylesNote.imagesTitle}>Attached images:</Text>
              </View>

              <View style={{ flexDirection: "row"}}>
                {
                  /* Img from Camera roll */
                  currentNote.image ?
                  <View>
                    <TouchableOpacity onPress={ () => setIsModalVisible(true)}>
                      <Image
                        source={{ uri: currentNote.image }}
                        style={stylesNote.thumbnail}
                      />
                    </TouchableOpacity>
                    <Modal
                      animationType = {"fade"}
                      transparent = {false}
                      visible = {isModalVisible}
                      onRequestClose = {() =>{ console.log("Modal has been closed.") } }
                    >
                      <ImageViewer imageUrls={images}/>
                      <Button title="Close" onPress = {() => setIsModalVisible(false)} />
                    </Modal>
                  </View>
                  : <></>
                }
                {
                  /* Img from Camera */
                  currentNote.cameraImage ?
                  <View>
                    <TouchableOpacity onPress={ () => setIsModalCamVisible(true)}>
                      <Image
                        source={{ uri: currentNote.cameraImage }}
                        style={stylesNote.thumbnail}
                      />
                    </TouchableOpacity>
                    <Modal
                      animationType = {"fade"}
                      transparent = {false}
                      visible = {isModalCamVisible}
                      onRequestClose = {() =>{ console.log("Modal has been closed.") } }
                    >
                      <ImageViewer imageUrls={camImages}/>
                      <Button title="Close" onPress = {() => setIsModalCamVisible(false)} />
                    </Modal>
                  </View>
                  : <></>
                }
              </View>
            </View>
            : <></>
          }

          {/* Audios */}
          {
            currentNote.audios ?
            <View style={[stylesNote.containerLighter, {marginTop: 8}]}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="mic-outline" fill={Style.greyDarkercolor} style={{width: 20, height: 20, marginRight: 4 }} />
                <Text style={stylesNote.imagesTitle}>Attached Audios:</Text>
              </View>
              <AudioPlayer savedAudios={currentNote.audios} />
            </View>
            : <></>
          }

          {
            /* Location */
            currentNote.address ?
            <View style={[stylesNote.containerLighter, {marginTop: 8}]}>
                <LocationPlace myAddress={currentNote.address} text="Note written in:" />
            </View>
            : <></>
          }
          </ScrollView>

        </View>

        <TouchableOpacity style={stylesNote.buttonEdit} onPress={ () => navigation.navigate("EditNote", {
          i: i,
          noteId: noteId
        }
        )}>
            <Icon name="edit-outline" fill="white" style={{width: 40, height: 40 }} />
        </TouchableOpacity>
        <TouchableOpacity style={stylesNote.buttonArchive} onPress={ () => deleteNote(i) } >
          {/* <Text>Archive</Text> */}
          <Icon name="download-outline" fill="white" style={{width: 30, height: 30 }} />
        </TouchableOpacity>



    </View>
  )
}

const stylesNote = StyleSheet.create({
  noteContainer: {
    padding: 15,
    height: "100%",
    position: "relative",
    backgroundColor: "#fff"
  },
  noteWrapper : {
    paddingVertical: 35,
    paddingHorizontal: 30,
    borderRadius: Style.borderRadius,
    minHeight: "90%",
    position: "relative",
    ...Style.shadow
  },
  noteTitle: {
    fontSize: 25,
    lineHeight: 30,
    marginBottom: 5,
    fontFamily: "Poppins_600SemiBold"
  },
  noteDate: {
    fontSize: 13,
    marginBottom: 15,
    fontFamily: "Poppins_300Light"
  },
  noteBody: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily: "Poppins_400Regular"
  },
  buttonEdit: {
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
    ...Style.shadow
  },
  buttonArchive: {
    backgroundColor: Style.color,
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    left: 20,
    ...Style.shadow
  },
  imagesTitle: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
    /* borderTopWidth: 1,
    borderTopColor: "#999",
    borderStyle: "dotted",
    paddingTop: 12 */
  },
  containerLighter: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: Style.borderRadius,
  },
  thumbnail: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    /* marginBottom: 20, */
    marginRight: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: Style.borderRadius
  }
})

export default Note