import react from "react";
import axios from "axios";
export function PostToDataBase(url, data) {
    const rsp = axios.post(url, data).catch((error) => {
        console.log(`Error posting ${JSON.stringify(data)} to ${url}`);
        return null;
    });
    return rsp;
}
export function PutToDataBase(url, data) {
    const rsp = axios.put(url, data).catch((error) => {
        console.log(`Error updating ${JSON.stringify(data)} to ${url}`);
        return null;
    });
    return rsp;
}
export   function toLetters(num) {
    let letters = '';
    while (num >= 0) {
      letters = String.fromCharCode(num % 26 + 65) + letters;
      num = Math.floor(num / 26) - 1;
    }
    return letters;
  }
