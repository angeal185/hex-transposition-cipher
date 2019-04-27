

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



/****************
*** DEMO ONLY ***
****************/

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function str2hex(str) {
	let hex = '';
	for(var i=0;i<str.length;i++) {
		hex += '' + str.charCodeAt(i).toString(16);
	}
	return hex;
}

function hex2str(hex) {
  let str = '';
  for (var i = 0; i < hex.length; i += 2) {
    let v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}

// test body
(function(){
  let inputTpl = _.template('<div class="form-group"><label>{{title}}</label><input id="{{ID}}" type="text" class="form-control"></div>')

  let div = $('<div />'),
  bodyObj = {
    inStr: 'base string',
    inHex: 'encrypted hex',
    outHex: 'decrypted hex',
    inHexRev: 'encrypted hex reversed',
    outHexRev: 'decrypted hex reversed',
    outStr: 'decrypted string'
  }

  $('body').append(
    div.clone().addClass('container').append(
      div.clone().addClass('row').append(
        div.clone().addClass('col-sm-6 inp').append(
          $('<h5 />').text('hex transform test')
        ),
        div.clone().addClass('col-sm-6').append(
          $('<pre />').append(
            $('<code />', {
              id: 'key'
            })
          ),
          $('<button />', {
            type: 'button',
            id: 'reload',
            class: 'btn btn-outline-dark',
            text: 'reload'
          })
        )
      )
    )
  )

  _.forIn(bodyObj, function(i,e){
    $('.inp').append(inputTpl({title:i,ID:e}))
  })

})()

$(document).ready(function() {
    // test keygen
    function test(){
      let obj = keyGenSync();
      $('#key').text(JSON.stringify(obj, 0, 2));

      // test shuffle hex
      $('#inStr').off().on('keyup', function(){
        let string = str2hex($(this).val());
        $('#inHex').val(subSync(string, obj, {reverse: false}));
        $('#outHex').val(subSync(subSync(string, obj, {reverse: false}), obj, {decode:true, reverse: false}));
        $('#outStr').val(hex2str(subSync(subSync(string, obj, {reverse: false}), obj, {decode:true, reverse: false})));

        sub(string, obj, {reverse: true}, function(i){
          sub(i, obj, {reverse: true, decode: true}, function(i){
            $('#outHexRev').val(i)
          })
          $('#inHexRev').val(i)
        })
      }).val('test').keyup()
    }

    $('#reload').on('click', function(){
      test();
    })
    test();
});
