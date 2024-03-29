import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  ArticleGrpcListRequest,
  ArticleGrpcListResponse,
  ArticleGrpcReadRequest,
  ArticleGrpcReadResponse,
} from '@ustagil/typing';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { ArticleModel } from './article.schema';

@Controller()
export class ArticleController {
  constructor(
    @InjectModel(ArticleModel.name) private articleModel: Model<ArticleModel>,
  ) {}

  @GrpcMethod('ArticleService', 'List')
  async list(
    dto: ArticleGrpcListRequest,
  ): Promise<Observable<ArticleGrpcListResponse>> {
    const articles = await this.articleModel.find({ ...dto.query }).exec();
    return from(
      articles.map((article) => {
        const { _id, ...q } = article.toObject();
        return { _id: _id.toHexString(), ...q };
      }),
    );
  }

  @GrpcMethod('ArticleService', 'Read')
  async read(dto: ArticleGrpcReadRequest): Promise<ArticleGrpcReadResponse> {
    const article = await this.articleModel.findById(dto.params.id).exec();

    if (!article) throw new NotFoundException();

    return article.toObject();
  }
}
