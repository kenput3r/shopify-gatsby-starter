/**
 * The default template for a single blog
 * Used by node to dynamically generate pages at build time
 * Shopify Theme Reference: theme/Templates/blog.liquid
 */
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Blog = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      {/* Use the first posts blog title */}
      <h1>{data.allShopifyArticle.edges[0].node.blog.title}</h1>
      {data.allShopifyArticle.edges.map(edge => (
        <div key={edge.node.id}>
          <h2>{edge.node.title}</h2>
          <p>{edge.node.excerpt}</p>
          <p>
            <Link to={`/blogs/${edge.node.blog.handle}/${edge.node.handle}`}>
              continue reading
            </Link>
          </p>
        </div>
      ))}
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query($handle: String!) {
    allShopifyArticle(filter: { blog: { handle: { eq: $handle } } }) {
      edges {
        node {
          id
          title
          handle
          excerpt
          blog {
            title
            handle
          }
        }
      }
    }
  }
`
