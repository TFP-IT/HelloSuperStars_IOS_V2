import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export const RememberToken = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    AsyncStorage.getItem('auth_token').then(value => {
      setToken(value);
    });
  }, []);

  {
    token;
  }
};
