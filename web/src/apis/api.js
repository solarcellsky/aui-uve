import request from "./request";

export default {
  fetch: () => {
    return request({
      url: '/ai',
      method: 'get',
    });
  },
};
