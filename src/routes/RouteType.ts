import type {CompositeScreenProps} from '@react-navigation/native';
import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
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
  ThroughRegister: undefined;
  IndivisualRegister: undefined;
  BusinessRegister: undefined;
  BusinessPassword: undefined;
  BusinessStart: undefined;
  DrawerNavigation: DrawerScreenParamaList;
  EditProfile: undefined;
  EditUserProfile: undefined;
  WithoutSignupHome: undefined;
  Home: HomeTabParamList;
  PostDetails: {id: string};
  NotFound: undefined;
  BottomScreens: undefined;
  SearchJob: undefined;
  MusicJob: undefined;
  OpenModal: undefined;
  CreatePassword: {item: string} | undefined;
  Allexpertise: undefined;
  MusicComposer: undefined;
  PurposalSent: undefined;
  ChatUser: undefined;
  Myjob: undefined;
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
  FirstStepBusinessRegister: undefined;
  BusinessPassword: undefined;
  BusinessStart: undefined;
  IndivisualCreatePassword: undefined;
};

export type DrawerScreenParamaList = {
  Notifications: undefined;
  Proposals: undefined;
  MyRatings: undefined;
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
  Home: undefined;
  Jobs: undefined;
  Chat: undefined;
  SettingStack: SettingScreenParamList;
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

export type HomeTabParamList = {
  HomeScreen: undefined;
};

export type RootScreenProps = StackScreenProps<RootStackParamList>;

export type AuthStackScreenProps<T extends keyof AuthScreenParamList> =
  StackScreenProps<AuthScreenParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootScreenProps
  >;

export type GlobalScreenProps = CompositeScreenProps<
  StackNavigationProp<RootStackParamList, 'DrawerNavigation'>,
  BottomTabScreenProps<BottomScreenParamList, 'SettingStack'>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
