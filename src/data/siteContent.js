import image017 from '@/assets/窗花017.png'
import image018 from '@/assets/窗花018.png'
import image019 from '@/assets/窗花019.png'

export const navItems = [
  { key: 'home', label: '首页' },
  { key: 'collectibles', label: '数字藏品' },
]

export const heroSlides = [
  {
    id: '017',
    title: '窗花017 · 暮金流影',
    subtitle: '以剪艺纹样重构东方仪式感，在深紫幕布中呈现柔光与金辉交错的视觉开场。',
    description: '精选窗花纹样以层叠透光的方式陈列，营造静谧、典雅、富有展陈感的首页氛围。',
    image: image017,
  },
  {
    id: '018',
    title: '窗花018 · 玉紫华章',
    subtitle: '细腻镂空与金色轮廓相映，让传统纹样在现代网页空间里焕发新的层次。',
    description: '通过深色渐变与柔和高光，强调剪艺的质感与留白，让视觉更沉浸。',
    image: image018,
  },
  {
    id: '019',
    title: '窗花019 · 典藏映辉',
    subtitle: '将窗花的节奏、吉意与东方雅饰融为一体，形成具有收藏气质的品牌印象。',
    description: '轮播区以大图切换构建沉浸式序章，连接首页展示与数字藏品展台。',
    image: image019,
  },
]

export const featureCards = [
  {
    title: '剪艺焕新',
    text: '以传统窗花语言为核心，提炼纹样、留白与层叠结构，让非遗审美以更现代的方式呈现。',
  },
  {
    title: '暗玉紫金质感',
    text: '主视觉以暗玉紫铺陈深邃氛围，以暗金强调轮廓、按钮与信息重点，形成高定式展陈感。',
  },
  {
    title: '数字典藏叙事',
    text: '通过舞台式陈列、限量标签与详情弹层，将作品简介、故事与发行信息整合为完整浏览路径。',
  },
]

export const registerInfo = {
  url: 'https://nwiexwzoxsyb.sealosbja.site',
  hint: '暂无注册功能，可前往以下网站完成注册后再返回登录。',
}

export const collectibleItem = {
  title: '天命·玄鸟',
  image: image017,
  edition: '8000份',
  status: '鲸选',
  series: '剪艺数字藏品',
  summary:
    '作品以窗花的对称结构与瑞鸟意象为灵感，用深紫底色烘托金色线条的飞扬姿态，借由剪艺纹样传递吉庆、守护与新生的东方寓意。整个展陈强调“悬浮、聚光、典藏”的视觉仪式，让传统美学在数字空间中拥有更鲜明的收藏辨识度。',
  highlights: ['限量发行', '舞台展陈', '东方瑞意', '暗金高光'],
  storyTitle: '作品故事',
  storyPlaceholder:
    '当前 PDF 故事图暂未上传。此处已预留图片展示区域，后续可直接替换为作品故事的 PDF 截图或导出图。现阶段先以图文说明呈现作品背景：玄鸟振翼而起，象征吉兆初现、灵感降临，也寓意剪艺在数字时代中的再一次腾飞。',
  creator: '剪艺视觉实验室',
  publisher: '剪艺数字发行中心',
  note: '主图点击后可查看完整详情，后续可继续接入更多藏品条目与鉴权接口。',
}
