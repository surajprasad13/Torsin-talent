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

export interface Skill {}
