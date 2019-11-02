import React, { Component } from 'react'
import { Container, Content, Text} from 'native-base'
import {View, FlatList, TouchableOpacity, SafeAreaView, Modal, TextInput, Dimensions} from 'react-native'
import {connect} from 'react-redux'

const {height} = Dimensions.get('window')

import * as actionRooms from '../../redux/actions/rooms'
import * as all from '../../redux/actions/checkin'
import {stylesGlobal} from '../../assest/styles/global'
import {modals} from '../../assest/styles/modal'
import {HeaderAdd} from '../../components/HeaderGlobal'
import axios from '../../utils/axios'

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token:'',
          rooms:'',
          id:'',
          add:'',
          modalVisible:false,
          editVisible:false
        }
      }

      async componentDidMount() {
        this.props.handleRooms()
        // console.log(this.props.data,'====================')
      }
      add = async() => {
        const data = await axios({
          method: 'POST',
          url: '/room',
          headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{ 
            name:this.state.add          }
        })
        let newData = [...this.props.data, data.data]
        this.setState({
          modalVisible:!this.state.modalVisible
        })
        // console.log(JSON.stringify(newData, null, 4))
        this.props.handleRooms(newData)
        this.props.handleAll(newData)
      }

      edit = async() => {
        const data = await axios({
          method: 'PUT',
          url: `/room/${this.state.id}`,
          // headers: { 'Authorization': `Bearer ${this.state.token}` },
          data:{
            name:this.state.rooms
          }
        })
        this.setState({
          editVisible:!this.state.editVisible
        })
        // console.log(JSON.stringify(Ref, null, 4))
        this.props.handleRooms()
        this.props.handleAll()
      }

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      editModalVisible = (visible, rooms) => {
        this.setState({
          editVisible: visible,
          rooms: rooms.name,
          id:rooms.id
        })
      }

  render() {
    return (
      <Container style={stylesGlobal.container}>
        <HeaderAdd title='ROOMS' iconName='ios-add' iconPress={()=>this.setModalVisible(true)}/>
        <Content style={{marginTop:10}}>
        <SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={modals.background}>
                  <View style={[modals.container,{height:height*0.25}]}>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Add Room</Text>
                          <TextInput style={modals.input} placeholder="Input room name" onChangeText={(text) => this.setState({add:text})} ></TextInput>
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
                  </View>
              </View>
          </Modal>

          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.editVisible}
          >
          <View style={modals.background}>
                  <View style={[modals.container,{height:height*0.25}]}>
                      <View style={{marginVertical:15}}>
                          <Text style={modals.title}>Edit Room</Text>
                          <TextInput style={modals.input} placeholder="Input room name" onChangeText={(text) => this.setState({rooms:text})} >{this.state.rooms}</TextInput>
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
                  </View>
              </View>
          </Modal>
        <FlatList
            data={this.props.data}
            numColumns={3}
            renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={()=>this.editModalVisible(true, item)}>
                  <View style={{width:110, height:100, alignItems:'center', backgroundColor:'#A9A9A9', marginHorizontal:5, marginVertical:5, flex:1, borderRadius:5}}>
                    
                          <Text style={{fontSize:18, fontWeight:'bold', marginVertical:35, marginHorizontal:35, color:'#fff'}}>{item.name}</Text>                          
                    
                </View>
                </TouchableOpacity>
                ) 
            }
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
    data: state.rooms.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRooms: () => dispatch(actionRooms.handleRooms()),
    handleAll:() =>dispatch(all.handleCheckin())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms)