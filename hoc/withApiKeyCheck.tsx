import React, { useEffect } from 'react'
import { Toast } from '@ant-design/react-native'

export const withApiKeyCheck = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    useEffect(() => {
      console.log(
        '=======process.env.EXPO_PUBLIC_PLACES_KEY:',
        process.env.EXPO_PUBLIC_PLACES_KEY
      )
      if (!!process.env.EXPO_PUBLIC_PLACES_KEY) {
        Toast.fail(
          'Google Places API key is missing. I have include the key in email. Please ask Martina Ridzuan from the HR'
        )
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}
