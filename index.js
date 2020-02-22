const lengthSymbol = Symbol('length');

class Range {
  constructor(start, end, step) {
    if (step == 0) throw new Error('Step cannot be 0.');
    this.start = start;
    this.end = end;
    this.step = step;
    this.length = this[lengthSymbol]();
  }

  [lengthSymbol]() {
    return Math.max(0, Math.ceil((this.end - this.start) / this.step));
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++)
      yield this.start + i * this.step;
  }

  toArray() {
    return Array.from(this);
  }

  toSet() {
    return new Set(this);
  }

  includes(n) {
    if (this.length == 0) return false;
    if (n == this.start) return true;
    if (this.step > 0 && (n >= this.end || n < this.start)) return false;
    if (this.step < 0 && (n <= this.end || n > this.start)) return false;
    return (n - this.start) % this.step == 0;
  }

  [Symbol.toPrimitive](hint) {
    return hint == 'string' ? this.toString() : this.sum();
  }

  toString() {
    return `{${this.join(', ')}}`;
  }

  get(index) {
    if (index < 0) index = this.length + index;
    if (index < 0 || index >= this.length) return undefined;
    return this.start + index * this.step;
  }

  indexOf(n) {
    const index = (n - this.start) / this.step;
    return index < 0 || index >= this.length || !Number.isInteger(index) ?
      -1 : index;
  }

  reverse() {
    if (this.length == 0) return this;
    let first = this.start;
    let last = this.get(-1);
    this.step < 0 ? first++ : first--;
    this.start = last;
    this.end = first;
    this.step = this.step * -1;
    return this;
  }

  sum() {
    if (this.length == 0) return 0;
    return (this.start + this.get(this.length - 1)) * (this.length / 2);
  }

  forEach(cb) {
    for (let i = 0; i < this.length; i++)
      cb(this.get(i), i, this);
  }

  join(sep = ",") {
    const len = this.length;
    let str = '';
    if (len === 0) return str;
    let i = 0;
    while (true) {
      str += String(this.get(i));
      if (++i >= len) return str;
      str += sep;
    }
  }

  find(cb) {
    for (let i of this)
      if (cb(i)) return i;
    return undefined;
  }

  filter(cb) {
    const found = [];
    for (let i = 0; i < this.length; i++) {
      const currVal = this.get(i);
      if (cb(currVal, i, this)) found.push(currVal);
    }
    return found;
  }

  reduce(cb, initial) {
    if (this.length == 0) return 0;
    if (this.length == 1) return this.start;

    let [aggregator, b, i] = initial == undefined ? [this.get(0), this.get(1), 1] : [initial, this.get(0), 0];

    while (b != undefined) {
      aggregator = cb(aggregator, b);
      b = this.get(++i);
    }
    return aggregator;
  }

  map(cb, ...args) {
    let arr = [];
    for (let i = 0; i < this.length; i++)
      arr.push(cb(this.get(i), i, this, ...args));
    return arr;
  }

  pop() {
    if (this.length == 0) return undefined;
    const last = this.get(this.length - 1);
    this.end = this.length == 1 ? this.start : this.get(this.length - 2) + 1;
    return last;
  }

  shift() {
    if (this.length == 0) return undefined;
    const first = this.start;
    this.start = this.length == 1 ? this.end : this.get(1);
    return first;
  }

  some(cb) {
    for (let i = 0; i < this.length; i++)
      if (cb(this.get(i), i, this)) return true;
    return false;
  }

  every(cb) {
    for (let i = 0; i < this.length; i++)
      if (!cb(this.get(i), i, this)) return false;
    return true;
  }

  count(cb) {
    let c = 0;
    for (let i = 0; i < this.length; i++)
      if (cb(this.get(i), i, this)) c++;
    return c;
  }


  * generator(cb, ...args) {
    for (let i = 0; i < this.length; i++)
      yield cb(this.get(i), i, this, ...args);
  }

  stream(opts = {}) {
    const {
      Readable
    } = require('stream');
    class RangeStream extends Readable {
      constructor(opts, range) {
        super(opts);
        this.iterator = range[Symbol.iterator]();
      }
      _read() {
        const {
          done = null, value = null
        } = this.iterator.next();
        if (done)
          return this.push(null)
        if (this._readableState.objectMode)
          return this.push({
            value
          });
        return this.push(String(value));
      }
    }
    return new RangeStream(opts, this);
  }

  * enumerate(indexStart = 0) {
    for (const el of this)
      yield([indexStart++, el]);
  }

  // TODO
  slice() {}
}


function range(...args) {
  let len = args.length;
  if (len < 1) throw Error(`range expected at least 1 argument, got ${len}`);
  if (len > 3) throw Error(`range expected at most 3 arguments, got ${len}`);
  args.forEach(arg => {
    if (isNaN(arg)) throw Error(`${typeof arg} cannot be interpreted as a number`)
  });

  let start = len == 1 ? 0 : +(args[0]);
  let end = len == 1 ? +(args[0]) : +(args[1]);
  let step = len < 3 ? 1 : +(args[2]);

  return new Proxy(new Range(start, end, step), {
    get: function (target, name) {
      if (name in target) return target[name];
      if (typeof name != 'symbol' && !isNaN(name)) return target.get(+name);
      return undefined;
    },
    set: function (target, prop, value) {
      switch (prop) {
        case 'start':
        case 'end':
        case 'step':
          target[prop] = value;
          target.length = target[lengthSymbol]();
          return true;
        default:
          return false;
      }
    },
    has: function (target, key) {
      if (key in target)
        return true;
      key = +key;
      if (!isNaN(key))
        return target.includes(key);
      return false;
    },
  });
}


module.exports = range;