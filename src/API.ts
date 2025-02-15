/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateClubInput = {
  id?: string | null;
  name: string;
};

export type ModelClubConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelClubConditionInput | null> | null;
  or?: Array<ModelClubConditionInput | null> | null;
  not?: ModelClubConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Club = {
  __typename: 'Club';
  id: string;
  name: string;
  members?: ModelUserClubConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelUserClubConnection = {
  __typename: 'ModelUserClubConnection';
  items: Array<UserClub | null>;
  nextToken?: string | null;
};

export type UserClub = {
  __typename: 'UserClub';
  id: string;
  user: User;
  club: Club;
  role: string;
  createdAt: string;
  updatedAt: string;
  userClubsId?: string | null;
  clubMembersId?: string | null;
};

export type User = {
  __typename: 'User';
  id: string;
  email: string;
  clubs?: ModelUserClubConnection | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateClubInput = {
  id: string;
  name?: string | null;
};

export type DeleteClubInput = {
  id: string;
};

export type CreateUserClubInput = {
  id?: string | null;
  role: string;
  userClubsId?: string | null;
  clubMembersId?: string | null;
};

export type ModelUserClubConditionInput = {
  role?: ModelStringInput | null;
  and?: Array<ModelUserClubConditionInput | null> | null;
  or?: Array<ModelUserClubConditionInput | null> | null;
  not?: ModelUserClubConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userClubsId?: ModelIDInput | null;
  clubMembersId?: ModelIDInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateUserClubInput = {
  id: string;
  role?: string | null;
  userClubsId?: string | null;
  clubMembersId?: string | null;
};

export type DeleteUserClubInput = {
  id: string;
};

export type CreateUserInput = {
  id?: string | null;
  email: string;
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
};

export type UpdateUserInput = {
  id: string;
  email?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type ModelClubFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelClubFilterInput | null> | null;
  or?: Array<ModelClubFilterInput | null> | null;
  not?: ModelClubFilterInput | null;
};

export type ModelClubConnection = {
  __typename: 'ModelClubConnection';
  items: Array<Club | null>;
  nextToken?: string | null;
};

export type ModelUserClubFilterInput = {
  id?: ModelIDInput | null;
  role?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelUserClubFilterInput | null> | null;
  or?: Array<ModelUserClubFilterInput | null> | null;
  not?: ModelUserClubFilterInput | null;
  userClubsId?: ModelIDInput | null;
  clubMembersId?: ModelIDInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
  owner?: ModelStringInput | null;
};

export type ModelUserConnection = {
  __typename: 'ModelUserConnection';
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionClubFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  name?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionClubFilterInput | null> | null;
  or?: Array<ModelSubscriptionClubFilterInput | null> | null;
  clubMembersId?: ModelSubscriptionIDInput | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionUserClubFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  role?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserClubFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserClubFilterInput | null> | null;
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  email?: ModelSubscriptionStringInput | null;
  createdAt?: ModelSubscriptionStringInput | null;
  updatedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUserFilterInput | null> | null;
  or?: Array<ModelSubscriptionUserFilterInput | null> | null;
  userClubsId?: ModelSubscriptionIDInput | null;
  owner?: ModelStringInput | null;
};

export type CreateClubMutationVariables = {
  input: CreateClubInput;
  condition?: ModelClubConditionInput | null;
};

export type CreateClubMutation = {
  createClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateClubMutationVariables = {
  input: UpdateClubInput;
  condition?: ModelClubConditionInput | null;
};

export type UpdateClubMutation = {
  updateClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteClubMutationVariables = {
  input: DeleteClubInput;
  condition?: ModelClubConditionInput | null;
};

export type DeleteClubMutation = {
  deleteClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateUserClubMutationVariables = {
  input: CreateUserClubInput;
  condition?: ModelUserClubConditionInput | null;
};

export type CreateUserClubMutation = {
  createUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type UpdateUserClubMutationVariables = {
  input: UpdateUserClubInput;
  condition?: ModelUserClubConditionInput | null;
};

export type UpdateUserClubMutation = {
  updateUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type DeleteUserClubMutationVariables = {
  input: DeleteUserClubInput;
  condition?: ModelUserClubConditionInput | null;
};

export type DeleteUserClubMutation = {
  deleteUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetClubQueryVariables = {
  id: string;
};

export type GetClubQuery = {
  getClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListClubsQueryVariables = {
  filter?: ModelClubFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListClubsQuery = {
  listClubs?: {
    __typename: 'ModelClubConnection';
    items: Array<{
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserClubQueryVariables = {
  id: string;
};

export type GetUserClubQuery = {
  getUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type ListUserClubsQueryVariables = {
  filter?: ModelUserClubFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserClubsQuery = {
  listUserClubs?: {
    __typename: 'ModelUserClubConnection';
    items: Array<{
      __typename: 'UserClub';
      id: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      userClubsId?: string | null;
      clubMembersId?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetClubByNameQueryVariables = {
  name: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelClubFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type GetClubByNameQuery = {
  getClubByName?: {
    __typename: 'ModelClubConnection';
    items: Array<{
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetUserByEmailQueryVariables = {
  email: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type GetUserByEmailQuery = {
  getUserByEmail?: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateClubSubscriptionVariables = {
  filter?: ModelSubscriptionClubFilterInput | null;
};

export type OnCreateClubSubscription = {
  onCreateClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateClubSubscriptionVariables = {
  filter?: ModelSubscriptionClubFilterInput | null;
};

export type OnUpdateClubSubscription = {
  onUpdateClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteClubSubscriptionVariables = {
  filter?: ModelSubscriptionClubFilterInput | null;
};

export type OnDeleteClubSubscription = {
  onDeleteClub?: {
    __typename: 'Club';
    id: string;
    name: string;
    members?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateUserClubSubscriptionVariables = {
  filter?: ModelSubscriptionUserClubFilterInput | null;
};

export type OnCreateUserClubSubscription = {
  onCreateUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type OnUpdateUserClubSubscriptionVariables = {
  filter?: ModelSubscriptionUserClubFilterInput | null;
};

export type OnUpdateUserClubSubscription = {
  onUpdateUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type OnDeleteUserClubSubscriptionVariables = {
  filter?: ModelSubscriptionUserClubFilterInput | null;
};

export type OnDeleteUserClubSubscription = {
  onDeleteUserClub?: {
    __typename: 'UserClub';
    id: string;
    user: {
      __typename: 'User';
      id: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    club: {
      __typename: 'Club';
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    role: string;
    createdAt: string;
    updatedAt: string;
    userClubsId?: string | null;
    clubMembersId?: string | null;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null;
  owner?: string | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: 'User';
    id: string;
    email: string;
    clubs?: {
      __typename: 'ModelUserClubConnection';
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};
