import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  user?: Maybe<Scalars['String']>;
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
};


export type PostInput = {
  id?: Maybe<Scalars['ID']>;
  range?: Maybe<Scalars['ID']>;
  data?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  range: Scalars['ID'];
  data: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
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

export type PostFragmentFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'range' | 'data' | 'title' | 'content' | 'createdAt' | 'updatedAt'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'range' | 'data' | 'firstName' | 'lastName'>
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

export type MyselfQueryVariables = Exact<{ [key: string]: never; }>;


export type MyselfQuery = (
  { __typename?: 'Query' }
  & { myself: (
    { __typename?: 'User' }
    & UserFragmentFragment
  ) }
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
    & PostFragmentFragment
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
  user: Scalars['String'];
  lastKey?: Maybe<PostInput>;
}>;


export type GetUserPostsQuery = (
  { __typename?: 'Query' }
  & { getUserPosts: Array<(
    { __typename?: 'Post' }
    & PostFragmentFragment
  )> }
);

export const PostFragmentFragmentDoc = gql`
    fragment PostFragment on Post {
  id
  range
  data
  title
  content
  createdAt
  updatedAt
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  range
  data
  firstName
  lastName
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!) {
  createPost(input: {title: $title, content: $content}) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(
    input: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MyselfDocument = gql`
    query Myself {
  myself {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMyselfQuery(options: Omit<Urql.UseQueryArgs<MyselfQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyselfQuery>({ query: MyselfDocument, ...options });
};
export const GetPostDocument = gql`
    query getPost($id: ID, $range: String, $data: String) {
  getPost(id: $id, range: $range, data: $data) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const ListPostsDocument = gql`
    query listPosts {
  listPosts {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

export function useListPostsQuery(options: Omit<Urql.UseQueryArgs<ListPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListPostsQuery>({ query: ListPostsDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($id: ID, $range: String, $data: String) {
  getUser(id: $id, range: $range, data: $data) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const GetUserPostsDocument = gql`
    query getUserPosts($user: String!, $lastKey: PostInput) {
  getUserPosts(user: $user, lastKey: $lastKey) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;

export function useGetUserPostsQuery(options: Omit<Urql.UseQueryArgs<GetUserPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserPostsQuery>({ query: GetUserPostsDocument, ...options });
};