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

var DBConnector = exports.DBConnector = function () {
    function DBConnector() {
        _classCallCheck(this, DBConnector);

        // this.connect = pg.connect();
        this.configString = _dotenv2.default['PG_CONNECT'];
    }

    // callback takes client object


    _createClass(DBConnector, [{
        key: '_connect',
        value: function _connect(err, callback) {
            _pg2.default.connect(this.configString, function (err, client, done) {

                if (err) {
                    err();
                    return;
                }
                callback(client);
                done();
                return;
            });
        }
    }, {
        key: '_query',
        value: function _query() {}
    }, {
        key: 'run',
        value: function run(err, callback) {
            return this._connect(err, callback);
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
//# sourceMappingURL=DBConnector.js.map
