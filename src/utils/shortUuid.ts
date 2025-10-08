import { nanoid } from "nanoid";

const shortUuid = () => {
  return nanoid().slice(0, 4);
};

export default shortUuid;
