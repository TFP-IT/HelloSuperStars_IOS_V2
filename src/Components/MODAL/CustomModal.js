//import liraries
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';

import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../Constants/imagePath';
import BidCongratulationModal from './BidCongratulationModal';

const CustomModal = ({customShow, setCustomShow,RoundName,appeal, setAppeal}) => {
    const [showModal,setShowModal]=useState(false)
  
  const handleDone = () => {
    setCustomShow(false)
    setShowModal(true)

  }

  return (
    <>
    <Modal
      visible={customShow}
      transparent
      animation="slide"
      hardwareAccelerated
      onRequestClose={() => {
        setCustomShow(false);
      }}>
      <View style={styles.centered_view}>
        <View>
          <ImageBackground
            style={styles.LearnMo}
            source={imagePath.DeleteMZ}
            resizeMode="cover">
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => setCustomShow(false)}
                style={{color: '#FFAD00', marginRight: 10, padding: 10}}>
                <Icon name="close" size={15} color="#FFAD00" />
              </TouchableOpacity>
            </View>
           
            <View style={styles.customModal}>
           <View style={{marginVertical:10}}>
           <TextInput placeholder='Enter your name...' placeholderTextColor={"white"} style={{borderWidth:1,borderColor:'#FFAD00',borderRadius:15,paddingLeft:10}} />
           </View>
           <View style={{marginVertical:10}}>
           <TextInput placeholder=' Father name...' placeholderTextColor={"white"} style={{borderWidth:1,borderColor:'#FFAD00',borderRadius:15,paddingLeft:10}} />
           </View>

           <View style={{marginVertical:10}}>
           <TextInput placeholder='Password...' placeholderTextColor={"white"} style={{borderWidth:1,borderColor:'#FFAD00',borderRadius:15,paddingLeft:10}} />
           </View>
            <TouchableOpacity onPress={() => handleDone()}>
        <Text style={[styles.DoneS,{textAlign:'center'}]}>
             Apply
            </Text>
            </TouchableOpacity>
          
  
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>


    <BidCongratulationModal
   appeal={appeal}setAppeal={setAppeal}
    RoundName={RoundName}
    showModal={showModal}
    setShowModal={setShowModal}
     />
    </>
  );
};

export default CustomModal;
