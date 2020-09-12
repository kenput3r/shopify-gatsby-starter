const path = require("path")

/**
 * Creates Product pages, Collection Pages
 */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const products = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `)

  products.data.allShopifyProduct.edges.forEach(({ node: { id, handle } }) => {
    createPage({
      path: `/products/${handle}`,
      component: path.resolve("./src/templates/Product.js"),
      context: {
        id,
        handle,
      },
    })
  })

  const collections = await graphql(`
    query allShopifyCollection {
      allShopifyCollection {
        nodes {
          id
          handle
        }
      }
    }
  `)

  collections.data.allShopifyCollection.nodes.forEach(({ id, handle }) => {
    createPage({
      path: `/collections/${handle}`,
      component: path.resolve("./src/templates/Collection.js"),
      context: {
        id,
        handle,
      },
    })
  })

  const pages = await graphql(`
    query allShopifyPage {
      allShopifyPage {
        nodes {
          handle
          id
        }
      }
    }
  `)

  pages.data.allShopifyPage.nodes.forEach(({ id, handle }) => {
    createPage({
      path: `/pages/${handle}`,
      component: path.resolve("./src/templates/Page.js"),
      context: {
        id,
        handle,
      },
    })
  })

  const blogs = await graphql(`
    query allShopifyBlog {
      allShopifyBlog {
        nodes {
          handle
          id
          title
        }
      }
    }
  `)

  blogs.data.allShopifyBlog.nodes.forEach(({ id, handle, title }) => {
    createPage({
      path: `/blogs/${handle}`,
      component: path.resolve("./src/templates/Blog.js"),
      context: {
        id,
        handle,
        title,
      },
    })
  })

  const articles = await graphql(`
    query allShopifyArticle {
      allShopifyArticle {
        nodes {
          blog {
            handle
          }
          handle
          id
        }
      }
    }
  `)

  articles.data.allShopifyArticle.nodes.forEach(({ id, handle, blog }) => {
    createPage({
      path: `/blogs/${blog.handle}/${handle}`,
      component: path.resolve("./src/templates/Article.js"),
      context: {
        id,
        handle,
      },
    })
  })
}
