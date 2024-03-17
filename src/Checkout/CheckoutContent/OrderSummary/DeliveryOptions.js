import { deliveryOptions } from "../../../data/Cart";
import { useContext } from "react";
import { CartContext } from "../../../App";
import dayjs from "dayjs";

export const DeliveryOptions=({item})=> {
    const {updateDeliveryOption} = useContext(CartContext);

    const handleDeliveryOptionChange=(deliveryOptionId)=>{
        updateDeliveryOption(item.id, deliveryOptionId);
    }

    const html=deliveryOptions.map((deliveryOption)=>{
        const today=dayjs();
        const deliveryDate=today.add(
          deliveryOption.deliveryTime,'days');
        const dateString = deliveryDate.format('dddd,MMMM d');
        //console.log(`${today} ${deliveryDate} `);
        const priceString = deliveryOption.deliveryPriceCents
        !==0
        ? `$${(deliveryOption.deliveryPriceCents/100).toFixed(2)}` : 'Free';

        const isChecked = (deliveryOption.id===item.deliveryOptionId);
        //console.log(isChecked);

        return (<div class="delivery-option js-delivery-option"
                >
              <input  type="radio"
                checked={isChecked? true: false}
                onChange={() => handleDeliveryOptionChange(deliveryOption.id)}
                class="delivery-option-input"
              />
              <div> 
                <div class="delivery-option-date">
                  {dateString}
                </div>
                <div class="delivery-option-price">
                  {priceString} - Shipping
                </div>
              </div>
            </div>
        );
    });
    return html;
}
{/* <div className="delivery-option js-delivery-option">
    <input
      type="radio"
      checked={isChecked}
      onChange={() => handleDeliveryOptionChange(deliveryOption.id)}
      className="delivery-option-input"
      name={`delivery-option-${item.id}`}
    /> */}