import React from 'react'
import {Route, IndexRoute} from 'react-router'
import authentication, {authenInputUrl} from './tool/authentication'
import Containers from './containers/Containers'
// import Home from './containers/home'
// import Login from './containers/login'
import SG from './containers/sg'




const Home = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('./containers/home').default)
    }, 'home')
}


export default (
    <Route getComponent={Containers}>
        <Route path="/" >
            <Route path="sg" getComponent={SG}>
                <IndexRoute getComponent={Home}/>
            </Route>
        </Route>
    </Route>
)
