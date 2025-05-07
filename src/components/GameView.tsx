import React, { useMemo, useEffect } from "react"
import { generateHexMap } from "../utils/generateHexMap"
import HexMap from "./HexMap"
import CameraControls from "./CameraControls"
import { CameraProvider, useCamera } from "../context/CameraContext"
import { TileProvider } from "../context/TileContext"
import TileTooltip from "./TileTooltip"
import TileSidebar from "./TileSidebar"
import { MapProvider } from "../context/MapContext"
import { CivProvider } from "../context/CivContext"
import { useMap } from "../context/MapContext"

const GameView: React.FC = () => {
  const initialTiles = useMemo(() => generateHexMap(4), [])

  return (
    <CameraProvider>
      <MapProvider initialTiles={initialTiles}>
        <TileProvider>
          <CivProvider>
            <CameraControls>
              <GameWorld />
            </CameraControls>
          </CivProvider>
        </TileProvider>
      </MapProvider>
    </CameraProvider>
  )
}

const GameWorld: React.FC = () => {
  const { centerQ, centerR } = useCamera()
  const { loadChunksAround, tiles } = useMap()

  useEffect(() => {
    loadChunksAround(centerQ, centerR)
  }, [centerQ, centerR])

  return (
    <>
      <HexMap tiles={tiles} />
      <TileTooltip />
      <TileSidebar />
    </>
  )
}

export default GameView
