export default {
  'GET /': async (ctx, next) => {
    const title = 'koa start';

    await ctx.render('index', {
      title
    })
  }
}
