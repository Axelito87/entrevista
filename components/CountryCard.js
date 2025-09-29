import React, { useContext } from 'react'
import { FavoritesContext } from '../context/favoritesContext'

export default function CountryCard({ country, onOpen }) {
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext)
    const fav = isFavorite(country.cca3)

    function getRegionStyle(region) {
        switch (region) {
            case "Europe":
                return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
            case "Asia":
                return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
            case "Africa":
                return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
            case "Americas":
                return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
            case "Oceania":
                return "bg-pink-500/20 text-pink-300 border border-pink-500/30";
            default:
                return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
        }
    }

    return (
        <article
            onClick={() => onOpen(country)}
            className="cursor-pointer bg-gray-800/60 backdrop-blur-sm rounded-xl border border-electric-blue/20 p-4 hover:shadow-2xl hover:shadow-electric-blue/20 hover:-translate-y-2 hover:border-electric-blue/40 transition-all duration-300 flex flex-col group"
        >
            {/* Imagen con overlay eléctrico */}
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={country.flags?.png || country.flags?.svg}
                    alt={`${country.name.common} flag`}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Contenido */}
            <div className="mt-4 flex-1">
                <h3 className="font-bold text-xl text-white group-hover:text-electric-blue-light transition-colors duration-300">
                    {country.name.common}
                </h3>

                <p
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full mt-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-current/20 ${getRegionStyle(
                        country.region
                    )}`}
                >
                    {country.region}
                </p>

                <p className="text-sm mt-3 text-gray-300">
                    Población: <span className="font-bold text-white">
                        {new Intl.NumberFormat().format(country.population || 0)}
                    </span>
                </p>
            </div>

            {/* Botón favorito */}
            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(country) }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${fav
                            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-yellow-400/30'
                            : 'bg-gray-700 text-electric-blue-light border border-electric-blue/30 hover:bg-electric-blue/20 hover:text-white hover:shadow-electric-blue/20'
                        }`}
                >
                    {fav ? '★ Favorito' : '☆ Agregar'}
                </button>
            </div>
        </article>
    )
}