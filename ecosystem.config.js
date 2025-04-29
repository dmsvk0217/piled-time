module.exports = {
  apps: [
    {
      name: "piled-server",
      script: "./dist/main.js",
      cwd: "./server",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      log_file: "./logs/combined.log",
    },
  ],
};
