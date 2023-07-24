import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import imagePath from '../../../../Constants/imagePath';
import PaymentSuccessfulModal from '../PaymentSuccessfulModal/PaymentSuccessfulModal';
import PaymentUnsuccessModal from '../PaymentUnsuccessModal/PaymentUnsuccessModal';
import { styles } from './styles';

const PaymentInfo = () => {
  const [selectedValue, setSelectedValue] = useState('java');
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  return (
    <SafeAreaView style={styles.greetingsBody}>
      <View>
        <Text style={styles.greetingsRequestHeader}>Payment Information</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={imagePath.greetingsRectangle} />
        </View>
        <View style={{ margin: 13 }}>
          {/* <View style={styles.topCard}> */}
          <ScrollView horizontal>
            <TouchableOpacity>
              <Image
                source={imagePath.paypal}
                style={{ margin: 10, borderRadius: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={imagePath.bkash}
                style={{ margin: 10, borderRadius: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={imagePath.payneeor}
                style={{ margin: 10, borderRadius: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={imagePath.bank}
                style={{ margin: 10, borderRadius: 15 }}
              />
            </TouchableOpacity>
          </ScrollView>

          <View>
            <Text style={[styles.formText, { marginTop: 15 }]}>
              Card Holder Name
            </Text>
            <View style={styles.formText2}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#fff"
                placeholder="Joti"
                placeholderTextColor="gray"
              />
            </View>
          </View>

          <View>
            <Text style={[styles.formText, { marginTop: 15 }]}>Card Number</Text>
            <View style={styles.formText2}>
              <TextInput
                style={styles.textInputStyle}
                placeholderTextColor="#fff"
                placeholder="256354876"
                placeholderTextColor="gray"
              />
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Text style={[styles.formText, { width: '45%' }]}>Date</Text>
              <Text style={styles.formText}>CCTV</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.formText2, { width: '45%' }]}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  placeholder="23-04-22"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={[styles.formText2, { width: '45%' }]}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholderTextColor="#fff"
                  placeholder="125"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
          </View>

          <View style={styles.textInputView}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFAD00',
                width: '40%',
                borderRadius: 4,
                marginTop: 15,
              }}
              // onPress={() => setSuccessModal(true)}>
              onPress={() => setModal(true)}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 8,
                  color: '#292929',
                }}>
                Confirm Payment
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>

      <PaymentSuccessfulModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      <PaymentUnsuccessModal modal={modal} setModal={setModal} />
      {/* <PaymentModal modal={modal} setModal={setModal} /> */}
    </SafeAreaView>
  );
};

export default PaymentInfo;
