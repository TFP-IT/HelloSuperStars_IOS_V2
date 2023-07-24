import React, { useState, useContext } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Share,
} from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import AppUrl from '../../../RestApi/AppUrl';
import VideoPlayer from 'react-native-video-player';
import { AuthContext } from '../../../Constants/context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const FangroupCard = ({ data }) => {
  const { useInfo, axiosConfig } = useContext(AuthContext);

  const { width } = useWindowDimensions();
  const [like, setlike] = useState(
    JSON.parse(data.user_like_id).includes(useInfo.id),
  );
  const [likeId, setLikeId] = useState(JSON.parse(data.user_like_id));
  const [likeCount, setLikeCount] = useState(
    JSON.parse(data.user_like_id).length,
  );
  const contentSource = {
    html: `<div style='color:#e6e6e6;'>${data?.description ? data.description : ''
      }</div>`,
  };

  console.log(data);
  const handelLike = () => {
    setlike(!like);
    if (like) {
      setLikeCount(prev => {
        handelLikeUnlike(likeId.slice(0, likeId.length), 'Unlike');

        return prev - 1;
      });
    }
    if (!like) {
      setLikeCount(prev => {
        handelLikeUnlike([...likeId, useInfo.id], 'Like');

        return prev + 1;
      });
    }

    // console.log('fdjkgdg', userLikeIds + post.id)
  };

  const handelLikeUnlike = (valu, mesg) => {
    let LinkIds = {
      showlike: JSON.stringify(valu),
    };

    axios
      .post(AppUrl.FanGroupLike + data.id, LinkIds, axiosConfig)
      .then(res => {
        //console.log(res.data);
        if (res.data.status === 200) {
          Toast.show(mesg, Toast.durations.SHORT);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

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
    <View>
      <View style={styles.CardRow}>
        <View style={styles.MainCard}>
          <TouchableOpacity style={styles.cardImg}>
            <Image
              style={styles.starCardImg}
              source={
                data.user.image === null
                  ? imagePath.noImage
                  : { uri: AppUrl.MediaBaseUrl + data.user?.image }
              }
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.cardText}>
              {data.user?.first_name + ' ' + data.user?.last_name}
            </Text>
            <Text style={styles.time}>
              {' '}
              {moment(data?.created_at).format('DD MMMM YYYY')}
              {data.user?.first_name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CardContent}>
          <Text style={styles.cardContentText}>
            <RenderHtml contentWidth={width} source={contentSource} />
          </Text>

          <View style={{ position: 'relative' }}>
            {data.video && (
              <VideoPlayer
                video={{
                  uri: AppUrl.MediaBaseUrl + data.video,
                }}
                videoWidth={1600}
                videoHeight={900}
                // thumbnail={{
                //   uri: AppUrl.MediaBaseUrl + data.video,
                // }}
                thumbnail={imagePath.videoPlayIcon}
                blurRadius={10}
              />
            )}

            {data.image && (
              <Image
                style={styles.cardCoverImg}
                source={{ uri: AppUrl.MediaBaseUrl + data.image }}
              />
            )}
          </View>

          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.infoText}>
                <FontAwesome5 name={'heart'} />
                {likeCount}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {/* <View>
                <Text style={styles.infoText}>16 Comments</Text>
              </View>
              <View>
                <Text style={styles.infoText}>106 Share</Text>
              </View> */}
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.7,
              margin: 10,
            }}
          />
          <View style={styles.cardButtons}>
            {/* <TouchableOpacity>
              <Text style={styles.btnText}>
                <Icon name="heart" color={'red'} />
                Like
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handelLike} style={styles.likeBtn}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginTop: 5,
                }}>
                <View>
                  {like ? (
                    <Icon name="heart" color={'red'} size={22} />
                  ) : (
                    <AntDesign name="hearto" color={'red'} size={22} />
                  )}
                </View>
                <Text style={{ marginLeft: 8, marginTop: 1, color: '#d9d9d9' }}>
                  Like
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                <FontAwesome5 name={'comment'} />
                Comment
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.likeBtn} onPress={() => onShare()}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'share'} />
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FangroupCard;
