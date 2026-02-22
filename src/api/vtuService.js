import API from "./axios";

export const buyAirtime = (data) =>
  API.post("/vtu/airtime", data);

export const buyData = (data) =>
  API.post("/vtu/data", data);

export const payElectricity = (data) =>
  API.post("/vtu/electricity", data);

export const payCable = (data) =>
  API.post("/vtu/cable", data);

export const getWallet = () =>
  API.get("/wallet");
