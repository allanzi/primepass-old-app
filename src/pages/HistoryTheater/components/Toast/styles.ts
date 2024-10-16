import styled from 'styled-components/native';
import { Dimensions, Animated, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  width: ${width}px;
  background: ${(props) => (props.canceled ? 'red' : 'rgba(0, 175, 81, 0.7)')};
  align-items: center;
  justify-content: center;
  height: ${Platform.OS === 'ios' ? '108' : '90'}px;
  z-index: 60;
  position: absolute;
  top: -108px;
`;

export default Container;
