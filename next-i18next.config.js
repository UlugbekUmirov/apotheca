const path = require('path');
module.exports = {
 i18n: {
  defaultLocale: 'uz',
  locales: ['uz', 'ru'],
  localeDetection: false,
 },
 serializeConfig: false,
 debug: false,
 localePath: path.resolve('./public/locales'),
};