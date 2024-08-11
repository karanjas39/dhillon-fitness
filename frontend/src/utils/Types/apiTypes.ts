export interface GeneralResponse {
  success: boolean;
  status: number;
  message?: string;
}

export interface Api_SignInType extends GeneralResponse {
  token: string;
}

export interface Api_YearlyStatType extends GeneralResponse {
  monthlyIncome: {
    totalIncome: number;
    month: string;
  }[];
}
export interface Api_DailyStatType extends GeneralResponse {
  totalIncome: number;
  date: Date;
}

export interface Api_AllCustomers extends GeneralResponse {
  customers: {
    id: string;
    name: string;
    phone: string;
    memberships: {
      membership: {
        name: string;
      };
      endDate: string;
    }[];
  }[];
}
