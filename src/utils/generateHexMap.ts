import { TileData } from "../types/tile"
import { getBiome } from "./biomeGenerator"

export function generateHexMap(radius: number): TileData[] {
  const tiles: TileData[] = []

  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius)
    const r2 = Math.min(radius, -q + radius)
    for (let r = r1; r <= r2; r++) {
      const s = -q - r
      const type = getBiome(q, r)

      tiles.push({
        q,
        r,
        s,
        type,
        visible: true,
      })
    }
  }

  return tiles
}
