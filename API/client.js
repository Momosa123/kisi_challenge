const sanityClient = require('@sanity/client')
const dotenv = require('dotenv')
dotenv.config()

export default  sanityClient({
  projectId: 'm6zlsgmg',
  dataset: 'production',
  apiVersion: '2022-07-14', // use current UTC date - see "specifying API version"!
  token: 'process.env.SANITY_API_TOKEN', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})