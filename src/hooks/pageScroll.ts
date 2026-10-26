export type ScrollPanel = { top: number; height: number }

export function getPageStops(panels: ScrollPanel[], viewport: number, maximum: number) {
  if (viewport <= 0) return [0]
  const stops = [0, maximum]
  for (const panel of panels) {
    stops.push(panel.top)
    // Tall content gets intermediate pages and a final stop at its bottom.
    const bottom = panel.top + panel.height - viewport
    for (let top = panel.top + viewport; top < bottom - 2; top += viewport) stops.push(top)
    if (bottom > panel.top + 2) stops.push(bottom)
  }
  return stops.map(top => Math.max(0, Math.min(maximum, top)))
    .sort((a, b) => a - b)
    .filter((top, index, values) => index === 0 || top - values[index - 1] > 2)
}

export function nextPageStop(stops: number[], current: number, direction: number) {
  return direction > 0
    ? stops.find(top => top > current + 2) ?? stops.at(-1) ?? current
    : stops.findLast(top => top < current - 2) ?? stops[0] ?? current
}

export class PageWheelGesture {
  private lastEvent = -Infinity
  private startedAt = -Infinity
  private direction = 0
  private previousMagnitude = 0
  private peak = 0
  private trough = Infinity
  private decaying = false
  private rises = 0

  reset() {
    this.lastEvent = -Infinity
    this.direction = 0
  }

  private begin(delta: number, now: number) {
    this.lastEvent = now
    this.startedAt = now
    this.direction = Math.sign(delta)
    this.previousMagnitude = Math.abs(delta)
    this.peak = Math.abs(delta)
    this.trough = Infinity
    this.decaying = false
    this.rises = 0
    return true
  }

  shouldTurn(delta: number, now: number) {
    if (!delta) return false
    if (now - this.lastEvent >= 240) return this.begin(delta, now)
    this.lastEvent = now
    const magnitude = Math.abs(delta)

    if (Math.sign(delta) !== this.direction) {
      // Trackpad bounce can briefly reverse by a pixel or two.
      return magnitude >= 8 ? this.begin(delta, now) : false
    }

    if (magnitude < this.previousMagnitude) {
      this.rises = 0
      if (magnitude <= this.peak * .35) this.decaying = true
    } else if (magnitude > this.previousMagnitude * 1.15) {
      this.rises += 1
    } else {
      this.rises = 0
    }
    if (this.decaying) this.trough = Math.min(this.trough, magnitude)

    // A renewed push can start before all inertia has stopped. Require a real
    // acceleration after decay, rather than unlocking merely because time passed.
    const renewedPush = this.decaying && this.rises >= 2 &&
      magnitude >= Math.max(12, this.trough * 3) && now - this.startedAt >= 580
    if (renewedPush) return this.begin(delta, now)

    this.peak = Math.max(this.peak, magnitude)
    this.previousMagnitude = magnitude
    return false
  }
}
