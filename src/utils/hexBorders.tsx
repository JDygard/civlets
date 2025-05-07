export const HEX_SIZE = 5

// returns pixel coordinates for a flat hex corner
export function hexCorner(cx: number, cy: number, i: number, size: number) {
    const angleRad = (Math.PI / 180) * (60 * i)
    return {
      x: cx + size * Math.cos(angleRad),
      y: cy + size * Math.sin(angleRad),
    }
  }

// generate SVG path string for one edge between two corners
export function hexEdgePath(cx: number, cy: number, edgeIndex: number, size: number) {
    const a = hexCorner(cx, cy, edgeIndex, size)
    const b = hexCorner(cx, cy, (edgeIndex + 1) % 6, size)
    return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
  }

export const directions = [
    { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
    { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
]

export function neighbor(tile: { q: number; r: number }, dir: number) {
    const d = directions[dir]
    return { q: tile.q + d.q, r: tile.r + d.r, s: -tile.q - tile.r - d.q - d.r }
}

export function hexToPixel(
    { q, r }: { q: number; r: number },
    size: number,
    spacing: number,
    flat: boolean
) {
    const x = size * spacing
    const y = size * spacing

    if (flat) {
        return {
            x: Math.sqrt(3) * x * (q + r / 2),
            y: 1.5 * y * r,
        }
    } else {
        return {
            x: 1.5 * x * q,
            y: Math.sqrt(3) * y * (r + q / 2),
        }
    }
}

// Perfectly matches react-hexgrid's Layout logic
export function hexToPixelFlat(
    { q, r }: { q: number; r: number },
    size: { x: number; y: number }, // from <Layout size={{ x, y }}>
    spacing = 1.0
  ) {
    const x = spacing * size.x * Math.sqrt(3) * (q + r / 2)
    const y = spacing * size.y * 1.5 * r
    return { x, y }
  }
  