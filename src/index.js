let REDUX_COOKIES_GET = 'REDUX_COOKIES_GET';
let REDUX_COOKIES_SET = 'REDUX_COOKIES_SET';
let REDUX_COOKIES_EXPIRE = 'REDUX_COOKIES_EXPIRE';
let REDUX_COOKIES_REMOVE = 'REDUX_COOKIES_REMOVE';

export const getName = (prefix, itemName) => prefix + itemName;

export const cookieGet = name => {
  return { type: REDUX_COOKIES_GET, name };
};

export const cookieSet = (name, value, options = {}) => {
  return { type: REDUX_COOKIES_SET, name, value, options };
};

export const cookieExpire = name => {
  return { type: REDUX_COOKIES_EXPIRE, name };
};

export const cookieRemove = (name, options) => {
  return { type: REDUX_COOKIES_REMOVE, name, options };
};

export const createCookieMiddeware = (cookies, prefix = '') => {
  const actionsMap = {};

  REDUX_COOKIES_GET = getName(prefix, REDUX_COOKIES_GET);
  REDUX_COOKIES_SET = getName(prefix, REDUX_COOKIES_SET);
  REDUX_COOKIES_EXPIRE = getName(prefix, REDUX_COOKIES_EXPIRE);
  REDUX_COOKIES_REMOVE = getName(prefix, REDUX_COOKIES_REMOVE);

  actionsMap[REDUX_COOKIES_GET] = action => {
    try {
      return cookies.get(action.name);
    } catch (e) {
      return undefined;
    }
  };

  actionsMap[REDUX_COOKIES_SET] = action => {
    return cookies.set(action.name, action.value, action.options);
  };

  actionsMap[REDUX_COOKIES_EXPIRE] = action => {
    return cookies.set(action.name, undefined);
  };

  actionsMap[REDUX_COOKIES_REMOVE] = action => {
    // if cookies lib has remove support
    if (cookies.remove) {
      return cookies.remove(action.name, action.options);
    }
    return cookies.set(action.name, undefined);
  };

  if (process && process.env && process.env.NODE_ENV !== 'production') {
    if (!('get' in cookies) || !('set' in cookies)) {
      throw new Error('Your cookie object must implement get and set function,  {get : function(name){/*...*/}, set : function(name, value, options){/*...*/}}');
    }
  }

  return () => next => action => {
    let currentActionHandler = actionsMap[action.type];

    if (currentActionHandler) {
      return currentActionHandler(action);
    }

    return next(action);
  };
};

export default createCookieMiddeware;
