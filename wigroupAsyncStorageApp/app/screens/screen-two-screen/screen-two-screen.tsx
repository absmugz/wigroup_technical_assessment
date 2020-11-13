import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "../../components"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: color.palette.white,
}

const FULL: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: spacing[4],

}

export const ScreenTwoScreen = observer(function ScreenTwoScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const goToScreenThree = () => {
    navigation.navigate("screenThree")
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="screenTwoScreen" />
      <View style={FULL}>
        <Button
          onPress={goToScreenThree}
          title="Go to Screen 3"
        />
      </View>

    </Screen>
  )
})
