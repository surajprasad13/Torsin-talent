export type Status = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ClientDetail {
  clientId: number;
  fullName: string;
  mobileNo: string;
  email: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractDetail {
  id: number;
  createdAt: string;
  contractId: string;
  description: string;
  contractType: number;
  ismilestone: number;
  amount: string;
  torsinRate: string;
  receivedAmount: string;
  timeDuration: string;
  endDate: number;
  specificDate: null | any;
  status: Status;
  seen: number;
  userId: number;
  talentId: number;
  projectId: number;
}

export interface MileStone {
  amount: number;
  torsinRate: string;
  receivedAmount: string;
  startDate: string;
  endDate: string;
  name?: string;
  price?: string;
  status?: number;
}

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
  milestoneData: MileStone[] | any;
  receivedAmount: number;
  seen: number;
  specificDate: null | string;
  status: Status;
  talentEmail: string;
  talentId: number;
  talentName: string;
  talentmobileNo: string;
  talentprofileImage: string;
  timeDuration: number;
  torsinRate: number;
  jobName: string;
  jobId: string | number;
}

export interface ContractStatusInterface {
  amount: number;
  contractId: string;
  createdAt: string;
  email: string;
  projectName: string;
  status: Status;
  mobileNo: string;
  talentName: string;
}

export interface ActiveJobDetailInterface extends Contract {
  contractDesc: string;
  countryName: string;
  email: string;
  fullName: string;
  image: string[];
  jobDescription: string;
  location: string;
  profileImage: string;
  receievedAmount: number;
}
