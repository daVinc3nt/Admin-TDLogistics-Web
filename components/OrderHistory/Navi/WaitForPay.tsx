import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
const WaitForPay = () => {
  return (
    <div>
        <DetailOrder
        rows={Object.values(Fakedata)}
        />
    </div>
  )
}

export default WaitForPay