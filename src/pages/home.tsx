import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  const history = useHistory()

  const loadIcon = () => {
    console.log('click to load')
    history.push('./result')
    parent.postMessage({ pluginMessage: { type: 'storage.loadIcon' } }, '*')
  }

  useEffect(() => {
    const brandIcon = document.getElementById('brand-icon')

    brandIcon.innerHTML =
      `<svg width="48" height="48" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.5772 37.6689L60.4163 31.8256C58.8079 28.8522 55.7022 27 52.3253 27H11.5182C2.81426 27 -2.7359 36.306 1.39148 43.9796L31.3272 99.636C36.5485 109.343 50.4619 109.321 55.6523 99.5971L85.7949 43.1251H110.968C112.705 43.1251 113.816 44.98 112.997 46.5145L92.7767 84.3968C91.911 86.0186 89.5899 86.0208 88.7211 84.4006L79.6336 67.4529L70.5163 84.5363L78.5966 99.6056C83.8092 109.327 97.736 109.314 102.93 99.5824L132.626 43.9472C136.721 36.2747 131.17 27 122.482 27H81.6855C78.2914 27 75.1729 28.871 73.5718 31.8678L45.4931 84.4256C44.6276 86.0456 42.3094 86.0489 41.4394 84.4313L21.0486 46.521C20.2232 44.9863 21.3332 43.1251 23.074 43.1251H46.8447C47.6889 43.1251 48.4654 43.5881 48.8675 44.3315L54.4821 54.7107L63.5772 37.6689Z" fill="url(#paint0_linear_286_251)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M85.8004 43.1251L85.8004 43.125L94.7749 27H108.326C123.427 27 133.081 43.0953 125.97 56.4176L115.544 75.951H97.2847L111.666 49.0086C113.088 46.3441 111.157 43.1251 108.137 43.1251H85.8004Z" fill="url(#paint1_linear_286_251)"/>
      <path d="M73.9073 31.2296L44.1624 86.8931H62.4222L85.8004 43.1251L91.4523 32.8013C93.4106 29.2242 97.164 27 101.242 27H80.9631C78.0109 27 75.2986 28.6259 73.9073 31.2296Z" fill="url(#paint2_linear_286_251)"/>
      <defs>
      <linearGradient id="paint0_linear_286_251" x1="66.9652" y1="27" x2="66.9652" y2="116.552" gradientUnits="userSpaceOnUse">
      <stop stop-color="#DB1B3E"/>
      <stop offset="1" stop-color="#F2691C"/>
      </linearGradient>
      <linearGradient id="paint1_linear_286_251" x1="92.9369" y1="27" x2="111.766" y2="40.4886" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A2162C"/>
      <stop offset="1" stop-color="#7E0C1E" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="paint2_linear_286_251" x1="81.3576" y1="27" x2="81.4009" y2="61.8416" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF9356"/>
      <stop offset="1" stop-color="#EA4D1C" stop-opacity="0"/>
      </linearGradient>
      </defs>
      </svg>
      `
      
  }, [])

  return (
    <div>
      <div className="title">
        <div id="brand-icon"></div>
        <h2>WPS Icon Exporter</h2>
      </div>
      <div className="load-btn">
        <Button
          block
          style={{ width: '160px' }}
          type="primary"
          onClick={loadIcon}
        >
          加载图标
        </Button>
      </div>
    </div>
  )
}

export default Home
