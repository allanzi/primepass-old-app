/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React, { useRef, useState, useEffect } from 'react';
import { Animated, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import TitleLink from '../TitleLink';
import VerticalCard from '../VerticalCard';
import { ContentService } from '../../@types/graphql/schemas';
import * as S from './styles';

interface VerticalCarouselProps {
  data: any;
  hasTitle?: string;
  screenName?: string;
  serviceTypeId: string;
  serviceTypeName: string;
  serviceTypeTitle: string;
  tagFlow?: string;
  tagGroup?: string;
  tagContext?: string;
  tagSection?: string;
  tagName?: string;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  data,
  hasTitle = null,
  screenName,
  serviceTypeId,
  serviceTypeName,
  serviceTypeTitle,
  tagFlow,
  tagGroup,
  tagContext,
  tagSection,
  tagName,
}) => {
  if (!data) {
    return <View />;
  }

  const [title, setTitle] = useState(hasTitle);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (hasTitle) {
      setTitle(hasTitle);
    }
  }, [hasTitle]);

  return (
    <>
      {data.length > 0 && (
        <S.Container>
          {title && (
            <TitleLink
              serviceTypeId={serviceTypeId}
              link={serviceTypeName}
              keyword={serviceTypeTitle}
            >
              Destaques em
            </TitleLink>
          )}

          <S.CarouselWrapper>
            <Carousel
              data={data}
              sliderWidth={146}
              itemWidth={146}
              inactiveSlideOpacity={1}
              renderItem={({
                item,
                index,
              }: {
                item: ContentService;
                index: number;
              }) => (
                <VerticalCard
                  x={scrollX}
                  screenName={screenName}
                  serviceTypeId={serviceTypeId}
                  serviceTypeName={serviceTypeName}
                  serviceTypeTitle={serviceTypeTitle}
                  data={item}
                  index={index}
                  tagFlow={tagFlow}
                  tagGroup={tagGroup}
                  tagContext={tagContext}
                  tagSection={tagSection}
                  tagName={tagName}
                />
              )}
              ref={carouselRef}
            />
          </S.CarouselWrapper>
        </S.Container>
      )}
    </>
  );
};

export default VerticalCarousel;
