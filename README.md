# redux-cookie
Redux cookie middleware for both client and server ( universal )

## Build Status
[![linux build](https://travis-ci.org/iroy2000/redux-cookie.svg?branch=master)](https://travis-ci.org/iroy2000/redux-cookie)

## Note
Since `version 0.5.6`, this library has changed the action signature 
**from** `cookieSet, cookieGet and cookieExpire` 
**to** `setCookie, getCookie and expireCookie`

But all the functionality is the same as before. 

## Prerequiste
Assuming you are using a cookie library, like `js-cookie` or your own cookie library implementation.
Make sure it has `get` and `set` in your cookie library implementation.

## Server Side
```javascript
import {createStore, applyMiddleware} from 'redux';
import Cookies from 'cookies';
import { createCookieMiddleware } from 'redux-cookie';
import {createServer} from 'http';
import reducer from './reducer';

createServer(function(req, res) {
    const cookies = new Cookies(req, res);
    const store = createStore(
      reducer,
      applyMiddleware(createCookieMiddleware(cookies))
    );
    //...
}).listen(3000);
```

## Client Side
```javascript
import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(createCookieMiddleware(Cookies))
);
```

## Usage
`redux-cookie` exposes `cookieGet`, `cookieSet` and `cookieExpire`

`cookieGet` takes a "cookie name"
`cookieExpire` takes a "cookie name"
`cookieSet` takes a "cookie name", "cookie value" and an optional "options"  // options like "expires" or options support by your cookie library

```javascript
import { getCookie, setCookie, expireCookie } from 'redux-cookie';

// !! important >> Remember those are actions, the following just show you what it does
// Please look at the test file to see examples on how to dispatch the action

setCookie('cool', 'very cool', { expires: 365 }) // please check your cookie library for what is supported

getCookie('cool')

expireCookie('cool')  // expire cookie now

```

**Note:** `redux-cookie` also expose an action `removeCookie` if your library has `remove` implementation, 
if not, it will fall back to `expireCookie`.

`removeCookie` takes a "cookie name" and an optional "options"

```javascript
import { setCookie, removeCookie } from 'redux-cookie';

// !! important >> Remember those are actions, the following just show you what it does
// If you have question about the usage, please take a look at the test file

// Delete a cookie valid to the path of the current page
setCookie('cool', 'very cool', { path: '' })   // if you option has path

// it won't work - fail
removeCookie('cool')  // it won't work :(

// it will work - removed
removeCookie('cool', { path: '' }) 

```

## Configuration

If you want to prefix your action name

```javascript
import Cookies from 'cookies-js';
import { createCookieMiddleware } from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(createCookieMiddleware(Cookies, '/redux/cookie/'))
);
```
