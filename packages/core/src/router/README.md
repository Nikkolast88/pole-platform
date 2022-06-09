# 路由

## 介绍

## 注意

portal, 主要用于在主应用的某个路由页面加载微应用，格式需按照下面的格式，否则会报错。

```javascript
{
    path: '/business/*',
    name: 'PortalBusiness',
    component: PortalComp,
    meta: {
      title: '业务',
      hidden: true,
    },
  },
```

name、用于判断是否隶属于主应用的路由，如果隶属于主应用的路由，则会自动加载主应用的路由，如果不隶属于主应用的路由，则会自动加载微应用的路由。
