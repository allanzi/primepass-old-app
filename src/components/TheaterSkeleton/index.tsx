import React, { useContext } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TheaterSkeleton: React.FC = () => {
  const theme = useContext(ThemeContext);
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{ backgroundColor: theme.colors.background, height: '100%' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SkeletonPlaceholder
        backgroundColor="#313131"
        highlightColor="#515151"
      >
        {/* HighlightCarousel Banner */}
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={WIDTH} height={HEIGHT / 1.8} />
        </SkeletonPlaceholder.Item>

        {/* HighlightCarousel Tittle */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginLeft={16}
          marginTop={8}
        >
          <SkeletonPlaceholder.Item
            width={163}
            height={19}
            borderRadius={100}
          />
        </SkeletonPlaceholder.Item>

        {/* HighlightCarousel Attributes */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginLeft={16}
          marginTop={8}
        >
          <SkeletonPlaceholder.Item width={60} height={16} borderRadius={100} />
          <SkeletonPlaceholder.Item
            width={60}
            height={16}
            borderRadius={100}
            marginLeft={12}
          />
        </SkeletonPlaceholder.Item>

        {/* HighlightCarousel Pagination */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignSelf="center"
          marginTop={16}
        >
          <SkeletonPlaceholder.Item width={46} height={6} borderRadius={100} />
        </SkeletonPlaceholder.Item>

        {/* Content Tittle */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={16}
          marginLeft={16}
        >
          <SkeletonPlaceholder.Item width={73} height={17} borderRadius={11} />
        </SkeletonPlaceholder.Item>

        {/* Content Banner */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          marginLeft={16}
        >
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
          />
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
            marginLeft={16}
          />
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
            marginLeft={16}
          />
        </SkeletonPlaceholder.Item>

        {/* Content Tittle */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={16}
          marginLeft={16}
        >
          <SkeletonPlaceholder.Item width={73} height={17} borderRadius={11} />
        </SkeletonPlaceholder.Item>

        {/* Content Banner */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginTop={10}
          marginLeft={16}
        >
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
          />
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
            marginLeft={16}
          />
          <SkeletonPlaceholder.Item
            width={146}
            height={220}
            borderRadius={11}
            marginLeft={16}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default TheaterSkeleton;
