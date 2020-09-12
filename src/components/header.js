import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import shopifyLogo from "../images/shopify-logo.svg"
import gatsbyLogo from "../images/gatsby-logo.svg"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#ccc`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            display: `flex`,
            alignItems: `center`,
            textDecoration: `none`,
          }}
        >
          <img
            src={shopifyLogo}
            alt="Shopify"
            style={{ maxWidth: 200, marginBottom: 0 }}
          />
          <span style={{ padding: `0 10px` }}>+</span>
          <img
            src={gatsbyLogo}
            alt="Gatsby"
            style={{ maxWidth: 200, marginBottom: 0 }}
          />
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
