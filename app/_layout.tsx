import { Provider as AntProvider } from '@ant-design/react-native'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function RootLayout() {
  return (
    <AntProvider>
      <Provider store={store}>
        <Stack />
      </Provider>
    </AntProvider>
  )
}
