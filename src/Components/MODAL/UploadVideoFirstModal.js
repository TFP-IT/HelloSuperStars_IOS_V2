//import liraries
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import imagePath from '../../Constants/imagePath';
import React from 'react';

// create a component
const UploadVideoFirstModal = ({uploadDone, setUploadDone}) => {
  return (
    <>
      <Modal
        visible={uploadDone}
        transparent
        onRequestClose={() => setUploadDone(false)}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.topCard}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Pressable onPress={() => setUploadDone(false)}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      backgroundColor: '#ff0',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 50,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginTop: 5,
                    }}>
                    X
                  </Text>
                </Pressable>
              </View>
              <View style={styles.topCardChild}>
                <Text style={styles.text}>Upload Your Video First</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCardChild: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  topCard: {
    backgroundColor: '#000',
    margin: 8,
    borderRadius: 5,
  },

  //modal work start here
  text: {
    color: '#fff',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
    marginVertical: 20,
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 350,
    // height: 500,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFAD00',
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
});

//make this component available to the app
export default UploadVideoFirstModal;
