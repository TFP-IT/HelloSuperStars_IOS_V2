import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagePath from '../../Constants/imagePath';

import styles from './styles';

function Setting({ route }) {
  const navigation = useNavigation();
  // const { title } = route.params
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isEnabled1, setIsEnabled1] = React.useState(false);
  const [isEnabled2, setIsEnabled2] = React.useState(false);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* custom header start */}
        {/* <HeaderComp text="Menu" status="back" /> */}
        {/* custom header end */}

        {/* profile name start */}
        <TouchableOpacity
          style={{
            backgroundColor: '#343434',
            marginVertical: 3,
            flexDirection: 'row',
            paddingVertical: 4,
            borderRadius: 5,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            }}>
            <Image source={imagePath.menuUser} />
          </View>
          <View style={{ marginLeft: 7 }}>
            <Text style={{ color: 'white', fontSize: 18 }}>User Name</Text>
            <Text style={{ color: 'gray' }}>See your profile</Text>
          </View>
        </TouchableOpacity>
        {/* profile name end */}

        {/* main content start */}
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <ScrollView horizontal>
              <TouchableOpacity style={styles.mainRow}>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                  <Image source={imagePath.menuIconActivity} />
                </View>
                <View>
                  <Text style={styles.fonts}>Activities</Text>
                  <Text style={styles.fonts2}>4 activities</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mainRow}>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                  <Image source={imagePath.menuIconStar} />
                </View>
                <View>
                  <Text style={styles.fonts}>Followers</Text>
                  <Text style={styles.fonts2}>20305 followers</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mainRow}>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                  <Image source={imagePath.menuIconGroup} />
                </View>
                <View>
                  <Text style={styles.fonts}>Fan Group</Text>
                  <Text style={styles.fonts2}>6 activities</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={{ alignItems: 'center' }}>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ height: 70, width: 70, marginTop: 5 }}
                    source={imagePath.menuactivity1}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsEnabled(!isEnabled)}
                    value={isEnabled}
                  />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 11 }}>
                      Social Media
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.mainRow}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ height: 70, width: 70, marginTop: 5 }}
                    source={imagePath.menuactivity2}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled1 ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsEnabled1(!isEnabled1)}
                    value={isEnabled1}
                  />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 11 }}>
                      EnterTainment
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.mainRow}>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ height: 70, width: 70, marginTop: 5 }}
                    source={imagePath.menuactivity3}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Switch
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setIsEnabled2(!isEnabled2)}
                    value={isEnabled2}
                  />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 11 }}>Kids</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.horizontalLine} />
          {/* Live Now start */}
          <View style={{ alignItems: 'center' }}>
            <View>
              <Text style={styles.cardText}>Live Now</Text>
            </View>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View style={styles.cardRow2}>
                  <Image source={imagePath.Rock} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Dwayne Johnson
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Srk} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Shrukh khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Salman} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Salman khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Live Now end */}

          {/* Learning sessions start */}
          <View style={{ alignItems: 'center' }}>
            <View>
              <Text style={styles.cardText}>Learning sessions</Text>
            </View>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Rock} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Dwayne Johnson
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Srk} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Shrukh khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Salman} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Salman khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Learning sessions end */}

          {/* Live Chat start */}
          <View style={{ alignItems: 'center' }}>
            <View>
              <Text style={styles.cardText}>Live Chat</Text>
            </View>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Rock} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Dwayne Johnson
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Srk} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Shrukh khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Salman} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Salman khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Live Chat end */}

          {/* Upcoming Events start */}
          <View style={{ alignItems: 'center' }}>
            <View>
              <Text style={styles.cardText}>Upcoming Events</Text>
            </View>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Rock} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Dwayne Johnson
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Srk} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Shrukh khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Salman} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Salman khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Upcoming Events end */}

          {/* Meetup Events start */}
          <View style={{ alignItems: 'center' }}>
            <View>
              <Text style={styles.cardText}>Meetup events</Text>
            </View>
            <ScrollView horizontal style={{ marginTop: 5 }}>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Rock} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Dwayne Johnson
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Srk} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Shrukh khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
              <View style={styles.mainRow}>
                <View
                  style={{ backgroundColor: '#3C1919', position: 'relative' }}>
                  <Image source={imagePath.Salman} style={{ width: '100%' }} />
                  <TouchableOpacity>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      Salman khan
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.CardRow3}></View>
                </View>
              </View>
            </ScrollView>
          </View>
          {/* Meetup Events end */}

          <View style={{ paddingBottom: 110 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#343434',
                marginVertical: 3,
                flexDirection: 'row',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Image source={imagePath.menuWallet} />
              </View>
              <View style={{ marginLeft: 17 }}>
                <Text style={{ color: '#FFAD00', fontSize: 18 }}>Wallet</Text>
                <Text style={{ color: '#DE5500' }}>2120 diamond availabe</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#343434',
                marginVertical: 3,
                flexDirection: 'row',
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Image source={imagePath.menuProfile} />
              </View>
              <View style={{ marginLeft: 17 }}>
                <Text style={{ color: '#FFAD00', fontSize: 18 }}>Audition</Text>
                <Text style={{ color: '#DE5500' }}>1 pending</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#343434',
                marginVertical: 3,
                flexDirection: 'row',
                borderRadius: 5,
                paddingVertical: 5,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                }}>
                <Image source={imagePath.menuSetting} />
              </View>
              <View style={{ marginLeft: 17, justifyContent: 'center' }}>
                <Text style={{ color: '#FFAD00', fontSize: 18 }}>Setting</Text>
                {/* <Text style={{color: '#DE5500'}}>1 pending</Text> */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFAD00',
                marginVertical: 3,
                borderRadius: 5,
                paddingVertical: 5,
              }}>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* main content end */}
      </SafeAreaView>
    </View>
  );
}

export default Setting;
