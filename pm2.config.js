if (process.env.NODE_ENV === "development") {
  module.exports = {
    apps: [
      {
        name: "api_dev",
        script: "tsnd --respawn -- index.ts",
        watch: false,
        time: false,
        log_file: "var/log/api_dev.log",
      },
    ],
  };
} else if (process.env.NODE_ENV === "production") {
  module.exports = {
    apps: [
      {
        name: "api",
        script: "node dist/index.js",
        watch: false,
        time: true,
        log_file: "var/log/api.log",
      },
    ],
  };
}
