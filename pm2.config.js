if (process.env.NODE_ENV === "development") {
  module.exports = {
    apps: [
      {
        name: "api_dev",
        script: "tsnd --respawn -- server.ts",
        watch: false,
        time: false,
        log_file: "var/log/api_dev.log",
        env: {
          PORT: 3000,
        },
      },
    ],
  };
} else {
  module.exports = {
    apps: [
      {
        name: "api",
        script: "node dist/server.js",
        watch: false,
        time: true,
        log_file: "var/log/api.log",
        env_production: {
          PORT: 3000,
        },
      },
    ],
  };
}
