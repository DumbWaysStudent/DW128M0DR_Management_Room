import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import {Provider} from 'react-redux'

import store from './src/redux/store'
import Unauth from './src/navigator/unauth'
import Auth from './src/navigator/auth'

const Routing = createAppContainer(createSwitchNavigator({
    Unauth,
    Auth
}))

class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Routing />
            </Provider>
        )
    }
}


export default App;

//Untuk menghilangkan warning
console.disableYellowBox=true