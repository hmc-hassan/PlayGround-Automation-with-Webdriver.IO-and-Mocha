const fs = require('fs');
const { default: allure } = require('@wdio/allure-reporter');

/**
 * Function to capture screenshot and attach to Allure report.
 * @param {string} screenshotPath Path where screenshot will be saved.
 * @param {string} attachmentName Name of the attachment in Allure report.
 * @param {string} attachmentType Type of the attachment (e.g., 'image/png').
 */
async function captureAndAttachScreenshot(screenshotPath, attachmentName, attachmentType = 'image/png') {
    await browser.saveScreenshot(screenshotPath);
    const screenshotBuffer = fs.readFileSync(screenshotPath);
    allure.addAttachment(attachmentName, screenshotBuffer, attachmentType);
}

module.exports = {
    captureAndAttachScreenshot
};
