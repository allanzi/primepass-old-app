import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import { Animated } from 'react-native';

export const Accordion = styled.View`
  padding: 16px 20px 16px 20px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: ${({ theme }) => theme.colors.borderConfigColor};
`;

export const AccordionIcon = styled(FastImage)`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

export const AccordionActionIcon = styled(FastImage)`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export const Icon = styled(FastImage)`
  width: 15px;
  height: 15px;
`;

export const AccordionLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const AccordionActionLabel = styled.Text`
  font-size: 12px;
  color: #b9b6b6;
`;

export const AccordionDescription = styled.Text`
  font-size: 10px;
  color: #b9b6b6;
`;

export const AccordionHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
`;

export const AccordionBody = styled.View`
  padding-left: 33px;
  padding-top: 10px;
  align-items: center;
  overflow: hidden;
  display: flex;
`;

export const Loading = styled.ActivityIndicator`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export const AccordionAction = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 6px 0px;
`;

export const AccordionHeaderLeft = styled.View`
  justify-content: center;
`;

export const AccordionHeaderRight = styled.View`
  justify-content: center;
`;

export const AccordionHeaderCenter = styled.View`
  flex: 1;
`;

export const AccordionInformation = styled.View`
`;

export const AccordionHeaderInformation = styled.View`
  flex-direction: row;
`;

export const AccordionInformationBody = styled(Animated.View)`
  padding: 10px 20px;
  align-items: flex-start;
  overflow: hidden;
  display: flex;
  background-color: ${({ theme }) => theme.colors.backgroundModalDetails};
  border-radius: 8px;
  margin-bottom: 16px;

`;
