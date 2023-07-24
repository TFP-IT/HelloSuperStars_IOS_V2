import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import bannerImage from '../../Assets/Images/starBanner.png';
import HeaderComp from '../../Components/HeaderComp';
import navigationStrings from '../../Constants/navigationStrings';
import LiveChat from '../StarProfile/LiveChat/LiveChat';
import LiveChatDetails from './../StarProfile/LiveChat/LiveChatDetails';
import profileNavigatr from './../StarProfile/Profile/profileNavigatr';
import { styles } from './styles.js';

const Greetings = () => {
  const navigation = useNavigation();
  const [profileNavigate, setProfileNavigate] = useState(profileNavigatr.POST);
  function handlePress() {
    return navigation.navigate(navigationStrings.MEETUP);
  }

  return (
    <SafeAreaView>
      <HeaderComp />
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={styles.banner}>
            <Image source={bannerImage} style={styles.bannerImage} />
          </View>

          <View style={styles.profileImageContainer}>
            <Image source={bannerImage} style={styles.proImage} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}> Sakib Al Hasan </Text>
              <Text style={styles.active}>@sakibalhasan</Text>
            </View>
          </View>
          {/* fist navigator */}
          <View style={styles.postNavigator}>
            <TouchableOpacity
              onPress={() => setProfileNavigate(profileNavigatr.POST)}>
              <Text
                style={
                  profileNavigate == profileNavigatr.POST
                    ? styles.active
                    : { color: 'white' }
                }>
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: 'white' }}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: 'white' }}>Videos</Text>
            </TouchableOpacity>
          </View>
          {/* second navigator    */}
          <View style={styles.ProfileOption}>
            <TouchableOpacity style={styles.ProfileItem}>
              <Image source={bannerImage} style={styles.roundImage} />
              <Text style={styles.ProfileItemText}>Greetings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                profileNavigate == profileNavigatr.LIVECHAT ||
                  profileNavigate == profileNavigatr.LIVECHATDETAILS
                  ? styles.ProfileItemActive
                  : styles.ProfileItem
              }
              onPress={() => setProfileNavigate(profileNavigatr.LIVECHAT)}>
              <Image source={bannerImage} style={styles.roundImage} />
              <Text
                style={
                  profileNavigate == profileNavigatr.LIVECHAT ||
                    profileNavigate == profileNavigatr.LIVECHATDETAILS
                    ? styles.ProfileItemTextActive
                    : styles.ProfileItemText
                }>
                Live Chat
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ProfileItem}>
              <Image source={bannerImage} style={styles.roundImage} />
              <Text style={styles.ProfileItemText}>Audition</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ProfileItem}>
              <Image source={bannerImage} style={styles.roundImage} />
              <Text style={styles.ProfileItemText}>Souvenir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContainer}>
          {/* {profileNavigate == profileNavigatr.POST ?   <HomeCard onPress={handlePress} /> : <></>} */}
          {profileNavigate == profileNavigatr.LIVECHAT ? (
            <LiveChat setProfileNavigate={setProfileNavigate} />
          ) : (
            <></>
          )}
          {profileNavigate == profileNavigatr.LIVECHATDETAILS ? (
            <LiveChatDetails />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Greetings;
