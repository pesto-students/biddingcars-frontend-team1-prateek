const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // next.js config
  images: {
    domains: ['res.cloudinary.com'],
  },
})