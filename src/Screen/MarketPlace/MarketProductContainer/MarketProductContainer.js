import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, Text, Image } from 'react-native';
import MarketPlaceSkeleton from '../../../Components/Skeleton/MarketSkeleton/MarketPlaceSkeleton';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import MarketProductCard from '../MarketProductCard/MarketProductCard';
import NoDataComp from '../../../Components/NoDataComp';

const MarketProductContainer = ({ apiInPoint }) => {
  const { axiosConfig } = useContext(AuthContext);
  const [marketPlaceData, setMarketPlaceData] = useState([]);
  const [loder, setLoder] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getAllMarketPost();
    setRefreshing(false);
  };

  useEffect(() => {
    getAllMarketPost();
  }, []);

  const getAllMarketPost = async () => {
    setLoder(true);
    let res = await axios
      .get(apiInPoint, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setLoder(false);
          //console.log(res.data.data);
          setMarketPlaceData(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <ScrollView
        style={{ backgroundColor: 'black' }}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={['#FFAD00']}
            progressBackgroundColor="black"
          />
        }>
        {loder &&
          [1, 2, 3, 4].map(index => <MarketPlaceSkeleton key={index} />)}

        {marketPlaceData.length > 0 ? (
          marketPlaceData.map((data, index) => (
            <MarketProductCard data={data} buttonText="Buy Now" key={index} />
          ))
        ) : (
          <NoDataComp />
        )}
      </ScrollView>
    </View>
  );
};
export default MarketProductContainer;
