import test from 'ava';
import React from 'react';
import Rx from 'rxjs';
import { mount } from 'enzyme';
import connectWithState from '../src/components/connectWithState';
import Provider from '../src/components/Provider';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const MyComponent = (props) => <div className="myDiv">{ JSON.stringify(props) }</div>;


test('connects with state', t => {
  const state$ = new Rx.ReplaySubject(1);

  // initial state
  state$.next({});
  const WrappedComponent = connectWithState()(MyComponent);
  const renderedComponent = mount(<Provider state$={ state$ }><WrappedComponent /></Provider>);

  let text = JSON.parse(renderedComponent.find('.myDiv').text());
  t.deepEqual(text, {});

  // value
  const nextState = { value: 'myValue' };
  state$.next(nextState);
  text = JSON.parse(renderedComponent.find('.myDiv').text());
  t.deepEqual(text, nextState);
});


test('connects with state with selector', t => {
  const state$ = new Rx.ReplaySubject(1);

  // initial state
  state$.next({});
  const selector = (state) => ({
    wantProp: state.fromProp ? state.fromProp * 2 : 0,
  });
  const WrappedComponent = connectWithState(selector)(MyComponent);
  const renderedComponent = mount(<Provider state$={ state$ }><WrappedComponent /></Provider>);

  // empty
  let text = JSON.parse(renderedComponent.find('.myDiv').text());
  t.deepEqual(text, { wantProp: 0 }, 'empty');

  // not wanted state prop
  let nextState = { value: 'myValue' };
  state$.next(nextState);
  text = JSON.parse(renderedComponent.find('.myDiv').text());
  t.deepEqual(text, { wantProp: 0 }, 'not wanted state prop');

  // wanted state prop (transformed)
  nextState = { fromProp: 5 };
  state$.next(nextState);
  text = JSON.parse(renderedComponent.find('.myDiv').text());
  t.deepEqual(text, { wantProp: 10 }, 'wanted and transformed');
});
