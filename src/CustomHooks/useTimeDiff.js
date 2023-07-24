import moment from "moment";

export const useTimeDiff = (data) => {



    let timeLeft
    let status
    let CurrentDateWithTime = new Date();

    let starTime = moment(data.time)
    let currentTime = moment(data?.currentTime)


    var duration = moment.duration(starTime.diff(CurrentDateWithTime));
    var endDuration = moment.duration(currentTime.diff(CurrentDateWithTime));


    if (data?.endTime) {
        let endTime = moment(data?.endTime)
        var statusDuration = moment.duration(endTime.diff(CurrentDateWithTime));
        timeLeft = statusDuration.asSeconds()
    }

    let seconds = duration.asSeconds();
    let endSeconds = endDuration.asSeconds();
    let days = duration.asDays();



    return { seconds, days, endSeconds, timeLeft }
}