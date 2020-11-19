import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";

function ScreenTwo(props) {
  const { navigation } = props;
  const [userName, setUserName] = useState("");
  const getUser = () => {
    AsyncStorage.getItem("userName").then((value) => setUserName(value));
  };
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("userName");
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    } finally {
      setUserName("");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Text> Hello, {userName} </Text>
        <Button
          title="Go to Screen Three"
          onPress={() => navigation.navigate("Three")}
        />
        <Button title="Logout" onPress={removeUser} />
      </View>
    </SafeAreaView>
  );
}

export default ScreenTwo;
