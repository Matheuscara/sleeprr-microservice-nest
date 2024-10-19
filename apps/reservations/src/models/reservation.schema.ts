import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
// DOCUMENTATION: CRIA UM SCHEMA PARA RESERVAS HERDANDO O SCHEMA ABSTRATO
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;
}

// DOCUMENTATION: CRIA UM SCHEMA PARA SER USADO NO MONGO NO MODULE
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
