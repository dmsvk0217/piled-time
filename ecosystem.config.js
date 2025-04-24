module.exports = {
  apps: [
    {
      name: "piled-server",
      script: "server/dist/main.js",
      env: {
        NODE_ENV: "prod",
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
