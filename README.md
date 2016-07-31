# redux-cookie
Redux cookie middleware for both client and server ( universal )

## Build Status
[![linux build](https://travis-ci.org/iroy2000/redux-cookie.svg?branch=master)](https://travis-ci.org/iroy2000/redux-cookie)

## Prerequiste
Assuming you are using a cookie library, like `js-cookie` or your own cookie library implementation.
Make sure it has `get` and `set` in your cookie library implementation.

## Server Side
```javascript
import {createStore, applyMiddleware} from 'redux';
import Cookies from 'cookies';
import { createCookieMiddeware } from 'redux-cookie';
import {createServer} from 'http';
import reducer from './reducer';

createServer(function(req, res) {
    const cookies = new Cookies(req, res);
    const store = createStore(
      reducer,
      applyMiddleware(createCookieMiddeware(cookies))
    );
    //...
}).listen(3000);
```

## Client Side
```javascript
import Cookies from 'js-cookie';
import { createCookieMiddeware } from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(createCookieMiddeware(Cookies))
);
```

## Usage
`redux-cookie` exposes `cookieGet`, `cookieSet` and `cookieExpire`

`cookieGet` takes a "cookie name"
`cookieExpire` takes a "cookie name"
`cookieSet` takes a "cookie name", "cookie value" and an optional "options"  // options like "expires" or options support by your cookie library

```javascript
import { cookieGet, cookieSet, cookieExpire } from 'redux-cookie';

// Remember those are actions, the following just show you what it does

cookieSet('cool', 'very cool', { expires: 365 }) // please check your cookie library for what is supported

cookieGet('cool')

cookieExpire('cool')  // expire cookie now

```

**Note:** `redux-cookie` also expose an action `cookieRemove` if your library has `remove` implementation, 
if not, it will fall back to `cookieExpire`.

`cookieRemove` takes a "cookie name" and an optional "options"

```javascript
import { cookieSet, cookieRemove } from 'redux-cookie';

// !! important >> Remember those are actions, the following just show you what it does
// If you have question about the usage, please take a look at the test file

// Delete a cookie valid to the path of the current page
cookieSet('cool', 'very cool', { path: '' })   // if you option has path

// it won't work - fail
cookieRemove('cool')  // it won't work :(

// it will work - removed
cookieRemove('cool', { path: '' }) 

```

## Configuration

If you want to prefix your action name

```javascript
import Cookies from 'cookies-js';
import { createCookieMiddeware } from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(createCookieMiddeware(Cookies, '/redux/cookie/'))
);
```