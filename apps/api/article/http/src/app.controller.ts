import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  Article,
  ArticleCreateDto,
  ArticleDeleteDto,
  ArticleListDto,
  ArticleReadDto,
  ArticleUpdateDto,
} from '@ustagil/typing';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller('articles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async list(dto: ArticleListDto): Promise<Article[]> {
    const ttt = await firstValueFrom(this.appService.getHero());
    console.log('ttt:', ttt);

    return this.appService.list(dto);
  }

  @Post()
  create(dto: ArticleCreateDto): Article {
    return this.appService.create(dto);
  }

  @Get(':id')
  read(dto: ArticleReadDto): Article {
    return this.appService.read(dto);
  }

  @Patch(':id')
  update(dto: ArticleUpdateDto): Article {
    return this.appService.update(dto);
  }

  @Delete(':id')
  delete(dto: ArticleDeleteDto): Article {
    return this.appService.delete(dto);
  }
}
