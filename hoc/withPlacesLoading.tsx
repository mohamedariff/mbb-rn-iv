import { Spin } from 'antd'
import { useAppSelector } from '../redux/hooks'

const withPlacesLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const loading = useAppSelector((state) => state.places.loading)

    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Spin size="large" />
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}

export default withPlacesLoading
