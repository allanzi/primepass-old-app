import { Period } from '../../@types/graphql/schemas/CreditResume';

export interface Section{
  title: string;
  data: Period[];
}
