import { Pressable, Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import ImageCustom from '../Image';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const MODALWIDTH = Dimensions.get('window').width * 0.9;

export const BackgroundFade = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  flex: 1;
  position: absolute;
  top: 0;
`;

export const CenterView = styled.View`
  align-items: center;
  position: absolute;
  width: 100%;
  max-width: 355px;
  height: 70%;
  max-height: 550px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  flex: 1;
  width: ${MODALWIDTH}px;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 2px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 9px;
`;

export const Content = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  padding: 12px;
  max-height: ${(HEIGHT * (Platform.OS === 'ios' ? 331 : 343)) / 640}px;
  max-width: ${(WIDTH * 328) / 360}px;
`;

export const ContainerImage = styled.View`
  max-height: ${(HEIGHT * 221) / 640}px;
  max-width: ${(WIDTH * 146) / 360}px;
  height: 100%;
  width: 100%;
`;

export const Poster = styled(ImageCustom)`
  height: 100%;
  width: 100%;
  border-radius: 8px;
`;

export const ContainerDescription = styled.View`
  max-height: ${(HEIGHT * 221) / 640}px;
  max-width: ${(WIDTH * 146) / 360}px;
  height: ${(HEIGHT * 221) / 640}px;
  width: 100%;
  padding-top: 0;
  padding-left: 8px;
`;

export const ContainerDescriptionScroll = styled.ScrollView`
  max-height: ${(HEIGHT * 221) / 640}px;
  max-width: ${(WIDTH * 146) / 360}px;
  height: ${(HEIGHT * 221) / 640}px;
  width: 100%;
  padding-top: 0;
  padding-left: ${Platform.OS === 'ios' ? '0' : '6'}px;

`;

export const Column = styled.View`
  margin-top: 5px;
  padding: 0 2px;
  max-height: 120px;
  min-height: 90px;
  justify-content: flex-start;
`;

export const TextInfo = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
`;

export const TextInfoBold = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-weight: bold;
  line-height: 20px;
  font-size: 13px;
`;

export const YearText = styled.Text`
  margin-right: 5px;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.colorText};
`;

export const DurationContainer = styled.View`
  border-radius: 10px;
  border: 1px solid #eee;
  height: 20px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

export const DurationText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  text-align: justify;
  font-size: 13px;
`;

export const GenreContainer = styled.View`
  flex-direction: row;
  margin-left: 5px;
`;

export const Genre = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  text-align: justify;
  font-size: 13px;
`;

export const TitleContainer = styled.View`
  height: 100%;
  max-height: 82px;
  width: 100%;
  max-width: ${(WIDTH * 328) / 360}px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.colorTextButtonDisable};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const FooterContainer = styled(Pressable)`
  max-width: ${(WIDTH * 328) / 360}px;
  max-height: 46px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.colorTextButtonDisable};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 16px;
`;

export const FooterText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  text-align: left;
  line-height: 20px;
  padding: ${Platform.OS === 'ios' ? '8' : '0'}px;
`;

// ######################################################
export const ContainerContent = styled.View`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
  top: 0;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
`;

export const InsideModalContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  width: 93%;
  max-height: 70%;
  align-items: center;
  border-radius: 10px;
`;

export const ModalTitle = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 5%;
`;

export const ModalTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 16px;
`;

export const InfoContainer = styled.View`
  margin-top: 4%;
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  width: 100%;
  padding: 10px 5px;
  height: 58%;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const ImageContainer = styled.View`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const InfoColumn = styled.View`
  width: 50%;
  height: 98%;
  overflow: hidden;
  padding-left: 10px;
`;

export const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  padding: 0px 10px;
  font-size: 11px;
  line-height: 20px;
`;

export const DataContainer = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  width: 100%;
  height: 20%;
  padding-left: 13px;
`;

export const BottomText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 12px;
  line-height: 20px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const ExtraInfoContainer = styled.View`
  align-items: center;
  margin-top: 10px;
  width: 80%;
  flex-direction: row;
  justify-content: flex-start;
`;
export const ExtraInfoContainerText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 10px;
`;
export const CategoryInfoContainerText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 10px;
  margin-left: 5px;
`;

export const Length = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.colorText};
  border-radius: 10px;
  width: 70px;
`;

export const LengthText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
  font-size: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.colorTextButtonDisable};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  border-radius: 10px;
`;

export const CloseButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.colorText};
`;
