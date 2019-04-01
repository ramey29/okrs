import Proteus from '../common/Proteus';
import { getJoblistingAPI } from '../common/Urls';

export const getPeoples = () => {
  return Proteus().get(getJoblistingAPI().GET_PEOPLE);
};
