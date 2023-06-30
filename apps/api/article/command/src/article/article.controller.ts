import { Controller, NotFoundException } from '@nestjs/common';
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
import { ArticleModel } from './article.schema';

@Controller()
export class ArticleController {
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
  ) {}

  @MessagePattern('article.create')
  async create(
    dto: ArticleKafkaCreateRequest,
  ): Promise<ArticleKafkaCreateResponse> {
    const createdArticleDocument = new this.articleModel(dto.body);
    const createdArticle = await createdArticleDocument.save();

    return createdArticle.toObject();
  }

  @MessagePattern('article.update')
  async update(
    dto: ArticleKafkaUpdateRequest,
  ): Promise<ArticleKafkaUpdateResponse> {
    const article = await this.articleModel
      .findByIdAndUpdate(dto.params.id, dto.body, { new: true })
      .exec();

    if (!article) throw new NotFoundException();

    return article.toObject();
  }

  @MessagePattern('article.delete')
  async delete(
    dto: ArticleKafkaDeleteRequest,
  ): Promise<ArticleKafkaDeleteResponse> {
    const article = await this.articleModel
      .findByIdAndRemove(dto.params.id)
      .exec();

    if (!article) throw new NotFoundException();

    return article.toObject();
  }
}
