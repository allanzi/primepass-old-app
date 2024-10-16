import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';

export const Container = styled(ScrollView)`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  flex: 1;
  border-radius: 8px;
  margin: 128px 16px 0px 16px;
  padding: 32px 0px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

export const Pressable = styled.TouchableOpacity`
  flex-direction: row;
`;

export const TextHeader = styled.Text`
  font-size: 12px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.white};
`;

export const BoldText = styled.Text`
  font-weight: 700;
`;

export const Divider = styled.View`
  border-style: solid;
  border-color: #515151;
  border-bottom-width: 1px;
  width: 100%;
  align-self: center;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const ContentTitle = styled.View`
  padding: 24px 16px;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 8px;
`;

export const Text = styled.Text`
  font-size: 10px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContentIcon = styled.View`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const PartnerLogo = styled.Image`
  margin-right: 2px;
  width: 20px;
  height: 20px;
  resize-mode: contain;
`;

export const ContentInfoArticle = styled.View``;

export const ContentHTML = styled.View`
  padding: 16px;
`;

export const ContentArticles = styled.View`
  padding: 16px;
  margin-bottom: 32px;
`;

export const List = styled.View`
  margin-top: 16px;
`;

export const Article = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const TitleArticle = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.colorInfoText};
  max-width: 96%;
`;
