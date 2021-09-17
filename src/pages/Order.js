import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import OrderList from '../components/OrderList';
import convertPrice from '../utils/convertPrice';
import '../css/Order.css'
import { Link } from 'react-router-dom';

class Order extends React.Component {
    constructor(props) {
        super(props);

        let cartData = JSON.parse(window.localStorage.getItem("products")) || [];
        let totalPriceData = JSON.parse(window.localStorage.getItem("total")) || 0;
        
        this.state = {
            cartProducts: cartData,
            totalPrice: totalPriceData
        }

        this.sections = React.createRef();
        this.total = React.createRef();
        this.addToCart = this.addToCart.bind(this);
        this.increaseQuantity = this.increaseQuantity.bind(this);
        this.decreaseQuantity = this.decreaseQuantity.bind(this);
    }

    componentDidMount() {    
        // Reset css
        const activeNavItem = document.querySelector(".header__navigation-item.active");
        if (activeNavItem) {
            activeNavItem.classList.remove("active");
        }

        document.querySelector(".Header").classList.add("bg-main");
        document.querySelectorAll(".header__navigation-item")[0].classList.add("active");
        document.body.style.overflowY = "scroll";

        // Smooth scroll when click navBtn
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        if (window.innerWidth < 740) {
            document.querySelector(".Footer").style.display = "none";
        }

        // Get product from homepage
        if (this.props.match !== undefined) {
            const { category, id } = this.props.match.params;
            setTimeout(() => {
                const categoryElement = this.sections.current.childNodes[category-1];
                const productInfoBtn = categoryElement.querySelectorAll(".order-body > .order__product > .product__btn > button")[id-1];
                productInfoBtn.click();
            }, 1000)
        }  
    }

    addToCart(cartProducts, totalPrice) {
        this.setState({
            cartProducts,
            totalPrice
        })
        this.total.current.innerText = convertPrice(totalPrice);
    }

    increaseQuantity(index) {
        var cartProducts = JSON.parse(window.localStorage.getItem("products")) || [];
        let totalPrice = JSON.parse(window.localStorage.getItem("total")) || 0;
        
        cartProducts[index].quantity++;
        totalPrice += cartProducts[index].price;
        
        window.localStorage.setItem("products", JSON.stringify(cartProducts));
        window.localStorage.setItem("total", JSON.stringify(totalPrice));

        this.setState({
            cartProducts,
            totalPrice
        })
        this.total.current.innerText = convertPrice(totalPrice);
    }

    decreaseQuantity(index) {
        var cartProducts = JSON.parse(window.localStorage.getItem("products")) || [];
        let totalPrice = JSON.parse(window.localStorage.getItem("total")) || 0;

        let quantityValue = cartProducts[index].quantity - 1;
        if (quantityValue === 0) {
            totalPrice -= cartProducts[index].price;
            cartProducts.splice(index, 1);  
        }
        else {
            cartProducts[index].quantity = quantityValue;
            totalPrice -= cartProducts[index].price;
        }

        window.localStorage.setItem("products", JSON.stringify(cartProducts));
        window.localStorage.setItem("total", JSON.stringify(totalPrice));

        this.setState({
            cartProducts,
            totalPrice
        })
        this.total.current.innerText = convertPrice(totalPrice);
    }

