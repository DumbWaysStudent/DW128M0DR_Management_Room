import react, {Component} from 'react'
import {View, TouchableOpacity, Modal, TextInput} from 'react-native'

export default class Modal extends Component{
    render(){
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                >
                <View style={modals.background}>
                        <View style={modals.container}>
                            <View style={{marginVertical:15}}>
                                <Text style={{fontSize:24, alignSelf:'center', color:'#676767'}}>Add Customers</Text>
                                <TextInput style={{marginVertical:10,borderColor:'#ffafb0', borderRadius:5, borderWidth:1, width:300}} placeholder="Name" onChangeText={(text) => this.setState({name:text})} ></TextInput>
                                <TextInput style={{marginVertical:10,borderColor:'#ffafb0', borderRadius:5, borderWidth:1, width:300}} placeholder="Identity Number" onChangeText={(text) => this.setState({idcard:text})} ></TextInput>
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
            </Modal>
        )
    }    
}