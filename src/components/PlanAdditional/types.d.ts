export interface PlanAdditionalProps {
  name: string;
  description: string;
  services: Array<Service>;
  modalContent: string;
}

export interface Service {
  id: string;
  name: string;
  logo: string;
  color: string;
  type: Object;
  redeem: Object;
}
