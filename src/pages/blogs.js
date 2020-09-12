/**
 * The page for displaying the shop's blogs
 * Shopify Theme Reference: n/a
 */
import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"

const Blogs = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyBlog {
        edges {
          node {
            handle
            title
            shopifyId
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <h1>Shop Blogs</h1>
      {data.allShopifyBlog.edges.map(edge => (
        <div key={edge.node.shopifyId}>
          <Link to={`/blogs/${edge.node.handle}`}>{edge.node.title}</Link>
        </div>
      ))}
    </Layout>
  )
}

export default Blogs
