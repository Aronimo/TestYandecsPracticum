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
            <Navbar bg="dark" variant="dark" className={style.Navbar_width_page }>
                <Container >
                    <Navbar.Brand href="#home" className={style.Navbar_flex_grow1 + ' text text_type_main-default p-2'}>
                        <BurgerIcon type={Type} /> Конструктор
                    </Navbar.Brand>
                    <Navbar.Collapse className={style.Navbar_flex_grow1 + ' text text_type_main-default p-2'}>
                        <Nav >
                            <Nav.Link href="#home">
                                <MenuIcon type={Type} onClick={onClickOrderFeed} />Лента заказов
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand href="#home" className={style.Navbar_flex_grow3 + ' text text_type_main-default p-2'} >
                        <Logo />
                    </Navbar.Brand>

                    <Navbar.Brand href="#home" className={style.Navbar_flex_grow2 + ' text text_type_main-default p-2'} >
                        <ProfileIcon type={Type} /> Личный кабинет
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}
