const _ = require('lodash');

function validHex(str){
  let regExp = /^[A-Fa-f0-9]*$/;
  return (typeof str === 'string' && regExp.test(str));
}

exports.sub = function(text, obj, config, cb) {
  try {
    if(!validHex(text)){
      return 'invalid hex string'
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

exports.subSync = function(text, obj, config) {
  try {
    if(!validHex(text)){
      return 'invalid hex string';
    }
    if(!config || !_.isObject(config)){
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

exports.keyGen = function(obj){
  try {
    if(!obj || !_.isObject(obj)){
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
    if(err){return console.log(err)}
  }
}
