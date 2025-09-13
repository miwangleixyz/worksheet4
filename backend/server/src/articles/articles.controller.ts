import { Body, Controller, Get, Post, Patch, Param, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './articles.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() article: Article) {
    return this.articlesService.create(article);
  }

  @Get()
  async findAll() {
    return this.articlesService.findAll();
  }

  // 更新文章状态
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const updated = await this.articlesService.updateStatus(id, status);
    if (!updated) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return updated;
  }
}
