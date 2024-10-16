import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import Card from '../../../../Card';
import { Props, ContentService } from './types';
import * as S from './styles';

const ListViewThumbnail: React.FC<Props> = (props) => {
  const { data, onPress } = props;

  return (
    <ScrollView>
      {data.map(({ title, items, index }) => (
        <S.Section key={`${index}-${title}`}>
          <S.Title>{title}</S.Title>
          <S.ItemSection
            data={items}
            horizontal
            keyExtractor={(item): string => {
              const { id } = item as ContentService;
              return id;
            }}
            renderItem={({ item: values }) => {
              const item = values as ContentService;
              const service = item.services[index];
              const thumbnail = item.medias.find(
                ({ typeUrl }) => typeUrl === 'square',
              );

              return (
                <S.ItemSeparator>
                  <Card
                    onPress={() => onPress({
                      contentService: item,
                      serviceIndex: index,
                    })}
                    title={item.name}
                    subtitle={service.name}
                    thumbnail={{ uri: thumbnail ? thumbnail.url : '' }}
                    tag={{
                      label: service.type.title,
                      color: service.type.color,
                    }}
                  />
                </S.ItemSeparator>
              );
            }}
          />
        </S.Section>
      ))}
    </ScrollView>
  );
};

export default ListViewThumbnail;
