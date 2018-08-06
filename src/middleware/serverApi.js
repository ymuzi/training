import axios from 'axios'

const API_DOMAIN = 'http://xly-wkop.xiaoniangao.cn/'
const axiosFetch = axios.create({
  baseURL: API_DOMAIN,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});

const callServerApi = (apiParams) => {
  const { endpoint, params } = apiParams
  return new Promise((resolve, reject) => {
    axiosFetch({
      method: 'POST',
      url: endpoint,
      data: params
    })
    .then(res => {
      if (res.data.ret === 1) {
        resolve(res)
      } else {
        reject(res.data.errMsg)
      }
    })
    .catch(res => {
      reject(JSON.stringify(res))
    })
  })
}

const serverApi = () => next => action => {
  if (!action.SERVER_API)
    return next(action);
  const { type, endpoint, params } = action.SERVER_API;
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint.');
  }
  if (typeof type !== 'string') {
    throw new Error('Specify a string type.');
  }
  if (typeof params !== 'object') {
    throw new Error('Specify a object params.');
  }

  const { normailzerFun } = action.SERVER_API;
  function actionWith(data) {
    const finalAction = { ...action, ...data };
    delete finalAction.SERVER_API;
    return finalAction;
  }
  next(actionWith({
    type: `${type}_REQ`,
    __api:{endpoint,params},
  }));
  callServerApi({ endpoint, params })
    .then(res => {
      const response = typeof (normailzerFun) !== 'undefined' ? normailzerFun(res.data) : res.data;

      next(actionWith({
        type: `${type}_SUC`,
        __api:{endpoint,params},
        response: response
      }));
    })
    .catch(errMsg => {
      next(actionWith({
        type: `${type}_FAI`,
        __api:{endpoint,params},
        errMsg
      }));
    });
}



export default serverApi