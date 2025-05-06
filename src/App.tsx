import React from "react"
import HexMap from "./components/HexMap"

const App: React.FC<any> = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "#111", color: "#fff", overflow: "hidden" }}>
      <HexMap />
    </div>
  )
}

export default App
