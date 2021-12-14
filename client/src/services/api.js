import * as axios from "axios";

const base_url = "http://localhost:3001/api";

export function GetHeader() {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  if (userToken) {
    let headers = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    };

    return headers;
  }

  return "";
}

export const GetStores = async () => {
  const result = await axios.default.get(`${base_url}/Store`);

  if (result.status === 200 && result.data["status"] === 200)
    return result.data["payload"];

  throw Error(result.data["error"] || result.statusText);
};

export const GetReservations = async () => {
  const headers = GetHeader();

  const result = await axios.default.get(`${base_url}/Reservation`, {
    headers,
  });

  if (result.status === 200 && result.data["status"] === 200)
    return result.data["payload"];

  throw Error(result.data["error"] || result.statusText);
};

export const AddReservation = async (model) => {
  const result = await axios.default.post(`${base_url}/Reservation`, model);

  if (result.status === 201 && result.data["status"] === 200)
    return result.data["payload"];

  throw Error(result.data["error"] || result.statusText);
};

export const RemoveReservation = async (id) => {
  const result = await axios.default.delete(`${base_url}/Reservation/${id}`);

  if (result.status === 200) return true;

  return false;
};

export const Login = async (username, password) => {
  const result = await axios.default.post(`${base_url}/Auth/Login`, {
    username,
    password,
  });

  if (result.status === 201) return result.data;
};

export const SignUp = async (model) => {
  const result = await axios.default.post(`${base_url}/User`, model);

  if (result.status === 201 && result.data["status"] === 200)
    return result.data["payload"];

  throw Error(result.data["error"] || result.statusText);
};
