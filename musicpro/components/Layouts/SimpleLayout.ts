import { createGlobalStyle, css } from 'styled-components';
import GlobalStyle from '@paljs/ui/GlobalStyle';
import { breakpointDown } from '@paljs/ui/breakpoints';

const SimpleLayout = createGlobalStyle`
${({ theme }) => css`
  ${GlobalStyle}
  html {
    font-size: 16px;
  }
  .column.small {
    flex: 0.15 !important;
  }

  .auth-layout {
    .main-content {
      padding: 1rem 0.5rem;
      ${breakpointDown('sm')`
        padding: 0;
      `}
    }
  }

  .menu-sidebar.compacted {
   
  }

  aside.settings-sidebar {
    transition: transform 0.3s ease;
    width: 19rem;
    overflow: hidden;
    transform: translateX(${theme.dir === 'rtl' && '-'}100%);
    &.start {
      transform: translateX(${theme.dir === 'ltr' && '-'}100%);
    }

    &.expanded,
    &.expanded.start {
      transform: translateX(0);
    }

    .scrollable {
      width: 19rem;
      padding: 3.4rem 0.25rem;
    }

    .main-container {
      width: 19rem;
      transition: width 0.3s ease;
      overflow: hidden;

      .scrollable {
        width: 19rem;
      }
    }
  }

  ${breakpointDown('xs')`
    .main-content {
        padding: 0.75rem 0 !important;
      }
    .main-page {
        padding: .25rem !important;
    }
  `}

  .with-margin {
    margin: 0 0.75rem 2rem 0;
  }
  .inline-block {
    display: inline-block;
  }
  .popover-card {
    margin-bottom: 0;
    width: 300px;
    box-shadow: none;
  }
  .btn {
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 500;
    border: 2px solid transparent;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  .ck-content {
    min-height: 20rem;
  }
  .tab-content{
    padding: 0 !important;
  }
  .action-btn {
    cursor: pointer;
    border: 1px solid lightgrey;
    margin: -5px 5px;
    padding: 4px 6px;
    border-radius: 25%;
  }

  .MuiToolbar-gutters {
    padding-left: 0 !important;
  }
  .paneles {
    align-items: stretch;
    display: flex;
  }
  .paneles .cuerpo {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .tox-statusbar__branding{
    display:none;
  }
  .TableToolbar-highlight-6 .MuiTypography-h6 {
    font-size: 1rem;
    padding-left: 1rem;
  }
  .modal-body thead, .modal-body tbody {
    display: block;
  }
  .modal-body tbody {
    height: 325px;
    overflow-y: scroll;
  }
  ${breakpointDown('xs')`
    .MuiToolbar-root {
      flex-direction: column;
    }
    .MuiToolbar-root>div {
      margin-top: 1rem;
    }
  `}

  .cms-design {
    font-size: 0.8rem;
    padding: 0.5rem 0;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;

    textarea, input {
      font-size: 1em !important;
      font-weight: normal !important;
      padding: 0 1em !important;
    }

    input[type=checkbox]{
      appearance: auto;
      width: auto;
      transform: scale(1.3);
      z-index: 9;
      align-self: flex-start;
      position: relative;
      top: 17px;
      left: 30px;
    }
    input[type=checkbox]:not(:checked) + fieldset {
      opacity: 0.6;
      border-style: dashed;
      padding: 15px 0.5rem 0.5rem;
    }
    input[type=checkbox]:not(:checked) + fieldset fieldset, 
    input[type=checkbox]:not(:checked) + fieldset div, 
    input[type=checkbox]:not(:checked) + fieldset button,
    input[type=checkbox]:not(:checked) + fieldset input
    {
      display: none !important;
    }
    input[type=checkbox] + fieldset>legend{
      padding: 0 10px 0 35px;
    }
    .delete-section {
      width: fit-content;
      border: none;
      background: white;
      align-self: flex-end;
      position: relative;
      top: 40px;
    }
    .add-section {
      border-style: dashed;
      border-radius: 10px;
      text-align: center;
      margin: 1em 0.5rem 0;
      width: calc(100% - 1rem);
      font-weight: bold;
      padding: 0;
      background: white;
      padding-top: 3px;
    }
    .add-section:hover {
      background: rgba(0,214,143,0.08);
    }
    .add-item {
      padding: 0 1rem 0 0;
      border-style: dashed;
    }

    fieldset {
      border: 1px solid grey;
      padding: 0 0.5rem 0.5rem;
      margin: 0 0.5rem 0.5rem;
      border-radius: 10px;
      clear: both;
      display: flex;
      flex-direction: column;
      flex: 1;

      legend {
        font-size: 1em;
        float: none;
        width: auto;
        padding: 0 10px;
        font-weight: bold;
      }
    }
    fieldset.panels{
      flex-direction: row;
    }
  } 
  
  .cms-design fieldset.panels-left, .cms-design fieldset.panels-right{
    border-color: cadetblue;
  }
  .cms-design fieldset.tabs-tab{
    border-color: darkgoldenrod;
  }
  .cms-design fieldset.boxes-box{
    border-color: indianred;
  }

  .headerTitulo{
    background-image:url("/img/banner-nosotros.jpg");
    background-position: center center; 
    background-size: 100% 100%; 
  }

  .user-name{
    color: white !important;
  }

  .user-title{
    color:white !important;
  }

  .colorTitulo{
    fontWeight: 'bold';
    textAlign: 'center';
    color: 'white';
    background: #008500;
  }
  
  .designAcordeonTest > div > div{
    border: solid 1px;
    border-color: #0095ff;
  }

  .designAcordeon > div > header{
    border: solid 1px !important;
    border-color: #0095ff !important;
    background: aliceblue;
  }

  .designAcordeon > form > div > header{
    border: solid 1px !important;
    border-color: #0095ff !important;
    background: aliceblue;
  }

  .designAcordeonFenix > div > header{
    border: solid 1px !important;
    border-color: darkred !important;
    background: #ffd1d1;
  }

  
  .designAcordeonFenix2 > div > header{
    border: solid 1px !important;
    border-color: #E7652E !important;
    background: #faddd1;
  }

  .designAcordeonLimitacion > div > header{
    border: solid 1px !important;
    border-color: #67AA26 !important;
    background: #e6f6d5;
  }
  


  .btn-flotante {
    font-size: 16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #66bfff; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    display: flex;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
  .btn-flotante:hover {
    background-color: #2c2fa5; /* Color de fondo al pasar el cursor */
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-7px);
  }
  @media only screen and (max-width: 600px) {
     .btn-flotante {
      font-size: 14px;
      padding: 12px 20px;
      bottom: 20px;
      right: 20px;
    }
  } 

  .btn-flotante-fnx {
    font-size: 16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #E7652E; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    display: flex;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

  .btn-flotante-fnx2 {
    font-size: 16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #f09a75; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    display: flex;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

  
  .btn-flotante-ltm {
    font-size: 16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #b4e481; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    display: flex;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

  .btn-flotante:hover {
    background-color: #2c2fa5; /* Color de fondo al pasar el cursor */
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-7px);
  }
  @media only screen and (max-width: 600px) {
     .btn-flotante {
      font-size: 14px;
      padding: 12px 20px;
      bottom: 20px;
      right: 20px;
    }
  } 

  .designAcordeon > div > div > div {
    overflow: visible !important;
  }
  
  * {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  ::-webkit-scrollbar{
      width:10px;
      background:#FFFFFF;
  }
  ::-webkit-scrollbar-thumb{
      border-radius:10px;
      background:#F9F9F9;
  }

  .botonesPoper{
    display: grid;
    background: #0095ff;
  }

  .botonesPoper > button {
    background: white;
    border-color: #0095ff !important;
    color: grey;
  }

  .botonesPoper > button:hover {
    background: #c3e5fd;
  }

`}
`;

export default SimpleLayout;
