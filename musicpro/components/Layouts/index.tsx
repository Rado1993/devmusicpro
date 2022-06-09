import React, { useState, useRef, useEffect, Fragment } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import themes from './themes';
import { Layout, LayoutContent, LayoutFooter, LayoutContainer, LayoutColumns, LayoutColumn } from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import { Toastr, ToastrRef } from '@paljs/ui/Toastr';
import { MenuItemType } from '@paljs/ui/types';
import Link from 'next/link';
//import { Link } from 'gatsby';
//import menuItems from './menuItem';
import 'bootstrap/dist/css/bootstrap.css'
import items from './menuItem';

const getDefaultTheme = (): DefaultTheme['name'] => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as DefaultTheme['name'];
  } else {
    return 'default';
  }
};
export interface LayoutProps {
  toast?: ToastProps;
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}
export interface ToastProps {
  message?: string;
  type?: string;
}

const LayoutPage: React.FC<LayoutProps> = ({ children, toast, ...rest }) => {
  const [theme, setTheme] = useState<DefaultTheme['name']>('default');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [menu, setMenu] = useState<MenuItemType[]>(items);
  const sidebarRef = useRef<SidebarRefObject>(null);
  const router = useRouter();
  const menuRef = useRef<MenuRefObject>(null);
  const msgRef = useRef<ToastrRef>(null);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {

  };

  const changeTheme = (newTheme: DefaultTheme['name']) => {
    setTheme(newTheme);
    typeof localStorage !== 'undefined' && localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (toast != undefined && toast != null) {
      console.log('toast', toast);
      msgRef.current?.add(toast.message as string, rest.title, {
        position: 'topRight',
        status: (toast.type == undefined || toast.type == null ? 'Success' : toast.type),
        duration: 2000,
        hasIcon: true,
        destroyByClick: true,
        preventDuplicates: false,
      });
    }
  }, [toast]);

  useEffect(() => {
    const localTheme = getDefaultTheme();
    if (localTheme !== theme && theme === 'default') {
      setTheme(localTheme);
    }
  }, []);

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  return (
    <Fragment>
      <ThemeProvider theme={themes(theme, dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            <Header
              dir={dir}
              changeDir={changeDir}
              theme={{ set: changeTheme, value: theme }}
              toggleSidebar={() => sidebarRef.current?.toggle()}
            />
            <LayoutContainer>
              <Toastr ref={msgRef} />
              {!authLayout && (
                <Sidebar
                  state='compacted'
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed={false}
                  responsive={false}
                  className="menu-sidebar"
                >
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menu}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                  <br /><br />
                </Sidebar>
              )}
              <LayoutContent>
                <LayoutColumns>
                  <LayoutColumn className="main-content">{children}</LayoutColumn>
                </LayoutColumns>
                {!authLayout && <LayoutFooter>Diseñada por
                  <b>MugglesTeam</b></LayoutFooter>}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default LayoutPage;
