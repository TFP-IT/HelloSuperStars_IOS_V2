import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import PostCard from '../../../Components/GLOBAL/Card/PostCard/PostCard';
import NotAvailable from '../../../Components/GLOBAL/Reuseable/NotAvailable';
import { AuthContext } from '../../../Constants/context';

const LiveChat = ({
  setProfileNavigate,
  data,
  setSelectedLiveChat,
  PostData,
  star,
  filter,
}) => {
  const [liveChatList, setLiveChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { axiosConfig } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState('');
  const [takeTieme, setTakeTime] = useState(1);
  const [fee, setFee] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  const windowHight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  // //apply now button
  // const applyNow = () => {
  //   if (modalObj.available) {

  //     setProfileNavigate(profileNavigatr.LIVECHATDETAILS);
  //   } else {
  //     setModal(false)
  //   }
  // }

  function checkIfLiveChat(item) {
    if (item.type == filter) {
      return true;
    }
  }
  const filterLiveChat = () => {
    if (filter === 'null') {
      setLiveChatList(data);
    } else {
      setLiveChatList(data.filter(checkIfLiveChat));
    }
    // console.log('live chat data', liveChatList);
  };

  useEffect(() => {
    // console.log('PostData----------', PostData);
    //getAllLiveChatListByStarID()
    filterLiveChat();
  }, [data && data]);

  return (
    <>
      <View style={{ backgroundColor: 'black', minHeight: windowHight / 2 }}>
        <>
          {liveChatList.length != 0 ? (
            <>
              {liveChatList &&
                liveChatList.map((data, index) => (
                  <PostCard key={index} post={data} />
                ))}
            </>
          ) : (
            <>
              <NotAvailable
                description={
                  'Not Available ' + star?.first_name + ' ' + star?.last_name
                }
              />
            </>
          )}
        </>

        {/* <SafeAreaView style={styles.container} >
        <AlertModal modalObj={modalObj} modal={modal} setModal={setModal} buttoPress={applyNow} />
        <ScrollView style={{ marginBottom: "10%" }}>
  
          <View style={styles.topCard}>
            <Text style={styles.fonts}>Live Chat Instructions</Text>
            <View style={styles.lineImgView} >
              <Image style={styles.lineImg} source={imagePath.lineMeetup} />
            </View>
  
            <View>
              <Text style={styles.fontInstruction}>
                1. User can only chat with the superstar for minimum 1 minute to maximum 5 minutes.
  
                2. User should not insult superstar or speak about their personal topics. There should be no insults or blasphemy with a superstar.
  
                3. User should proofread the chat to superstar before sending it to superstar
  
                4. User should be friendly and cheerful with the star to maintain the conversation positive.
  
                5. User should maintain the basic Grammar, Spelling, and Use of Language with the superstar.
  
                6. User should be proactive but not intrusive.
  
  
              </Text>
            </View>
  
  
          </View>
  
          <View style={styles.topCard}>
            <Text style={styles.fonts}>Slot checking</Text>
            <View style={styles.lineImgView} >
              <Image style={styles.lineImg} source={imagePath.lineMeetup} />
            </View>
  
            <View>
              <Text style={styles.formText}>
                Live Chat date & time perfered <Text style={{ color: "#FFAD00" }}>({liveChatList?.length})</Text>
  
              </Text>
              <View style={styles.dropDownSlection}>
                <Picker
                  dropdownIconColor="white"
                  mode="dialog"
                  style={{ overflow: 'scroll' }}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
  
                    handelSelectLiveChat(itemValue)
                  }>
  
                  <Picker.Item
  
                    style={styles.itemPickerStyle}
                    label="Slect Live Chat"
                    value="null"
                  />
                  {liveChatList?.map((data, index) =>
  
                    <Picker.Item
                      key={index}
                      style={styles.itemPickerStyle}
                      label={data.title}
                      value={data.id}
                    />
  
                  )}
  
                </Picker>
              </View>
            </View>
  
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View>
                <Text style={styles.formText}>
                  Time Period
                </Text>
                <View style={styles.formText2}>
                  <TextInput onChangeText={newText => setTakeTime(newText)} keyboardType="numeric" style={styles.textInputStyle} placeholderTextColor=' rgb(124, 124, 124)' placeholder='Maximum 5 minute' />
                </View>
                <Text style={{ color: 'red' }}>{takeTieme > 5 ? "Maximum time 5 minutes" : ""} {takeTieme < 1 ? "Minimum time 1 minute" : ""}</Text>
              </View>
              <View>
                <Text style={styles.formText}>
                  <Text style={{ color: '#FFAD00' }}>{fee} / minute</Text>   Total Cost
  
                </Text>
                <View style={styles.TotalCost}>
                  <Text style={{ marginTop: 8 }} >{fee * takeTieme}</Text>
                </View>
              </View>
            </View>
  
            <View style={styles.textInputView}>
              <TouchableOpacity
                style={styles.textInputView3}
                onPress={handelCheckSlot}
  
              >
                <Text style={styles.textInputPass} >Check Slot</Text>
              </TouchableOpacity>
            </View>
  
  
  
          </View>
  
        </ScrollView>
  
  
  
      </SafeAreaView> */}
      </View>
    </>
  );
};

export default LiveChat;
