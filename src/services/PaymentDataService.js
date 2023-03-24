import http from "../http-common";

const getAll = () => {
    return http.get("/payments/");
  };
  const get = id => {
    return http.get(`/payments/${id}`);
  };
  const create = data => {
    return http.post("/payments/", data);
  };
  const update = (id, data) => {
    return http.put(`/payments/${id}`, data);
  };
  const remove = id => {
    return http.delete(`/payments/${id}`);
  };

const PaymentDataService =  {
      getAll,
      get,
      create,
      update,
      remove,
};

export default PaymentDataService;