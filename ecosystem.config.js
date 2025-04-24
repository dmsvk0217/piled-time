module.exports = {
  apps: [
    {
      name: "piled-server",
      script: "server/dist/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
