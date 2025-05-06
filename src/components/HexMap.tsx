import React from "react"
import { HexGrid, Layout, Hexagon } from "react-hexgrid"
import { TileData, TileType } from "../types/tile"
import { useCamera } from "../context/CameraContext"

type Props = {
  tiles: TileData[]
}

const tileColors: Record<TileType, string> = {
  plains: "#a8d8a0",
  forest: "#4caf50",
  mountain: "#8b4513",
  hills: "#deb887",
  river: "#1e90ff",
  lake: "#4682b4",
  ocean: "#1e90ff",
  desert: "#f4a460",
  swamp: "#228b22",
  volcano: "#ff4500",
  ruins: "#808080",
  city: "#ffd700",
  outpost: "#ffa500",
  fortress: "#800080",
  wasteland: "#696969",
}

const HexMap: React.FC<Props> = ({ tiles }) => {
  const { zoom, panX, panY } = useCamera()

  return (
    <HexGrid width="100%" height="100%">
      <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
        <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>
          {tiles.map((tile, index) => (
            <Hexagon
              key={index}
              q={tile.q}
              r={tile.r}
              s={tile.s}
              style={{ fill: tileColors[tile.type] }}
            />
          ))}
        </Layout>
      </g>
    </HexGrid>
  )
}

export default HexMap
