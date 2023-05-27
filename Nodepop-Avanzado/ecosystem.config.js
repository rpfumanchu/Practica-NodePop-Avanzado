module.exports = {
  apps: [
    {
      name: "nodepop",
      script: "npm",
      args: "run start",
      // watch: ".",
      interpreter: "none",
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
      // cwd: "../Nodepop-Avanzado/microService",
      // script: "thumbnail.js",
      script: "npm",
      args: "run micro",
      // watch: ".",
      interpreter: "none",
    },
    {
      name: "mortgage",
      cwd: "../mortgage-calculator",
      script: "npm",
      args: "run start",
      // watch: ".",
      interpreter: "none",
    },
    {
      name: "localtunnel",
      cwd: "../mortgage-calculator",
      script: "npm",
      args: "run localtunnel",
      // watch: ".",
      interpreter: "none",
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
