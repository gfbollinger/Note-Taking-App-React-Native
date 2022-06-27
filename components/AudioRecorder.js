import React from "react"
import { TouchableOpacity, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import AudioRecordingsPlayer from "./AudioRecordingsPlayer"
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function AudioRecorder({...props}) {

  const [recording, setRecording] = React.useState();
  const [message, setMessage] = React.useState("");

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          /* interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, */
          /* shouldDuckAndroid: false, */
          /* interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, */
          playThroughEarpieceAndroid: false,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...props.recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    props.setRecordings(updatedRecordings);
  }

  /* function playRecording(recordingLine) {
    recordingLine.sound.replayAsync({ volume: 1, isLooping : false})
  } */

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  /* function getRecordingLines() {
    return props.recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => playRecording(recordingLine)} title="Play"></Button>
        </View>
      );
    });
  } */

  let [fontsLoaded] = useFonts({ Poppins_400Regular  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <TouchableOpacity
        style={styles.buttonToggleRecord}
        onPress={recording ? stopRecording : startRecording} 
      >
        <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular" }}>{recording ? 'Stop Recording Audio' : 'Start Recording Audio'}</Text>
      </TouchableOpacity>
      {/* {getRecordingLines()} */}
      <AudioRecordingsPlayer recordings={props.recordings} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  buttonToggleRecord: {
    marginBottom: 20,
    backgroundColor: "#8F9BB3",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
  }
});