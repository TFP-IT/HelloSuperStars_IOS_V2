import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import PostCard from '../../../Components/Card/PostCard/PostCard';
import NotAvailable from '../../../Components/Reuseable/NotAvailable';
import { AuthContext } from '../../../Constants/context';

const Qna = ({ QnaData, star }) => {
  const [qnaList, setQnaList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { axiosConfig } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState('');
  const [takeTieme, setTakeTime] = useState(1);
  const [fee, setFee] = useState(0)
  const [modal, setModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: ''
  })
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

  function checkIfQna(item) {
    if (item.type == "qna") {
      return true;
    }
  }
  const filterQna = () => {
    setQnaList(QnaData && QnaData.filter(checkIfQna));
    //console.log('qnaList', qnaList);
  }

  useEffect(() => {

    //getAllQnaListByStarID()
    filterQna()
    // console.log('QnaData----------', QnaData);
    // console.log('qnaList----------', qnaList);
  }, [QnaData && QnaData]);

  // // get all live chat by star id
  // const getAllQnaListByStarID = () => {
  //   setBuffer(true)
  //   axios.get(AppUrl.QnaEventByStarId + data.star.id, axiosConfig)
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         setBuffer(false)
  //         setQnaList(res.data.livechats)

  //       }

  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       // alert('network problem')
  //     })
  // }

  // // live chat cost calculation
  // const handelSelectQna = (valu) => {
  //   if (valu != "null") {

  //     setSelectedValue(valu)

  //     let slectItem = qnaList.filter((element) => {
  //       return element.id === valu;
  //     })
  //     setSelectedQna(slectItem[0])
  //     setSelectedChat(slectItem[0])
  //     setFee(slectItem[0].fee)
  //   }

  // }


  // //check slot 
  // const handelCheckSlot = () => {
  //   if (takeTieme > 5 || takeTieme < 1) {
  //     alert(error)

  //   } else {
  //     setBuffer(true)
  //     axios.get(AppUrl.QnaSlotChecking + takeTieme + '/' + selectedChat.id, axiosConfig)
  //       .then((res) => {
  //         if (res.data.status === 200) {
  //           setBuffer(false)
  //           if (res.data.available) {
  //             setModal(true)
  //             setModalObj({
  //               modalType: 'success',
  //               buttonTitle: 'Pay Now',
  //               message: res.data.message,
  //               available: res.data.available
  //             })
  //           } else {
  //             setModal(true)
  //             setModalObj({
  //               modalType: 'warning',
  //               buttonTitle: 'Try Agin',
  //               message: res.data.message,
  //               available: res.data.available
  //             })
  //           }
  //         }

  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         // alert('network problem')
  //       })
  //   }
  // }

  return (

    <>
      <View style={{ backgroundColor: 'black', minHeight: windowHight / 2 }}>

        <>
          {qnaList == 0 ?
            <>
              <NotAvailable description={"There is no Question & Answer from  " + star?.first_name + " " + star?.last_name} />
            </>
            :
            <>
              {qnaList && qnaList.map((data, index) => (
                <PostCard key={index} post={data} />
              ))}
            </>
          }
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
                Live Chat date & time perfered <Text style={{ color: "#FFAD00" }}>({qnaList?.length})</Text>
  
              </Text>
              <View style={styles.dropDownSlection}>
                <Picker
                  dropdownIconColor="white"
                  mode="dialog"
                  style={{ overflow: 'scroll' }}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
  
                    handelSelectQna(itemValue)
                  }>
  
                  <Picker.Item
  
                    style={styles.itemPickerStyle}
                    label="Slect Live Chat"
                    value="null"
                  />
                  {qnaList?.map((data, index) =>
  
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
  )















}

export default Qna

