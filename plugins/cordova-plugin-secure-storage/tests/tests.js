var SERVICE = 'testing';

exports.defineAutoTests = function() {
    var ss, handlers;

    describe('cordova-plugin-secure-storage', function () {

        beforeEach(function () {
            handlers = {
                successHandler: function () {},
                errorHandler: function () {}
            };
        });

        afterEach(function (done) {
            ss = new cordova.plugins.SecureStorage(function () {
                ss.clear(done, handlers.errorHandler);
            }, handlers.errorHandler, SERVICE);
        });

        it('should be defined', function() {
            expect(cordova.plugins.SecureStorage).toBeDefined();
        });

        it('should be able to initialize', function (done) {
            spyOn(handlers, 'successHandler').and.callFake(function () {
                expect(ss.service).toEqual(SERVICE);
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(handlers.successHandler, handlers.errorHandler, SERVICE);
        });

        it('should be able to set a key/value', function (done) {
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                expect(res).toEqual('foo');
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(handlers.successHandler, handlers.errorHandler, 'foo', 'bar');
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to get a key/value', function (done) {
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                expect(res).toEqual('bar');
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.get(handlers.successHandler, handlers.errorHandler, 'foo');
                }, handlers.errorHandler, 'foo', 'bar');
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to get a key/value that was set from a previous instance of SecureStorage', function (done) {
            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    spyOn(handlers, 'successHandler').and.callFake(function (res) {
                        expect(res).toEqual('bar');
                        expect(handlers.errorHandler).not.toHaveBeenCalled();
                        done();
                    });
                    spyOn(handlers, 'errorHandler');

                    ss = new cordova.plugins.SecureStorage(function () {
                        ss.get(handlers.successHandler, handlers.errorHandler, 'foo');
                    }, handlers.errorHandler, SERVICE);
                }, handlers.errorHandler, 'foo', 'bar');
            }, handlers.errorHandler, SERVICE);

        });

        it('should call the error handler when getting a key that does not exist', function (done) {
            spyOn(handlers, 'errorHandler').and.callFake(function () {
                expect(handlers.successHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'successHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.get(handlers.successHandler, handlers.errorHandler, 'nofoo');
            }, handlers.errorHandler, SERVICE);
        });

        it('should call the error handler when getting a key that existed but got deleted', function (done) {
            spyOn(handlers, 'errorHandler').and.callFake(function () {
                expect(handlers.successHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'successHandler');

            ss = new cordova.plugins.SecureStorage(function () {

                ss.set(function () {
                    ss.remove(function () {
                        ss.get(handlers.successHandler, handlers.errorHandler, 'test');
                    }, function () {}, 'test');
                }, function () {}, 'test', 'bar');

            }, handlers.errorHandler, SERVICE);
        });

        it('should call the error handler when setting a value that is not a string', function (done) {
            spyOn(handlers, 'errorHandler').and.callFake(function () {
                expect(handlers.successHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'successHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.get(handlers.successHandler, handlers.errorHandler, {'foo': 'bar'});
            }, handlers.errorHandler, SERVICE);
        });


        it('should be able to remove a key/value', function (done) {
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                expect(res).toEqual('foo');
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.remove(handlers.successHandler, handlers.errorHandler, 'foo');
                }, handlers.errorHandler, 'foo', 'bar');
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to set and retrieve multiple values in sequence', function (done) {
            var results = [];
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                results.push(res);
                expect(res === 'foo' || res === 'bar').toBe(true);
                if (results.indexOf('foo') !== -1 && results.indexOf('bar') !== -1) {
                    done();
                }
            });
            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.set(function () {
                        ss.get(handlers.successHandler, handlers.errorHandler, 'foo');
                        ss.get(handlers.successHandler, handlers.errorHandler, 'bar');
                    }, function () {}, 'bar', 'bar');
                }, function () {}, 'foo', 'foo');
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to get the storage keys as an array', function (done){
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                expect(res).toEqual(jasmine.any(Array));
                expect(res.indexOf('foo') >= 0).toBeTruthy();
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.keys(handlers.successHandler, handlers.errorHandler);
                }, done.fail, 'foo', 'foo');
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to clear the storage', function (done){
            spyOn(handlers, 'successHandler').and.callFake(function () {
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                ss.keys(function(key) {
                    expect(key).toEqual(jasmine.any(Array));
                    expect(key.length).toBe(0);
                    done();
                }, done.fail);
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.clear(handlers.successHandler, handlers.errorHandler);
                }, done.fail, 'foo', 'foo');
            }, handlers.errorHandler, SERVICE);
        });

        it('should return [] when keys is called and the storage is empty', function (done){
            spyOn(handlers, 'successHandler').and.callFake(function (res) {
                expect(res).toEqual(jasmine.any(Array));
                expect(res.length).toBe(0);
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                done();
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.clear(function () {
                    ss.keys(handlers.successHandler, handlers.errorHandler);
                }, handlers.errorHandler);
            }, handlers.errorHandler, SERVICE);
        });

        it('should be able to clear without error when the storage is empty', function (done){
            spyOn(handlers, 'successHandler').and.callFake(function () {
                expect(handlers.errorHandler).not.toHaveBeenCalled();
                ss.keys(function(key) {
                    expect(key).toEqual(jasmine.any(Array));
                    expect(key.length).toBe(0);
                    done();
                }, done.fail);
            });
            spyOn(handlers, 'errorHandler');

            ss = new cordova.plugins.SecureStorage(function () {
                ss.set(function () {
                    ss.clear(handlers.successHandler, handlers.errorHandler);
                }, function () {}, 'foo', 'foo');
            }, handlers.errorHandler, SERVICE);
        });
    });

    if (cordova.platformId === 'android') {
        describe('cordova-plugin-secure-storage-android', function () {
            beforeEach(function () {
                handlers = {
                    successHandler: function () {},
                    errorHandler: function () {}
                };
            });

            it('should be able to set a key/value with sjcl', function (done) {
                spyOn(handlers, 'successHandler').and.callFake(function (res) {
                    expect(res).toEqual('foo');
                    expect(handlers.errorHandler).not.toHaveBeenCalled();
                    done();
                });
                spyOn(handlers, 'errorHandler');

                ss = new cordova.plugins.SecureStorage(
                    function () {
                        ss.clear(
                            function () {
                                ss.set(handlers.successHandler, handlers.errorHandler, 'foo', 'bar');
                            },
                            handlers.errorHandler
                        );
                    },
                    handlers.errorHandler,
                    SERVICE,
                    {native: false}
                );
            });

            it('should be able to get a key/value that was set before with sjcl', function (done) {
                spyOn(handlers, 'successHandler').and.callFake(function (res) {
                    expect(res).toEqual('bar');
                    expect(handlers.errorHandler).not.toHaveBeenCalled();
                    done();
                });
                spyOn(handlers, 'errorHandler');

                ss = new cordova.plugins.SecureStorage(function () {
                    ss.get(handlers.successHandler, handlers.errorHandler, 'foo');
                }, handlers.errorHandler, SERVICE);
            });

            it('should move entries from localstorage to SharedPreferences', function (done) {
                localStorage.clear();
                localStorage.setItem('_SS_foo', 'bar');
                spyOn(handlers, 'successHandler').and.callFake(function () {
                    expect(localStorage.getItem('_SS_foo')).toBeNull();
                    ss._fetch(
                        function (res) {
                            expect(res).toEqual('bar');
                            expect(handlers.errorHandler).not.toHaveBeenCalled();
                            //cleanup
                            ss.remove(
                                function () {
                                    done();
                                },
                                function () {
                                },
                                'foo'
                            );
                        },
                        handlers.errorHandler,
                        'foo'
                    );

                });
                spyOn(handlers, 'errorHandler');

                ss = new cordova.plugins.SecureStorage(
                    handlers.successHandler,
                    handlers.errorHandler,
                    SERVICE,
                    {migrateLocalStorage: true}
                );
            });
        });
    }
};

exports.defineManualTests = function(contentEl, createActionButton) {
    var ss;
    if (cordova.platformId === 'android') {
        createActionButton('Init tests for android', function() {
            alert('You should run these tests twice. Once without screen locking, and once with screen locking set to PIN. When lock is disabled you should be prompted to set it.');
            ss = new cordova.plugins.SecureStorage(
                function () {
                    alert('Init successfull.');
                },
                function () {
                    alert('Init failed. The screen lock settings should now open. Set PIN or above.');
                    ss.secureDevice(
                        function () {
                            alert('Device is secure.');
                        },
                        function () {
                            alert('Device is not secure.');
                        }
                    );
                }, SERVICE);
        });
    }
};
