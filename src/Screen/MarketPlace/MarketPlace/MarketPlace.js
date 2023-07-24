import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import AlertModal from '../../../Components/MODAL/AlertModal';
import {AuthContext} from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import AuctionProductContainer from '../AuctionProductContainer/AuctionProductContainer';
import MarketProductContainer from '../MarketProductContainer/MarketProductContainer';
import marketPlaceNavigatr from './marketPlaceNavigatr';
import styles from './styles';
import {useThemeColor} from '../../../CustomHooks/useThemeColor';

function MarketPlace({route = null}) {
  const windowHeight = Dimensions.get('window').height;
  const {axiosConfig} = useContext(AuthContext);
  const navigation = useNavigation();
  const [loder, setLoder] = React.useState(true);
  const [auction, setAuction] = useState();
  const [marketPlaceNavigate, setMarketPlaceNavigate] = useState(
    marketPlaceNavigatr.MARKETPLACE,
  );
  const {themeBacground} = useThemeColor();
  const [buffer, setBuffer] = useState(false);
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalObj, setModalObj] = useState({
    modalType: '',
    buttonTitle: '',
    message: '',
    available: '',
  });

  useEffect(() => {}, []);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const modalOkBtn = () => {
    setModalObj({
      modalType: '',
      buttonTitle: '',
      message: '',
      available: '',
    });
    setModal(false);
  };

  return (
    <SafeAreaView>
      <AlertModal
        modalObj={modalObj}
        modal={modal}
        setModal={setModal}
        buttoPress={modalOkBtn}
      />
      {buffer ? <LoaderComp /> : <></>}

      <HeaderComp backFunc={() => navigation.goBack()} />
      <ScrollView
        style={themeBacground}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FFAD00']}
            progressBackgroundColor="black"
          />
        }>
        <View style={styles.container}>
          <SafeAreaView>
            {/* Top bar buttons start */}
            <View style={styles.row1}>
              <LinearGradient
                colors={
                  marketPlaceNavigate === marketPlaceNavigatr.MARKETPLACE
                    ? ['#FFAD00', '#FFD273', '#FACF75', '#E7A725', '#FFAD00']
                    : ['#272727', '#272727']
                }
                style={
                  marketPlaceNavigate === marketPlaceNavigatr.MARKETPLACE
                    ? styles.marketBtn
                    : styles.marketBtn2
                }>
                <TouchableOpacity
                  onPress={() =>
                    setMarketPlaceNavigate(marketPlaceNavigatr.MARKETPLACE)
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="shopping-basket"
                      size={15}
                      style={{marginRight: 10}}
                      color={
                        marketPlaceNavigate === marketPlaceNavigatr.MARKETPLACE
                          ? 'black'
                          : 'white'
                      }
                    />
                    <Text
                      style={
                        marketPlaceNavigate === marketPlaceNavigatr.MARKETPLACE
                          ? styles.Fonts
                          : styles.Fonts2
                      }>
                      Market Place
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={
                  marketPlaceNavigate === marketPlaceNavigatr.AUCTION
                    ? ['#FFAD00', '#FFD273', '#FACF75', '#E7A725', '#FFAD00']
                    : ['#272727', '#272727']
                }
                style={
                  marketPlaceNavigate === marketPlaceNavigatr.AUCTION
                    ? styles.marketBtn
                    : styles.marketBtn2
                }>
                <TouchableOpacity
                  onPress={() =>
                    setMarketPlaceNavigate(marketPlaceNavigatr.AUCTION)
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="gavel"
                      size={15}
                      style={{marginRight: 10}}
                      color={
                        marketPlaceNavigate === marketPlaceNavigatr.AUCTION
                          ? 'black'
                          : 'white'
                      }
                    />
                    <Text
                      style={
                        marketPlaceNavigate === marketPlaceNavigatr.AUCTION
                          ? styles.Fonts
                          : styles.Fonts2
                      }>
                      Auctions
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <ScrollView>
              <View style={{backgroundColor: 'black', paddingBottom: 200}}>
                {marketPlaceNavigate === marketPlaceNavigatr.MARKETPLACE ? (
                  <MarketProductContainer
                    apiInPoint={AppUrl.MarketplaceAllPost}
                  />
                ) : (
                  <></>
                )}
                {marketPlaceNavigate === marketPlaceNavigatr.AUCTION ? (
                  <AuctionProductContainer apiInPoint={AppUrl.AuctionAllPost} />
                ) : (
                  <></>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MarketPlace;
