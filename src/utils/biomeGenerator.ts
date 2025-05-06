import { createNoise2D } from "simplex-noise"
import { TileType } from "../types/tile"

// Seeded and reusable
const elevationNoise = createNoise2D(() => Math.sin(42)) // consistent seed
const moistureNoise = createNoise2D(() => Math.cos(69))

export function getBiome(q: number, r: number): TileType {
  const scale = 0.1 // controls zoom

  const e = elevationNoise(q * scale, r * scale) * 0.5 + 0.5
  const m = moistureNoise((q + 1000) * scale, (r + 1000) * scale) * 0.5 + 0.5

  if (e < 0.2) return "ocean"
  if (e < 0.3) return "lake"
  if (e > 0.85) return "mountain"
  if (e > 0.7) return m > 0.5 ? "forest" : "hills"
  if (m > 0.75) return "swamp"
  if (m > 0.5) return "plains"
  if (m > 0.3) return "desert"
  return "wasteland"
}