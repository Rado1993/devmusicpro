import React, { useState, useRef, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { DefaultTheme } from 'styled-components';
import { LayoutHeader } from '@paljs/ui/Layout';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import User from '@paljs/ui/User';
import { breakpointDown } from '@paljs/ui/breakpoints';
import Image from 'next/image';


import 'bootstrap/dist/css/bootstrap.css';



const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
  dir: 'rtl' | 'ltr';
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [Roles, setRoles] = useState<any>(null);
  const [show, setShow] = useState(false)
  const [centralesRol, setcentralesRol] = useState<any>(null);




  useEffect(() => {
   
    setUser(JSON.parse(sessionStorage.getItem('User')))
    //setRoles(JSON.parse(sessionStorage.getItem('Roles'))?.map((obj: any) => ({ title: obj.name, link: { href: '' } })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRoles(JSON.parse(sessionStorage.getItem('Roles'))?.map((obj: any) => ({ id: obj.id_rol, label: obj.name, value: obj.id_rol })))




  }, []);

  const onClose = () => {
    setShow(false)
  }

  const View = () => {
    setShow(true)
  }


  return (
    <LayoutHeader fixed className="headerTitulo">
      <div className='sigo-main-header'>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            /*{
              content: (
                <Link href="/" passHref>
                  <div style={{ display: 'flex', cursor: 'pointer' }}>
                    <Image src="/img/logo.png" alt="Colbun Logo" width={120} height={40} />
                    &nbsp;&nbsp;
                  </div>
                </Link>
              ),
            }*/
          ]}
        />
        {/*<Actions
          size="Medium"
          actions={[
            {
              content: (
                <Link href="/" passHref>
                  <div style={{ display: 'flex' }}>
                    <a style={{ color: '#ffffff', fontSize: '200%' }} className="logo">SISTEMA INTEGRADO DE LA GESTIÓN OPERACIONAL</a>
                  </div>
                </Link>
              ),
            }
          ]}
        />
         <Actions
          size="Small"
          className="right"
          actions={[

            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Perfil', link: { href: '/modal-overlays/tooltip' } },
                    { title: 'Cerrar Sesión', link: { href: '/auth/logout' } },
                  ]}
                  Link={Link}
                >
                  <User color='white' name={user ? user.name : 'Invitado'} title={'Administrador'} size="Medium" />
                </ContextMenu>
              ),
            },
          ]}
        /> */}

      </div >
    </LayoutHeader >
  );
};
export default Header;


