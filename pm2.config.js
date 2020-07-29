module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "./backend",
      script: "npm run dev",
      watch: false,
      log_file: "backend.log",
      time: false,
    },
  ],
};
