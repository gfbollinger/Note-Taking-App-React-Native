import React, { useState, useContext } from "react"
import { TouchableOpacity, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import AudioRecordingsPlayer from "./AudioRecordingsPlayer"
import NoteContext from "../context/NoteContext";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Icon } from '@ui-kitten/components';
import Loading from "./UI/Loading";

export default function AudioRecorder() {

  const [recording, setRecording] = useState();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false)

  const { note, setNote } = useContext(NoteContext)

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        setIsRecording(true)
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
    setIsRecording(false)
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...note.audios];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setNote({...note, audios: updatedRecordings});
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
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <TouchableOpacity
        style={[styles.buttonToggleRecord, isRecording ? {backgroundColor: "red" } : "" ]}
        onPress={recording ? stopRecording : startRecording}
      >
        { recording
          ?
            <View style={styles.buttonRecord}>
              <Icon name="stop-circle-outline" fill="white" style={{width: 36, height: 36 }} />
              <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular", marginLeft: 5 }}>Stop Recording Audio</Text>
            </View>
          :
            <View style={styles.buttonRecord}>
              <Icon name="play-circle-outline" fill="white" style={{width: 36, height: 36 }} />
              <Text style={{ color: "#fff", fontFamily: "Poppins_400Regular", marginLeft: 5 }}>Start Recording Audio</Text>
            </View>
        }
      </TouchableOpacity>
      { note.audios ?
        <AudioRecordingsPlayer recordings={note.audios} />
      : <></>
      }
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
  },
  buttonRecord: {
    flexDirection: "row",
    alignItems: "center"
  }
});