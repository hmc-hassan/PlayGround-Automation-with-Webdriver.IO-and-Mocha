const { expect } = require('@wdio/globals')
const SampleAppPage = require('../pageobjects/sampleapp.page')
const HomePage = require('../pageobjects/home.page')
const ClassAttributePage = require('../pageobjects/classattribute.page')
const { config } = require('../../wdio.conf');
const { captureAndAttachScreenshot } = require('../helpers/screenshot');
const { default: allure } = require('@wdio/allure-reporter');

const env = process.env.NODE_ENV || 'test';
const configs = require('../configs/environments.json')[env];
const { username, password } = configs;

describe('UI Test Automation Playground Suite', () => {
    it('TC-01: should land on Home Page and validate user has landed successully', async () => {
        try {
            await HomePage.open()
            let title = await HomePage.click_Home()
            expect(title).toBe(title);
            console.log(config.screenshotPath)
            await captureAndAttachScreenshot(config.screenshotPath, 'TC-01: After Actions Screenshot');
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            console.error('Error: should land on Home Page and validate user has landed successully', error);
        }
    })
   it('TC-02: should move to Sample App page and perform operations', async () => {
        try {
        await SampleAppPage.open();
        await HomePage.click_SampleApp()
        let title_sa = await SampleAppPage.SampleApp()
        expect(title_sa).toBe("Sample App");
        await SampleAppPage.Login(username,password)
        await captureAndAttachScreenshot(config.screenshotPath, 'TC-02: After Actions Screenshot 1');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const color = await SampleAppPage.ValidateLogin();
        let rgbastring = color.value;
        let rgbaValues = rgbastring.split('(')[1].split(')')[0];
        console.log(rgbaValues)
        if (rgbaValues.includes('40,167,69,1')) {
            console.log("Welcome " + username);
            await captureAndAttachScreenshot(config.screenshotPath, 'TC-02: After Actions Screenshot 2');
            await SampleAppPage.Logout();
            const color = await SampleAppPage.ValidateLogin();
            let rgbastring = color.value;
            let rgbaValues = rgbastring.split('(')[1].split(')')[0];
            console.log(rgbaValues)
            if (rgbaValues.includes('23,162,184,1')) {
                    console.log("User logged out.");
                    await captureAndAttachScreenshot(config.screenshotPath, 'TC-02: After Actions Screenshot 3');
                    await HomePage.click_Home();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }else {
                    console.log("No validation is performed");
                }
        } else if (rgbaValues.includes('220,53,69,1')) {
            console.warn("Error: Invalid username/password:");
            await captureAndAttachScreenshot(config.screenshotPath, 'TC-02: After Actions Screenshot 4');
            await HomePage.click_Home()
        } else {
            console.log("No validation is performed");
        }
        return Promise.resolve();
    } catch(error){
        console.error('Error: should move to Sample App page and perform operations', error);
    }
    })
    it.only('TC-03: should land on Class Attribute, Perform operations and validate user has landed successully', async () => {
        try {
            await ClassAttributePage.open()
            await HomePage.click_ClassAttribute()
            await new Promise(resolve => setTimeout(resolve, 1000));
            let title_ca = await ClassAttributePage.SampleApp()
            expect(title_ca).toBe("Class Attribute");
            if (title_ca !== 'Class Attribute') {
                allure.addStep('Title verification failed');
                await captureAndAttachScreenshot(config.screenshotPath, 'TC-04: After Actions Screenshot');
                allure.endStep('failed');
            }
            console.log(config.screenshotPath)
            await captureAndAttachScreenshot(config.screenshotPath, 'TC-04: After Actions Screenshot');
            await ClassAttributePage.btn_SampleApp()
            await new Promise(resolve => setTimeout(resolve, 1000));
            await ClassAttributePage.HandleAlert()
            await HomePage.click_Home()
            

        } catch (error) {
            console.error('Error: should land on Class Attribute, Perform operations and validate user has landed successully', error);
        }
    })
})

