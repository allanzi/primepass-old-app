type Producer = {
  __typename?: 'Producer' | undefined;
  name: string;
  logo: string;
};

type Media = {
  __typename?: 'Media' | undefined;
  id: string;
  url: string;
  typeUrl:
  | 'landscape'
  | 'catalog'
  | 'youtube'
  | 'moreDetail'
  | 'square'
  | 'highlight';
};

type URL = {
  history: {
    route: string;
    analystics: string;
    params: {
      from: string;
    };
  };
  menu: {
    route: string;
    analystics: string;
    params: {
      screen: string;
    };
  };
};

type ServiceTypeIcon = {
  white: string;
  gray: string;
};

type ServiceType = {
  __typename?: 'ServiceType' | undefined;
  id: string;
  name: string;
  title: string;
  subtitle: string;
  color: string;
  priority: number;
  isActive: boolean;
  activeHistoryMenu: boolean;
  urls: URL;
  icon: ServiceTypeIcon;
};

type RedeemData = {
  __typename?: 'RedeemData' | undefined;
  redeemed: boolean;
  voucherCode: string;
  code: string;
  userName: string;
  password: string;
  primeLogin: boolean;
};

type ServiceResume = {
  __typename?: 'ServiceResume' | undefined;
  id: string;
  name: string;
  logo: string;
  type: ServiceType;
  color: string;
  deepLink: string;
  redeem: RedeemData;
};

export type ContentService = {
  __typename?: 'ContentService';
  id: string;
  name: string;
  description: string;
  categories: Array<string>;
  directors: Array<string>;
  actors: Array<string>;
  producer: Producer;
  artist: string;
  duration: number;
  recommendedAge: string;
  launchDate: string;
  detach: string;
  active: string;
  medias: Array<Media>;
  services: Array<ServiceResume>;
  contentServiceId: string;
};

interface Data {
  title: string;
  index: number;
  items: Array<ContentService>;
}

export interface DataPosition {
  serviceIndex: number;
  contentService: ContentService;
}

export interface Props {
  data: Array<Data>;
  onPress: (dataPosition: DataPosition) => void;
}
