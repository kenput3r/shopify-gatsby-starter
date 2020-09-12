import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import loader from "../../images/loader.svg"

const endpoint = process.env.GATSBY_ENDPOINT
const headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Shopify-Storefront-Access-Token": process.env.GATSBY_STORE_TOKEN,
})

const Orders = () => {
  const [order, setOrder] = useState(null)
  useEffect(() => {
    const url = new URL(document.location)
    const params = new URLSearchParams(url.search)
    if (params.has("order_number")) {
      const input = params.get("order_number")
      const getOrder = async () => {
        try {
          const response = await fetch(endpoint, {
            headers,
            method: "POST",
            body: JSON.stringify({
              query: orderQuery(),
              variables: { input },
            }),
          })
          const order = await response.json()
          setOrder(order)
        } catch (e) {
          console.error(e)
        }
      }
      getOrder()
    }
  })
  return (
    <Layout>
      {order ? (
        <div>
          <h1>
            Order #{order.data.node.orderNumber} <br />
            <small style={{ fontSize: "60%" }}>
              <a
                href={order.data.node.statusUrl}
                target="_blank"
                rel="noreferrer"
              >
                {order.data.node.fulfillmentStatus}
              </a>
            </small>
          </h1>
          <table>
            <thead>
              <tr>
                <td>ITEM</td>
                <td>QUANTITY</td>
                <td>PRICE</td>
              </tr>
            </thead>
            <tbody>
              {order.data.node.lineItems.edges.map((edge, index) => (
                <tr key={edge.node.variant.product.handle + index}>
                  <td>
                    <Link to={`/products/${edge.node.variant.product.handle}`}>
                      {edge.node.title}
                    </Link>
                  </td>
                  <td>{edge.node.quantity}</td>
                  <td>
                    {edge.node.originalTotalPrice.amount}{" "}
                    {edge.node.originalTotalPrice.currencyCode}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>subtotal</td>
                <td>
                  {order.data.node.subtotalPriceV2.amount}{" "}
                  {order.data.node.subtotalPriceV2.currencyCode}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>shipping</td>
                <td>
                  {order.data.node.totalShippingPriceV2.amount}{" "}
                  {order.data.node.totalShippingPriceV2.currencyCode}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>tax</td>
                <td>
                  {order.data.node.totalTaxV2.amount}{" "}
                  {order.data.node.totalTaxV2.currencyCode}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>total</td>
                <td>
                  {order.data.node.totalPriceV2.amount}{" "}
                  {order.data.node.totalPriceV2.currencyCode}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <img src={loader} alt="loading gif" />
        </p>
      )}
    </Layout>
  )
}

export default Orders

const orderQuery = () => `
query($input: ID!) {
	node(id: $input) {
    ... on Order {
      id
    	orderNumber
      totalTaxV2 {
        currencyCode
        amount
      }
      totalPriceV2 {
        currencyCode
        amount
      }
      totalRefundedV2 {
        currencyCode
        amount
      }
      totalShippingPriceV2 {
        currencyCode
        amount
      }
      subtotalPriceV2 {
        currencyCode
        amount
      }
      originalTotalPrice {
        currencyCode
        amount
      }
      discountApplications(first: 10) {
        edges {
          node {
            value {
              __typename
            }
          }
        }
      }
      lineItems(first: 100) {
        edges {
          node {
            title
            quantity
            originalTotalPrice {
              currencyCode
              amount
            }
            discountedTotalPrice {
              currencyCode
              amount
            }
            variant {
              title
              priceV2 {
                currencyCode
                amount
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
      fulfillmentStatus
      statusUrl
    }
  }
}
`
