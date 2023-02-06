import { Integration } from "@acme/typings";

export function generateRandomIntegration(i: number): Integration {
  // return {
  //   id: faker.datatype.uuid(),
  //   name: faker.commerce.product(),
  //   app: faker.helpers.arrayElement<IntegrationApp>(["discord", "slack"]),
  //   status: faker.helpers.arrayElement<IntegrationStatus>([0, 1, 2]),
  //   lastSentMessage: faker.lorem.words(),
  //   errorMessage: faker.lorem.words(),
  //   email: faker.internet.email(),
  // };
  return {
    app: "slack",
    email: "test@email.com",
    errorMessage: "Some Error",
    id: `${i}`,
    lastSentMessage: "Some Last Message",
    name: `Name ${i}`,
    status: 1,
  };
}
