import React, { Component } from 'react'
import { Container, Content, Text} from 'native-base'
import {Image, StyleSheet,SafeAreaView,AsyncStorage, TouchableOpacity} from 'react-native';

import { stylesGlobal } from '../../assest/styles/global'

export default class Profile extends Component {
  constructor(){
    super() 
    this.state = {
        token:'',
        id:'',
        name:'',
        image: { uri : 'https://kvener.no/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
    }
  }

  async componentDidMount() {
    this.setState({
      token : await AsyncStorage.getItem('uToken'), 
      name : await AsyncStorage.getItem('name'),
      id : await AsyncStorage.getItem('id')
    })
  }

  logout = () => {
    AsyncStorage.removeItem('uToken')
    AsyncStorage.removeItem('name')
    AsyncStorage.removeItem('id')
    this.props.navigation.navigate('Unauth')  }

  render() {
    console.log(this.state.id)
    return (
      <Container style={stylesGlobal.container}>
        <Content>
        <SafeAreaView>
            <Image source={{uri:this.state.image.uri}} style={[styles.profileImg,{marginTop:50}]} />
            <Text style={{alignSelf:'center', color:'#8785a2', fontWeight:'700'}}>
            {this.state.name}
            </Text>
        </SafeAreaView>
          <SafeAreaView style={{marginVertical:30}}>
          <TouchableOpacity danger onPress={()=>this.logout()} style={{borderRadius:10, backgroundColor: '#ffe2e2', marginHorizontal:15,paddingVertical: 15, marginTop:10}}>
              <Text style={{alignSelf:'center', color:'#8785a2', fontWeight:'700'}}>
                   SIGN OUT
              </Text>
          </TouchableOpacity>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    profileImg: {
        marginVertical:15,
        alignSelf:'center',
        height: 200,
        width: 200,
        borderRadius: 100,
      },
})