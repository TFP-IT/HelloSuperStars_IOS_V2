import axios from 'axios';
import * as React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';

import {AuthContext} from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../Constants/imagePath';
import AuctionProductCard from './AuctionPorductCard';
import BuyNowShowcase from './BuyNowShowcase';
import styles from './styles';
// import MarketplaceProductCard from './MarketplaceProductCard';
import showcaseNavigator from './showcaseNavigator';
import MarketplaceProductCard from './MarketplaceProductCard';
import HeaderComp from '../../../Components/HeaderComp';
import LoaderComp from '../../../Components/LoaderComp';
import NoDataComp from '../../../Components/NoDataComp';
function MarketPlaceShowcase({route, navigation}) {
  const {star} = route.params;

  const [buffer, setBuffer] = React.useState(false);
  const [Data, SetData] = React.useState([]);

  const {axiosConfig} = React.useContext(AuthContext);
  React.useEffect(() => {
    setBuffer(true);
    axios
      .get(AppUrl.MarketplaceAllPost + `/${star?.id}`, axiosConfig)
      .then(res => {
        if (res.data.status == 200) {
          SetData(res.data.starMarketplace);
          console.log(star?.id);
          //console.log(res.data.starMarketplace);
        }
        setBuffer(false);
      })
      .catch(err => {
        console.log(err);
        setBuffer(false);
      });
  }, [star]);
  return (
    <>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <View style={styles.container}>
          {buffer && <LoaderComp />}
          <SafeAreaView>
            <View style={styles.row1}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  '#FFAD00',
                  '#FFD273',
                  '#E19A04',
                  '#FACF75',
                  '#E7A725',
                  '#FFAD00',
                ]}
                style={{borderRadius: 15}}>
                <Text style={styles.AuctionT}>MarketPlace</Text>
              </LinearGradient>
            </View>

            <ScrollView>
              {Data.length > 0 ? (
                Data.map(item => {
                  return (
                    <MarketplaceProductCard
                      name={item.title}
                      productImg={item.image}
                      price={item.unit_price}
                      ownerImg={item.superstar.image}
                      owerName={item.superstar.first_name}
                      product={item}
                      key={item.id}
                      buttonText="Buy Now"
                    />
                  );
                })
              ) : (
                <NoDataComp />
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
        {/* <BuyNowShowcase /> */}
        {/* {view == showcaseNavigator.BUYNOW ? <BuyNowShowcase /> : <></>} */}
      </SafeAreaView>
    </>
  );
}

export default MarketPlaceShowcase;
