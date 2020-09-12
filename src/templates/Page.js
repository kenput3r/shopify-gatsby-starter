/**
 * The default template for a single page
 * Used by node to dynamically generate pages at build time
 * Shopify Theme Reference: theme/Templates/page.liquid
 */
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import HTML from "../components/HTML"

const Page = ({ data }) => {
  const { shopifyPage: page } = data
  return (
    <Layout>
      <h1>{page.title}</h1>
      <HTML body={page.body} />
    </Layout>
  )
}

export default Page

export const query = graphql`
  query($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      id
      title
      body
    }
  }
`
