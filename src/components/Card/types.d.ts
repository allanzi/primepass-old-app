import type { Source } from 'react-native-fast-image';

export interface TagCard {
  label: string;
  color?: string;
}

export interface Props {
  onPress: () => void;
  thumbnail: Source;
  title: string;
  subtitle: string;
  tag: TagCard;
}
