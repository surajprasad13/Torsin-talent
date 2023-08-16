import type {CompositeScreenProps} from '@react-navigation/native';
import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type RootStackParamList = AuthScreenParamList & {
  OnboardingScreen: undefined;
  VerifyOtpRegister: undefined;
  WalkthroughScreen: undefined;
  BusinessPassword: undefined;
  DrawerNavigation: DrawerScreenProps<DrawerScreenParamaList>;
  PostDetails: {id: string};
  NotFound: undefined;
  BottomScreens: undefined;
  CreatePassword: {item: string} | undefined;
  MusicComposer: undefined;
  PaymentDetail: undefined;
  ReceivePayment: undefined;
  Rating: undefined;
  Location: undefined;
  HelpDetails: undefined;
  FeedDetails: undefined;
  OpenImage: undefined;
  Report: undefined;
  Complaints: undefined;
  ChatUser: {
    item: undefined | {};
  };
  RatingReview: undefined;
  WebScreen: {
    item: string | undefined;
  };
  PdfScreen: {
    item: undefined | object;
  };
  RatingDetail: undefined;
};

export type AuthScreenParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  LostPassword: undefined;
  VerifyOtp: {
    email: undefined | string;
  };
  ResetPassword: {
    email: undefined | string;
  };
  Successfull: undefined;
  VerifyOtpRegister: undefined;
  WalkthroughScreen: undefined;
  ThroughRegister: undefined;
  IndivisualRegister: undefined;
  BusinessRegister: undefined;
  BusinessPassword: undefined;
  IndivisualCreatePassword: undefined;
  ChangePassword: undefined;
};

export type DrawerScreenParamaList = {
  Notifications: undefined;
  ProposalNavigator: undefined;
  MyRatings: undefined;
  ContractNavigator: StackNavigationProp<ContractsScreenParamList>;
  MyServices: undefined;
  JobNavigator: undefined;
  PaymentNavigator: undefined;
  SwitchAccount: undefined;
  AboutUs: undefined;
  TermsPrivacy: undefined;
  HelpSupport: undefined;
  HelpDetail: {
    item: undefined | any;
  };
  BottomNavigation: BottomTabScreenProps<BottomScreenParamList>;
  DrawerSetting: undefined;
  PaymentMethod: undefined;
  Feeds: undefined;
  ChangePassword: undefined;
  ChatCard: undefined;
};

export type BottomScreenParamList = {
  HomeNavigator: undefined;
  JobNavigator: undefined;
  Chat: undefined;
  SettingNavigator: StackScreenProps<SettingScreenParamList>;
};

export type SettingScreenParamList = {
  Setting: undefined;
  EditProfile: undefined;
  EditUserProfile: undefined;
  AddService: undefined;
  AddSkill: undefined;
  ServiceSkill: undefined;
  ServiceDetail: undefined;
  AddPortfolio: undefined;
  OpenCamera: undefined;
};

export type HomeScreenParamList = {
  HomeScreen: undefined;
  AllExpertise: undefined;
  JobDetail: {
    item: undefined;
  };
  AddJobDetails: {
    item: undefined;
  };
  ProposalSentSuccess: undefined;
};

export type PaymentScreenParamList = {
  Payment: undefined;
  Pending: undefined;
  Received: undefined;
};

export type JobScreenParamList = {
  ActiveJob: undefined;
  ActiveJobDetail: {
    item: undefined | any;
  };
  NewJobDetail: undefined;
  PastJobDetail: undefined;
  JobDetail: undefined;
  Jobs: undefined;
  MyAllJobs: undefined;
  NewJob: undefined;
  PastJob: undefined;
  AddJobDetails: {
    id: undefined;
  };
  RatingReview: undefined;
  ReportProblem: undefined;
};

export type ContractsScreenParamList = {
  Sent: undefined;
  Accepted: undefined;
  Rejected: undefined;
  Contract: undefined;
  EditContract: undefined;
  ArchiveContract: undefined;
  CreateContract: undefined;
  ViewContract: {
    id: undefined | string;
  };
};

export type RootScreenProps = StackScreenProps<RootStackParamList>;

export type AuthStackScreenProps<T extends keyof AuthScreenParamList> =
  StackScreenProps<AuthScreenParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeScreenParamList, T>,
    RootScreenProps
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
