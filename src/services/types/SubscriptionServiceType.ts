export interface SubscriptionServiceType {
  addUserToSubscription?: any;
  getUserSubscription?: any;
  getAllSubscription?: any;
  getUserPayments?: any;
  getPaymentDetails?: any;
};

export interface AddUserSubscriptionType {
  subscriptionId: number;
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

export interface PaymentType {
  id: number;
  transaction_id: string;
  type: string,
  status: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at:string |  null;
}