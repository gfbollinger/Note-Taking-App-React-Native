import React from "react";
import { View } from "react-native";
import { Icon } from '@ui-kitten/components';

const Loading = () => {
  return(
    <View style={{ display: "flex", flex: 1, width: "100%", height:"100%", alignItems: "center", justifyContent: "center" }}>
      {/* TODO: Rotate Spinner */}
      <Icon name="loader-outline" fill="#666" style={{width: 60, height: 60 }} />
    </View>
  )
}

export default Loading