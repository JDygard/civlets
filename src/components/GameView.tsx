import React, { useMemo } from "react"
import { generateHexMap } from "../utils/generateHexMap"
import HexMap from "./HexMap"
import { TileData } from "../types/tile"
import CameraControls from "./CameraControls"
import { useCamera } from "../context/CameraContext"
import { useChunkedTiles } from "../hooks/useChunkedTiles"

const GameView: React.FC = () => {
    const { centerQ, centerR } = useCamera()
    const tiles = useChunkedTiles(centerQ, centerR)

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Future: Sidebar, UI panels, top bar, etc. */}
      <div style={{ flex: 1, position: "relative" }}>
        <CameraControls>
        <HexMap tiles={tiles} />
        </CameraControls>
      </div>
    </div>
  )
}

export default GameView
