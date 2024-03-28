import { ContentType } from 'types/contentType';
import { Comment } from 'types/comments';

import request from 'utils/fetchUtils';

import {
  AddCommentGraphQLMutation,
  MutationAddCommentParams,
  MutationAddCommentResponse,
  CommentRequestModelInput,
} from './queries/comments/createCommentMutation';
import {
  DeleteCommentGraphQLMutation,
  MutationDeleteCommentParams,
  MutationDeleteCommentResponse,
} from './queries/comments/deleteCommentMutation';
import {
  CommentByIdGraphQLQuery,
  QueryCommentByIdParams,
  QueryCommentByIdResponse,
} from './queries/comments/fetchCommentById';
import {
  CommentsGraphQLQuery,
  QueryCommentsParams,
  QueryCommentsResponse,
  SortEnumType,
} from './queries/comments/fetchComments';
import {
  MutationUpdateCommentParams,
  MutationUpdateCommentResponse,
  UpdateCommentGraphQLMutation,
} from './queries/comments/updateCommentMutation';

//#region TS
export type CommentsApiResponse = Comment[];

interface FetchCommentsArgs {
  order?: SortEnumType;
  skip?: number;
  limit?: number;
}

interface CreateCommentArgs {
  commentData: string;
  commentTitle: string;
}

export interface ContentDataArgs {
  contentType: ContentType | null;
  contentItemId: string | null;
}

interface UpdateCommentArgs {
  commentId: string;
  updateFields: CommentRequestModelInput;
}

interface DeleteCommentArgs {
  commentId: string;
}
//#endregion

const DEFAULT_ORDER = SortEnumType.DESC;
const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 30;

const endpoint = process.env.NEXT_PUBLIC_API_URL;

export const fetchComments = async ({
  order = DEFAULT_ORDER,
  skip = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
}: FetchCommentsArgs) => {
  try {
    if (!endpoint) {
      throw new Error('The environemnt variable for GRAPH_API_URL is not set');
    }

    const commentsQueryArguments: QueryCommentsParams = {
      order: [
        {
          updatedTimestamp: order,
        },
      ],
      skip,
      take: limit,
    };

    const fetchCommentsApiResponse: QueryCommentsResponse = await request({
      url: endpoint,
      query: CommentsGraphQLQuery,
      variables: commentsQueryArguments,
    });

    return {
      comments: fetchCommentsApiResponse.data?.allUserComments?.items,
      pageInfo: fetchCommentsApiResponse.data?.allUserComments?.pageInfo,
    };
  } catch (error) {
    const errorMessage = `Error fetching comments: ${error}`;
    throw new Error(errorMessage);
  }
};

export const fetchCommentById = async (id: string) => {
  try {
    if (!endpoint) {
      throw new Error('The environemnt variable for GRAPH_API_URL is not set');
    }

    const commentsQueryArguments: QueryCommentByIdParams = {
      id,
    };

    const fetchCommentByIdApiResponse: QueryCommentByIdResponse = await request(
      {
        url: endpoint,
        query: CommentByIdGraphQLQuery,
        variables: commentsQueryArguments,
      }
    );

    return {
      comment: fetchCommentByIdApiResponse.data?.commentById,
    };
  } catch (error) {
    const errorMessage = `Error fetching comments: ${error}`;
    throw new Error(errorMessage);
  }
};

export const createComment = async (
  { commentData, commentTitle }: CreateCommentArgs,
  contentData?: ContentDataArgs
) => {
  try {
    if (!endpoint) {
      throw new Error('The environemnt variable for GRAPH_API_URL is not set');
    }

    const addCommentArguments: MutationAddCommentParams = {
      commentData,
      commentTitle,
      contentItemId: contentData?.contentItemId,
      contentType: contentData?.contentType,
    };

    const fetchCommentsApiResponse: MutationAddCommentResponse = await request({
      url: endpoint,
      query: AddCommentGraphQLMutation,
      variables: addCommentArguments,
    });

    const comment = fetchCommentsApiResponse.data?.addComment?.comment;

    return {
      comment,
    };
  } catch (error) {
    const errorMessage = `Error creating comment: ${error}`;
    throw new Error(errorMessage);
  }
};

export const updateComment = async ({
  commentId,
  updateFields,
}: UpdateCommentArgs) => {
  try {
    if (!endpoint) {
      throw new Error('The environemnt variable for GRAPH_API_URL is not set');
    }

    const updateCommentArguments: MutationUpdateCommentParams = {
      commentId: commentId,
      commentInput: {
        commentData: updateFields.commentData,
        commentTitle: updateFields.commentTitle,
      },
    };

    const updateCommentApiResponse: MutationUpdateCommentResponse =
      await request({
        url: endpoint,
        query: UpdateCommentGraphQLMutation,
        variables: updateCommentArguments,
      });

    const comment = updateCommentApiResponse.data?.updateComment?.comment;

    return {
      comment,
    };
  } catch (error) {
    const errorMessage = `${error}`;
    throw error;
  }
};

export const deleteComment = async ({ commentId }: DeleteCommentArgs) => {
  try {
    if (!endpoint) {
      throw new Error('The environemnt variable for GRAPH_API_URL is not set');
    }

    const CommentDeleteArguments: MutationDeleteCommentParams = { commentId };

    const deleteCommentApiResponse: MutationDeleteCommentResponse =
      await request({
        url: endpoint,
        query: DeleteCommentGraphQLMutation,
        variables: CommentDeleteArguments,
      });

    const comment = deleteCommentApiResponse.data?.deleteComment;

    return {
      comment,
    };
  } catch (error) {
    const errorMessage = `Error deleting comment: ${error}`;
    throw new Error(errorMessage);
  }
};
