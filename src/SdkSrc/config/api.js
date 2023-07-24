import AppUrl from '../../RestApi/AppUrl';

const HOST_URL = 'http://192.168.0.104:9000';

// https://backend.hellosuperstars.com/api/sdk/get-token

export const getToken = async () => {
  try {
    const response = await fetch(`${AppUrl.BaseUrl}sdk/get-token/user`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('token from api', data);
    return data.token;
  } catch (e) {
    console.log('can  not get', e);
  }
};

export const createMeeting = async token => {
  try {
    const VIDEOSDK_API_ENDPOINT = `${HOST_URL}/create-meeting`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
    const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async result => {
        const { meetingId } = await result.json();
        return meetingId;
      })
      .catch(

    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
