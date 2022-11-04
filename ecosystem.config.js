const defaultConfig = {
  watch: true,
  exec_mode: "cluster",
  out_file: "logs/debug",
  error_file: "logs/error",
  env_development: {
    NODE_ENV: "development"
  },
  env_production: {
    NODE_ENV: "production"
  }
}


module.exports = {
  apps: [
    {
      ...defaultConfig,
      name: "API",
      script: 'server/app.js',
    },
    // {
    //   ...defaultConfig,
    //   name: "UI",
    //   script: 'app/',
    //   args: "ng serve",
    // }
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
