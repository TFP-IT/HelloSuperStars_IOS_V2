import {  Text, View ,SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../HeaderComp'
// import imagePath from '../../Constants/imagePath'
import styles from './styles';
import FGVHome from './FGVHome';
import FGVMedia from './FGVMedia';
import FGVMembers from './FGVMembers';
import FanGModal from '../../MODAL/FanGModal';
import FanJoinModal from '../../MODAL/FanJoinModal';
import CongratulationFanModal from '../../MODAL/CongratulationFanModal';
import imagePath from '../../../Constants/imagePath';


const FangroupVoting = () => {
    const [data,setData]=React.useState('Home');
    const [show, setShow] = useState(false);
    const [joinNowShow, setJoinNowShow] = useState(false);
  return (
    <SafeAreaView  style={{flex:1, backgroundColor:'black'}}>
        
        <HeaderComp />

        <ScrollView>
        <View style={styles.Banner}>
            <Image source={imagePath.Group} style={styles.BannerImg}  />
        </View>

        <View style={styles.Card}>
            <Text style={styles.CardText}>Salman VS Sharukh Fan group</Text>
            <Text style={styles.CardTextSm}>Created at 12 Feb 2022 | Continue till 12 April 2022</Text>
          
            <View style={styles.CardS}>

                <TouchableOpacity  onPress={()=>setData('Home')}>
                    <Text style={data=='Home'?styles.CardNameActive:styles.CardName}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setData('Media')}>
                    <Text style={data=='Media'?styles.CardNameActive:styles.CardName}>Media</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setData('Members')}>
                    <Text style={data=='Members'?styles.CardNameActive:styles.CardName}>Members</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShow(true)}>
                    <Text style={styles.CardJoin}>Join Now</Text>
                </TouchableOpacity>

                <FanJoinModal joinNowShow={joinNowShow} setJoinNowShow={setJoinNowShow} />
                <FanGModal show={show} setShow={setShow}  joinNowShow={joinNowShow} setJoinNowShow={setJoinNowShow} />

                 {/* <CongratulationFanModal show={show} setShow={setShow} /> */}
                
            </View >
        </View>

        <View>

        </View>



        
        {data==='Home'?<FGVHome/>:null}
        {data==='Media'?    <FGVMedia/>:null}
        {data==='Members'?  <FGVMembers/>:null}
      

       
        </ScrollView>

    </SafeAreaView>
  )
}


export default FangroupVoting
