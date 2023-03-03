import React from 'react'
import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Button } from 'antd'

const Result = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  // const onDownload = () => {
  //   parent.postMessage({ pluginMessage: {type:'storage.download'}}, '*')
  // }
  const iconStyle = '.colorBlackStroke{fill:#333840;}.colorGrayStroke{fill:#C3C3C3;}.colorGrayFill{fill:#D8D8D8;}.colorBlueStroke{fill:#0A7EDF;}.colorGreenStroke{fill:#00A660;}.colorOrangeStroke{fill:#EB6808;}.colorRedStroke{fill:#E44C4C;}';

  const mapData = {
    fillArr : ['fill="#333840"', 'fill="#C3C3C3"', 'fill="#D8D8D8"', 'fill="#0A7EDF"', 'fill="#00A660"', 'fill="#EB6808"', 'fill="#E44C4C"'],
    classArr : ['class="colorBlackStroke"', 'class="colorGrayStroke"', 'class="colorGrayFill"', 'class="colorBlueStroke"', 'class="colorGreenStroke"', 'class="colorOrangeStroke"', 'class="colorRedStroke"'],
  };


  const svgStringArr = [];

  let svgString: string


  // let iconNameArr = [];

  // const segment = document.getElementById('segment-control');

  onmessage = (event) => {
    console.log('receive msg')
    const msg = event?.data?.pluginMessage || {}
    const svgDataArr = msg?.svgDataArr || []
    const nodeIDArr = msg?.nodeIDArr || []
    const iconNameArr = msg?.iconNameArr || []
    // const nodeTypeArr = msg?.nodeTypeArr || []
    const iconList = document.getElementById('list-container')
    const count = document.getElementById('count')
    const error = document.getElementById('error')

    if (msg.type === 'load-icon') {

      for (let i = 0; i < iconNameArr.length; i++) {
        let svg = new TextDecoder().decode(svgDataArr[i])

      // 将颜色换成class
       for ( let i = 0; i < mapData.fillArr.length; i++ ){
       svg = svg.replace(RegExp(mapData.fillArr[i], 'g'), mapData.classArr[i])
       }

        // 将svg转为DOM
        const parser = new DOMParser()
        const svgDOM = parser.parseFromString(svg, 'image/svg+xml')
    
        // 获取SVG元素
        const svgElement = svgDOM.documentElement
  
        svgElement.removeAttribute('height');
        svgElement.removeAttribute('width');
      

        // 插入style
        const styleElement = svgDOM.createElement('style');
        styleElement.setAttribute('type','text/css');
        styleElement.innerHTML = iconStyle;
        svgElement.insertBefore(styleElement, svgElement.firstChild);

        const svgChildren = Array.from(svgElement.children).filter(child => child.tagName !== 'style');

        console.log(svgChildren);
        

        // // 去除fill-rule和clip-rule
        // const svgElementChildren = svgElement.getElementsByTagName('*');
        // for (let i = 0; i < svgElementChildren.length; i++) {
        //   if (svgElementChildren[i].getAttribute('fill-rule') || svgElementChildren[i].getAttribute('clip-rule')) {
        //     svgElementChildren[i].removeAttribute('fill-rule');
        //     svgElementChildren[i].removeAttribute('clip-rule');
        //   }
        // }

        // 去除defs
        const defs = Array.from(svgDOM.getElementsByTagName('defs'))

        if (defs) {
          for (const def of defs) {
            defs[0].parentNode.removeChild(def)
          }
        }
        svgString = new XMLSerializer().serializeToString(svgDOM);

        // 去除style中xmlns属性
        
        svgString = svgString.replace(/style xmlns=["'].*?["']/g, 'style');

        console.log(svgString)

        svgStringArr.push(svgString)

        const iconWrap = document.createElement('div')
        iconWrap.innerHTML =(svgString)
        iconWrap.classList.add('icon-wrapper')

        const iconItem = document.createElement('div')
        iconItem.appendChild(iconWrap)

        iconItem.classList.add('icon-list');
        iconItem.setAttribute('id', `${nodeIDArr[i]}`)
        iconItem.setAttribute('tabindex', `${[i]}`)

        const contentWrap = document.createElement('div')
        const iconName = document.createElement('div')
        const iconDesc = document.createElement('div')
        iconDesc.classList.add('icon-desc')
        iconDesc.setAttribute('id', `icon-desc${[i]}`)

        iconName.classList.add('icon-name')

        contentWrap.classList.add('content-wrapper')

        iconName.textContent = `${iconNameArr[i]}`

        contentWrap.appendChild(iconName)

        iconItem.appendChild(contentWrap);
        const errorMsg = document.createElement('span')
        errorMsg.classList.add('error-info')

        const viewBoxAttr = svgElement.getAttribute('viewBox');

        const viewBox16 = '0 0 16 16';
        const viewBox24 = '0 0 24 24';
        const viewBox12 = '0 0 12 12';
        const viewBox32 = '0 0 32 32';
        const viewBox48 = '0 0 48 48';

        const allowViewBox = [viewBox12,viewBox16,viewBox24,viewBox32,viewBox48]

        
        if(svgChildren.every(child => child.getAttribute('stroke')==null)){
          if (!allowViewBox.includes(viewBoxAttr) && svgChildren.some(child => !child.classList.length)) {
            errorMsg.textContent += `图标尺寸不正确；图标颜色不正确; `
            iconItem.classList.add('error-icon')
          }
          else if (!allowViewBox.includes(viewBoxAttr))  {
            errorMsg.textContent += `图标尺寸不正确; `
            iconItem.classList.add('error-icon')
          }else if (svgChildren.some(child => !child.classList.length)) 
          {
            errorMsg.textContent += '图标颜色不正确; '
            iconItem.classList.add('error-icon')
          }
        }else {
          errorMsg.textContent += '图标未轮廓化; '
          iconItem.classList.add('error-icon')
        }
        

        

        contentWrap.appendChild(errorMsg)
        iconList.appendChild(iconItem)
      }

      count.innerHTML = `<div>已选择</div>\n<div class='badge'>${nodeIDArr.length}</div>`

      const errorCount = Array.from(
        document.getElementsByClassName('error-icon'),
      )

      error.innerHTML = `<div>错误</div>\n<div class='badge badge-red'>${errorCount.length}</div>`

      for (
        let i = 0;
        i < iconList.querySelectorAll('div.icon-list').length;
        i++
      ) {
        const iconItem = iconList.querySelectorAll(
          'div.icon-list',
        ) as unknown as HTMLElement | null
        iconItem[i].onclick = () => {
          console.log('getIconItem')
          const query = iconItem[i].id
          parent.postMessage(
            { pluginMessage: { type: 'storage.select', payload: query } },
            '*',
          )
        }
      }

      const downloadBtn = document.getElementById('downloadBtn')
      if (iconList.innerHTML.indexOf('error-icon') > -1) {
        downloadBtn.setAttribute('disabled', 'disabled')
      }

      if (errorCount.length === 0) {
        error.lastElementChild.classList.remove('badge-red')
      }
    } else if (msg.type === 'no-selection') {
      history.push('/')
    } else if (msg.type === 'download-icon') {
      console.log('received download icon')
      console.log(iconList)
    }
  }

  const onDownload = () => {
    console.log('downloading...')

    // const svgOutArr = [];

      // Check if download button is disabled
      const downloadBtn = document.getElementById('downloadBtn')
      if (downloadBtn.hasAttribute('disabled')) {
        console.log('download button is disabled');
       return
      }

    const iconArrOut = Array.from(
      document.getElementsByClassName('icon-wrapper'),
    )
    const iconNameArrOut = Array.from(
      document.getElementsByClassName('icon-name'),
    )
    const svgArr = iconArrOut.map((res) => res.innerHTML)
    const svgNameArr = iconNameArrOut.map((res) => res.innerHTML)
    console.log(svgArr)
    console.log(svgNameArr)

    async function downloadFile(needDownloadList, nameList) {
      const zip = new JSZip()
      const downloadData = zip.folder('icon')
      for (let i = 0; i < needDownloadList.length; i++) {
        const data = needDownloadList[i]
        const blob = new Blob([data], { type: 'image/svg+xml' })
        downloadData.file(`${nameList[i]}.svg`, blob)
      }

      await zip.generateAsync({ type: 'blob' }).then(function (content) {
        FileSaver(content, 'icons')
      })
    }
    downloadFile(svgStringArr, svgNameArr)
  }

  const onError = () => {
    const iconList = Array.from(document.getElementsByClassName('icon-list'))
    for (const icon of iconList) {
      if (!icon.classList.contains('error-icon')) {
        icon.classList.add('hide')
      }
    }
  }

  const onAll = () => {
    const iconList = Array.from(document.getElementsByClassName('icon-list'))
    for (const icon of iconList) {
      if (!icon.classList.contains('error-icon')) {
        icon.classList.remove('hide')
      }
    }
  }

  return (
    <div>
      <div className="content">
        <div className="navbar-wrapper">
          <div className="back-wrapper">
            <Button icon={<ArrowLeftOutlined />} onClick={handleClick}>
              返回
            </Button>
          </div>
          <div className="segment" id="segment-control">
            <div className="segment-unit" id="count" onClick={onAll}></div>
            <div className="segment-unit" id="error" onClick={onError}></div>
          </div>
        </div>
        <div id="list-container"></div>
      </div>
      <div className="footer-wrapper">
        <Button id="downloadBtn" type="primary" onClick={onDownload}>
          下载SVG
        </Button>
      </div>
    </div>
  )
}

export default Result
