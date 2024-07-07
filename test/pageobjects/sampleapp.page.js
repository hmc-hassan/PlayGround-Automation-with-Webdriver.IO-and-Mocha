const { $ } = require('@wdio/globals')
const Page = require('./page');

class SampleAppPage extends Page 
{

    /**
     * UI Objects
     */ 
    get tit_SampleApp () {
        return $("div[class='container'] h3");
    }
    get ipt_UserName () {
        return $("//input[@name='UserName']");
    }
    get ipt_Password() {
        return $("//input[@name='Password']");
    }
    get btn_Login() {
        return $("//button[@id='login']"); 
    }
    get clr_LoginStatus() {
        return $("//label[@id='loginstatus']");
    }


    /**
     * Functions
     */ 
    async SampleApp () {
        const title_sa = await this.tit_SampleApp.getText();
        return title_sa
    }

    async Login (UserName, Password) {
        await this.ipt_UserName.setValue(UserName);
        await this.ipt_Password.setValue(Password);
        await this.btn_Login.click();
    }

    async Logout () {
        await this.btn_Login.click();
    }

    async ValidateLogin () {
        const Logintext = await this.clr_LoginStatus
        const color = await Logintext.getCSSProperty('color')
        return color;
    }


    open () {
        return super.open();
    }
}

module.exports = new SampleAppPage();
