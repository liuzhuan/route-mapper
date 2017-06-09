var mapper = require('./index.js');

mapper.define({
    'a/{id}/b': 'c/{id}/e',
    'a/{id}/b/{age}/c': 'c/{id}/e/{age}/f',
    'policy://a/{uuid}/b?key={key}': 'https://root/a/b.html?uuid={uuid}&key={key}',
    'policy://a/{uuid}/b?key={key}&key2={key2}': 'https://root/a/b.html?uuid={uuid}&key={key}&key2={key2}'
});

var result = mapper.get('a/123-abc/b');
console.log(result);

result = mapper.get('a/123-abc/b/30/c');
console.log(result);

result = mapper.get('policy://a/1234-abcd/b?key=h3r5');
console.log(result);

result = mapper.get('policy://a/1234-abcd/b?key=h3r5&key2=3456');
console.log(result);

result = mapper.get('custom-policy');
console.log(result);