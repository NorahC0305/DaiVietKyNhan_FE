"use client";

import React from 'react'
import DetailInfo from './DetailInfo'
import CountDown from './CountDown'
import { IUser } from '@models/user/entity'
import { IGetSystemConfigWithAmountUserResponse } from '@models/system/response'

interface HomePageClientProps {
  user: IUser
  activeWithAmountUser: IGetSystemConfigWithAmountUserResponse
  accessToken: string
}

const HomePageClient = ({ user, activeWithAmountUser, accessToken }: HomePageClientProps) => {
  return (
    <div className='mt-7'>
      {!user?.gender && !user?.birthDate ? <DetailInfo /> :
        <CountDown activeWithAmountUser={activeWithAmountUser} accessToken={accessToken} />
      }

    </div>
  )
}

export default HomePageClient