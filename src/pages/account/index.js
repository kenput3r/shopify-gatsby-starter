/**
 * The page for displaying the customer's account info
 * Shopify Theme Reference: theme/customers/account
 */
import React, { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import { CustomerContext } from "../../context/CustomerContext"
import loader from "../../images/loader.svg"

const Account = () => {
  const { getCustomer } = useContext(CustomerContext)
  const [customer, setCustomer] = useState(null)
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const customer = await getCustomer()
      setCustomer(customer)
      if (customer) {
        if (customer.orders.edges.length) {
          setOrders(customer.orders.edges)
        }
      } else {
        window.location.replace("/account/login")
      }
    }
    fetchData()
  }, [])

  const getTotalItemCount = lineItems => {
    let total = 0
    for (let edge of lineItems.edges) {
      total += edge.node.quantity
    }
    return total
  }

  console.log(customer)
  return (
    <Layout>
      {customer ? (
        <div>
          <h1>
            {customer.firstName} {customer.lastName}'s Account
          </h1>
          <h2
            style={{ borderBottom: "1px solid", padding: 5, marginBottom: 20 }}
          >
            Recent Orders
          </h2>
          {orders && (
            <div>
              <table>
                <thead>
                  <tr>
                    <td>ORDER NUMBER</td>
                    <td>TOTAL ITEMS</td>
                    <td>TOTAL PAID</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.node.id}>
                      <td>
                        <Link
                          to={`/account/orders?order_number=${order.node.id}`}
                        >
                          {order.node.orderNumber}
                        </Link>
                      </td>
                      <td>{getTotalItemCount(order.node.lineItems)}</td>
                      <td>
                        {order.node.totalPriceV2.amount}{" "}
                        {order.node.totalPriceV2.currencyCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>
          <img src={loader} />
        </p>
      )}
    </Layout>
  )
}

export default Account
