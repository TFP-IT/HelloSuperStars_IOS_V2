import React, {useState} from 'react';
import {
View,
Text,
Image,
TouchableOpacity,} from 'react-native'
import styles from './styles';
import imagePath from '../../../Constants/imagePath';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LearnModal from '../../Modal/LearnModal';
export default function LearnCard() {

    const [show, setShow] = useState(false);

return (

<View>

    <View style={styles.LearnCardRow}>
        <View style={{ position: 'relative', }}>
            <Image style={styles.LearnCoverImg} source={imagePath.LearningBanner} />
            <View style={styles.mainLearnView}>
                <View style={{ paddingVertical: 2 ,paddingHorizontal: 10}}>
                    <Text style={{ color: 'white', fontSize: 15,paddingBottom:5}}>
                        Learning Session with Sakib (Online)
                    </Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize:12 }}>
                        10 February 2022 &nbsp; 10 : 30 PM
                    </Text>
                </View>
                <View style={styles.LearnFooter}>
                    <TouchableOpacity 
                        onPress={() => setShow(true)}
                    // onPress={()=> Navigation.navigate(navigationStrings.LEARNINGSESSION)}
                        style={styles.LearnBtn}>
                        <Text style={styles.LearnTxt}>
                            <FontAwesome5 name={'arrow-right'} /></Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.TimeHead}>
              <Image style={styles.LearnTimeImg} source={imagePath.ImgTime} />
                <Text style={styles.TimeText}>1 minute 10 Sec</Text>
            </View>

            <LearnModal show={show} setShow={setShow} />

        </View>
    </View>

</View>

)
}