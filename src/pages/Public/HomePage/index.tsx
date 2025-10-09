import React from 'react'
import DetailInfo from './DetailInfo'
import CountDown from './CountDown'

const HomePageClient = ({ session }: { session: UTILS.ISession }) => {
  return (
    <div className='mt-7'>
      {!session.user.gender && !session.user.birthDate ? <DetailInfo /> :
        <CountDown />
      }
      
    </div>
  )
}

export default HomePageClient