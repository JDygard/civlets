import React, { useRef } from "react"
import { useCamera } from "../context/CameraContext"
import { pixelToAxial } from "../utils/pixelToHex"

const CameraControls: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { panX, panY, zoom, setCamera } = useCamera()
  const dragging = useRef(false)
  const anchor = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    anchor.current = {
      x: e.clientX,
      y: e.clientY,
      panX,
      panY,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !anchor.current) return
  
    const dx = (e.clientX - anchor.current.x) / zoom /10
    const dy = (e.clientY - anchor.current.y) / zoom /10
  
    const newPanX = anchor.current.panX + dx
    const newPanY = anchor.current.panY + dy
  
    const { q, r } = pixelToAxial(-newPanX, -newPanY, 30 * zoom)
  
    setCamera({
      panX: newPanX,
      panY: newPanY,
      centerQ: q,
      centerR: r,
    })
  }  

  const onMouseUp = () => {
    dragging.current = false
    anchor.current = null
  }

  const onWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? -0.05 : 0.05
    const newZoom = Math.min(Math.max(zoom + delta, 0.25), 3)

    const { q, r } = pixelToAxial(-panX, -panY, 30 * newZoom)

    setCamera({
      zoom: newZoom,
      centerQ: q,
      centerR: r,
    })
  }

  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden", cursor: "grab" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      {children}
    </div>
  )
}

export default CameraControls
