/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createClub = /* GraphQL */ `mutation CreateClub(
  $input: CreateClubInput!
  $condition: ModelClubConditionInput
) {
  createClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateClubMutationVariables,
  APITypes.CreateClubMutation
>;
export const updateClub = /* GraphQL */ `mutation UpdateClub(
  $input: UpdateClubInput!
  $condition: ModelClubConditionInput
) {
  updateClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateClubMutationVariables,
  APITypes.UpdateClubMutation
>;
export const deleteClub = /* GraphQL */ `mutation DeleteClub(
  $input: DeleteClubInput!
  $condition: ModelClubConditionInput
) {
  deleteClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteClubMutationVariables,
  APITypes.DeleteClubMutation
>;
export const createUserClub = /* GraphQL */ `mutation CreateUserClub(
  $input: CreateUserClubInput!
  $condition: ModelUserClubConditionInput
) {
  createUserClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserClubMutationVariables,
  APITypes.CreateUserClubMutation
>;
export const updateUserClub = /* GraphQL */ `mutation UpdateUserClub(
  $input: UpdateUserClubInput!
  $condition: ModelUserClubConditionInput
) {
  updateUserClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserClubMutationVariables,
  APITypes.UpdateUserClubMutation
>;
export const deleteUserClub = /* GraphQL */ `mutation DeleteUserClub(
  $input: DeleteUserClubInput!
  $condition: ModelUserClubConditionInput
) {
  deleteUserClub(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserClubMutationVariables,
  APITypes.DeleteUserClubMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
