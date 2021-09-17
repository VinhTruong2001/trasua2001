import React from 'react';
import { Link } from 'react-router-dom';
import '../css/button.css'

class NotFound extends React.Component {
    componentDidMount() {
        const activeNavItem = document.querySelector(".header__navigation-item.active");
        if (activeNavItem) {
            activeNavItem.classList.remove("active");
        }

        document.querySelector(".Header").classList.add("bg-main");
        document.body.style.overflowY = "scroll";
    }

    render() {
        return (
            <div className="notfound h-screen relative">
                <div className="container px-4 md:px-12 md:mx-auto h-full flex items-center justify-between">
                    <img className='notfound__img h-1/2' src={process.env.PUBLIC_URL + '/img/notfound.png'} alt="Scarecrow"/>
                    <div className="notfound__info-wrap pl-8 text-left flex flex-col justify-between">
                        <h2 className="font-bold text-7xl">I have bad news for you</h2>
                        <div className="text-4xl my-10 ">
                            The page you are looking for might be removed or is
                            temporarily unavailable.
                        </div>
                        <div>
                            <Link to="/" className="highlight-btn p-3 hover:text-white">
                                <span className="font-bold">BACK TO HOMEPAGE</span> 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;