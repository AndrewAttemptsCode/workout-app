import { type Page } from "@playwright/test";
import NavBar from "./Navbar";
import HomePage from "./HomePage";

class PageManager {
  readonly page: Page;
  private readonly navbar: NavBar;
  private readonly homepage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(this.page);
    this.homepage = new HomePage(this.page);
  }

  nav() {
    return this.navbar;
  }

  home() {
    return this.homepage;
  }
}

export default PageManager;
