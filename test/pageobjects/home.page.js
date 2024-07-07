const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page 
{

    /**
     * UI Objects
     */ 

    get btn_SampleApp () {
        return $("a[href='/sampleapp']");
    }
    get btn_Home () {
        return $("//a[normalize-space()='Home']");
    }
    get tit_Home () {
        return $("//h1[@id='title']");
    }
    get btn_classattribute () {
        return $("//a[normalize-space()='Class Attribute']");
    }


    /**
     * Functions
     */ 
    async click_Home () {
        await this.btn_Home.click();
        const title = await this.tit_Home.getText();
        return title
    }

    async click_SampleApp () {
        await this.btn_SampleApp.click();
    }
    async click_ClassAttribute() {
        await this.btn_classattribute.click();
    }
    open () {
        return super.open();
    }
}

module.exports = new HomePage();
