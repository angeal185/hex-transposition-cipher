# hex-transposition-cipher
hexadecimal transposition cipher for shuffle and reverse shuffling hex encoded cipher text for nodejs and the browser.

Adds an extra layer of protection to your already encrypted code's hex output by essentially turning it into nothing but valid hex.

demo: https://angeal185.github.io/hex-transposition-cipher/
### Installation

npm

```sh
$ npm install hex-transposition-cipher
```

#### nodejs

```sh
$ const htc = require('hex-transposition-cipher');
```


#### browser

```html
<script src="./path-to/lodash.min.js"></script>
<script src="./dist/htc.min.js"></script>
```

### info


```js
// defaults
{
  decode: false, // set true for decrypt
  reverse: false, // reverse encrypted/decrypted hex string
}


// htc.keyGenSync()
const key = htc.keyGen(); //generates random hex key from the default key
console.log(key) // returns hex key ~ dont lose this


/**
 * htc.keyGen(callback)
 * @param {function} callback
 */

htc.keyGen(function(i){
    console.log(i) // returns hex key ~ dont lose this
});


/**
 * htc.subSync(hex, key, config)
 * @param {string} hex ~ hex string
 * @param {object} key ~ hex key
 * @param {object} config ~ optional options
 */

let res = htc.subSync('74657374', key, {decode:false, reverse: false});
console.log(res); // returns encrypted hex string

res = htc.subSync('74657374', key, {decode:true, reverse: false});
console.log(res); // returns decrypted hex string

res = htc.subSync('74657374', key, {decode:false, reverse: true});
console.log(res); // returns encrypted hex string and reverses the output of the string

res = htc.subSync('74657374', key, {decode:true, reverse: true});
console.log(res); // returns decrypted hex string that has been reversed

/**
 * htc.sub(hex, key, config, callback)
 * @param {string} hex ~ hex string
 * @param {object} key ~ hex key
 * @param {object} config ~ optional options
 * @param {function} callback
 */

htc.sub(res, key, {decode:true, reverse: false}, function(i){
    console.log(i); // returns decrypted hex string
})

...

```
