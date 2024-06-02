# Mobile Automation Testing - Demo Application
This project was created to complete the QAE Take Home Test assignment using JavaScript, WebDriverIO, and Mocha.

## How to set up and run the code
- Clone this repo
- Run `npm i`
- Change the `deviceName` and `platformVersion` in `wdio.conf.js` file according to the virtual device that will be used
- Run `appium -p 4727` on your terminal to start Appium server
- Run `npx wdio wdio.conf.js` to run the test
