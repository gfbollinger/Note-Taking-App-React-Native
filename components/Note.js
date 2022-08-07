import React, { useState, useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Button } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@ui-kitten/components';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import AudioPlayer from "./AudioPlayer";
import LocationPlace from "./LocationPlace";

import NoteContext from "../context/NoteContext";

const Note = ({route, navigation, ...props}) => {

  const { i, n } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalCamVisible, setIsModalCamVisible] = useState(false)

  const {notes} = useContext(NoteContext)
  const {setNotes} = useContext(NoteContext)

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
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
        title: archivedNote[0].title,
        body: archivedNote[0].body,
        color: archivedNote[0].color,
        date: archivedNote[0].date,
        image: archivedNote[0].image,
        cameraImage: archivedNote[0].cameraImage,
        audios: archivedNote[0].audios,
        location: archivedNote[0].location
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
    url: n.image,

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
  }]

  const camImages =[{
    url: n.cameraImage
  }]

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <View style={stylesNote.noteContainer}>
      <View style={[ stylesNote.noteWrapper, { backgroundColor: n.color }]}>
        <ScrollView  showsVerticalScrollIndicator ={false}>
          <Text style={stylesNote.noteTitle}>{n.title}</Text>
          <Text style={stylesNote.noteDate}>Created: {n.date}</Text>
          <Text style={stylesNote.noteBody}>{n.body}</Text>

          <View style={{ flexDirection: "row"}}>
            {
              /* Img from Camera roll */
              n.image ?
              <View>
                <TouchableOpacity onPress={ () => setIsModalVisible(true)}>
                  <Image
                    source={{ uri: n.image }}
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
              n.cameraImage ?
              <View>
                <TouchableOpacity onPress={ () => setIsModalCamVisible(true)}>
                  <Image
                    source={{ uri: n.cameraImage }}
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

          {/* Audios */}
          {/* {
            n.audios ?
            <AudioPlayer noteIndex={i} recordings={n.audios} />
            : <></>
          } */}

          {
            /* Location */
            /* n.myAddress ?
            <View style={{ paddingTop: 30 }}>
              <LocationPlace myAddress={n.myAddress} text="Note written in:" />
            </View>
            : <></> */
          }
          </ScrollView>

        </View>

        <TouchableOpacity style={stylesNote.buttonEdit} onPress={ () => navigation.navigate("EditNote", {
          i: i,
          n: n
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
    position: "relative"
  },
  noteWrapper : {
    padding: 35,
    borderRadius: 12,
    minHeight: "90%",
    position: "relative"
  },
  noteTitle: {
    fontSize: 25,
    lineHeight: 30,
    marginBottom: 5,
    fontFamily: "Poppins_700Bold"
  },
  noteDate: {
    fontSize: 14,
    lineHeight: 30,
    marginBottom: 15,
    fontFamily: "Poppins_300Light"
  },
  noteBody: {
    fontSize: 17,
    marginBottom: 40,
    fontFamily: "Poppins_400Regular"
  },
  buttonEdit: {
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
  thumbnail: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
    marginRight: 10,
    borderWidth: 7,
    borderColor: "white"
  }
})

export default Note