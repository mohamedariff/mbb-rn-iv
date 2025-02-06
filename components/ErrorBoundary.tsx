import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('ErrorBoundary caught an error:', error, info)
    // Send to error reporting service such as Sentry
    // Even better, use Sentry ErrorBoundary for clearer error stack traces
  }

  render() {
    const { hasError, error } = this.state

    if (hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops. Something went wrong</Text>
          {error && <Text style={styles.error}>{error.toString()}</Text>}
          <Text style={styles.info}>Please try again later</Text>
        </View>
      )
    }
    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 12,
    textAlign: 'center'
  },
  info: {
    fontSize: 14,
    textAlign: 'center'
  }
})
