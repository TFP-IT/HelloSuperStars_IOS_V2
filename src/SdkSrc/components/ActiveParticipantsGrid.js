import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import ParticipantView from "./ParticipantView";
import {
  getGridRowsAndColumns,
  getGridForMainParticipants,
  calcQuality,
} from "../utils/common";
import { useMeetingAppContext } from "../context/MeetingAppContextDef";
import { useMeeting, useParticipant } from "@videosdk.live/react-native-sdk";
import VideoChatParticipantView from "./VideoChatParticipantView";
import { useContext } from "react";
import { MeetingContex } from "../../../VideoSdk";
import { create } from "react-test-renderer";
import LoaderComp from "../../Components/LoaderComp";

const ActiveParticipantsGrid = ({ toggleBars, isLandscape }) => {
  const isMobile = true;
  const isTab = false;

  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  const { mainViewParticipants } = useMeetingAppContext();
  const { type, starName } = useContext(MeetingContex)
  const [starJoin, setStarJoin] = useState(true)
  // learning session view modify alamin/shohan
  const [getIds, setGetIds] = useState([])

  //learning session only alamin/shohan
  useEffect(() => {
    const participantData = [...new Map(participants)];

    let updateScreenData = participantData?.map((item, index) => {
      return item[1];
    })


    let fiterScreenValu = updateScreenData?.filter((item) => {
      return item?.displayName == starName || item?.local == true;
    })

    if (fiterScreenValu.length == 2) {
      setStarJoin(false)
    } else {
      setStarJoin(true)
    }



    let gettingId = fiterScreenValu?.map((item) => item.id);

    setGetIds(gettingId)
    console.log('perticefhjksdf_______', gettingId)

  }, [participants, type])

  const { singleRow } = React.useMemo(() => {
    let participants = [...mainViewParticipants];

    //learning session only alamin/shohan
    if (type == "learningSession" || type == "meetup" || type == "videoChat") {
      participants = participants.filter(element => getIds.includes(element));
    }


    const participantsCount = participants?.length || 1;

    const gridInfo = getGridRowsAndColumns({
      participantsCount,
      isMobile,
      isTab,
      isLandscape: isLandscape,
    });

    return getGridForMainParticipants({ participants, gridInfo });
  }, [mainViewParticipants, isLandscape, isMobile, isTab, getIds]);

  //self video 
  const myVideo = (participantId) => {
    const {
      displayName,
      webcamStream,
      webcamOn,
      micOn,
      isLocal,
      setQuality,
      isActiveSpeaker,
      setViewPort
    } = useParticipant(participantId);


  }

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8,
        marginBottom: 12,
      }}
    >

      {starJoin &&
        <View style={{ zIndex: 99, backgroundColor: '#0000007c', width: '100%', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18 }}> <ActivityIndicator color="#ffaa00" />Please wait, your star not join yet !</Text>
        </View>
      }


      {singleRow.map(({ participantId, left, top, height, width }) => (
        <>
          {type !== "videoChat" ?
            //for one to many video chat
            <View
              key={participantId}
              style={{
                borderRadius: 4,
                overflow: "hidden",
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                height: `${height}%`,
                width: `${width}%`,
              }}
            >

              <ParticipantView
                quality={calcQuality(participants?.size || 1)}
                participantId={participantId}
                presstoHide={() => {
                  toggleBars();
                }}
              />
            </View>
            :
            //for one to one video chat
            <VideoChatParticipantView
              quality={calcQuality(participants?.size || 1)}
              participantId={participantId}
              presstoHide={() => {
                toggleBars();
              }}
            />
          }


        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({


})

export default ActiveParticipantsGrid;
