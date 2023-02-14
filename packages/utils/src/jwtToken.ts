import { JWTTokenClaims } from "@ustagil/typing";
import jwtDecode from "jwt-decode";
import { parseCookies } from "nookies";

export const jwtToken = () => {
  const { accessToken } = parseCookies();
  let decodedAccessToken: JWTTokenClaims | undefined;

  if (accessToken) decodedAccessToken = jwtDecode(accessToken);

  return { accessToken, decodedAccessToken };
};
