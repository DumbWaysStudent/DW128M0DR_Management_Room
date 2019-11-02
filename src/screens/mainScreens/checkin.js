import React, { Component } from 'react'
import { Container, Content, Text} from 'native-base'
import {View, FlatList, TouchableOpacity, SafeAreaView, Dimensions, Modal, TextInput, Picker} from 'react-native'
import {connect} from 'react-redux'
import moment from 'moment'

const {height, width} =Dimensions.get("window")

import * as actionCheckin from '../../redux/actions/checkin'
import axios from '../../utils/axios'
import {stylesGlobal} from '../../assest/styles/global'
import {modals} from '../../assest/styles/modal'
import {HeaderGlobal} from '../../components/HeaderGlobal'

class Checkin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token:'',
          data:'',
          modalVisible:false,
          checkoutVisable:false,
          room:'',
          id:'',
          customerselect : '0',
          count:'0',
          time:'',
          is_booked:false,
          is_done:true
        }
      }

      componentDidMount() {
        this.setState({
          // token : await AsyncStorage.getItem('uToken') 
        })
        this.props.handleCheckin()
      }

      add = async() => {
        const data = await axios({
          method: 'POST',
          url: '/checkin',
          // headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{ 
            room_id: this.state.id,
            customer_id: this.state.customerselect,
            duration: this.state.time,
            is_done: false,
            is_booked: true
          }
        })
        let newData = [...this.props.data, data.data]
        this.setState({
          modalVisible:!this.state.modalVisible,
          customerselect:'0',
          time:''
        })
        console.log(JSON.stringify(newData, null, 4))
        this.props.handleCheckin(newData)
      }

      checkout = async() => {
        let data = {
            customer_id:this.state.customerselect,
            // duration:this.state.time,
            is_done:true,
            is_booked: false
        }
       const dataCheckout = await axios({
          method: 'PUT',
          url: `/order/${this.state.id}`,
          data
        })
        let newData = [...this.props.data, dataCheckout.data]
        this.setState({
          checkoutVisable:!this.state.checkoutVisable
        })
        // console.log(JSON.stringify(newData, null, 4))
        // console.log(`http://192.168.1.119:9090/api/v2/order/${this.state.id}`)
        // console.log(newData)
        this.props.handleCheckin(newData)
      }

      setModalVisible(visible, orders) {
        this.setState({
          modalVisible: visible,
          room:orders.name,
          id:orders.id
        })
      }
      setCheckoutVisible(visible, item) {
        this.setState({
          checkoutVisable: visible,
          id:item.order.id,
          room:item.name,
          customerselect:item.customers_id,
          duration:this.state.time,
          
        });
      }

      addCustomer = () =>{
        this.setState({modalVisible:false})
        this.props.navigation.navigate('Customer')
      }

      cancle = (mode) => {
        this.setState({
          modalVisible:false,
          checkoutVisable:false,
          customerselect:'0',
          time:''
        })
      }

      autoCheckout = (order_id,order_end_time) => {
          let counter = 0
          let lefTime = moment.duration(moment(order_end_time).diff(moment().format('YYYY-MM-DD hh:mm:ss'))).asSeconds() / 60
          let diff = Math.round(lefTime)
          let toSecond = diff * 60
            setInterval(() => {
              counter++
              if(toSecond - counter === 0){
                 const dataCheckout = axios({
                    method: 'PUT',
                    url: `/order/${order_id}`,
                    data:{
                      // is_done: true,
                      is_booked: false
                    }
                  })
                  let newData = [...this.props.data, dataCheckout.data]
                  this.props.handleCheckin(newData)
                  this.props.handleCheckin()
                  alert("Times up ", order_id)
                } console.log(toSecond-counter,"Waktu",order_id)
            },1000)
      }

  render() {
    console.log(this.state.id, "================= ID")
    return (
      <Container style={stylesGlobal.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={modals.background}>
                  <View style={modals.container}>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Checkin</Text>
                          <Text style={modals.subTitle}>Room Name</Text>
                          <TextInput editable={false} style={[modals.input, {backgroundColor:'#777', color:'white'}]} placeholder="Name" onChangeText={(text) => this.setState({name:text})}>{this.state.room}</TextInput>
                          <View style={{flexDirection : "row"}}>
                              <Text style={modals.subTitle}>Customers</Text>
                              <TouchableOpacity onPress={()=>this.addCustomer()} style={{left:width/2}}>
                                <Text style={{color:'#5eb7b7'}}>add+</Text>
                              </TouchableOpacity>
                          </View>
                          
                          <Picker
                              selectedValue={this.state.customerselect}
                              style={modals.picker}
                              onValueChange={(itemValue, itemIndex) =>
                                this.setState({customerselect: itemValue})
                              }>
                              <Picker.Item label="customer" value="0" />
                              {this.props.customers.map(item => {
                                const labelName = `${item.name} - ${item.phone_number}`
                                return <Picker.Item label={labelName} value={item["id"]} />
                              })}
                              
                          </Picker>
                          <Text style={modals.subTitle}>Durations</Text>
                          <TextInput style={modals.input} placeholder="Duration" onChangeText={(text) => this.setState({time:text})} >{this.state.time}</TextInput>
                      </View>
                      <View style={{flexDirection : "row"}}>
                      <TouchableOpacity onPress={()=>this.cancle()} style={modals.cancleBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Cancle
                          </Text>
                      </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.add()} style={modals.okBtn}>
                            <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Checkin
                          </Text>
                        </TouchableOpacity>  
                      </View>
                  </View>
          </View>
        </Modal>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.checkoutVisable}
          >
          <View style={modals.background}>
                  <View style={modals.container}>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Checkout</Text>
                          <Text style={modals.subTitle}>Room Name</Text>
                          <TextInput editable={false} style={[modals.input,{backgroundColor:'#777', color:'#fff'}]} placeholder="Name" onChangeText={(text) => this.setState({name:text})}>
                              {this.state.room}
                          </TextInput>
                          <Text style={modals.subTitle}>Customers</Text>
                          <Picker
                              selectedValue={this.state.customerselect}
                              style={[modals.picker, {backgroundColor:'#777', color:'#fff'}]}
                              enabled={false}
                              onValueChange={(itemValue, itemIndex) =>
                                this.setState({customerselect: itemValue})
                              }>
                              <Picker.Item label="customer" value={this.state.customerselect} />
                              {this.props.customers.map(item => {
                                const labelName = `${item.name} - ${item.phone_number}`
                                return <Picker.Item label={labelName} value={item["id"]} />
                              })}
                              
                          </Picker>
                          <Text style={modals.subTitle}>Durations</Text>
                          <TextInput editable={false} style={modals.input} placeholder="Duration" onChangeText={(text) => this.setState({time:text})} ></TextInput>
                      </View>
                      <View style={{flexDirection : "row"}}>
                      <TouchableOpacity onPress={()=>this.cancle()} style={modals.cancleBtn}>
                          <Text style={{alignSelf:'center', color:'#fff', marginHorizontal:10}}>
                            Cancle
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.checkout()} style={modals.okBtn}>
                          <Text style={{alignSelf:'center', color:'#fff'}}>
                            Checkout
                          </Text>
                      </TouchableOpacity>
                      </View>
                  </View>
          </View>
        </Modal>
        <HeaderGlobal title='CHECK IN' />
        <Content style={{marginTop:10}}>
        <SafeAreaView>
            <FlatList
                data={this.props.data}
                numColumns={3}
                renderItem={({item}) =>
                
                {if(item.customer == undefined){
                  return(
                  <TouchableOpacity onPress={()=>this.setModalVisible(true, item)}>
                  <View style={{width:110, height:100, alignItems:'center', backgroundColor:'#5eb7b7', marginHorizontal:5, marginVertical:5, flex:1, borderRadius:5}}>
                      <Text style={{fontSize:18, fontWeight:'bold', marginVertical:35, marginHorizontal:35, color:'#fff'}}>{item.name}</Text>                          
                      {console.log(item, "======================undifinded")}
                  </View>
                  </TouchableOpacity> 
                  )
                }else{
                  if(item.order.is_booked==true){
                    return(
                      <TouchableOpacity onPress={()=>this.setCheckoutVisible(true, item)} yo={this.autoCheckout(item.order.id, item.order.order_end_time)}>
                      <View style={{width:110, height:100, alignItems:'center', backgroundColor:'#f35588', marginHorizontal:5, marginVertical:5, flex:1, borderRadius:5}}>
                          <Text style={{fontSize:18, fontWeight:'bold', marginVertical:35, marginHorizontal:35, color:'#fff'}}>{item.name}</Text>                          
                          {console.log(item, "======================is booked true")}
                      </View>
                      </TouchableOpacity>
                    )
                  }
                  else if(item.order.is_booked==false) {
                    return(
                      <TouchableOpacity onPress={()=>this.setModalVisible(true, item)}>
                      <View style={{width:110, height:100, alignItems:'center', backgroundColor:'#5eb7b7', marginHorizontal:5, marginVertical:5, flex:1, borderRadius:5}}>
                          <Text style={{fontSize:18, fontWeight:'bold', marginVertical:35, marginHorizontal:35, color:'#fff'}}>{item.name}</Text>                          
                          {console.log(item, "======================undifinded")}
                      </View>
                      </TouchableOpacity> 
                    )
                  }
                  }
                }
              }
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
        
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return{
    data : state.checkin.data,
    customers: state.customers.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCheckin: () => dispatch(actionCheckin.handleCheckin()),
    handleCustomers: () => dispatch(actionCheckin.handleCustomers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin)