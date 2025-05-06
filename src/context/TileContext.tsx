import React, { createContext, useContext, useState } from "react"
import { TileData } from "../types/tile"

type TileContextType = {
  hoveredTile: TileData | null
  selectedTile: TileData | null
  setHoveredTile: (tile: TileData | null) => void
  setSelectedTile: (tile: TileData | null) => void
}

const TileContext = createContext<TileContextType>({
  hoveredTile: null,
  selectedTile: null,
  setHoveredTile: () => {},
  setSelectedTile: () => {},
})

export const useTile = () => useContext(TileContext)

export const TileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredTile, setHoveredTile] = useState<TileData | null>(null)
  const [selectedTile, setSelectedTile] = useState<TileData | null>(null)

  return (
    <TileContext.Provider value={{ hoveredTile, selectedTile, setHoveredTile, setSelectedTile }}>
      {children}
    </TileContext.Provider>
  )
}
