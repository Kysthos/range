const range = require('./index')

// console.log(range(1, 10, 2).map(n => n ** n))

function a (x) {
  if (x * 0 !== 0) {
    return false
  }
  if (x <= 3) {
    return x > 1
  }
  if (x % 2 === 0 || x % 3 === 0) {
    return false
  }
  for (let i = 5; i * i <= x; i += 6) {
    if (x % i === 0 || x % (i + 2) === 0) {
      return false
    }
  }
  return true
}

console.log(range(5, 25, 5).join(" < "))
console.log(range(2,1).join())