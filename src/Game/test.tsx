import React, { useState, useEffect, useRef } from 'react'

export default () => {
  const [height, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if(ref.current)
    setHeight((ref.current as any).clientHeight)
  })

  return (
    <div ref={ref}>
      {height}
    </div>
  )
}