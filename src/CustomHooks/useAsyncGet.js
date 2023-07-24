import { useState } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Constants/context';
import { useEffect } from 'react';

const useAsyncGet = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { axiosConfig } = useContext(AuthContext);

    useEffect(() => {
        sendGetRequest()
    }, [url])


    const sendGetRequest = async () => {
        setLoading(true)
        console.log('hit data')
        try {
            let resData = await axios.get(url, axiosConfig)
            console.log('asyn get request', resData.data)
            resData.data.status === 200 && setResponse(resData)
            setLoading(false)
        } catch (error) {
            console.log("async useHook error", error)
            setError(error.message)
            setLoading(false)
        }
    };

    return { sendGetRequest, response, error, loading };
};

export default useAsyncGet;
