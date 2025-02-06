import { Provider } from '@ant-design/react-native'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Provider>
      <Stack />
    </Provider>
  )
}
