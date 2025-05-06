import React from "react"
import { useTile } from "../context/TileContext"

const TileTooltip: React.FC = () => {
  const { hoveredTile } = useTile()
  if (!hoveredTile) return null

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        padding: "4px 8px",
        fontSize: "12px",
        borderRadius: 4,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div>Biome: {hoveredTile.type}</div>
      <div>Coords: ({hoveredTile.q}, {hoveredTile.r})</div>
    </div>
  )
}

export default TileTooltip
