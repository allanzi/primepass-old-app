import { Signature, UserService } from '../../@types/graphql/schemas';

export interface Props {
  visible: boolean;
  toggle: () => void;
  service: UserService;
  signature: Signature;
}
