import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#000',
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#232323',
    borderRadius: 10,
    paddingBottom: 0,
  },
  superStarHome: {
    flexDirection: 'row',
    padding: 5,
  },
  postImage: {
    width: 65,
    height: 65,
    margin: '15%',
  },

  linearGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  singleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#ff0',
    borderRadius: 10,
    position: 'relative',
    backgroundColor: '#161616',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',

    paddingVertical: 8,
  },
  TextColor: {
    color: 'white',
    position: 'absolute',
    top: 55,
    right: 35,
    backgroundColor: 'red',
    textAlign: 'center',
    paddingTop: 8,
    width: 35,
    borderRadius: 100,
    height: 35,
    fontWeight: 'bold',
  },

  postImageS: {
    width: 90,
    height: 90,
    margin: '5%',
  },

  // Auction

  containerAc: {
    flex: 1,
    backgroundColor: 'black',
  },
  row1: {
    marginBottom: 10,
    marginTop: -8,
    width: '100%',
  },
  rowX: {
    marginBottom: 10,
    width: '100%',
  },
  AuctionT: {
    fontSize: 25,
    color: 'black',
    paddingVertical: 4,
    textAlign: 'center',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  marketBtn: {
    backgroundColor: '#FFAD00',
    width: 150,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  marketBtn2: {
    backgroundColor: '#272727',
    width: 175,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Fonts: {
    color: 'black',
    textAlign: 'center',
  },
  Fonts2: {
    color: 'white',
    textAlign: 'center',
  },

  // Auction Product Card
  AuctionMaiN: {
    marginBottom: 25,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#222222',
    height: 400,
  },
  MaiN: {
    marginBottom: 25,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#222222',
  },
  mainView: {
    borderColor: '#ffaa00',
    borderRadius: 3,
    backgroundColor: 'black',
    padding: 2,
    borderWidth: 2,
    marginBottom: 3,
  },

  mainView2: {
    backgroundColor: 'black',
    width: '60%',
    marginLeft: 8,
    paddingHorizontal: 4,
  },

  View3: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 50,
    paddingVertical: 3,
    paddingLeft: 5,
    backgroundColor: '#313131',
  },

  postImageX: {
    width: 130.5,
    height: '100%',
    resizeMode: 'stretch',
  },

  PriceRow: {
    flexDirection: 'row',
  },
  Price: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    fontSize: 25,
  },

  PriceBest: {
    color: '#ffaa00',
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 5,
    fontSize: 10,
    marginTop: 8,
    marginLeft: 5,
    borderWidth: 0.2,
    borderRadius: 15,
    borderColor: '#ffaa00',
  },

  Btn: {
    fontSize: 16,
    color: 'black',
    width: '80%',
    paddingVertical: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Owner: {
    color: 'white',
    marginLeft: 2,
    fontSize: 12,
    padding: 1,
  },

  // Participate

  PText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  DateHead: {
    flexDirection: 'row',
  },
  Clock: {
    // flex:1,
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: 'black',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Img: {
    width: 30,
    height: 30,
  },

  Clock1: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextDate: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  TextDateB: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postFoot: {
    width: '100%',
    // borderRadius:10,
  },

  FootH: {
    color: 'white',
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 20,
  },
  FootSt: {
    color: '#686564',
    fontSize: 15,
    paddingVertical: 2,
  },
  FootS: {
    color: '#999797',
    fontSize: 15,
    paddingVertical: 3,
  },
  Btn: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    paddingVertical: 3,
  },

  BtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  BtnBoxA: {
    flexDirection: 'row',
    padding: 5,
    flex: 1,
    backgroundColor: 'black',
    // justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 40,
  },
  PriceTag: {
    backgroundColor: '#212121',
    borderRadius: 100,
    padding: 5,
    height: 50,
    width: 50,
  },

  PriceTagImg: {
    backgroundColor: '#212121',
    borderRadius: 100,
    padding: 5,
  },
  PriceTagImgB: {
    backgroundColor: '#212121',
    borderRadius: 100,
    marginTop: 5,
    height: 30,
    width: 40,
    paddingTop: 12,
  },

  PriceTagImgDeli: {
    backgroundColor: '#212121',
    borderRadius: 100,
    marginTop: 5,
    marginLeft: 2,
    // height:30,
    // width:30,
    paddingTop: 12,
  },

  PriceDollar: {
    // backgroundColor:'#212121',
    borderRadius: 100,
    padding: 5,
    paddingLeft: 8,
    // height:50,
    // width:50,
  },
  PriceDollarText: {
    color: 'white',
    fontSize: 10,
  },
  PriceDollarTextB: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  LiveBidding: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LiveBCar: {
    backgroundColor: 'black',
    marginVertical: 5,
    paddingVertical: 4,
    // paddingHorizontal:8,
  },
  LiveBCarB: {
    flexDirection: 'row',
    padding: 5,
    flex: 1,
    width: '100%',
    backgroundColor: '#212121',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  PriceLive: {
    backgroundColor: '#212121',
    borderRadius: 100,
    padding: 5,
    height: 50,
    width: 50,
  },
  PriceLiveDate: {
    padding: 5,
    paddingLeft: 8,
  },

  LiveImg: {
    paddingTop: 10,
    marginTop: 6,
  },

  PriceBD: {
    color: '#ffaa00',
    fontSize: 20,
    fontWeight: 'bold',
  },

  BDname: {
    color: 'white',
  },
  BDdate: {
    color: '#808080',
    fontSize: 10,
  },

  LiveBiddingP: {
    color: '#C0C0C0',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 4,
  },

  input: {
    height: 40,
    margin: 12,
    marginTop: 3,
    marginBottom: 5,
    borderRadius: 30,
    backgroundColor: '#474747',
    padding: 10,
    color: 'white',
  },

  BidNow: {
    fontSize: 20,
    color: 'black',
    paddingTop: 0,
    paddingBottom: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  BidBtn: {
    paddingBottom: 5,
  },
  BidUser: {
    borderRadius: 100,
    borderWidth: 0.5,
    width: 40,
    height: 40,
    borderColor: '#ffaa00',
  },
  BidHis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal:10,
    marginVertical: 10,
  },

  BidHBg: {
    backgroundColor: '#474747',
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
  },

  BidTextHis: {
    color: '#9E9E9E',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 4,
  },

  BidTextHisText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 0,
  },

  BidHBgA: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
    marginBottom: 5,
  },

  BidTextHiss: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 0,
  },

  LiveBCarBImg: {
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },

  Apply: {
    fontSize: 20,
    color: 'black',
    paddingTop: 0,
    paddingBottom: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  AppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  LinerBG: {
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 10,
  },

  MaiNApp: {
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#222222',
  },

  Applied: {
    backgroundColor: '#343333',
    borderRadius: 10,
  },

  ApplyText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  ApplyTextRe: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  ApplyTextReWhite: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 8,
  },
  LinerBGA: {
    borderRadius: 50,
    marginHorizontal: 2,
    marginTop: 5,
    marginBottom: 20,
  },
  ReImg: {
    width: '97%',
    marginBottom: 10,
    height: 400,
    marginLeft: 10,
  },
  ReImgTab: {
    width: 501,
    marginBottom: 10,
    height: 501,
    marginLeft: 10,
  },

  LinerBGAs: {
    borderRadius: 50,
    marginHorizontal: 2,
    marginTop: 5,
    width: '100%',
  },
  ApplyTextReA: {
    fontSize: 14,
    textAlign: 'center',
    // paddingHorizontal:'10%',
    paddingVertical: 8,
    color: 'white',
  },

  WinnerE: {
    justifyContent: 'center',
    marginHorizontal: 6,
    alignItems: 'center',
    paddingBottom: 10,
  },

  UserWinner: {
    bottom: -330,
    justifyContent: 'center',
    alignItems: 'center',
  },

  UserWinnerTab: {
    bottom: -430,
    justifyContent: 'center',
    alignItems: 'center',
  },

  UserTse: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  UserTse1: {
    fontSize: 20,
    color: 'white',
  },

  UserImgs: {
    width: 120,
    height: 120,
    position: 'absolute',
    marginTop: '26.5%',
    left: '22 %',
  },

  UserImgsTab: {
    width: 150,
    height: 100,
    position: 'absolute',
    marginTop: '29%',
    left: '27%',
  },

  Increment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  Increment1: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
  },

  Flex1: {},

  TextEr: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },

  TextColorS: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 4,
  },

  Plus: {
    backgroundColor: 'green',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  Minus: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  MinusText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -8,
  },

  PulsText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  Increment2: {
    flex: 7,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
  },

  Buy: {
    marginTop: 18,
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    marginBottom: 18,
  },
  BuyText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 4,
    color: 'black',
  },

  MaiNAS: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    borderRightWidth: 1,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#222222',
  },

  MaiNASr: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    marginTop: 3,
    backgroundColor: '#222222',
  },

  Instruction: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  InstructionV: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

  Under: {
    height: 2,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  TextHe: {
    color: 'white',
    fontSize: 15,
  },
  Bds: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },

  MaiNASp: {
    marginHorizontal: 8,
    marginTop: 3,
    marginBottom: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    borderRightWidth: 1,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#222222',
  },

  InstructionBT: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },

  MaiNAppL: {
    marginTop: -5,
    backgroundColor: '#222222',
    borderBottomLeftRadius: 15,
    paddingBottom: 15,
    borderBottomRightRadius: 15,
  },

  AppliedT: {
    backgroundColor: '#343333',
    borderRadius: 50,
  },
  WinnerES: {
    // marginHorizontal:25,
    paddingBottom: 10,
  },

  ApplyR: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 28,
    marginBottom: 8,
  },
  inputY: {
    height: 45,
    marginHorizontal: 27,
    borderWidth: 0.5,
    padding: 10,
    fontSize: 17,
    color: '#B6B6B6',
    borderColor: '#ffaa00',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  inputYB: {
    maxHeight: 110,
    fontSize: 17,
    marginHorizontal: 27,
    borderWidth: 0.5,
    padding: 10,
    color: '#B6B6B6',
    borderColor: '#ffaa00',
    borderRadius: 25,
    backgroundColor: 'black',
  },
  inputYZ: {
    height: 45,
    marginHorizontal: 27,
    borderWidth: 0.5,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    color: '#488BFF',
    borderColor: '#ffaa00',
    borderRadius: 50,
    backgroundColor: 'black',
  },

  ApplyBg: {
    marginHorizontal: '25%',
  },

  LinerBGAl: {
    borderRadius: 50,
    marginHorizontal: 2,
    height: 45,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default styles;
