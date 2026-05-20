import { type Page } from "@playwright/test";
import NavBar from "./Navbar";
import HomePage from "./HomePage";
import WorkoutsPage from "./WorkoutsPage";
import ExercisesPage from "./ExercisesPage";
import TimerPage from "./TimerPage";
import DashboardPage from "./DashboardPage";
import NotFoundPage from "./NotFoundPage";

class PageManager {
  readonly page: Page;
  private readonly navbar: NavBar;
  private readonly homepage: HomePage;
  private readonly workoutspage: WorkoutsPage;
  private readonly exercisespage: ExercisesPage;
  private readonly timerpage: TimerPage;
  private readonly dashboardpage: DashboardPage;
  private readonly notfoundpage: NotFoundPage;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBar(this.page);
    this.homepage = new HomePage(this.page);
    this.workoutspage = new WorkoutsPage(this.page);
    this.exercisespage = new ExercisesPage(this.page);
    this.timerpage = new TimerPage(this.page);
    this.dashboardpage = new DashboardPage(this.page);
    this.notfoundpage = new NotFoundPage(this.page);
  }

  nav() {
    return this.navbar;
  }

  home() {
    return this.homepage;
  }

  workouts() {
    return this.workoutspage;
  }

  exercises() {
    return this.exercisespage;
  }

  timer() {
    return this.timerpage;
  }

  dashboard() {
    return this.dashboardpage;
  }

  notFoundPage() {
    return this.notfoundpage;
  }
}

export default PageManager;
