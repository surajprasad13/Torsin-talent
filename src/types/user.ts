export interface Service {
  serviceName: string;
  chargeType: number;
  serviceCharge: number;
  serviceDescription: string;
  serviceImage: null | Array<string>;
  serviceVideo: null | string;
}

export interface JobDetail {
  location: string;
  countryName: string;
  jobName: string;
  jobDescription: string;
  photos:  string[];
  adminService: number;
  projectType: number
  priceRate: number;
  createdAt: Date;
}

export interface Skill {}
