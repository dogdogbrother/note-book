module.exports = {
  title: 'gunsliner笔记本',
  description: 'playing to live',
  themeConfig: {
    logo: '/img/avatar.jpg',
    nav: [
      { text: '笔记本', link: '/notebook/笔记本描述.md' },
      { 
        text: '前端开发', 
        items: [
          {
            text: 'webpack', link: '/front-development/webpack/webpack前言.md'
          },
          {
            text: 'electron', link: '/front-development/electron/electron前言.md'
          },
          {
            text: 'next', link: '/front-development/next/next前言.md'
          },
        ]
       },
      { text: 'axure案例', link: '/axure-demo/' },
      { 
        text: '杂事本', 
        items: [
          {
            text: '背单词项目', link: '/杂事本/背单词项目/前言.md'
          }
        ]
      },
      // { 
      //   text: '后端', 
      //   items: [
      //     {
      //       text: '建站大作战', link: '/后端/建站大副本/前言.md'
      //     }
      //   ]
      // },
      { 
        text: '运维', 
        items: [
          {
            text: '建站大作战', link: '/运维/建站大副本/前言.md'
          },
          {
            text: 'jenkins', link: '/运维/jenkins/前言.md'
          }
        ]
      },
    ],
    sidebar: {
      '/notebook/': [
        {
          title: 'css',
          path: '/notebook/css.md'
        },
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
        {
          title: 'linux',
          path: '/notebook/linux.md'
        },
        {
          title: 'Element-ui',
          path: '/notebook/element.md'
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
      ],
      '/front-development/webpack': [
        {
          title: 'testt',
          path: '/杂事本/背单词项目/项目时间线.md'
        }
      ],
      '/front-development/electron': [
        {
          title: 'electron11111',
          path: '/front-development/electron/electron11111.md'
        }
      ],
      '/front-development/next': [
        {
          title: 'next11111',
          path: '/front-development/next/1111.md'
        }
      ],
      '/后端/建站大副本/': [
        {
          title: '1',
          path: '/后端/建站大副本/1.md'
        }
      ],
      '/运维/建站大副本/': [
        {
          title: '1',
          path: '/运维/建站大副本/1.md'
        }
      ],
      '/运维/jenkins/': [
        {
          title: '1',
          path: '/运维/jenkins/1.md'
        }
      ]
    }
  }
}