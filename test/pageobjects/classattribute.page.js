const { $ } = require('@wdio/globals')
const Page = require('./page');

class ClassAttribute extends Page 
{

    /**
     * UI Objects
     */ 
    get tit_ClassAttribute () {
        return $("//h3[normalize-space()='Class Attribute']");
    }
    get btn_ClassAttribute () {
        return $("//button[contains(concat(' ', ' ', normalize-space(@class), ' '), ' btn-primary ')]");
    }

    /**
     * Functions
     */ 
    async SampleApp () {
        const title_ca = await this.tit_ClassAttribute.getText();
        return title_ca
    }
    async btn_SampleApp () {
        await this.btn_ClassAttribute.click();
    }
    async HandleAlert () {
        await browser.acceptAlert();
    }

    open () {
        return super.open();
    }
}

module.exports = new ClassAttribute();
