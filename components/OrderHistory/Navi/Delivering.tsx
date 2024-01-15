import React from 'react'
import DetailOrder from './DetailOrder'
import Fakedata from './FakeData'
Fakedata
const Delivering = () => {
  return (
    <div >
        <DetailOrder 
        rows={Object.values(Fakedata)}
        />
    </div>
  )
}

export default Delivering