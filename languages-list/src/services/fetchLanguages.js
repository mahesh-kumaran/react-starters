import http from "./httpService";

const apiEndPoint = "https://autonom8-react.herokuapp.com";

export function fetchLanguages() {
  return http.get(apiEndPoint);
}
