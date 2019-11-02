import { StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export const modals = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: height 
    },
    container: {
        alignItems:'center',
        alignContent:'center',
        height:height*0.45,
        width:'90%',
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:10,
        marginVertical: 100
    },
    title:{
        fontSize:18,
        alignSelf:'center',
        color:'#676767',
        marginBottom:10
    },
    subTitle:{
        color:'#676767',
        marginBottom:2
    },
    input:{
        color:'#777',
        marginBottom:10,
        borderColor:'#ffafb0', 
        borderRadius:5, 
        borderWidth:1,
        paddingVertical:0,
        width:width*0.8
    },
    picker:{
        marginBottom:10,
        width:width*0.8,
        height:30
    },
    cancleBtn: {
        borderRadius:5, 
        backgroundColor: '#ffafb0',
        marginHorizontal:10,
        paddingVertical: 5,
        height:30,
        width:70
    },
    okBtn: {
        borderRadius:5, 
        backgroundColor: '#5eb7b7', 
        marginHorizontal:10,
        paddingVertical: 5,
        height:30,
        width:70
    }
})