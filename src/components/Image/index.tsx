/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ImageBackground } from 'react-native';

interface FastImageProps {
  uri: string;
  uriDefault: string;
}

const Image: React.FC<FastImageProps> = ({
  uri,
  uriDefault,
  children,
  ...rest
}) => (
  <ImageBackground
    {...rest}
    source={{
      uri: uri && uri.length > 10 ? uri : uriDefault,
    }}
  >
    {children}
  </ImageBackground>
);

export default Image;
