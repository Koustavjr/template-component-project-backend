module.exports = {
    apps: [{
        name: "registry-api",
        script: "./dist/index.js",
        instances: 2,
        exec_mode: "cluster",
        wait_ready: true,
        listen_timeout: 3000,
        env: {
            NODE_ENV: "production",
            PORT: 5000
        }
    }]
}