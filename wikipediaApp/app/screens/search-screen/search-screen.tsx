import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, Text, StyleSheet, View, FlatList, Alert, TextStyle } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: 'white',
}

const ITEMSTYLE: TextStyle = {
  padding: 10,
}

const ITEMSEPARATOR: ViewStyle = {
  height: 0.5,
  width: '100%',
  backgroundColor: '#C8C8C8',
}

const FULL: ViewStyle = {
  flex: 1
}

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [masterDataSource, setMasterDataSource] = useState([])

  useEffect(() => {
    // refactor dummy with actual link from Wkikipedia search api
    // https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson)
        setMasterDataSource(responseJson)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredDataSource(newData)
      setSearch(text)
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource)
      setSearch(text)
    }
  }
  const getItem = (item) => {
    // Function for click on an item
    Alert.alert('Id : ' + item.id + ' Title : ' + item.title)
  }

  const detailScreen = (item) => navigation.navigate('detail', {
    itemId: item.id,
    itemTitle: item.title,
  })

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={ITEMSTYLE} onPress={() => detailScreen(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    )
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={ITEMSEPARATOR}
      />
    )
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <SafeAreaView style={FULL}>
        <View style={CONTAINER}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Type Here..."
            value={search}
          />
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})
