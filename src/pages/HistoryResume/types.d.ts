import {
  Footer as FooterInterface,
} from '../../components/Dialog';

export interface ParamsProps {
  from: string;
  title: string;
}

export interface ModalMessageProps {
  title: string;
  message?: string | null;
  error?: boolean;
  children?: any;
  footer?: FooterInterface[] | null;
}
