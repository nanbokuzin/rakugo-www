function Node(element) {
  this.element = element;
  this.next = null;
}

function List() {
  this.head = new Node('head');
  this.head.next = this.head;
  this.tail = tail;
  this.search = search;
  this.insert = insert;
  this.append = append;
  this.remove = remove;
  this.prev = prev;
  this.skip = skip;
  this.display = display;

  function tail() {
    var x = this.head;
    while (!(x.next.element === 'head')) {
      x = x.next;
    }
    return x;
  }

  function search(item) {
    var x = this.head;
    while (x.element !== item) {
      if (x.next.element === 'head') {
        x = null;
        break;
      }
      x = x.next;
    }
    return x;
  }

  function insert(element, item) {
    var newNode = new Node(element);
    var x = this.search(item);
    newNode.next = x.next;
    x.next = newNode;
  }

  function append(element) {
    var newNode = new Node(element);
    var x = this.tail();
    newNode.next = this.head;
    x.next = newNode;
  }

  function remove(item) {
    var prevNode = this.prev(item);
    var x = this.find(item);
    if (!(prevNode.next.element === 'head')) {
      prevNode.next = x.next;
      x.next = null;
    }
  }

  function prev(item) {
    var x = this.head;
    // when the node is linked from header
    if (x.next.element === item) {
      return this.tail();
    }
    while (!(x.next.element === 'head') &&
           !(x.next.element === item)) {
      x = x.next;
    }
    return x;
  }

  function skip(n) {
    var x = this.head;
    for (var i = 0; i < n + 1; ++i) {
      x = x.next;
      // circularly linked lists
      if (x.next.element === 'head') {
        x = x.next;
      }
    }
    return x;
  }

  this.each = function each(cb) {
    for (var x = this.head; x.next.element !== 'head'; x = x.next) {
      cb(x);
    }
  };

  function display() {
    for (var x = this.head; !(x.next.element === 'head'); x = x.next) {
      console.log(x.next.element);
    }
  };
}

// var test = new List();
// var item = 'head';
// ['aaaa', 'bbbb', 'cccc'].forEach(function(element) {
//   test.insert(element, item);
//   item = element;
// });
// console.log(test.search('bbbb').element === 'bbbb');
// console.log(test.search('dddd') === null);
// console.log('');
// console.log(test.prev('head').element === 'cccc');
// console.log(test.prev('aaaa').element === 'cccc');
// console.log('');
// console.log(test.skip(1).element === 'bbbb');
// console.log(test.skip(3).element === 'aaaa');
// console.log(test.skip(0).element === 'aaaa');
// var arr = ['aaaa', 'bbbb', 'cccc'];
// test.each(function(x) {
//   console.log(x.next.element === arr.shift());
// });
