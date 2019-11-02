import { createAppContainer } from 'react-navigation'
import { createStackNavigator }  from 'react-navigation-stack'

import SignIn from '../screens/signIn'

const Unauth = createStackNavigator({
    SignIn : {
        screen : SignIn,
        navigationOptions : {
            header : null
        }
    }
})

export default createAppContainer(Unauth)