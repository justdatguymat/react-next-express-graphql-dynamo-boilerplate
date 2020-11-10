import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
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
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!) {
  createPost(input: {title: $title, content: $content}) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
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
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID, $range: String, $data: String) {
  deletePost(id: $id, range: $range, data: $data) {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export const MyselfDocument = gql`
    query Myself {
  myself {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const ListPostsDocument = gql`
    query listPosts {
  listPosts {
    ...PostFragment
  }
}
    ${PostFragmentFragmentDoc}`;
export const ListUsersDocument = gql`
    query listUsers {
  listUsers {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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
export const GetUserDocument = gql`
    query getUser($id: ID, $range: String, $data: String) {
  getUser(id: $id, range: $range, data: $data) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Register(variables: RegisterMutationVariables): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(print(RegisterDocument), variables));
    },
    Login(variables: LoginMutationVariables): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables));
    },
    Logout(variables?: LogoutMutationVariables): Promise<LogoutMutation> {
      return withWrapper(() => client.request<LogoutMutation>(print(LogoutDocument), variables));
    },
    UpdateUser(variables?: UpdateUserMutationVariables): Promise<UpdateUserMutation> {
      return withWrapper(() => client.request<UpdateUserMutation>(print(UpdateUserDocument), variables));
    },
    CreatePost(variables: CreatePostMutationVariables): Promise<CreatePostMutation> {
      return withWrapper(() => client.request<CreatePostMutation>(print(CreatePostDocument), variables));
    },
    UpdatePost(variables?: UpdatePostMutationVariables): Promise<UpdatePostMutation> {
      return withWrapper(() => client.request<UpdatePostMutation>(print(UpdatePostDocument), variables));
    },
    DeletePost(variables?: DeletePostMutationVariables): Promise<DeletePostMutation> {
      return withWrapper(() => client.request<DeletePostMutation>(print(DeletePostDocument), variables));
    },
    Myself(variables?: MyselfQueryVariables): Promise<MyselfQuery> {
      return withWrapper(() => client.request<MyselfQuery>(print(MyselfDocument), variables));
    },
    listPosts(variables?: ListPostsQueryVariables): Promise<ListPostsQuery> {
      return withWrapper(() => client.request<ListPostsQuery>(print(ListPostsDocument), variables));
    },
    listUsers(variables?: ListUsersQueryVariables): Promise<ListUsersQuery> {
      return withWrapper(() => client.request<ListUsersQuery>(print(ListUsersDocument), variables));
    },
    getPost(variables?: GetPostQueryVariables): Promise<GetPostQuery> {
      return withWrapper(() => client.request<GetPostQuery>(print(GetPostDocument), variables));
    },
    getUser(variables?: GetUserQueryVariables): Promise<GetUserQuery> {
      return withWrapper(() => client.request<GetUserQuery>(print(GetUserDocument), variables));
    },
    getUserPosts(variables: GetUserPostsQueryVariables): Promise<GetUserPostsQuery> {
      return withWrapper(() => client.request<GetUserPostsQuery>(print(GetUserPostsDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;