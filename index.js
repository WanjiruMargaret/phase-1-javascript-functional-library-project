// Helper to standardize collection into array of values
function getValues(collection) {
  return Array.isArray(collection) ? collection : Object.values(collection);
}

function myEach(collection, callback) {
  const values = getValues(collection);
  for (let i = 0; i < values.length; i++) {
    callback(values[i]);
  }
  return collection;
}

function myMap(collection, callback) {
  const values = getValues(collection);
  const result = [];
  for (let i = 0; i < values.length; i++) {
    result.push(callback(values[i], i, collection));
  }
  return result;
}

function myReduce(collection, callback, acc) {
  const values = getValues(collection);
  let i = 0;

  if (acc === undefined) {
    acc = values[0];
    i = 1;
  }

  for (; i < values.length; i++) {
    acc = callback(acc, values[i], collection);
  }

  return acc;
}

function myFind(collection, predicate) {
  const values = getValues(collection);
  for (let i = 0; i < values.length; i++) {
    if (predicate(values[i])) return values[i];
  }
  return undefined;
}

function myFilter(collection, predicate) {
  const values = getValues(collection);
  const result = [];
  for (let i = 0; i < values.length; i++) {
    if (predicate(values[i])) result.push(values[i]);
  }
  return result;
}

function mySize(collection) {
  return getValues(collection).length;
}

function myFirst(array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
}

function myLast(array, n) {
  return n === undefined ? array[array.length - 1] : array.slice(-n);
}

function mySortBy(array, callback) {
  return [...array].sort((a, b) => {
    const valA = callback(a);
    const valB = callback(b);
    if (valA > valB) return 1;
    if (valA < valB) return -1;
    return 0;
  });
}

function myFlatten(array, shallow, newArr = []) {
  for (let el of array) {
    if (Array.isArray(el)) {
      if (shallow) {
        newArr.push(...el);
      } else {
        myFlatten(el, false, newArr);
      }
    } else {
      newArr.push(el);
    }
  }
  return newArr;
}

function myKeys(object) {
  const result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) result.push(key);
  }
  return result;
}

function myValues(object) {
  const result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) result.push(object[key]);
  }
  return result;
}

// --- Sample Test Calls ---
console.log("myEach:");
myEach([1, 2, 3], alert); // alerts each number
myEach({ one: 1, two: 2 }, console.log); // logs each value

console.log("myMap:", myMap([1, 2, 3], num => num * 2)); // [2, 4, 6]

console.log("myReduce:", myReduce([1, 2, 3], (acc, val) => acc + val, 0)); // 6

console.log("myFind:", myFind([1, 2, 3, 4], num => num > 2)); // 3

console.log("myFilter:", myFilter([1, 2, 3, 4], num => num % 2 === 0)); // [2, 4]

console.log("mySize:", mySize({ a: 1, b: 2 })); // 2

console.log("myFirst:", myFirst([10, 20, 30])); // 10
console.log("myFirst:", myFirst([10, 20, 30], 2)); // [10, 20]

console.log("myLast:", myLast([10, 20, 30])); // 30
console.log("myLast:", myLast([10, 20, 30], 2)); // [20, 30]

console.log("mySortBy:", mySortBy([3, 1, 2], n => n)); // [1, 2, 3]

console.log("myFlatten:", myFlatten([1, [2, [3]], 4])); // [1, 2, 3, 4]
console.log("myFlatten shallow:", myFlatten([1, [2, [3]], 4], true)); // [1, 2, [3], 4]

console.log("myKeys:", myKeys({ a: 1, b: 2 })); // ['a', 'b']
console.log("myValues:", myValues({ a: 1, b: 2 })); // [1, 2]
