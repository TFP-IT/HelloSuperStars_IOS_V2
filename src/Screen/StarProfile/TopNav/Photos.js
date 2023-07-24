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
import RegistrationComp from '../../../Components/QnA/RegistrationComp/Registration';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import { AuthContext } from '../../../Constants/context';
import NoDataComp from '../../../Components/NoDataComp';

export default function Photos({ starId, toggle }) {
  const [post, setPost] = useState([]);
  const [photosUpdate, setUnlocked] = useState(false);
  const [lockStatus, setLockStatus] = useState([]);
  const [post_id, setPostId] = useState(false);
  const [fee, setFee] = useState('');
  const [successShow, setSuccessShow] = useState(false);
  const [lockModal, setLockModal] = useState(false);
  const [parentData, setParentData] = useState({});
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const [payment_status, setPaymentStatus] = useState([]);
  const { useInfo, axiosConfig } = useContext(AuthContext);
  const windowWidth = Dimensions.get('window').width;

  console.log('star id', starId);
  const makePayment = (id, fee) => {
    setPostId(id);
    setFee(fee);
    // setSuccessShow(true);
    setIsShowPaymentComp(true);
  };
  useEffect(() => {
    axios.get(`${AppUrl.starPhotos}+${starId}`).then(res => {
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
            itemDimension={110}
            data={post}
            renderItem={({ item }) => {
              return item.type === 'paid' ? (
                item.image && (
                  <View>
                    <Image
                      style={
                        windowWidth > 700
                          ? styles.cardCoverImgWithScreen
                          : styles.cardCoverImg
                      }
                      source={{
                        uri: `${AppUrl.MediaBaseUrl}${item?.image}`,
                      }}
                      blurRadius={
                        userPostPaymentCheck(item.id, lockStatus) === false
                          ? 10
                          : 0
                      }
                    />
                    {/* For lock image */}
                    <TouchableOpacity
                      onPress={() => {
                        makePayment(item?.id, item?.fee);
                        setIsShowPaymentComp(true);
                      }}
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
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#ffa825', '#ffce48', '#ab6616']}
                  style={{ borderRadius: 10 }}>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: `${AppUrl.MediaBaseUrl + item.image}` }}
                      style={{
                        height: 130,
                        width: 180,
                        borderRadius: 10,
                        borderWidth: 0,
                        resizeMode: 'stretch',
                      }}
                    />
                  </TouchableOpacity>
                </LinearGradient>
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
