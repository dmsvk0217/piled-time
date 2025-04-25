module.exports = {
  apps: [
    {
      name: "piled-server",
      script: "dist/main.js",
      cwd: "./server",
      env: {
        NODE_ENV: "prod",
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
