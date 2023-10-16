import jwt, { JwtPayload } from "jsonwebtoken";

export function getCookie(name: any) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function getTokenDecodedData() {
  const token: string = getCookie("token") ?? "";
  const secret: jwt.Secret = process.env.NEXT_PUBLIC_SECRET ?? "";
  let decodedData: string | JwtPayload = "Unknown";
  try {
    decodedData = jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
  }
  const name = typeof decodedData === "object" ? decodedData.name : "Unknown";
  const email = typeof decodedData === "object" ? decodedData.email : "Unknown";
  return [name, email]
}
