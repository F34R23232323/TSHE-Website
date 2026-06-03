import React, { useEffect, useState } from 'react'
import { Snowflake } from 'lucide-react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-snowflake float">
        <Snowflake size={48} color="#7ec8e3" strokeWidth={1.5} />
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <p className="loader-text">The SnowHaven Empire</p>
    </div>
  )
}
