export type Product = {
  id: string;
  createdAt: Date;
  title: string;
  desc: string;
  img?: string;
  price: number;
  isFeatured: boolean;
  options: Array<{
    title: string;
    additionalPrice: number;
  }>;

  catSlug: string;
};

export type ProductType = {
  id: string;
  img: string;
  price: number;
  title: string;
  quantity: number;
  optionTitle: string;
};
export type UserType = {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  isAdmin: boolean;
  accounts: AccountType[];
  sessions: SessionType[];
  Authenticators: AuthenticatorType[];
  createdAt: Date;
  updatedAt: Date;
  Order: OrderType[];
};

export type OrderType = {
  id: string;
  createdAt: Date;
  price: number;
  products: ProductType[];
  status: string;
  intent_Id?: string;
  userEmail: string;
};

export type AccountType = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SessionType = {
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthenticatorType = {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string | null;
};
