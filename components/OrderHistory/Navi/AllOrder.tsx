import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
const AllOrder = () => {
  return (
    <div>
        <DetailOrder
        rows={Object.values(Fakedata)}
        />
    </div>
  )
}

export default AllOrder