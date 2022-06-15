import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootDispatch } from 'store/store';
import actionCreators from 'store/actionCreators';

const useActions = () => {
  const dispatch = useDispatch<RootDispatch>();
  return bindActionCreators(actionCreators, dispatch);
};

export default useActions;
