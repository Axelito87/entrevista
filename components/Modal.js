// components/Modal.js
import React, { useContext } from 'react'
import { FavoritesContext } from '../context/favoritesContext'

export default function Modal({ country, onClose }) {
    const { toggleFavorite, isFavorite } = useContext(FavoritesContext)
    if (!country) return null

    const fav = isFavorite(country.cca3)

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-electric-blue/30 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-electric-blue/20 electric-glow"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-electric-blue-light glow-text pr-4">
                        {country.name?.official || country.name?.common}
                    </h2>
                    <button 
                        onClick={onClose} 
                        aria-label="Cerrar" 
                        className="text-electric-blue-light hover:text-white hover:bg-electric-blue/20 p-2 rounded-full transition-all duration-300 text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Bandera con efecto */}
                <div className="relative overflow-hidden rounded-xl mb-6 border border-electric-blue/20">
                    <img 
                        src={country.flags?.png || country.flags?.svg} 
                        alt={`Bandera de ${country.name.common}`} 
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>

                {/* Información del país */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-electric-blue rounded-full glow-dot"></div>
                        <p className="text-gray-300">
                            <strong className="text-electric-blue-light">Capital:</strong> 
                            <span className="text-white ml-2">
                                {country.capital ? country.capital.join(', ') : '—'}
                            </span>
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-electric-blue rounded-full glow-dot"></div>
                        <p className="text-gray-300">
                            <strong className="text-electric-blue-light">Región:</strong> 
                            <span className="text-white ml-2">
                                {country.region || '—'}
                            </span>
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-electric-blue rounded-full glow-dot"></div>
                        <p className="text-gray-300">
                            <strong className="text-electric-blue-light">Población:</strong> 
                            <span className="text-white ml-2">
                                {new Intl.NumberFormat().format(country.population || 0)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <button
                        onClick={() => toggleFavorite(country)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 text-center ${
                            fav 
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-yellow-400/40' 
                                : 'bg-gradient-to-r from-electric-blue to-electric-blue-dark text-white hover:shadow-electric-blue/40 border border-electric-blue/50'
                        }`}
                    >
                        {fav ? '★ Quitar favorito' : '☆ Agregar favorito'}
                    </button>

                    <a
                        className="px-4 py-3 text-sm text-electric-blue-light hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded-xl border border-electric-blue/30 hover:border-electric-blue/50 transition-all duration-300 text-center hover:shadow-electric-blue/20 hover:shadow-inner"
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common)}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        📚 Wikipedia
                    </a>
                </div>
            </div>
        </div>
    )
}