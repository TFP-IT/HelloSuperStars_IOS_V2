import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import imagePath from '../../../../Constants/imagePath';
import { styles } from './styles';

const GreetingsHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#343434' }}>
      {/* <View>
        <Text>This is Greetings Home</Text>
    </View> */}
      <View style={styles.CardRow}>
        <View style={styles.MainCard}>
          <TouchableOpacity style={styles.cardImg}>
            <Image
              style={styles.starCardImg}
              source={imagePath.greetingsHomePageStar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Greetings')}>
            <Text style={styles.cardText}>Shakib Al Hasan</Text>
            <Text style={styles.time}>5.31pm 2nd july </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CardContent}>
          <Text style={styles.cardContentText}>
            Coming live at 9.00 PM tonight. See
          </Text>
          <Text style={styles.cardContentText}>you there 🏏</Text>

          <View style={{ position: 'relative' }}>
            <Image
              style={styles.cardCoverImg}
              source={imagePath.greetingsHomePageStar}
            />
          </View>

          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.infoText}>
                <FontAwesome5 name={'heart'} />
                240
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
              <Text style={styles.btnText}>
                {' '}
                <Icon name="heart" color={'red'} />
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'comment'} />
                Comment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'share'} />
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.CardRow}>
        <View style={styles.MainCard}>
          <TouchableOpacity style={styles.cardImg}>
            <Image
              style={styles.starCardImg}
              source={imagePath.greetingsHomePageStar}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.cardText}>Shakib Al Hasan</Text>
            <Text style={styles.time}>5.31pm 2nd july </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CardContent}>
          <Text style={styles.cardContentText}>Coming live very soon</Text>

          <View style={{ position: 'relative' }}>
            <Image
              style={styles.cardCoverImgBlur}
              source={imagePath.greetingsTigerStar}
              blurRadius={2}
            />
            <Image
              style={{ position: 'absolute', left: '50%', top: '40%' }}
              source={imagePath.greetingsPause}
            //   blurRadius={2}
            />
          </View>

          <View style={styles.cardInfo}>
            <View>
              <Text style={styles.infoText}>
                <FontAwesome5 name={'heart'} />
                240
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
              <Text style={styles.btnText}>
                {' '}
                <Icon name="heart" color={'red'} />
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'comment'} />
                Comment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.likeBtn}>
              <Text style={styles.btnText}>
                {' '}
                <FontAwesome5 name={'share'} />
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GreetingsHome;
