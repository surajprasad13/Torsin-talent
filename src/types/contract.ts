export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TalentDetail {
  id: number;
  is_superuser: boolean;
  fullName: string;
  mobileNo: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  profileImage: string;
  last_login: string;
  deviceToken: string;
  gender: number;
  stripeCustomerId: null | any;
  stripeProviderAccountId: null | any;
  location: string;
  otp: null | string;
  countryId: number;
  countryName: string;
  createdAt: string;
  updatedAt: string;
  userTypeId: number;
  groups: [] | any;
  user_permissions: [] | any;
}

export interface JobDetail {
  id: number;
  location: string;
  countryName: string;
  jobName: string;
  jobDescription: string;
  photos: string[];
  projectType: number;
  jobStatus: number;
  priceRate: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  adminService: number;
  clientUser: number;
}

export interface ClientDetail {
  id: number;
  is_superuser: boolean;
  fullName: string;
  mobileNo: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  profileImage: string;
  last_login: string;
  deviceToken: string;
  gender: number;
  stripeCustomerId: string | null;
  stripeProviderAccountId: null | string;
  location: null | any;
  otp: null | any;
  countryId: 91;
  countryName: null;
  createdAt: string;
  updatedAt: string;
  userTypeId: number;
  groups: [] | any;
  user_permissions: [] | any;
}

export interface ContractDetail {
  id: number;
  createdAt: string;
  contract_id: string;
  desc: string;
  contract_type: number;
  is_milestone: number;
  amount: string;
  torsin_rate: string;
  recived_amount: string;
  time_duration: string;
  end_date: number;
  specific_date: null | string;
  status: Status;
  seen: 1;
  user_id: number;
  talent_id: number;
  project_id: number;
}

export interface MileStone {}

export interface Contract {
  amount: number;
  clientEmail: string;
  clientId: number;
  clientName: string;
  clientmobileNo: string;
  clientprofileImage: string;
  contractId: string;
  contractType: number;
  createdAt: string;
  description: string;
  endDate: number;
  ismilestone: number;
  jobId: number;
  jobName: string;
  milestoneData: [] | any;
  receivedAmount: number;
  seen: number;
  specificDate: null | string;
  status: 0;
  talentEmail: string;
  talentId: number;
  talentName: string;
  talentmobileNo: string;
  talentprofileImage: string;
  timeDuration: number;
  torsinRate: number;
}
