import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
const Cancel = () => {
  return (
    <div>
        <DetailOrder
        rows={Object.values(Fakedata)}
        />
    </div>
  )
}

export default Cancel