import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyPage {
        edges {
          node {
            title
            handle
            shopifyId
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to Shopify Gatsby Starter.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `150px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div>
        <Link to="/collections/all">All Products</Link>
      </div>
      <div>
        <Link to="/collections">Product Collections</Link>
      </div>
      <div>
        <Link to="/blogs">Blogs</Link>
      </div>
      {data.allShopifyPage.edges.map(edge => (
        <div key={edge.node.shopifyId}>
          <Link to={`/pages/${edge.node.handle}`}>{edge.node.title}</Link>
        </div>
      ))}
      <div>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <Link to="/account/">Account</Link>
      </div>
      <div>
        <Link to="/account/login">Sign In</Link>
      </div>
    </Layout>
  )
}
export default IndexPage
