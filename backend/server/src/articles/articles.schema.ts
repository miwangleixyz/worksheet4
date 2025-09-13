import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop([String])
  authors: string[];

  @Prop()
  source: string;

  @Prop()
  pubyear: number;

  @Prop()
  doi: string;

  @Prop()
  summary: string;

  @Prop()
  linked_discussion: string;

  // 🔹 新增 status 字段
  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected', 'analysed'],
    default: 'pending',
  })
  status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
