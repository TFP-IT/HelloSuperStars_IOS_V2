import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../Constants/context";
export const timecoundFunc = (endDate) => {
    const { countryTimestamp } = useContext(AuthContext);
    let end = moment(endDate)

    let timeCount = end.valueOf() - new Date(countryTimestamp()).getTime()
    return timeCount;

}
