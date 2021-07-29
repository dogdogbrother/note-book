module.exports = {
  title: '枪侠的笔记本',
  description: 'playing to live',
  themeConfig: {
    logo: '/img/avatar.jpg',
    nav: [
      { text: '笔记本', link: '/notebook/笔记本描述.md' },
      { text: '产品之路', link: '/product/' },
      { text: 'axure案例', link: '/axure-demo/' },
      { 
        text: '杂事本', 
        items: [
          {
            text: '背单词项目', link: '/杂事本/背单词项目/前言.md'
          }
        ]
      },
    ],
    sidebar: {
      '/notebook/': [
        {
          title: 'Array 数组',
          path: '/notebook/array.md'
        },
        {
          title: 'Object 对象',
          path: '/notebook/object.md'
        },
        {
          title: 'String 字符串',
          path: '/notebook/string.md'
        },
        {
          title: 'Number 数字',
          path: '/notebook/number.md'
        },
        {
          title: '运算符',
          path: '/notebook/operator.md'
        },
        {
          title: 'git',
          path: '/notebook/git.md'
        },
      ],
      '/product/': [
        {
          title: '前言',
          path: '/product/introduction.md'
        }
      ],
      '/axure-demo/': [
        {
          title: '前言',
          path: '/axure-demo/introduction.md'
        }
      ],
      '/杂事本/背单词项目/': [
        {
          title: '项目时间线',
          path: '/杂事本/背单词项目/项目时间线.md'
        }
      ]
    }
  }
}