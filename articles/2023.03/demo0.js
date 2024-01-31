function gen() {
  var myIterable = {
    [Symbol.iterator]() {
      let count = 0;
      return {
        next() {
          count++;
          if (count <= 5) {
            return { value: count, done: false };
          } else {
            return { done: true };
          }
        },
      };
    },
  };

  return myIterable;
}

console.log([...gen()]);
console.log(new Set(gen()));
console.log(Array.from(gen()));
console.log(Promise.all(gen()));
