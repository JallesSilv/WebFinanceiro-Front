import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './components/TopBar';
import { AppFooter } from './components/Footer';
import { AppMenu } from './components/Menu';
import { Router } from './router';
//import { AppConfig } from './components/Config';

import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

import './styles/flags/flags.css';
import './styles/layout.scss';
import './App.css';
import { AppConfig } from './components/Config';
import { RequireAuth } from './contexts/Auth/RequireAuth';

function App() {

  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('light')
  const [inputStyle, setInputStyle] = useState('outlined');
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

  // active ripple effect
  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
      if (mobileMenuActive) {
          addClass(document.body, "body-overflow-hidden");
      } else {
          removeClass(document.body, "body-overflow-hidden");
      }
  }, [mobileMenuActive]);

  const onInputStyleChange = (inputStyle : any) => {
      setInputStyle(inputStyle);
  }

  const onRipple = (e: any) => {
      PrimeReact.ripple = e.value;
      setRipple(e.value)
  }

  const onLayoutModeChange = (mode : any) => {
      setLayoutMode(mode)
  }

  const onColorModeChange = (mode: any) => {
      setLayoutColorMode(mode)
  }

  const onWrapperClick = (event: any) => {
      if (!menuClick) {
          setOverlayMenuActive(false);
          setMobileMenuActive(false);
      }

      if (!mobileTopbarMenuClick) {
          setMobileTopbarMenuActive(false);
      }

      mobileTopbarMenuClick = false;
      menuClick = false;
  }

  const onToggleMenuClick = (event: any) => {
      menuClick = true;

      if (isDesktop()) {
          if (layoutMode === 'overlay') {
              if(mobileMenuActive === true) {
                  setOverlayMenuActive(true);
              }

              setOverlayMenuActive((prevState) => !prevState);
              setMobileMenuActive(false);
          }
          else if (layoutMode === 'static') {
              setStaticMenuInactive((prevState) => !prevState);
          }
      }
      else {
          setMobileMenuActive((prevState) => !prevState);
      }

      event.preventDefault();
  }

  const onSidebarClick = () => {
      menuClick = true;
  }

  const onMobileTopbarMenuClick = (event: any) => {
      mobileTopbarMenuClick = true;

      setMobileTopbarMenuActive((prevState) => !prevState);
      event.preventDefault();
  }

  const onMobileSubTopbarMenuClick = (event: any) => {
      mobileTopbarMenuClick = true;

      event.preventDefault();
  }

  const onMenuItemClick = (event: any) => {
      if (!event.item.items) {
          setOverlayMenuActive(false);
          setMobileMenuActive(false);
      }
  }
  const isDesktop = () => {
      return window.innerWidth >= 992;
  }

  const menu = [
      {
          label: '', icon: '',
          items: [
              {
                  label: 'Página Inicial', icon: 'pi pi-fw pi-home', to: '/'
              },
              {
                  label: 'Partido', icon: 'pi pi-fw pi-user-edit', to: '/partido'
              },
              {
                  label: 'Relatório', icon: 'pi pi-fw pi-file',
                  items: [
                      {label: 'Saldo', to: '/empty'},
                      {label: 'Anual', to: '/financeiro'},
                  ]
              },
          ]
      }
  ];

  const addClass = (element: any, className: any) => {
      if (element.classList)
          element.classList.add(className);
      else
          element.className += ' ' + className;
  }

  const removeClass = (element: any, className: any) => {
      if (element.classList)
          element.classList.remove(className);
      else
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  const wrapperClass = classNames('layout-wrapper', {
      'layout-overlay': layoutMode === 'overlay',
      'layout-static': layoutMode === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive,
      'p-input-filled': inputStyle === 'filled',
      'p-ripple-disabled': ripple === false,
      'layout-theme-light': layoutColorMode === 'light'
  });

  return (
      
        <RequireAuth>
            <div className={wrapperClass} onClick={onWrapperClick}>
                <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                        mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>
                
                    
                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>

                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Router />
                        </div>
                        <AppFooter layoutColorMode={layoutColorMode}/>
                    </div>
                    
                        {/* <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} /> */}
                
                    <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                        <div className="layout-mask p-component-overlay"></div>
                    </CSSTransition>
            </div>
        </RequireAuth>
    );

}

export default App;
