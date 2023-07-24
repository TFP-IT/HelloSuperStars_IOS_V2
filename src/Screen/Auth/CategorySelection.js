//import liraries
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import LoaderComp from '../../Components/LoaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';

import LinearGradient from 'react-native-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppUrl from '../../RestApi/AppUrl';

// create a component
const CategorySelection = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const { axiosConfig, authContext } = useContext(AuthContext);
  const [buffer, setBuffer] = useState(true);
  const [category, setCategory] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const screen = Dimensions.get('screen');




  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = () => {
    axios
      .get(`${AppUrl.BaseUrl}view-category-mobile`)
      .then(res => {
        ////console.log(res.data.category)
        if (res.data.status === 200) {
          setBuffer(false);
          makeCatrgoryArry(res.data.category);
          //setCategory(res.data.category)
        } else {
          setBuffer(false);
        }
      })
      .catch(err => {
        alert('network problem');
      });
  };

  const makeCatrgoryArry = data => {
    let categoryArry = data.map((item, index) => {
      item.isSelected = false;
      return { ...item };
    });

    setCategory(categoryArry);
  };

  const selectHandaler = valu => {
    let categoryArry = category.map((item, index) => {
      if (valu == index) {
        item.isSelected = !item.isSelected;
      }
      return { ...item };
    });

    setCategory(categoryArry);
  };

  const selectAllCategory = () => {
    setSelectAll(!selectAll);
    let categoryArry = category.map(item => {
      item.isSelected = !selectAll;

      return { ...item };
    });

    setCategory(categoryArry);
  };

  const catergoryDoneHandel = () => {
    setBuffer(true);
    const selected = category.filter(item => item.isSelected);
    let selectedCategory = [];
    selected.map(valu => {
      if (valu.isSelected) {
        selectedCategory.push(valu.id);
      }
    });

    if (selected.length <= 0) {
      setBuffer(false);
      Toast.show('Place Select Some Category', Toast.durations.SHORT);
    } else {
      let formData = {
        category: JSON.stringify(selectedCategory),
      };

      axios
        .post(AppUrl.categoryAdd, formData, axiosConfig)
        .then(res => {
          setBuffer(false);
          if (res.data.status === 200) {
            authContext.category();
            Toast.show('Successfully Added', Toast.durations.SHORT);
          }
        })
        .catch(err => {
          setBuffer(false);
          console.log(err);
          Toast.show('problem', Toast.durations.SHORT);
          // alert('network problem')
        });
    }
  };

  return (
    <>
      {buffer ? <LoaderComp /> : <></>}

      <ImageBackground
        style={styles.container}
        source={imagePath.background}
        resizeMode="cover">
        <View style={styles.header}>
          <Animatable.Image
            animation="zoomIn"
            // duration="1500"

            source={imagePath.logo}
            style={{ height: 100, width: 100 }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose Category</Text>
          </View>
        </View>
        <Animatable.View
          style={windowWidth > 600 ? styles.footerWithScreen : styles.footer}
          animation="slideInUp">
          <FlatGrid
            spacing={10}
            itemDimension={120}
            data={category}
            renderItem={({ item, index }) => (
              <View>
                <TouchableOpacity
                  style={styles.categoryitem}
                  key={index}
                  onPress={() => selectHandaler(index)}>
                  {item.isSelected ? (
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#ffa825', '#ffce48', '#ab6616']}>
                      <Text style={styles.btn_textActive}>{item.name}</Text>
                      {/* <Text style={styles.btn_text}>
                                    <Icon name={item.isSelected ? "checkcircle" : ""} size={20} color="#D4AF37" />
                                </Text> */}
                    </LinearGradient>
                  ) : (
                    <Text style={styles.btn_text}>{item.name}</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.btn_container}>
            <TouchableOpacity style={styles.btn_selct_all}>
              <AntDesign name="caretleft" size={14} color="black" />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  paddingHorizontal: 20,
                }}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn_selct_all}
              onPress={selectAllCategory}>
              {selectAll ? (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={20}
                  color="black"
                />
              )}
              <Text style={styles.action_button_text}>SELECT ALL</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btn_primamary}
            onPress={catergoryDoneHandel}>
            <Text style={styles.action_button_text_submit}>SUBMIT</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderColor: 'red',
    height: 809,
  },
  CategoryContainer: {
    flexDirection: 'column',
    minHeight: 400,
  },
  btn_textActive: {
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: '500',
  },
  btn_text: {
    color: '#FFAD00',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: '500',
  },
  action_button_text: {
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    fontWeight: '500',
  },
  action_button_text_submit: {
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontWeight: '500',
  },
  categoryitem: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1.5,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    bottom: 30,
  },
  footerWithScreen: {
    flex: 1,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginHorizontal: 200,
  },
  titleContainer: {
    borderColor: '#FFAD00',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginTop: 10,
  },

  title: {
    color: '#FFAD00',
    fontSize: 24,
  },

  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    bottom: 10,
  },

  btn_primamary: {
    backgroundColor: '#FFAD00',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    bottom: 10,
    color: 'black',
    marginHorizontal: 7,
  },

  btn_out_line: {
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },

  btn_selct_all: {
    flexDirection: 'row',
    backgroundColor: '#FFAD00',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },
});

//make this component available to the app
export default CategorySelection;
