import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../css/NewList.css'

class NewsList extends React.Component {

    render() {
        var { news, size, grid } = this.props;
        var newsList;

        if (news !== undefined) {
            if (size !== "all") {
                newsList = news.slice(0, size);
            } 
            else {
                newsList = news;
            }

            newsList = newsList.map((news, index) => {
                return  <div className="news__article-container border-2 border-highlight relative mb-3 md:mb-0 flex flex-col bg-white">
                            <div className="flex-1">
                                <div className="news__article-img-wrap">
                                    <div className="news__article-img bg-cover bg-no-repeat">500x165</div>
                                </div>
                                <div className="news__article-info text-left mt-3 px-3">
                                    <h2 className="news__article-title text-base md:text-2xl text-logo font-bold">{ news.title }</h2>
                                    <p className="news__article-content">{ news.content }</p>
                                </div>
                            </div>
                            <div className="news__article-read-more absolute bottom-5 left-3">
                                <Link to="" className="highlight-btn reverse p-2 uppercase text-white bg-highlight">
                                    <span className="font-bold">Xem thêm</span>
                                </Link>
                            </div>
                        </div>
                            
                
            }) 
        }

        return (
            <div className="NewsList bg-body">
                <div className="container px-4 md:px-12 md:mx-auto">
                    <div className="news__header flex justify-between py-4">
                            <h2 className="news__heading font-bold text-3xl text-logo border-black border-b-8 uppercase">{ this.props.heading }</h2>
                            <Link 
                                to="/news" 
                                className="news__all-product-btn highlight-btn reverse font-bold text-white hover:text-logo bg-highlight py-3 px-5 uppercase"
                            >
                                <span>Xem thêm</span>
                            </Link>
                        </div>
                    <div className={ `grid grid-flow-row gap-0 md:gap-6 ${ grid }` }>
                        { newsList }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

export default connect(mapStateToProps, null)(NewsList);