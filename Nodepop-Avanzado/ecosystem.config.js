module.exports = {
  apps: [
    {
      name: "nodepop",
      script: "bin/www",
      watch: ".",
      // env_production: {
      //   NODE_ENV: "production",
      //   PORT: 80,
      // },
      env_development: {
        NODE_ENV: "development",
      },
      log_date_format: "YYYY-MM-DD HH:mm",
    },
    {
      name: "thumbnail",
      cwd: "../Nodepop-Avanzado/microService",
      script: "thumbnail.js",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
