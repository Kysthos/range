## range function
Work in progress. It's an exercise project.

## range(end)
## range(start, end)
## range(start, end, step)

A range function for js.
Allows to use negative indexes, `in` operator, and `for ... of` loop:
```js
range(10)[-1] // 9

10 in range(100) // true

for (const i of range(10))
  console.log(i)
```
Proxy is used.

## r.toArray()
Returns the range as an array.
```js
range(10).toArray() // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```
## r.toSet()
Returns the range as a set.
```js
range(10).toSet() // Set { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }
```
## r.includes(number)

Returns `true` if `number` is in range, `false` otherwise. Used internally when calling `in` operator.
```js
range(10, 30, 2).includes(28) // true
```
## r.toString()
```js
range(10).toString() // {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```
## r.get(index)
Returns a number in the range at the given index, `undefined` if out of range. Accepts negative integers.
```js
range(10, 100, 2).get(-1) // 98
range(10, 100, 2).get(3) // 16
```
## r.indexOf(number)
Returns index of specified number. If not in range, returns `-1`.
```js
range(5, 25, 5).indexOf(12) // -1
range(5, 25, 5).indexOf(20) // 3
```
## r.enumerate([indexStartingValue])
Generator function yielding an array of `[index, element]`. Optionally, starting value of the index can be specified.
```js
for (const [i, num] of range(4, -4, -2).enumerate())
  console.log(`index ${i}: ${num}`)
// index 0: 4
// index 1: 2
// index 2: 0
// index 3: -2

for (const [i, num] of range(4, -4, -2).enumerate(1))
  console.log(`index ${i}: ${num}`)
// index 1: 4
// index 2: 2
// index 3: 0
// index 4: -2
```
## r.reverse()
```js

```
## r.sum()
Returns sum of all numbers in the range.
```js
range(100).sum() // 4950
```

## r.forEach()
```js

```
## r.join([separator])
* `separator` `{String}`

Returns a string of range elements joined together using given `separator` (default: `","`).
```js
range(5, 25, 5).join() // 5,10,15,20
range(5, 25, 5).join(" < ") // 5 < 10 < 15 < 20
```
## r.find()
```js

```
## r.filter()
```js

```
## r.reduce(cb[, initial])
* `cb` `{Function}` callback function taking two arguments: aggregator and next value from the range. 
* `initial` `{Number}` initial value of the aggregator.

If `initial` is not specified, first callback invoacation will receive two first elements of the range as arguments. If range has no elements, the function will return `0`, if only one element, the element will be returned.
```js
range(1, 11).reduce((a, b) => a * b) // = 10! = 3,628,800
```
## r.map(cb[,...args])
* `cb` `{Function}` callback function taking three parameters: `rangeElement {Number}`, `index {Number}`, `currentRange {Range}`. If any additional arguments were passed to the function, they will be passed to the callback as well.
* `...args` `{any}` any optional arguments that will be passed to each invocation of the callback.

Returns an array with mapped values returned from the callback function.
```js
range(10).map((n, i, r, tmp) => {
  if (i > 0)
    [tmp.a, tmp.b] = [tmp.b, tmp.a + tmp.b];
  return tmp.a;
}, {
  a: 0,
  b: 1
})
// [ 0, 1,  1,  2,  3, 5, 8, 13, 21, 34 ]

range(1, 10, 2).map(n => n ** 2) // [ 1, 9, 25, 49, 81 ]
```
## r.pop()
```js

```
## r.shift()
```js

```
## r.some()
```js

```
## r.every()
```js

```
## r.count()
```js

```
## r.generator(cb[,...args])
* `cb` `{Function}` callback function taking three parameters: `rangeElement {Number}`, `index {Number}`, `currentRange {Range}`. If any additional arguments were passed to the generator function, they will be passed to the callback as well.
* `...args` `{any}` any optional arguments that will be passed to each invocation of the callback.

Returns a generator function which will yield return values of the passed callback.
```js
const customGenerator = range(10).generator((n, i, r, tmp) => {
  if (i > 0)
    [tmp.a, tmp.b] = [tmp.b, tmp.a + tmp.b];
  return `${i} number in Fibonacci sequence is ${tmp.a}`;
}, {
  a: 0,
  b: 1
})
for (const val of customGenerator)
  console.log(val)

// 0 number in Fibonacci sequence is 0
// 1 number in Fibonacci sequence is 1
// 2 number in Fibonacci sequence is 1
// 3 number in Fibonacci sequence is 2
// 4 number in Fibonacci sequence is 3
// 5 number in Fibonacci sequence is 5
// 6 number in Fibonacci sequence is 8
// 7 number in Fibonacci sequence is 13
// 8 number in Fibonacci sequence is 21
// 9 number in Fibonacci sequence is 34
```
## r.stream([options])
* `options` `{Object}` options for a readable stream

Returns a readable stream that reads one number from the range at a time as string. If `objectMode` is set to true, stream will generate objects with `value` property.
```js
range(10).stream().pipe(process.stdout) // 0123456789

const { Writable, pipeline } = require('stream')

pipeline(
  range(10, 20, 4).stream({
    objectMode: true
  }),
  new Writable({
    objectMode: true,
    write(chunk, enc, done) {
      console.log(chunk)
      done()
    }
  }),
  err => {
    if (err)
      return console.error(err);
  }
)
// { value: 10 }
// { value: 14 }
// { value: 18 }
```
## r.slice()
TO BE IMPLEMENTED
```js

```