/**
 * The page for viewing the shopping cart
 * Shopify Theme Reference: theme/Templates/cart.liquid
 */
import React, { useContext, useState } from "react"
import Layout from "../components/layout"
import { CartContext } from "../context/CartContext"

const Cart = () => {
  const {
    checkout,
    removeProductFromCart,
    addDiscountCode,
    removeDiscountCode,
  } = useContext(CartContext)
  const [discountCode, setDiscountCode] = useState("")
  console.log(checkout)
  return (
    <Layout>
      <h1>Cart</h1>
      {checkout.lineItems && checkout.lineItems.length ? (
        <div>
          {checkout.lineItems.map(lineItem => (
            <p key={lineItem.id}>
              {lineItem.title} - {lineItem.variant.title} &times;{" "}
              {lineItem.quantity} [{lineItem.variant.price}]
              <button onClick={() => removeProductFromCart(lineItem.id)}>
                remove
              </button>
            </p>
          ))}
          <p>Cart Total: {checkout.totalPrice}</p>
          {checkout.discountApplications.length > 0 ? (
            <p>
              you are receiving{" "}
              {checkout.discountApplications[0].value.percentage}% off using
              code <strong>{checkout.discountApplications[0].code}</strong>{" "}
              <button
                onClick={() =>
                  removeDiscountCode(checkout.discountApplications[0].code)
                }
              >
                remove
              </button>
            </p>
          ) : (
            <p>
              <label htmlFor="DiscountCode">have a discount code?</label>{" "}
              <input
                name="DiscountCode"
                type="text"
                onChange={event => setDiscountCode(event.target.value)}
              />{" "}
              <button onClick={() => addDiscountCode(discountCode)}>add</button>
            </p>
          )}
          <p>
            <a href={checkout.webUrl}>Checkout</a>
          </p>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </Layout>
  )
}

export default Cart
