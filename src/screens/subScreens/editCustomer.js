import React, { Component } from 'react'
import { Container, Content, Text, Icon,Item, Input} from 'native-base'
import {View, FlatList, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import {AsyncStorage} from 'react-native';

import {stylesGlobal} from '../../assest/styles/global'
import axios from 'axios'

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token:'',
          idCS:'',
          data:'',
          name:'',
          idcard:'',
          phone:''
        }
      }

      async componentDidMount() {
        this.setState({
            idCS:this.props.navigation.getParam('idCS'),
            token : await AsyncStorage.getItem('uToken') 
        })
      }


      add = async() => {
        const data = await axios({
          method: 'PUT',
          url: `http://192.168.1.64:9090/api/v2/customer/${idCS}`,
          headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{
            name:this.state.name,
            identity_number:this.state.idcard,
            phone_number:this.state.phone,
            image: "https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png"
          }
        })
        this.setState({
          data:data.data
        })
     this.props.navigation.navigate('Customer')
      }

  render() {
      console.log(this.state.data)
    const {navigate} = this.props.navigation
    return (
      <Container style={stylesGlobal.container}>
          <Item style={{borderRadius:10, marginLeft:10, marginRight:10, paddingVertical:3, backgroundColor:'white', marginTop:15}}>
            <Input placeholder="Name" onChangeText={text=> this.setState({name:text})} />
          </Item>

          <Item style={{borderRadius:10, marginLeft:10, marginRight:10, paddingVertical:3, backgroundColor:'white', marginTop:15}}>
            <Input placeholder="Identity Number" onChangeText={text=> this.setState({idcard:text})} />
          </Item>

          <Item style={{borderRadius:10, marginLeft:10, marginRight:10, paddingVertical:3, backgroundColor:'white', marginTop:15}}>
            <Input placeholder="Phone Number" onChangeText={text=> this.setState({phone:text})} />
          </Item>

          <TouchableOpacity style={{borderRadius:10, marginLeft:10, marginRight:10, paddingVertical:3, backgroundColor:'white', marginTop:15}} onPress={()=>this.add() }>
              <Icon style={{alignSelf:'center'}} name="ios-add"/>
            </TouchableOpacity>

            <Text style={{alignSelf:'center', marginTop:50,color:'white', fontSize:50}}>
                Edit Customer
            </Text>
      </Container>
    );
  }
}