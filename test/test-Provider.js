import test from 'ava';
import React, { PropTypes } from 'react';
import { mount } from 'enzyme';
import Provider from '../src/components/Provider';

import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const MyComponent = (props, context) => <div className="myDiv">{ context.state$.some }</div>;
MyComponent.contextTypes = {
  state$: PropTypes.object,
};

test('provides state$ as a context', t => {
  const state = { some: 'value' };
  const WrappedComponent = <Provider state$={ state }><MyComponent /></Provider>;
  const renderedComponent = mount(WrappedComponent);
  t.is(renderedComponent.text(), state.some);
});
