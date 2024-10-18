import path from 'path';

const handlersCache = {};

/**
 * Middleware resolver for routing handlers.
 *
 * This function resolves and caches request handlers based on the OpenAPI specification and
 * the defined route. It uses the OpenAPI operation ID and handler name to dynamically
 * import the correct handler module and invoke the appropriate handler function.
 *
 * @param {string} handlersPath - The base path where the handler modules are located.
 * @param {object} route - The route object containing information about the route.
 * @param {object} apiDoc - The OpenAPI specification document.
 * @returns {Function} - An Express middleware function that invokes the appropriate handler.
 */
const esmResolver = (handlersPath, route, apiDoc) => {
  const { basePath, expressRoute, openApiRoute, method } = route;
  const pathKey = openApiRoute.substring(basePath.length);
  const schema = apiDoc.paths[pathKey][method.toLowerCase()];
  const oId = schema['x-eov-operation-id'] || schema.operationId;
  const baseName = schema['x-eov-operation-handler'];

  const cacheKey = `${expressRoute}-${method}-${baseName}`;

  if (!handlersCache[cacheKey]) {
    if (oId && !baseName) {
      throw Error(
        `found x-eov-operation-id for route [${method} - ${expressRoute}]. x-eov-operation-handler required.`,
      );
    }
    if (!oId && baseName) {
      throw Error(
        `found x-eov-operation-handler for route [${method} - ${expressRoute}]. x-eov-operation-id required.`,
      );
    }
    if (oId && baseName && typeof handlersPath === 'string') {
      const modulePath = path.join(handlersPath, `${baseName}.js`);
      handlersCache[cacheKey] = import(modulePath);
    }
  }

  return async (req, res, next) => {
    try {
      const module = await handlersCache[cacheKey];
      if (!module[oId]) {
        throw Error(
          `Could not find 'x-eov-operation-handler' with id ${oId} in module '${baseName}'. Make sure operation '${oId}' defined in your API spec exists as a handler function in '${baseName}'.`,
        );
      }
      await module[oId](req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default esmResolver;
