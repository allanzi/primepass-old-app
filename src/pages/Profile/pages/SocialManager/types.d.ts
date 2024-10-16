import type { ImageSourcePropType } from 'react-native';

export interface AccountData {
  title: string;
  description: string;
  iconName: string;
  actionIcon: ImageSourcePropType;
  actionLabel: string;
  actionEvent: () => void;
}

export interface DialogErrors {
  title: string;
  message: string | undefined;
  visible: boolean;
}

export type GetAutenticator = () => Promise<boolean>;
