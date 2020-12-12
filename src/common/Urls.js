import Env from './Env';

const CURRENT_ENV = Env.CURR_ENV;

const BASE_URL = {
  LOCAL: '',
  STAGE: '',
  PREPROD: '',
  PROD: ''
};

// const OKRCENTRAL = `${BASE_URL[CURRENT_ENV]}`; (for dynamic calling)
const OKRCENTRAL = "https://okrcentral.github.io"



export const getOKRsAPI = () => ({
  GET_OKRS: `${OKRCENTRAL}/sample-okrs/db.json`
});

