import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import HeaderComp from '../../Components/HeaderComp';
import AppUrl from '../../RestApi/AppUrl';
// import HomeOnlineStars from './HomeOnlineStars/HomeOnlineStars';
import HomeOnlineStars from '../Home/HomeOnlineStars/HomeOnlineStars';
import PostContainer from '../Home/HomePostContainer/PostContainer';
import styles from './styles';

function UpCommingPost({ route }) {
    const navigation = useNavigation();
    const [postPage, setPostPage] = useState(1);
    const { type } = route.params;


    useEffect(() => {
        console.log(postPage)

    }, [])


    return (
        <View style={{ backgroundColor: 'black' }}>
            {/* <LearningSessionNav /> */}
            {/* <VideoUploadLearningSession /> */}
            {/* <ResultLearningSession /> */}
            <SafeAreaView>
                {/*.............. custom header start .............. */}
                <HeaderComp backFunc={() => navigation.goBack()} />

                <View >
                    <PostContainer
                        path={AppUrl.AllPostWithPagination + 20 + `?page=${postPage}`}
                        postPage={postPage}
                        setPostPage={setPostPage}
                        type={type}
                    // setFilterPost="no"
                    />
                </View>
                {/* ...........Home Page card end................... */}

                {/* <View>
            <Text style={styles.text}>Shohan Screen</Text>
            <Button onPress={HandelProfile} title="GO to Profile"></Button>
          </View> 
           */}
            </SafeAreaView>
        </View>
    );
}

export default UpCommingPost;
