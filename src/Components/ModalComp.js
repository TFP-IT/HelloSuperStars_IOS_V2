/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
const TitleFont = ({title}) => {
  return (
    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#ffaa00'}}>
      {title}
    </Text>
  );
};
const SubContentText = ({title}) => {
  return <Text style={styles.contentText}>{title}</Text>;
};

const ModalComp = ({toggleModal, checkBoxIcon, setCheckBoxIcon}) => {
  function hadndleCheckBox() {
    setCheckBoxIcon(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBody}>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{marginRight: 5, paddingVertical: 2}}>
              <SimpleLineIcons name="close" size={20} color="red" />
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titleFont}>END USER LICENCE AGREEMENT</Text>

        <ScrollView>
          <SubContentText
            title={
              'There are some Software Licenses and Agreements to install and use Hello Super Stars Application and if you install this application then you should accept all of the terms and conditions are given below,'
            }
          />
          <View style={styles.contents}>
            <View style={{marginVertical: 4}}>
              <TitleFont title="1. License Grant and terms of Use :- " />
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'Copies:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'User can download this application from authorized source and user may not make a copy of the Application available on a network where it could be used by multiple users at the same time. You may not make the Application available over a network where it could be downloaded by multiple users.'
                  }
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'License Validation:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'Users should ensure an internet connection are required to validate the license for certain products distributed by EA.'
                  }
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'App Update:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'You agree that the Application may automatically download and install updates, upgrades and additional features that EA deems reasonable, beneficial to you and reasonably necessary.'
                  }
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'Fees and Payments:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'There are some physical goods that will be delivered physically to the user if a user buys these products with minimum cost and it suggests paying these payments and encouraging to avoid defrauding.'
                  }
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'Third Party Software:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'There have used some third-party software like payment gateway and video, and audio features. this app ensures that user information will never share with third parties. '
                  }
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'User Data:'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    "User's data is collected to help the user re-login and it suggests a shortcut way to buy physical goods. Data is not sharable to third parties."
                  }
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginVertical: 4}}>
              <View style={{flex: 0.3}}>
                <TitleFont title={'Limitation and Restriction'} />
              </View>
              <View style={{flex: 1, marginLeft: 3}}>
                <SubContentText
                  title={
                    'There have some restrictions in Learning Session, Live Chat, Auditions, Questions and Answering, Fan Group and others module nevers suggest to post of share any types of  adult, crime and others contents which are harmful for human and for these type of missbehavaour user will be removed from Hello Super Stars application.'
                  }
                />
              </View>
            </View>

            <View style={styles.checkBoxContainer}>
              {/* checkbox-outline */}
              <TouchableOpacity onPress={hadndleCheckBox}>
                <Ionicons
                  name={`${checkBoxIcon ? 'checkbox' : 'checkbox-outline'}`}
                  color={'#ffaa00'}
                  size={20}
                />
              </TouchableOpacity>
              <View>
                <Text style={{marginHorizontal: 4, color: '#fff'}}>
                  I agree with the terms and Conditions
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{marginVertical: 5, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              checkBoxIcon ? toggleModal() : null;
            }}
            style={{width: 100}}
            disabled={!checkBoxIcon ? true : false}>
            <LinearGradient
              style={{paddingVertical: 10, borderRadius: 10}}
              //   colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}

              colors={
                !checkBoxIcon
                  ? ['rgba(251, 222, 4, 0.40)', 'rgba(243, 210, 4, 0.13)']
                  : ['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']
              }>
              <Text style={{color: 'black', textAlign: 'center'}}>AGREE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalComp;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalBody: {
    backgroundColor: '#201E3C',
    borderRadius: 5,
    height: windowHeight - 300,

    padding: 5,
  },
  titleFont: {
    fontSize: 17,
    textAlign: 'center',
    color: '#ffaa00',
    fontWeight: 'bold',
  },
  contents: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  contentText: {
    color: 'white',
    fontSize: 13,
  },

  checkBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
});
