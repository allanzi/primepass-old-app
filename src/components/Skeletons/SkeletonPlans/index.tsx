import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonPlans: React.FC = () => {
  const theme = useContext(ThemeContext);
  const WIDTH = Dimensions.get('window').width;

  return (
    <View style={{
      backgroundColor: theme.colors.background,
      width: WIDTH - 32,
      alignItems: 'center',
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

        {/* Tickets */}
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="center"
          marginTop={8}
        >
          <SkeletonPlaceholder.Item width={WIDTH - 30} height={90} borderRadius={8} />
          <SkeletonPlaceholder.Item
            width={WIDTH - 30}
            height={90}
            borderRadius={8}
            marginTop={16}
          />
        </SkeletonPlaceholder.Item>

      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonPlans;
