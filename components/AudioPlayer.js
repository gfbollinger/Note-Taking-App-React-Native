import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import NoteContext from '../context/NoteContext';

export default function AudioPlayer({ noteIndex }) {

  const [sound, setSound] = useState();
  const {notes} = useContext(NoteContext)
  /* console.log(notes[noteIndex].audios[0].sound) */

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(notes[noteIndex].audios[0].sound);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Text>asdasd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
