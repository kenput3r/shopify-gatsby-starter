/**
 * The default template for a single collection of products
 * Used by node to dynamically generate pages at build time
 * Shopify Theme Reference: theme/Templates/collection.liquid
 */
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Collection = ({ data }) => {
  return (
    <Layout>
      <h1>{data.shopifyCollection.title}</h1>
      {data.shopifyCollection.products.map(product => (
        <p key={product.id}>
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </p>
      ))}
    </Layout>
  )
}

export default Collection

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        title
        id
        handle
        description
        productType
        variants {
          shopifyId
          title
          price
          availableForSale
        }
        images {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
