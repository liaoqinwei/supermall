import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: 'detail',
    params: {
      iid
    }
  })
}


export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.services = services
    this.relPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsPram {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export class CommentInfo {
  constructor(rate){
    this.uname = rate.list[0].user.uname
    this.uhead = rate.list[0].user.avatar
    this.style = rate.list[0].style
    this.conent = rate.list[0].content
    this.date = rate.list[0].created*1000
  }
}
