import React, { createContext, useContext, useState } from "react"

type Camera = {
  centerQ: number
  centerR: number
  zoom: number
  panX: number
  panY: number
  setCamera: (cam: Partial<Camera>) => void
}

const defaultCam: Camera = {
  centerQ: 0,
  centerR: 0,
  zoom: 1,
  panX: 0,
  panY: 0,
  setCamera: () => {},
}

const CameraContext = createContext<Camera>(defaultCam)

export const useCamera = () => useContext(CameraContext)

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [camera, setState] = useState<Omit<Camera, "setCamera">>(defaultCam)

  const setCamera = (updates: Partial<Camera>) =>
    setState((prev) => ({ ...prev, ...updates }))

  return (
    <CameraContext.Provider value={{ ...camera, setCamera }}>
      {children}
    </CameraContext.Provider>
  )
}
