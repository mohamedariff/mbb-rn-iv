import { KeyboardAvoidingView } from 'react-native'

import CustomMap from '@/components/Map'
import CustomInput from '@/components/Input'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Index() {
  return (
    <ErrorBoundary>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <CustomMap>
          <CustomInput />
        </CustomMap>
      </KeyboardAvoidingView>
    </ErrorBoundary>
  )
}
