import type { Maybe, Payload } from './defaults';

/** An specific Attribute */
export interface Attribute extends Payload<'Attribute'> {
  /** The unique id of Attribute */
  id: Maybe<string>;
  /** The description of Attribute */
  value: Maybe<string>;
  /** The Attribute Type related of Movie */
  attributeType: Maybe<AttributeType>;
}

/** An specific Attribute Type */
export interface AttributeType extends Payload<'AttributeType'> {
  /** The unique id of Attribute Type */
  id: Maybe<string>;
  /** The entity of Attribute Type */
  entity: Maybe<string>;
  /** The name of Attribute Type */
  name: Maybe<string>;
  /** The type of Attribute Type */
  type: Maybe<string>;
  /** The default of Attribute Type */
  default: Maybe<string>;
}
