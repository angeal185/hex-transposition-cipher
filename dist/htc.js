function substitute(text, obj, decode) {
  try {
    if(decode) {
      obj = _.invert(obj);
    }
    return text.split('').filter(function(v) {
      return obj.hasOwnProperty(v.toLowerCase());
    }).map(function(v) {
      return obj[v.toLowerCase()].toUpperCase();
    }).join('');
  } catch (err) {
    if(err){ return console.log(err)}
  }
};

function keyGen(obj){
  try {
    if(!obj){
      obj = {
        '0':'8','1':'3','2':'2','3':'c',
        '4':'a','5':'6','6':'4','7':'5',
        '8':'e','9':'f','f':'d','e':'b',
        'd':'0','c':'7','b':'1','a':'9'
      };
    }
    const x = _.shuffle(_.values(obj));
    let v = 0,
    cc = {};
    _.forIn(obj, function(i,e) {
      cc[i] = x[v];
      v++;
    })
    return cc;
  } catch (err) {
    if(err){ return console.log(err)}
  }
}
