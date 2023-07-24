import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../../../Components/HeaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import LoaderComp from '../../LoaderComp/LoaderComp';
import profileNavigatr from '../Profile/profileNavigatr';
import AuctionTab from './AuctionTab';
import BuyNowShowcase from './BuyNowShowcase';
import MarketPlaceShowcase from './MarketPlaceShowcase';
import Participate from './Participate';
import showcaseNavigator from './showcaseNavigator';
import Souvenir from './Souvenir';
import styles from './styles';

const ShowCase = ({ route, navigation }) => {
  const { data } = route.params;
  const [view, setView] = useState(showcaseNavigator.HOME);
  //console.log('data->>>>>>>>>>>>>>', data);

  const [product, setProduct] = useState([]);
  const [star, setStar] = useState(data.data);
  const [modalStartFrom, setModalStartFrom] = useState('Default');
  const [buffer, setBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const { axiosConfig } = useContext(AuthContext);
  const [marketPlaceToggle, setMarketPlaceToggle] = useState([]);
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

    // setBuffer(true);
    // axios
    //   .get(AppUrl.MarketplaceAllPost + `/${data?.id}`, axiosConfig)
    //   .then(res => {
    //     if (res.data.status === 200) {

    //       setView(showcaseNavigator.MARKETPLACE);
    //       setMarketPlaceToggle([res.data.starMarketplace]);
    //     } else {
    //       setModalObj({
    //         modalType: 'warning',
    //         buttonTitle: 'Ok',
    //         message: 'Opps... Marketplace not possible now !',
    //       });
    //       setModal(true);
    //     }
    //     setBuffer(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setBuffer(false);
    //   });
  };

  const handleSouvenir = () => {
    navigation.navigate(navigationStrings.SOUVENIR, {
      star: data,
    });
    //   setBuffer(true);
    //   axios
    //     .get(AppUrl.GetStarSouvenir + `${star?.id}`, axiosConfig)
    //     .then(res => {

    //       if (res.data.status === 200) {
    //         setView(showcaseNavigator.SOUVENIR);
    //       } else {
    //         setModalObj({
    //           modalType: 'warning',
    //           buttonTitle: 'Ok',
    //           message: 'Opps... Souvenir not possible now !',
    //         });
    //         setModal(true);
    //       }
    //       setBuffer(false);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       setBuffer(false);
    //     });
    // };
    // const modalOkBtn = () => {
    //   setModalObj({
    //     modalType: '',
    //     buttonTitle: '',
    //     message: '',
    //     available: '',
    //   });
    //   setModal(false);

    //   if (modalStartFrom === 'Default') {
    //   }
    //  else if (modalStartFrom === 'N') {
    //     if (Number(auctionApply?.notify_status) === 1) {
    //         setProcessModal(true)
    //     } else {
    //         navigation.navigate('Home');
    //     }
    // }
  };

  useEffect(() => { }, [data]);

  function handleBackFunction() {
    //  if(view ===showcaseNavigator.AUCTION || view ===showcaseNavigator.MARKETPLACE || view===showcaseNavigator.SOUVENIR){
    //   setView(showcaseNavigator.HOME)
    //  }
    //  else{
    navigation.goBack();
  }

  return (
    <>
      <HeaderComp backFunc={handleBackFunction} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#000',
          paddingTop: 10,
          paddingBottom: 5,
        }}>
        <AlertModal
          modalObj={modalObj}
          modal={modal}
          setModal={setModal}
        // buttoPress={modalOkBtn}
        />
        {buffer ? (
          <LoaderComp />
        ) : (
          <>
            {view == showcaseNavigator.HOME ? (
              <>
                <View style={styles.superStarHome}>
                  <TouchableOpacity
                    style={styles.singleContent}
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
                    style={styles.singleContent}>
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
                    style={styles.singleContent}
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

export default ShowCase;
