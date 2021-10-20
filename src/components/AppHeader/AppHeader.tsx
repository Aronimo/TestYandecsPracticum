// JavaScript source code
import React from 'react';
import { Logo, ProfileIcon, BurgerIcon, MenuIcon } from '../../index';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import style from './AppHeader.module.css';
import { Container } from 'react-bootstrap';

export default class AppHeader extends React.Component {
    render() {
        const Type = "primary";
        function onClickOrderFeed() { }
        return (
            <Nav className={style.NavigatorPanel}>
                <Nav.Item className={style.NavigatorItem} >
                    <section className={style.Navgationlink}> <BurgerIcon type={Type} /> <label className={style.NavgationLabel + ' text text_type_main-default'} >Конструктор</label> </section>
                    <section className={style.Navgationlink}> <MenuIcon type="secondary" /> <label className={style.NavgationLabel + ' text text_type_main-default'}>Лента заказов</label> </section>
                </Nav.Item>
                <div className={style.logo}><Logo /></div>
                <section className={style.Navgationlink + ' ' + style.Auth}> <ProfileIcon type="secondary" /> <label className={style.NavgationLabel + ' text text_type_main-default'}>Личный кабинет</label> </section>
            </Nav>
        )
    }
}
