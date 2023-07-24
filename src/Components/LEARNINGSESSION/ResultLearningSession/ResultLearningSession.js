import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../../Constants/imagePath';
import HeaderComp from '../../HeaderComp';

import axios from 'axios';
import { useEffect } from 'react';
import { AuthContext } from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp';

import navigationStrings from '../../../Constants/navigationStrings';

const ResultLearningSession = ({ route }) => {
  const Navigation = useNavigation();

  const { event } = route.params;
  console.log(event);
  const { axiosConfig } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);
  const [markedVideos, setMarkedVideos] = useState([]);
  const [rejectedVideos, setRejectedVideos] = useState([]);
  const [totalMark, setTotalMark] = useState(0);
  let total = 0;

  useEffect(() => {
    getResult();
  }, []);
  let getResult = async () => {
    setBuffer(true);
    let res = await axios
      .get(AppUrl.LearningSessionResult + `${event.slug}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setBuffer(false);
          setMarkedVideos(res.data.markedVideos);
          setRejectedVideos(res.data.rejectedVideos);
          //console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  };
  /**
   * total mark count
   */
  const getTotalNumber = mark => {
    setTotalMark(mark + totalMark);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderComp />
      <View style={styles.bannerTitle}>
        <ImageBackground
          style={styles.background}
          source={
            event.banner
              ? { uri: `${AppUrl.MediaBaseUrl + event.banner}` }
              : imagePath.videoPlayIcon
          }>
          <View></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <Text
              style={{
                color: '#ddd',
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center',
              }}>
              {event.title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      {buffer ? (
        <LoaderComp />
      ) : (
        <>
          {markedVideos.length != 0 ? (
            <>
              {markedVideos.map((item, index) => {
                {
                  total += item.mark;
                }
                return (
                  <View style={styles.topCard} key={index}>
                    <View
                      style={{
                        flex: 1,
                        margin: 8,
                        backgroundColor: '#343434',
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      {/* <Image source={imagePath.Rectangle} style={styles.AudiImg} /> */}
                      <View style={{ padding: 10 }}>
                        <VideoPlayer
                          video={{
                            uri: `${AppUrl.MediaBaseUrl + item.video}`,
                          }}
                          videoWidth={100}
                          videoHeight={70}
                          autoplay={false}
                          pauseOnPress
                          // hideControlsOnStart
                          resizeMode="contain"
                          onStart={() => setVideoLoad(true)}
                          onLoad={() => setVideoLoad(false)}
                          thumbnail={imagePath.videoPlayIcon}
                        />
                      </View>

                      <View style={styles.VideoTax}>
                        <View style={styles.flexMark}>
                          <Image
                            source={imagePath.Rectangle3}
                            style={styles.AudiImg2}
                          />
                          <Text style={{ color: '#fff', marginHorizontal: 4 }}>
                            Mark
                          </Text>
                        </View>
                        <View style={styles.flexMark}>
                          <Text style={{ color: '#fff' }}>
                            {Math.floor(item.mark)}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}

              <View style={styles.Card}>
                <View>
                  <Image
                    source={imagePath.Rectangle4}
                    style={styles.AudiImgCard}
                  />
                </View>
                <View>
                  <Text style={styles.Input}>Your total marks</Text>
                </View>
                <View>
                  <Text style={styles.Input1}>
                    {total / event?.assignment_video_slot_number}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{ backgroundColor: '#000000' }}
                onPress={() =>
                  Navigation.navigate(
                    navigationStrings.APPLYFORCERLEARNINGSESSION,
                    {
                      slug: event?.slug,
                      fee: event?.assignment_fee,
                      id: event?.id,
                    },
                  )
                }>
                <LinearGradient
                  colors={['#FFAD00', '#E19A04', '#FACF75']}
                  style={styles.CardA}>
                  <Text style={styles.CardTex}>Apply for the certificate</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : rejectedVideos.length != 0 ? (
            <>
              {rejectedVideos.map((item, index) => {
                {
                  total += item.mark;
                }
                return (
                  <>
                    <View style={styles.topCard} key={index}>
                      <View
                        style={{
                          flex: 1,
                          margin: 8,
                          backgroundColor: '#343434',
                          borderRadius: 10,
                          overflow: 'hidden',
                        }}>
                        {/* <Image source={imagePath.Rectangle} style={styles.AudiImg} /> */}
                        <View style={{ padding: 10 }}>
                          <VideoPlayer
                            video={{
                              uri: `${AppUrl.MediaBaseUrl + item.video}`,
                            }}
                            videoWidth={100}
                            videoHeight={70}
                            autoplay={false}
                            pauseOnPress
                            // hideControlsOnStart
                            resizeMode="contain"
                            onStart={() => setVideoLoad(true)}
                            onLoad={() => setVideoLoad(false)}
                            thumbnail={imagePath.videoPlayIcon}
                          />
                        </View>
                        {videoLoad && (
                          <View
                            style={{
                              position: 'absolute',
                              marginTop: 20,
                              marginLeft: 15,
                            }}>
                            <Image
                              source={imagePath.loadingBuffering}
                              style={{ height: 20, width: 20 }}
                            />
                          </View>
                        )}

                        <View style={styles.VideoTax}>
                          <View style={styles.flexMark}>
                            <Image
                              source={imagePath.Rectangle3}
                              style={styles.AudiImg2}
                            />
                            <Text style={{ color: '#fff', marginHorizontal: 4 }}>
                              Mark
                            </Text>
                          </View>
                          <View style={styles.flexMark}>
                            <Text style={{ color: '#fff' }}>
                              {Math.floor(item.mark)}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
              <View
                style={{
                  backgroundColor: '#282828',
                  margin: 8,
                  flexDirection: 'row',
                  borderRadius: 5,
                  padding: 10,
                  textAlign: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      backgroundColor: 'black',
                      color: 'red',
                      textAlign: 'center',
                      padding: 10,
                    }}>
                    Your Video is rejected
                  </Text>
                </View>
                <View></View>
              </View>
            </>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Image
                source={imagePath.lazyDog}
                style={{ height: 150, width: 150 }}
              />
              <Text style={{ color: '#FFAD00', fontSize: 20 }}>
                Result not published yet !
              </Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flexMark: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 15,
  },
  bannerTitle: {
    margin: 8,
    backgroundColor: '#343434',
    padding: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  singleLearningStyle: {
    backgroundColor: '#000',
    borderRadius: 100,
    paddingHorizontal: 11,
    paddingVertical: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,

    // padding: 10,
  },
  linearGradient: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  learningRow: {
    flexDirection: 'row',
    padding: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundOneText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  roundText: {
    backgroundRadius: 50,
  },
  resizeImage: {
    // width: 50h
    height: 40,
  },
  listParent: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#343434',
    padding: 5,
    borderRadius: 20,
  },
  listParentCopy: {
    // flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#343434',
    padding: '8%',
    borderRadius: 20,
  },
  onLeft: {
    flex: 1,
  },
  participationText: {
    color: '#ffad00',
    fontSize: 17,
  },
  middleOne: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textColor: {
    color: '#ddd',
    textAlign: 'center',
  },
  textColorCenter: {
    textAlign: 'center',
    color: '#ddd',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageBg: {
    flexDirection: 'row',
  },
  imageBgStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'gold',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeBgColor: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    position: 'absolute',
    left: '70%',
  },
  background: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderWidth: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textCenter: {
    backgroundColor: 'rgba(196, 196, 196, 0.78)',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTitle: {
    flexDirection: 'row',
    fontSize: 15,
    alignItems: 'center',
    height: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
  },
  roundImage: {
    flexDirection: 'row',
  },
  roundOne: {
    flex: 1,
    margin: 5,
    // width: 200,
    height: 120,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  roundOneSize: {
    // width: 200,
    // height: 100,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 5,
  },
  VideoT: {
    flexDirection: 'row',
    marginTop: 10,

    // margin:8,
  },
  AudiImg: {
    // margin: ,
    width: 50,
    width: '100%',
  },
  VideoTax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 5,
  },
  AudiImg2: {
    width: 18,
    height: 18,
    marginHorizontal: 5,
    marginBottom: 5,
    // marginTop: 8,
  },
  TextW: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'gold',
    textAlign: 'center',
    padding: 2,
    fontSize: 12,
  },
  ImgVideo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  Card: {
    backgroundColor: '#282828',
    margin: 8,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  AudiImgCard: {
    width: 25,
    height: 30,
    marginTop: 5,
  },
  Input: {
    backgroundColor: 'black',
    color: 'white',
    width: 140,
    height: 40,
    textAlign: 'center',
    paddingTop: 10,
  },
  Input1: {
    paddingTop: 10,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    width: 50,
    height: 40,
  },
  Input2: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 110,
    paddingHorizontal: 5,
    paddingVertical: 6,
    fontSize: 9.5,
    height: 40,
  },
  Input3: {
    backgroundColor: 'black',
    color: '#FFC957',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 110,
    paddingHorizontal: 5,
    paddingVertical: 6,
    fontSize: 9.5,
    height: 40,
  },
  CardA: {
    margin: 8,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  CardTex: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },

  LastZ: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextG: {
    color: '#79EC66',
    paddingVertical: 10,
  },
  CardTexG: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    width: 100,
    paddingHorizontal: 15,
  },
});

export default ResultLearningSession;
