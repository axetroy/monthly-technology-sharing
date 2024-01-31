var obj = {
  __index__: 0,
  next() {
    return {
      value: ++this.__index__,
      done: this.__index__ > 10,
    };
  },
  [Symbol.iterator]() {
    return this;
  },
};

for (const a of obj) {
  console.log(a);
}
