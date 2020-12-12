import Proteus from '../common/Proteus';
import { getOKRsAPI } from '../common/Urls';

export const getOkrs = () => {
  return Proteus().get(getOKRsAPI().GET_OKRS);
};
