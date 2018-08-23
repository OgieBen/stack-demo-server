'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DBConnector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBConnector = function () {
    function DBConnector() {
        _classCallCheck(this, DBConnector);

        // this.configString = config['PG_CONNECT'];
        this._pool = new _pg.Pool({
            user: '',
            host: '',
            database: '',
            password: '',
            port: 3211
        });
    }

    // callback takes client object
    /* _connect(err, callback){
        pg.connect(this.configString, (err, client, done) => {
                
            if(err){
                    err();
                    return;
                }
            callback(client);
            done()
            return
         });
    } */

    /**
     * Executes Queries
     * 
     * @param {Callback} errCallback 
     * @param {String} query 
     * @param {Callback} callback 
     */


    _createClass(DBConnector, [{
        key: 'query',
        value: function query(errCallback, _query, callback) {

            this.getPool().query(_query.toString(), function (err, res) {
                console.log(err, res);

                if (err) {
                    errCallback();
                    return false;
                }

                callback();
                pool.end();
            });
        }
    }, {
        key: 'run',
        value: function run(err, callback) {
            return this._connect(err, callback);
        }
    }, {
        key: 'getPool',
        value: function getPool() {
            return this._pool;
        }
    }, {
        key: 'tester',
        value: function tester() {
            return 'Testing DBConncter! ';
            // ${config['PG_CONNET']}
        }
    }]);

    return DBConnector;
}();

exports.DBConnector = DBConnector;
//# sourceMappingURL=DBConnector.js.map
