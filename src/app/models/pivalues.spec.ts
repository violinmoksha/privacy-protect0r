import { PIValues } from './pivalues';

describe('PIValues', () => {
  let piValues = new PIValues();

  it('should create an instance', () => {
    expect(piValues).toBeTruthy();
  });

  it('should have a string as first_name', () => {
    expect(typeof(piValues.first_name)).toEqual("string");
  });

  // ...
});
