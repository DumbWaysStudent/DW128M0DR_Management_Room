import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'

import BottomTabNavigator from './bottomTabNavigator'
import AddCustomer from './../screens/subScreens/addCustomer'
import EditCustomer from './../screens/subScreens/editCustomer'

const Auth = createStackNavigator({
    BottomTabNavigator : {
        screen : BottomTabNavigator,
        navigationOptions :{
            header : null
        }
    },
    AddCustomer : {
        screen : AddCustomer,
        navigationOptions :{
            header : null
        }
    },
    EditCustomer : {
        screen : EditCustomer,
        navigationOptions :{
            header : null
        }
    }
}) 



export default createAppContainer(Auth)