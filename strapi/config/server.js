module.exports = ({ env }) => ({
  host: env('HOST', 'cultivating.biz'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
