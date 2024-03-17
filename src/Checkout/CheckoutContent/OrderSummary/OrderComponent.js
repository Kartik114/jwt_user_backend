import React, { useEffect } from 'react';
import { DeliveryOptions } from './DeliveryOptions';
import { useContext } from 'react';
import { CartContext } from '../../../App';

const OrderComponent = ({ dateString, matchingProduct, item }) => {
    const {removeFromCart}=useContext(CartContext);

    const handleDelete = (id) => {
        removeFromCart(id);
        //saveAddCartQuantity();
    };

    return (
        <div className={`cart-item-container js-cart-item-container-${item.id}`}>
            <div className="delivery-date">
                Delivery date: {dateString}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image" src={matchingProduct.imageUrl} alt={matchingProduct.name} />

                <div className="cart-item-details">
                <div className="product-name">
                    {matchingProduct.name}
                </div>
                <div className="product-price">
                    ${(matchingProduct.price / 100).toFixed(2)}
                </div>
                <div className="product-quantity">
                    <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                    Update
                    </span>
                    <span className="delete-quantity-link link-primary js-delete-quantity-link" data-product-id={item.id} onClick={()=>handleDelete(item.id)}>
                    Delete
                    </span>
                </div>
                </div>

                <div className="delivery-options">
                <div className="delivery-options-title">
                    Choose a delivery option:
                </div>
                {<DeliveryOptions item={item} key={item.id} />}
                </div>
            </div>
        </div>
    );
}

export default OrderComponent;
