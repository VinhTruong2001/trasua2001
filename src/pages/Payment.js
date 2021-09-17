import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUserCircle, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import convertPrice from '../utils/convertPrice';
import callApi from '../utils/apiCaller';
import Validator from '../utils/validator';
import getDate from '../utils/getDate';
import '../css/button.css';
import '../css/Payment.css';
import '../css/Order.css';

class Payment extends React.Component {
    constructor(props) {
        super(props);

        let cartData = JSON.parse(window.localStorage.getItem("products")) || [];
        let totalPriceData = JSON.parse(window.localStorage.getItem("total")) || 10000;
        
        this.state = {
            cartProducts: cartData,
            totalPrice: totalPriceData + 10000
        }

        this.address = React.createRef();
        this.name = React.createRef();
        this.phone = React.createRef();
        this.note = React.createRef();
        this.paymentMethod = React.createRef();
        this.return = React.createRef();
    }

    componentDidMount() {
        document.querySelector(".Header").classList.add("bg-main");
        document.querySelectorAll(".header__navigation-item")[0].classList.add("active");
        if (window.innerWidth < 740) {
            document.querySelector(".Footer").style.display = "none";
        }

        this.address.current.focus();
        let _this = this;
        Validator({
            form: '.customer-info',
            formGroupSelector: '.input-text-container',
            errorSelector: '.error-message',
            submitBtn: '.cart__btn',
            rules: [
                Validator.isRequire('#address', 'Vui lòng nhập vào địa chỉ nhận hàng'),
                Validator.isRequire('#name', 'Vui lòng nhập vào họ tên đầy đủ'),
                Validator.isRequire('#phone', 'Vui lòng nhập vào số điện thoại người nhận'),
                Validator.minLength('#phone', 10, 'Số điện thoại phải chứa ít nhất 10 chữ số'),
            ],
            sendOrder() {
                const { cartProducts, totalPrice } = _this.state;
                const order = {
                    date: getDate(),
                    products: cartProducts,
                    paymentMethod: _this.paymentMethod.current.value,
                    totalPrice,
                    customerInfo: {
                        address: _this.address.current.value.trim(),
                        name: _this.name.current.value.trim(),
                        phone: _this.phone.current.value.trim(),
                        note: _this.note.current.value.trim(),
                    },
                    isComplete: false,
                }
        
                if (cartProducts.length > 0 && totalPrice > 0) {
                    callApi('POST', order, 'orders').then(res => {
                        alert("Đơn hàng của bạn đã được gửi đến hệ thống\nCảm ơn bạn đã đặt hàng tại Trà sữa 2001 ^_^");
                        window.localStorage.setItem("products", JSON.stringify([]));
                        window.localStorage.setItem("total", 0);
                        _this.return.current.click();
                    }).catch(err => {
                        alert("Hệ thống gặp lỗi: " + err);
                    })
                }
            }
        })
    }