    render() {
        const { categories } = this.props;
        const { cartProducts } = this.state;
        var categoryItems = categories.map((category, index) => {
            return  <li 
                        key={ index }
                        className="category-item h-12 flex md:w-full md:text-left md:py-3 border-highlight md:border-transparent"
                    >
                        <a 
                            href={ `#${ category.linkID }` } 
                            className="category-link uppercase text-sm font-bold hover:text-logo block h-full py-3"
                        >{ category.name }</a>
                    </li>
        })
 
        var menu = categories.map((category, index) => {
            return  <section id={ category.linkID } className="menu-item pt-32 md:pt-16">
                        <OrderList 
                            heading={ category.name } 
                            category={ index } 
                            size="all" 
                            sticky="true" 
                            grid="grid-cols-2 grid-rows-2 gap-5 md:grid-cols-3 md:grid-rows-1 md:gap-6"
                            addToCart={ this.addToCart }
                        />
                    </section>
        })

        var cartList = cartProducts.map((cartProduct, index) => {
            return  <li
                        id={ cartProduct.id } 
                        className="w-full flex border-gray border-b-2 py-3"
                    >
                        <div className="cart-item__product-info text-left flex-1">
                            <h3 className="font-bold">
                                { cartProduct.name } { cartProduct.size !== "" ?  `(${cartProduct.size})` : "" }
                            </h3>
                            <div className="text-base">{ convertPrice(cartProduct.price) }</div>
                            <div className="text-sm text-gray-400">{ cartProduct.note }</div>
                        </div>
                        <div className="cart-product__quantity-change h-full m-auto text-xl">
                            <button 
                                className="text-logo p-1 relative z-20"
                                onClick={ () => this.decreaseQuantity(index) }
                            >
                                <FontAwesomeIcon icon={faMinusCircle} className="relative z-10"/>
                            </button>
                            <span className="cart-product__quantity px-3"> { cartProduct.quantity } </span>
                            <button 
                                className="text-logo p-1"
                                onClick={ () => this.increaseQuantity(index) }
                            >
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </button>
                        </div>
                    </li>
        })
        
        return (
            <div className="ProductList md:py-20">
                <div className="container px-4 md:px-12 md:mx-auto">
                    <div className="product__categories md:grid md:grid-cols-5 md:gap-3">
                        <div className="sticky top-16 max-h-96 z-20">
                            <aside className="mt-5 bg-white px-5 md:py-3">
                                <ul className="category-list flex flex-nowrap py-3 md:py-0 whitespace-nowrap max-w-full overflow-x-auto items-center justify-between md:flex-col">
                                    { categoryItems }
                                </ul>
                            </aside>
                        </div>
                        <div className="menu pb-36 md:pb-0 md:col-span-4 md:grid md:grid-cols-5 relative -top-28 md:top-0">
                            <div className="MenuList md:col-span-3" ref={ this.sections }>
                                { menu }
                            </div>
                            <div className="max-h-96 cart-wrap fixed bottom-0 left-0 right-0 md:sticky md:top-16 z-10 md:col-span-2">
                                <aside className="cart mt-5 bg-body md:bg-white py-3 md:py-5">
                                    <div className="cart-group-mobile flex flex-col">
                                        <ul className="cart-list overflow-y-auto flex flex-wrap py-3 max-h-32 md:max-h-full md:min-h-32 max-w-full items-center justify-between md:flex-col border-gray px-5">
                                            { cartList }                                        
                                        </ul>
                                        <div className="promotion-code border-gray border-b-2 p-3 flex relative z-20 bg-body md:bg-white">
                                            <input type="text" className="outline-none p-2 border-2 border-gray focus:border-highlight flex-1" placeholder="Nhập mã ưu đãi tại đây"/>
                                            <button className="highlight-btn p-2 uppercase text-logo hover:text-white">
                                                <span className="font-bold">Áp dụng</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart__total pt-3 flex justify-between px-5 relative z-20 bg-white">
                                        <span className="text-base pt-1">Tổng cộng</span>
                                        <span className="font-bold text-2xl" ref={this.total}> { convertPrice(this.state.totalPrice) } </span>
                                    </div>
                                    
                                    <div className="cart__btn px-5 relative z-20 bg-body md:bg-white">
                                        <Link 
                                            to="/payment"
                                            className="highlight-btn reverse w-full block py-1"
                                        >
                                            <span>Đặt hàng</span>
                                        </Link>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.products,
    }
}

export default connect(mapStateToProps, null)(Order);