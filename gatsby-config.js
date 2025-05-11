module.exports = {
  siteMetadata: {
    title: 'sangkyu.wernicke',
    description: `sangkyu.wernicke`,
    author: 'Sangkyu',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-code-notes',
      options: {
        contentPath: 'notes',
        basePath: '/',
        showThemeInfo: true,
        showDescriptionInSidebar: true,
        showDate: true,
        // gitRepoContentPath: 'https://github.com/mrmartineau/gatsby-starter-code-notes/tree/master/notes',
        // openSearch: {
        //   siteShortName: `My Code Notes`,
        //   siteUrl: 'https://my-website.com',
        //   siteTags: 'code',
        //   siteContact: 'https://twitter.com/???',
        //   siteDescription:
        //     'Code Notes',
        // },
      },
    },
  ],
}
