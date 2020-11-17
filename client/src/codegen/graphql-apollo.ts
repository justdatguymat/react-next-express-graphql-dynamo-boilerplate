import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getPost: Post;
  listPosts: Array<Post>;
  getUserPosts: Array<Post>;
  getUser: User;
  listUsers: Array<User>;
  myself: User;
};


export type QueryGetPostArgs = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};


export type QueryGetUserPostsArgs = {
  lastKey?: Maybe<PostInput>;
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  range: Scalars['ID'];
  data: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  content: Scalars['String'];
  author: User;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  range: Scalars['String'];
  data: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  posts: Array<Post>;
};

export type PostInput = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['ID']>;
  data?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost: Post;
  deletePost: Post;
  createUser: User;
  updateUser: User;
  deleteUser: User;
  register: User;
  login: User;
  logout: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  input: PostInput;
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationUpdateUserArgs = {
  input: UserInput;
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['ID']>;
  data?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'range' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName'>
);

export type PostFragmentFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'range' | 'data' | 'createdAt' | 'updatedAt' | 'title' | 'content'>
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateUserMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'Post' }
    & PostFragmentFragment
  ) }
);

export type MyselfQueryVariables = Exact<{ [key: string]: never; }>;


export type MyselfQuery = (
  { __typename?: 'Query' }
  & { myself: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type ListPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPostsQuery = (
  { __typename?: 'Query' }
  & { listPosts: Array<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = (
  { __typename?: 'Query' }
  & { listUsers: Array<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type GetPostQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & { author: (
      { __typename?: 'User' }
      & UserFragmentFragment
    ) }
    & PostFragmentFragment
  ) }
);

export type GetUserQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
);

export type GetUserPostsQueryVariables = Exact<{
  userId: Scalars['String'];
  lastKey?: Maybe<PostInput>;
}>;


export type GetUserPostsQuery = (
  { __typename?: 'Query' }
  & { getUserPosts: Array<(
    { __typename?: 'Post' }
    & { author: (
      { __typename?: 'User' }
      & UserFragmentFragment
    ) }
    & PostFragmentFragment
  )> }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  range
  createdAt
  updatedAt
  firstName
  lastName
}
    `;
export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  id
  range
  data
  createdAt
  updatedAt
  title
  content
}
    `;
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID, $range: String, $data: String, $firstName: String, $lastName: String) {
  updateUser(
    id: $id
    range: $range
    data: $data
    input: {firstName: $firstName, lastName: $lastName}
  ) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      range: // value for 'range'
 *      data: // value for 'data'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!) {
  createPost(input: {title: $title, content: $content}) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: ID, $range: String, $data: String, $title: String, $content: String) {
  updatePost(
    id: $id
    range: $range
    data: $data
    input: {title: $title, content: $content}
  ) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      range: // value for 'range'
 *      data: // value for 'data'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID, $range: String, $data: String) {
  deletePost(id: $id, range: $range, data: $data) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      range: // value for 'range'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const MyselfDocument = gql`
    query Myself {
  myself {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMyselfQuery__
 *
 * To run a query within a React component, call `useMyselfQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyselfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyselfQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyselfQuery(baseOptions?: Apollo.QueryHookOptions<MyselfQuery, MyselfQueryVariables>) {
        return Apollo.useQuery<MyselfQuery, MyselfQueryVariables>(MyselfDocument, baseOptions);
      }
export function useMyselfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyselfQuery, MyselfQueryVariables>) {
          return Apollo.useLazyQuery<MyselfQuery, MyselfQueryVariables>(MyselfDocument, baseOptions);
        }
export type MyselfQueryHookResult = ReturnType<typeof useMyselfQuery>;
export type MyselfLazyQueryHookResult = ReturnType<typeof useMyselfLazyQuery>;
export type MyselfQueryResult = Apollo.QueryResult<MyselfQuery, MyselfQueryVariables>;
export const ListPostsDocument = gql`
    query listPosts {
  listPosts {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

/**
 * __useListPostsQuery__
 *
 * To run a query within a React component, call `useListPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPostsQuery(baseOptions?: Apollo.QueryHookOptions<ListPostsQuery, ListPostsQueryVariables>) {
        return Apollo.useQuery<ListPostsQuery, ListPostsQueryVariables>(ListPostsDocument, baseOptions);
      }
export function useListPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPostsQuery, ListPostsQueryVariables>) {
          return Apollo.useLazyQuery<ListPostsQuery, ListPostsQueryVariables>(ListPostsDocument, baseOptions);
        }
export type ListPostsQueryHookResult = ReturnType<typeof useListPostsQuery>;
export type ListPostsLazyQueryHookResult = ReturnType<typeof useListPostsLazyQuery>;
export type ListPostsQueryResult = Apollo.QueryResult<ListPostsQuery, ListPostsQueryVariables>;
export const ListUsersDocument = gql`
    query listUsers {
  listUsers {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const GetPostDocument = gql`
    query getPost($id: ID, $range: String, $data: String) {
  getPost(id: $id, range: $range, data: $data) {
    ...PostFragment
    author {
      ...UserFragment
    }
  }
}
    ${PostFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *      range: // value for 'range'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions?: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, baseOptions);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID, $range: String, $data: String) {
  getUser(id: $id, range: $range, data: $data) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      range: // value for 'range'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserPostsDocument = gql`
    query getUserPosts($userId: String!, $lastKey: PostInput) {
  getUserPosts(userId: $userId, lastKey: $lastKey) {
    ...PostFragment
    author {
      ...UserFragment
    }
  }
}
    ${PostFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      lastKey: // value for 'lastKey'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
        return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, baseOptions);
      }
export function useGetUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, baseOptions);
        }
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsQueryResult = Apollo.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;