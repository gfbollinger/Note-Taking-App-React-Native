import React from "react"
import { View, Text, StyleSheet } from "react-native"

const About = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Version: 0.54</Text>
        <Text>Date: ...</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default About