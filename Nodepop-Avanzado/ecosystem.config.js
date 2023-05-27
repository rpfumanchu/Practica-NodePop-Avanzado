module.exports = {
  apps: [
    {
      name: "nodepop",
      script: "npm",
      args: "run dev",
      interpreter: "none",
      env_development: {
        NODE_ENV: "development",
      },
      log_date_format: "YYYY-MM-DD HH:mm",
    },
    {
      name: "thumbnail",
      cwd: "../Nodepop-Avanzado/microService",
      script: "thumbnail.js",
      interpreter: "node",
      log_date_format: "YYYY-MM-DD HH:mm",
    },
    {
      name: "mortgage",
      cwd: "../mortgage-calculator",
      script: "bin/www",
      interpreter: "node",
      log_date_format: "YYYY-MM-DD HH:mm",
    },
    {
      name: "localtunnel",
      cwd: "../mortgage-calculator",
      script: "npm",
      args: "run localtunnel",
      interpreter: "none",
      log_date_format: "YYYY-MM-DD HH:mm",
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
