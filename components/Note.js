import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Button } from "react-native"
import * as Style from "./../assets/styles"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@ui-kitten/components';
import ImageViewer from 'react-native-image-zoom-viewer';

import AudioRecordingsPlayer from "./AudioRecordingsPlayer";
import LocationPlace from "./LocationPlace";

const Note = ({route, navigation, ...props}) => {

  const { i, n } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalCamVisible, setIsModalCamVisible] = useState(false)

  function deleteNote(index){
    let newArray = [...props.notes]
    let archivedNote = newArray.splice(index, 1)
    props.setNotes(newArray)
    /* props.setArchived(archivedNote) */

    console.log(archivedNote)
    let bin = [
      {
        title: archivedNote[0].title,
        body: archivedNote[0].body,
        color: archivedNote[0].color,
        date: archivedNote[0].date,
        img: archivedNote[0].img,
        camImg: archivedNote[0].img,
        audios: archivedNote[0].audios,
        location: archivedNote[0].location
      },
      ...props.archived
    ]

    props.setArchived(bin)
    navigation.navigate("Notes")

    AsyncStorage.setItem("storedNotes", JSON.stringify(newArray))
      .then( () => {
        props.setNotes(newArray)
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
    url: n.img,

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
  }]

  const camImages =[{
    url: n.camImg
  }]

  return (
    <View style={stylesNote.noteContainer}>
      {/* <ScrollView> */}
        <View style={[ stylesNote.noteWrapper, { backgroundColor: n.color }]}>
          <Text style={stylesNote.noteTitle}>{n.title}</Text>
          <View style={{ backgroundColor: "#8F9BB3", height: 1, width: "100%", marginBottom: 15}}></View>
          <Text style={stylesNote.noteBody}>{n.body}</Text>

          {
            /* Img from Camera roll */
            n.img ?
            <View>
              <TouchableOpacity onPress={ () => setIsModalVisible(true)}>
                <Image
                  source={{ uri: n.img }}
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
                <Button title="Click To Close Modal" onPress = {() => setIsModalVisible(false)} />
              </Modal>
            </View>
            : <></>
          }


          {
            /* Img from Camera */
            n.camImg ?
            <View>
              <TouchableOpacity onPress={ () => setIsModalCamVisible(true)}>
                <Image
                  source={{ uri: n.camImg }}
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
                <Button title="Click To Close Modal" onPress = {() => setIsModalCamVisible(false)} />
              </Modal>
            </View>
            : <></>
          }

          {
          /* Audios */
            n.audios ?
            <AudioRecordingsPlayer recordings={n.audios} />
            : <></>
          }

          {
            /* Location */
            n.myAddress ?
            <LocationPlace myAddress={n.myAddress} />
            : <></>
          }

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
          <Icon name="archive-outline" fill="white" style={{width: 30, height: 30 }} />
        </TouchableOpacity>

        {/* </ScrollView> */}

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
    padding: 20,
    borderRadius: 10
  },
  noteTitle: {
    fontSize: 30,
    marginBottom: 10
  },
  noteBody: {
    fontSize: 17,
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
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  }
})

export default Note