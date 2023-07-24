import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import PostCard from '../../../../../../Components/GLOBAL/Card/PostCard/PostCard';

// import PostCard from '../../../../../../Components/Card/PostCard/PostCard';

const windowWidth = Dimensions.get('window').width;
const ProfilePost = ({userActivites}) => {
  //console.log("user activity", userActivites)
  const vedioRef = React.useRef(null);

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };
  const loadVideo = () => {
    setVideoLoad(true);
  };
  return (
    <>
      {/* Dynamic data from user activities table */}
      {userActivites &&
        userActivites?.map((item, index) => (
          <PostCard key={index} post={item} callform="user-profile" />
        ))}
    </>
  );
};

export default ProfilePost;
