import { createCookieMiddeware, cookieGet, cookieSet } from '../';
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

function create (...mw) {
  return applyMiddleware(...mw)(createStore)(() => {}, {})
}

describe('createCookieMiddeware', () => {

  it('should call cookie set method when cookieSet is called', () => {
    const store = create(createCookieMiddeware(__cookie));
    const setSpy = spy(__cookie, 'set');

    store.dispatch(cookieSet(name, value));

    expect(setSpy.calledWith(name, value)).to.be.true;
  });

  it('should call cookie get method when cookieGet is called', () => {
    const store = create(createCookieMiddeware(__cookie));
    const getSpy = spy(__cookie, 'get');

    store.dispatch(cookieGet(name));

    expect(getSpy.calledWith(name)).to.be.true;
  })
});
