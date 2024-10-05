import React from 'react';
import Header from '../components/Layout/Header';
import '../styles/AllCategories.css';
import useCategory from '../hooks/useCategory';

const AllCategories = () => {
  const imageList = {
    // 1: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
    1:'https://5.imimg.com/data5/ECOM/Default/2024/2/389519659/UI/MF/JF/153407772/h8d73a5a841434ff99fde79802bed8d93b-500x500.webp',
    2: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
    // 2:'https://imgs.search.brave.com/491xG9gLPHIRO76RNpvAOgS9K4eYfUP9o0ONXkKMc3E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhj/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8xMS9jbG90/aGluZy1waG90b2dy/YXBoeS1mZWF0dXJl/ZC1pbWFnZS5wbmc',
    3: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
    // 3:'https://imgs.search.brave.com/lvl2LXjhr063JAaWPKpxM-x7yBeLiufJtVwPtWw9cmg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIx/MTU1NDE2NC9waG90/by8zZC1yZW5kZXIt/b2YtaG9tZS1hcHBs/aWFuY2VzLWNvbGxl/Y3Rpb24tc2V0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1i/bG0zSXlQeVpvNUVs/V0xPakktaEZNRy1O/cktRMEc3NkpwV0d5/TnR0RjhzPQ',
    4: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-4.jpg",
    5: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
    6: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
    7: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
    8: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
    9: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
    10: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
    11: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
    12: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
  };

  const categories = useCategory();
  //   console.log(categories[categories.length])
  
  const randomCount = Math.floor(Math.random() * 401) + 100;
  return (
      <>
      <Header />
      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="secondary pr-3">Categories</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {categories.map((category, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category._id}>
              <a className="text-decoration-none" href="#">
                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                  <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
                      {console.log(index)}
                    <img className="img-fluid"
                     src={imageList[index + 1]}
                    //  src={category.image}
                     alt={`Category ${category.name}`} />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{category.name}</h6>
                    <small className="text-body">{(randomCount+index*2+1*3)}+ Products</small>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCategories;
