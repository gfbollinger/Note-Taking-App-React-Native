import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet } from 'react-native'


const LocationPlace = (props) => {

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
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10
  },
});