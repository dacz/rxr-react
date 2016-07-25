# rxr-react

[![Build Status](https://travis-ci.org/dacz/rxr-react.svg?branch=master)](https://travis-ci.org/dacz/rxr-react)
[![npm](https://img.shields.io/npm/v/rxr-react.svg?maxAge=2592000)](https://www.npmjs.com/package/rxr-react)

React bindings for [rxr](https://github.com/dacz/rxr) (RxJS the Redux way).

> Use [RxJS](https://github.com/ReactiveX/rxjs) with React the way similar to Redux. If you know Redux, rxr introduces very similar concept using into RxJS. It allows to **rewrite Redux app** to use pure RxJS with rxr fast with **most of the main code intact**. This is huge benefit when you want just play with something you already have. To learn, to play... ;)
>
>I'm sure there are different ways how to use RxJS with React. Redux is very popular (and I like it a lot!) and it established some code structure and thinking about the app. Applying RxJS the Redux way has a lot of benefits. We may build on what we know and therefore it's easier to learn RxJS.

... [read more about rxr](https://dacz.github.io/rxr/).

... demo example with commented differences between Redux and RxR in the docs: [rxr-redux-example](https://github.com/dacz/rxr-redux-example).


## Basic usage

```javascript
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'rxr-react';
import { createState, createLoggerStream, startLogging, messageStreamsMonitor$ } from 'rxr';

import styles from './index.css';

import App from './components/App';

// our RxR reducers
import reducer$ from './reducers';

// we create initial state here
const initialState = {
  clients:        { data: [], ts: 0, status: undefined },
  filter:         '',
  selectedClient: '',
};

// and because in RxR is no need of store, we create state directly
const state$ = createState(reducer$, initialState);

// we will log all state changes  and messageStreams events to console
const loggerStream$ = createLoggerStream(state$, messageStreamsMonitor$);
startLogging(loggerStream$);

// RxR-React provides similar Provider component as React-Redux
render(
  <Provider state$={ state$ }>
    <App />
  </Provider>, document.getElementById('index')
);
```

and to connect the component...

```javascript
import { connectWithState } from 'rxr-react';
import MyContainer from './MyContainer';
// lets's suppose that our userSelected$ stream was bound with next()
// (see RxR createPushMessageFunctions) and is part of userActions
// structure
import userActions from './userActions';

const selector = (state) => ({
  itemsSelected: state.itemsSelected,
  userSelected: myMessageStreams.userSelected,
});

const MyHoCContainer = connectWithState(selector)(MyContainer);
```

The props `MyContainer` gets are `itemsSelected` (array to display) and `userSelected` - action that is supposed to be invoked somehow like `... onClick={ userSelected('itemA') } ...`.

### Working Demo

Example with commented differences between Redux and RxR in the docs: [rxr-redux-example](https://github.com/dacz/rxr-redux-example).