    render() {
        const { cartProducts } = this.state;
        var cartList = cartProducts.map((cartProduct) => {
            return  <li
                        id={ cartProduct.id } 
                        className="w-full flex justify-between border-gray border-b-2 py-3"
                    >
                        <div className="cart-item__product-info text-left">
                            <h3 className="font-bold">
                                { cartProduct.name } { cartProduct.size !== "" ?  `(${cartProduct.size})` : "" }
                            </h3>
                            <div className="text-sm text-gray-400">{ cartProduct.note }</div>
                        </div>
                        <div className="text-right">
                            <div className="">{ convertPrice(cartProduct.price) }</div>
                            <div> x { cartProduct.quantity }</div>
                            <div className="font-bold">{ convertPrice(cartProduct.quantity * cartProduct.price) }</div>
                        </div>
                        
                    </li>
        })

        return (
            <div className="Payment md:pt-20 mt-20 md:mt-0">
                <div className="container px-4 md:px-12 md:mx-auto">
                    <div className="md:grid md:grid-cols-5 md:gap-3">
                        <div className="payment-info w-full md:col-span-3">
                            <div className="bg-white w-full mt-5 text-left">
                                <h2 className="text-xl md:text-2xl p-5 bg-highlight text-white">1. Xác định thông tin khách hàng</h2>
                                <form className="customer-info p-7">
                                    <div for="address" className="input-text-container">
                                        <FontAwesomeIcon icon={ faMapMarkerAlt } className="text-gray-400 mr-3"/>
                                        <input 
                                            id="address" 
                                            type="text" 
                                            className="flex-1 outline-none" 
                                            placeholder="Nhập địa chỉ của bạn tại đây" 
                                            ref={ this.address }
                                        />
                                        <span className="error-message"></span>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between my-5">
                                        <div for="name" className="input-text-container md:w-1/2 md:mr-3 my-5 md:my-0">
                                            <FontAwesomeIcon icon={ faUserCircle } className="text-gray-400 mr-3"/>
                                            <input 
                                                id="name" 
                                                type="text" 
                                                className="flex-1 outline-none" 
                                                placeholder="Họ và tên người nhận" 
                                                ref={ this.name }
                                            />
                                            <span className="error-message"></span>
                                        </div>
                                        <div for="phone" className="input-text-container md:w-1/2 my-5 md:my-0">
                                            <FontAwesomeIcon icon={ faPhoneAlt } className="text-gray-400 mr-3"/>
                                            <input 
                                                id="phone" 
                                                type="text" 
                                                className="flex-1 outline-none" 
                                                placeholder="Số điện thoại" 
                                                ref={ this.phone }
                                            />
                                            <span className="error-message"></span>
                                        </div>
                                    </div>
                                    <div for="note" className="input-text-container">
                                        <input 
                                            id="note" 
                                            type="text" 
                                            className="flex-1 outline-none" 
                                            placeholder="Ghi chú" 
                                            ref={ this.note }
                                        />
                                        <span className="error-message"></span>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-white w-full mt-8 text-left">
                                <h2 className="text-xl md:text-2xl p-5 bg-highlight text-white">2. Hình thức thanh toán</h2>
                                <div className="p-7">
                                    <label for="byCash" className="radio-container flex items-center"> 
                                        <input 
                                            type="radio"
                                            id="byCash"
                                            name="payment-method" 
                                            value="cash"
                                            ref={ this.paymentMethod }
                                            checked
                                        />
                                        <span className="checkmark"></span>
                                        <span className="radio-label text-base">Thanh toán khi nhận hàng</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="max-h-96 cart-wrap fixed bottom-0 left-0 right-0 md:sticky md:top-16 z-20 md:col-span-2">
                            <aside className="cart mt-5 bg-body md:bg-white py-1 pt-3 md:py-3 md:w-4/5 md:absolute md:right-0">
                                <div className="order__btn px-5 relative z-20 hidden md:block">
                                    <Link 
                                        to="/order"
                                        className="bg-highlight text-white w-full block py-1"
                                        ref={ this.return }
                                    >
                                        <span>Quay về trang sản phẩm</span>
                                    </Link>
                                </div>
                                <div className="cart-group-mobile flex flex-col">
                                    <ul className="cart-list overflow-y-auto flex flex-wrap p-3 max-h-32 md:max-h-full md:min-h-32 max-w-full items-center justify-between md:flex-col border-gray">
                                        { cartList }                                        
                                    </ul>
                                    <div className="extra-fee border-gray border-b-2 p-3 relative z-20 bg-body md:bg-white">
                                        <div className="deliver-price w-full flex justify-between mb-3 font-bold">
                                            <span>Phí giao hàng</span>
                                            <span>{ convertPrice(10000) }</span>
                                        </div>
                                        <div className="promotion-code flex">
                                            <input type="text" className="outline-none p-2 border-2 border-gray focus:border-highlight flex-1" placeholder="Nhập mã ưu đãi tại đây"/>
                                            <button className="highlight-btn p-2 uppercase text-logo hover:text-white">
                                                <span className="font-bold">Áp dụng</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart__total pt-3 flex justify-between px-5 relative z-20 bg-body md:bg-white">
                                    <span className="text-base pt-1">Tổng cộng</span>
                                    <span className="font-bold text-2xl" ref={this.total}> { convertPrice(this.state.totalPrice) } </span>
                                </div>
                                
                                <div className="cart__btn-container px-5 relative z-20 bg-white">
                                    <button 
                                        className="cart__btn highlight-btn text-logo hover:text-white w-full py-1"
                                        disabled
                                    >
                                        <span>Tiến hành đặt hàng</span>
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment