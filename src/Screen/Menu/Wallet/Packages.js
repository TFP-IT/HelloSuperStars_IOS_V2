import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import imagePath from '../../../Constants/imagePath';
import styles from './Styles';
import PackageDetails from './PackageDetails';
import * as Animatable from 'react-native-animatable';
import PackageItem from './PackageItem';
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

import axios from 'axios';
import { AuthContext } from '../../../Constants/context';
import AppUrl from '../../../RestApi/AppUrl';
import PaymentComp from '../../../Components/GLOBAL/PaymentComp/PaymentComp';

const Packages = () => {
  const { axiosConfig } = useContext(AuthContext);
  const [buffre, setBuffre] = useState(true);
  const [packagesData, setPackagesData] = useState([])
  const [reactBundel, setreactBundel] = useState([])
  const [paymentView, setPaymentView] = useState(false)
  const [singlePackage, setSinglePackage] = useState()

  useEffect(() => {
    getAllpackeges()
  }, [])

  const getAllpackeges = () => {
    axios.get(AppUrl.AllPackages, axiosConfig).then((res) => {
      setBuffre(false)
      if (res.data.status === 200) {
        setPackagesData(res.data.allPackages)
        setreactBundel(res.data.reactBundel)
      }
    }).catch((err) => {
      console.log(err)
      // alert('network problem')
    })
  }

  const [PackegeId, setPackegeId] = useState()
  const [PackegeType, setPackegeType] = useState()
  const [buyFor, setbuyFor] = useState()
  const handelPaymentView = (item, type, buyFor) => {
    setPaymentView(true)
    setPackegeId(item.id)
    setPackegeType(type)
    setbuyFor(buyFor)
    setSinglePackage(item)
  }


  return (
    <>
      <View style={{ margin: 10, borderRadius: 10, backgroundColor: '#343434' }}>
        <Text style={{ color: '#F4EAFB', textAlign: 'center', marginTop: 13, fontSize: 18 }}>
          Available Package
        </Text>
        <View style={styles.vlLine} />
        {buffre ?

          <SkeletonPlaceholder
            backgroundColor='#2e2e2e'
            highlightColor="#3d3d3d"
            height="200"
          >
            <SkeletonPlaceholder.Item width="95%" height={90} borderRadius={10} marginLeft={8} marginRight={8} marginTop={20} />
            <SkeletonPlaceholder.Item width="95%" height={90} borderRadius={10} marginLeft={8} marginRight={8} marginTop={5} />
            <SkeletonPlaceholder.Item width="95%" height={90} borderRadius={10} marginLeft={8} marginRight={8} marginTop={5} marginBottom={20} />

          </SkeletonPlaceholder >
          :
          <>
            {packagesData && !paymentView ?
              <>
                {packagesData.map((item, index) =>
                  <PackageItem key={index} data={item} handelPaymentView={() => handelPaymentView(item, 'packageBuy', 'regular')} type={'packageBuy'} />
                )}
                {reactBundel.map((item, index) =>
                  <PackageItem key={index} data={item} handelPaymentView={() => handelPaymentView(item, 'packageBuy', 'lovebundel')} type={'reactBundel'} />
                )}
              </>

              :

              <PaymentComp setPaymentView={setPaymentView} type={PackegeType} PackegeId={PackegeId} buyFor={buyFor} singlePackage={singlePackage} />
            }

          </>
        }


      </View>
    </>
  );
};

export default Packages;
