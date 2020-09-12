/**
 * The default template for a single article
 * Used by node to dynamically generate pages at build time
 * Shopify Theme Reference: theme/Templates/article.liquid
 */
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Article = ({ data }) => {
  return (
    <Layout>
      <h1>{data.shopifyArticle.title}</h1>
      <p>
        <small>by {data.shopifyArticle.author.name}</small>
      </p>
      <div>{data.shopifyArticle.content}</div>
    </Layout>
  )
}

export default Article

export const query = graphql`
  query($handle: String!) {
    shopifyArticle(handle: { eq: $handle }) {
      author {
        name
      }
      content
      handle
      id
      title
    }
  }
`
