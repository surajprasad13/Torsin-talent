export interface Service {
  serviceName: string;
  chargeType: number;
  serviceCharge: number;
  serviceDescription: string;
  serviceImage: null | Array<string>;
  serviceVideo: null | string;
}

export interface JobDetail {
  id?: number;
  jobName: string;
  jobDescription: string;
  location: string;
  countryName: string;
  photos: string[];
  adminService: number;
  projectType: number;
  priceRate: number;
  createdAt: Date;
  proposalStatus?: number;
}

export interface ProposalDetail {
  job: number;
  message: string;
  video: string;
  portfolio: string | null;
  projectType: number;
  charge: number;
  images: Array<string>;
  jobId: number;
  jobName: string;
  jobDescription: string;
  jobProjectType: number;
  jobPriceRate: number;
  adminService: string[];
  proposalId: number;
  proposalStatus: number;
  charges: number;
  photos: string[];
  videos: null;
  createdAt: string;
  location: string;
  countryName: string;
}

export interface Rating {
  jobId: number;
  jobName: string;
  image: string[];
  jobDescription: string;
  location: string;
  countryName: string;
  createdAt: string;
  Id: number;
  fullname: string;
  email: string;
  profileImage: string;
  rating: number;
  review: string;
  ratingCreatedAt: string;
}

export interface Feed {
  feedType: number;
  feedHeadline: string;
  feedPhoto: string;
  feedDescription: string;
  createdAt: string;
  isMain: string;
  isActive: string;
}

export type Status = 1 | 2 | 3 | 4;

export interface Ticket {
  topicId: number;
  topicName: string;
  description: string;
  status: Status;
  ticketId: number;
  reason: string;
}

export interface Help {
  topicId: number;
  topicName: string;
}

export interface Skill {}

export interface ComplaintList {
  createdAt: string | Date;
  isSenderAdmin: boolean;
  message: string;
}

export interface PaymentDetails {
  contractId: string;
  milestoneId: number;
  jobId: number;
  jobName: string;
  jobDescription: string;
  photos: string;
  paymentStatus: number;
  createdAt: string;
  receivedAmount: number;
  projectType: number;
  location: string;
}

export interface UserTag {
  id: number;
  fullName: string;
  profileImage: string;
}

export interface WithoutSkill {
  proposalStatus: number;
  id: number;
  location: string;
  countryName: string;
  jobName: string;
  jobDescription: string;
  photos: string[];
  'adminService:': string[];
  projectType: number;
  priceRate: number;
  createdAt: string;
}

export interface PortfolioResponse {
  photos: {
    tagUser: string[];
    photos: string;
    description: string | null;
  }[];
  videos: {
    tagUser: string[];
    video: string;
    description: string | null;
  }[];
}
