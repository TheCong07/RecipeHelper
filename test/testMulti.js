var chai = require("chai");
var chaiHttp = require("chai-http");

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require("http");
chai.use(chaiHttp);

if (!global.Promise) {
  var q = require("q");
  chai.request.addPromises(q.Promise);
}

describe("Test To Do lists result", function () {
  this.timeout(15000);

  it("Should return four recipe list", function (done) {
    chai
      .request("http://localhost:8080")
      .get("/recipeList")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf(4);
        expect(res.body[0]).to.have.include.keys("listID");
        done();
      });
  });
});
