import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  ArticleKafkaCreateRequest,
  ArticleKafkaCreateResponse,
  ArticleKafkaDeleteRequest,
  ArticleKafkaDeleteResponse,
  ArticleKafkaUpdateRequest,
  ArticleKafkaUpdateResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { ArticleModel } from './schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
  ) {}

  @MessagePattern('article.create')
  async create(
    dto: ArticleKafkaCreateRequest,
  ): Promise<ArticleKafkaCreateResponse> {
    const createdArticle = new this.articleModel(dto.body);
    return (await createdArticle.save()).toObject();
  }

  @MessagePattern('article.update')
  async update(
    dto: ArticleKafkaUpdateRequest,
  ): Promise<ArticleKafkaUpdateResponse> {
    return (
      await this.articleModel
        .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
        .exec()
    ).toObject();
  }

  @MessagePattern('article.delete')
  async delete(
    dto: ArticleKafkaDeleteRequest,
  ): Promise<ArticleKafkaDeleteResponse> {
    return (
      await this.articleModel.findByIdAndRemove(dto.params.id).exec()
    ).toObject();
  }
}
