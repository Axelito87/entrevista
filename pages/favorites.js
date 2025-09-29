
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/favoritesContext';
import CountryCard from '../components/CountryCard';
import Link from 'next/link';
import '../style/globals.css'

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <main className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis Países Favoritos</h1>
        <nav>
          <Link href="/" className="underline">Volver al inicio</Link>
        </nav>
      </header>

      {favorites.length === 0 ? (
        <p>No tienes países favoritos aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
              onOpen={() => {}} // Puedes ajustar esta función según necesites
            />
          ))}
        </div>
      )}
    </main>
  );
}