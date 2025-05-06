import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CameraProvider } from './context/CameraContext.tsx'
import { TileProvider } from './context/TileContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CameraProvider>
      <TileProvider>
        <App />
      </TileProvider>
    </CameraProvider>
  </StrictMode>,
)
