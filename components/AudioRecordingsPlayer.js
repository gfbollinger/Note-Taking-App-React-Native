import React, { useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Icon } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";


const AudioRecordingsPlayer = ({recordings}) => {

  const {note} = useContext(NoteContext)

  async function playRecording(recordingLine) {
    console.log(recordingLine.sound)
    recordingLine.sound.replayAsync({ volume: 1, isLooping : false})
  }

  function getRecordingLines() {
    return note.audios.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.recordingsContainer}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <TouchableOpacity style={styles.button} onPress={() => playRecording(recordingLine)} >
            <Icon name="play-circle-outline" fill="white" style={{width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  /* function getSavedRecordingLines() {
    return notes[noteIndex].recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.recordingsContainer}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <TouchableOpacity style={styles.button} onPress={() => playRecording(recordingLine)} >
            <Icon name="play-circle-outline" fill="white" style={{width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      );
    });
  } */

  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return <Loading />
  }

  /* if (noteIndex) {
    console.log(notes[noteIndex].recordings)
    return (
      <>
        {getSavedRecordingLines()}
      </>
    )
  } */
  if (note.audios){
    return (
      <>
        {getRecordingLines()}
      </>
    )
  }

}

export default AudioRecordingsPlayer


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  fill: {
    flex: 1,
    margin: 16,
    fontFamily: "Poppins_400Regular"
  },
  button: {
    margin: 16,
    backgroundColor: "#8F9BB3",
    borderRadius: 50,
    padding: 5
  }
});