# rxr-react

[![Build Status](https://travis-ci.org/dacz/rxr-react.svg?branch=master)](https://travis-ci.org/dacz/rxr-react)

React bindings for [rxr](https://github.com/dacz/rxr) (RxJS the Redux way).

> Use [RxJS](https://github.com/ReactiveX/rxjs) with React the way similar to Redux. If you know Redux, rxr introduces very similar concept using into RxJS. It allows to **rewrite Redux app** to use pure RxJS with rxr fast with **most of the main code intact**. This is huge benefit when you want just play with something you already have. To learn, to play... ;)
>
>I'm sure there are different ways how to use RxJS with React. Redux is very popular (and I like it a lot!) and it established some code structure and thinking about the app. Applying RxJS the Redux way has a lot of benefits. We may build on what we know and therefore it's easier to learn RxJS.

... [read more on rxr](https://github.com/dacz/rxr).


## Basic usage

```javascript
import React from 'react';
import { render } from 'react-dom';
import Rx from 'rxjs';
import { createState } from 'rxr';
import { Provider } from 'rxr-react';

const userSelected$ = new Rx.Subject;
const userReducer$ = userSelected$
  .map(val => (state) => ({ ...state, itemsSelected: state.itemsSelected.push(val) }));
const initialState = { itemsSelected: [] };

const state$ = createState(userReducer$, initialState);

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
// (see rxr createPushMessageFunctions) and is part of userActions
// structure
import userActions from './userActions';

const selector = (state) => ({
  itemsSelected: state.itemsSelected,
  userSelected: myMessageStreams.userSelected,
});

const MyHoCContainer = connectWithState(selector)(MyContainer);
```

The props `MyContainer` gets are `itemsSelected` (array to display) and `userSelected` - action that is supposed to be invoked somehow like `... onClick={ userSelected('itemA') } ...`.


### I'll add more details here very soon.
