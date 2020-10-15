const Router = require('koa-router')

const router = new Router()

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  // 路径参数
  const path = ctx.params
  // 查询参数
  const query = ctx.request.query
  // header
  const headers = ctx.request.header
  // body参数
  const body = ctx.request.body
  ctx.body = { key: 'classic' }
})

module.exports =  router