import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonPlansHome: React.FC = () => {
  const theme = useContext(ThemeContext);
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      width: WIDTH - 40,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16,
      paddingTop: 16,
      paddingBottom: 16,
    }}
    >
      <SkeletonPlaceholder
        backgroundColor="#313131"
        highlightColor="#515151"
      >
        {/* Services */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          marginRight="auto"
          marginLeft="auto"
        >
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={WIDTH / 3} height={WIDTH / 4 - 10} borderRadius={8} />
            <SkeletonPlaceholder.Item
              width={WIDTH / 4}
              height={10}
              borderRadius={11}
              marginTop={4}
            />
            <SkeletonPlaceholder.Item
              width={WIDTH / 3}
              height={20}
              borderRadius={11}
              marginLeft={0}
              marginTop={4}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item marginLeft={32}>
            <SkeletonPlaceholder.Item width={WIDTH / 3} height={WIDTH / 4 - 10} borderRadius={8} />
            <SkeletonPlaceholder.Item
              width={WIDTH / 4}
              height={10}
              borderRadius={11}
              marginTop={4}
            />
            <SkeletonPlaceholder.Item
              width={WIDTH / 3}
              height={20}
              borderRadius={11}
              marginLeft={0}
              marginTop={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          marginRight="auto"
          marginLeft="auto"
          marginTop={16}
        >
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={WIDTH / 3} height={WIDTH / 4 - 10} borderRadius={8} />
            <SkeletonPlaceholder.Item
              width={WIDTH / 4}
              height={10}
              borderRadius={11}
              marginTop={4}
            />
            <SkeletonPlaceholder.Item
              width={WIDTH / 3}
              height={20}
              borderRadius={11}
              marginLeft={0}
              marginTop={4}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item marginLeft={32}>
            <SkeletonPlaceholder.Item width={WIDTH / 3} height={WIDTH / 4 - 10} borderRadius={8} />
            <SkeletonPlaceholder.Item
              width={WIDTH / 4}
              height={10}
              borderRadius={11}
              marginTop={4}
            />
            <SkeletonPlaceholder.Item
              width={WIDTH / 3}
              height={20}
              borderRadius={11}
              marginLeft={0}
              marginTop={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

      </SkeletonPlaceholder>

    </View>
  );
};

export default SkeletonPlansHome;
