import React, { Component } from 'react'
import { Container, Content, Text, Icon,Item, Input} from 'native-base'
import {View, FlatList, TouchableOpacity, Modal, TextInput} from 'react-native'
import {AsyncStorage} from 'react-native';

import {stylesGlobal} from '../../assest/styles/global'
import axios from 'axios'

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token:'',
          data:'',
          name:'',
          idcard:'',
          phone:'',
          modalVisible:true
        }
      }

      async componentDidMount() {
        this.setState({
          token : await AsyncStorage.getItem('uToken') 
        })
        const data = await axios({
          method: 'GET',
          url: 'http://192.168.1.64:9090/api/v2/customers',
          headers: { 'Authorization': `Bearer ${this.state.token}` },
        })
          this.setState({
            data:data.data
          })
      }


      add = async() => {
        const data = await axios({
          method: 'POST',
          url: 'http://192.168.1.64:9090/api/v2/customer',
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

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

  render() {
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', height : '100%'}}>
              <View style={{flex:1}}>
                  <View style={{alignItems:'center',height:350, width:'90%', backgroundColor:'white', alignSelf:'center', marginVertical:150, borderRadius:10}}>
                      <View style={{marginVertical:15}}>
                          <Text style={{fontSize:24, alignSelf:'center', color:'#676767'}}>Add Customers</Text>
                          {/* <Icon type="Ionicons" name='person-add' style={{alignSelf:'center', color:'#5eb7b7'}}/> */}
                          <TextInput style={{marginVertical:10,borderColor:'#ffafb0', borderRadius:5, borderWidth:1, width:300}} placeholder="Name" onChangeText={text=> this.setState({name:text})} ></TextInput>
                          <TextInput style={{marginVertical:10,borderColor:'#ffafb0', borderRadius:5, borderWidth:1, width:300}} placeholder="Identity Number" onChangeText={text=> this.setState({idcard:text})} ></TextInput>
                          <TextInput style={{marginVertical:10,borderColor:'#ffafb0', borderRadius:5, borderWidth:1, width:300}} placeholder="Phone Number" onChangeText={(text) => this.setState({phone:text})} ></TextInput>
                      </View>
                      <View style={{flexDirection : "row"}}>
                      <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})} style={{borderRadius:10, backgroundColor: '#ffafb0', marginHorizontal:15,paddingVertical: 15, height:50, width:100}}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Cancle
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.add()} style={{borderRadius:10, backgroundColor: '#5eb7b7', marginHorizontal:15,paddingVertical: 15, height:50, width:100}}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Save
                          </Text>
                      </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </View>
          </Modal>
    )
  }
}