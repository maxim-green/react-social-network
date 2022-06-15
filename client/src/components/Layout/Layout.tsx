import React from 'react';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'components/Layout/Header/Header';
import { Card } from 'components/_shared/Card/Card';
import { LoginFormContainer } from 'components/_forms/LoginForm';
import { SidebarNavigation } from 'components/Layout/SideBar/SidebarNavigation/SidebarNavigation';
import { SidebarSubscriptions }
  from 'components/Layout/SideBar/SidebarSubscriptions/SidebarSubscriptions';
import { AvatarType, UserItemDataType } from 'types/types';
import { logout } from 'store/reducers/auth.reducer';
import { BottomNavigation } from 'components/Layout/BottomNavigation/BottomNavigation';
import { useBreakpoint } from 'hooks/useBreakpoint';
import classes from './Layout.module.scss';

type PropsType = {
    sidebar?: boolean
    background?: boolean
    authUserName?: string
    authUserAvatar?: AvatarType
    subscriptions: Array<UserItemDataType>
    onLogout: () => void
}

const Container: React.FC = ({ children }) => (
  <div className={classes.container}>
    {children}
  </div>
);

const AppBar: React.FC = ({ children }) => (
  <div className={classes.appBar}>
    <Container>
      {children}
    </Container>
  </div>
);

const Main: React.FC = ({ children }) => (
  <Container>
    <div className={classes.main}>
      {children}
    </div>
  </Container>
);

const Content: React.FC = ({ children }) => (
  <div className={classes.content}>
    {children}
  </div>
);

const Sidebar: React.FC = ({ children }) => (
  <div className={classes.sidebar}>
    {children}
  </div>
);

const Layout: React.FC<PropsType> = ({
  children,
  sidebar = false,
  background = false,
  subscriptions,
  authUserName,
  authUserAvatar,
  onLogout,
}) => {
  const authorized = useSelector((state: RootState) => state.auth.authorized);
  const { tablet } = useBreakpoint();
  return (
    <div className={classes.layout}>
      <AppBar>
        <Header
          authorized={authorized}
          username={authUserName}
          avatar={authUserAvatar?.small}
          logout={onLogout}
        />
      </AppBar>

      <Main>
        {sidebar && !tablet && (
        <Sidebar>
          {!authorized && (
          <Card>
            <div style={{ padding: '10px' }}><LoginFormContainer /></div>
          </Card>
          )}
          {authorized && <SidebarNavigation />}
          {authorized && !tablet && <SidebarSubscriptions subscriptions={subscriptions} />}
        </Sidebar>
        )}

        <Content>
          {children}
        </Content>
      </Main>

      {tablet && authUserAvatar && (
      <BottomNavigation
        avatar={authUserAvatar?.small}
        authorized={authorized}
      />
      )}
      {tablet && !authUserAvatar && <BottomNavigation authorized={authorized} />}

      {background && (
      <div className={classes.background}>
        <img src="https://source.unsplash.com/random/1920x1080/?nature" alt="" />
      </div>
      )}
    </div>
  );
};

export const LayoutContainer: React.FC<{
  sidebar?: boolean,
  background?: boolean
}> = ({
  sidebar,
  background,
}) => {
  const dispatch = useDispatch();
  const authUserSubscriptions = useSelector(
    (state: RootState) => state.auth.user?.subscriptions || [],
  );
  const authUserName = useSelector((state: RootState) => state.auth.user?.username);
  const authUserAvatar = useSelector((state: RootState) => state.auth.user?.avatar);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout
      sidebar={sidebar}
      background={background}
      subscriptions={authUserSubscriptions}
      authUserName={authUserName}
      authUserAvatar={authUserAvatar}
      onLogout={onLogout}
    />
  );
};
