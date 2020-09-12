/**
 * The page for logging in
 * Shopify Theme Reference: theme/Templates/customers/login.liquid
 */
import React, { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout"
import { CustomerContext } from "../../context/CustomerContext"
import loader from "../../images/loader.svg"

const Login = () => {
  const { login, getTokenFromCookie, setEmail, setPassword } = useContext(
    CustomerContext
  )
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    //if token exists, redirect to account page
    if (getTokenFromCookie()) {
      window.location.replace("/account")
    } else {
      setIsLoading(false)
    }
  })
  return (
    <Layout>
      {isLoading ? (
        <p style={{ textAlign: "center" }}>
          <img src={loader} />
        </p>
      ) : (
        <div>
          <h1>Sign In</h1>
          <div>
            <input
              type="email"
              name="email"
              onChange={event => setEmail(event.target.value)}
            />
            <input
              type="password"
              name="password"
              onChange={event => setPassword(event.target.value)}
            />
            <button onClick={login}>sign in</button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Login
