import { generateMock} from "@anatine/zod-mock";
import { z } from "zod";
import { faker } from "@faker-js/faker";

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  displayName: z.string(),
  role: z.enum(["Viewer", "Editor", "Admin"]),
});

const user = generateMock(UserSchema, {
  stringMap: {
    id: faker.datatype.uuid,
    displayName: faker.name.fullName,
  },
});

const user1 = generateMock(UserSchema, { seed: 1 }); // these two
const user2 = generateMock(UserSchema, { seed: 1 }); // are identical
const user3 = generateMock(UserSchema, { seed: 2 }); // but not this

console.log(user1);
console.log(user2);
console.log(user3);

// export const dataFactory =
//   <T extends z.ZodTypeAny>(schema: T) =>
//   (overrides?: Partial<z.infer<T>>, options?: GenerateMockOptions) =>
//   ({
//     ...generateMock(schema, options),
//     ...overrides,
//   });

export const dataFactory = (schema) => (overrides, options) => ({
  ...generateMock(schema, options),
  ...overrides,
});

const userFactory = dataFactory(UserSchema);

const tim = userFactory({ displayName: "Tim" });
const jenny = userFactory({ displayName: "Jenny", id: "55" });

// you can still use a seed and a faker string map
const paul = userFactory(
  { displayName: "Paul" },
  {
    seed: 1,
    stringMap: {
      id: faker.datatype.uuid,
    },
  }
);

console.log(paul);
