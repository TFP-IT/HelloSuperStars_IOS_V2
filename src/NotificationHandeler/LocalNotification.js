import { useNavigation } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import navigationStrings from "../Constants/navigationStrings";

export default LocalNotification = () => {



    return PushNotification.configure({
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);



        },
        requestPermissions: Platform.OS === 'ios'
    });

}

