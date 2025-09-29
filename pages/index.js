import React, { useEffect, useMemo, useState } from 'react'
import CountryCard from '../components/CountryCard'
import Modal from '../components/Modal'
import Link from 'next/link'
import Layout from "../app/layout";
import Racoon from '../components/Racoon'; // Importa el componente


export default function Home() {

    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)

    // filtros y UI
    const [search, setSearch] = useState('')
    const [region, setRegion] = useState('All')

    // límites de población
    const [minBound, setMinBound] = useState(0)
    const [maxBound, setMaxBound] = useState(0)
    const [popMin, setPopMin] = useState(0)
    const [popMax, setPopMax] = useState(0)

    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital')
                const data = await res.json()
                // ordenar por nombre
                data.sort((a, b) => a.name.common.localeCompare(b.name.common))
                setCountries(data)

                const pops = data.map((c) => c.population || 0)
                const min = Math.min(...pops)
                const max = Math.max(...pops)
                setMinBound(min)
                setMaxBound(max)
                setPopMin(min)
                setPopMax(max)

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchCountries()
    }, [])

    // regiones disponibles (derivadas)
    const regions = useMemo(() => {
        return Array.from(new Set(countries.map((c) => c.region).filter(Boolean)))
    }, [countries])

    // aplicar filtros
    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase()
        return countries
            .filter((c) => {
                if (region !== 'All' && c.region !== region) return false
                if (s && !c.name.common.toLowerCase().includes(s)) return false

                const pop = c.population || 0
                if (pop < Number(popMin)) return false
                if (pop > Number(popMax)) return false

                return true
            })
    }, [countries, search, region, popMin, popMax])

    if (loading) return (
        <Layout>
            <div className="p-6">Cargando países...</div>
        </Layout>
    )

    return (
        <Layout>
            <main className="p-6">
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Paises — Next.js Mini App</h1>
                        <div style={{ transform: 'scale(1.9)' }}> {/* Escala al 150% */}
                            <Racoon />
                        </div>
                    </div>
                    
                </header>

                <section className="mb-6 grid gap-4 grid-cols-1 md:grid-cols-3">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre (insensible a mayúsculas)"
                        className="p-2 rounded border"
                    />

                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="p-2 rounded border">
                        <option value="All">Todas las regiones</option>
                        {regions.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>

                    <div className="flex gap-2 items-center">
                        <div>
                            <label className="text-sm block">Población mínima</label>
                            <input type="number" value={popMin} min={minBound} max={maxBound} onChange={(e) => setPopMin(e.target.value)} className="p-2 rounded border w-full" />
                        </div>

                        <div>
                            <label className="text-sm block">Población máxima</label>
                            <input type="number" value={popMax} min={minBound} max={maxBound} onChange={(e) => setPopMax(e.target.value)} className="p-2 rounded border w-full" />
                        </div>
                    </div>
                </section>

                <section>
                    <p className="mb-3 text-sm">Mostrando {filtered.length} países</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map((c) => (
                            <CountryCard
                                key={c.cca3}
                                country={c}
                                onOpen={(country) => setSelectedCountry(country)}
                            />
                        ))}
                    </div>
                </section>

                {selectedCountry && (
                    <Modal
                        country={selectedCountry}
                        onClose={() => setSelectedCountry(null)}
                    />
                )}
            </main>
        </Layout>
    )
}

// asdasdasdasdsagi