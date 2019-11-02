import React, {Component} from 'react'
import {Header, Body, Right, Icon, Title} from 'native-base'

class HeaderGlobal extends Component{
    render(){
        return(
        <Header style={{backgroundColor:'#ffafb0'}}>
            <Body>
                 <Title style={{ alignSelf:'center',color:'#fff'}}>{this.props.title}</Title>
            </Body>
        {this.props.iconName?
            <Right>
                <Icon name={this.props.iconName} onPress={this.props.iconPress} style={{marginRight:10, color:'white'}}/>
            </Right>:
            null
        }
            
        </Header>
        )
    }
}

class HeaderAdd extends Component{
    render(){
        return(
        <Header style={{backgroundColor:'#ffafb0'}}>
            <Body style={{marginLeft:100}}>
                 <Title style={{ alignSelf:'center',color:'#fff'}}>{this.props.title}</Title>
            </Body>
        {this.props.iconName?
            <Right>
                <Icon name={this.props.iconName} onPress={this.props.iconPress} style={{marginRight:10, color:'white'}}/>
            </Right>:
            null
        }
            
        </Header>
        )
    }
}

export {HeaderGlobal,HeaderAdd}