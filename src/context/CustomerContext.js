import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const endpoint = process.env.GATSBY_ENDPOINT
const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.GATSBY_STORE_TOKEN,
})

const isBrowser = typeof window !== "undefined"

export const CustomerContext = createContext({})

export const CustomerProvider = ({ children }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  /**
   * @function login - Create Shopify customer access token and store it in a cookie
   * @param {String} email
   * @param {String} password
   */
  const login = async () => {
    const input = {
      email,
      password,
    }
    try {
      const response = await fetch(endpoint, {
        headers,
        method: "POST",
        body: JSON.stringify({
          query: createAccessToken(),
          variables: { input },
        }),
      })
      const customer = await response.json()
      console.log(customer)
      const token =
        customer.data.customerAccessTokenCreate.customerAccessToken.accessToken
      const expires = new Date(
        customer.data.customerAccessTokenCreate.customerAccessToken.expiresAt
      )
      document.cookie = `shopifyCustomerAccessToken=${token};expires=${expires.toUTCString()}`
      setEmail("")
      setPassword("")
      window.location.replace("/account")
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * @function getTokenFromCookie - Gets the customer access token from the cookie
   */
  const getTokenFromCookie = () => {
    const name = "shopifyCustomerAccessToken="
    const decodedDocumentCookie = decodeURIComponent(document.cookie)
    const cookies = decodedDocumentCookie.split(";")
    for (let cookie of cookies) {
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1)
      }
      if (cookie.indexOf(name) === 0) {
        cookie = cookie.substring(name.length, cookie.length)
        return cookie
      }
    }
    return null
  }

  const getCustomer = async () => {
    const input = getTokenFromCookie()
    if (input) {
      try {
        const response = await fetch(endpoint, {
          headers,
          method: "POST",
          body: JSON.stringify({
            query: customerQuery(),
            variables: { input },
          }),
        })
        const customer_json = await response.json()
        const customer = customer_json.data.customer
        return customer
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log("you must be logged in to do this")
    }
  }

  return (
    <CustomerContext.Provider
      value={{
        login,
        getCustomer,
        setEmail,
        setPassword,
        getTokenFromCookie,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

const createAccessToken = () => `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerUserErrors {
      code
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}
`
const customerQuery = () => `
query($input: String!) {
  customer(customerAccessToken: $input) {
    firstName
    lastName
    orders(first: 5) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          orderNumber
          lineItems(first: 100) {
          	edges {
              node {
                quantity
              }
            }
          }
          totalPriceV2 {
            currencyCode
            amount
          }
        }
      }
    }
  }
}
`
