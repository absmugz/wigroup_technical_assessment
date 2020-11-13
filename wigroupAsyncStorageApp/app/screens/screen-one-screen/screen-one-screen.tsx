import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ActivityIndicator, Alert, AsyncStorage } from "react-native"
import { Input, Button } from "react-native-elements"
import { Formik } from "formik"
import * as yup from "yup"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: color.palette.white,
}

const VALIDATION_TEXT: TextStyle = { color: 'red' }

const FULL: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: spacing[4],

}

export const ScreenOneScreen = observer(function ScreenOneScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const { authenticationStore } = useStores()
  const login = (values) => {
    authenticationStore.setEmail(values.email)
    authenticationStore.setAuthentication(true)
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email()
      .required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
  })
  return (
    <Screen style={ROOT} preset="scroll">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          console.log(values)
          login(values)
        // actions.setSubmitting(false)
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <React.Fragment>
            <View style={FULL}>
              <Input
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                value={formikProps.values.email}
              />
              <Text style={VALIDATION_TEXT}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
              <Input
                onChangeText={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
                value={formikProps.values.password}
                secureTextEntry={true}
              />
              <Text style={VALIDATION_TEXT}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
              <Button
                loading={formikProps.isSubmitting}
                disabled={!formikProps.isValid}
                onPress={formikProps.handleSubmit}
                title="Submit"
              />
            </View>
          </React.Fragment>
        )}
      </Formik>
    </Screen>
  )
})
