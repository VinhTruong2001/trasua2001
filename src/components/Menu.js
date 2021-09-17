import React from 'react';
import { connect } from 'react-redux';import { Link } from 'react-router-dom';
import convertPrice from '../utils/convertPrice'
import '../css/button.css'
import '../css/Menu.css'

class Menu extends React.Component {
    render() {
        var { products, category, size, grid } = this.props;
        var productList;
        if (parseInt(category) === -1) {
            category = Math.floor(Math.random()*5);
        }

        if (products[category] !== undefined) {
            if (size !== "all") {
                productList = products[category].product.slice(0, size);
            } 
            else {
                productList = products[category].product;
            }

            var productsList = productList.map((product, index) => {
                return  <div 
                            key={index}
                            className="menu__product bg-contain bg-no-repeat flex flex-col justify-between text-left bg-white px-3 pb-3"
                            style={{ backgroundImage: `url(${ product.imgUrl })` }}
                        >
                            <Link 
                                to="" 
                                className="product__name no-underline mt-3 text-black hover:text-logo product__name uppercase h-12 md:h-16 text-base md:text-2xl font-bold"
                            >
                                { product.name }
                            </Link>
                            <div className="product__price uppercase text-logo text-base md:text-2xl font-bold">
                                { convertPrice(product.price) }
                            </div>
                            <div className="product__btn flex flex-col-reverse items-center md:flex-row">
                                <Link to={ `/order/${category+1}/${index+1}` } className="highlight-btn reverse p-2 mt-3 md:mr-4 md:mt-0 uppercase"> 
                                    <span className="font-bold">Mua ngay</span> 
                                </Link>
                                <Link to="" className="highlight-btn p-2 uppercase text-logo hover:text-white">
                                    <span className="font-bold">Tìm hiểu thêm</span>
                                </Link>
                            </div>
                        </div>
                                
                        
            })
        }

        return (
            <div className="Menu">
                <div className="container px-4 md:px-12 md:mx-auto">
                    <div className="menu__header flex justify-between py-4 bg-body">
                        <h2 
                            className="menu__heading font-bold text-3xl text-black border-highlight border-b-8 uppercase"
                        >
                                { this.props.heading }
                        </h2>
                        <Link 
                            to="/order" 
                            className="menu__all-product-btn highlight-btn font-bold text-black hover:text-white hover:border-white p-3 uppercase"
                        >
                            <span>Tất cả sản phẩm</span>
                        </Link>
                    </div>
                    <div className={ `grid grid-flow-row ${ grid }` }>
                        { productsList }
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

export default connect(mapStateToProps, null)(Menu);