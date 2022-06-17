import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import LocationPlace from "./LocationPlace"
import MapViewer from "./MapViewer"

export default function GetLocation({...props}) {  
  const [errorMsg, setErrorMsg] = useState(null);

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

  /* let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } */

  return (
    <View style={styles.container}>
      { props.location ?
      <View>
        <LocationPlace myAddress={props.myAddress} />
        <MapViewer location={props.location} />
      </View>
      : <Text>Loading Location...</Text>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});