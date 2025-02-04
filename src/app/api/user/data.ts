import { faker } from '@faker-js/faker';

const mock = Array.from({ length: 500 }, (_, index) => ({
  id: index + 1,
  email: faker.internet.email(),
  username: faker.internet.username(),
  gender: faker.helpers.arrayElement(['M', 'F']),
  age: faker.number.int({ min: 18, max: 60 }),
}));

export const users = mock;
