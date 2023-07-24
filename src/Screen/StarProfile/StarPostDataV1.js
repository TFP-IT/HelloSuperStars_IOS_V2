import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import PostCartItem from '../../Components/GLOBAL/Card/PostCard/PostCartItem';
import imagePath from '../../Constants/imagePath';
import { useThemeColor } from '../../CustomHooks/useThemeColor';
import NoDataComp from '../../Components/NoDataComp';

const StarPostDataV1 = ({ data, star, filter, PostData }) => {
  const [StarPostDataV1List, setStarPostDataV1List] = useState([]);
  const windowHight = Dimensions.get('window').height;
  const { themeTextColor, themeBacground } = useThemeColor();

  //console.log('post data', data);

  function checkIfStarPostDataV1(item) {
    if (item.type == filter) {
      return true;
    }
  }
  const filterStarPostDataV1 = () => {
    if (filter === 'null') {
      setStarPostDataV1List(data);
    } else {
      setStarPostDataV1List(data.filter(checkIfStarPostDataV1));
    }
    //console.log('live chat data', StarPostDataV1List);
  };

  useEffect(() => {
    // console.log('PostData----------', PostData);
    //getAllStarPostDataV1ListByStarID()
    filterStarPostDataV1();
  }, [data && data]);

  //console.log('star', star);
  //console.log('data', star);

  return (
    <>
      <View style={[{ minHeight: windowHight / 2 }, themeBacground]}>
        <>
          {StarPostDataV1List.length != 0 ? (
            <>
              {StarPostDataV1List &&
                StarPostDataV1List.map((data, index) => (
                  // <PostCard key={index} post={data} />
                  <PostCartItem key={index} postConfig={{ index }} data={data} />
                ))}
            </>
          ) : (
            <>
              <NoDataComp />
            </>
          )}
        </>
      </View>
    </>
  );
};

export default StarPostDataV1;
