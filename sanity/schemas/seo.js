export default{
  name: 'seo',
  title: 'Seo',
  type: 'document',
  
  fields: [
    {
    name: 'metaTitle',
    title: 'Meta title',
    type: 'string'
  },
  {
    name: 'description',
    title: 'Description',
    type: 'string'
  },
  {
    name: 'openGraphImage',
    title: 'Open-graph image',
    type: 'string'
  },
  {
    name: 'canonicalUrl',
    title: 'Canonical URL',
    type: 'url'
  },
  {
    name: 'openGraphUrl',
    title: 'Open-graph URL',
    type: 'url'
  }

],
//make  the seo schema required
validation: Rule => Rule.required()
}