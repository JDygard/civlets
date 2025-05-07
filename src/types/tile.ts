
export type TileType =
  | "plains"
  | "forest"
  | "mountain"
  | "hills"
  | "river"
  | "lake"
  | "ocean"
  | "desert"
  | "swamp"
  | "volcano"
  | "ruins"
  | "city"
  | "outpost"
  | "fortress"
  | "wasteland"

  export interface TileData {
    q: number
    r: number
    s: number
    type: TileType
    visible: boolean
    ownerCivId?: string
    cultureMap?: Record<string, number> // civId → 0.0–1.0
    features?: any
  }
  
  