import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import convertPrice from '../utils/convertPrice';
import '../css/button.css'
import '../css/modal.css'
import '../css/orderList.css'

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: {
                "id": "0",
                "name": "",
                "price": 0,
                "imgUrl": "https://i.ibb.co/m9stB7j/normal.jpg",
                "promotion": 0,
                "categoryId": "1",
                "sizes": [],
                "note": "",
                "quantity": 1
            },
            size: 'S',
        }

        this.productModal = React.createRef();
        this.currentProductNote = React.createRef();
        this.currentProductSizes = React.createRef();
        this.addToCart = this.addToCart.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.updatePriceOnSize = this.updatePriceOnSize.bind(this);
    }

    triggerModal(check, category = 0, productId = -1) {
        this.productModal.current.classList.toggle('modalout', check);

        if (check) {
            let currentProduct = this.props.products[category].product[productId];
            this.setState({
                currentProduct,
            })
        }
    }

    updatePriceOnSize(e) {
        const { currentProduct } = this.state;
        const value = e.currentTarget.value;
        console.log(value);

        switch (value) {
            case 'S':
                currentProduct.price -= 5000;
                break;
            case 'M':
                currentProduct.price += 5000;
                break;
        }

        this.setState({
            currentProduct,
        })
    }

    addToCart() {
        const { currentProduct } = this.state; 
        const checkedRadioElement = this.currentProductSizes.current.querySelector("div > label > input:checked");
        const size = checkedRadioElement !== null ? checkedRadioElement.value : "";
        const note = this.currentProductNote.current.value;
        let flag = 0;

        const cartProducts = JSON.parse(window.localStorage.getItem("products")) || [];
        let totalPrice = JSON.parse(window.localStorage.getItem("total")) || 0;

        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].id === currentProduct.id && 
                cartProducts[i].size === size &&
                cartProducts[i].note === note
                ) {
                cartProducts[i].quantity++;
                totalPrice += cartProducts[i].price;
                flag = 1;
                break;
            }
        }

        if (!flag) {

            const newProduct = {
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                promotion: currentProduct.promotion,
                size,
                note,
                quantity: 1,
            }
        
            cartProducts.push(newProduct);
            totalPrice += newProduct.price * newProduct.quantity;
        }

        window.localStorage.setItem("products", JSON.stringify(cartProducts));
        window.localStorage.setItem("total", JSON.stringify(totalPrice));

        this.props.addToCart(cartProducts, totalPrice);
        this.currentProductNote.current.value = "";
        this.triggerModal(false);
    }

    
    render() {
        var { products, category, size, grid, sticky } = this.props;
        var { currentProduct } = this.state;
        sticky = JSON.parse(sticky);
        var list;

        if (products[category] !== undefined) {
            if (size !== "all") {
                list = products[category].product.slice(0, size);
            } 
            else {
                list = products[category].product;
            }

            var productsList = list.map((product, index) => {
                return  <div 
                            key={ index }
                            id={ product.id }
                            data-category={ product.categoryId }
                            className="order__product bg-contain bg-no-repeat flex flex-col justify-between text-center bg-white px-3 pb-3"
                            style={{ backgroundImage: `url(${ product.imgUrl })` }}
                        >
                            <h2
                                className="product__name no-underline mt-3 text-black hover:text-logo product__name uppercase h-12 md:h-16 text-base font-bold"
                            >
                                { product.name }
                            </h2>
                            <div className="product__price text-logo text-base md:text-base font-bold">
                                { convertPrice(product.price) }
                            </div>
                            <div className="product__btn">
                                <button 
                                    className="add-cart-btn text-logo text-2xl p-2 mt-3 md:mt-0 uppercase"
                                    onClick={ () => this.triggerModal(true, category, index)  }
                                > 
                                    <FontAwesomeIcon icon={faPlusCircle}/>
                                </button>
                            </div>
                        </div>                              
            })

            var productSizeRadios = currentProduct.sizes.map((size, index) => {
                return  <label for={ `size-${ size }` } className="radio-container mx-3"> 
                            <input 
                                type="radio"
                                id={ `size-${ size }` } 
                                name="size" 
                                value={ size } 
                                onChange={ (e) => this.updatePriceOnSize(e) }
                                defaultChecked={index === 0}
                            />
                            <span className="checkmark"></span>
                            <span className="radio-label">{ size }</span>
                        </label>

            })
        }


        return (
            <div className="OrderList">
                <div className="container px-4 md:px-12 md:mx-auto">
                    <div className={ `order__header flex justify-between py-4 bg-body ${ sticky ? "sticky top-32 md:top-16 z-10" : "" }` }>
                        <h2 
                            className="order__heading font-bold text-3xl text-black border-highlight border-b-8 uppercase"
                        >
                                { this.props.heading }
                        </h2>
                    </div>
                    <div className={ `order-body grid grid-flow-row ${ grid }` }>
                        { productsList }
                    </div>
                </div>
                <div 
                    className="modal z-40"
                    ref={ this.productModal }
                >
                    <div className="overlay"></div>
                    <div className="modal-content p-5">
                        <div className="w-full flex flex-col md:flex-row justify-center">
                            <img src={currentProduct.imgUrl} alt="Lỗi" className="w-1/2 md:w-1/3 md:mr-10 self-center md:self-start"/>
                            <ul className="text-left text-base md:text-xl mt-5">
                                <li>
                                    <span className="font-bold ml-3">Tên sản phẩm: </span>
                                    <span>
                                        {currentProduct.name}
                                    </span>
                                </li>
                                <li>
                                    <span className="font-bold ml-3">Giá: </span>
                                    <span>
                                        { convertPrice(currentProduct.price) }
                                    </span>
                                </li>
                                <li>
                                    <span className="font-bold ml-3">Khuyến mãi: </span>
                                    <span>
                                        {currentProduct.promotion * 100}%
                                    </span>
                                </li>
                                <li className={`flex ${ currentProduct.sizes.length === 0 ? "hidden" : "" }`}>
                                    <span className="font-bold ml-3">Chọn size: </span>
                                    <div className="flex" ref={ this.currentProductSizes }> 
                                        { productSizeRadios } 
                                    </div>
                                </li>
                                <li className="ml-3 mt-7">
                                    <span className="font-bold">Ghi chú: </span>
                                    <textarea 
                                        name="note" 
                                        rows="2" cols={ window.innerWidth < 740 ? "32" : "40" } 
                                        className="p-2 text-sm block outline-none bg-gray-100 resize-none"
                                        ref={ this.currentProductNote }
                                    ></textarea>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full flex justify-center text-white my-7">
                            <button 
                                className="mr-28 w-32 p-2 bg-highlight text-white"
                                onClick={ this.addToCart }
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button 
                                className="w-32 p-2 bg-transparent text-logo border-2 border-highlight"
                                onClick={ () => this.triggerModal(false) }
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

export default connect(mapStateToProps, null)(OrderList);