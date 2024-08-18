export interface GeneralResponse {
  success: boolean;
  status: number;
  message?: string;
}

export interface Api_SignInType extends GeneralResponse {
  token: string;
}

export interface Api_AdminDetailType extends GeneralResponse {
  admin: {
    name: string;
    email: string;
    dailyTarget: number;
  };
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
export interface Api_CustomerBirthdayStatType extends GeneralResponse {
  birthdayCount: number;
  birthdays: {
    dob: string;
    id: string;
    name: string;
  }[];
}

export interface Api_MembershipStat extends GeneralResponse {
  expiredTodayCount: number;
  liveUntilTodayCount: number;
  expired: {
    user: {
      id: string;
      name: string;
    };
  }[];
}

export interface Api_AllCustomers extends GeneralResponse {
  customers: customerType[];
}

export interface customerType {
  id: string;
  name: string;
  phone: string;
  active: boolean;
  address: string;
  memberships: {
    membership: {
      name: string;
    };
    endDate: string;
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
    createdAt: string;
    dob: string;
    active: boolean;
  };
}

export interface Api_CustomerMemberships extends GeneralResponse {
  customerMemberships: {
    startDate: string;
    endDate: string;
    id: string;
    membership: {
      name: string;
    };
    paymentAmount: number;
    priceAtPurchase: number;
  }[];
}

export interface Api_MembershipDetails extends GeneralResponse {
  membership: {
    id: string;
    name: string;
    description: string;
    durationDays: number;
    price: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
export interface Api_MembershipIds extends GeneralResponse {
  ids: {
    id: string;
    name: string;
    price: number;
    durationDays?: number;
    active?: boolean;
  }[];
}
