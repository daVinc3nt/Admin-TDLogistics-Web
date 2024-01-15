import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata2 from './FakeData2'
const Received = () => {
  return (
    <div>
        <DetailOrder
        rows={Object.values(Fakedata2)}
        />
    </div>
  )
}

export default Received