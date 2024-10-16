import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonBanners: React.FC = () => {
  const theme = useContext(ThemeContext);
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <SkeletonPlaceholder
        backgroundColor="#313131"
        highlightColor="#515151"
      >
        {/* HighlightCarousel Banner */}
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={WIDTH} height={520} />
        </SkeletonPlaceholder.Item>

        {/* HighlightCarousel Pagination */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignSelf="center"
          marginTop={16}
        >
          <SkeletonPlaceholder.Item width={40} height={10} borderRadius={100} />
          <SkeletonPlaceholder.Item width={10} height={10} borderRadius={100} marginLeft={8} />
          <SkeletonPlaceholder.Item width={10} height={10} borderRadius={100} marginLeft={8} />
        </SkeletonPlaceholder.Item>

        {/* Badge */}
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={32}>
          <SkeletonPlaceholder.Item width={140} height={10} borderRadius={100} marginLeft={16} />
        </SkeletonPlaceholder.Item>

        {/* Title */}
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={16}>
          <SkeletonPlaceholder.Item width={150} height={36} borderRadius={8} marginLeft={16} />
        </SkeletonPlaceholder.Item>

        {/* Text */}
        <SkeletonPlaceholder.Item flexDirection="column" marginTop={32}>
          <SkeletonPlaceholder.Item width={250} height={10} borderRadius={8} marginLeft={16} />
          <SkeletonPlaceholder.Item
            width={250}
            height={10}
            borderRadius={8}
            marginLeft={16}
            marginTop={6}
          />
        </SkeletonPlaceholder.Item>

        {/* Buttons */}
        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center" marginTop={32}>
          <SkeletonPlaceholder.Item width={WIDTH - 64} height={40} borderRadius={100} />
          <SkeletonPlaceholder.Item
            width={WIDTH - 64}
            height={40}
            borderRadius={100}
            marginTop={8}
          />
        </SkeletonPlaceholder.Item>

      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonBanners;
