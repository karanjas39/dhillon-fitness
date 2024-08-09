interface GeneralResponse {
  success: boolean;
  status: number;
  message?: string;
}

interface Api_SignInType extends GeneralResponse {
  token: string;
}
