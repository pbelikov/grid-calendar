import { GridCalendarPage } from './app.po';

describe('grid-calendar App', () => {
  let page: GridCalendarPage;

  beforeEach(() => {
    page = new GridCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
