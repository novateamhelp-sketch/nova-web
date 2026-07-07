/** Top-level pages whose hero media should show through the fixed header at scroll top. */
export const isHeroHeaderRoute = (pathname: string) =>
  pathname === "/" ||
  pathname === "/services" ||
  pathname === "/projects" ||
  pathname === "/about" ||
  pathname === "/service-areas" ||
  pathname === "/contact";
