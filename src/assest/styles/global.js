import { StyleSheet } from 'react-native'

export const stylesGlobal = StyleSheet.create({
    containerLogin : {
        flex:2,
        backgroundColor : '#ffafb0'
    },
    container : {
        flex: 1,
        backgroundColor: '#fff'
    },
    input:{
        marginTop:30,
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 10,
        color: '#8785a2',
        borderRadius:10,
        borderColor:"#ffafb0",
        borderWidth:1
    },
    inputActive:{
        marginTop:30,
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 10,
        color: '#5eb7b7',
        borderRadius:10,
        borderColor:"#5eb7b7",
        borderWidth:1
    },
    title:{
        marginHorizontal:15,
        marginVertical:10,
        fontSize:25,
        fontWeight:"bold"
    },
})