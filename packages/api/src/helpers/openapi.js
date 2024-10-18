import fs from 'fs';
import jsYaml from 'js-yaml';
import _ from 'lodash-es';
import yamlinc from 'yaml-include';

/**
 * Load and process an OpenAPI specification file.
 *
 * This function reads an OpenAPI specification YAML file, processes any included files
 * using the yaml-include library, and consolidates the included data into a single object.
 * This includes merging paths, schemas, requestBodies, and responses from included files.
 *
 * @param {string} filePath - The path to the OpenAPI specification YAML file.
 * @returns {object} - The processed OpenAPI specification as a JavaScript object.
 */
const loadSpec = (filePath) => {
  // Using https://github.com/cdimascio/express-openapi-validator/blob/master/src/framework/index.ts
  yamlinc.setBaseFile(filePath);

  const src = fs.readFileSync(yamlinc.basefile, 'utf8');

  const obj = jsYaml.load(src, { schema: yamlinc.YAML_INCLUDE_SCHEMA, filename: yamlinc.basefile });

  /**
   * Convert the !!include lists to a single object with all the elements
   * paths: [{ a, b }, { c, d }] => { a, b, c, d }
   * Same with other properties that use include data (schemas, etc)
   */
  const result = {
    ...obj,
    paths: Object.assign(..._(obj.paths).values().map('paths').value()),
    components: { ...obj.components },
  };

  // When using !!inc/dir, included schemas are inside an object with the name of folder
  // Example { /integration: [scheme1, scheme2], /inbox: [scheme3, scheme4] }
  const schemas = _(obj.components.schemas).values().map('schemas').value();
  const requestBodies = _(obj.components.requestBodies).values().map('requestBodies').value();
  const responses = _(obj.components.responses).values().map('responses').value();

  if (schemas.length) {
    result.components.schemas = Object.assign(...schemas);
  }

  if (requestBodies.length) {
    result.components.requestBodies = Object.assign(...requestBodies);
  }

  if (responses.length) {
    result.components.responses = Object.assign(...responses);
  }

  return result;
};

export default { loadSpec };
