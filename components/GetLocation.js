import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import NoteContext from "../context/NoteContext";
import * as Location from 'expo-location';
import LocationPlace from "./LocationPlace"
import MapViewer from "./MapViewer"

export default function GetLocation(props) {
  const [errorMsg, setErrorMsg] = useState("Loading Location...");

  const { note, setNote } = useContext(NoteContext)

  useEffect(() => {
    (async () => {
      /* if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      } */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      let currAddress = await Location.reverseGeocodeAsync(currLocation.coords)

      if (props.isEdit) {
        return props.setNewEdit({ ...props.newEdit, location: currLocation, address: currAddress })
      }
      return setNote({ ...note, location: currLocation, address: currAddress })
    })();
  }, []);


  if (note.location) {
    return (
      <View style={styles.container}>
        <View>
          <LocationPlace myAddress={note.address} text="Your location is:"  />
          <MapViewer location={note.location} />
        </View>
      </View>
    );
  }

  if (props.isEdit && props.newEdit.location) {
    return (
      <View style={styles.container}>
        <View>
          <LocationPlace myAddress={props.newEdit.address} text="Your location is:"  />
          <MapViewer location={props.newEdit.location} />
        </View>
      </View>
    );
  }

  return (
    <Text>{errorMsg}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    /* flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, */
    marginBottom: 20,
    marginTop: 20
  },
  paragraph: {
    /* fontSize: 18,
    textAlign: 'center', */
  },
});