import React from "react"
import { Text, View, StyleSheet } from 'react-native'


const LocationPlace = (props) => {
  return (
    <>
      <Text style={styles.paragraph}>You are in: {props.myAddress[0].city}, {props.myAddress[0].region}. {props.myAddress[0].country}.</Text>
    </>
  )
}


export default LocationPlace

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});