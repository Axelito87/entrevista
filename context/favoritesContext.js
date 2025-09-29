import { createContext, useEffect, useState } from 'react'


export const FavoritesContext = createContext()


export function FavoritesProvider({ children }) {
const [favorites, setFavorites] = useState(() => {
try {
const raw = typeof window !== 'undefined' && localStorage.getItem('favorites')
return raw ? JSON.parse(raw) : []
} catch (e) {
return []
}
})


useEffect(() => {
try {
localStorage.setItem('favorites', JSON.stringify(favorites))
} catch (e) {}
}, [favorites])


const toggleFavorite = (country) => {
setFavorites((prev) => {
const exists = prev.find((c) => c.cca3 === country.cca3)
if (exists) return prev.filter((c) => c.cca3 !== country.cca3)
return [...prev, country]
})
}


const isFavorite = (cca3) => favorites.some((c) => c.cca3 === cca3)


return (
<FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
{children}
</FavoritesContext.Provider>
)
}