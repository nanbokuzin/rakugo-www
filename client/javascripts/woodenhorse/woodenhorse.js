(function($, window, undefined) {
  window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame;
  })();

  $.fn.woodenhorse = function(options) {
    var target = $(this).get(0);
    var inset = new List();
    var quads = new List();
    for (var section = target.lastElementChild;
         section !== undefined && section !== null;
         section = section.previousElementSibling) {
      var urlstring = section.dataset.uri;
      if (urlstring === undefined || urlstring === null) {
        continue;
      }
      inset.insert(urlstring, 'head');
      quads.insert(section, 'head');
    }
    quads.each(function(x) {
      var node = x.next.element;
      getJSON(makeRequestURL(node.dataset.uri), function(data) {
        if (!data.length) {
          return;
        }
        drawDiag(node, data);
      });
    });

    var steed = makeSteed(inset, inset.head.next.element);
    drawQuad(target, steed);

    var count = 0;
    var limit = 4.096 * 60;
    loop();
    
    function loop() {
      if (count < limit) {
        window.requestAnimationFrame(loop);
        count++;
        return;
      }
      count = 0;
      window.requestAnimationFrame(loop);
      steed = makeSteed(steed, steed.head.next.next.element);
      drawQuad(target, steed)
    }
  };

  function drawDiag(quad, data) {
    var parentNode = quad.querySelector('.network');
    if (parentNode === null || parentNode.hasChildNodes()) {
      return;
    }
    $(parentNode).html(makeQuadIndex(data));
  }

  function drawNav(target) {
  }

  function drawQuad(target, steed) {
    for (var section = target.firstElementChild;
         section !== undefined && section !== null;
         section = section.nextElementSibling) {
      section.removeAttribute('class');
    }
  
    var pos = ['3rd', '2nd', '1st', '5th', '4th'];
    steed.each(function(item) {
      for (var section = target.firstElementChild;
           section !== undefined && section !== null;
           section = section.nextElementSibling) {
        if (item.next.element === section.dataset.uri) {
          section.className = 'steed steed-' + pos.shift();
          break;
        }
      }
    });
  }

  function drawSectionPaper(target) {
  }

  function dyeQuad(target) {
  }

  function play() {
  }

  function stop() {
  }

  function classNameByLength(num) {
    switch (Number(num)) {
    case 1:
      return 'die-face' + 1;
      break;
    case 2:
      return 'die-face' + 2;
      break;
    case 3:
      return 'die-face' + 3;
      break;
    case 4:
      return 'die-face' + 4;
      break;
    case 5:
    case 6:
      return 'die-face' + 6;
      break;
    case 7:
    case 8:
      return 'die-face' + 8;
      break;
    default:
      return 'die-face' + 9;
    }
  }

  function getJSON(urlstring, cb) {
    $.getJSON(urlstring).done(function(data) {
      cb(data);
    });
  }

  function makeQuadIndex(data) {
    var list = [];
    data.forEach(function(item) {
      var row = item.performers;
      if (!row.length) {
        list.push(makeTile('仲入'));
      } else {
        row.forEach(function(name) {
          name = trimSpacing(name);
          list.push(makeTile(name));
        });
      }
    });
    
    var parentNode = document.createElement('DIV');
    var childNodes = document.createElement('UL');
    for (var i = 0; i < list.length; ++i) {
      childNodes.appendChild(list[i]);
      if (!(i === 0 || (i + 1) % 4)) {
        list[i].className = 'last beacon';
        parentNode.appendChild(childNodes);
        childNodes = document.createElement('UL');
      }
    }
    return parentNode.childNodes;
  }

  function makeRequestURL(urlstring) {
    var elem = document.createElement('A');
    elem.href = urlstring;
    return '/api' + elem.pathname;
  }

  // var test = new List();
  // var item = 'head';
  // [0,1,2,3,4,5].forEach(function(element) {
  //   test.insert(element, item);
  //   item = element;
  // });
  // var list = makeSteed(test, 2);
  // list.display();
  function makeSteed(itemList, item) {
    var steed = new List();
    var queue = [
      new Queue(),
      new Queue()
    ];
    var isFound = 0;
    itemList.each(function(x) {
      if (!isFound && x.next.element === item) {
        ++isFound;
      }
      queue[isFound].enqueue(x.next.element);
    });
    for (var i = 0; i < queue[0].count(); ++i) {
      queue[1].enqueue(queue[0].dataStore[i]);
    }
    for (var i = 0; i < queue[1].count(); ++i) {
      steed.insert(queue[1].dataStore[queue[1].count() - (i + 1)], 'head');
    }
    return steed;
  }

  function makeTile(heading) {
    var elem1, elem2, elem3;
    elem1 = document.createElement('LI');
    elem2 = document.createElement('DIV');
    elem3 = document.createElement('H2');
    elem1.className = 'beacon';
    elem2.className = 'tile';
    elem3.className = classNameByLength(heading.length);

    elem1.appendChild(elem2);
    elem2.appendChild(elem3);
    elem3.appendChild(document.createTextNode(heading));
    return elem1;
  }

  function trimSpacing(string) {
    var regex = /[\s　]/g;
    return string.replace(regex, '');
  }
})(jQuery, window);
