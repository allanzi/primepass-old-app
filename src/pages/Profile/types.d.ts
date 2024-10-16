import { Footer as FooterInterface } from '../../components/Dialog';

interface FormData {
  input?: string;
}

export interface ModalMessageProps {
  title: string;
  subtitle?: string | null;
  message?: string | null;
  children?: any;
  footer?: FooterInterface[] | null;
  error?: boolean;
}
