import React, { useContext } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonSuccessfullyReleased: React.FC = () => {
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
        {/* Banner */}
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={WIDTH} height={HEIGHT / 4} />
        </SkeletonPlaceholder.Item>

        {/* Title */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginLeft={16}
          marginTop={48}
        >
          <SkeletonPlaceholder.Item
            width={163}
            height={19}
            borderRadius={100}
          />
        </SkeletonPlaceholder.Item>

        {/* Tickets */}
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="flex-start"
          marginLeft={16}
          marginTop={8}
        >
          <SkeletonPlaceholder.Item width={WIDTH - 28} height={50} borderRadius={8} />
        </SkeletonPlaceholder.Item>

        {/* Buttons */}
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignSelf="center"
          marginTop={36}
        >
          <SkeletonPlaceholder.Item width={WIDTH - 90} height={50} borderRadius={100} />
          <SkeletonPlaceholder.Item
            width={WIDTH - 90}
            height={50}
            borderRadius={100}
            marginTop={16}
          />

        </SkeletonPlaceholder.Item>

        {/* How to use text */}
        <SkeletonPlaceholder.Item
          flexDirection="column"
          marginTop={36}
          marginLeft={48}
        >
          <SkeletonPlaceholder.Item width="50%" height={14} borderRadius={11} marginLeft="20%" />
          <SkeletonPlaceholder.Item
            width="49%"
            height={10}
            borderRadius={11}
            marginTop={10}
          />
          <SkeletonPlaceholder.Item
            width="52%"
            height={10}
            borderRadius={11}
            marginTop={8}
          />
          <SkeletonPlaceholder.Item
            width="51%"
            height={10}
            borderRadius={11}
            marginTop={8}
          />
          <SkeletonPlaceholder.Item
            width="45%"
            height={10}
            borderRadius={11}
            marginTop={8}
          />

        </SkeletonPlaceholder.Item>

      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonSuccessfullyReleased;
