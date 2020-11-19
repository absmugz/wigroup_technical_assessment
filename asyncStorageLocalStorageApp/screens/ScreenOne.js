import React, { useState } from "react";
import { View, Alert, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button } from "react-native-elements";
import { Formik } from "formik";
import * as yup from "yup";

function ScreenOne(props) {
  const { navigation } = props;
  const [userName, setUserName] = useState("");
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .label("Username")
      .required()
      .min(2, "Seems a bit short..."),
    password: yup
      .string()
      .label("Password")
      .required()
      .min(2, "Seems a bit short...")
      .max(10, "We prefer insecure system, try a shorter password."),
  });

  const setUser = (value) => {
    AsyncStorage.setItem("userName", value);
  };

  const getUser = () => {
    AsyncStorage.getItem("userName").then((value) => setUserName(value));
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("userName");
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Text> {userName} </Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values);
          setUser(values.username);
          getUser();
          // actions.setSubmitting(false)
          //navigation.navigate('Two');
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Input
                onChangeText={formikProps.handleChange("username")}
                onBlur={formikProps.handleBlur("username")}
                value={formikProps.values.username}
              />
              <Text style={{ color: "red" }}>
                {formikProps.touched.username && formikProps.errors.username}
              </Text>
              <Input
                onChangeText={formikProps.handleChange("password")}
                onBlur={formikProps.handleBlur("password")}
                value={formikProps.values.password}
                secureTextEntry={true}
              />
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
              <Button
                //loading={formikProps.isSubmitting}
                disabled={!formikProps.isValid}
                onPress={formikProps.handleSubmit}
                title="Submit"
              />
            </View>
          </React.Fragment>
        )}
      </Formik>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Button title="Remove name" onPress={removeUser} />
      </View>
    </SafeAreaView>
  );
}

export default ScreenOne;
