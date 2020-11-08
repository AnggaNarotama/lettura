/* eslint-disable class-methods-use-this */
import { EntityRepository, Repository } from 'typeorm';
import Dayjs from 'dayjs';
import { ArticleEntity } from '../entity/article';
import { Article, Channel, RSSFeedItem } from '../infra/types';
import { ArticleReadStatus } from '../infra/constants/status';
import { ChannelEntity } from '../entity/channel';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {
  async getAll(): Promise<ArticleEntity[]> {
    const list = await this.find({});
    return list;
  }

  async getListWithChannelId(channelId: string) {
    const channel = new ChannelEntity();
    channel.id = channelId;

    const list = this.find({
      where: {
        channel,
      },
    });

    console.log(list);

    return list;
  }

  // async getUnreadListWithChannelId() {}
  //
  // async getReadListWithChannelId() {}

  /**
   * 添加文件
   * @param {string} channelId uuid
   * @param items
   */
  async insertArticles(channelId: string, items: RSSFeedItem[] = []) {
    if (!items.length) {
      return;
    }

    const channel = new ChannelEntity();

    channel.id = channelId;

    const values = items.map(
      (item): ArticleEntity => {
        const article = new ArticleEntity();

        article.author = item.author;
        article.category = 0;
        article.channel = channel;
        article.comments = item.comments;
        article.content = item.content;
        article.description = item.description;
        article.link = item.link;
        article.pubDate = item.pubDate;
        article.title = item.title;
        article.hasRead = 0;
        article.isLike = 0;
        article.createDate = new Date().toString();
        article.updateDate = new Date().toString();

        return article;
      }
    );

    await this.save(values);
  }
}