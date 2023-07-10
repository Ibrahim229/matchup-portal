export interface LoginResponse {
  token: string;
  userData: UserData;
  userID: string;
}

export interface UserData {
  fullname: string;
  phoneNumber: string;
  email: string;
  age: number;
  gender: string;
  role: string;
  userName?: string;
}
