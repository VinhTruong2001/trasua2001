import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.closeMobileMenu = this.closeMobileMenu.bind();
    }

    displayMobileMenu(e) {
        const scrollTop = document.documentElement.scrollTop || window.scrollY;
        const check = !JSON.parse(e.getAttribute("data-click"));
        e.setAttribute("data-click", check);
        const navList = document.querySelector(".header__navigation-list-wrap");
        const header = document.querySelector(".Header");
        navList.classList.toggle("on-mobile", check);
        navList.classList.toggle("bg-main", check);

        if (scrollTop === 0) {
            header.classList.toggle("bg-main", check);
        }
        else {
            header.classList.toggle("bg-main", true);
        }
    }

    closeMobileMenu() {
        const navList = document.querySelector(".header__navigation-list-wrap");
        if (navList) {
            setTimeout(() => {
                navList.classList.remove("on-mobile");
                navList.setAttribute("data-click", false);
            }, 1000);
        }
    }

    render() {
        return (
            <div className="Header h-16 cursor-default fixed top-0 left-0 right-0 z-30"> 
                <div className="container px-4 md:px-12 md:mx-auto flex items-center h-full relative z-3 bg-transparent">
                    <div className="header__brand-name flex-1 text-left h-full py-2">
                        <Link to="/" className="header__homePage-link italic flex items-center text-logo hover:text-logo text-3xl font-bold no-underline pr-5 w-64">
                            <img className="header__logo h-12 mr-2" src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo"></img>
                            TRÀ SỮA 2001
                        </Link>
                    </div>
                    <div className="header__mobile-navigation-btn px-2 py-3 md:hidden" 
                            onClick={ (e) => this.displayMobileMenu(e.target) }
                            data-click={ window.innerWidth < 740 ? false : true}
                    >
                        <FontAwesomeIcon icon={faBars} className="md:hidden text-white text-3xl"/>
                    </div>
                    <div className="header__navigation-list-wrap opacity-0 transform scale-y-0 absolute top-16 right-0 bottom-55 left-0 md:scale-y-100 md:static md:top-0 md:h-full md:opacity-100">
                        <ul className="header__navigation-list p-0 m-0 flex flex-col justify-between md:flex-row md:h-full">
                            <li className="header__navigation-item md:h-full cursor-pointer">
                                <Link 
                                    to="/order" 
                                    onClick={ () => this.closeMobileMenu() } 
                                    className="header__navigation-link py-3 md:text-2xl no-underline block w-full h-full md:px-5 md:py-5"
                                >
                                    ĐẶT HÀNG
                                </Link>
                            </li>
                            <li className="header__navigation-item md:h-full cursor-pointer">
                                <Link 
                                    to="/promotion" 
                                    onClick={ () => this.closeMobileMenu() } 
                                    className="header__navigation-link py-3 md:text-2xl no-underline block w-full h-full md:px-5 md:py-5"
                                >
                                    ƯU ĐÃI
                                </Link>
                            </li>
                            <li className="header__navigation-item md:h-full cursor-pointer">
                                <Link 
                                    to="/news" 
                                    onClick={ () => this.closeMobileMenu() } 
                                    className="header__navigation-link py-3 md:text-2xl no-underline block w-full h-full md:px-5 md:py-5"
                                >
                                    THÔNG BÁO
                                </Link>
                            </li>
                            <li className="header__navigation-item md:h-full cursor-pointer">
                                <Link 
                                    to="/about" 
                                    onClick={ () => this.closeMobileMenu() } 
                                    className="header__navigation-link py-3 md:text-2xl no-underline block w-full h-full md:px-5 md:py-5"
                                    >
                                    ABOUT
                                </Link>
                            </li>
                            <li className="header__navigation-item md:h-full cursor-pointer">
                                <Link 
                                    to="/contact" 
                                    onClick={ () => this.closeMobileMenu() } 
                                    className="header__navigation-link py-3 md:text-2xl no-underline block w-full h-full md:px-5 md:py-5"
                                >
                                    LIÊN HỆ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;