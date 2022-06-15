import { RootState } from 'store/store';

export const getSortedPosts = (state: RootState) => state.posts.posts.sort((a, b) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }
  return 0;
});
