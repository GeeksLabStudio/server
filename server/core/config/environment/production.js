/**
 * Production specific configuration
 */
module.exports = {
  port: process.env.PORT || 24024,

  mongo: {
    url: 'mongodb://127.0.0.1/testServerData',
    options: {
      user: 'lolka1276',
      pass: 'PWNZ76555_nikogda_ne_ugadaesh',
      auth: {
        authdb: 'admin'
      }
    }
  }
}