const DEFAULT_CONVERTER = (value) => value;

const printError = (name, value, message) => {
  return {
    fieldName: name,
    fieldValue: value,
    errorMessage: message
  };
};

const exists = (value) => {
  switch (typeof value) {
    case `number`:
      return !Number.isNaN(value);
    case `string`:
      return value.length > 0;
    default:
      return value;
  }
};

const validateField = (data, fieldName, {required = false, converter = DEFAULT_CONVERTER, assertions = []}) => {
  const fieldValue = data[fieldName];

  if (!fieldValue && !required) {
    return [];
  }

  const errors = [];

  try {
    if (exists(fieldValue)) {
      const value = converter(fieldValue);
      // console.log(fieldName);
      // console.log(value);
      for (const assertion of assertions) {
        if (!assertion.assert(value)) {
          errors.push(printError(fieldName, fieldValue, assertion.message));
        }
      }
    } else if (required) {
      errors.push(printError(fieldName, fieldValue, `is required`));
    }

  } catch (e) {
    errors.push(printError(fieldName, fieldValue, e.message));
  }

  return errors;
};

const validate = (data, schema) => {
  const errors = [];

  for (const key of Object.keys(schema)) {
    for (const error of validateField(data, key, schema[key])) {
      errors.push(error);
    }
  }

  return errors;
};

module.exports = {
  validate
};
