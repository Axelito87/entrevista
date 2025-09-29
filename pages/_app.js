import '../style/globals.css'
import { FavoritesProvider } from '../context/favoritesContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  )
}