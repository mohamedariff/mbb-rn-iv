import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Input } from '@ant-design/react-native'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { debounce } from 'lodash'
import { fetchCoordinates, fetchPlacePredictions } from '@/redux/placesSlice'

type ItemProps = { label: string; value: string }

function CustomInput() {
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.places.places)

  const onSelectPlace = (value: string) => {
    if (value) {
      dispatch(fetchCoordinates(value))
    }
  }

  const Item = ({ label, value }: ItemProps) => (
    <TouchableOpacity onPress={() => onSelectPlace(value)}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )

  const onChange = debounce((search) => {
    if (search) {
      dispatch(fetchPlacePredictions(search))
    }
  }, 500)

  return (
    <View style={{ gap: 10 }}>
      <Input
        onChangeText={onChange}
        allowClear
        type="text"
        autoComplete="off"
        style={styles.input}
        inputStyle={styles.innerInput}
        placeholder="Search a place.."
      />
      <FlatList
        data={data}
        style={styles.list}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <Item label={item.label} value={item.value} />
        )}
      />
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
  }
})

export default CustomInput
