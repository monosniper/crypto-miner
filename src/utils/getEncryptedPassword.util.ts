import CryptoJS from "crypto-js";

export const getEncryptedPassword = () => {
  const mainUserData = JSON.parse(localStorage.getItem("mainUserData") || "{}");

  const bytesPassword = CryptoJS.AES.decrypt(
    mainUserData.password || "",
    import.meta.env.VITE_CRYPT_KEY || ""
  );
  const decryptedPassword = bytesPassword.toString(CryptoJS.enc.Utf8) || "";

  const encryptedPassword = CryptoJS.AES.encrypt(
    decryptedPassword,
    import.meta.env.VITE_CRYPT_KEY || ""
  ).toString();

  return encryptedPassword;
};
