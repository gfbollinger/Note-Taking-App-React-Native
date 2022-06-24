import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import LocationPlace from "./LocationPlace"
import MapViewer from "./MapViewer"

export default function GetLocation({...props}) {  
  const [errorMsg, setErrorMsg] = useState("Loading Location...");

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
      let address = await Location.reverseGeocodeAsync(currLocation.coords)
      props.setLocation(currLocation)
      props.setMyAddress(address)
      console.log(props.location)
    })();
  }, []);


  if (props.location !== undefined) {
    return (
      <View style={styles.container}>
        { props.location ?
        <View>
          <LocationPlace myAddress={props.myAddress} />
          <MapViewer location={props.location} />
        </View>
        : <Text>{errorMsg}</Text>
        }
      </View>

    );
  }

  return (
    <></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 0
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});