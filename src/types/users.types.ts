export type RegisterBodyType = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  email: string;
  password: string;
  name: string | null;
  address1: string | null;
  address2: string | null;
  nip: string | null;
  phone: number | null;
};
