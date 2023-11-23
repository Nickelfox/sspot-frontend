export const convertArrayToMap = (resourceArray) => {
  const resourceMap = new Map();
  resourceArray.forEach((resource) => {
    if (resourceMap.has(resource?.id)) {
      resourceMap.set(resource?.id, {
        ...resourceMap.get(resource?.id),
        resource
      });
    } else {
      resourceMap.set(resource?.id, resource);
    }
  });
  return resourceMap;
};
