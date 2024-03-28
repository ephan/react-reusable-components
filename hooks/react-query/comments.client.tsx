import { fetchComments } from 'lib/queries/comments';
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

const COMMENTS_LIMIT = 10;

//#region TS
type UseCommentsProps = {
  order: Sort;
  token: string | undefined;
  enabled?: boolean;
};
//#endregion

export const fetchCommentsByOrder =
  (order: Sort) => (context: QueryFunctionContext) => {
    return fetchComments({
      order: order === Sort.OLDER_FIRST ? SortType.ASC : SortType.DESC,
      skip: context.pageParam?.skip || 0,
    });
  };

export const getCommentsQueryKey = (order: string, userId: string) => {
  return ['comments', order, userId];
};

export const useComments = ({
  order,
  token,
  enabled = true,
}: UseCommentsProps) => {
  const userId = getUserId(token);

  const commentsQuery = useInfiniteQuery(
    getCommentsQueryKey(order, userId),
    fetchCommentsByOrder(order),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.pageInfo?.hasNextPage) {
          return {
            skip: pages.flatMap((page) => page.comments).length,
          };
        }
      },
      enabled: !!token && enabled,
      refetchOnWindowFocus: false,
    }
  );

  return {
    ...commentsQuery,
  };
};

export const useRecentComments = ({
  token,
}: Omit<UseCommentsProps, 'order'>) => {
  const userId = getUserId(token);

  const commentsQuery = useQuery(
    getCommentsQueryKey(SortType.DESC, userId),
    async () => {
      return fetchComments({
        order: SortType.DESC,
        limit: COMMENTS_LIMIT,
      });
    },
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
    }
  );

  return {
    ...commentsQuery,
  };
};
