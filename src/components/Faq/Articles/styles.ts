import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.backgroundModalDetails};
  flex: 1;
  border-radius: 8px;
  margin: 128px 16px 0px 16px;
  padding: 32px 0px;
  height: 566px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px 16px;
  margin-bottom: 8px;
  width: 60%;
`;

export const Pressable = styled.TouchableOpacity`
  flex-direction: row;
`;

export const TextHeader = styled.Text`
  font-size: 14px;
  line-height: 16px;
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

export const Subtitle = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 8px;
`;

export const Article = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const TitleArticle = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  max-width: 96%;
`;

export const ContainerLoading = styled.View`
  margin: 40px auto;
`;
