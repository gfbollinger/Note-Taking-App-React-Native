import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

const About = () => {

  let [fontsLoaded] = useFonts({ Poppins_400Regular  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={ styles.paragraph }>Version: 0.54</Text>
        <Text style={ styles.paragraph }>Date: ...</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
    fontSize: 17
  }
})

export default About