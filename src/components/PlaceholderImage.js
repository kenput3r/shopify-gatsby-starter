import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const PlaceholderImage = () => {
  const data = useStaticQuery(graphql`
    query {
      PlaceholderImage: file(relativePath: { eq: "placeholder.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img
      fluid={data.PlaceholderImage.childImageSharp.fluid}
      alt="a contextless placeholder image"
    />
  )
}

export default PlaceholderImage
