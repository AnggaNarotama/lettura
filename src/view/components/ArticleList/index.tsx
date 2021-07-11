import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Article } from '../../../infra/types';
import { ArticleReadStatus } from '../../../infra/constants/status';
import { useDataProxy } from '../../hooks/useDataProxy';
import { ArticleItem } from '../ArticleItem';
import styles from './articlelist.css';

type ArticleListProps = {
  channelId: string | null;
};

export const ArticleList = (props: ArticleListProps): JSX.Element => {
  console.log(props);
  const dataProxy = useDataProxy();
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [currentLink, setCurrentLink] = useState<string>('');
  const articleListRef = useRef<HTMLDivElement>(null);

  const viewDetail = async (article: Article) => {
    setCurrentLink(article.link);
    article.hasRead = ArticleReadStatus.isRead;
  };

  const resetScrollTop = () => {
    if (articleListRef.current !== null) {
      articleListRef.current.scroll(0, 0);
    }
  };

  const renderList = useCallback((): JSX.Element[] => {
    return articleList.map((article: Article) => {
      return <ArticleItem article={article} key={article.id} />;
    });
  }, [articleList]);

  useEffect(() => {
    dataProxy
      .getArticleListInChannel({
        channelId: props.channelId,
      })
      .then((result) => {
        setArticleList(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  return (
    <div className={styles.container} ref={articleListRef}>
      <ul className={styles.list}>{renderList()}</ul>
    </div>
  );
};
