/*!
 *  build: vue-admin-better 
 *  vue-admin-beautiful.com 
 *  https://gitee.com/chu1204505056/vue-admin-better 
 *  time: 2023-11-7 22:11:25
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/a-possible-prototype.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/a-possible-prototype.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-callable.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/classof.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/classof.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-clear.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-clear.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-uncurry-this.js");

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-install.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-install.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/create-non-enumerable-property.js");
var clearErrorStack = __webpack_require__(/*! ../internals/error-stack-clear */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-clear.js");
var ERROR_STACK_INSTALLABLE = __webpack_require__(/*! ../internals/error-stack-installable */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-installable.js");

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-installable.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-installable.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/fails.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/create-property-descriptor.js");

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-apply.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-apply.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-uncurry-this-accessor.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/inherit-if-required.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/inherit-if-required.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/install-error-cause.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/install-error-cause.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/create-non-enumerable-property.js");

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/normalize-string-argument.js":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/normalize-string-argument.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = __webpack_require__(/*! ../internals/to-string */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string.js");

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-set-prototype-of.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-set-prototype-of.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-uncurry-this-accessor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/proxy-accessor.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/proxy-accessor.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-define-property.js").f;

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string-tag-support.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string-tag-support.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/to-string.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/wrap-error-constructor-with-cause.js":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/wrap-error-constructor-with-cause.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/get-built-in.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/has-own-property.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/create-non-enumerable-property.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-is-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/object-set-prototype-of.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/copy-constructor-properties.js");
var proxyAccessor = __webpack_require__(/*! ../internals/proxy-accessor */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/proxy-accessor.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/inherit-if-required.js");
var normalizeStringArgument = __webpack_require__(/*! ../internals/normalize-string-argument */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/normalize-string-argument.js");
var installErrorCause = __webpack_require__(/*! ../internals/install-error-cause */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/install-error-cause.js");
var installErrorStack = __webpack_require__(/*! ../internals/error-stack-install */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/error-stack-install.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/descriptors.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/is-pure.js");

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/modules/es.error.cause.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/modules/es.error.cause.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/global.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/function-apply.js");
var wrapErrorConstructorWithCause = __webpack_require__(/*! ../internals/wrap-error-constructor-with-cause */ "./node_modules/.pnpm/registry.npmmirror.com+core-js@3.33.2/node_modules/core-js/internals/wrap-error-constructor-with-cause.js");

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ })

}]);