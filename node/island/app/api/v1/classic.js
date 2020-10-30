const Router = require('koa-router')
const router = new Router()

const { ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validators')
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  // 路径参数
  const path = ctx.params
  // 查询参数
  const query = ctx.request.query
  // header
  const header = ctx.request.header
  // body参数
  const body = ctx.request.body

  const v = new PositiveIntegerValidator().validate(ctx)

  const id = v.get('path.id', parsed = false)


  // throw new ParameterException('参数是是是', 1000011)
  ctx.body = { key: 'classic' }
})

module.exports =  router