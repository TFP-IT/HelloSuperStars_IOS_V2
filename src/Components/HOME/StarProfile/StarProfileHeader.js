import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import colorCode from '../../../Constants/colorCode';
import { useState } from 'react';
import imagePath from '../../../Constants/imagePath';
import FollowButton from './FollowButton';
import AppUrl from '../../../RestApi/AppUrl';

const screenHeight = Dimensions.get('screen').height;

const StarProfileHeader = ({ starData }) => {
  const { themeBacground } = useThemeColor();
  const [btnText, setBtnText] = useState('Follow');
  const [isFollowing, setIsFollowing] = useState(true);

  //console.log('star data =>', starData);

  //star information variables
  const image_cdn = AppUrl.imageCdn;
  const star_id = starData?.star?.id;
  const star_first_name = starData?.star?.first_name;
  const star_last_name = starData?.star?.last_name;
  const star_username = starData?.star?.username;
  const star_profile_image = image_cdn + starData?.star?.image;
  const star_cover_image = image_cdn + starData?.star?.cover_photo;

  //follow button press handler
  const followBtnPressHandler = () => {
    //change the text
    if (btnText == 'Follow') {
      setBtnText('Unfollow');
      setIsFollowing(false);
    } else {
      setBtnText('Follow');
      setIsFollowing(true);
    }
  };
  return (
    <View style={[styles.container, themeBacground]}>
      {/* Image Background */}
      <ImageBackground
        source={
          star_cover_image == null
            ? imagePath.noImageNew
            : { uri: star_cover_image }
        }
        resizeMode="cover"
        style={[{ height: screenHeight / 3.2 }, themeBacground]}>
        {/* Star Profile Image */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 20,
            backgroundColor: '#0f0f0faf',
            borderRadius: 60,
          }}>
          {/* star image */}
          <View
            style={[
              {
                width: 120,
                height: 120,
                borderWidth: 2,
                borderRadius: 60,
                borderColor: colorCode.ThemeWhitColor,
              },
            ]}>
            <Image
              source={
                star_profile_image
                  ? { uri: star_profile_image }
                  : imagePath.defultImage
              }
              style={{ width: '100%', height: '100%', borderRadius: 100 }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              width: '100%',
              borderRadius: 50,
            }}>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: '500',
                  color: colorCode.whiteText,
                  textTransform: 'capitalize',
                },
              ]}>
              {star_first_name && star_last_name
                ? `${star_first_name} ${star_last_name}`
                : 'Star name'}
            </Text>
            <Text style={[{ fontSize: 13, color: colorCode.gold }]}>
              {star_username ? `@${star_username}` : '@starID'}
            </Text>
          </View>
        </View>
        <View style={{ position: 'absolute', right: 20, bottom: 10 }}>
          <FollowButton
            btnText={btnText}
            onPress={followBtnPressHandler}
            follow={isFollowing}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default StarProfileHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
