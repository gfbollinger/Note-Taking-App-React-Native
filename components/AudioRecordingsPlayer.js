import React, { useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Icon } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import NoteContext from "../context/NoteContext";


const AudioRecordingsPlayer = ({recordings, noteIndex}) => {

  const {notes} = useContext(NoteContext)


  async function playRecording(recordingLine) {
    console.log(recordingLine.sound)
    recordingLine.sound.replayAsync({ volume: 1, isLooping : false})
  }


  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
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

  function getSavedRecordingLines() {
    return notes[noteIndex].audios.map((recordingLine, index) => {
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

  if (noteIndex) {
    console.log(notes[noteIndex].audios)
    return (
      <>
        {getSavedRecordingLines()}
      </>
    )
  }

  return (
    <>
      {getRecordingLines()}
    </>
  )

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
    margin: 16
  },
  button: {
    margin: 16,
    backgroundColor: "#8F9BB3",
    borderRadius: 50,
    padding: 5
  }
});