import { useCiv } from "../context/CivContext"
import { useTile } from "../context/TileContext"

const TileSidebar: React.FC = () => {
  const { selectedTile } = useTile()
  const { civ, foundCiv } = useCiv()

  if (!selectedTile) return null

  const alreadyOwned = selectedTile.ownerCivId !== undefined
  const validSpawn = !alreadyOwned && selectedTile.type !== "ocean" && selectedTile.type !== "mountain"

  return (
    <div style={{
      position: "absolute",
      right: 0,
      top: 0,
      width: 250,
      background: "#1e1e1e",
      color: "#fff",
      padding: "1rem",
      borderLeft: "1px solid #444",
      zIndex: 5,
    }}>
      <h3>Tile Info</h3>
      <p>Type: {selectedTile.type}</p>
      <p>Coords: ({selectedTile.q}, {selectedTile.r})</p>

      {!civ && validSpawn && (
        <button onClick={() => foundCiv(selectedTile)}>Found Civilization Here</button>
      )}

      {civ && selectedTile.ownerCivId === civ.id && (
        <p>This is part of your civilization.</p>
      )}
    </div>
  )
}

export default TileSidebar