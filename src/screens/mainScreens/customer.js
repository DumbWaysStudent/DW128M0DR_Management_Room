import React, { Component } from 'react'
import { Container, Content, Text, Icon,Item, Input} from 'native-base'
import {View, FlatList, TouchableOpacity, Image, SafeAreaView, Modal, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'

import * as actionsCustomers from '../../redux/actions/customers'
import {stylesGlobal} from '../../assest/styles/global'
import {modals} from '../../assest/styles/modal'
import {HeaderAdd} from '../../components/HeaderGlobal'
import axios from '../../utils/axios'

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token:'',
          data:'',
          name:'',
          idcard:'',
          phone:'',
          modalVisible:false,
          editVisible:false,
          idCustomer:'',
          search:''
        }
      }

      async componentDidMount() {
        this.props.handleCustomers()
      }

      add = async() => {
        const data = await axios({
          method: 'POST',
          url: '/customer',
          headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{ 
            name:this.state.name,
            identity_number:this.state.idcard,
            phone_number:this.state.phone,
            image: "https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png"
          }
        })
        let newData = [...this.props.data, data.data]
        this.setState({
          modalVisible:!this.state.modalVisible
        })
        // console.log(JSON.stringify(newData, null, 4))
        this.props.addCustommers(newData)
      }

      edit = async() => {
        const data = await axios({
          method: 'PUT',
          url: `/customer/${this.state.idCustomer}`,
          // headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{
            name:this.state.name,
            identity_number:this.state.idcard,
            phone_number:this.state.phone
          }
        })
        this.setState({
          editVisible:!this.state.editVisible
        })
        // console.log(JSON.stringify(Ref, null, 4))
        this.props.handleCustomers()
      }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
      setEditVisible = async (visible, customer) => {
        await this.setState({
          idCustomer: customer.id,
          name:customer.name,
          idcard:customer.identity_number,
          phone:customer.phone_number,
          editVisible: visible
        })
      }

      // searchPress = async () => {
      //   let querySearch = await axios({
      //     method: 'GET',
      //     url: `/search?search=${this.state.search}`
      //   })
      //   this.setState({
      //     search:''
      //   })
      //   this.props.searchCustomers(querySearch)
      //   console.log(JSON.stringify(querySearch, null, 4))
      // }

  render() {
    console.log(this.state.search)
    return (
      <Container style={stylesGlobal.container}>
        <HeaderAdd title='CUSTOMERS' iconName='ios-add' iconPress={()=>this.setModalVisible(true)}/>
          {/* <Item style={{borderRadius:10, marginLeft:10, marginRight:10, paddingVertical:3, backgroundColor:'white', marginTop:15}}>
            <Input placeholder="Search" onChangeText={text => this.setState({search:text})} />
            <TouchableOpacity onPress={()=>this.searchPress()}>
              <Icon name="ios-search" />
          </TouchableOpacity>
          </Item> */}
        <Content style={{marginTop:10}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={modals.background}>
          <KeyboardAvoidingView style={modals.container} behavior="padding" enabled>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Add Customers</Text>
                          <Text style={modals.subTitle}>Room Name</Text>
                          <TextInput style={modals.input} placeholder="Name" onChangeText={(text) => this.setState({name:text})} ></TextInput>
                          <Text style={modals.subTitle}>Identity Number</Text>
                          <TextInput style={modals.input} placeholder="Identity Number" onChangeText={(text) => this.setState({idcard:text})} ></TextInput>
                          <Text style={modals.subTitle}>Phone Number</Text>
                          <TextInput style={modals.input} placeholder="Phone Number" onChangeText={(text) => this.setState({phone:text})} ></TextInput>
                      </View>
                      <View style={{flexDirection : "row"}}>
                      <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})} style={modals.cancleBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Cancle
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.add()} style={modals.okBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Save
                          </Text>
                      </TouchableOpacity>
                      </View>
                  </KeyboardAvoidingView>
          </View>
          </Modal>
        
          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.editVisible}
          >
          <View style={modals.background}>
          <KeyboardAvoidingView style={modals.container} behavior="padding" enabled>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Edit Customers</Text>
                          <Text style={modals.subTitle}>Room Name</Text>
                          <TextInput style={modals.input} placeholder="Name" onChangeText={(text) => this.setState({name:text})} >{this.state.name}</TextInput>
                          <Text style={modals.subTitle}>Identity Number</Text>
                          <TextInput style={modals.input} placeholder="Identity Number" onChangeText={(text) => this.setState({idcard:text})} >{this.state.idcard}</TextInput>
                          <Text style={modals.subTitle}>Phone Number</Text>
                          <TextInput style={modals.input} placeholder="Phone Number" onChangeText={(text) => this.setState({phone:text})} >{this.state.phone}</TextInput>
                      </View>
                      <View style={{flexDirection : "row"}}>
                      <TouchableOpacity onPress={()=>this.setState({editVisible:!this.state.editVisible})} style={modals.cancleBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Cancle
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.edit()} style={modals.okBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Save
                          </Text>
                      </TouchableOpacity>
                      </View>
                  </KeyboardAvoidingView>
          </View>
          </Modal>
        <SafeAreaView>
            <FlatList
                data={this.props.data}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) =>
                <TouchableOpacity onPress={()=>this.setEditVisible(true, item)}>
                    <View style={{backgroundColor:'white',marginHorizontal:15, marginVertical:5,flexDirection:'row', borderRadius:15}}>
                        <Image style={{width:100, height:100, padding:10, borderRadius:10}} source={{uri : item.image}}/>
                        <View style={{marginHorizontal:15, alignSelf:'center'}}>
                            <Text style={{fontSize:14,color:'#676767', fontWeight:'bold', marginBottom:6}}>{item.name}</Text>
                            <Text style={{fontSize:12,color:'#A9A9A9', marginBottom:2}}> ID  : {item.identity_number}</Text>
                            <Text style={{fontSize:11,color:'#A9A9A9'}}> Tlp : {item.phone_number}</Text>                          
                        </View>
                    </View>
                </TouchableOpacity>
               
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.customers.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCustomers: () => dispatch(actionsCustomers.handleCustomers()),
    addCustommers: data => dispatch({type:"SET_CUSTOMERS", payload:data}),
    searchCustomers: data => dispatch({type:"SEARCH_CUSTOMERS", payload:data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers)