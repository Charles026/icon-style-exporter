// 定位图层
export const select = async (payload) => {
  // console.log('selected');

  // for (let i = 0; i < figma.root.children.length; i++) {
  //   if(figma.root.children[i].findOne(n => n.id === payload) !== null) {
  //     // console.log('found',figma.root.children[i]);
  //     figma.currentPage = figma.root.children[i];
  //   }
  // }
  const nodeSelect = figma.currentPage.findAll((node) => node.id === payload)
  figma.currentPage.selection = nodeSelect
  figma.viewport.scrollAndZoomIntoView(nodeSelect)
}

export const loadIcon = () => {
  console.log('load msg')

  let svgData: Uint8Array
  const nodes = figma.currentPage.selection

  const svgDataArr = []

  const getSvgData = async (node) => {
    svgData = await node.exportAsync({
      format: 'SVG',
    })
    return svgData
  }

  ;(async () => {
    if (nodes.length > 0) {
      figma.ui.postMessage({ type: 'get-icons' })

      const nodeIDArr = []
      const iconNameArr = []
      const nodeTypeArr = []


      nodes.forEach((node) => {
        nodeIDArr.push(node.id)
        iconNameArr.push(node.name)
        nodeTypeArr.push(node.type)
      })

      for (const node of nodes) {
        svgDataArr.push(await getSvgData(node))
      }

      figma.ui.postMessage({
        type: 'load-icon',
        svgDataArr,
        iconNameArr,
        nodeIDArr,
        nodeTypeArr,
      })
    } else {
      figma.notify('请选择图标')
      figma.ui.postMessage({ type: 'no-selection' })
    }
  })()
}

// export const download = () => {
//   console.log('downloading');

//   figma.ui.postMessage({type:'download-icon'})
// }
