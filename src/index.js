import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './containers/AppContainer';
import {Server} from "./containers/ServerContainer";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

const store = createStore(rootReducer, applyMiddleware(thunk));

// http://127.0.0.1:5000/servers/potato

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route path='/server/:id' component={Server} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
