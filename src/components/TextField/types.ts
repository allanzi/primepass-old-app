import type React from 'react';
import type { TextInputProps } from 'react-native';

export interface Props {
  value?: TextInputProps['value'];
  placeholder?: TextInputProps['placeholder'];
  leftSide?: React.FC | JSX.Element;
  rightSide?: React.FC | JSX.Element;
  onChangeText?: TextInputProps['onChangeText'];
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
  autoFocus?: TextInputProps['autoFocus'];
  keyboardType?: TextInputProps['keyboardType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  onChange?: TextInputProps['onChange'];
  editable?: TextInputProps['editable'];
}
