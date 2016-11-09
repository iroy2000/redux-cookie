import { createCookieMiddleware, getCookie, setCookie, expireCookie } from '../';
import { createStore, applyMiddleware } from 'redux'
import { spy } from 'sinon';
import { expect } from 'chai';

const __cookie = {
  get(name) {
  },
  set(name, value) {
  },
};

const name = 'test-name';
const value = 'test-awesome-value';

let store = null;

function create (...mw) {
  return applyMiddleware(...mw)(createStore)(() => {}, {})
}

describe('createCookieMiddleware', () => {
  beforeEach(() => {
    store = create(createCookieMiddleware(__cookie));
  });

  afterEach(() => {
    store = null;
  });

  it('should call cookie set method when action setCookie is called', () => {
    const setSpy = spy(__cookie, 'set');

    store.dispatch(setCookie(name, value));

    expect(setSpy.calledWith(name, value)).to.be.true;

    setSpy.restore();
  });

  it('should call cookie get method when action getCookie is called', () => {
    const getSpy = spy(__cookie, 'get');

    store.dispatch(getCookie(name));

    expect(getSpy.calledWith(name)).to.be.true;

    getSpy.restore();
  })

  it('should call cookie set method when action expireCookie is called', () => {
    const setSpy = spy(__cookie, 'set');

    store.dispatch(expireCookie(name));

    expect(setSpy.calledWith(name)).to.be.true;

    setSpy.restore();
  })
});
