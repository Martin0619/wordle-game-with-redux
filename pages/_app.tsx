import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/layout/layout'
import store from '../store'
import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}
