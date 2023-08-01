export interface ResponseMessage {
  success: boolean;
  successCode: number;
  statusCode: number;
  successMessage: string;
}

export enum UserType {
  indivisual = 2,
  business = 3,
}

export interface Token {
  refresh: string;
  access: string;
}

export interface LoginResponseData {
  id: number;
  fullName: string;
  mobileNo: string;
  email: string;
  profileImage?: string;
  userType: UserType;
  token: Token;
  gender?: number | null;
  location?: string;
  countryName?: string;
  bio?: string | null;
}

export interface LoginResponse {
  error: null | string | any;
  response: {
    data: LoginResponseData;
    message: ResponseMessage;
  };
}
