export const getCachedData = ({ baseUrl, cacheTimeout }) => {
  const Cache = {};

  return ({ searchItem, page = 1 }) => {
    const keyStored = `${searchItem}-${page}`;
    if (
      !Cache[keyStored] ||
      Date.now() - Cache[keyStored]?.lastUpdated >= cacheTimeout
    ) {
      if (!(Cache[keyStored]?.data instanceof Promise)) {
        let promiseRef = new Promise((resolve, reject) => {
          fetch(`${baseUrl}${searchItem}/${page}`)
            .then((response) => response.json())
            .then((response) => {
              Cache[keyStored] = {
                data: response,
                lastUpdated: Date.now(),
              };
              resolve(response);
            })
            .catch((e) => reject(e));
        });
        Cache[keyStored] = {
          data: promiseRef,
          lastUpdated: Date.now(),
        };
      }
      return Cache[keyStored].data;
    } else {
      return Promise.resolve(Cache[keyStored].data);
    }
  };
};
