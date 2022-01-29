import { FieldResponse } from "../generated/graphql";

export const toErrorMap = (errors: FieldResponse[]) => {
  const errMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errMap[field] = message;
  });
  return errMap;
};
