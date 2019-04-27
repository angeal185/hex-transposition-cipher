
const subKey = {
  '0':'8','1':'3','2':'2','3':'c',
  '4':'a','5':'6','6':'4','7':'5',
  '8':'e','9':'f','f':'d','e':'b',
  'd':'0','c':'7','b':'1','a':'9'
};

function validHex(str){
  let regExp = /^[A-Fa-f0-9]*$/;
  return (typeof str === 'string' && regExp.test(str));
}

function sub(text, obj, config, cb) {
  try {
    if(!validHex(text)){
      return 'invalid hex string';
    }
    if(!cb && _.isFunction(config)){
      cb = config;
      config = {
        decode: false,
        reverse: false
      }
    }
    if(config.decode) {
      obj = _.invert(obj);
    }

    if(config.reverse && config.decode){
      text = text.split('').reverse().join('');
    }

    text = text.split('').filter(function(v) {
      return obj.hasOwnProperty(v.toLowerCase());
    }).map(function(v) {
      return obj[v.toLowerCase()].toUpperCase();
    }).join('');

    if(config.reverse && !config.decode){
      text = text.split('').reverse().join('');
    }
    cb(text);
  } catch (err) {
    if(err){return console.log(err)}
  }
};

function subSync(text, obj, config) {
  try {
    if(!validHex(text)){
      return 'invalid hex string'
    }
    if(!config){
      config.decode = false;
      config.reverse = false;
    }
    if(config.decode) {
      obj = _.invert(obj);
    } else {
      config.decode = false;
    }
    if(config.reverse && config.decode){
      text = text.split('').reverse().join('');
    }

    text = text.split('').filter(function(v) {
      return obj.hasOwnProperty(v.toLowerCase());
    }).map(function(v) {
      return obj[v.toLowerCase()].toUpperCase();
    }).join('');

    if(config.reverse && !config.decode){
      text = text.split('').reverse().join('');
    }
    return text;
  } catch (err) {
    if(err){return console.log(err)}
  }
};

function keyGenSync(){
  try {
    const x = _.shuffle(_.values(subKey));
    let v = 0,
    cc = {};
    _.forIn(subKey, function(i,e) {
      cc[i] = x[v];
      v++;
    })
    return cc;
  } catch (err) {
    if(err){return console.log(err)}
  }
}

function keyGen(cb){
  try {
    const x = _.shuffle(_.values(subKey));
    let v = 0,
    cc = {};
    _.forIn(subKey, function(i,e) {
      cc[i] = x[v];
      v++;
    })
    cb(cc);
  } catch (err) {
    if(err){return console.log(err)}
  }
}
