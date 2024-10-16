export interface PaginationServiceHistory {
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CinemaService {
  rules: Rules;
}

export interface Rules {
  day: string[];
}

export interface Service {
  id: string;
  signatureId: string;
  dateFinish: Date;
  name: string;
  images: Image;
  logo: string;
  redeem: Redeem;
  type: Type;
}

export interface Image {
  card_web: string;
}

export interface Redeem {
  redeemed: string;
}

export interface Type {
  name: string;
  title: string;
}
