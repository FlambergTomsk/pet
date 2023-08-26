import { defineRule, configure } from "vee-validate";
import {
  required,
  confirmed,
  email,
  regex,
  length,
  max,
  min
} from "@vee-validate/rules";
import i18n from "./i18n";

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
  defineRule("length", length);
  defineRule("min", min);
  defineRule("max", max);
});


// //Custom Rule: required_check
// const requiredCheckValidator = (value) => {
//   if (value !== true && value !== 1) {
//     return false;
//   }
//   return !!String(value).trim().length;
// };

// //Custom Rule: required_checklist
// const requiredCheckListValidator = (value) => {
//   if (
//     (Array.isArray(value) && value.length) ||
//     (!Array.isArray(value) && (value || value === 0))
//   ) {
//     return false;
//   }
//   return !!String(value).trim().length;
// };
// defineRule("min", min);
// defineRule("max", max);
// defineRule("email", email);
// defineRule("regex", regex);
// defineRule("required", required);
// defineRule("required_check", requiredCheckValidator);
// defineRule("required_checklist", requiredCheckListValidator);
// defineRule("confirmed", confirmed);
// defineRule("length", length);

// configure({
//   validateOnBlur: true,
//   validateOnChange: true,
//   validateOnInput: true,
//   validateOnModelUpdate: true,
//   generateMessage: (field) => {
//     return i18n.global.t(`validation.${field.rule.name}`, {
//       field: field.field,
//       height: field.rule.params[1],
//       length: field.rule.params[0],
//       min: field.rule.params[0],
//       max:
//         field.rule.name === "between"
//           ? field.rule.params[1]
//           : field.rule.params[0],
//       size: field.rule.params[0],
//       width: field.rule.params[0]
//     });
//   }
// });
