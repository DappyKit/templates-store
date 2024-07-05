export interface IVerificationMessage {
  data: SiweMessage;
  success: boolean;
  fid: number;
  isError: boolean;
  error: Error;
}

type SiweMessage = string | any;
