# redux-cookie
Redux cookie middleware for both client and server ( universal )

## Prerequiste
Assuming you are using a cookie library, like `js-cookie` or your own cookie library implementation.
Make sure it has `get` and `set` in your cookie library implementation.

## Server Side
```javascript
import {createStore, applyMiddleware} from 'redux';
import Cookies from 'cookies';
import redux-cookie from 'redux-cookie';
import {createServer} from 'http';
import reducer from './reducer';

createServer(function(req, res) {
    const cookies = new Cookies(req, res);
    const store = createStore(
      reducer,
      applyMiddleware(redux-cookie(cookies))
    );
    //...
}).listen(3000);
```

## Client Side
```javascript
import Cookies from 'cookies-js';
import redux-cookie from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(redux-cookie(Cookies))
);
```

## Usage
`redux-cookie` exposes `cookieGet`, `cookieSet` and `cookieExpire`

`cookieGet` takes a "cookie name"
`cookieExpire` takes a "cookie name"
`cookieSet` takes a "cookie name", "cookie value" and an optional "options"  // options like "expires" or options support by your cookie library

```javascript
import { cookieGet, cookieSet, cookieExpire } from 'redux-cookie';

cookieSet('cool', 'very cool', { expires: 365 }) // please check your cookie library for what is supported

cookieGet('cool')

cookieExpire('cool')  // expire cookie now

```

**Note:** `redux-cookie` also expose an action `cookieRemove` if your library has `remove` implementation, 
if not, it will fall back to `cookieExpire`.

`cookieRemove` takes a "cookie name" and an optional "options"

```javascript
import { cookieSet, cookieRemove } from 'redux-cookie';

// Delete a cookie valid to the path of the current page

cookieSet('cool', 'very cool', { path: '' })   // if you option has path

cookieRemove('cool')  // it won't work :(

cookieRemove('cool, { path: '' }) // it will work :)

```

## Configuration

If you want to prefix your action name

```javascript
import Cookies from 'cookies-js';
import redux-cookie from 'redux-cookie';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(redux-cookie(Cookies, '/redux/cookie/'))
);
```