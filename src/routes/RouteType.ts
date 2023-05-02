import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
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
  ThroughRegister: undefined;
  IndivisualRegister: undefined;
  BusinessRegister: undefined;
  BusinessPassword: undefined;
  BusinessStart: undefined;
  DrawerNavigation: undefined;
  EditProfile: undefined;
  EditUserProfile: undefined;
  WithoutSignupHome: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  PostDetails: {id: string};
  NotFound: undefined;
  BottomScreens: undefined;
  CreatePassword: {item: string} | undefined;
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
};

export type BottomScreenParamList = {
  Home: undefined;
  Jobs: undefined;
  Chat: undefined;
  Setting: undefined;
};

export type HomeTabParamList = {
  Popular: undefined;
  Latest: undefined;
};

export type RootScreenProps = StackScreenProps<RootStackParamList>;

export type AuthStackScreenProps<T extends keyof AuthScreenParamList> =
  StackScreenProps<AuthScreenParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootScreenProps
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
