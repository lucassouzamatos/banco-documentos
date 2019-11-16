import { useSelector } from 'react-redux';

function useProfile() {
  return useSelector(state => state.user.profile);
}

export default useProfile;
