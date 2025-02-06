import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { UrlTile } from 'react-native-maps'

const mapbox_key =
  'https://api.mapbox.com/styles/v1/hekhek/ckonu31md54hr17sioe3mfi29/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVraGVrIiwiYSI6ImNrb250a3V4bjA0c2oyd2w0amkxM3ZnazEifQ.EeTb8hX0AWcmc0bikEb--g'
function CustomMap({ children }) {
  return (
    <MapView style={styles.map}>
      {children}
      <UrlTile urlTemplate={mapbox_key} />
    </MapView>
  )
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
export default CustomMap
