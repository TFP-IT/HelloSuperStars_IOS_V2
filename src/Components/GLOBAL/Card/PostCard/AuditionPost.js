import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import React, { useContext, useState } from 'react';

import {
  Dimensions,
  Image,
  Share,
  Text, TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import imagePath from '../../../../Constants/imagePath';
import navigationStrings from '../../../../Constants/navigationStrings';
import AppUrl from '../../../../RestApi/AppUrl';
// import noImage from '../../../Assets/Images/no-image.png';

import { AuthContext } from '../../../../Constants/context';

import LockPaymentModal from '../../../MODAL/LockPaymentModal';
import styles from './styles';

const AuditionPost = ({ post, callform = null }) => {
  const { width } = useWindowDimensions();

  const { useInfo, axiosConfig } = useContext(AuthContext);

  const Navigation = useNavigation();

  const [share, setShare] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const [lockModal, setLockModal] = useState(false);


  const postLock = true;




  //got to profile
  function handleStarProfile(star = null) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: star,
    });
  }



  let postContent = {};

  const [contentHeight, setContentHeight] = useState(true);


  let timeIdentity = '';



  //post content
  const contentSource = {
    html: `<div style='color:#e6e6e6;'>${postContent?.description ? postContent?.description : ''
      }</div>`,
  };
  const titleSource = {
    html: `<div style='color:#e6e6e6;font-size:20px;font-weight: bold;'>${postContent?.title ? postContent?.title : ''
      }</div>`,
  };

  //discription text length count
  let textLength = '';
  if (postContent?.description) {
    textLength = postContent?.description.length;
  } else {
    textLength = 0;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'app Link',
        message: `https://www.hellosuperstars.com/ `,
        url: `https://www.hellosuperstars.com`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Animatable.View
        style={windowWidth > 700 ? styles.CardRowWidscreen : styles.CardRow}
        animation="slideInUp">
        <View style={styles.MainCard}>


          <>
            <TouchableOpacity
              style={styles.cardImg}
              onPress={() => handleStarProfile(post?.star)}>
              <Image
                style={styles.starCardImg}
                source={
                  post?.star?.image !== null
                    ? {
                      uri: `${AppUrl.MediaBaseUrl + postContent?.star?.image
                        }`,
                    }
                    : noImage
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleStarProfile(post?.star)}>
              <Text style={styles.cardText}>
                {postContent?.star?.first_name} {postContent?.star?.last_name}
              </Text>
              <Text style={styles.time}>
                {' '}
                {moment(postContent?.created_at).format('LLLL')}
              </Text>
            </TouchableOpacity>
          </>
        </View>

        <View style={styles.CardContent}>
          <View
            style={contentHeight && textLength > 300 ? styles.lessText : ''}>
            <RenderHtml contentWidth={width} source={titleSource} />
            <RenderHtml contentWidth={width} source={contentSource} />
          </View>

          {textLength > 300 ? (
            <TouchableOpacity onPress={() => setContentHeight(!contentHeight)}>
              <Text style={{ color: '#FFAD00', marginTop: 5 }}>
                {contentHeight ? `Read More . . . ` : `Read Less`}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <Text style={styles.cardContentText}></Text>

          <View style={{ position: 'relative' }}>
            <View style={{ position: 'absolute', zIndex: 1, bottom: 10 }}>
              <Text
                style={{


                  color: '#ffaa00',
                  marginLeft: 10,
                  width: 150,
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold'

                }}>
                {post?.type}
              </Text>
            </View>

          </View>

          <View style={styles.cardInfo}>

            <View style={{ flexDirection: 'row' }}>

            </View>
          </View>
          <View />
          <View style={styles.userProfileButtons}>
            <TouchableOpacity
              style={styles.likeBtn}
            >
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>

              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.likeBtn}
              onPress={() => {
                setShare(!share);
                onShare();
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <View>
                  {share ? (
                    <Icon name="paper-plane" color={'#03a5fc'} size={21} />
                  ) : (
                    <Icon name="paper-plane-o" color={'#03a5fc'} size={21} />
                  )}
                </View>
                <Text style={{ marginLeft: 8, marginTop: 1, color: '#d9d9d9' }}>
                  Share
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>

    </>
  );
};

export default AuditionPost;
