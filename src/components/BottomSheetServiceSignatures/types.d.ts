import { Signature, UserService } from '../../@types/graphql/schemas';
import { Footer as FooterInterface } from '../Dialog';

export interface Props {
  visible: boolean;
  toggle: () => void;
  openServiceRedeem: (service: UserService, siganture: Signature) => void;
  service: UserService;
}

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}
