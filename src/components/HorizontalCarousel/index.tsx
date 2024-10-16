/* eslint-disable react/no-unused-prop-types, react/require-default-props */
import React, { useRef, useState, useEffect } from 'react';
import { Animated, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import TitleLink from '../TitleLink';
import HorizontalCard from '../HorizontalCard';
import { ContentService } from '../../@types/graphql/schemas';
import * as S from './styles';

interface HorizontalCarouselProps {
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

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
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
  const [title, setTitle] = useState(hasTitle);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);

  useEffect(() => {
    if (hasTitle) {
      setTitle(hasTitle);
    }
  }, [hasTitle]);

  if (!data) {
    return <View />;
  }

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
              sliderWidth={220}
              itemWidth={220}
              inactiveSlideOpacity={1}
              renderItem={({
                item,
                index,
              }: {
                item: ContentService;
                index: number;
              }) => (
                <HorizontalCard
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

export default HorizontalCarousel;
