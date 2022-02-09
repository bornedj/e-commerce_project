// if the window is undefined we are on the server
export const isServer = () => {
  return typeof window === "undefined";
};
