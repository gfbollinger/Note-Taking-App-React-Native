import React from "react"
import { Text, View, StyleSheet } from 'react-native'


const LocationPlace = (props) => {
  if (props.myAddress !== undefined) {
    return (
      <>
        <Text style={styles.preparagraph}>Your location is: </Text>
        <Text style={styles.paragraph}>{props.myAddress[0].city}, {props.myAddress[0].region}. {props.myAddress[0].country}.</Text>
      </>
    )
  }
  return (<></>)
}


export default LocationPlace

const styles = StyleSheet.create({
  preparagraph: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
});