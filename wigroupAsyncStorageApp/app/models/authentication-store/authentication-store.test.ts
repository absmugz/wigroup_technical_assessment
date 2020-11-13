import { AuthenticationStoreModel, AuthenticationStore } from "./authentication-store"

test("can be created", () => {
  const instance: AuthenticationStore = AuthenticationStoreModel.create({})

  expect(instance).toBeTruthy()
})