export interface TicketFormProps {
  creditsAvailable: number;
  creditQuantity: number;
  creditScreenType: string;
  creditRoomType: string;
  onChangeQuantity: Function;
  onChangeScreenType: Function;
  onChangeRoomType: Function;
  screens: Array<string>;
  rooms: Array<string>;
}
