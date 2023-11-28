'use client'

import React, { ChangeEvent, useEffect, forwardRef, useState } from 'react'
import axios from 'axios'
import { IDiary } from '../types/type'
import { useSearchParams } from 'next/navigation'
import DiaryLayout from './_component/DiaryLayout'
import Pagination from './_component/Pagination'
import { useSession } from 'next-auth/react'
import NoResult from './_component/NoResult'
import LottieCat from '@/app/components/LottieCat'

const Search = () => {
  const { data: session, status } = useSession()
  const params = useSearchParams()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(6)
  const [view, setView] = useState<IDiary[]>([])
  const [userImg, setUserImg] = useState('')
  const [search, setSearch] = useState(false)
  const [loading, setLoading] = useState(true)
  const curPage = params.get('page') as string

  const keyword = params.get('keyword') as string

  useEffect(() => {
    setPage((prev) => Number(curPage))
  }, [curPage])

  const getDiary = async () => {
    if (status === 'authenticated') {
      setLoading(true)
      const result = await axios.get(
        `/api/search?userId=${session.user?.id}&keyword=${keyword}&page=${curPage}`,
      )
      const data = result.data
      setTotal((prev) => data.total)
      setView((prev) => data.result)
      setUserImg((prev) => data.userImage)
      data.result.length != 0 ? setSearch(true) : setSearch(false)
      setLoading(false)
    }
  }
  useEffect(() => {
    getDiary()
  }, [keyword, session])

  return loading ? (
    <LottieCat text={'읽어오고 있어요'} />
  ) : search ? (
    <div className="w-full mt-[100px] flex flex-col justify-center items-center">
      <div className=" h-[50px] rounded-md flex justify-around items-center self-start ml-[110px] mb-[50px]">
        <div>
          "{keyword}" 에 대한 검색 결과 ({total}개)
        </div>
      </div>
      <div className="flex flex-wrap w-[1280px] justify-start mt-[30px]">
        {view.map((data: IDiary, index: number) => (
          <DiaryLayout key={data.diary_number} data={data} userImg={userImg} />
        ))}
      </div>
      <Pagination total={total} limit={6} page={page} keyword={keyword} />
    </div>
  ) : (
    <NoResult />
  )
}
export default Search
