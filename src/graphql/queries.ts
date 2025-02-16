/* tslint:disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getClub = /* GraphQL */ `query GetClub($id: ID!) {
  getClub(id: $id) {
    id
    name
    members {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetClubQueryVariables, APITypes.GetClubQuery>;
export const listClubs = /* GraphQL */ `query ListClubs(
  $filter: ModelClubFilterInput
  $limit: Int
  $nextToken: String
) {
  listClubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListClubsQueryVariables, APITypes.ListClubsQuery>;
export const getUserClub = /* GraphQL */ `query GetUserClub($id: ID!) {
  getUserClub(id: $id) {
    id
    user {
      id
      email
      createdAt
      updatedAt
      owner
      __typename
    }
    club {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    role
    createdAt
    updatedAt
    userClubsId
    clubMembersId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserClubQueryVariables,
  APITypes.GetUserClubQuery
>;
export const listUserClubs = /* GraphQL */ `query ListUserClubs(
  $filter: ModelUserClubFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserClubs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      role
      createdAt
      updatedAt
      userClubsId
      clubMembersId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserClubsQueryVariables,
  APITypes.ListUserClubsQuery
>;
export const getClubByName = /* GraphQL */ `query GetClubByName(
  $name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelClubFilterInput
  $limit: Int
  $nextToken: String
) {
  getClubByName(
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClubByNameQueryVariables,
  APITypes.GetClubByNameQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    clubs {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getUserByEmail = /* GraphQL */ `query GetUserByEmail(
  $email: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserByEmailQueryVariables,
  APITypes.GetUserByEmailQuery
>;
