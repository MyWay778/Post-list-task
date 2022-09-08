type Param = [string, string | number];

const addSearchToUrl = (urlAdress: string, params: Param[]) => {
  const url = new URL(urlAdress);
  params.forEach(param => {
    const [name, value] = param;
    url.searchParams.append(name, String(value));
  });
  return url;
};

export default addSearchToUrl;
