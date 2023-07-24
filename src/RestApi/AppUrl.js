class AppUrl {
  static BaseUrl = 'https://backend.hellosuperstars.com/api/';
  static MediaBaseUrl = 'https://backend.hellosuperstars.com/';
  static SoketUrl = 'https://socket.hellosuperstars.com/';

  // static BaseUrl = 'https://apihss.textware.lk/api/';
  // static MediaBaseUrl = 'https://apihss.textware.lk/';
  // static SoketUrl = 'https://socket.hellosuperstars.com/';

  // static SoketUrl = 'http://10.10.10.142:3005';
  // static SoketUrl = 'https://socket.hellosuperstars.com/';
  // static SoketUrl = 'http://10.10.10.103:3005';

  // static BaseUrl = 'http://192.168.0.197:81/HelloSuperStarsBackend-2/public/api/';
  // static MediaBaseUrl = 'http://192.168.0.197:81/HelloSuperStarsBackend-2/public/';
  static imageCdn = 'https://d23e7l64sdrshz.cloudfront.net/';
  static videoCdn = 'https://d2pp7no1njx11u.cloudfront.net/';

  // static MyLoaction =
  //   'https://api.ipdata.co?api-key=5dc984209c581e3e19e08142ae4812e89526d711a92a8f99f8c5323f';

  // static demo instruction = 'http://your pc ip/project name on www-htdocs folder/public/';

  static deviceIdUpdate = this.BaseUrl + 'user/device_id_update';
  static raffalDrowStatus = this.BaseUrl + 'user/v1/raffle-drow';

  //meetup
  static MeetupDetails = this.BaseUrl + 'user/meetup/'; //meetup id

  static UserCoverUpdate = this.BaseUrl + 'user/coverUpdate'; //meetup id
  static UserProfileUpdate = this.BaseUrl + 'user/profileUpdate'; //meetup id

  //learning session
  static LearningSessionDetails = this.BaseUrl + 'user/learning-session/'; //lerning session id

  //qna
  static QnaDetails = this.BaseUrl + 'user/qna/'; //qna id

  //live chat
  static LiveChatDetails = this.BaseUrl + 'user/live-chat/'; //live chat id

  static virtualTour = this.BaseUrl + 'mobile/getVirtualTourVideo';
  static UserLogin = this.BaseUrl + 'login';
  static UserForgetPassword = this.BaseUrl + 'user_forget_password';
  static UserForgetPasswordStore = this.BaseUrl + 'user_forget_password_store';

  static MyLoaction = this.BaseUrl + 'user/v1/current-location/'; //ip

  static VerifyUser = this.BaseUrl + 'verify_user';
  static CreateUser = this.BaseUrl + 'register';
  static UserInfo = this.BaseUrl + 'user_info';
  static UserActivityData = this.BaseUrl + 'user/activitiesData';
  static userPersonalData = this.BaseUrl + 'user/personal/list/check';
  static allCountry = this.BaseUrl + 'user/allCountry';
  static userEducationalData = this.BaseUrl + 'user_info';
  static allDegree = this.BaseUrl + 'user/educationlavel';
  static userEmploymentData = this.BaseUrl + 'user_info';
  static userEmploymentDataSubmit = this.BaseUrl + 'user/employment/store';
  static occupationData = this.BaseUrl + 'user/occupation';
  static userEducationalDataSubmit = this.BaseUrl + 'user/educational/store';
  static InterestData = this.BaseUrl + 'user/interest/type';
  static InterestDataSubmit = this.BaseUrl + 'user/interest/store';
  static userPersonalDataSubmit = this.BaseUrl + 'user/personal-data/store';
  static passwordChange = this.BaseUrl + 'user/password/changes';

  static categoryAdd = this.BaseUrl + 'user/selected/category/store';

  static OtpVerification = this.BaseUrl + 'otp_verify';
  static VerifyToRegisterEvent = this.BaseUrl + 'verify_to_register_event';
  static SignUpInforUpdate = this.BaseUrl + 'mobile/userInformation_update';
  static AllPost = this.BaseUrl + 'user/all_post';
  static AllPostWithPagination = this.BaseUrl + 'user/all_post/with-paginate/';
  static SingleStarPost = this.BaseUrl + 'user/getAllPostWithForSingleStar/'; //star
  static SubmitLike = this.BaseUrl + 'submit_react/'; //post id

  //delete user
  static UserDelete = this.BaseUrl + 'delet-user';

  //walet information
  static WaletInfo = this.BaseUrl + 'user/wallet/details';

  //all Packeges
  static AllPackages = this.BaseUrl + 'user/packages/all';

  //package buy
  static BuyPackages = this.BaseUrl + 'user/wallet/store';

  //join group
  // static BuyPackages = this.BaseUrl + 'user/fan/group/store'

  //fan gorup post
  static GetFanGoupDetails = this.BaseUrl + 'user/fan/group/post/show/'; //slug

  static GetPromoVideos = this.BaseUrl + 'user/PromoVideos';
  //learning session video uplaod
  static getLearningUploadedVideo =
    this.BaseUrl + 'user/learning-session/getUploadedVideo/'; //{event_id}
  static checkPaymentStatusLearning =
    this.BaseUrl + 'mobile/learningSession/checkPaymentStatus/'; //{event_id}
  static checkPaymentStatus =
    this.BaseUrl + 'mobile/audition/checkPaymentStatus/'; //{event_id}
  static walletQnaLearningRegister = this.BaseUrl + 'user/wallet/qna-register';
  static LearningSessionVideoUplaod =
    this.BaseUrl + 'learning-assinment-upload';

  //star profile
  static starPhotos = this.BaseUrl + 'star_photos/'; //star_id
  static starVideos = this.BaseUrl + 'star_videos/'; //star_id
  // static postPaymentCheck = this.BaseUrl + 'user/generalPost/payment/check';

  static LiveChatEventByStarId =
    this.BaseUrl + 'user/getAllLiveChatEventByStar/';
  static EventRegister = this.BaseUrl + 'user/event-register';
  static LiveChatSlotChecking = this.BaseUrl + 'user/getSingleLiveChatEvent/';
  static QnaSlotChecking = this.BaseUrl + 'user/getSingleQnaEvent/';

  //market place
  static MarketplaceAllPost = this.BaseUrl + 'user/marketplace/all';

  static DeliveyCharge = this.BaseUrl + 'user/marketplacedeliverycharge';
  static MarketplaceOrderStore =
    this.BaseUrl + 'user/mobile-app/marketplace-store';
  static CheckPaymentUncompletedOrder =
    this.BaseUrl + 'user/mobile-app/check-payment-uncompleted-order/';
  static ViewCountry = this.BaseUrl + 'user/marketplace/view-country';
  static ViewState = this.BaseUrl + 'user/marketplace/state/';
  static ViewCity = this.BaseUrl + 'user/marketplace/city/';
  static MarketplaceOrderUpdate =
    this.BaseUrl + 'user/mobile-app/marketplace-update/';
  static OrderStore = this.BaseUrl + 'user/marketplace/order/store';
  static getPDF = this.BaseUrl + 'mobile/getInvoice/data';
  // Auction
  static singleAuction = this.BaseUrl + 'mobile/getProduct/'; //{product_id}
  static userMaxBid = this.BaseUrl + 'user/maxbid/auction/'; //${auctionId}
  static AuctionAcquire = this.BaseUrl + 'user/aquired/auction';
  static AuctionBiddingProduct = this.BaseUrl + 'user/bidding/auction/product';
  static AuctionAllPost = this.BaseUrl + 'auction-product/all';
  static AuctionLiveBidding = this.BaseUrl + 'user/liveBidding/auction/';
  static AuctionMyBiddingHistory = this.BaseUrl + 'user/liveBidding/history/';
  static AuctionMyApply = this.BaseUrl + 'user/auctionApply/auction/';
  static AuctionGetInstruction = this.BaseUrl + 'auction-product/'; //id
  static AuctionStar = this.BaseUrl + 'user/getStarAuction/'; // star ID
  // Get Souvenir
  static GetStarSouvenir = this.BaseUrl + 'user/souviner/view/';
  static SouvenirStore = this.BaseUrl + 'user/souvenir/apply/store/';
  static SouvenirPayment = this.BaseUrl + 'user/souviner/payment/store';

  //
  static LearningSessionResult = this.BaseUrl + 'learning-session/result/';
  /**
   * paid post
   */
  static postPaymentCheck = this.BaseUrl + 'user/generalPost/payment/check/'; //post id
  static postPaymentCheckStarProfile =
    this.BaseUrl + 'user/generalPost/payment/check';
  static purchasedStarPhotos = this.BaseUrl + 'user/purchasedPhotos';
  static purchasedStarVideos = this.BaseUrl + 'user/purchasedVideos';
  // greetings
  static RegistrationChecker = this.BaseUrl + 'user/registration_checker/';
  static GreetingStarStatus = this.BaseUrl + 'user/greetings_star_status/';
  static GreetingRegistrationStatus =
    this.BaseUrl + 'user/greetings_registaion_status/';
  static GreetingRegistration = this.BaseUrl + 'user/greetings/register';
  static GreetingRegistrationDelete =
    this.BaseUrl + 'user/greetings_reg_delete/';
  static GreetingInfoToRegistration =
    this.BaseUrl + 'user/greeting-info-to_registration/';
  static GreetingRegistrationUpdate =
    this.BaseUrl + 'user/greetings_registaion_update';
  static GetGreetingPurposeList =
    this.BaseUrl + 'user/greetings/get_purpose_list';

  // Notification
  static CheckNotification = this.BaseUrl + 'user/check_notification/';
  static totalNotificationCount =
    this.BaseUrl + 'user/total_notification_count';
  static updateNotification =
    this.BaseUrl + 'user/notification/view_status/update/'; //Notification id

  static GreetingStatus = this.BaseUrl + 'user/mobile-app/greeting-status/';
  // static GreetingRegistration = this.BaseUrl + 'user/greetings/register';

  // menu
  static Menu = this.BaseUrl + 'user/mobile-app/menu';
  static UserActivityData = this.BaseUrl + 'user/activitiesData';

  //upComming Events
  static UpCommingEvents = this.BaseUrl + 'user/all-upcomming-events';
  static Allcategory = this.BaseUrl + 'view-category';

  //user list
  static AlluserList = this.BaseUrl + 'mobile/all-star-list';
  static UserMediaUplad = this.BaseUrl + 'mobile/user-photo-upload';

  //join group
  static JoinGroup = this.BaseUrl + 'user/fan/group/store';

  //user group post media upload
  static GroupMedia = this.BaseUrl + 'mobile/post-media-upload';
  static OnlyMediaUpload = this.BaseUrl + 'mobile/only-media-upload';
  static PostShare = this.BaseUrl + 'user/post/share/';

  //fan group post
  static GroupPostStore = this.BaseUrl + 'user/fan/group/post/store';

  static FanGroupLike = this.BaseUrl + 'user/fan/group/post/like/'; //post id

  //chat list
  static chatList = this.BaseUrl + 'mobile/all-chat-list';

  //chat store
  static fanChatHistory = this.BaseUrl + 'mobile/fan-group-chat-history/'; //fan_group_id
  static qnaChatHistory = this.BaseUrl + 'mobile/qna-chat-history/'; //qna_register_id

  //inforamtion page info get
  static infoUpdateInforamtion = this.BaseUrl + 'user/create-user-info';

  static allStarListForSearch = this.BaseUrl + 'mobile/all-star-list';
  static postSearch = this.BaseUrl + 'search-post/'; //search

  // static postSearch = this.BaseUrl + 'search-post/'; //search
  static fanGroupMemeberList = this.BaseUrl + 'user/fangroup-member/'; //fangroup_id
  //all star
  static allStarList = this.BaseUrl + 'user/selected/starcategory';
  static followStor = this.BaseUrl + 'user/selected/starcategory/store';

  //Audition
  static auditionDetails = this.BaseUrl + 'user/audition/details/';
  static auditionRegistrationWallet = this.BaseUrl + 'user/wallet/details';
  static auditionRegisterCheck =
    this.BaseUrl + 'user/registration_checker/audition/';
  static enrolledAudition = this.BaseUrl + 'user/audition/enrolled';
  static activeRounds = this.BaseUrl + 'user/audition/current_round_info/';
  static isAppealRound = this.BaseUrl + 'user/audition/is_appeal/round/';
  static getUploadedRoundVideo =
    this.BaseUrl + 'user/audition/uploaded_round_videos/';
  static AppealRegistration =
    this.BaseUrl + 'user/audition/round-appeal-registration';
  static auditionVideoUpload =
    this.BaseUrl + 'user/upload-audition-round-videos';
  static roundInstruction = this.BaseUrl + 'user/audition/round-instruction/'; //{audition id + round num}

  static videoFeed = this.BaseUrl + 'user/audition/videofeed/videos';
  static hitLoveReact = this.BaseUrl + 'user/audition/videos/loveReact';
  static paymentLoveReact =
    this.BaseUrl + 'user/audition/videos/loveReact/payment';

  static downloadAuditionCertificate =
    this.BaseUrl + 'mobile/audition/getAuditionCertificate/'; //auditionId/roundInfoId

  static downloadLearningCertificate =
    this.BaseUrl + 'mobile/audition/getLearningSessionCertificate/'; //{slug}

  static postSearch = this.BaseUrl + 'search-post/'; //search
  static fanGroupMemeberList = this.BaseUrl + 'user/fangroup-member/'; //fangroup_id
  static isGreetingRegistered = this.BaseUrl + 'user/isGreetingRegistered/'; //greetingId
  // static postSearch = this.BaseUrl + 'search-post/'; //search
  static fanGroupMemeberList = this.BaseUrl + 'user/fangroup-member/'; //fangroup_id

  //downlod ticket
  static DownlodMeetUpTicket = this.BaseUrl + 'offlineMeetup/ticketDownload/'; //event id

  /**
   * for paytm start
   */

  static getTokenPaytm = this.BaseUrl + 'txn-token-mobile/'; //amount
  static paytmPaymentSuccess = this.BaseUrl + 'paytm-payment-success';

  /**
   * stripe mobile payment
   */
  static stripeMobilePayment = this.BaseUrl + 'stripe-make-mobile-payment';
  static VideoFeedReactPayment = this.BaseUrl + 'buy-video-feed-react';

  /**
   *shurjo pay
   */
  static shujroPayPaymentInitiata = this.BaseUrl + 'initiata-shurjo-payment';
  static shujoPaymentStatus = this.BaseUrl + 'shurjo-payment-status/'; //oreder_id

  /**
   * get oxygen video
   */
  static getOxygen = this.BaseUrl + 'user/audition/getOxygen/videos';
  static OxygenReplyUpload =
    this.BaseUrl + 'mobile/audition/getOxygenReply/video';

  /**
   * loveReact
   */
  static videoFeedLoveReact =
    this.BaseUrl + 'user/audition/videofeed/loveReact';

  /**
   * Terms & Condition APIS
   */
  static aboutUs = this.BaseUrl + 'aboutus';
  static policy = this.BaseUrl + 'policy';
  static faq = this.BaseUrl + 'faq';
  static productPurchase = this.BaseUrl + 'product-purchase';
  static termsCondition = this.BaseUrl + 'terms-condition';
  static refund = this.BaseUrl + 'refund';
}

export default AppUrl;
