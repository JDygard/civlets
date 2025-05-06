import { TileData } from "../types/tile"
import { getBiome } from "./biomeGenerator"

export function generateHexMap(radius: number, offsetQ = 0, offsetR = 0): TileData[] {
  const tiles: TileData[] = []

  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius)
    const r2 = Math.min(radius, -q + radius)
    for (let r = r1; r <= r2; r++) {
      const s = -q - r
      const aq = q + offsetQ
      const ar = r + offsetR
      const as = -aq - ar

      tiles.push({
        q: aq,
        r: ar,
        s: as,
        type: getBiome(aq, ar),
        visible: true,
      })
    }
  }

  return tiles
}
