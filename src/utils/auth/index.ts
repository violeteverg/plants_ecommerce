import { jwtVerify, compactVerify } from "jose";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    if (!verified) {
      return undefined;
    } else {
      return verified;
    }
  } catch {
    return undefined;
  }
};

// export const checkUserLogin = async () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("Authentication")?.value;
//   const user = token && (await verifyAuth(token));

//   return user;
// };
