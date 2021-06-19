module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/networks',
        permanent: true,
      },
    ];
  },
};
