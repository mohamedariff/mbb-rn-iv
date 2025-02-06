import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from '@ant-design/react-native'

function CustomInput() {
  return (
    <Input
      allowClear
      type="text"
      autoComplete="off"
      style={styles.input}
      inputStyle={styles.innerInput}
      placeholder="Search a place.."
    />
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
  }
})

export default CustomInput
