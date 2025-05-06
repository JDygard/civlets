import { useEffect, useState } from "react"
import { TileData } from "../types/tile"
import { generateHexMap } from "../utils/generateHexMap"

const CHUNK_RADIUS = 1 // tiles per chunk
const RENDER_DISTANCE = 2 // chunks around camera center

const getChunkKey = (q: number, r: number) => `${q},${r}`

export function useChunkedTiles(centerQ: number, centerR: number): TileData[] {
  const [chunks, setChunks] = useState<Map<string, TileData[]>>(new Map())

  useEffect(() => {
    const neededChunks = new Set<string>()

    for (let dq = -RENDER_DISTANCE; dq <= RENDER_DISTANCE; dq++) {
      for (let dr = -RENDER_DISTANCE; dr <= RENDER_DISTANCE; dr++) {
        const cq = centerQ + dq * CHUNK_RADIUS * 2
        const cr = centerR + dr * CHUNK_RADIUS * 2
        const key = getChunkKey(cq, cr)
        neededChunks.add(key)

        if (!chunks.has(key)) {
          const newChunk = generateHexMap(CHUNK_RADIUS, cq, cr)
          setChunks(prev => new Map(prev).set(key, newChunk))
        }
      }
    }
  }, [centerQ, centerR])

  const allTiles: TileData[] = []
  for (const chunk of chunks.values()) {
    allTiles.push(...chunk)
  }

  return allTiles
}
