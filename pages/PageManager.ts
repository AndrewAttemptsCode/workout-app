import { type Page } from "@playwright/test";
import NavBar from "./Navbar";

class PageManager {
  private readonly page: Page;
  private readonly navbar: NavBar;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(this.page);
  }

  nav() {
    return this.navbar;
  }
}

export default PageManager;
