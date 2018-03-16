import { P3TravelCompPage } from './app.po';

describe('p3-travel-comp App', () => {
  let page: P3TravelCompPage;

  beforeEach(() => {
    page = new P3TravelCompPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
