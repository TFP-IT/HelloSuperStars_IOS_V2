import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  messageInfo:{
    backgroundColor:'black',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  messageInfoView1:{
    paddingVertical:10,
    justifyContent:'center'
  },
  imageMsgTop:{
    flexDirection:'row',
   
  },
  dot:{
    height:8,width:8,backgroundColor:'#2DE06C',borderRadius:100,right:6 
  },
inputTxt:{
  backgroundColor: 'gray',
  height: 38,
  borderRadius: 5,
  color: 'white',
},
sendBtn:{
  backgroundColor: 'gray',
              height: 30,
              width: 30,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
},





  bottomContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor: '#343434',
          width: '100%',
          height: 50,
          position: 'absolute',
          bottom: 0,
          borderTopColor:'gray',
          borderWidth:1
  }
  
});

export default styles;
