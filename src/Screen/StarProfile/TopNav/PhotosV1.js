import {
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AppUrl from '../../../RestApi/AppUrl';
import imagePath from '../../../Constants/imagePath';
import { FlatGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import RegisPaymentModal from '../../../Components/MODAL/RegisPaymentModal';
import { AuthContext } from '../../../Constants/context';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import PhotosCard from './PhotosCard';
import { View } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../../Constants/navigationStrings';
import NoDataComp from '../../../Components/NoDataComp';

export default function PhotosV1({ starId, toggle }) {
  const [post, setPost] = useState([]);
  const [photosUpdate, setUnlocked] = useState(false);
  const [lockStatus, setLockStatus] = useState([]);
  const [post_id, setPostId] = useState(false);
  const [fee, setFee] = useState('');
  const [isShowPaymentComp, setIsShowPaymentComp] = useState(false);
  const { useInfo, axiosConfig } = useContext(AuthContext);
  const windowWidth = Dimensions.get('window').width;
  const { themeTextColor } = useThemeColor();

  const Navigation = useNavigation();

  const imageUrl = AppUrl.starPhotos + starId;

  const makePayment = (id, fee) => {
    setPostId(id);
    setFee(fee);
    // setSuccessShow(true);
    setIsShowPaymentComp(true);
  };
  useEffect(() => {
    axios.get(imageUrl).then(res => {
      if (res.data.status === 200) {
        // console.log('response', res.data.post);
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
    //console.log(userPaymentData);
    return userPaymentData.includes(post_id);
  }

  //console.log('post', post);

  return (
    <View style={styles.container}>
      <View>
        {post.length > 0 ? (
          <FlatList
            data={post}
            keyExtractor={item => item?.id}
            renderItem={({ item }) => (
              <>
                {item?.type === 'paid' ? (
                  <>
                    {item?.image ? (
                      <View style={styles.cardContainer}>
                        <PhotosCard
                          imageUrl={AppUrl.imageCdn + item?.image}
                        //imageUrl={item?.image}
                        // onPress={() =>
                        //   Navigation.navigate(navigationStrings.FULLSCREENIMAGE, {
                        //     imagePath: AppUrl.imageCdn + item?.banner,
                        //   })
                        // }
                        />
                        {/* For lock image */}
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            makePayment(item?.id, item?.fee);
                            setIsShowPaymentComp(true);
                          }}
                          style={styles.lockImageBtn}>
                          {userPostPaymentCheck(item.id, lockStatus) ===
                            false ? (
                            <Image
                              source={imagePath.lock}
                              style={styles.lockImage}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <View style={styles.cardContainer}>
                          <PhotosCard
                            imageUrl={
                              'https://www.diabetes.ie/wp-content/uploads/2017/02/no-image-available.png'
                            }
                          />
                        </View>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {item?.image ? (
                      <View style={styles.cardContainer}>
                        <PhotosCard
                          imageUrl={AppUrl.imageCdn + item?.image}
                          //imageUrl={item?.image}
                          onPress={() =>
                            Navigation.navigate(
                              navigationStrings.FULLSCREENIMAGE,
                              {
                                imagePath: AppUrl.imageCdn + item?.image,
                                // imagePath: item?.image,
                              },
                            )
                          }
                        />
                      </View>
                    ) : (
                      <>
                        <View style={styles.cardContainer}>
                          <PhotosCard
                            imageUrl={
                              'https://www.diabetes.ie/wp-content/uploads/2017/02/no-image-available.png'
                            }
                          />
                        </View>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
        ) : (
          <NoDataComp />
        )}
      </View>
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
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  lockImageBtn: {
    width: '100%',
    height: '110%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#000000e1',
    overflow: 'hidden',
  },
  lockImage: {
    width: 100,
    height: 100,
  },
});
