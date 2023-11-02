import { FieldsByTypeName } from 'graphql-parse-resolve-info';
import { randomBytes, createHash } from 'crypto';
import { generate } from 'otp-generator';

export const castNestedSelectables = (obj: FieldsByTypeName[any]) => {
  const result = {};

  for (const key in obj) {
    const currentObject = obj[key];

    if (
      currentObject.fieldsByTypeName &&
      Object.keys(currentObject.fieldsByTypeName).length !== 0
    ) {
      result[key] = {
        select: castNestedSelectables(Object.values(currentObject.fieldsByTypeName)[0]),
      };
    } else {
      result[key] = true;
    }
  }

  return result;
};

export const generateRandomString = (bytes = 32): string => {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
  const randomString = randomBytes(bytes).toString('hex');

  return `${timestamp}-${randomString}`;
};

export const hashViaCrypto = (credential: string): string => {
  return createHash('sha256').update(credential).digest('hex');
};

export const generateOTP = (lenght = 6): string => {
  return generate(lenght, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: true,
    specialChars: false,
  });
};
