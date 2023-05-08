import { ActionContext } from 'vuex'

// Store types
export type MenuNavigation = [{ name: string; title: string; permission: string }];
export type Role = {
  id: number;
  name: string;
  role: string;
  routesPermission: string[];
  actions: string[];
};
export type User = {
  id: number;
  name: string;
  email: string;
  hasAuthorization: boolean;
  role: Role;
  menuNavigation: MenuNavigation;
};
export interface State {
  user: User;
}
// Mutations types
export enum MutationsTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export type Mutations<S = State> = {
   [MutationsTypes.SET_CURRENT_USER](state: S, user: User): void
}

// Actions types
export enum ActionTypes {
    getMe = 'GET_ME',
    clearUser = 'CLEAR_USER',
    login = 'LOGIN',
}

export type SetCurrentUserCommitActionContext = {
    commit<k extends keyof Mutations>(
      key: k,
      user: Parameters<Mutations[k]>
    ):ReturnType<Mutations[k]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionTypes.getMe]({ commit }: SetCurrentUserCommitActionContext): Promise<void>
}

// Getters types
export type Getters = {
    hasRoutePermission(permission: string): boolean,
    hasAction(action: string): boolean,
    hasUserData(): boolean,
    user(): User
}
