import { KeyboardAvoidingView, View } from 'react-native'

import CustomMap from '@/components/Map'
import CustomInput from '@/components/Input'

export default function Index() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <CustomMap>
        <CustomInput />
      </CustomMap>
    </KeyboardAvoidingView>
  )
}
