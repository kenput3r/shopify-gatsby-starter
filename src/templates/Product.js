/**
 * The default template for a single product
 * Used by node to dynamically generate pages at build time
 * Shopify Theme Reference: theme/Templates/product.liquid
 */
import React, { useState, useContext } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PlaceholderImage from "../components/PlaceholderImage"
import { CartContext } from "../context/CartContext"

const Product = ({ data }) => {
  const { shopifyProduct: product } = data
  const { addProductToCart } = useContext(CartContext)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0].shopifyId
  )
  const [quantity, setQuantity] = useState(1)
  return (
    <Layout>
      <SEO title={product.title} />
      {product.images[0] ? (
        <Img
          fixed={product.images[0].localFile.childImageSharp.fixed}
          alt={product.images[0].altText}
        />
      ) : (
        <PlaceholderImage />
      )}
      <h1>{product.title}</h1>
      {product.priceRange.minVariantPrice.amount !==
      product.priceRange.maxVariantPrice.amount ? (
        <p>
          ${product.priceRange.minVariantPrice.amount} - $
          {product.priceRange.maxVariantPrice.amount}
        </p>
      ) : (
        <p>${product.priceRange.minVariantPrice.amount}</p>
      )}
      {product.variants.length > 1 ? (
        <div>
          <select onChange={event => setSelectedVariant(event.target.value)}>
            {product.variants.map(variant => (
              <option value={variant.shopifyId} key={variant.id}>
                {variant.title} - {variant.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            onChange={event => setQuantity(parseInt(event.target.value))}
          />
          <button onClick={() => addProductToCart(selectedVariant, quantity)}>
            ADD TO CART
          </button>
        </div>
      ) : (
        <div>
          <input type="number" />
          <button onClick={() => addProductToCart(selectedVariant, quantity)}>
            ADD TO CART
          </button>
        </div>
      )}
    </Layout>
  )
}

export default Product

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      handle
      title
      productType
      priceRange {
        minVariantPrice {
          currencyCode
          amount
        }
        maxVariantPrice {
          currencyCode
          amount
        }
      }
      description
      variants {
        id
        shopifyId
        title
        price
        sku
        availableForSale
      }
      images {
        id
        altText
        localFile {
          childImageSharp {
            fixed(width: 400) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`
