// @ts-check

const {defineConfig, devices} = require('@playwright/test');
const {env} = require('./src/utils/env');

module.exports = defineConfig({
    testDir:'./tests',
    fullyParallel:true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['list'],['html',{open:'never'}]],
    use:{
        baseURL: env.baseUrl,
        testIdAttribute: 'data-test',
        trace: 'retain-on-failure',
        screenshort: 'only-on-failure',
    },
    projects:[{name: 'chromium' , use: {...devices['Dekstop Chrome']}},
   ],

})
