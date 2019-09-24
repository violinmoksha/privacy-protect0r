import { PIMenu } from './pimenu';

describe('PIMenu', () => {
  let piMenu = new PIMenu();

  it('should create an instance', () => {
    expect(piMenu).toBeTruthy();
  });

  it('should have a string as guid', () => {
    expect(typeof(piMenu.guid)).toEqual("string");
  });

  // ...
});
