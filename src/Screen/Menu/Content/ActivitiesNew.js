import React from 'react';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import imagePath from '../../../Constants/imagePath';
import styles from './stylesActive';
const ActivitiesNew = () => {
     const width = Dimensions.get('window').width;
     return (
          <>
               <SafeAreaView style={styles.ActiveNew}>
                    <View style={{ position: 'relative' }}>
                         <Image source={imagePath.BgLane} style={styles.LaneBg} />
                         <Text style={styles.LaneText}>Learning Session</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangBR : styles.BgLangR}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangBR : styles.BgLangR}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             55
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             39
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             HOURS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             20
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             11
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             DAYS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             HOURS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                    </View>

                    <View style={{ position: 'relative', marginTop: 15 }}>
                         <Image source={imagePath.BgLane} style={styles.LaneBg} />
                         <Text style={styles.LaneText}>Live Chat</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             55
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             39
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             HOURS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             20
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             11
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                         <View style={styles.LagEr}>
                              <Image
                                   source={imagePath.BgLane1}
                                   style={width > 500 ? styles.ImgLanB : styles.ImgLan}
                              />
                              <Text style={width > 500 ? styles.LearnTextB : styles.LearnText}>
                                   Learning Session Title
                              </Text>
                              <View style={styles.LajFS}>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             DAYS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             HOURS
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             MIN
                                        </Text>
                                   </View>
                                   <View style={width > 500 ? styles.BgLangB : styles.BgLang}>
                                        <Text
                                             style={width > 500 ? styles.textLearMB : styles.textLearM}>
                                             05
                                        </Text>
                                        <Text style={width > 500 ? styles.textLearB : styles.textLear}>
                                             SEC
                                        </Text>
                                   </View>
                              </View>
                         </View>
                    </View>

                    <View style={{ position: 'relative', marginTop: 15 }}>
                         <Image source={imagePath.BgLane} style={styles.LaneBg} />
                         <Text style={styles.LaneText}>Audition Session</Text>
                    </View>

                    <View style={{ position: 'relative' }}>
                         <Image source={imagePath.BgLane2} style={styles.LaneBgA} />
                         <Text style={styles.LaneText}>Audition Session</Text>
                    </View>
               </SafeAreaView>
          </>
     );
};

export default ActivitiesNew;
