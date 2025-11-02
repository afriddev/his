export type loginRequestDataType = {
  emailId: string;
  password: string;
  otp?: string;
};
export type registerRequestDataType = {
  emailId: string;
  firstName: string;
  lastName: string;
  password: string;
  otp?: string;
};
