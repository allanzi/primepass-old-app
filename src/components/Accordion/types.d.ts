import type { GestureResponderEvent, ImageSourcePropType } from 'react-native';
import type { Source } from 'react-native-fast-image';

export interface AccordionProps {
  icon: Source | string | ImageSourcePropType;
  title: string;
  description: string;
}

export interface AccordionInformationProps {
  title: string;
}

export interface AccordionActionProps {
  icon: Source | string | ImageSourcePropType;
  label: string;
  loading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
