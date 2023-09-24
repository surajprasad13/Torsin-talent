import React from 'react';
import {DrawerScreenParamaList} from '../routes/RouteType';
import {
  EvilIcon,
  IonIcon,
  FontAwesome,
  MaterialIcon,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from '../theme/icons';

interface ListProp {
  title: string;
  route: keyof DrawerScreenParamaList;
  icon: ({color}: {color: string}) => React.ReactNode | any;
}

const DrawerScreenData: ListProp[] = [
  {
    title: 'Notifications',
    route: 'Notifications',
    icon: ({color}) => <EvilIcon name="bell" color={color} size={20} />,
  },
  {
    title: 'Proposals',
    route: 'ProposalNavigator',
    icon: ({color}) => (
      <IonIcon name="newspaper-outline" color={color} size={20} />
    ),
  },
  {
    title: 'My Jobs',
    route: 'JobNavigator',
    icon: ({color}) => (
      <FontAwesome name="calendar-check-o" color={color} size={20} />
    ),
  },
  {
    title: 'My Rating',
    route: 'MyRatings',
    icon: ({color}) => <EvilIcon name="star" color={color} size={20} />,
  },
  {
    title: 'My Contracts',
    route: 'ContractNavigator',
    icon: ({color}) => <Feather name="briefcase" color={color} size={20} />,
  },
  {
    title: 'My Services',
    route: 'MyServices',
    icon: ({color}) => <EvilIcon name="star" color={color} size={20} />,
  },
  {
    title: 'Payment Method',
    route: 'PaymentMethod',
    icon: ({color}) => <MaterialIcon name="payments" color={color} size={20} />,
  },
  {
    title: 'Payment',
    route: 'PaymentNavigator',
    icon: ({color}) => <MaterialIcon name="payments" color={color} size={20} />,
  },

  {
    title: 'Feeds',
    route: 'Feeds',
    icon: ({color}) => <FontAwesome name="feed" color={color} size={20} />,
  },

  {
    title: 'ChangePassword',
    route: 'ChangePassword',
    icon: ({color}) => (
      <MaterialCommunityIcons name="onepassword" color={color} size={20} />
    ),
  },

  {
    title: 'About us',
    route: 'AboutUs',
    icon: ({color}) => <AntDesign name="infocirlceo" color={color} size={20} />,
  },
  {
    title: 'Terms and Privacy',
    route: 'TermsPrivacy',
    icon: ({color}) => (
      <IonIcon name="shield-checkmark-outline" color={color} size={20} />
    ),
  },
  {
    title: 'Complaints',
    route: 'HelpSupport',
    icon: ({color}) => <IonIcon name="md-headset" color={color} size={20} />,
  },
];

export {DrawerScreenData};
