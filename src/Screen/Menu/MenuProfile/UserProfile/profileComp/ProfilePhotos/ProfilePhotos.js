import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import imagePath from '../../../../../../Constants/imagePath';
import AppUrl from '../../../../../../RestApi/AppUrl';
import styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import NoDataComp from '../../../../../../Components/NoDataComp';

const ProfilePhotos = ({ userActivites = null, starProPhotos = null }) => {
  const filteredActivities = userActivites.filter(item => {
    return item?.type === 'greeting'
      ? item?.greeting_registration?.status > 2
        ? item?.greeting
        : null
      : item;
  });
  const [starPhotos, setStarPhotos] = useState();

  console.log('starProPhotos', starProPhotos);
  useEffect(() => {
    starProPhotos.map(item => {
      // console.log(item[0].image);
      setStarPhotos(item[0]);
    });
  }, []);
  console.log('gg', starPhotos);

  const photoWithStarAndActivity = filteredActivities.concat(starPhotos);
  console.log('photoWithStarAndActivity', photoWithStarAndActivity);

  const renderPaidProfileImage = ({ item }) => {
    return (
      <>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#ffa825', '#ffce48', '#ab6616']}
          style={{ borderRadius: 10 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: `${AppUrl.MediaBaseUrl + item[0]?.image}` }}
              style={{
                height: 135,
                width: 110,
                borderRadius: 10,
                borderWidth: 0,
                resizeMode: 'stretch',
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  };

  const renderProfileImage = ({ item }) => {
    let postContent;
    switch (item?.type) {
      case 'learningSession':
        postContent = item.learning_session;

        break;
      case 'marketplace':
        break;
      case 'greeting':
        postContent = item.greeting;

        break;
      case 'general':
        postContent = item.general;

        break;
      case 'qna':
        postContent = item.qna;

        break;
      case 'meetup':
        postContent = item.meetup;
        break;
      case 'livechat':
        postContent = item.livechat;
        break;
      case 'livechat':
        postContent = item.livechat;
        break;
      case 'fangroup':
        postContent = item.fangroup;
        break;
    }

    return (
      <>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#ffa825', '#ffce48', '#ab6616']}
          style={{ borderRadius: 10 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: `${AppUrl.MediaBaseUrl + postContent?.banner}` }}
              style={{
                height: 135,
                width: 110,
                borderRadius: 10,
                borderWidth: 0,
                resizeMode: 'stretch',
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  };

  return (
    <>
      {filteredActivities.length > 0 || starProPhotos.length > 0 ? (
        <View style={styles.container}>
          <FlatGrid
            spacing={15}
            itemDimension={100}
            data={filteredActivities}
            renderItem={renderProfileImage}
          />
          <FlatGrid
            spacing={15}
            itemDimension={100}
            data={starProPhotos}
            renderItem={renderPaidProfileImage}
          />
        </View>
      ) : (
        <NoDataComp />
      )}
    </>
  );
};

export default ProfilePhotos;
