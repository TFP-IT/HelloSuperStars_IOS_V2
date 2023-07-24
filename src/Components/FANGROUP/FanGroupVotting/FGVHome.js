import {  Text, View ,SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
// import imagePath from '../../Constants/imagePath'

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FanGroupComment from '../FanGroupComment/FanGroupComment';
import imagePath from '../../../Constants/imagePath';
const FGVHome = () => {
  return (
    <View>

      <View style={styles.Card1}>
            <View style={styles.CardPost}>
                <Text style={styles.CardPostT}>Create a post</Text>
                <TextInput style={styles.CardInput} name="" placeholderTextColor={'white'} placeholder='Type here to post something...'/>
                
                <View style={styles.CardButtonH}>
                     <View>
                         <TouchableOpacity>
                              <Text style={styles.MediaUpload}><Icon  name="photo" color={'white'} />  Add photo</Text>
                          </TouchableOpacity>
                     </View>
                     <View>
                         <TouchableOpacity>
                              <Text style={styles.MediaUpload}><Icon  name="film" color={'white'} />  Add video</Text>
                          </TouchableOpacity>
                     </View>
                     <View>
                         <TouchableOpacity>
                              <Text style={styles.MediaUpload}><Icon  name="tag" color={'white'} />  Tag people</Text>
                          </TouchableOpacity>
                     </View>
                </View>
                
                <TouchableOpacity style={styles.CardInputButton}>
                    <Text style={styles.CardInputButtonT} >Post Now</Text>
                </TouchableOpacity>
            </View>
        </View>


        <View style={styles.CardRow}>
              <View style={styles.MainCard}>
                <TouchableOpacity style={styles.cardImg}>
                  <Image style={styles.starCardImg} source={imagePath.star1} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.cardText}>Ariful Hasan</Text>
                  <Text style={styles.time}>5:31 PM 2nd July  Shahrukh Khan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.CardContent}>
                <Text style={styles.cardContentText}>Which move best raees or sultan and why?</Text>

                <View>
                  <Image
                    style={styles.cardCoverImg}
                    source={imagePath.Group1}
                  />
                </View>

                <View style={styles.cardInfo}>
                  <View>
                    <Text style={styles.infoText}> 
                    <FontAwesome5 name={'heart'} />
                    240</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.infoText}>16 Comments</Text>
                    </View>
                    <View>
                      <Text style={styles.infoText}>106 Share</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 0.7,
                    margin: 10,
                  }}
                />
                <View style={styles.cardButtons}>
                  <TouchableOpacity style={styles.likeBtn}>
                    <Text style={styles.btnText}>  <Icon  name="heart" color={'red'} />Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.likeBtn}>
                    <Text style={styles.btnText}>  <FontAwesome5 name={'comment'} />Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.likeBtn}>
                    <Text style={styles.btnText}>  <FontAwesome5 name={'share'} />Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </View>

        <FanGroupComment /> 
    </View>
  )
}

export default FGVHome