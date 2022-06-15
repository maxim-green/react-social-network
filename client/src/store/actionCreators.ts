import { usersActions } from 'store/reducers/users.reducer';
import { profileActions } from 'store/reducers/profile.reducer';
import { postsActions } from 'store/reducers/posts.reducer';
import { dialogsActions } from 'store/reducers/dialogs.reducer';
import { authActions } from 'store/reducers/auth.reducer';
import { appActions } from 'store/reducers/app.reducer';

const actionCreators = {
  ...usersActions,
  ...profileActions,
  ...postsActions,
  ...dialogsActions,
  ...authActions,
  ...appActions,
};

export default actionCreators;
