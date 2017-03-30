import request from 'supertest'
import fs from 'fs'
import path from 'path'
import 'should'
import app from '../src/app'

describe('HTTP APP TEST', () => {
  describe('GET /', () => {
    it('should 200', (done) => {
      request(app.listen())
        .get('/')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            throw new Error(err)
          }
          res.status.should.equal(200)
          // console.log(res.text)
          done()
        })
    })
  })

  describe('Static, GET /assets/css/style.css', () => {
    it('should 200', (done) => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../public/css/style.css'), 'utf-8')
      request(app.listen())
        .get('/assets/css/style.css')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            throw new Error(err)
          }
          // console.log(res)
          res.status.should.equal(200)
          // console.log(res.text)
          res.text.should.equal(cssContent)
          done()
        })
    })
  })

  describe('GET /path404', () => {
    it('should 404', (done) => {
      request(app.listen())
        .get('/path404')
        .set('Accept', 'application/text')
        .expect('Content-Type', /text/)
        .end((err, res) => {
          if (err) {
            throw new Error(err)
          }
          // console.log(res)
          res.status.should.equal(404)
          done()
        })
    })
  })
})
