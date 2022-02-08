export function getUserToken() {
  return localStorage?.getItem("token") || null;
}

export function getUserObj() {
  const user = localStorage.getItem("user") || "{}";
  const userData = JSON.parse(user);
  return userData;
}
