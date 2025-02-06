import React, { useEffect } from 'react'
import { Toast } from '@ant-design/react-native'
import { isUndefined } from 'lodash'

export const withApiKeyCheck = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    useEffect(() => {
      if (isUndefined(process.env.EXPO_PUBLIC_PLACES_KEY)) {
        Toast.fail(
          'Google Places API key is missing. I have include the key in email. Please ask Martina Ridzuan from the HR'
        )
      }
    }, [])

    return <WrappedComponent {...props} />
  }
}
