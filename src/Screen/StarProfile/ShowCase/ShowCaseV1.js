import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../../../Components/HeaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AuctionTab from './AuctionTab';
import BuyNowShowcase from './BuyNowShowcase';
import MarketPlaceShowcase from './MarketPlaceShowcase';
import Participate from './Participate';
import showcaseNavigator from './showcaseNavigator';
import Souvenir from './Souvenir';
import styles from './styles';
import { useThemeColor } from '../../../CustomHooks/useThemeColor';
import LoaderCompV1 from '../../../Components/LoaderCompV1';

const ShowCaseV1 = ({ route, navigation }) => {
  const { data } = route.params;
  const [view, setView] = useState(showcaseNavigator.HOME);
  //console.log('data->>>>>>>>>>>>>>', data);
  const [product, setProduct] = useState([]);
  const [buffer, setBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const [marketPlaceToggle, setMarketPlaceToggle] = useState([]);
  const { themeBacground, themeImgBgColor } = useThemeColor();
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });
  const handleMarketPlace = () => {
    navigation.navigate(navigationStrings.MARKETPLACESHOWCASE, {
      star: data,
    });
  };

  const handleSouvenir = () => {
    navigation.navigate(navigationStrings.SOUVENIR, {
      star: data,
    });
  };

  useEffect(() => { }, [data]);

  function handleBackFunction() {
    navigation.goBack();
  }

  return (
    <>
      <HeaderComp backFunc={handleBackFunction} />
      <ScrollView
        style={[
          {
            flex: 1,
            backgroundColor: '#000',
            paddingTop: 10,
            paddingBottom: 5,
          },
          themeBacground,
        ]}>
        <AlertModal
          modalObj={modalObj}
          modal={modal}
          setModal={setModal}
        // buttoPress={modalOkBtn}
        />
        {buffer ? (
          <LoaderCompV1 />
        ) : (
          <>
            {view == showcaseNavigator.HOME ? (
              <>
                <View style={styles.superStarHome}>
                  <TouchableOpacity
                    style={[styles.singleContent, themeImgBgColor]}
                    onPress={() => {
                      // setView(showcaseNavigator.AUCTION)

                      navigation.navigate(navigationStrings.AUCTIONTAB, {
                        starId: data?.id,
                        setProduct,
                        product,
                      });
                    }}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={[
                        '#FFAD00',
                        '#FFD273',
                        '#E19A04',
                        '#FACF75',
                        '#E7A725',
                        '#FFAD00',
                      ]}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>Auction</Text>
                    </LinearGradient>
                    <Image
                      source={imagePath.Auction}
                      style={styles.postImage}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleMarketPlace}
                    style={[styles.singleContent, themeImgBgColor]}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={[
                        '#FFAD00',
                        '#FFD273',
                        '#E19A04',
                        '#FACF75',
                        '#E7A725',
                        '#FFAD00',
                      ]}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>MarketPlace</Text>
                    </LinearGradient>
                    <Image
                      source={imagePath.MarketPlace}
                      style={styles.postImage}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.superStarHome}>
                  <TouchableOpacity
                    style={[styles.singleContent, themeImgBgColor]}
                    onPress={handleSouvenir}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={[
                        '#FFAD00',
                        '#FFD273',
                        '#E19A04',
                        '#FACF75',
                        '#E7A725',
                        '#FFAD00',
                      ]}
                      style={styles.linearGradient}>
                      <Text style={styles.buttonText}>Souvenir</Text>
                    </LinearGradient>
                    <Image
                      source={imagePath.Souvenir}
                      style={styles.postImageS}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <></>
            )}
            {view == showcaseNavigator.AUCTION ? (
              <AuctionTab
                setView={setView}
                starId={data?.id}
                setProduct={setProduct}
              />
            ) : (
              <></>
            )}
            {view == showcaseNavigator.PARTICIPATE ? (
              <Participate starId={data?.id} product={product} />
            ) : (
              <></>
            )}
            {/* {view == showcaseNavigator.BUYNOW ? <BuyNowShowcase /> : <></>} */}
            {view == showcaseNavigator.BUYNOW ? <BuyNowShowcase /> : <></>}
            {/* {view == showcaseNavigator.MARKETPLACE ? (
            <MarketPlaceShowcase />
          ) : (
            <></>
          )} */}
            {view == showcaseNavigator.SOUVENIR ? (
              <Souvenir star={data} />
            ) : view == showcaseNavigator.MARKETPLACE &&
              marketPlaceToggle.length > 0 ? (
              <MarketPlaceShowcase star={data} />
            ) : (
              <></>
            )}

            {/* 
<AuctionTab/>

<Participate/> */}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ShowCaseV1;
