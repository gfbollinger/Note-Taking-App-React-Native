import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { Audio } from 'expo-av';


const AudioRecordingsPlayer = ({...props}) => {

  async function playRecording(recordingLine) {
    recordingLine.sound.replayAsync({ volume: 1, isLooping : false})
  }

  function getRecordingLines() {
    return props.recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => playRecording(recordingLine)} title="Play"></Button>
        </View>
      );
    });
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});