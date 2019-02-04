webpackHotUpdate("static\\development\\pages\\poll\\editor.js",{

/***/ "./redux/actions/pollsActions/index.js":
/*!*********************************************!*\
  !*** ./redux/actions/pollsActions/index.js ***!
  \*********************************************/
/*! exports provided: getPollAction, getPreviewAction, postPollAction, updatePollAction, deletePollAction, getPollsAction, getAllPollsAction, getAllPollsStartAction, getAllPollsErrorAction, getPoll, getPreview, postPoll, updatePoll, deletePoll, getPolls, getAllPolls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPollAction", function() { return getPollAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreviewAction", function() { return getPreviewAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postPollAction", function() { return postPollAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePollAction", function() { return updatePollAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deletePollAction", function() { return deletePollAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPollsAction", function() { return getPollsAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPollsAction", function() { return getAllPollsAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPollsStartAction", function() { return getAllPollsStartAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPollsErrorAction", function() { return getAllPollsErrorAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPoll", function() { return getPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreview", function() { return getPreview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postPoll", function() { return postPoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePoll", function() { return updatePoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deletePoll", function() { return deletePoll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPolls", function() { return getPolls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPolls", function() { return getAllPolls; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types */ "./redux/types/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var apiUrl = "https://node-js-230621.appspot.com/";
function getPollAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_POLL,
    payload: payload
  };
}
function getPreviewAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_PREVIEW_POLL,
    payload: payload
  };
}
function postPollAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].POST_POLL,
    payload: payload
  };
}
function updatePollAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].UPDATE_POLL,
    payload: payload
  };
}
function deletePollAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].DELETE_POLL,
    payload: payload
  };
}
function getPollsAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_POLLS,
    payload: payload
  };
}
function getAllPollsAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_ALL_POLLS,
    payload: payload
  };
}
function getAllPollsStartAction() {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_ALL_POLLS_START
  };
}
function getAllPollsErrorAction(payload) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["asyncTypes"].GET_ALL_POLLS_ERROR,
    payload: payload
  };
}
function getPoll(slug) {
  var endPoint = "".concat(apiUrl, "polls/").concat(slug);
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(dispatch) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(endPoint);

              case 3:
                response = _context.sent;
                dispatch(getPollAction(response.data.poll));
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
function getPreview(poll) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(dispatch) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                dispatch(getPreviewAction(poll));
                _context2.next = 7;
                break;

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 4]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function postPoll(poll) {
  var endPoint = "".concat(apiUrl, "polls");
  var auth = JSON.parse(localStorage.getItem('auth'));
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.headers.authorization = auth.token;
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(dispatch) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(endPoint, {
                  id: poll.id,
                  user: auth.id,
                  css: poll.css,
                  js: poll.js,
                  name: poll.name,
                  desc: poll.desc,
                  slug: poll.slug,
                  lastDesc: poll.lastDesc,
                  questions: poll.questions,
                  answers: poll.answers,
                  settings: poll.settings,
                  selectableLastMessages: poll.selectableLastMessages
                });

              case 3:
                response = _context3.sent;
                dispatch(postPollAction(response.data));
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function updatePoll(poll) {
  var endPoint = "".concat(apiUrl, "polls/update");
  var auth = JSON.parse(localStorage.getItem('auth'));
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.headers.authorization = auth.token;
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(dispatch) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(endPoint, {
                  _id: poll._id,
                  user: auth.id,
                  css: poll.css,
                  js: poll.js,
                  name: poll.name,
                  desc: poll.desc,
                  slug: poll.slug,
                  lastDesc: poll.lastDesc,
                  questions: poll.questions,
                  answers: poll.answers,
                  settings: poll.settings,
                  selectableLastMessages: poll.selectableLastMessages
                });

              case 3:
                response = _context4.sent;
                dispatch(updatePollAction(response.data));
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
} // AXIOS

function deletePoll(_id) {
  var endPoint = "".concat(apiUrl, "polls/").concat(_id);
  var auth = JSON.parse(localStorage.getItem('auth'));
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.headers.authorization = auth.token;
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(dispatch, getState) {
        var polls, newPolls, response, message;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                polls = getState().polls.polls;
                newPolls = polls.filter(function (poll) {
                  return poll._id !== _id;
                });
                _context5.next = 5;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete(endPoint, _id);

              case 5:
                response = _context5.sent;
                message = response.data.message;
                dispatch(deletePollAction({
                  newPolls: newPolls,
                  message: message
                }));
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
} // AXIOS

function getPolls() {
  var auth = JSON.parse(localStorage.getItem('auth'));
  var endPoint = "".concat(apiUrl, "polls/user/").concat(auth.id);
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.defaults.headers.authorization = auth.token;
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(dispatch) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(endPoint);

              case 3:
                response = _context6.sent;
                dispatch(getPollsAction(response.data));
                _context6.next = 10;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      return function (_x7) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function getAllPolls(page) {
  var endPoint = "".concat(apiUrl, "polls/all/").concat(page);
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(dispatch) {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                dispatch(getAllPollsStartAction());
                _context7.next = 4;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(endPoint, {
                  headers: {
                    'Access-Control-Allow-Origin': '*'
                  }
                });

              case 4:
                response = _context7.sent;
                dispatch(getAllPollsAction(response.data));
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                dispatch(getAllPollsErrorAction(_context7.t0));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      return function (_x8) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}

/***/ })

})
//# sourceMappingURL=editor.js.84837192e142681cc464.hot-update.js.map