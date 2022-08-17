import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from 'react-native'
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Loading from "./UI/Loading";
import * as Style from "./../assets/styles"
import { Icon } from '@ui-kitten/components';

const LocationPlace = (props) => {

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <Loading />
  }

  if (props.myAddress !== undefined) {
    return (
      <View style={{ }}>
        <View style={{ flexDirection: "row" }}>
          <Icon name="navigation-2-outline" fill={Style.greyDarkercolor} style={{width: 20, height: 20, marginRight: 4 }} />
          <Text style={[Style.smallTitle, {marginBottom: 0}]}>{props.text}</Text>
        </View>
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
    /* marginBottom: 10, */
    fontFamily: 'Poppins_400Regular'
  },
});