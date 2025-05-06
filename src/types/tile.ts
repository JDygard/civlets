
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
  occupiedBy?: string
  visible: boolean
}