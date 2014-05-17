var shallowMatch = function(obj1, obj2) {
  var result = true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  Object.keys(obj1).forEach(function(key1) {
    if (obj1[key1]+"" !== obj2[key1]+"") {
      result = false;
      return;
    }
  });
  return result;
};


module.exports = function treeMerge(a, b) {
  var ymax = a.length > b.length ? a.length : b.length;
  var xmax = 0;
  for (var y=0; y<ymax; y++) {
    a[y] = a[y] || [];
    b[y] = b[y] || [];
    var xtemp = a[y].length > b[y].length ? a[y].length : b[y].length;
    xmax = xtemp > xmax ? xtemp : xmax;
  }

  var c = [];
  for (var y=0; y<ymax; y++) {
    for (var x=0; x<xmax; x++) {
      c[y] = c[y] || [];
      if (a[y][x] && b[y][x] && shallowMatch(a[y][x], b[y][x])) {
        c[y][x] ? c[y].push(a[y][x]) : c[y][x] = a[y][x];
      }else {
        if (a[y][x]) c[y].push(a[y][x]);
        if (b[y][x]) c[y].push(b[y][x]);
      }
        console.log(x, y);
        console.log(c);
    }
  }
  return c;
};

