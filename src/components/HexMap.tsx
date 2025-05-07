import React from "react"
import { HexGrid, Layout, Hexagon } from "react-hexgrid"
import { TileData, TileType } from "../types/tile"
import { useCiv } from "../context/CivContext"
import { useCamera } from "../context/CameraContext"
import { useTile } from "../context/TileContext"
import { useMap } from "../context/MapContext"

const HEX_LAYOUT_SIZE = { x: 5, y: 5 }
const HEX_SPACING = 1.05
const FLAT = true

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

const directions = [
  { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
  { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
]

function getNeighborCoords(tile: TileData, dir: number) {
  const d = directions[dir]
  return { q: tile.q + d.q, r: tile.r + d.r, s: -tile.q - tile.r - d.q - d.r }
}

function getEdgeEndpoints(size: number, edgeIndex: number) {
  const angleDegA = 60 * edgeIndex
  const angleDegB = angleDegA + 60
  const angleRadA = (Math.PI / 180) * angleDegA
  const angleRadB = (Math.PI / 180) * angleDegB
  return {
    x1: size * Math.cos(angleRadA),
    y1: size * Math.sin(angleRadA),
    x2: size * Math.cos(angleRadB),
    y2: size * Math.sin(angleRadB),
  }
}

const HexMap: React.FC = () => {
  const { zoom, panX, panY } = useCamera()
  const { hoveredTile, selectedTile, setHoveredTile, setSelectedTile } = useTile()
  const { tiles, getTile } = useMap()
  const { civ } = useCiv()

  return (
    <HexGrid width="100%" height="100%">
      <g transform={`translate(${panX}, ${panY}) scale(${zoom})`}>
        <Layout
          size={HEX_LAYOUT_SIZE}
          flat={FLAT}
          spacing={HEX_SPACING}
          origin={{ x: 0, y: 0 }}
        >
          {tiles.map((tile) => {
            const isHovered = hoveredTile?.q === tile.q && hoveredTile.r === tile.r
            const isSelected = selectedTile?.q === tile.q && selectedTile.r === tile.r

            const borders = [0, 1, 2, 3, 4, 5].filter((dir) => {
              const neighborCoords = getNeighborCoords(tile, dir)
              const neighborTile = getTile(neighborCoords.q, neighborCoords.r)
              return !neighborTile || neighborTile.ownerCivId !== tile.ownerCivId
            })

            return (
              <Hexagon
                key={`${tile.q},${tile.r},${tile.s}`}
                q={tile.q}
                r={tile.r}
                s={tile.s}
                onMouseEnter={() => setHoveredTile(tile)}
                onMouseLeave={() => setHoveredTile(null)}
                onClick={() => setSelectedTile(tile)}
                style={{
                  fill: tileColors[tile.type],
                  stroke: tile.ownerCivId === civ?.id ? "magenta" : isSelected ? "#FFD700" : isHovered ? "#fff" : "#222",
                  strokeWidth: 0.5,
                }}
              >
                {tile.type === "city" && (
                  <circle cx="0" cy="0" r="2.5" fill="#FFD700" stroke="#222" strokeWidth="0.5" />
                )}
                {tile.type === "outpost" && (
                  <rect x="-2" y="-2" width="4" height="4" fill="#FFA500" stroke="#222" strokeWidth="0.5" />
                )}
                {tile.type === "fortress" && (
                  <polygon
                    points="-2,-2 0,-3 2,-2 2,2 0,3 -2,2"
                    fill="#800080"
                    stroke="#222"
                    strokeWidth="0.5"
                  />
                )}
              </Hexagon>

            )
          })}
        </Layout>
      </g>
    </HexGrid>
  )
}

export default HexMap
