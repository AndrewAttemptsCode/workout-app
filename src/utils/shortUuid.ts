const shortUuid = () => {
  return crypto.randomUUID().split("-")[1];
};

export default shortUuid;
