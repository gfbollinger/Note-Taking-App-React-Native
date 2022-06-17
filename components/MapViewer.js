import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';


export default function MapViewer({ ...props }) {

  const [markers, setMarkers ] = useState([
    {
      latlng: [-31.0439878, -64.4858053],
      title: "My Marker position",
      description: "Lorem ipsum"
    }
  ])

  return (
    <View style={styles.container}>
      { props.location &&
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: props.location.coords.latitude,
          longitude: props.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude : props.location.coords.latitude , longitude : props.location.coords.longitude }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 100,
  },
});