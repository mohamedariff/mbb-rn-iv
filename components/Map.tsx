import type { ReactNode } from 'react'
import type { AnimatedRegion, Region } from 'react-native-maps'
import { Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { useAppSelector } from '@/redux/hooks'
import MapView, { Marker, UrlTile } from 'react-native-maps'

const mapbox_key = process.env.EXPO_PUBLIC_MAPBOX_KEY || ''

type CustomMapProps = {
  children: ReactNode
}

function CustomMap({ children }: CustomMapProps) {
  const isIos = Platform.OS === 'ios'
  const mapRef = useRef<MapView>(null)

  const [region, setRegion] = useState<Region | AnimatedRegion>()

  const selectedCoordinates = useAppSelector(
    (state) => state.places.selectedCoordinates
  )

  useEffect(() => {
    if (selectedCoordinates) {
      const newRegion: Region = {
        latitude: selectedCoordinates.lat,
        longitude: selectedCoordinates.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000)
      }
    }
  }, [selectedCoordinates])

  return (
    <MapView
      ref={mapRef}
      region={region}
      style={styles.map}
      mapType={isIos ? 'standard' : 'none'}
    >
      {children}
      <UrlTile urlTemplate={mapbox_key} />
      {selectedCoordinates && (
        <Marker
          title={selectedCoordinates.name}
          description={selectedCoordinates.name}
          coordinate={{
            latitude: selectedCoordinates.lat,
            longitude: selectedCoordinates.lng
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

export default CustomMap
