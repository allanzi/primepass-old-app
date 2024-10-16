export interface BannerType {
  type: string;
  created_at: Date;
  finish: Date;
  id: string;
  image: Image;
  link: string;
  start: Date;
  subtitle: string;
  tags: Array<Tag>;
  title: string;
}

interface Image {
  mobile: string;
  desktop: string;
}

interface Tag {
  label: string;
  labelBackground: string;
  labelColor: string;
}
