import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
        },
        firstRow:{
        backgroundColor: '#343434',
        width: '20%',
        position: 'absolute',
        left: 5,
        top: 5,
        flexDirection: 'row',
        },
        commentInput:{
        borderColor:"#FFAD00",borderWidth:1,marginHorizontal:10
        ,borderRadius:5,paddingLeft:7,color:'white',marginBottom:4,backgroundColor:'white',
        
        },
        keyDirection:{
        flexDirection:'row',justifyContent:'space-around'
        },
        msgText:{
        color:"#FFAD00"
        },
        msgGold:{
        color:"#FFAD00"
        },
        commentMsg:{
        backgroundColor:'gray',color:'white',padding:5,margin:3
        },
        commentImg:{
        height:40 ,width:40,marginLeft:10
        },
        firstRowText:{
        color: 'white',
        fontSize: 18,
        padding: 3,
        textAlign: 'center',
        }
        });
    

export default styles;


