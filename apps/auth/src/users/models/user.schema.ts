import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
// DOCUMENTATION: CRIA UM SCHEMA PARA RESERVAS HERDANDO O SCHEMA ABSTRATO
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

// DOCUMENTATION: CRIA UM SCHEMA PARA SER USADO NO MONGO NO MODULE
export const UserSchema = SchemaFactory.createForClass(UserDocument);
