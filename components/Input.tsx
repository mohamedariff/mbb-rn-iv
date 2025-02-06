import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { debounce } from 'lodash'
import { Input } from '@ant-design/react-native'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  addToHistory,
  clearHistory,
  fetchCoordinates,
  fetchPlacePredictions
} from '@/redux/placesSlice'
import { withApiKeyCheck } from '@/hoc/withApiKeyCheck'

type ItemProps = { label: string; value: string }

function CustomInput() {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')

  const data = useAppSelector((state) => state.places.places)
  const searchHistory = useAppSelector((state) => state.places.searchHistory)

  const onSelectPlace = (place: ItemProps) => {
    if (place.value) {
      dispatch(fetchCoordinates(place.value))
      dispatch(addToHistory(place))
      setInputValue(place.label)
    }
  }

  const Item = ({ label, value }: ItemProps) => (
    <TouchableOpacity onPress={() => onSelectPlace({ label, value })}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )

  const debouncedFetch = debounce((search) => {
    if (search.length === 0) return
    dispatch(fetchPlacePredictions(search))
  }, 500)

  const onChangeText = (search: string) => {
    setInputValue(search)
    debouncedFetch(search)
  }

  const onClearSearchHistory = () => dispatch(clearHistory())

  return (
    <View style={{ gap: 10 }}>
      <Input
        value={inputValue}
        allowClear
        type="text"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        onChangeText={onChangeText}
        inputStyle={styles.innerInput}
        placeholder="Search a place.."
      />

      {(inputValue.length > 0 || searchHistory.length > 0) && (
        <FlatList
          contentContainerStyle={{ gap: 5, paddingHorizontal: 5 }}
          data={inputValue ? data : searchHistory}
          style={styles.list}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Item label={item.label} value={item.value} />
          )}
          ListHeaderComponent={
            !inputValue && searchHistory.length > 0 ? (
              <View style={styles.historyHeader}>
                <Text style={styles.recentSearchesText}>Recent Searches</Text>
                <TouchableOpacity onPress={onClearSearchHistory}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '90%',
    elevation: 2,
    marginTop: 10,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  innerInput: {
    padding: 10
  },
  list: {
    width: '90%',
    maxHeight: 400,
    borderRadius: 5,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  historyHeader: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  clearText: {
    color: 'red'
  },
  recentSearchesText: { color: 'gray' }
})

export default withApiKeyCheck(CustomInput)
