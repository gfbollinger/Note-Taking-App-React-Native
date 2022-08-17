import React, { useContext, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Icon } from '@ui-kitten/components';
import { Audio } from 'expo-av';
/* import NoteContext from "../context/NoteContext"; */
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";


const AudioPlayer = ({savedAudios}) => {

  /* const {note} = useContext(NoteContext) */
  const [sound, setSound] = useState();

  async function playSound(recordingLine) {
    console.log('Loading Sound');
    console.log(recordingLine)
    const { sound } = await Audio.Sound.createAsync({
      uri: recordingLine.file
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  function getSavedRecordingLines(savedAudios) {
    return savedAudios.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.recordingsContainer}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <TouchableOpacity style={styles.button} onPress={() => playSound(recordingLine)} >
            <Icon name="play-circle-outline" fill="white" style={{width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      );
    });
  }

  let [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return <Loading />
  }

  if (savedAudios) {
    return (
      <>
        {getSavedRecordingLines(savedAudios)}
      </>
    )
  }

}

export default AudioPlayer


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
    marginBottom: 0
  },
  fill: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 0,
    fontFamily: "Poppins_400Regular"
  },
  button: {
    margin: 8,
    marginRight: 0,
    backgroundColor: "#8F9BB3",
    borderRadius: 50,
    padding: 5
  }
});