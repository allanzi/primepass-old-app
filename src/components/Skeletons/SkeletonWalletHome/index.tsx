import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonWalletHome: React.FC = () => {
  const theme = useContext(ThemeContext);
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      width: WIDTH - 32,
      borderColor: '#515151',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'flex-start',
      marginTop: 16,
      marginRight: 'auto',
      marginBottom: 16,
      marginLeft: 'auto',
      paddingBottom: 16,
    }}
    >

      <SkeletonPlaceholder
        backgroundColor="#313131"
        highlightColor="#515151"
      >
        {/* Title */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          marginTop={16}
          marginLeft={16}
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
          alignItems="center"
          marginTop={8}
          marginLeft={48}

        >
          <SkeletonPlaceholder.Item width={WIDTH - 200} height={32} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width={WIDTH - 200}
            height={18}
            borderRadius={8}
            marginTop={8}
          />
        </SkeletonPlaceholder.Item>

      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonWalletHome;
