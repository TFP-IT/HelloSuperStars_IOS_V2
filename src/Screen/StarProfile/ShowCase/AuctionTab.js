import axios from 'axios';
import * as React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../../../Components/HeaderComp';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import AuctionProductCard from './AuctionPorductCard';
import styles from './styles';
import NoDataComp from '../../../Components/NoDataComp';

function AuctionTab({ route, navigation }) {
  const { starId, setProduct, product } = route.params;

  console.log('product =====<<<<', product);

  const { axiosConfig } = React.useContext(AuthContext);
  // const {setProduct} = props.setProduct;
  const [productInfo, setProductInfo] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${AppUrl.AuctionStar}${starId}`, axiosConfig).then(res => {
      //console.log(res.data);
      if (res.data.status === 200) {
        setProductInfo(res.data.product);
      }
    });
  }, []);
  return (
    <>
      <HeaderComp backFunc={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.row1}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#e7a825', '#e7c233', '#ffad00']}
              style={{ borderRadius: 15 }}>
              <Text style={styles.AuctionT}>Auction</Text>
            </LinearGradient>
          </View>
          <View>
            {productInfo.length > 0 ? (
              <View style={{ paddingBottom: 50 }}>
                {productInfo.map(item => {
                  return (
                    <AuctionProductCard
                      starId={starId}
                      product={product}
                      name={item.title}
                      productImg={item.product_image}
                      price={item.base_price}
                      ownerImg={item.star.image}
                      details={item.details}
                      owerName={
                        item.star.first_name + ' ' + item.star.last_name
                      }
                      key={item.id}
                      productDetails={item}
                      buttonText="Participate"
                      setProduct={setProduct}
                    />
                  );
                })}
              </View>
            ) : (
              <NoDataComp />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default AuctionTab;
