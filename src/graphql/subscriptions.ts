/* tslint:disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateClub =
  /* GraphQL */ `subscription OnCreateClub($filter: ModelSubscriptionClubFilterInput) {
  onCreateClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateClubSubscriptionVariables,
    APITypes.OnCreateClubSubscription
  >;
export const onUpdateClub =
  /* GraphQL */ `subscription OnUpdateClub($filter: ModelSubscriptionClubFilterInput) {
  onUpdateClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateClubSubscriptionVariables,
    APITypes.OnUpdateClubSubscription
  >;
export const onDeleteClub =
  /* GraphQL */ `subscription OnDeleteClub($filter: ModelSubscriptionClubFilterInput) {
  onDeleteClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteClubSubscriptionVariables,
    APITypes.OnDeleteClubSubscription
  >;
export const onCreateUserClub =
  /* GraphQL */ `subscription OnCreateUserClub($filter: ModelSubscriptionUserClubFilterInput) {
  onCreateUserClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateUserClubSubscriptionVariables,
    APITypes.OnCreateUserClubSubscription
  >;
export const onUpdateUserClub =
  /* GraphQL */ `subscription OnUpdateUserClub($filter: ModelSubscriptionUserClubFilterInput) {
  onUpdateUserClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserClubSubscriptionVariables,
    APITypes.OnUpdateUserClubSubscription
  >;
export const onDeleteUserClub =
  /* GraphQL */ `subscription OnDeleteUserClub($filter: ModelSubscriptionUserClubFilterInput) {
  onDeleteUserClub(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserClubSubscriptionVariables,
    APITypes.OnDeleteUserClubSubscription
  >;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
