import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from 'contexts/Toast';

import { Comment } from '@/hooks/react-query/comments.client';

import { RateAction } from 'lib/queries/comments/mutationRateComment';
import { RateComment } from 'lib/queries/comments/rateComment';
import { CommentsSortBy } from 'lib/queries/video/fetchComments';
import { CommentResponse, getCommentsQueryKey } from './comments.client';

const getUpdatedComment = (rateAction: RateAction, comment: Comment) => {
  const incrementer = rateAction === RateAction.LIKE ? 1 : -1;
  const newLikeCount = comment.likeCount + incrementer;
  const viewerData = {
    ...comment.viewerData,
    isLiked: rateAction === RateAction.LIKE,
  };
  const updatedComment = { ...comment, likeCount: newLikeCount, viewerData };
  return updatedComment;
};

export const useRateCommentMutation = (
  commentId: string,
  contentId: string,
  parentId: string | null
) => {
  const { showToast } = useToast();

  const queryClient = useQueryClient();
  const { accessToken } = useAccessToken();
  const userId = getUserId(accessToken);

  const newerToOlderQueryKey = getCommentsQueryKey(
    contentId,
    CommentsSortBy.NEWEST,
    userId
  );
  const olderToNewerQueryKey = getCommentsQueryKey(
    contentId,
    CommentsSortBy.OLDEST,
    userId
  );

  const queryKeys = [newerToOlderQueryKey, olderToNewerQueryKey];

  const {
    mutate: rateComment,
    isLoading,
    isError,
  } = useMutation(
    async (rateAction: RateAction) => {
      return RateComment({ commentId, contentId, rateAction });
    },
    {
      onMutate: async (rateAction: RateAction) => {
        const prevCommentsDataArray: (CommentResponse | undefined)[] =
          queryKeys.map((queryKey) =>
            queryClient.getQueryData<CommentResponse>(queryKey)
          );

        queryKeys.forEach((queryKey, index) => {
          const prevCommentsData = prevCommentsDataArray[index];
          queryClient.setQueryData<CommentResponse>(queryKey, () => {
            if (prevCommentsData) {
              return {
                comments: prevCommentsData.comments.map((comment) => {
                  if (!parentId && comment.id === commentId) {
                    return getUpdatedComment(rateAction, comment);
                  }

                  if (parentId && comment.id === parentId) {
                    const replies = comment.replies.map((reply) => {
                      if (reply.id === commentId) {
                        return getUpdatedComment(rateAction, reply);
                      }
                      return reply;
                    });
                    return { ...comment, replies };
                  }

                  return comment;
                }),
              };
            }
            return { comments: [] };
          });
        });

        return prevCommentsDataArray;
      },
      onError: (
        error: Error,
        _,
        prevCommentsDataArray: (CommentResponse | undefined)[] | undefined
      ) => {
        showToast('error', 'Error', error.message);
        if (Array.isArray(prevCommentsDataArray)) {
          queryKeys.forEach((key, index) => {
            queryClient.setQueryData(key, prevCommentsDataArray[index]);
          });
        }
      },
      onSettled: () => {
        queryKeys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      },
    }
  );

  return { rateComment, isLoading, isError };
};
