var simpleRouteMapper = require("./index.js");
simpleRouteMapper.define({
  "foo://bar.policy/project/{uuid}?type={type}&state={state}": "https://www.foobar.com/project/index.html?uuid={uuid}&type={type}&state={state}"
});

var raw = "foo://bar.policy/project/123-456-abc?type=love&state=my-state";
var result = simpleRouteMapper.get(raw);
console.log(result);