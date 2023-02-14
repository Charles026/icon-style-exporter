import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/about')
  }



  return (
    <div>
      <h2>WPS Icon Exporter</h2>
      <Button onClick={handleClick}>跳转 About 页</Button>
      <Button
          block
          style={{ width: '160px' }}
          type="primary"
        >加载图标</Button>
    </div>
  )
}

export default Home
