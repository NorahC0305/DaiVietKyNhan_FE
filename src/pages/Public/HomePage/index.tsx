import React from 'react'
import DetailInfo from './DetailInfo'
import CountDown from './CountDown'
import { IUser } from '@models/user/entity'

const HomePageClient = ({ user }: { user: IUser }) => {
  return (
    <div className='mt-7'>
      {!user.gender && !user.birthDate ? <DetailInfo /> :
        <CountDown />
      }

    </div>
  )
}

export default HomePageClient