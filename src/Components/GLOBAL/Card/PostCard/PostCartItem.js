import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useContext, useState} from 'react';
import colorCode from '../../../../Constants/colorCode';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useThemeColor} from '../../../../CustomHooks/useThemeColor';
import imagePath from '../../../../Constants/imagePath';
import {useAnimationEffect} from '../../../../CustomHooks/useAnimationEffect';
import CustomVideoPlayer from '../../../VideoPlayer/CustomVideoPlayer';
import AppUrl from '../../../../RestApi/AppUrl';
import he from 'he';
import {AuthContext} from '../../../../Constants/context';
import Postbag from '../../Postbag/Postbag';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../../Constants/navigationStrings';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {useTimeDiff} from '../../../../CustomHooks/useTimeDiff';
import moment from 'moment';

const PostCartItem = ({postConfig, data}) => {
  const {themeCardColor, themeTextColor, themeImgBgColor, themeReadMoreColor} =
    useThemeColor();
  const {countryDateTime, axiosConfig, useInfo} = useContext(AuthContext);
  const {showComponent} = useAnimationEffect();
  const [readMore, setReadMore] = useState(false);
  const Navigation = useNavigation();
  const [lockPost, setPostLock] = useState(true);
  const [likeId, setLikeId] = useState(JSON.parse(data?.user_like_id));
  const [like, setlike] = useState(
    JSON.parse(data?.user_like_id).includes(useInfo?.id),
  );
  const [likeCount, setLikeCount] = useState(
    JSON.parse(data?.user_like_id).length,
  );
  const {seconds, days, endSeconds} = useTimeDiff({
    time: countryDateTime(data.registration_end_date),
    currentTime: moment().format(''),
  });

  const detailsText = data?.details == null ? '' : data?.details;
  const descriptionText = he.decode(detailsText).replace(/<[^>]+>/g, '');

  const [share, setShare] = useState(false);
  const [postShare, setPostShare] = useState(data?.share_count);

  function handleStarProfile() {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: data?.star,
    });
  }

  const handelLike = () => {
    setlike(!like);
    if (like) {
      setLikeCount(prev => {
        let unlike = likeId.filter(item => item !== useInfo.id);

        handelLikeUnlike(unlike, 'Unlike');

        return prev - 1;
      });
    }
    if (!like) {
      setLikeCount(prev => {
        handelLikeUnlike([...likeId, useInfo.id], 'Like');

        return prev + 1;
      });
    }
  };

  const handelLikeUnlike = async (valu, mesg) => {
    let likeData = {showlike: JSON.stringify(valu)};
    try {
      let submitLike = await axios.post(
        AppUrl.SubmitLike + data?.id,
        likeData,
        axiosConfig,
      );
      Toast.show(mesg, Toast.durations.SHORT);
    } catch (error) {
      console.log('like error', error.message);
    }
  };

  const onShare = async () => {
    try {
      let shareCount = await axios.get(
        AppUrl.PostShare + data?.id,
        axiosConfig,
      );
      setPostShare(prev => prev + 1);
    } catch (error) {
      console.log('share count store error', error.message);
    }

    try {
      const result = await Share.share({
        title: 'Hello super stars',
        message: `https://play.google.com/store/apps/details?id=com.hellosuperstars`,
        url: `https://play.google.com/store/apps/details?id=com.hellosuperstars`,
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
      console.log('share error', error.message);
    }
  };

  return (
    <View style={[styles.card, themeCardColor]}>
      <TouchableOpacity style={styles.cardHader} onPress={handleStarProfile}>
        {/* profile image */}
        <View style={styles.profileImage}>
          <Image
            source={
              data?.star?.image
                ? {uri: AppUrl.imageCdn + data?.star?.image}
                : imagePath.defultStarprofile
            }
            style={styles.profileImage}
          />
        </View>
        {/* profile name */}
        <View style={styles.info}>
          <Text
            style={[
              styles.profileName,
              {color: colorCode.gold, fontWeight: '900'},
            ]}>
            {data?.star?.first_name + ' ' + data?.star?.last_name}
          </Text>
          <Text style={[themeTextColor, {fontSize: 12}]}>
            {countryDateTime(data?.created_at, 'Do MMMM  YYYY, h:mm a')}
          </Text>
        </View>
      </TouchableOpacity>

      {/* post containt  start*/}
      <View>
        <Text
          style={[
            themeTextColor,
            {fontSize: 19, fontWeight: '400', paddingBottom: 5},
          ]}>
          {data?.title}
        </Text>
        <Text style={[themeTextColor, {textAlign: 'justify'}]}>
          <>
            {!readMore && descriptionText.length > 150
              ? descriptionText.slice(0, 150) + '...'
              : descriptionText}
          </>
          {}
        </Text>
        {descriptionText.length > 150 && (
          <TouchableOpacity onPress={() => setReadMore(!readMore)}>
            <Text style={themeReadMoreColor}>
              {!readMore ? ' Read more' : ' Read less'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* post containt  end*/}

      <View style={[styles.imageContainer, themeImgBgColor]}>
        {/* post video*/}

        {data.video && (
          <CustomVideoPlayer
            postConfig={postConfig}
            videoUrl={AppUrl.videoCdn + data?.video}
            thumbnail={AppUrl.imageCdn + data?.thumbnail}
          />
        )}

        {/* psot banner */}
        {data.banner && (
          <Image
            resizeMode="contain"
            source={{uri: AppUrl.imageCdn + data?.banner}}
            style={{width: '100%', height: '100%'}}
          />
        )}

        {/* post bage */}
        {data?.type !== 'general' && seconds > 0 && <Postbag data={data} />}

        {/* lock post hide*/}
        {lockPost && data?.type == 'general' && data?.post_type > 0 && (
          <View
            style={[
              styles.imageContainer,
              {
                position: 'absolute',
                zIndex: 99,
                backgroundColor: '#2b2929f3',
                width: '100%',
              },
            ]}>
            <TouchableOpacity onPress={() => setPostLock(!lockPost)}>
              <Image
                source={imagePath.lock}
                style={{height: 100, width: 100}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        {/* like button  */}
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity onPress={handelLike}>
            {like ? (
              <Icon name="heart" color={'red'} size={28} />
            ) : (
              <AntDesign name="hearto" color={'red'} size={28} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={{marginLeft: 10}}>
            {share ? (
              <Icon name="paper-plane" color={'#03a5fc'} size={28} />
            ) : (
              <Icon name="paper-plane-o" color={'#03a5fc'} size={26} />
            )}
          </TouchableOpacity>
        </View>

        {/* like show  */}
        <View
          style={{
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.actionCount}>
            <Text style={[themeTextColor, {paddingRight: 3}]}>{likeCount}</Text>
            <Icon name="heart" color={'red'} size={15} />
          </View>
          <View style={styles.actionCount}>
            <Text style={[themeTextColor, {paddingRight: 3}]}>{postShare}</Text>
            <Icon name="paper-plane" color={'#03a5fc'} size={15} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCartItem;

const styles = StyleSheet.create({
  card: {
    Height: 380,
    width: '100%',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  cardHader: {
    // backgroundColor: 'red',
    // minHeight: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  profileImage: {
    height: 50,
    width: 50,
    backgroundColor: colorCode.transparentBlackDark,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 16,
  },
  info: {
    marginLeft: 10,
  },
  imageContainer: {
    maxHeight: 250,
    minHeight: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardFooter: {
    minHeight: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  actionCount: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
  },
  postbag: {
    backgroundColor: colorCode.transparentBlackDark,
    height: 60,
    zIndex: 9,
    position: 'absolute',
    bottom: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  postBagBorder: {
    borderColor: colorCode.gold,
    borderLeftWidth: 5,
    borderTopWidth: 2,
    borderBottomWidth: 0.5,
  },
  postBagBtn: {
    backgroundColor: colorCode.transparentBlackDark,
    width: 30,
    height: 30,
    position: 'absolute',
    top: -12,
    left: -10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colorCode.gold,
    borderWidth: 1,
  },
});
