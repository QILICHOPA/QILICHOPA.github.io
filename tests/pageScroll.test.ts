import assert from 'node:assert/strict'
import test from 'node:test'
import { getPageStops, nextPageStop, PageWheelGesture } from '../src/hooks/pageScroll.ts'

test('one gesture lands at a whole section in either direction, even from halfway', () => {
  const stops = getPageStops([{ top: 0, height: 794 }, { top: 794, height: 794 }, { top: 1588, height: 794 }], 794, 1588)
  assert.deepEqual(stops, [0, 794, 1588])
  assert.equal(nextPageStop(stops, 0, 1), 794)
  assert.equal(nextPageStop(stops, 794, 1), 1588)
  assert.equal(nextPageStop(stops, 1100, -1), 794)
  assert.equal(nextPageStop(stops, 1100, 1), 1588)
})

test('tall panels include their final content without jumping past it', () => {
  assert.deepEqual(getPageStops([{ top: 0, height: 1800 }, { top: 1800, height: 800 }], 800, 1800), [0, 800, 1000, 1800])
  assert.equal(nextPageStop([0, 800, 1000, 1800], 800, 1), 1000)
})

test('a continuous 3-second gesture turns only one page, including after 900ms', () => {
  const gesture = new PageWheelGesture()
  const turns: number[] = []
  for (let now = 0; now <= 3000; now += 20) {
    const magnitude = Math.max(.2, 90 * Math.exp(-now / 350))
    if (gesture.shouldTurn(magnitude, now)) turns.push(now)
  }
  assert.deepEqual(turns, [0])
})

test('constant mouse-wheel input does not retrigger on a time limit', () => {
  const gesture = new PageWheelGesture()
  const turns: number[] = []
  for (let now = 0; now <= 2000; now += 50) {
    if (gesture.shouldTurn(16, now)) turns.push(now)
  }
  assert.deepEqual(turns, [0])
})

test('separate swipes are accepted after a quiet gap', () => {
  const gesture = new PageWheelGesture()
  assert.equal(gesture.shouldTurn(40, 0), true)
  assert.equal(gesture.shouldTurn(15, 100), false)
  assert.equal(gesture.shouldTurn(2, 200), false)
  assert.equal(gesture.shouldTurn(40, 500), true)
})

test('a renewed push is accepted without waiting for inertia to fully stop', () => {
  const gesture = new PageWheelGesture()
  const turns: number[] = []
  const samples = [[0, 80], [100, 40], [200, 15], [300, 5], [400, 2], [500, 1], [600, 4], [620, 14]]
  for (const [now, delta] of samples) if (gesture.shouldTurn(delta, now)) turns.push(now)
  assert.deepEqual(turns, [0, 620])
})

test('small reverse bounce and noisy low-amplitude inertia do not flip pages', () => {
  const gesture = new PageWheelGesture()
  const turns: number[] = []
  const samples = [[0, 80], [100, 30], [200, 4], [300, -1], [400, 2], [500, 1], [600, 3], [700, 5], [800, 2], [900, 4], [1000, 1], [1100, -2]]
  for (const [now, delta] of samples) if (gesture.shouldTurn(delta, now)) turns.push(now)
  assert.deepEqual(turns, [0])
})

test('deliberate reversal and explicit resets unlock immediately', () => {
  const gesture = new PageWheelGesture()
  assert.equal(gesture.shouldTurn(40, 0), true)
  assert.equal(gesture.shouldTurn(-30, 100), true)
  assert.equal(gesture.shouldTurn(-10, 200), false)
  gesture.reset()
  assert.equal(gesture.shouldTurn(-10, 220), true)
})

test('document edges and short sections stay inside the scroll range', () => {
  const stops = getPageStops([{ top: 0, height: 800 }, { top: 800, height: 400 }], 800, 400)
  assert.deepEqual(stops, [0, 400])
  assert.equal(nextPageStop(stops, 400, 1), 400)
  assert.equal(nextPageStop(stops, 0, -1), 0)
})
