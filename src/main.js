/**
 * @private
 * A stack of callback attach to a specific fps rate
 */
export class TickStack {
  constructor(fps = 60) {
    this.fps = fps
    this.latest = 0
    this.delta = 0
    this.callbacks = []
    this.frameDuration = 1000 / this.fps
  }

  get isEmpty() {
    return this.callbacks.length === 0
  }

  add(callback) {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback)
    }
  }

  remove(callback) {
    this.callbacks.splice(this.callbacks.indexOf(callback), 1)
  }

  loop(now) {
    this.delta = now - this.latest

    if (this.delta > this.frameDuration) {
      this.callbacks.forEach((callback) => {
        callback(this.delta)
      })

      this.latest = now - (this.delta % this.frameDuration)
    }
  }
}

export class Raf {
  constructor() {
    this.now = performance.now()
    this.latest = this.now
    this.delta = this.now - this.latest
    this.playing = false
    this.tickStacks = {}
  }

  start() {
    if (!process.client) return
    this.playing = true
    this.loop()
  }

  stop() {
    this.playing = false
  }

  addTick(tick, callback) {
    if (!this.tickStacks[tick]) {
      this.tickStacks[tick] = new TickStack(tick)
    }
    this.tickStacks[tick].add(callback)
  }

  removeTick(tick, callback) {
    if (!this.tickStacks[tick]) return
    this.tickStacks[tick].remove(callback)
    if (this.tickStacks[tick].isEmpty) {
      delete this.tickStacks[tick]
    }
  }

  loop() {
    this.latest = this.now
    this.now = performance.now()

    Object.keys(this.tickStacks).forEach((key) => {
      this.tickStacks[key].loop(this.now)
    })

    if (this.playing) {
      requestAnimationFrame(this.loop.bind(this))
    }
  }
}

export default new Raf()