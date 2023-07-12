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
  portfolio: string;
  projectType: number;
  charge: number;
  images: Array<string>;
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

export interface Skill {}
