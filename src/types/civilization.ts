import { TileData } from "./tile"

export type FocusAxis = "growth" | "production" | "science" | "culture" | "expansion" | "defense" | "infrastructure" | "military"

export interface Civilization {
  id: string
  name: string
  origin: { q: number; r: number; s: number }
  birthTick: number
  LP: number
  focusSliders: Record<FocusAxis, number> // 0 to 1 values
  cities: { q: number; r: number; s: number }[]
  units: { id: string; type: "builder" | "military"; location: { q: number; r: number; s: number } }[]
}
