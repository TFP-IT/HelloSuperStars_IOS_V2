import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, Image, Text } from 'react-native';
import MarketPlaceSkeleton from '../../../Components/Skeleton/MarketSkeleton/MarketPlaceSkeleton';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AuctionProductCard from '../AuctionProductCard/AuctionProductCard';
import NoDataComp from '../../../Components/NoDataComp';

const AuctionProductContainer = ({ apiInPoint }) => {
  const { axiosConfig } = useContext(AuthContext);

  const [auctionData, setAuctionData] = useState([]);
  const [loder, setLoder] = useState(true);

  const [Refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getAllAuctionPost();
    setRefreshing(false);
  };

  useEffect(() => {
    getAllAuctionPost();
  }, [apiInPoint]);

  const getAllAuctionPost = async () => {
    setLoder(true);
    let res = await axios
      .get(apiInPoint, axiosConfig)
      .then(res => {
        if (res.data.status === 200) {
          setLoder(false);
          setAuctionData(res.data.product);
        }
      })
      .catch(err => {
        console.log(err);
        // alert('network problem')
      });
  };

  return (
    <View style={{ paddingBottom: 200 }}>
      <ScrollView
        style={{ marginBottom: 95, backgroundColor: 'black' }}
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

        {auctionData.length > 0 ? (
          auctionData.map((data, index) => (
            <AuctionProductCard data={data} key={index} />
          ))
        ) : (
          <NoDataComp />
        )}
      </ScrollView>
    </View>
  );
};
export default AuctionProductContainer;
