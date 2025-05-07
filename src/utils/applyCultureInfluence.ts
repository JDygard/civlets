import { TileData } from "../types/tile"

export function applyCulture(
  tiles: TileData[],
  civId: string,
  center: { q: number; r: number; s: number },
  radius: number = 1,
  strength: number = 1.0
) {
  for (const tile of tiles) {
    const dist = axialDistance(tile, center)
    if (dist <= radius) {
      if (!tile.cultureMap) tile.cultureMap = {}
      tile.cultureMap[civId] = strength

      // Determine owner: highest culture wins
      const entries = Object.entries(tile.cultureMap)
      const sorted = entries.sort((a, b) => b[1] - a[1])
      const [topCiv, topValue] = sorted[0]
      tile.ownerCivId = topValue >= 1.0 ? topCiv : undefined
    }
  }
}

function axialDistance(a: { q: number; r: number }, b: { q: number; r: number }) {
  return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2
}
