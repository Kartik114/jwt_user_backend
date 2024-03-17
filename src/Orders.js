import "./styles/shared/amazon-header.css";
import "./styles/pages/orders.css";

import { AmazonHeader } from "./Amazon/AmazonHeader";

import React from 'react'
import { OrdersContent } from "./Orders/OrdersContent";

export const Orders = () => {

    return (
        <>
            <AmazonHeader key="1"/>
            <OrdersContent key="2"/>
        </>
      );
}

