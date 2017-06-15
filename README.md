# route-mapper

A simple route mapper.

## Why I need a route mapper?

多终端开发时，需要定义一套伪协议，目的是跳转到不同的页面。此处略去一万字。

## Usage

## Install

```js
npm install --save simple-route-mapper
```

### Import

```js
const mapper = require('simple-route-mapper');
```

### Define Schema Mapper

```js
mapper.define({
    'a/{id}/b':         'c/{id}/e',
    'a/{id}/b/{age}/c': 'c/{id}/e/{age}/f'
});
```

### Get Converted URL

```js
mapper.get('a/123-abc/b');       // => c/123-abc/e
mapper.get('a/123-abc/b/30/c');  // => c/123-abc/e/30/f
mapper.get('some-unkown-url');   // => null
```

### 支持映射为函数

比如：

```js
function foo(uuid, state, cid) {
  if (state == 0) {
    return 'output:' + uuid + ':' + state + ':' + cid;
  } else {
    return 'output:' + uuid + ':' + state + ':' + cid + '!STATE!=0!';
  }
}

mapper.define({
  "func://go/project/{uuid}?state={state}&category_id={cid}": foo
});

let raw = 'func://go/project/123-abc?state=0&category_id=3456';
console.log(simpleRouteMapper.get(raw));
// => output:123-abc:0:3456

raw = 'func://go/project/123-abc?state=1&category_id=3456';
console.log(simpleRouteMapper.get(raw));
// => output:123-abc:1:3456!STATE!=0!
```

## Warning

* 支持动态参数，使用 `{}` 标示。
* 可以传递多个参数。
* 目前只支持源地址到目标地址的映射，不支持反向映射。