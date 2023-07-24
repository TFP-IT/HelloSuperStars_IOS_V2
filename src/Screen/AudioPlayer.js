import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = () => {
  const [music, setMusic] = React.useState(null);
  React.useEffect(() => {
    play();
  }, []);
  const play = () => {
    let summer = new Sound('summer.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('error', err);
        return;
      }
      summer.play(success => {
        console.log('music playing', success);
      });
    });
    //console.log('success,', summer);
    setMusic(summer);
  };
  return (
    <View>
      <Button
        title="play"
        onPress={() => {
          play();
        }}
      />
      <Button
        title="pause"
        onPress={() => {
          music.pause();
        }}
      />
      <Button
        title="play"
        onPress={() => {
          music.play();
        }}
      />
      <Button
        title="stop"
        onPress={() => {
          music.stop();
        }}
      />
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({});
