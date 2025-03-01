import request from "./request";

export default {
  deepSeek: (params) => {
    return request({
      url: '/api/ai/deepseek',
      method: 'POST',
      data: params
    });
  },
};
