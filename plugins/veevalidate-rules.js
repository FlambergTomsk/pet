import { defineRule, configure } from "vee-validate";
import { required, email, regex, confirmed, length, min, max, digits } from "@vee-validate/rules";

//Custom Rule: required_check
const requiredCheckValidator = (value) => {
  if (value !== true && value !== 1) {
    return false;
  }
  return !!String(value).trim().length;
};

export default defineNuxtPlugin((ctx) => {
  configure({
    generateMessage: (field) => {
      return ctx.$t(`validation.${field.rule.name}`, {
        field: field.field,
        params: field.rule.params[0], 
      });
    }
  });
  defineRule("email", email);
  defineRule("regex", regex);
  defineRule("confirmed", confirmed);
  defineRule("required", required);
  defineRule("required_check", requiredCheckValidator);
  defineRule("length", length);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("digits", digits);
});
