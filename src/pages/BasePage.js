class BasePage{
/** @param {import('@playwright/test').page}.page */

constructor(page){
    this.page = page;
    this.navSignIn = page.getByTestId('nav-sign-in');
    this.navMenu = page.getByTestId('nav-menu');
    this.navSignOut = page.getByTestId('nav-sign-out');
    this.pageTitle = page.getByTestId('page-title'); 
}

async open(path){
    await this.page.goto(path);
}

async logout() {
  await this.navMenu.click();
  await this.navSignOut.click();
}


}
module.exports ={BasePage};