import React from 'react';
import { Link } from 'react-router-dom';
import '../css/button.css';

class Intro extends React.Component {

    render() {
        return (
            <div className="Intro relative top-0 bottom-0 flex items-center justify-center cursor-default h-full">
                <div 
                    className="intro__background h-full w-full bg-cover bg-top bg-no-repeat absolute top-0 bottom-0 filter brightness-50 z-1"
                    style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/homepage_background.jpg'})`}}
                >
                </div>
                <div className="intro__text absolute z-2">
                    <div className="intro__logo text-logo italic font-bold text-5xl md:text-7xl">
                        Trà sữa 2001
                    </div>
                    <div className="intro__text1 text-white font-bold py-3 text-4xl md:text-7xl md:py-5">
                        ĐẬM VỊ THIÊN NHIÊN 
                        <br />
                        TRỌN VỊ HẠNH PHÚC
                    </div>
                    <div className="intro__text2 text-white mb-20 text-md md:text-3xl font-medium">
                        Trà sữa 2001 hy vọng sẽ đem đến cho bạn những phúc giây thoải  mái 
                        <br />
                        bên cạnh những ly trà sữa Ngon - Sạch - Tươi
                    </div>
                    <Link to="/order" className="intro__order-btn highlight-btn text-white p-2 md:text-3xl border-white">
                        <span>Đặt hàng ngay</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Intro;