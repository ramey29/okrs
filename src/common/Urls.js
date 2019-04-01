import Env from './Env';

const CURRENT_ENV = Env.CURR_ENV;

const BASE_URL = {
  LOCAL: '',
  STAGE: '',
  PREPROD: '',
  PROD: ''
};

const JOBLISTINGSERVICE = `${BASE_URL[CURRENT_ENV]}`;



export const getJoblistingAPI = () => ({
  GET_PEOPLE: `${JOBLISTINGSERVICE}/json/people.json`
});


