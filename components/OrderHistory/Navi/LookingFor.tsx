import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
const LookingFor = () => {
  return (
    <div>
        <DetailOrder
        rows={Object.values(Fakedata)}
        />
    </div>
  )
}

export default LookingFor