import React, { createContext, useContext, useState } from "react"
import { TileData } from "../types/tile"
import { applyCulture as _applyCulture } from "../utils/applyCultureInfluence"
import { generateHexMap } from "../utils/generateHexMap"

type MapContextType = {
    tiles: TileData[]
    getTile: (q: number, r: number) => TileData | undefined
    updateTile: (updated: TileData) => void
    applyCulture: (civId: string, center: { q: number; r: number; s: number }, radius?: number, strength?: number) => void
    loadChunksAround: (centerQ: number, centerR: number) => void
}

const CHUNK_RADIUS = 1
const RENDER_DISTANCE = 2

type ChunkKey = string
const getChunkKey = (q: number, r: number) => `${q},${r}`

const MapContext = createContext<MapContextType>({
    tiles: [],
    getTile: () => undefined,
    updateTile: () => { },
    applyCulture: () => { },
    loadChunksAround: () => { },
})

export const useMap = () => useContext(MapContext)

export const MapProvider: React.FC<{ initialTiles: TileData[]; children: React.ReactNode }> = ({ initialTiles, children }) => {
    const [chunks, setChunks] = useState<Map<ChunkKey, TileData[]>>(new Map())
    const [tiles, setTiles] = useState<TileData[]>(initialTiles)

    const getTile = (q: number, r: number) =>
        tiles.find((t) => t.q === q && t.r === r)

    const updateTile = (updated: TileData) => {
        setTiles((prev) =>
            prev.map((tile) =>
                tile.q === updated.q && tile.r === updated.r ? updated : tile
            )
        )
    }

    const loadChunksAround = (centerQ: number, centerR: number) => {
        const neededChunks = new Set<ChunkKey>()
        const newChunks = new Map(chunks)

        for (let dq = -RENDER_DISTANCE; dq <= RENDER_DISTANCE; dq++) {
            for (let dr = -RENDER_DISTANCE; dr <= RENDER_DISTANCE; dr++) {
                const cq = centerQ + dq * CHUNK_RADIUS * 2
                const cr = centerR + dr * CHUNK_RADIUS * 2
                const key = getChunkKey(cq, cr)
                neededChunks.add(key)

                if (!newChunks.has(key)) {
                    const chunkTiles = generateHexMap(CHUNK_RADIUS, cq, cr)
                    newChunks.set(key, chunkTiles)
                }
            }
        }

        const allTiles: TileData[] = Array.from(newChunks.values()).flat()
        setChunks(newChunks)
        setTiles(allTiles)
    }

    const applyCulture = (civId: string, center: { q: number; r: number; s: number }, radius = 1, strength = 1.0) => {
        const newTiles = [...tiles]
        _applyCulture(newTiles, civId, center, radius, strength)
        setTiles(newTiles)
    }

    return (
        <MapContext.Provider value={{ tiles, getTile, updateTile, applyCulture, loadChunksAround }}>
            {children}
        </MapContext.Provider>
    )
}
