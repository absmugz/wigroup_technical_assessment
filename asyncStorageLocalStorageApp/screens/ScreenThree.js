import React from "react";
import { View, SafeAreaView } from "react-native";
import { Button } from "react-native-elements";

function ScreenThree(props) {
  const { navigation } = props;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

export default ScreenThree;
