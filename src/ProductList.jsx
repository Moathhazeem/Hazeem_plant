import { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList() {
    const cart = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);
    const [plantsArray, setPlantsArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch plants from backend
        fetch('http://localhost:3000/api/plants')
            .then(response => response.json())
            .then(data => {
                setPlantsArray(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching plants:', error);
                setLoading(false);
            });
    }, []);

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }
    // Calculate total cost based on quantity for an item
    const getCountItem = () => {
        let count = 0;
        cart.forEach((item) => {
            if(item.quantity > 0){
                count ++;
            }
        })
        return count;
    };
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    }
    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false); // Hide the cart when navigating to Plants link
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };
    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Hazeem plant</h3>

                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div className="nav-center"> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Home</a></div>
                    <div className="cart-wrapper"> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><p className='cart_quantity_count'>{getCountItem()}</p><span className='cart_text'>basket</span></h1></a></div>
                </div>
            </div>
            {!showCart ? (
                loading ? (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h2>Loading Plants...</h2>
                    </div>
                ) : (
                    <div className="product-grid">
                        {plantsArray.map((categ) => (
                            <div key={categ.category}>
                                <div className='plant_heading'>
                                    <h2 className='plantname_heading'>{categ.category}</h2>
                                </div>
                                <div className='product-list'>
                                    {categ.plants.map((plant) => (
                                        <div className='product-card' key={plant.name}>
                                            <h4 className='product-title'>{plant.name}</h4>
                                            <img className="product-img" src={plant.image} alt={plant.name} />
                                            <p className='product-price'>{plant.cost}</p>
                                            <p className='product-desc'>{plant.description}</p>
                                            <button className={`product-button ${cart.find(item => item.name === plant.name && item.quantity > 0) ? 'added-to-cart': ''}`}
                                                onClick={() => handleAddToCart(plant)}
                                            >Add to Cart</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;