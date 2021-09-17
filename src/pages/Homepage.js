import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Intro from '../components/Intro'
import '../css/Homepage.css'
import Menu from '../components/Menu';
import NewsList from '../components/NewsList';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.homePage = React.createRef();
        this.navList = React.createRef();
    }

    componentDidMount() {
        let sections = this.homePage.current.querySelectorAll("section");
        let btns = this.navList.current.querySelectorAll("a");
        let header = document.querySelector(".Header");
        let currentSectionIndex = 0;

        const changeBtnColor = (check) => {
            btns.forEach((btn) => {
                btn.classList.toggle("down", check);
            })
        }

        // Reset css
        if (window.innerWidth >= 740) {
            document.body.style.overflowY = "hidden";
        } 
        
        header.classList.remove("bg-main");


        const activeNavItem = document.querySelector(".header__navigation-item.active");
        if (activeNavItem) {
            activeNavItem.classList.remove("active");
        }

        /* Scroll event */
        document.onscroll = () => {
            const introText = document.querySelector('.intro__text');
            if (introText) {
                var check = JSON.parse(document.querySelector(".header__mobile-navigation-btn").getAttribute("data-click"));
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const offsetTop1 = introText.offsetTop;
                const offsetTop2 = sections[2].offsetTop - 64;
                
                if (offsetTop2 <= scrollTop) {
                    btns[1].classList.remove('active');
                    btns[0].classList.remove('active');
                    currentSectionIndex = 2;

                    btns[2].classList.add('active');
                } 
                else if (offsetTop1 <= scrollTop) {
                    btns[0].classList.remove('active');
                    btns[2].classList.remove('active');
                    currentSectionIndex = 1;

                    btns[1].classList.add('active');
                    changeBtnColor(true);

                    header.classList.add("bg-main");
                    
                }
                else {
                    if (window.innerWidth >= 740) {
                        btns[1].classList.remove('active');
                        btns[2].classList.remove('active');
                        currentSectionIndex = 0;

                        btns[0].classList.add('active');
                        changeBtnColor(false)

                        header.classList.remove("bg-main");
                    }
                    else {
                        header.classList.toggle("bg-main", !check);
                    }
                }
            }
       }
        

        /* Homepage nav click event */
        btns.forEach((btn, index) => {
            btn.onclick = () => {
                btns[currentSectionIndex].classList.remove("active");
                sections[currentSectionIndex].classList.remove("active");

                currentSectionIndex = index;

                sections[currentSectionIndex].classList.add("active");
                btn.classList.add("active");

                if (currentSectionIndex === 0) {
                    header.classList.remove("bg-main")
                    changeBtnColor(false);
                }
                else {
                    header.classList.add("bg-main");
                    changeBtnColor(true);
                }
            }
        })

        // Smooth scroll when click navBtn
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    render() {
        return (
            <div className="Homepage relative" ref={this.homePage}>
                <section id="intro" className="active h-screen bg-body">
                    <Intro />
                </section>
                <section id="menu" className="md:h-screen md:pt-52 bg-body">
                    <Menu 
                        heading="Menu" 
                        category="-1" 
                        size="4" 
                        grid="grid-cols-2 grid-rows-2 gap-5 md:grid-cols-4 md:grid-rows-1 md:gap-6"
                    />
                </section>
                <section id="news" className="bg-body pt-10 md:pb-16">
                    <NewsList 
                        heading="Thông báo" 
                        size="4" 
                        grid="grid-cols-1 grid-rows-2 md:grid-cols-4 md:grid-rows-1"
                        showAllBtn="true"
                    />
                </section>
                <div className="homepage__scrollBar hidden md:block fixed top-1/3 bottom-1/2 right-10 z-2 h-16">
                    <ul className="homepage__nav-list" ref={this.navList}>
                        <li className="homepage__nav-item">
                            <a href="#intro" className="homepage__nav-link active">
                                <span>Giới thiệu</span>
                                <FontAwesomeIcon icon={faDotCircle}/>
                            </a>
                        </li>
                        <li className="homepage__nav-item">
                            <a href="#menu" className="homepage__nav-link seperate">
                                <span>Menu</span>
                                <FontAwesomeIcon icon={faDotCircle}/>
                            </a>
                        </li>
                        <li className="homepage__nav-item">
                            <a href="#news" className="homepage__nav-link">
                                <span>Thông báo</span>
                                <FontAwesomeIcon icon={faDotCircle}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Homepage;