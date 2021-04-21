import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import { fetchUser } from 'api/user'
import { getUser } from 'store/user';

import Wrapper from 'components/shared/wrapper'

const Home = () => {
  
  const dispatch = useDispatch()
  const userState = useSelector(getUser)

  useEffect(() => {
    dispatch(fetchUser(1))
  }, [dispatch])

  const { pending, error, user } = userState

    
    return (
      <Wrapper>
        {pending && <div>loading...</div>}
        {error && <div>error</div>}
        {user && (
        <>
            <div>{user.email}</div>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.phone}</div>
        </>
        )}   
      </Wrapper>
  )
}

export default Home;
