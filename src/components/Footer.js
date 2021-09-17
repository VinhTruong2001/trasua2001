import React from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {

    render() {
        return (
            <div className="Footer bg-main h-full md:h-60">
                <div className="container px-4 pb-10 md:px-12 mx-auto w-full md:h-full grid grid-flow-row grid-rows-4 grid-cols-1 md:grid-flow-col md:grid-cols-4 md:grid-rows-1 md:gap-4">
                    <div className="w-full h-full italic flex items-center justify-center text-logo hover:text-logo text-3xl font-bold no-underline pr-5">
                        <img className="h-12 mr-2" src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo"></img>
                        TRÀ SỮA 2001
                    </div>

                    <div className="footer__about md:py-10 text-white text-center md:text-left">
                        <h2 className="text-2xl font-bold">About</h2>
                        <ul className="about__list">
                            <li className="about__item">
                                <Link to="/" className="hover:underline">Về chúng tôi</Link>
                            </li>
                            <li className="about__item">
                                <Link to="/" className="hover:underline">Blog</Link>
                            </li>
                            <li className="about__item">
                                <Link to="/" className="hover:underline">Cơ hội nghề nghiệp</Link>
                            </li>
                            <li className="about__item">
                                <Link to="/" className="hover:underline">Cửa hàng</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__contact md:py-10 text-white text-center md:text-left">
                        <h2 className="text-2xl font-bold">Contact & Address</h2>
                        <ul className="contact__list">
                            <li className="contact__item">
                                <span>Địa chỉ: ...</span>
                            </li>
                            <li className="contact__item">
                                <a className="hover:underline" href="https://www.facebook.com/profile.php?id=100009580520418" target="_blank" rel="noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li className="contact__item">
                                <span>+84853274954</span>
                            </li>
                            <li className="contact__item">
                                <a className="hover:underline" href="mailto:ducvinh.truong2001@gmail.com" target="_blank" rel="noreferrer">
                                    ducvinh.truong@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__delivery md:py-10 text-white text-center md:text-left">
                        <h2 className="text-2xl font-bold">Delivery</h2>
                        <ul className="delivery__list">
                            <li className="delivery__item">
                                <Link to="/" className="hover:underline">Shipping method</Link>
                            </li>
                            <li className="delivery__item">
                                <Link to="/" className="hover:underline">Payment</Link>
                            </li>
                            <li className="delivery__item">
                                <Link to="/" className="hover:underline">Cash voucher</Link>
                            </li>
                            <li className="delivery__item">
                                <Link to="/" className="hover:underline">Return</Link>
                            </li>
                            <li className="delivery__item">
                                <Link to="/" className="hover:underline">Exchange</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;