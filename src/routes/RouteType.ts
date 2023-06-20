import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LostPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: undefined;
  Successfull: undefined;
  VerifyOtpRegister: undefined;
  WalkthroughScreen: undefined;
  IndivisualRegister: undefined;
  ThroughRegister: undefined;
  BusinessRegister: undefined;
  BusinessPassword: undefined;
  DrawerNavigation: DrawerScreenParamaList;
  PostDetails: {id: string};
  NotFound: undefined;
  BottomScreens: undefined;
  CreatePassword: {item: string} | undefined;
  MusicComposer: undefined;
  ChatUser: {
    item: undefined | {};
  };
  RatingReview: undefined;
  WebScreen: {
    item: string;
  };
};

export type AuthScreenParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LostPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: undefined;
  Successfull: undefined;
  VerifyOtpRegister: undefined;
  WalkthroughScreen: undefined;
  ThroughRegister: undefined;
  IndivisualRegister: undefined;
  BusinessRegister: undefined;
  BusinessPassword: undefined;
  IndivisualCreatePassword: undefined;
};

export type DrawerScreenParamaList = {
  Notifications: undefined;
  Proposals: undefined;
  MyRatings: undefined;
  ContractNavigator: undefined;
  MyServices: undefined;
  MyJobs: undefined;
  Payments: undefined;
  SwitchAccount: undefined;
  AboutUs: undefined;
  TermsPrivacy: undefined;
  HelpSupport: undefined;
  BottomNavigation: BottomScreenParamList;
  DrawerSetting: undefined;
};

export type BottomScreenParamList = {
  HomeNavigator: undefined;
  JobNavigator: undefined;
  Chat: undefined;
  SettingNavigator: SettingScreenParamList;
};

export type SettingScreenParamList = {
  Setting: undefined;
  EditProfile: undefined;
  EditUserProfile: undefined;
  AddService: undefined;
  AddSkill: undefined;
  ServiceSkill: undefined;
  ServiceDetail: undefined;
};

export type HomeScreenParamList = {
  HomeScreen: undefined;
  AllExpertise: undefined;
};

export type JobScreenParamList = {
  ActiveJob: undefined;
  ActiveJobDetail: undefined;
  NewJobDetail: undefined;
  PastJobDetail: undefined;
  JobDetail: undefined;
  Jobs: undefined;
  MyAllJobs: undefined;
  NewJob: undefined;
  PastJob: undefined;
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
