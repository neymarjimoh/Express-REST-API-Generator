'use strict';

var chai = require('chai');
chai.should();
var config = require('../../config');
var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
var mongooseMock = require('mongoose-mock');
// var expect = chai.expect;
var sinon = require('sinon');
var q = require('q');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Book;
// Testing The Book Model
describe('Book Model',function(){

    var id;
    var id2;

    before(function(){  /* jslint ignore:line */
        Book = require('../../models/Books');
        var workers = require('../../services/queue/workers');
        var workers1 = require('../../services/queue/workers');
        var workers2 = require('../../services/queue/workers');
        var workers3 = require('../../services/queue/workers');
    });

    describe('Test CRUDS', function(){
        it('should save data', function(done){
            var mybook = Book.create({name: 'femi'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read data', function(done){
            var mybook = Book.findOne({name: 'femi'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should read all data', function(done){
            var mybook = Book.find();

            mybook.then(function(res){
                res.should.be.an.array; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update data', function(done){
            var cb = sinon.spy();
            var mybook = Book.updateMany({name: 'femi'},{name: 'Olaoluwa'});

            mybook.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should update many data', function(done){
            var cb = sinon.spy();
            var mybook = Book.updateMany({name: 'femi'},{name: 'Olaoluwa Olanipekun'});

            mybook.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should search data', function(done){
            // Search needs more work for more accuracy
            var mybook = Book.search('femi');

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete data', function(done){
            var cb2 = sinon.spy();
            var ourbook = Book.create([{name:'Olaolu'},{name: 'fola'},{name: 'bolu'}]);

            ourbook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                return Book.deleteOne({name: 'bolu'});
            }).then(function(res){
                cb2();
                cb2.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should delete many data', function(done){
            var cb = sinon.spy();
            var mybook = Book.deleteMany({name: 'femi'});

            mybook.then(function(res){
                cb();
                cb.should.have.been.calledOnce; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add createdAt', function(done){
            var mybook = Book.create({name: 'this is for the gods'});

            mybook.then(function(res){
                id = res._id;
                res.should.have.property('createdAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should add updatedAt', function(done){
            var mybook = Book.create({name: 'i am a demigod!'});
            mybook.then(function(res){
                id2 = res._id;
                return Book.updateMany({_id: id},{name: 'This is the titan'});
            })
            .then(function(res){
                return Book.findById(id);
            })
            .then(function(res){
                res.should.have.property('updatedAt');
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should tag database entries properly', async function(){
            var mybook = await Book.create({name: 'femi',someOtherStringData: 'stuff'});
            
            return q.Promise(function(resolve, reject) {
            setTimeout(function(){
                Book.findById(mybook._id)
                .then(function(res){
                    console.log(res);
                    res.tags.length.should.equal(2);/* jslint ignore:line */
                    resolve(res);
                })
                .catch(function(err){
                    reject(err);
                });
            },3000);
            });
            
        });

        it('should count returned records', function(done){
            var mybook = Book.estimatedDocumentCount({name: 'This is the titan'});

            mybook.then(function(res){
                res.should.be.a.number; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id', function(done){
            var mybook = Book.findById(id);

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and delete', function(done){
            var mybook = Book.findByIdAndRemove(id2);

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find a record by id and update', function(done){
            var mybook = Book.findByIdAndUpdate(id,{name: 'fufu'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query', function(done){
            var mybook = Book.findOne({name: 'fufu'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and update', function(done){
            var mybook = Book.findOneAndUpdate({name: 'fufu'},{name: 'funmi'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

        it('should find the first match from a query and delete', function(done){
            var mybook = Book.findOneAndRemove({name: 'funmi'});

            mybook.then(function(res){
                res.should.be.an.object; /* jslint ignore:line */
                done();
            })
            .catch(function(err){
                done(err);
            });
        });

    });
});
