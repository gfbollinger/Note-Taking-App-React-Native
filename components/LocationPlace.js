import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';


const LocationPlace = (props) => {

  let [fontsLoaded] = useFonts({    
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  if (props.myAddress !== undefined) {
    return (
      <View style={{ }}>
        <Text style={styles.preparagraph}>{props.text}</Text>
        <Text style={styles.paragraph}>{props.myAddress[0].city}, {props.myAddress[0].region}. {props.myAddress[0].country}.</Text>
      </View>
    )
  }
  return (<></>)
}


export default LocationPlace

const styles = StyleSheet.create({
  preparagraph: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Poppins_400Regular'
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular'
  },
});