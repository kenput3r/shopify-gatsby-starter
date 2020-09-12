import React from "react"
import { CartProvider } from "./src/context/CartContext"
import { CustomerProvider } from "./src/context/CustomerContext"

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <CustomerProvider>{element}</CustomerProvider>
  </CartProvider>
)
