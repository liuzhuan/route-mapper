var mapper = require('./index.js');

mapper.define({
    'a/{id}/b': 'c/{id}/e',
    'a/{id}/b/{age}/c': 'c/{id}/e/{age}/f'
});

var result = mapper.get('a/123-abc/b');
console.log(result);

result = mapper.get('a/123-abc/b/30/c');
console.log(result);

result = mapper.get('custom-policy');
console.log(result);