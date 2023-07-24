//import liraries
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import imagePath from '../../../Constants/imagePath';

// const labels = ['Applied', 'Approved', 'Processing', 'Delivered', 'Son'];
const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

// create a component
const SouvenirInvoice = ({showModal, setShowModal}) => {
  const [stepChange, setStepChange] = useState({currentPosition: 0});

  onPageChange = position => {
    setStepChange({currentPosition: position});
  };

  return (
    <ScrollView style={{backgroundColor: '#000', flex: 1}}>
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          {/* <View
            style={{
              padding: 10,
              borderWidth: 1,

              borderRadius: 15,
            }}>
                
            </View> */}

          {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable onPress={() => setShowModal(false)}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  // fontSize: 20,

                  // marginHorizontal: 10,
                  backgroundColor: 'gold',
                  borderRadius: 50,
                  color: '#000',
                  // marginTop: 5,
                  padding: 8,
                }}>
                X
              </Text>
            </Pressable>
          </View> */}
          <View style={{margin: 8}}>
            <View style={styles.showcaseStatus}>
              <Text style={{color: '#ff0'}}>Showcase Status</Text>
            </View>

            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={stepChange.currentPosition}
                labels={labels}
                onPress={onPageChange}
              />
            </View>

            <View style={styles.showcaseForm}>
              <Image
                style={{width: '100%', height: 200}}
                source={imagePath.tShirt}
                resizeMode="stretch"
              />

              <View>
                <Text style={styles.inputText}>Name</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="Your Full Name"
                  placeholderTextColor={'#ddd'}
                />

                <Text style={styles.inputText}>Mail</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="Your Mail Address Here"
                  placeholderTextColor={'#ddd'}
                />

                <Text style={styles.inputText}>Address</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="206/19-B, Westrazabazr, Dhaka-1215"
                  placeholderTextColor={'#ddd'}
                />

                <Text style={styles.inputText}>Phone Number</Text>
                <TextInput
                  style={styles.inputBorder}
                  placeholder="+880"
                  placeholderTextColor={'#ddd'}
                />

                <Text style={styles.inputText}>Short Description</Text>
                <TextInput
                  style={styles.inputBorder}
                  multiline={true}
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dicta obcaecati "
                  placeholderTextColor={'#ddd'}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
    // </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  //modal work start here
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 360,
    // height: 500,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  showcaseStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  stepIndicator: {
    marginVertical: 8,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#343333',
  },
  showcaseForm: {
    backgroundColor: '#343333',
    padding: 10,
  },
  inputBorder: {
    // justifyContent: 'center',
    // // alignItems: 'stretch',
    // borderWidth: 0,
    backgroundColor: '#343333',
    // height: 40,
    // borderColor: '#D4AF37',
    // // borderRadius: 10,
    // // border: 0,
    // marginTop: 10,
    color: '#ffffff',
    height: 18,
    // margin: 12,
    borderWidth: 0,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputText: {
    marginTop: 8,
    marginLeft: 5,
    color: '#ddd',
  },
});

//make this component available to the app
export default SouvenirInvoice;
