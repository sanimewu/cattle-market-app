export interface Cattle {
  breed: string;
  weight: number;
  price: number;
  status: 'available' | 'sold' | string;
  date: Date | string;
  username: string;
  id: string;
}
