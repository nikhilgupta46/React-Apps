const LocalCache: any = {};

export const getCachedData = ({
  baseUrl,
  cacheTimeout,
}: {
  baseUrl: string;
  cacheTimeout: number;
}) => {
  return ({ searchItem, page = 1 }: { searchItem: any; page: number }) => {
    const keyStored = `${searchItem}-${page}`;
    if (
      !LocalCache[keyStored] ||
      Date.now() - LocalCache[keyStored]?.lastUpdated >= cacheTimeout
    ) {
      if (!(LocalCache[keyStored]?.data instanceof Promise)) {
        let promiseRef = new Promise((resolve, reject) => {
          fetch(`${baseUrl}${searchItem}`)
            .then((response) => response.json())
            .then((response) => {
              LocalCache[keyStored] = {
                data: response,
                lastUpdated: Date.now(),
              };
              resolve(response);
            })
            .catch((e) => reject(e));
        });
        LocalCache[keyStored] = {
          data: promiseRef,
          lastUpdated: Date.now(),
        };
      }
      return LocalCache[keyStored].data;
    } else {
      return Promise.resolve(LocalCache[keyStored].data);
    }
  };
};
