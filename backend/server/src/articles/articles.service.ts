import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Article, ArticleDocument } from './articles.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async create(article: Article): Promise<Article> {
    const newArticle = new this.articleModel(article);
    return newArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async updateStatus(id: string, status: string): Promise<Article | null> {
    // ✅ 打印调试日志，看看前端传的 id 和 status
    console.log('📌 updateStatus called with:', { id, status });

    // ✅ 检查 id 是否是合法的 MongoDB ObjectId
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid article ID: ${id}`);
    }

    // ✅ 执行更新
    const updatedArticle = await this.articleModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // 返回更新后的文档
    ).exec();

    if (!updatedArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return updatedArticle;
  }
}
