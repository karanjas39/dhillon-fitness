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

export interface Api_CustomerDetail extends GeneralResponse {
  customer: {
    id: string;
    name: string;
    phone: string;
    address: string;
    balance: number;
    email: string;
    sex: string;
    joinDate: string;
  };
}

export interface Api_CustomerMemberships extends GeneralResponse {
  customerMemberships: {
    startDate: string;
    endDate: string;
    membership: {
      name: string;
    };
    paymentAmount: number;
    priceAtPurchase: number;
  }[];
}

export interface Api_AllMemberships extends GeneralResponse {
  memberships: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    price: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}
export interface Api_MembershipIds extends GeneralResponse {
  ids: {
    id: string;
    name: string;
    price: number;
  }[];
}
