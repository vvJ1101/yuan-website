module.exports = {
  apps: [{
    name: 'yuan-website',
    script: 'node_modules/.bin/next',
    args: 'start -p 3002',
    max_memory_restart: '300M',
  }]
}
