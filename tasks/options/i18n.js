module.exports = {

  // 'i18n': supports internationalization in Handlebars

  options: {
    preload: ['de', 'en'],
    lng: "<%= lng %>",
    fallbackLng: 'en',
    ns: {
      namespaces: [
        'main',
        'home',
        'catalog',
        'checkout',
        'my-account-login',
        'no-search-result',
        'mix-match',
        'my-account'
      ],
      defaultNs: 'main'
    }
  }

}