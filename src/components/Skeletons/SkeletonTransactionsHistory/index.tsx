import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonTransactionsHistory: React.FC = () => {
  const theme = useContext(ThemeContext);
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      display: 'flex',
      alignItems: 'flex-start',
      width: WIDTH - 32,
      marginTop: 32,
      paddingBottom: 16,
    }}
    >
      {[1, 2, 3, 4, 5].map(() => (
        <View style={{
          width: WIDTH + 10,
          borderColor: '#313131',
          borderWidth: 0.6,
          paddingTop: 4,
          paddingBottom: 8,
        }}
        >
          <SkeletonPlaceholder
            backgroundColor="#313131"
            highlightColor="#515151"
          >
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              marginTop={10}
              marginLeft={32}
              width={WIDTH - 90}
            >
              <SkeletonPlaceholder.Item
                width={275}
                height={16}
                borderRadius={100}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginTop={10}
              marginLeft={32}
              marginRight={42}
            >
              <SkeletonPlaceholder.Item width={WIDTH / 2 - 60} height={13} borderRadius={8} />
              <SkeletonPlaceholder.Item width={WIDTH / 2 - 100} height={13} borderRadius={8} />

            </SkeletonPlaceholder.Item>

          </SkeletonPlaceholder>
        </View>
      )) }

    </View>
  );
};

export default SkeletonTransactionsHistory;
