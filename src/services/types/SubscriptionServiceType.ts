export interface SubscriptionServiceType {
  addUserToSubscription?: any;
  getUserSubscription?: any;
  getAllSubscription?: any;
  getUserPayments?: any;
  getPaymentDetails?: any;
  getPaymentStatus?: any;
};

export interface AddUserSubscriptionType {
  planId: number;
  payment_type: string;
}

export interface SubscriptionType {
  id: number;
  price: number;
  name: string;
  outlines: string | null;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at:string |  null;
}

export interface UserSubscriptionType {
  id: number;
  expired_at: string;
  subscription: SubscriptionType;
  payment: PaymentType;
}

export interface PaymentType {
  id: number;
  transaction_id: string;
  type: string,
  status: string;
  created_at: string;
  updated_at: string | null;
  deleted_at:string |  null;
}