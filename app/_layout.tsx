import 'react-native-gesture-handler'

import { Provider as AntProvider } from '@ant-design/react-native'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'

import store from '../redux/store'

export default function RootLayout() {
  useFonts({
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf')
  })

  return (
    <AntProvider>
      <Provider store={store}>
        <Stack />
      </Provider>
    </AntProvider>
  )
}
