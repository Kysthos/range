## range function
Work in progress.

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
## r.toString()
```js
range(10).toString() // {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
```
## r.get(index)
Returns a number in the range at the given index. Undefined if out of range. Accepts 
```js
range(10, 100, 2).get(-1) // 98
range(10, 100, 2).get(3) // 16
```
## r.indexOf()
```js

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
## r.join()
```js

```
## r.find()
```js

```
## r.filter()
```js

```
## r.reduce()
```js

```
## r.map()
```js

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
## r.generator(cb, [...args])
* `cb` `{function}` callback function taking three parameters: `rangeElement {Number}`, `index {Number}`, `currentRange {Range}`. If any additional arguments were passed to the generator function, there will be passed to the callback as well.
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

Returns a readable stream that reads one number from the range at a time as string.
```js
range(10).stream().pipe(process.stdout) // 0123456789
```
## r.slice()
TO BE IMPLEMENTED
```js

```