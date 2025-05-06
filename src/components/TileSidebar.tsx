import React from 'react'
import { useTile } from "../context/TileContext"

const TileSidebar: React.FC = () => {
    const { selectedTile } = useTile()
    if (!selectedTile) return null
  
    return (
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: 200,
        height: "100%",
        background: "#1e1e1e",
        color: "#fff",
        padding: "1rem",
        borderLeft: "1px solid #444",
        zIndex: 5,
      }}>
        <h3>Tile Info</h3>
        <p>Type: {selectedTile.type}</p>
        <p>Q: {selectedTile.q}</p>
        <p>R: {selectedTile.r}</p>
        <p>S: {selectedTile.s}</p>
      </div>
    )
  }

  export default TileSidebar
  