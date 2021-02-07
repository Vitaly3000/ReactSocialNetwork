import { usersAPI } from '../api/api';
import { UserType } from '../types/types';

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 250,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};
type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case TOGGLE_FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        }),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [state.followingInProgress.filter((id) => id !== action.userId)],
      };
    }

    default: {
      return state;
    }
  }
};

type toggleFollowActionType = {
  type: typeof TOGGLE_FOLLOW;
  userId: number;
};

export const toggleFollow = (userId: number): toggleFollowActionType => {
  return { type: TOGGLE_FOLLOW, userId };
};
type setUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): setUsersActionType => {
  return { type: SET_USERS, users };
};
type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  pageNumber: number;
};
export const setCurrentPage = (
  pageNumber: number = 1,
): setCurrentPageActionType => {
  return { type: SET_CURRENT_PAGE, pageNumber };
};
type setTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (
  totalUsersCount: number,
): setTotalUsersCountActionType => {
  return { type: SET_TOTAL_USERS_COUNT, totalUsersCount };
};
type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (
  isFetching: boolean,
): toggleIsFetchingActionType => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
type toggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number,
): toggleFollowingProgressActionType => {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};

export let follow = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await usersAPI.followUser(userId);
    dispatch(toggleFollowingProgress(false, userId));
    if (data.resultCode === 0) {
      dispatch(toggleFollow(userId));
    }
  };
};
export let unfollow = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await usersAPI.unfollowUser(userId);
    dispatch(toggleFollowingProgress(false, userId));
    if (data.resultCode === 0) {
      dispatch(toggleFollow(userId));
    }
  };
};

export let requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(currentPage));
  };
};
export default usersReducer;
