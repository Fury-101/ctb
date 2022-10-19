module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6a50474cbc6d9b25424c4de1a79f8a8c'),
  },
});
