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


/****************
*** DEMO ONLY ***
****************/

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
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

let inputTpl = _.template('<div class="form-group"><label>{{title}}</label><input id="{{ID}}" type="text" class="form-control"></div>')

let div = $('<div />'),
bodyObj = {
  inStr: 'base string',
  inHex: 'encrypted hex',
  outHex: 'decrypted hex',
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
        )
      )
    )
  )
)

_.forIn(bodyObj, function(i,e){
  $('.inp').append(inputTpl({title:i,ID:e}))
})

$(document).ready(function() {
    // test keygen
  let obj = keyGen();
  $('#key').text(JSON.stringify(obj, 0, 2));

  // test shuffle hex
  $('#inStr').on('keyup', function(){
    let string = str2hex($(this).val());
    $('#inHex').val(substitute(string, obj));
    $('#outHex').val(substitute(substitute(string, obj), obj, true));
    $('#outStr').val(hex2str(substitute(substitute(string, obj), obj, true)));
  })

});
