var simpleRouteMapper = require("./index.js");
simpleRouteMapper.define({
  "foo://bar.policy/project/{uuid}?type={type}&state={state}": "https://www.foobar.com/project/index.html?uuid={uuid}&type={type}&state={state}",
  "func://go/project/{uuid}?state={state}&category_id={cid}": foo
});

function foo(uuid, state, cid) {
  if (state == 0) {
    return 'output: ' + uuid + ':' + state + ':' + cid;
  } else {
    return 'output: ' + uuid + ':' + state + ':' + cid + '!STATE!=0!';
  }
}

var raw = "foo://bar.policy/project/123-456-abc?type=love&state=my-state";
var result = simpleRouteMapper.get(raw);
console.log(result);

raw = 'func://go/project/123-abc?state=0&category_id=3456';
console.log(simpleRouteMapper.get(raw));

raw = 'func://go/project/123-abc?state=1&category_id=3456';
console.log(simpleRouteMapper.get(raw));