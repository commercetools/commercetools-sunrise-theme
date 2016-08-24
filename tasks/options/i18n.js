module.exports = {

  // 'i18n': supports internationalization in Handlebars

  options: {
    preload: "<%= languages %>",
    lng: "<%= lng %>",
    fallbackLng: 'en',
    ns: {
      namespaces: [
        'cms',
        'main',
        'banner',
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
