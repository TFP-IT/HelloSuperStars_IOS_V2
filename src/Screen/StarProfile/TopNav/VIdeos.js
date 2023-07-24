import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import imagePath from '../../../Constants/imagePath';
import { FlatGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import LockPaymentModal from '../../../Components/MODAL/LockPaymentModal';
import VideoPlayer from 'react-native-video-player';
import { AuthContext } from '../../../Constants/context';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import NoDataComp from '../../../Components/NoDataComp';

export default function VIdeos({ starId, toggle }) {
  const [post, setPost] = useState([]);
  const [photosUpdate, setUnlocked] = useState(false);
  const [lockStatus, setLockStatus] = useState([]);
  const [post_id, setPostId] = useState(false);
  const [fee, setFee] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  const [lockModal, setLockModal] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [payment_status, setPaymentStatus] = useState([]);
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const { axiosConfig } = useContext(AuthContext);

  console.log('video starId', starId);
  const makePayment = id => {
    setPostId(id[0]);
    setFee(id[1]);
    // setSuccessShow(true);
    setIsShowPaymentComp(true);
  };
  useEffect(() => {
    axios.get(`${AppUrl.starVideos}+${starId}`).then(res => {
      if (res.data.status === 200) {
        //console.log(res.data.post);
        setPost(res.data.post);
      }
    });
    axios
      .get(`${AppUrl.postPaymentCheckStarProfile}`, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setLockStatus(res.data.lockStatus);
        }
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });

    setUnlocked(false);
  }, [photosUpdate, toggle]);
  function userPostPaymentCheck(post_id, userPaymentData) {
    console.log(userPaymentData);
    return userPaymentData.includes(post_id);
  }
  return (
    <View>
      {post.length > 0 ? (
        <View style={styles.container}>
          <FlatGrid
            spacing={15}
            itemDimension={120}
            data={post}
            renderItem={({ item }) => {
              return item.type === 'paid' ? (
                item.video && (
                  <View>
                    <VideoPlayer
                      video={{
                        uri: `${AppUrl.MediaBaseUrl}${item?.video}`,
                      }}
                      videoWidth={1600}
                      videoHeight={1800}
                      thumbnail={{
                        uri: item?.thumbnail
                          ? AppUrl.MediaBaseUrl + item?.thumbnail
                          : 'https://www.newagebd.com/files/records/news/202103/132871_199.jpg',
                      }}
                      blurRadius={
                        userPostPaymentCheck(item.id, lockStatus) === false
                          ? 10
                          : 0
                      }
                    />
                    <TouchableOpacity
                      onPress={() => makePayment([item.id, item.fee])}
                      style={styles.lockImageBtn}>
                      {userPostPaymentCheck(item.id, lockStatus) === false ? (
                        <Image
                          source={imagePath.lock}
                          style={styles.lockImage}
                        />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <View style={{ textAlign: 'center', marginRight: 20 }}>
                  <VideoPlayer
                    video={{
                      uri: `${AppUrl.MediaBaseUrl}${item?.video}`,
                    }}
                    videoWidth={1600}
                    videoHeight={900}
                    pauseOnPress
                    thumbnail={{
                      uri: `${AppUrl.MediaBaseUrl}${item?.banner}`,
                    }}
                  // blurRadius={1}
                  />
                </View>
              );
            }}
          />
        </View>
      ) : (
        <NoDataComp />
      )}
      {isShowPaymentComp ? (
        <RegisPaymentModal
          eventType="generalpost"
          modelName="generalpost"
          isShowPaymentComp={isShowPaymentComp}
          setIsShowPaymentComp={setIsShowPaymentComp}
          eventId={post_id}
          fee={fee}
          setUnlocked={setUnlocked}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343434',
    margin: 8,
    borderRadius: 5,
  },
  cardCoverImgWithScreen: {
    height: 400,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  cardCoverImg: {
    height: 230,
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
  },
  lockImageBtn: {
    position: 'absolute',
    top: '25%',
    left: '20%',
  },
  lockImage: {
    width: 100,
    height: 100,
  },
});
