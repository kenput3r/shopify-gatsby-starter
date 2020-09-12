/**
 * The page for displaying the shop's collections
 * Shopify Theme Reference: theme/Templates/collections.liquid
 */
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"

const Collections = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        edges {
          node {
            handle
            shopifyId
            title
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <h1>Shop Collections</h1>
      {data.allShopifyCollection.edges.map(edge => (
        <div key={edge.node.shopifyId}>
          <Link to={`/collections/${edge.node.handle}`}>{edge.node.title}</Link>
        </div>
      ))}
    </Layout>
  )
}

export default Collections
