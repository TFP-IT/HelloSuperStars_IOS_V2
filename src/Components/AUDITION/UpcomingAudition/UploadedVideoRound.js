import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../../Constants/imagePath';
// import imagePath from '../../Constants/imagePath';
import AppealRequestModal from '../../MODAL/AppealRequestModal';
import UnderlineImage from '../../GLOBAL/Reuseable/UnderlineImage';
import RequestPending from './RequestPending';
import styles from './styles';

const UploadedVideoRound = () => {
  const Navigation = useNavigation();
  const [show, setShow] = useState(false);

  const [appeal, setAppeal] = useState(false);
  const [apply, setApply] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {/* Home Page 39 */}
      <View style={styles.topCard}>
        <Text style={styles.fonts}>Your Uploaded Round 1 videos</Text>
        <UnderlineImage />
        <View style={styles.VideoT}>
          <View style={{flex: 1, margin: 8}}>
            <Image source={imagePath.Rectangle} style={styles.AudiImg} />
            <View style={styles.VideoTax}>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle2} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle3} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle1} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1,  margin: 8}}>
            <Image source={imagePath.Rectangle} style={styles.AudiImg} />
            <View style={styles.VideoTax}>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle2} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle3} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle1} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.VideoT}>
          <View style={{flex: 1, margin: 8}}>
            <Image source={imagePath.Rectangle} style={styles.AudiImg} />
            <View style={styles.VideoTax}>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle2} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle3} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle1} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1,  margin: 8}}>
            <Image source={imagePath.Rectangle} style={styles.AudiImg} />
            <View style={styles.VideoTax}>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle2} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle3} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
              <View styles={styles.ImgVideo}>
                <Image source={imagePath.Rectangle1} style={styles.AudiImg2} />
                <Text style={styles.TextW}>20</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Not Qualified */}
      {!appeal ? (
        <>
          <View style={styles.Card}>
            <View>
              <Image source={imagePath.Rectangle4} style={styles.AudiImgCard} />
            </View>
            <View>
              <Text style={styles.Input}>Your total marks</Text>
            </View>
            <View>
              <TextInput
                type=""
                name=""
                style={styles.Input1}
                placeholder="80"
                placeholderTextColor={'white'}
              />
            </View>

            <View>
              <Text style={styles.Input2}>
                You are not Qualified {'\n'}for the next Round
              </Text>
            </View>
          </View>

          <TouchableOpacity style={{backgroundColor: '#000000'}} onPress={() => setShow(true)}>
            <LinearGradient
              colors={['#FFAD00', '#E19A04', '#FACF75']}
              style={styles.CardA}>
              <Text style={styles.CardTex}>Appeal Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
          <>
                  <View style={styles.Card}>
        <View>
          <Image source={imagePath.Rectangle4} style={styles.AudiImgCard} />
        </View>
        <View>
          <Text style={styles.Input}>Your total marks</Text>
        </View>
        <View>
          <TextInput
            type=""
            name=""
            style={styles.Input1}
            placeholder="80"
            placeholderTextColor={'white'}
          />
        </View>

        <View>
          <Text style={styles.Input3}>
            You are Qualified {'\n'}for the next Round
          </Text>
        </View>
      </View>

      {apply ? (
        <>
          {/* Home Page 41 */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#79EC66', '#79EC66', '#79EC66']}
              style={styles.CardA}>
              <Text style={styles.CardTex}>Certificate Request Pending</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* Home Page 41 End */}

          {/* Home Page 40 End*/}

          {/* Home Page 42 */}
          <View style={styles.LastZ}>
            <Text style={styles.TextG}>Download Your Certificate </Text>
            <Text>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#79EC66', '#79EC66', '#79EC66']}
                  style={styles.CardA}>
                  <Text style={styles.CardTexG}>Download</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Text>
          </View>
          {/* Home Page 42 */}
        </>
      ) : (
        <RequestPending apply={apply} setApply={setApply} />
      )}
          </>
      )}

      <AppealRequestModal
        appeal={appeal}
        setAppeal={setAppeal}
        show={show}
        setShow={setShow}
      />

      {/* <Button title='yo button' onPress={()=>Navigation.navigate(navigationStrings.VOTING)} /> */}

      {/* Home Page 39  end*/}

      {/* Home Page 40 */}

    </View>
  );
};

export default UploadedVideoRound;
