export function pixelToAxial(x: number, y: number, size = 30): { q: number; r: number } {
    const q = ((Math.sqrt(3) / 3 * x - 1 / 3 * y) / size)
    const r = (2 / 3 * y) / size
    return axialRound(q, r)
  }
  
  function axialRound(q: number, r: number): { q: number; r: number } {
    let x = q
    let z = r
    let y = -x - z
  
    let rx = Math.round(x)
    let ry = Math.round(y)
    let rz = Math.round(z)
  
    const dx = Math.abs(rx - x)
    const dy = Math.abs(ry - y)
    const dz = Math.abs(rz - z)
  
    if (dx > dy && dx > dz) {
      rx = -ry - rz
    } else if (dy > dz) {
      ry = -rx - rz
    } else {
      rz = -rx - ry
    }
  
    return { q: rx, r: rz }
  }
  