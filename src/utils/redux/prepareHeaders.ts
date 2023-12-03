import CryptoJS from "crypto-js";

export const prepareHeaders = (headers: Headers) => {
  const userData = JSON.parse(localStorage.getItem("mainUserData") || "{}");

  if (userData && userData.password) {
    const bytesPassword = CryptoJS.AES.decrypt(
      userData.password,
      import.meta.env.VITE_CRYPT_KEY,
    );
    const password = bytesPassword.toString(CryptoJS.enc.Utf8);

    const credentials = `${userData.email}:${password}`;
    const encodedCredentials = btoa(credentials);

    headers.set("Authorization", `Basic ${encodedCredentials}`);
    return headers;
  }
};
