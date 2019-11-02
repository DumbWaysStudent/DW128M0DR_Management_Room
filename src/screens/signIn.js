import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity,StyleSheet, Text, Image, KeyboardAvoidingView, AsyncStorage} from 'react-native'
import axios from '../utils/axios'

// import * as actionLogin from '../redux/actions'
import {stylesGlobal} from '../assest/styles/global'

export default class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            showPassword : true,
            email:"",
            password:'',
            emailNull:false,
       }
    } 
    passwordVisibility = () => {
        this.setState({
            showPassword:!this.state.showPassword
        })
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(re.test(email)===true){
            this.setState({
                emailNull:true
            })
          }else{
              this.setState({
                  emailNull:false
              })
          }
      }

    handleLogin = () => {
        axios({ 
            method: 'post',
            url: '/signin',
            data:{
                email:this.state.email,
                password:this.state.password
            }
          })
          .then((response) => {
            if(typeof response.data.token !== 'undefined'){
                AsyncStorage.setItem('uToken', response.data.token)
                AsyncStorage.setItem('name', response.data.user.toString())
                AsyncStorage.setItem('id', response.data.id.toString())
                this.props.navigation.navigate('Checkin',{user_id:response.data.id, name:response.data.name})
              }else{
                alert('Email or Password is invalid')
              }
          }).catch(err=>{
              console.log(err)
          })
      }
    
    render(){
        const validation = ((this.state.password!="") && (this.state.emailNull==true))
        return(
            <KeyboardAvoidingView style={stylesGlobal.containerLogin} enabled>
                <View style={[styles.loginContainer, {flex:50}]}>
                    <Image source={require('../assest/img/logo.png')} style={styles.logo} />
                   <Text style={{fontSize:48}}>YareeRooms</Text>
                </View>
                <View style={{flex:50, backgroundColor:'white', borderTopRightRadius:20, borderTopLeftRadius:20}}>
                    <TextInput 
                        style={ this.state.emailNull ? stylesGlobal.inputActive:stylesGlobal.input}
                        value={this.state.email}
                        onChangeText={(email)=>{this.setState({email}), this.validateEmail(email)}}
                        returnKeyType="next"
                        placeholder='Email'
                        placeholderTextColor='rgba(225,225,225,10)' 
                    />

                <View style={{position:'relative'}}>
                    <TextInput style = { this.state.password !="" ? stylesGlobal.inputActive:stylesGlobal.input}   
                        placeholder='Password'
                        onChangeText={password=>this.setState({password})}
                        placeholderTextColor='rgba(225,225,225,10)' 
                        secureTextEntry={this.state.showPassword}>
                    </TextInput>
                    
                    <TouchableOpacity style={{position:'absolute',bottom:30, right:'10%'}} onPress = { this.passwordVisibility }>
                        <View >
                            <Text style={styles.showhide}>{this.state.showPassword ? "show" : "hide" }</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    
                    <TouchableOpacity
                        style={validation?styles.buttonContainer:styles.btnDisable}
                        onPress={() => this.handleLogin()}
                        disabled={validation?false:true}>
                        <Text  style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        alignItems:'center',
        justifyContent:'center'
    },
    logo: {
       height:100,
       width:100,
       left: -80,
       top:60
    },
    input:{
        marginHorizontal: 15,
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: '#000',
        borderRadius:15,
    },
    buttonContainer:{
        borderRadius:10,
        backgroundColor: '#4b8e8d',
        marginHorizontal:15,
        paddingVertical: 20
    },
    btnDisable:{
        borderRadius:10,
        backgroundColor: '#828282',
        marginHorizontal:15,
        paddingVertical: 20
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    showhide:{
        color:"rgba(10,10,10,0.5)"
    }
})