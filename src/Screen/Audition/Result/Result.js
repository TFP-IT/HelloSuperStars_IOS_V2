import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import HeaderComp from '../../../Components/HeaderComp';
import AppealRequestModal from '../../../Components/MODAL/AppealRequestModal';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';
import RoundTopBanner from '../Round1/RoundTopBanner';
import AfterRound5 from './AfterRound5';
import styles from './styles';
import RequestPending from '../../../Components/AUDITION/UpcomingAudition/RequestPending';
import CustomModal from '../../../Components/MODAL/CustomModal';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import Toast from 'react-native-root-toast';
import TitleHeader from '../../../Components/TitleHeader';
import { FlatGrid } from 'react-native-super-grid';
const Result = ({ route }) => {
  const {
    roundName,
    auditionTitle,
    auditionImage,
    remainingTime,
    auditionId,
    roundId,
    roundInformation,
  } = route.params;
  const Navigation = useNavigation();
  const [show, setShow] = useState(false);
  const { axiosConfig } = useContext(AuthContext);
  console.log('roundInformation', roundInformation);

  const [customShow, setCustomShow] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(true);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [isShowPaymentCompAppeal, setIsShowPaymentCompAppeal] = useState(false);

  const [appeal, setAppeal] = useState(false);
  const [apply, setApply] = useState(false);
  function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
  }

  const [videoList, setVideoList] = React.useState([]);
  const [appealVideoList, setAppealVideoList] = useState([]);
  const [markTracking, setMarkTracking] = useState({});
  const [appealMarkTracking, setAppealMarkTracking] = useState(null);

  const [isAppealedForThisRound, setIsAppealedForThisRound] = useState(false);
  const [appealedRegistration, setAppealedRegistration] = useState(null);
  const [appealedPaid, setAppealPaid] = useState(null);
  const [certificateFee, setCertificateFee] = useState([]);
  const [roundInfo, setRoundInfo] = useState(null);

  const [videoType, setVideoType] = useState('general');
  useEffect(() => {
    axios
      .get(`${AppUrl.roundInstruction}${auditionId}/${roundId}`, axiosConfig)
      .then(res => {
        setRoundInfo(res.data.roundInfo);
        console.log('appeal_fee', res.data.roundInfo?.appeal_fee);
      });
  }, []);
  const downloadCertificate = () => {
    console.log(AppUrl.downloadAuditionCertificate + auditionId + roundId);
    axios
      .get(
        `${AppUrl.downloadAuditionCertificate}${auditionId}/${roundId}`,
        axiosConfig,
      )
      // axios
      //   .get(
      //     `http://192.168.0.103/HelloSuperStarsBackend-2/public/api/user/audition/getAuditionCertificate/3/17`,
      //     axiosConfig,
      //   )
      .then(res => {
        //console.log(res.data);
        Linking.openURL(`${AppUrl.MediaBaseUrl}${res.data.certificateURL}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchUploadedVideo = () => {
    axios
      .get(
        AppUrl.getUploadedRoundVideo + auditionId + '/' + roundId,
        axiosConfig,
      )
      .then(res => {
        if (res.data.status === 200) {
          setVideoList(res?.data?.videos);
          setAppealVideoList(res?.data?.appeal_videos);
          setMarkTracking(res?.data?.auditionRoundMarkTracking);
          setAppealMarkTracking(res?.data?.appealAuditionRoundMarkTracking);
          setIsPaymentComplete(res?.data?.isPaymentCompleted);
          setCertificateFee(res?.data?.certificateFee?.fee);
          console.log('res?.data?.certificateFee ', res?.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUploadedVideo();
    checkIsAppealForRound();
  }, [auditionId, roundId]);

  useEffect(() => {
    fetchUploadedVideo();
    checkIsAppealForRound();
  }, [isAppealedForThisRound]);

  const checkIsAppealForRound = () => {
    axios
      .get(AppUrl.isAppealRound + auditionId + '/' + roundId, axiosConfig)
      .then(res => {
        if (res?.data?.status === 200) {
          setIsAppealedForThisRound(res?.data?.isAppealedForThisRound);
          if (res?.data?.isAppealedForThisRound == true) {
            setAppealedRegistration(res?.data?.appealedRegistration);
          }
        }
      });
  };

  const handleAppealedVideo = () => {
    if (appealedRegistration?.id) {
      setVideoType('appeal');
    }
  };

  const handleGeneralVideo = () => {
    setVideoType('general');
  };
  const handleAppealRegister = () => {
    setIsShowPaymentCompAppeal(true);
    return;
    console.log('------------appealing-----------');
    setShow(true);
    const data = {
      audition_id: auditionId,
      round_info_id: roundId,
    };
    axios.post(AppUrl.AppealRegistration, data, axiosConfig).then(res => {
      //console.log(res.data);
      if (res?.data?.status === 200) {
      } else if (res?.data?.status === 422) {
        setErrorList(res?.data?.validation_errors);
      } else {
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* Home Page 39 */}

      <HeaderComp backFunc={() => Navigation.goBack()} />

      <ScrollView>
        <RoundTopBanner
          title={`AUDITION ${roundName} ROUND ENDING TIME`}
          RoundName={roundName}
          auditionTitle={auditionTitle}
          auditionImage={auditionImage}
          remainingTime={remainingTime}
        />
        {isEmptyObject(markTracking) === 0 ? (
          <View style={styles.topCard}>
            <Text style={{ color: 'white', fontSize: 22, margin: 50 }}>
              Result is not published yet
            </Text>
          </View>
        ) : (
          <>
            {roundInformation.round_type === 1 ? (
              <AfterRound5
                RoundName={roundName}
                auditionId={auditionId}
                roundId={roundId}
              />
            ) : (
              <>
                <TitleHeader title={'Your Upload videos'} />
                <View style={styles.topCard}>
                  {/* <Text
                  style={styles.fonts}
                  onPress={() => {
                    console.log('-----------------');
                    console.log('-----------------markTracking', markTracking);
                    console.log(videoList);
                    console.log(appealVideoList);
                    console.log(
                      '-----------------appealMarkTracking',
                      appealMarkTracking,
                    );

                    console.log('------------------');

                    console.log('Appealed Register', appealedRegistration);
                  }}>
                  Your Uploaded videos
                </Text>
                <UnderlineImage /> */}

                  <View style={styles.VideoT}>
                    {videoList.length != 0 ? (
                      <FlatGrid
                        spacing={10}
                        itemDimension={120}
                        data={videoList}
                        renderItem={({ item, index }) => (
                          <>
                            <View style={{ width: '100%' }}>
                              <VideoPlayer
                                video={{
                                  uri: `${AppUrl.MediaBaseUrl + item.video}`,
                                }}
                                videoWidth={200}
                                videoHeight={200}
                                autoplay={false}
                                pauseOnPress
                                hideControlsOnStart
                                resizeMode="stretch"
                                thumbnail={imagePath.AuditionTitleBanner}
                              />
                            </View>
                          </>
                        )}
                      />
                    ) : null}
                    {/* {videoList.map((item, index) => {
                      return (
                        <>
                          <View style={{width: '30%'}}>
                            <VideoPlayer
                              video={{
                                uri: `${AppUrl.MediaBaseUrl + item.video}`,
                              }}
                              videoWidth={100}
                              videoHeight={100}
                              autoplay={false}
                              pauseOnPress
                              hideControlsOnStart
                              resizeMode="stretch"
                              thumbnail={imagePath.AuditionTitleBanner}
                            />
                          </View>
                        </>
                      );
                    })} */}
                  </View>
                </View>
              </>
            )}
            {isAppealedForThisRound &&
              markTracking.wining_status === 0 &&
              appealVideoList.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <View style={styles.topCard}>
                    <Text
                      style={styles.fonts}
                      onPress={() => {
                        // console.log('-----------------');
                        // console.log(markTracking);
                        // console.log(videoList);
                        // console.log(appealVideoList);
                        // console.log(appealMarkTracking);
                        // console.log('------------------');
                        // console.log('Appealed Register', appealedRegistration);
                      }}>
                      Your Appeal uploaded videos
                    </Text>
                    <UnderlineImage />
                    <View style={styles.VideoT}>
                      {appealVideoList.map((item, index) => {
                        return (
                          <>
                            <View style={{ width: '30%' }}>
                              <VideoPlayer
                                video={{
                                  uri: `${AppUrl.MediaBaseUrl + item.video}`,
                                }}
                                videoWidth={100}
                                videoHeight={100}
                                autoplay={false}
                                pauseOnPress
                                hideControlsOnStart
                                resizeMode="stretch"
                                thumbnail={imagePath.AuditionTitleBanner}
                              />
                            </View>
                          </>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}

            {markTracking ? (
              <>
                <View style={styles.Card}>
                  <View>
                    <Image
                      source={imagePath.Rectangle4}
                      style={styles.AudiImgCard}
                    />
                  </View>
                  <View>
                    <Text style={styles.Input}>
                      {markTracking?.type === 'general'
                        ? 'Your Total Mark '
                        : markTracking?.type === 'wildcard'
                          ? 'Your Total Video Feed Vote'
                          : appealMarkTracking
                            ? 'Your Appeal Mark'
                            : 'Your Total Mark'}
                    </Text>
                  </View>

                  {appealMarkTracking?.avg_mark >= 0 ? (
                    <Text style={styles.markText}>
                      {appealMarkTracking?.avg_mark}
                    </Text>
                  ) : markTracking === null ? (
                    <Text style={styles.markText}>--</Text>
                  ) : (
                    <Text style={styles.markText}>
                      {markTracking?.avg_mark}
                    </Text>
                  )}

                  <View style={{}}>
                    <View
                      style={{
                        backgroundColor: '#000000',

                        justifyContent: 'center',
                        alignItems: 'center',

                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: 110,

                        paddingHorizontal: 5,
                        paddingVertical: 6,
                        fontSize: 13,
                        height: 40,
                      }}>
                      {(markTracking?.wining_status === 1 &&
                        markTracking?.type === 'general') ||
                        appealMarkTracking?.wining_status === 1 ? (
                        <>
                          {/* <Text style={{color: '#E19A04'}}>
                          Congratulation!!!
                        </Text> */}
                          <Text style={styles.winingCard}>
                            You are Winner {'\n'}for the Round
                          </Text>
                        </>
                      ) : markTracking?.wining_status === 1 &&
                        markTracking?.type === 'wildcard' ? (
                        <>
                          <Text style={styles.winingCard}>
                            You are Winner {'\n'}for via wildcard
                          </Text>
                        </>
                      ) : markTracking?.wining_status === 1 &&
                        markTracking?.type === 'oxygen' ? (
                        <>
                          <Text style={styles.winingCard}>
                            You are Winner {'\n'}for via Oxygen
                          </Text>
                        </>
                      ) : markTracking?.wining_status === 0 &&
                        markTracking?.type === 'rejected' ? (
                        <>
                          <Text style={styles.Input2}>
                            You are not Winner {'\n'}for the Round
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.Input2}>
                            You are not Winner {'\n'}for the Round
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
                {markTracking?.wining_status === 1 ||
                  appealMarkTracking?.wining_status === 1 ? (
                  isPaymentComplete ? (
                    <TouchableOpacity
                      style={{ backgroundColor: '#000000' }}
                      onPress={() => {
                        downloadCertificate();
                      }}>
                      <LinearGradient
                        colors={['#FFAD00', '#E19A04', '#FACF75']}
                        style={styles.CardA}>
                        <Text style={styles.CardTex}>
                          Download Your Certificate
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ backgroundColor: '#000000' }}
                      onPress={() => {
                        certificateFee
                          ? setIsShowPaymentComp(true)
                          : Toast.show(
                            'Certificate not ready yet',
                            Toast.durations.SHORT,
                          );
                      }}>
                      <LinearGradient
                        colors={['#FFAD00', '#E19A04', '#FACF75']}
                        style={styles.CardA}>
                        <Text style={styles.CardTex}>
                          Apply for Certificate
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                ) : isAppealedForThisRound || appealedPaid ? (
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    Already appealed in this round
                  </Text>
                ) : roundInfo?.round_type === 0 && roundInfo?.appeal === 1 ? (
                  <TouchableOpacity
                    style={{ backgroundColor: '#000000' }}
                    onPress={() => {
                      handleAppealRegister();
                    }}>
                    <LinearGradient
                      colors={['#FFAD00', '#E19A04', '#FACF75']}
                      style={styles.CardA}>
                      <Text style={styles.CardTex}>Appeal Request</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : (
              <View style={styles.topCard}>
                <Text style={{ color: 'white', fontSize: 22, margin: 50 }}>
                  Result is not published yet
                </Text>
              </View>
            )}

            <AppealRequestModal
              appeal={appeal}
              setAppeal={setAppeal}
              show={show}
              setShow={setShow}
            />

            {/*========= this modal for after round 5=========  */}
            <CustomModal
              setAppeal={setAppeal}
              customShow={customShow}
              setCustomShow={setCustomShow}
              RoundName={roundName}
            />

            {/* <RegisPaymentModal
          eventType="generalpost"
          modelName="generalpost"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          eventId={post_id}
          fee={fee}
          setUnlocked={setUnlocked}
        /> */}

            {isShowPaymentComp && (
              <RegisPaymentModal
                eventType="auditionCertificate"
                modelName="auditionCertificate"
                eventId={roundInfo?.id}
                isShowPaymentComp={isShowPaymentComp}
                setIsShowPaymentComp={setIsShowPaymentComp}
                setIsPaymentComplete={setIsPaymentComplete}
                fee={certificateFee}
              />
            )}

            {isShowPaymentCompAppeal && (
              <RegisPaymentModal
                eventType="auditionAppeal"
                eventId={roundInfo.id}
                modelName="auditionAppeal"
                isShowPaymentCompAppeal={isShowPaymentCompAppeal}
                setIsShowPaymentCompAppeal={setIsShowPaymentCompAppeal}
                fee={roundInfo?.appeal_fee}
                setAppealPaid={setAppealPaid}
              />
            )}

            {/* <Button title='yo button' onPress={()=>Navigation.navigate(navigationStrings.VOTING)} /> */}

            {/* Home Page 39  end*/}
          </>
        )}
        {/* ====================here i props round names and give conditions======================== */}

        {/* Home Page 40 */}
      </ScrollView>
    </View>
  );
};

export default Result;
