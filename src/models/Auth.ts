/**
 * 회원가입 - response data type
 */
export interface AuthSignup {
  statusMessage: AuthStatusMessage;
}

export interface AuthStatusMessage {
  createdUser: AuthCreatedUser;
  message: string;
  error?: AuthSignUpError[];
}

export interface AuthCreatedUser {
  nickname: string;
  email: string;
  password?: string;
  seq?: number;
  _id?: string;
  date?: Date;
  brainToken?: any[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface AuthSignUpError {
  msg: string;
  param: string;
  location: string;
}

/**
 * 로그인 - responses data type
 */
export interface AuthLogin {
  statusMessage: StatusMessage;
}

export interface StatusMessage {
  access_token?: string;
  user: User;
  message: string;
}

export interface User {
  _id?: string;
  nickname: string;
  email: string;
  password?: string;
  seq?: number;
  date?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  generateToken: string;
}
