import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CostComp from '../../../Components/GLOBAL/CostComp/CostComp';
import InstructionComp from '../../../Components/GLOBAL/InstructionComp/InstructionComp';
import LoaderComp from '../../../Components/LoaderComp';
import MinimumApplyComp from '../../../Components/GLOBAL/MinimumApplyComp/MinimumApplyComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import NotAvailable from '../../../Components/GLOBAL/Reuseable/NotAvailable';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import { styles } from './styles.js';

const Greetings = ({ setProfileNavigate, star_id }) => {
  // console.log('-----star_id--------', star_id)
  const [date, setDate] = useState(new Date());
  // const [greetings, setGreetings] = useState({});
  // const [greeting, setGreetingRegistration] = useState({});
  // const [isThisStarHaveGreeting, setIsThisStarHaveGreeting] = useState(false);
  // const [greeting, setIsRegisteredAlready] = useState(false);
  const [buffer, setBuffer] = useState(true);
  const { axiosConfig } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [greeting, setGreeting] = useState(null);
  const [startMinDate, setStartMinDate] = useState(new Date());
  const [isStarGiveGreeting, setIsStarGiveGreeting] = useState(false);
  const [purposeList, setPurposeList] = useState([]);
  const [submitted, setSubmitted] = useState(null);

  const [GreetingInfo, setGreetingInfo] = useState({});
  const [star, setStar] = useState({});
  let d = new Date();

  const [status, setStatus] = useState({
    action: true,
    msg: 'Pending',
  });

  const [inputData, setInputData] = useState({
    purpose: '',
    time: date,
    greetings_id: GreetingInfo ? GreetingInfo.id : '',
    error_list: [],
  });

  // this modal object is for modal content
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
  });

  useEffect(() => {
    StarGreetingsStatus();
    GreetingsRegStatus();
    getPurposeList();
  }, []);

  const GreetingsRegStatus = () => {
    axios
      .get(AppUrl.GreetingRegistrationStatus + star_id, axiosConfig)
      .then(res => {
        if (res.data?.status === 200) {
          setGreeting(res.data.greeting);

          setInputData({
            ...inputData,
            purpose: res.data.greeting?.purpose,
          });
          if (res.data.greeting?.status === 0) {
            setStatus({
              ...status,
              msg: 'Pending',
            });
            // setcheck(true)
          } else {
            // setStatus({
            //   ...status,
            //   msg: 'Approved'
            // })
          }
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  const StarGreetingsStatus = () => {
    axios
      .get(AppUrl.GreetingStarStatus + star_id, axiosConfig)
      .then(res => {
        if (res.data?.status === 200) {
          setStar(res.data.star);
          setIsStarGiveGreeting(res.data.action);
          setGreetingInfo(res.data.greeting);

          console.log('greetings data -----', res.data.greeting);
          if (
            res.data.greeting.user_required_day !== null &&
            res.data.greeting.user_required_day > 0
          ) {
            d.setDate(d.getDate() + res.data.greeting.user_required_day);
            setStartMinDate(d);
            setDate(d);
            setStartTime(d);
          }
          setBuffer(false);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };
  const getPurposeList = () => {
    axios
      .get(AppUrl.GetGreetingPurposeList, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setPurposeList(res.data.greetingTypes);
        }
      })
      .catch(err => {
        setBuffer(false);
        console.log(err);
      });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  function handleApply() {
    setSubmitted(true);
    console.log(inputData);
    if (!greeting) {
      if (inputData?.purpose) {
        setBuffer(true);
        axios
          .post(AppUrl.GreetingRegistration, inputData, axiosConfig)
          .then(res => {
            if (res.data.status === 200) {
              // setProfileNavigate('GreetingRegistration')
              setGreeting(res.data.greeting);
              setBuffer(false);
            }
          })
          .catch(err => {
            setBuffer(false);
            console.log(err);
          });
      } else {
      }
    } else {
    }
  }
  function handleRetryOrDelete() {
    if (greeting && !greeting.notification_at) {
      setModalObj({
        modalType: 'warningGreetings',
        buttonTitle: 'Delete',
        message: 'You Greetings will be deleted',
      });
      setModal(true);
    } else {
    }
  }

  const modalButtonPress = () => {
    setModal(false);
    if (greeting) {
      if (greeting && greeting.notification_at !== null) {
        StarGreetingsStatus();
        GreetingsRegStatus();
      }
      if (greeting && greeting.notification_at === null) {
        setBuffer(true);

        axios
          .get(AppUrl.GreetingRegistrationDelete + greeting.id, axiosConfig)
          .then(res => {
            setBuffer(false);
            if (res.data?.status === 200) {
              GreetingsRegStatus();
              setModalObj({
                modalType: 'successGreetings',
                buttonTitle: 'Ok',
                message: 'Your Greetings Delete Successfully',
              });
              setModal(true);
            }
          })
          .catch(err => {
            setBuffer(false);
            console.log(err);
          });
      }
    } else {
    }
  };

  // console.log('greeting-------------', greeting)
  return (
    <>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalButtonPress}
      />
      {buffer ? (
        <LoaderComp />
      ) : (
        <>
          {isStarGiveGreeting ? (
            <ScrollView>
              <View style={styles.greetingsBody}>
                <View style={styles.greetingsRequest}>
                  <Heading heading="Greetings Request" />
                  <UnderlineImage />
                  <View style={{ margin: 13 }}>
                    {GreetingInfo.video != null ? (
                      <VideoPlayer
                        video={{
                          uri: `${AppUrl.MediaBaseUrl + GreetingInfo.video}`,
                        }}
                        videoWidth={120}
                        videoHeight={70}
                        thumbnail={
                          GreetingInfo.banner
                            ? {
                              uri: AppUrl.MediaBaseUrl + GreetingInfo.banner,
                            }
                            : imagePath.greetingStar
                        }
                        resizeMode={'stretch'}
                      />
                    ) : (
                      <>
                        <Image
                          style={styles.requestImg}
                          source={imagePath.greetingStar}
                          resizeMode="stretch"
                        />
                        <Image
                          style={{
                            position: 'absolute',
                            left: '48%',
                            top: '40%',
                          }}
                          source={imagePath.greetingsPauseCircle}
                        />
                      </>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#282828',
                    margin: 10,
                    borderRadius: 5,
                    fontSize: 20,
                    height: 40,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFAD00',
                      fontSize: 18,
                      textAlign: 'center',
                    }}>
                    {GreetingInfo?.title}
                  </Text>
                  <UnderlineImage />
                </View>
                {/* Instruction */}
                <InstructionComp
                  title="Greetings Instructions"
                  instruction={GreetingInfo.instruction}
                />
                {/* Cost */}
                <CostComp
                  title="Cost of the greeting"
                  amount={GreetingInfo.cost}
                />
                {/* Minimum Apply before */}
                <MinimumApplyComp amount={GreetingInfo.user_required_day} />

                <View style={styles.greetingsRequest}>
                  <Heading heading="Apply" />
                  <UnderlineImage />
                  <View style={{ margin: 13, borderRadius: 15 }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View style={{ flex: 1, margin: 10 }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            marginBottom: 12,
                          }}>
                          Greetings receiving date and time
                        </Text>
                        <View>
                          <TouchableOpacity onPress={() => setOpen(true)}>
                            <Text
                              style={{
                                justifyContent: 'center',
                                height: 50,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: 'gray',
                                textAlign: 'center',
                                color: 'gray',
                                paddingTop: 15,
                              }}>
                              {moment(
                                greeting?.request_time != null
                                  ? new Date(moment(greeting?.request_time))
                                  : startTime,
                              ).format('D MMM YYYY h:mm:ss A')}
                            </Text>
                          </TouchableOpacity>

                          <DatePicker
                            modal
                            minimumDate={startMinDate}
                            open={open}
                            theme="light"
                            date={
                              greeting?.request_time != null
                                ? new Date(moment(greeting?.request_time))
                                : startTime
                            }
                            mode="datetime"
                            onConfirm={date => {
                              setInputData({
                                ...inputData,
                                time: date,
                                greetings_id: GreetingInfo
                                  ? GreetingInfo.id
                                  : '',
                              });

                              setOpen(false);
                              setDate(date);
                              setStartTime(date);
                            }}
                            onCancel={() => {
                              setOpen(false);
                            }}
                          />
                        </View>
                        {/* Greeting Purpose */}
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            marginBottom: 12,
                            marginTop: 15,
                          }}>
                          Greeting Purpose
                        </Text>
                        <View
                          style={{
                            justifyContent: 'center',
                            height: 50,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: 'gray',
                            textAlign: 'center',
                            color: 'gray',
                          }}>
                          <Picker
                            itemStyle={{
                              justifyContent: 'center',
                              height: 50,
                              borderWidth: 1,
                              borderRadius: 10,
                              borderColor: 'gray',
                              textAlign: 'center',
                              color: 'gray',
                              paddingTop: 10,
                            }}
                            style={{
                              justifyContent: 'center',
                              height: 50,
                              borderWidth: 1,
                              borderRadius: 10,
                              borderColor: 'gray',
                              textAlign: 'center',
                              color: 'gray',
                              paddingTop: 10,
                            }}
                            dropdownIconColor="white"
                            mode="dialog"
                            selectedValue={inputData?.purpose}
                            onValueChange={(itemValue, itemIndex) =>
                              setInputData({
                                ...inputData,
                                purpose: itemValue ? itemValue : null,
                                greetings_id: GreetingInfo
                                  ? GreetingInfo.id
                                  : '',
                              })
                            }>
                            <Picker.Item
                              key={1}
                              label={'Choose One'}
                              value={''}
                            />
                            {purposeList.map(purposeList => {
                              return (
                                <Picker.Item
                                  key={purposeList.greeting_type}
                                  label={purposeList.greeting_type}
                                  value={purposeList.greeting_type}
                                />
                              );
                            })}
                          </Picker>
                        </View>
                        {submitted && !inputData.purpose && (
                          <View>
                            <Text
                              style={{
                                color: '#df3e54',
                                margin: 5,
                                fontSize: 14,
                                textAlign: 'center',
                              }}>
                              Please Select Purpose
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Pressable
                        onPress={() => handleApply()}
                        style={[
                          {
                            backgroundColor: greeting ? '#00ff00' : '#ff0',
                            borderRadius: 10,
                          },
                          styles.button,
                        ]}>
                        <Text
                          style={
                            (styles.text, { textAlign: 'center', padding: 8 })
                          }>
                          {greeting ? 'Already Applied !' : 'Apply'}
                        </Text>
                      </Pressable>
                      {greeting && (
                        <Pressable
                          onPress={() => handleRetryOrDelete()}
                          style={[
                            {
                              backgroundColor: greeting ? '#df3e54' : '#ff0',
                              borderRadius: 10,
                            },
                            styles.button,
                          ]}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: 'white',
                              textAlign: 'center',
                              padding: 8,
                            }}>
                            {greeting && 'Delete'}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>

                {greeting ? (
                  <View style={styles.greetingsRequest}>
                    <Heading heading="Greeting Status" />
                    <UnderlineImage />
                    <View style={{ margin: 13, borderRadius: 15 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                          <Text style={styles.text}>Applied on:</Text>
                          <Text style={styles.text}>Target date:</Text>
                          <Text style={styles.text}>Status:</Text>
                        </View>

                        <View style={{ flex: 2, alignItems: 'space-between' }}>
                          <Text style={styles.text}>
                            {moment(greeting.created_at).format('D MMMM, YYYY')}
                          </Text>
                          <Text style={styles.text}>
                            {moment(greeting.request_time).format(
                              'D MMMM YYYY',
                            )}
                          </Text>
                          <Text style={styles.text}>{status.msg}</Text>
                        </View>
                      </View>

                      <View
                        style={{ flexDirection: 'row', marginTop: 10 }}></View>
                    </View>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          ) : (
            <NotAvailable
              description={
                'There is no option to get greeting from ' +
                star?.first_name +
                ' ' +
                star?.last_name
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default Greetings;
