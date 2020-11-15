import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const DetailScreen = observer(function DetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const route = useRoute()
  // const { itemId, itemTitle } = route.params
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={route.params.itemTitle} />
    </Screen>
  )
})
