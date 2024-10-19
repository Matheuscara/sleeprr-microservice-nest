import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
// DOCUMENTATION: CRIA UM SCHEMA ABSTRATO PARA SER HERDADO
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;
}
