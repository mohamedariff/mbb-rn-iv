import React from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Input } from '@ant-design/react-native'

type ItemProps = { title: string }

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

function CustomInput() {
  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity>
      <Text>{title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{ gap: 10 }}>
      <Input
        allowClear
        type="text"
        autoComplete="off"
        style={styles.input}
        inputStyle={styles.innerInput}
        placeholder="Search a place.."
      />
      <FlatList
        style={styles.list}
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item title={item.title} />}
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
