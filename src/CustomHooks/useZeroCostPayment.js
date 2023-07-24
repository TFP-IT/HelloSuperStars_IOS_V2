
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Constants/context';
import AppUrl from '../RestApi/AppUrl';

// const registerData = {
//     quantity: "",
//     event_id: "",
//     event_registration_id: "",
//     notification_id: "",
//     model_name: "",
//     fee: "",
//     start_time: "",
//     end_time: "",
//     payment_method: "Free-Registaion",
//   }
//   const { freeRegistration, freeRegBuffer } = useZeroCostPayment(registerData)
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';

export const useZeroCostPayment = (payload) => {
    const { axiosConfig, getActivity } = useContext(AuthContext);
    const [freeRegBuffer, setFreeRegBuffer] = useState(false);

    let navigation = useNavigation()

    const freeRegistration = () => {
        setFreeRegBuffer(true);

        axios.post(AppUrl.EventRegister, payload, axiosConfig).then((res) => {
            getActivity()
            setFreeRegBuffer(false);
            Toast.show('Congratulation 📢 you won free registration', Toast.durations.LONG);
            navigation.goBack()

        }).catch((err) => {
            console.log(err.message)
        });

    };

    return { freeRegistration, freeRegBuffer, setFreeRegBuffer }

}

