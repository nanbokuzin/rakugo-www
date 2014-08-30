function Queue() {
  this.dataStore = [];
  this.enqueue = enqueue;
  this.dequeue = dequeue;
  this.clear = clear;
  this.count = count;
  this.toString = toString;

  function enqueue(element) {
    this.dataStore.push(element);
    this.dataStore.splice(3, this.dataStore.length - 5);
  }

  function dequeue() {
    return this.dataStore.shift();
  }

  function clear() {
    this.dataStore.length = 0;
  }

  function count() {
    return this.dataStore.length;
  }

  function toString() {
    var mozi = '';
    for (var i = 0; i < this.dataStore.length; ++i) {
      mozi += this.dataStore[i] + "\n";
    }
    return mozi;
  }
}

// var test = new Queue();
// ['a', 'b', 'c', 'd', 'e', 'f', 'z'].forEach(function(element) {
//   test.enqueue(element);
// });
// console.log(test.dataStore[2] === 'c');
// console.log(test.dataStore[4] === 'z');
// console.log(test.count() === 5);
