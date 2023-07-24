import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Heading from '../../../Components/GLOBAL/Reuseable/Heading';
import HeaderComp from '../../../Components/HeaderComp';
import { FlatGrid } from 'react-native-super-grid';
import UnderlineImage from '../../../Components/GLOBAL/Reuseable/UnderlineImage';
import imagePath from '../../../Constants/imagePath';

import RoundTopBanner from '../Round1/RoundTopBanner';
import { Text } from 'react-native-paper';
import AppUrl from '../../../RestApi/AppUrl';
import TitleHeader from '../../../Components/TitleHeader';

const Judges = ({ navigation, route }) => {
  const {
    title,
    roundName,
    auditionTitle,
    auditionImage,
    auditionId,
    roundId,
    remainingTime,
    judges,
    juries,
  } = route.params;
  console.log('remainTime', route.params);
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <RoundTopBanner
          title={title}
          RoundName={roundName}
          auditionTitle={auditionTitle}
          auditionImage={auditionImage}
          remainingTime={remainingTime}
        />
        <TitleHeader title={'Who will judge you !'} />
        <View
          style={{
            backgroundColor: '#272727',
            paddingBottom: 10,
            borderRadius: 10,
            marginTop: 5,
            marginHorizontal: 10
          }}>
          {/* <Heading heading="Who will judge you" />
          <UnderlineImage /> */}

          <FlatGrid
            itemDimension={180}
            data={judges}
            renderItem={({ item }) => {
              return (
                <View style={styles.borderBg}>
                  {item.user.image === null ? (
                    <Image
                      source={imagePath.noImageUser}
                      style={{ height: '90%', width: '100%' }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: AppUrl.MediaBaseUrl + item.user.image,
                      }}
                      style={{ height: '90%', width: '100%' }}
                    />
                  )}
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    {item.user?.first_name} {item.user?.last_name}
                  </Text>
                </View>
              );
            }}
          />
          {/* <Heading heading="Incredible jury waiting for you" /> */}
          <TitleHeader title={'Increadible jury waiting for you'} />

          <FlatGrid
            itemDimension={180}
            data={juries}
            renderItem={({ item }) => {
              return (
                <View style={styles.borderBg}>
                  {item.user.image === null ? (
                    <Image
                      source={imagePath.noImageUser}
                      style={{ height: '90%', width: '100%' }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: AppUrl.MediaBaseUrl + item.user.image,
                      }}
                      style={{ height: '90%', width: '100%' }}
                    />
                  )}
                  <Text style={{ color: 'white', textAlign: 'center' }}>
                    {item.user?.first_name} {item.user?.last_name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Judges;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  jamesImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  blackBg: {
    // flex: 1,
    position: 'absolute',
    width: '100%',
    top: '50%',
  },
  jamesBg: {
    flex: 1,
    margin: 8,
    position: 'relative',
    height: 150,
    overflow: 'hidden',
    borderRadius: 10,
  },
  borderBg: {
    margin: 8,
    borderColor: '#ff0',
    borderWidth: 1,
    height: 180,
    width: '90%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  centerElement: {
    position: 'absolute',
    top: '20%',
    left: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
