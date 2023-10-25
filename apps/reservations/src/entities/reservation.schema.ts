import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  timestamp: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  placeId: string;

  @Prop()
  invoiceId: string;
}
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
