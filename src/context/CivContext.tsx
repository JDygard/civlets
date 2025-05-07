import React, { createContext, useContext, useState } from "react"
import { Civilization } from "../types/civilization"
import { useMap } from "./MapContext"

type CivContextType = {
  civ: Civilization | null
  foundCiv: (tile: { q: number; r: number; s: number }) => void
}

const CivContext = createContext<CivContextType>({
  civ: null,
  foundCiv: () => {},
})

export const useCiv = () => useContext(CivContext)

export const CivProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [civ, setCiv] = useState<Civilization | null>(null)
  const { applyCulture, updateTile, getTile } = useMap()

  const foundCiv = (tile: { q: number; r: number; s: number }) => {
    const newCiv: Civilization = {
      id: "civ-" + Date.now(),
      name: "PlayerCiv",
      origin: tile,
      birthTick: 0,
      LP: 0,
      focusSliders: {
        growth: 0.5,
        production: 0.5,
        science: 0.5,
        culture: 0.5,
        expansion: 0.5,
        defense: 0.5,
        infrastructure: 0.5,
        military: 0.5,
      },
      cities: [tile],
      units: [],
    }
    setCiv(newCiv)

    applyCulture(newCiv.id, tile, 1, 1.0)
    const centerTile = getTile(tile.q, tile.r)
    if (centerTile) {
        const updated = { ...centerTile, features: new Set(["city"]) }
        updateTile(updated)
    }
  }

  return (
    <CivContext.Provider value={{ civ, foundCiv }}>
      {children}
    </CivContext.Provider>
  )
}
