var BEMHTML;
(function(global) {
function buildBemXjst(libs) {
var exports;
/* BEM-XJST Runtime Start */
var BEMHTML = function(module, exports) {
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bemhtml = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var inherits = require('inherits');
var Match = require('../bemxjst/match').Match;
var BemxjstEntity = require('../bemxjst/entity').Entity;

/**
 * @class Entity
 * @param {BEMXJST} bemxjst
 * @param {String} block
 * @param {String} elem
 * @param {Array} templates
 */
function Entity(bemxjst) {
  this.bemxjst = bemxjst;

  this.jsClass = null;

  // "Fast modes" about HTML
  this.tag = new Match(this, 'tag');
  this.attrs = new Match(this, 'attrs');
  this.bem = new Match(this, 'bem');
  this.cls = new Match(this, 'cls');

  BemxjstEntity.apply(this, arguments);
}

inherits(Entity, BemxjstEntity);
exports.Entity = Entity;

Entity.prototype.init = function(block, elem) {
  this.block = block;
  this.elem = elem;

  // Class for jsParams
  this.jsClass = this.bemxjst.classBuilder.build(this.block, this.elem);
};

Entity.prototype._keys = {
  tag: 1,
  content: 1,
  attrs: 1,
  mix: 1,
  js: 1,
  mods: 1,
  elemMods: 1,
  cls: 1,
  bem: 1
};

Entity.prototype.defaultBody = function(context) {
  context.mods = this.mods.exec(context);
  if (context.ctx.elem) context.elemMods = this.elemMods.exec(context);

  return this.bemxjst.render(context,
                             this,
                             this.tag.exec(context),
                             this.js.exec(context),
                             this.bem.exec(context),
                             this.cls.exec(context),
                             this.mix.exec(context),
                             this.attrs.exec(context),
                             this.content.exec(context),
                             context.mods,
                             context.elemMods);
};

},{"../bemxjst/entity":5,"../bemxjst/match":8,"inherits":11}],2:[function(require,module,exports){
var inherits = require('inherits');
var utils = require('../bemxjst/utils');
var Entity = require('./entity').Entity;
var BEMXJST = require('../bemxjst');

function BEMHTML(options) {
  BEMXJST.apply(this, arguments);

  this._shortTagCloser = typeof options.xhtml !== 'undefined' &&
                          options.xhtml ? '/>' : '>';

  this._elemJsInstances = options.elemJsInstances;
  this._omitOptionalEndTags = options.omitOptionalEndTags;
  this._singleQuotesForDataAttrs =
    typeof options.singleQuotesForDataAttrs === 'undefined' ?
      false :
      options.singleQuotesForDataAttrs;
  this._unquotedAttrs = typeof options.unquotedAttrs === 'undefined' ?
    false :
    options.unquotedAttrs;
}

inherits(BEMHTML, BEMXJST);
module.exports = BEMHTML;

BEMHTML.prototype.Entity = Entity;

BEMHTML.prototype.runMany = function(arr) {
  var out = '';
  var context = this.context;
  var prevPos = context.position;
  var prevNotNewList = context._notNewList;

  if (prevNotNewList) {
    context._listLength += arr.length - 1;
  } else {
    context.position = 0;
    context._listLength = arr.length;
  }
  context._notNewList = true;

  if (this.canFlush) {
    for (var i = 0; i < arr.length; i++)
      out += context._flush(this._run(arr[i]));
  } else {
    for (var i = 0; i < arr.length; i++)
      out += this._run(arr[i]);
  }

  if (!prevNotNewList)
    context.position = prevPos;

  return out;
};

BEMHTML.prototype.render = function(context, entity, tag, js, bem, cls, mix,
                                           attrs, content, mods, elemMods) {
  var ctx = context.ctx;

  if (tag === undefined)
    tag = 'div';
  else if (!tag)
    return (content || content === 0) ? this._run(content) : '';

  var out = '<' + tag;

  if (js === true)
    js = {};

  var jsParams;
  if (js) {
    jsParams = {};
    jsParams[entity.jsClass] = js;
  }

  var isBEM = typeof bem !== 'undefined' ? bem : entity.block || entity.elem;
  isBEM = !!isBEM;

  var addJSInitClass = isBEM && jsParams && (
    this._elemJsInstances ?
      entity.block :
      (entity.block && !entity.elem)
  );

  if (!isBEM && !cls)
    return this.renderClose(out, context, tag, attrs, isBEM, ctx, content);

  out += ' class=';
  var classValue = '';
  if (isBEM) {
    classValue += entity.jsClass;
    classValue += this.buildModsClasses(entity.block, entity.elem,
                                        entity.elem ? elemMods : mods);

    if (mix) {
      var m = this.renderMix(entity, mix, jsParams, addJSInitClass);
      classValue += m.out;
      jsParams = m.jsParams;
      addJSInitClass = m.addJSInitClass;
    }

    if (cls)
      classValue += ' ' + (typeof cls === 'string' ?
                    utils.attrEscape(cls).trim() : cls);
  } else {
    classValue += typeof cls === 'string' ?
                           utils.attrEscape(cls).trim() : cls;
  }

  if (addJSInitClass)
    classValue += ' i-bem';

  out += this._unquotedAttrs && utils.isUnquotedAttr(classValue) ?
    classValue :
    ('"' + classValue + '"');

  if (isBEM && jsParams)
    out += ' data-bem=\'' + utils.jsAttrEscape(JSON.stringify(jsParams)) + '\'';

  return this.renderClose(out, context, tag, attrs, isBEM, ctx, content);
};

var OPTIONAL_END_TAGS = {
  // https://www.w3.org/TR/html4/index/elements.html
  html: 1, head: 1, body: 1, p: 1, li: 1, dt: 1, dd: 1,
  colgroup: 1, thead: 1, tbody: 1, tfoot: 1, tr: 1, th: 1, td: 1, option: 1,

  // html5 https://www.w3.org/TR/html5/syntax.html#optional-tags
  /* dl — Neither tag is omissible */ rb: 1, rt: 1, rtc: 1, rp: 1, optgroup: 1
};

BEMHTML.prototype.renderClose = function(prefix, context, tag, attrs, isBEM,
                                         ctx, content) {
  var out = prefix;

  out += this.renderAttrs(attrs);

  if (utils.isShortTag(tag)) {
    out += this._shortTagCloser;
    if (this.canFlush)
      out = context._flush(out);
  } else {
    out += '>';
    if (this.canFlush)
      out = context._flush(out);

    // TODO(indutny): skip apply next flags
    if (content || content === 0)
      out += this.renderContent(content, isBEM);

    if (!this._omitOptionalEndTags || !OPTIONAL_END_TAGS.hasOwnProperty(tag))
      out += '</' + tag + '>';
  }

  if (this.canFlush)
    out = context._flush(out);
  return out;
};

BEMHTML.prototype.renderAttrs = function(attrs) {
  var out = '';

  // NOTE: maybe we need to make an array for quicker serialization
  if (utils.isObj(attrs)) {

    /* jshint forin : false */
    for (var name in attrs) {
      var attr = attrs[name];
      if (attr === undefined || attr === false || attr === null)
        continue;

      if (attr === true) {
        out += ' ' + name;
      } else {
        var attrVal = utils.isSimple(attr) ? attr : this.run(attr);
        out += ' ' + name + '=';
        out += (this._singleQuotesForDataAttrs && name.indexOf('data-') === 0) ?
          '\'' + utils.jsAttrEscape(attrVal) + '\'' :
          this.getAttrValue(attrVal);
      }
    }
  }

  return out;
};

BEMHTML.prototype.getAttrValue = function(attrVal) {
  return this._unquotedAttrs && utils.isUnquotedAttr(attrVal) ?
    attrVal :
    ('"' + utils.attrEscape(attrVal) + '"');
};

BEMHTML.prototype.renderMix = function(entity, mix, jsParams, addJSInitClass) {
  var visited = {};
  var context = this.context;
  var js = jsParams;
  var addInit = addJSInitClass;

  visited[entity.jsClass] = true;

  // Transform mix to the single-item array if it's not array
  if (!Array.isArray(mix))
    mix = [ mix ];

  var classBuilder = this.classBuilder;

  var out = '';
  for (var i = 0; i < mix.length; i++) {
    var item = mix[i];
    if (!item)
      continue;
    if (typeof item === 'string')
      item = { block: item, elem: undefined };

    var hasItem = false;

    if (item.elem) {
      hasItem = item.elem !== entity.elem && item.elem !== context.elem ||
        item.block && item.block !== entity.block;
    } else if (item.block) {
      hasItem = !(item.block === entity.block && item.mods) ||
        item.mods && entity.elem;
    }

    var block = item.block || item._block || context.block;
    var elem = item.elem || item._elem || context.elem;
    var key = classBuilder.build(block, elem);

    var classElem = item.elem ||
                    item._elem ||
                    (item.block ? undefined : context.elem);
    if (hasItem)
      out += ' ' + classBuilder.build(block, classElem);

    out += this.buildModsClasses(block, classElem,
      (item.elem || !item.block && (item._elem || context.elem)) ?
        item.elemMods : item.mods);

    if (item.js) {
      if (!js)
        js = {};

      js[classBuilder.build(block, item.elem)] =
          item.js === true ? {} : item.js;
      if (!addInit)
        addInit = this._elemJsInstances ?
          (item.elem || block) :
          (block && !item.elem);
    }

    // Process nexted mixes from BEMJON
    if (item.mix) {
      var nested = this.renderMix(entity, item.mix, js, addInit);
      js = utils.extend(js, nested.jsParams);
      addInit = nested.addJSInitClass;
      out += nested.out;
    }

    // Process nested mixes from templates
    if (!hasItem || visited[key])
      continue;

    visited[key] = true;
    var nestedEntity = this.entities[key];
    if (!nestedEntity)
      continue;

    var oldBlock = context.block;
    var oldElem = context.elem;
    var nestedMix = nestedEntity.mix.exec(context);
    context.elem = oldElem;
    context.block = oldBlock;

    if (!nestedMix)
      continue;

    for (var j = 0; j < nestedMix.length; j++) {
      var nestedItem = nestedMix[j];
      if (!nestedItem) continue;

      if (!nestedItem.block &&
          !nestedItem.elem ||
          !visited[classBuilder.build(nestedItem.block, nestedItem.elem)]) {
        if (nestedItem.block) continue;

        nestedItem._block = block;
        nestedItem._elem = elem;
        mix = mix.slice(0, i + 1).concat(
          nestedItem,
          mix.slice(i + 1)
        );
      }
    }
  }

  return {
    out: out,
    jsParams: js,
    addJSInitClass: addInit
  };
};

BEMHTML.prototype.buildModsClasses = function(block, elem, mods) {
  if (!mods)
    return '';

  var res = '';

  var modName;

  /*jshint -W089 */
  for (modName in mods) {
    if (!mods.hasOwnProperty(modName) || modName === '')
      continue;

    var modVal = mods[modName];
    if (!modVal && modVal !== 0) continue;
    if (typeof modVal !== 'boolean')
      modVal += '';

    var builder = this.classBuilder;
    res += ' ' + (elem ?
                  builder.buildElemClass(block, elem, modName, modVal) :
                  builder.buildBlockClass(block, modName, modVal));
  }

  return res;
};

},{"../bemxjst":7,"../bemxjst/utils":10,"./entity":1,"inherits":11}],3:[function(require,module,exports){
function ClassBuilder(options) {
  this.elemDelim = options.elem || '__';

  this.modDelim = typeof options.mod === 'string' ?
    {
      name: options.mod || '_',
      val: options.mod || '_'
    } :
    {
      name: options.mod && options.mod.name || '_',
      val: options.mod && options.mod.val || '_'
    };
}

exports.ClassBuilder = ClassBuilder;

ClassBuilder.prototype.build = function(block, elem) {
  if (!elem)
    return block;
  else
    return block + this.elemDelim + elem;
};

ClassBuilder.prototype.buildModPostfix = function(modName, modVal) {
  var res = this.modDelim.name + modName;
  if (modVal !== true) res += this.modDelim.val + modVal;
  return res;
};

ClassBuilder.prototype.buildBlockClass = function(name, modName, modVal) {
  var res = name;
  if (modVal) res += this.buildModPostfix(modName, modVal);
  return res;
};

ClassBuilder.prototype.buildElemClass = function(block, name, modName, modVal) {
  return this.buildBlockClass(block) +
    this.elemDelim +
    name +
    this.buildModPostfix(modName, modVal);
};

ClassBuilder.prototype.split = function(key) {
  return key.split(this.elemDelim, 2);
};

},{}],4:[function(require,module,exports){
var utils = require('./utils');

function Context(bemxjst) {
  this._bemxjst = bemxjst;

  this.ctx = null;
  this.block = '';

  // Save current block until the next BEM entity
  this._currBlock = '';

  this.elem = null;
  this.mods = {};
  this.elemMods = {};

  this.position = 0;
  this._listLength = 0;
  this._notNewList = false;

  this.escapeContent = bemxjst.options.escapeContent !== false;
}
exports.Context = Context;

Context.prototype._flush = null;

Context.prototype.isSimple = utils.isSimple;

Context.prototype.isShortTag = utils.isShortTag;
Context.prototype.extend = utils.extend;
Context.prototype.identify = utils.identify;

Context.prototype.xmlEscape = utils.xmlEscape;
Context.prototype.attrEscape = utils.attrEscape;
Context.prototype.jsAttrEscape = utils.jsAttrEscape;

Context.prototype.onError = function(context, e) {
  console.error('bem-xjst rendering error:', {
    block: context.ctx.block,
    elem: context.ctx.elem,
    mods: context.ctx.mods,
    elemMods: context.ctx.elemMods
  }, e);
};

Context.prototype.isFirst = function() {
  return this.position === 1;
};

Context.prototype.isLast = function() {
  return this.position === this._listLength;
};

Context.prototype.generateId = function() {
  return utils.identify(this.ctx);
};

Context.prototype.reapply = function(ctx) {
  return this._bemxjst.run(ctx);
};

},{"./utils":10}],5:[function(require,module,exports){
var utils = require('./utils');
var Match = require('./match').Match;
var tree = require('./tree');
var Template = tree.Template;
var PropertyMatch = tree.PropertyMatch;
var CompilerOptions = tree.CompilerOptions;

function Entity(bemxjst, block, elem, templates) {
  this.bemxjst = bemxjst;

  this.block = null;
  this.elem = null;

  // Compiler options via `xjstOptions()`
  this.options = {};

  // `true` if entity has just a default renderer for `def()` mode
  this.canFlush = true;

  // "Fast modes"
  this.def = new Match(this);
  this.mix = new Match(this, 'mix');
  this.js = new Match(this, 'js');
  this.mods = new Match(this, 'mods');
  this.elemMods = new Match(this, 'elemMods');
  this.content = new Match(this, 'content');

  // "Slow modes"
  this.rest = {};

  // Initialize
  this.init(block, elem);
  this.initModes(templates);
}
exports.Entity = Entity;

Entity.prototype.init = function(block, elem) {
  this.block = block;
  this.elem = elem;
};

Entity.prototype._keys = {
  content: 1,
  mix: 1,
  js: 1,
  mods: 1,
  elemMods: 1
};

Entity.prototype._initRest = function(key) {
  if (key === 'default') {
    this.rest[key] = this.def;
  } else if (this._keys[key]) {
    this.rest[key] = this[key];
  } else {
    this.rest[key] = this.rest[key] || new Match(this, key);
  }
};

Entity.prototype.initModes = function(templates) {
  /* jshint maxdepth : false */
  for (var i = 0; i < templates.length; i++) {
    var template = templates[i];

    for (var j = template.predicates.length - 1; j >= 0; j--) {
      var pred = template.predicates[j];
      if (!(pred instanceof PropertyMatch))
        continue;

      if (pred.key !== '_mode')
        continue;

      template.predicates.splice(j, 1);
      this._initRest(pred.value);

      // All templates should go there anyway
      this.rest[pred.value].push(template);
      break;
    }

    if (j === -1)
      this.def.push(template);

    // Merge compiler options
    for (var j = template.predicates.length - 1; j >= 0; j--) {
      var pred = template.predicates[j];
      if (!(pred instanceof CompilerOptions))
        continue;

      this.options = utils.extend(this.options, pred.options);
    }
  }
};

Entity.prototype.prepend = function(other) {
  // Prepend to the slow modes, fast modes are in this hashmap too anyway
  var keys = Object.keys(this.rest);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!other.rest[key])
      continue;

    this.rest[key].prepend(other.rest[key]);
  }

  // Add new slow modes
  keys = Object.keys(other.rest);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (this.rest[key])
      continue;

    this._initRest(key);
    this.rest[key].prepend(other.rest[key]);
  }
};

// NOTE: This could be potentially compiled into inlined invokations
Entity.prototype.run = function(context) {
  if (this.def.count !== 0)
    return this.def.exec(context);

  return this.defaultBody(context);
};


function contentMode() {
  return this.ctx.content;
}

Entity.prototype.setDefaults = function() {
  // Default .content() template for applyNext()
  if (this.content.count !== 0)
    this.content.push(new Template([], contentMode));

  // .def() default
  if (this.def.count !== 0) {
    this.canFlush = this.options.flush || false;
    var self = this;
    this.def.push(new Template([], function defaultBodyProxy() {
      return self.defaultBody(this);
    }));
  }
};

},{"./match":8,"./tree":9,"./utils":10}],6:[function(require,module,exports){
function BEMXJSTError(msg, func) {
  this.name = 'BEMXJSTError';
  this.message = msg;

  if (Error.captureStackTrace)
    Error.captureStackTrace(this, func || this.constructor);
  else
    this.stack = (new Error()).stack;
}

BEMXJSTError.prototype = Object.create(Error.prototype);
BEMXJSTError.prototype.constructor = BEMXJSTError;

exports.BEMXJSTError = BEMXJSTError;

},{}],7:[function(require,module,exports){
var inherits = require('inherits');

var Tree = require('./tree').Tree;
var PropertyMatch = require('./tree').PropertyMatch;
var AddMatch = require('./tree').AddMatch;
var Context = require('./context').Context;
var ClassBuilder = require('./class-builder').ClassBuilder;
var utils = require('./utils');

function BEMXJST(options) {
  this.options = options;

  this.entities = null;
  this.defaultEnt = null;

  // Current tree
  this.tree = null;

  // Current match
  this.match = null;

  // Create new Context constructor for overriding prototype
  this.contextConstructor = function ContextChild(bemxjst) {
    Context.call(this, bemxjst);
  };
  inherits(this.contextConstructor, Context);
  this.context = null;

  this.classBuilder = new ClassBuilder(this.options.naming || {});

  // Execution depth, used to invalidate `applyNext` bitfields
  this.depth = 0;

  // Do not call `_flush` on overridden `def()` mode
  this.canFlush = false;

  // oninit templates
  this.oninit = null;

  // Initialize default entity (no block/elem match)
  this.defaultEnt = new this.Entity(this, '', '', []);
  this.defaultElemEnt = new this.Entity(this, '', '', []);
}
module.exports = BEMXJST;

BEMXJST.prototype.locals = Tree.methods
    .concat('local', 'applyCtx', 'applyNext', 'apply');

BEMXJST.prototype.runOninit = function(oninits, ret) {
  var self = ret || this;

  self.BEMContext = this.contextConstructor;
  for (var i = 0; i < oninits.length; i++) {
    // NOTE: oninit has global context instead of BEMXJST
    var oninit = oninits[i];
    oninit(self, { BEMContext: self.BEMContext });
  }
};

BEMXJST.prototype.compile = function(code) {
  var self = this;

  function applyCtx() {
    return self.run(self.context.ctx);
  }

  function _applyCtx() {
    return self._run(self.context.ctx);
  }

  function applyCtxWrap(ctx, changes) {
    // Fast case
    if (!changes)
      return self.local({ ctx: ctx }, applyCtx);

    return self.local(changes, function() {
      return self.local({ ctx: ctx }, _applyCtx);
    });
  }

  function _applyCtxWrap(ctx, changes) {
    // Fast case
    if (!changes)
      return self.local({ ctx: ctx }, _applyCtx);

    return self.local(changes, function() {
      return self.local({ ctx: ctx }, applyCtx);
    });
  }

  function apply(mode, changes) {
    return self.applyMode(mode, changes);
  }

  function localWrap(changes) {
    return function localBody(body) {
      return self.local(changes, body);
    };
  }

  var tree = new Tree({
    refs: {
      applyCtx: applyCtxWrap,
      _applyCtx: _applyCtxWrap,
      apply: apply
    }
  });

  // Yeah, let people pass functions to us!
  var templates = this.recompileInput(code);

  var out = tree.build(templates, [
    localWrap,
    applyCtxWrap,
    function applyNextWrap(changes) {
      if (changes)
        return self.local(changes, applyNextWrap);
      return self.applyNext();
    },
    apply
  ]);

  // Concatenate templates with existing ones
  // TODO(indutny): it should be possible to incrementally add templates
  if (this.tree) {
    this.runOninit(out.oninit);

    out = {
      templates: out.templates.concat(this.tree.templates),
      oninit: this.tree.oninit.concat(out.oninit)
    };
  }
  this.tree = out;

  // Group block+elem entities into a hashmap
  var ent = this.groupEntities(out.templates);

  // Transform entities from arrays to Entity instances
  ent = this.transformEntities(ent);

  this.entities = ent;
  this.oninit = out.oninit;
};

BEMXJST.prototype.getTemplate = function(code, options) {
  this.compile(code, options);

  return this.exportApply();
};

BEMXJST.prototype.recompileInput = function(code) {
  var args = BEMXJST.prototype.locals;
  // Reuse function if it already has right arguments
  if (typeof code === 'function' && code.length === args.length)
    return code;

  return new Function(args.join(', '), utils.fnToString(code));
};

BEMXJST.prototype.groupEntities = function(tree) {
  var res = {};
  for (var i = 0; i < tree.length; i++) {
    // Make sure to change only the copy, the original is cached in `this.tree`
    var template = tree[i].clone();
    var block = null;
    var elem;

    elem = undefined;
    for (var j = 0; j < template.predicates.length; j++) {
      var pred = template.predicates[j];
      if (!(pred instanceof PropertyMatch) &&
        !(pred instanceof AddMatch))
        continue;

      if (pred.key === 'block')
        block = pred.value;
      else if (pred.key === 'elem')
        elem = pred.value;
      else
        continue;

      // Remove predicate, we won't much against it
      template.predicates.splice(j, 1);
      j--;
    }

    if (block === null) {
      var msg = 'block(…) subpredicate is not found.\n' +
      '    See template with subpredicates:\n     * ';

      for (var j = 0; j < template.predicates.length; j++) {
        var pred = template.predicates[j];

        if (j !== 0)
          msg += '\n     * ';

        if (pred.key === '_mode') {
          msg += pred.value + '()';
        } else {
          if (Array.isArray(pred.key)) {
            msg += pred.key[0].replace('mods', 'mod')
              .replace('elemMods', 'elemMod') +
              '(\'' + pred.key[1] + '\', \'' + pred.value + '\')';
          } else {
            msg += 'match(…)';
          }
        }
      }

      msg += '\n    And template body: \n    (' +
        (typeof template.body === 'function' ?
          template.body :
          JSON.stringify(template.body)) + ')';

      if (typeof BEMXJSTError === 'undefined') {
        BEMXJSTError = require('./error').BEMXJSTError;
      }

      throw new BEMXJSTError(msg);
    }

    var key = this.classBuilder.build(block, elem);

    if (!res[key])
      res[key] = [];
    res[key].push(template);
  }
  return res;
};

BEMXJST.prototype.transformEntities = function(entities) {
  var wildcardElems = [];

  var keys = Object.keys(entities);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    // TODO(indutny): pass this values over
    var parts = this.classBuilder.split(key);
    var block = parts[0];
    var elem = parts[1];

    if (elem === '*')
      wildcardElems.push(block);

    entities[key] = new this.Entity(
      this, block, elem, entities[key]);
  }

  // Merge wildcard block templates
  if (entities.hasOwnProperty('*')) {
    var wildcard = entities['*'];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === '*')
        continue;

      entities[key].prepend(wildcard);
    }
    this.defaultEnt.prepend(wildcard);
    this.defaultElemEnt.prepend(wildcard);
  }

  // Merge wildcard elem templates
  for (var i = 0; i < wildcardElems.length; i++) {
    var block = wildcardElems[i];
    var wildcardKey = this.classBuilder.build(block, '*');
    var wildcard = entities[wildcardKey];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === wildcardKey)
        continue;

      var entity = entities[key];
      if (entity.block !== block || entity.elem === undefined)
        continue;

      entities[key].prepend(wildcard);
    }
    this.defaultElemEnt.prepend(wildcard);
  }

  // Set default templates after merging with wildcard
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    entities[key].setDefaults();
    this.defaultEnt.setDefaults();
    this.defaultElemEnt.setDefaults();
  }

  return entities;
};

BEMXJST.prototype._run = function(context) {
  if (context === undefined || context === '' || context === null)
    return this.runEmpty();
  else if (Array.isArray(context))
    return this.runMany(context);
  else if (
    typeof context.html === 'string' &&
    !context.tag &&
    typeof context.block === 'undefined' &&
    typeof context.elem === 'undefined' &&
    typeof context.cls === 'undefined' &&
    typeof context.attrs === 'undefined'
  )
    return this.runUnescaped(context);
  else if (utils.isSimple(context))
    return this.runSimple(context);

  return this.runOne(context);
};

BEMXJST.prototype.run = function(json) {
  var match = this.match;
  var context = this.context;
  var depth = this.depth;

  this.match = null;
  this.context = new this.contextConstructor(this);
  this.canFlush = this.context._flush !== null;
  this.depth = 0;
  var res = this._run(json);

  if (this.canFlush)
    res = this.context._flush(res);

  this.match = match;
  this.context = context;
  this.depth = depth;

  return res;
};

BEMXJST.prototype.runEmpty = function() {
  this.context._listLength--;
  return '';
};

BEMXJST.prototype.runUnescaped = function(context) {
  this.context._listLength--;
  return '' + context.html;
};

BEMXJST.prototype.runSimple = function(simple) {
  this.context._listLength--;
  if (!simple && simple !== 0 || simple === true)
    return '';

  return typeof simple === 'string' && this.context.escapeContent ?
      utils.xmlEscape(simple) :
      simple;
};

BEMXJST.prototype.runOne = function(json) {
  var context = this.context;

  var oldCtx = context.ctx;
  var oldBlock = context.block;
  var oldCurrBlock = context._currBlock;
  var oldElem = context.elem;
  var oldMods = context.mods;
  var oldElemMods = context.elemMods;

  if (json.block || json.elem)
    context._currBlock = '';
  else
    context._currBlock = context.block;

  context.ctx = json;
  if (json.block) {
    context.block = json.block;

    if (json.mods)
      context.mods = json.mods;
    else if (json.block !== oldBlock || !json.elem)
      context.mods = {};
  } else {
    if (!json.elem)
      context.block = '';
    else if (oldCurrBlock)
      context.block = oldCurrBlock;
  }

  context.elem = json.elem;
  if (json.elemMods)
    context.elemMods = json.elemMods;
  else
    context.elemMods = {};

  var block = context.block || '';
  var elem = context.elem;

  // Control list position
  if (block || elem)
    context.position++;
  else
    context._listLength--;

  // To invalidate `applyNext` flags
  this.depth++;

  var restoreFlush = false;
  var ent = this.entities[this.classBuilder.build(block, elem)];
  if (ent) {
    if (this.canFlush && !ent.canFlush) {
      // Entity does not support flushing, do not flush anything nested
      restoreFlush = true;
      this.canFlush = false;
    }
  } else {
    // No entity - use default one
    ent = this.defaultEnt;
    if (elem !== undefined)
      ent = this.defaultElemEnt;
    ent.init(block, elem);
  }

  var res = this.options.production === true ?
    this.tryRun(context, ent) :
    ent.run(context);

  context.ctx = oldCtx;
  context.block = oldBlock;
  context.elem = oldElem;
  context.mods = oldMods;
  context.elemMods = oldElemMods;
  context._currBlock = oldCurrBlock;
  this.depth--;
  if (restoreFlush)
    this.canFlush = true;

  return res;
};

BEMXJST.prototype.tryRun = function(context, ent) {
  try {
    return ent.run(context);
  } catch (e) {
    return context.onError(context, e) || '';
  }
};

BEMXJST.prototype.renderContent = function(content, isBEM) {
  var context = this.context;
  var oldPos = context.position;
  var oldListLength = context._listLength;
  var oldNotNewList = context._notNewList;

  context._notNewList = false;
  if (isBEM) {
    context.position = 0;
    context._listLength = 1;
  }

  var res = this._run(content);

  context.position = oldPos;
  context._listLength = oldListLength;
  context._notNewList = oldNotNewList;

  return res;
};

BEMXJST.prototype.local = function(changes, body) {
  var keys = Object.keys(changes);
  var restore = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var parts = key.split('.');

    var value = this.context;
    for (var j = 0; j < parts.length - 1; j++)
      value = value[parts[j]];

    restore.push({
      parts: parts,
      value: value[parts[j]]
    });
    value[parts[j]] = changes[key];
  }

  var res = body.call(this.context);

  for (var i = 0; i < restore.length; i++) {
    var parts = restore[i].parts;
    var value = this.context;
    for (var j = 0; j < parts.length - 1; j++)
      value = value[parts[j]];

    value[parts[j]] = restore[i].value;
  }

  return res;
};

BEMXJST.prototype.applyNext = function() {
  return this.match.exec(this.context);
};

BEMXJST.prototype.applyMode = function(mode, changes) {
  var key;
  var match = this.match;

  if (!match) {
    var key = this.classBuilder.build(this.context.block, this.context.elem);
    match = this.entities[key].rest[mode];
  } else {
    match = this.match.entity.rest[mode];
  }

  if (!match) {
    if (mode === 'mods')
      return this.context.mods;

    if (mode === 'elemMods')
      return this.context.elemMods;

    return this.context.ctx[mode];
  }

  if (!changes)
    return match.exec(this.context);

  var self = this;

  // Allocate function this way, to prevent allocation at the top of the
  // `applyMode`
  var localBody = function() {
    return match.exec(self.context);
  };
  return this.local(changes, localBody);
};

BEMXJST.prototype.exportApply = function(exports) {
  var self = this;
  var ret = exports || {};

  ret.apply = function(context) {
    return self.run(context);
  };

  // Add templates at run time
  ret.compile = function(templates) {
    self.compile(templates);
    return ret;
  };

  this.runOninit(self.oninit, ret);

  return ret;
};

},{"./class-builder":3,"./context":4,"./error":6,"./tree":9,"./utils":10,"inherits":11}],8:[function(require,module,exports){
var tree = require('./tree');
var PropertyMatch = tree.PropertyMatch;
var AddMatch = tree.AddMatch;
var WrapMatch = tree.WrapMatch;
var ExtendMatch = tree.ExtendMatch;
var CustomMatch = tree.CustomMatch;

function MatchNested(template, pred) {
  this.template = template;
  this.keys = pred.key;
  this.value = pred.value;
}

MatchNested.prototype.exec = function(context) {
  var val = context;

  for (var i = 0; i < this.keys.length - 1; i++) {
    val = val[this.keys[i]];
    if (!val)
      return false;
  }

  val = val[this.keys[i]];

  if (this.value === true)
    return val !== undefined && val !== '' && val !== false && val !== null;

  return String(val) === this.value;
};

function MatchCustom(template, pred) {
  this.template = template;
  this.body = pred.body;
}

MatchCustom.prototype.exec = function(context) {
  return this.body.call(context, context, context.ctx);
};

function MatchWrap(template) {
  this.template = template;
  this.wrap = null;
}

MatchWrap.prototype.exec = function(context) {
  var res = this.wrap !== context.ctx;
  this.wrap = context.ctx;
  return res;
};

function MatchExtend(template) {
  this.template = template;
  this.wrap = null;
}

MatchExtend.prototype.exec = function(context) {
  var res = this.ext !== context.ctx;
  this.ext = context.ctx;
  return res;
};

function AddWrap(template, pred) {
  this.template = template;
  this.key = pred.key;
  this.value = pred.value;
}

AddWrap.prototype.exec = function(context) {
  return context[this.key] === this.value;
};

function MatchTemplate(mode, template) {
  this.mode = mode;
  this.predicates = new Array(template.predicates.length);
  this.body = template.body;

  var postpone = [];

  for (var i = 0, j = 0; i < this.predicates.length; i++, j++) {
    var pred = template.predicates[i];
    if (pred instanceof PropertyMatch) {
      this.predicates[j] = new MatchNested(this, pred);
    } else if (pred instanceof ExtendMatch) {
      j--;
      postpone.push(new MatchExtend(this));
    } else if (pred instanceof AddMatch) {
      this.predicates[j] = new AddWrap(this, pred);
    } else if (pred instanceof CustomMatch) {
      this.predicates[j] = new MatchCustom(this, pred);

      // Push MatchWrap later, they should not be executed first.
      // Otherwise they will set flag too early, and body might not be executed
    } else if (pred instanceof WrapMatch) {
      j--;
      postpone.push(new MatchWrap(this));
    } else {
      // Skip
      j--;
    }
  }

  // Insert late predicates
  for (var i = 0; i < postpone.length; i++, j++)
    this.predicates[j] = postpone[i];

  if (this.predicates.length !== j)
    this.predicates.length = j;
}
exports.MatchTemplate = MatchTemplate;

function Match(entity, modeName) {
  this.entity = entity;
  this.modeName = modeName;
  this.bemxjst = this.entity.bemxjst;
  this.templates = [];

  // applyNext mask
  this.mask = [ 0 ];

  // We are going to create copies of mask for nested `applyNext()`
  this.maskSize = 0;
  this.maskOffset = 0;

  this.count = 0;
  this.depth = -1;

  this.thrownError = null;
}
exports.Match = Match;

Match.prototype.prepend = function(other) {
  this.templates = other.templates.concat(this.templates);
  this.count += other.count;

  while (Math.ceil(this.count / 31) > this.mask.length)
    this.mask.push(0);

  this.maskSize = this.mask.length;
};

Match.prototype.push = function(template) {
  this.templates.push(new MatchTemplate(this, template));
  this.count++;

  if (Math.ceil(this.count / 31) > this.mask.length)
    this.mask.push(0);

  this.maskSize = this.mask.length;
};

Match.prototype.tryCatch = function(fn, ctx) {
  try {
    return fn.call(ctx, ctx, ctx.ctx);
  } catch (e) {
    this.thrownError = e;
    if (this.modeName) {
      this.thrownError.ctx = ctx;
      this.thrownError.name = 'BEMXJST ERROR';
      var classBuilder = this.entity.bemxjst.classBuilder;

      var cause = e.stack.split('\n')[1];
      this.thrownError.message = 'Template error in mode ' +
            this.modeName + ' in block ' +
            classBuilder.build(ctx.ctx.block, ctx.ctx.elem) +
            '\n    ' + e.message + '\n';
      this.thrownError.stack = this.thrownError.name + ': ' +
            this.thrownError.message + ' ' + cause + '\n' + e.stack;
    }
  }
};

Match.prototype.exec = function(context) {
  var save = this.checkDepth();

  var template;
  var bitIndex = this.maskOffset;
  var mask = this.mask[bitIndex];
  var bit = 1;
  for (var i = 0; i < this.count; i++) {
    if ((mask & bit) === 0) {
      template = this.templates[i];
      for (var j = 0; j < template.predicates.length; j++) {
        var pred = template.predicates[j];

        /* jshint maxdepth : false */
        if (!pred.exec(context))
          break;
      }

      // All predicates matched!
      if (j === template.predicates.length)
        break;
    }

    if (bit === 0x40000000) {
      bitIndex++;
      mask = this.mask[bitIndex];
      bit = 1;
    } else {
      bit <<= 1;
    }
  }

  if (i === this.count) {
    this.restoreDepth(save);

    if (this.modeName === 'mods')
      return context.mods;

    if (this.modeName === 'elemMods')
      return context.elemMods;

    return context.ctx[this.modeName];
  }

  var oldMask = mask;
  var oldMatch = this.bemxjst.match;
  this.mask[bitIndex] |= bit;
  this.bemxjst.match = this;

  this.thrownError = null;

  var out;
  if (typeof template.body === 'function')
    out = this.tryCatch(template.body, context);
  else
    out = template.body;

  this.mask[bitIndex] = oldMask;
  this.bemxjst.match = oldMatch;
  this.restoreDepth(save);

  var e = this.thrownError;
  if (e !== null) {
    this.thrownError = null;
    throw e;
  }

  return out;
};

Match.prototype.checkDepth = function() {
  if (this.depth === -1) {
    this.depth = this.bemxjst.depth;
    return -1;
  }

  if (this.bemxjst.depth === this.depth)
    return this.depth;

  var depth = this.depth;
  this.depth = this.bemxjst.depth;

  this.maskOffset += this.maskSize;

  while (this.mask.length < this.maskOffset + this.maskSize)
    this.mask.push(0);

  return depth;
};

Match.prototype.restoreDepth = function(depth) {
  if (depth !== -1 && depth !== this.depth)
    this.maskOffset -= this.maskSize;
  this.depth = depth;
};

},{"./tree":9}],9:[function(require,module,exports){
var inherits = require('inherits');
var utils = require('./utils');

function Template(predicates, body) {
  this.predicates = predicates;

  this.body = body;
}
exports.Template = Template;

Template.prototype.wrap = function() {
  var body = this.body;
  for (var i = 0; i < this.predicates.length; i++) {
    var pred = this.predicates[i];
    body = pred.wrapBody(body);
  }
  this.body = body;
};

Template.prototype.clone = function() {
  return new Template(this.predicates.slice(), this.body);
};

function MatchBase() {
}
exports.MatchBase = MatchBase;

MatchBase.prototype.wrapBody = function(body) {
  return body;
};

function Item(tree, children) {
  this.conditions = [];
  this.children = [];

  for (var i = children.length - 1; i >= 0; i--) {
    var arg = children[i];
    if (arg instanceof MatchBase)
      this.conditions.push(arg);
    else if (arg === tree.boundBody)
      this.children[i] = tree.queue.pop();
    else
      this.children[i] = arg;
  }
}

function WrapMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(WrapMatch, MatchBase);
exports.WrapMatch = WrapMatch;

WrapMatch.prototype.wrapBody = function(body) {
  var _applyCtx = this.refs._applyCtx;

  if (typeof body !== 'function') {
    return function() {
      return _applyCtx(body);
    };
  }

  return function() {
    return _applyCtx(body.call(this, this, this.ctx));
  };
};

function ReplaceMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(ReplaceMatch, MatchBase);
exports.ReplaceMatch = ReplaceMatch;

ReplaceMatch.prototype.wrapBody = function(body) {
  var applyCtx = this.refs.applyCtx;

  if (typeof body !== 'function') {
    return function() {
      return applyCtx(body, { position: this.position - 1 });
    };
  }

  return function() {
    return applyCtx(body.call(this, this, this.ctx),
                    { position: this.position - 1 });
  };
};

function ExtendMatch(refs) {
  MatchBase.call(this);

  this.refs = refs;
}
inherits(ExtendMatch, MatchBase);
exports.ExtendMatch = ExtendMatch;

ExtendMatch.prototype.wrapBody = function(body) {
  var refs = this.refs;
  var applyCtx = refs.applyCtx;

  if (typeof body !== 'function') {
    return function() {
      var changes = {};

      var keys = Object.keys(body);
      for (var i = 0; i < keys.length; i++)
        changes[keys[i]] = body[keys[i]];

      return applyCtx(this.ctx, changes);
    };
  }

  return function() {
    var changes = {};

    var obj = body.call(this, this, this.ctx);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++)
      changes[keys[i]] = obj[keys[i]];

    return applyCtx(this.ctx, changes);
  };
};

function AddMatch(mode, refs) {
  MatchBase.call(this);

  this.mode = mode;
  this.refs = refs;
}
inherits(AddMatch, MatchBase);
exports.AddMatch = AddMatch;

AddMatch.prototype.wrapBody = function(body) {
  return this[this.mode + 'WrapBody'](body);
};

AddMatch.prototype.appendContentWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      return [ apply('content') , body ];
    };
  }

  return function() {
    return [ apply('content'), body.call(this, this, this.ctx) ];
  };
};

AddMatch.prototype.prependContentWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      return [ body, apply('content') ];
    };
  }

  return function() {
    return [ body.call(this, this, this.ctx), apply('content') ];
  };
};

AddMatch.prototype.mixWrapBody = function(body) {
  var apply = this.refs.apply;

  if (typeof body !== 'function') {
    return function() {
      var ret = apply('mix');
      /* istanbul ignore else */
      if (!Array.isArray(ret)) ret = [ ret ];
      return ret.concat(body);
    };
  }

  return function() {
    var ret = apply('mix');
    if (!Array.isArray(ret)) ret = [ ret ];
    return ret.concat(body.call(this, this, this.ctx));
  };
};

[ 'attrs', 'js', 'mods', 'elemMods' ].forEach(function(method) {
  AddMatch.prototype[ method + 'WrapBody'] = function(body) {
    var apply = this.refs.apply;

    return typeof body !== 'function' ?
      function() {
        return (this[method] = utils.extend(apply(method) || {}, body));
      } :
      function() {
        return (this[method] = utils.extend(apply(method) || {},
                               body.call(this, this, this.ctx)));
      };
  };
});

function CompilerOptions(options) {
  MatchBase.call(this);
  this.options = options;
}
inherits(CompilerOptions, MatchBase);
exports.CompilerOptions = CompilerOptions;

function PropertyMatch(key, value) {
  MatchBase.call(this);

  this.key = key;
  this.value = value;
}
inherits(PropertyMatch, MatchBase);
exports.PropertyMatch = PropertyMatch;

function CustomMatch(body) {
  MatchBase.call(this);

  this.body = body;
}
inherits(CustomMatch, MatchBase);
exports.CustomMatch = CustomMatch;

function Tree(options) {
  this.options = options;
  this.refs = this.options.refs;

  this.boundBody = this.body.bind(this);

  var methods = this.methods('body');
  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    // NOTE: method.name is empty because of .bind()
    this.boundBody[Tree.methods[i]] = method;
  }

  this.queue = [];
  this.templates = [];
  this.initializers = [];
}
exports.Tree = Tree;

Tree.methods = [
  // Subpredicates:
  'match', 'block', 'elem', 'mod', 'elemMod',
  // Runtime related:
  'oninit', 'xjstOptions',
  // Output generators:
  'wrap', 'replace', 'extend', 'mode', 'def',
  'content', 'appendContent', 'prependContent',
  'attrs', 'addAttrs', 'js', 'addJs', 'mix', 'addMix',
  'mods', 'addMods', 'addElemMods', 'elemMods',
  'tag', 'cls', 'bem'
];

Tree.prototype.build = function(templates, apply) {
  var methods = this.methods('global').concat(apply);
  methods[0] = this.match.bind(this);

  templates.apply({}, methods);

  return {
    templates: this.templates.slice().reverse(),
    oninit: this.initializers
  };
};

function methodFactory(self, kind, name) {
  var method = self[name];
  var boundBody = self.boundBody;

  if (kind !== 'body') {
    if (name === 'replace' || name === 'extend' || name === 'wrap') {
      return function() {
        return method.apply(self, arguments);
      };
    }

    return function() {
      method.apply(self, arguments);
      return boundBody;
    };
  }

  return function() {
    var res = method.apply(self, arguments);

    // Insert body into last item
    var child = self.queue.pop();
    var last = self.queue[self.queue.length - 1];
    last.conditions = last.conditions.concat(child.conditions);
    last.children = last.children.concat(child.children);

    if (name === 'replace' || name === 'extend' || name === 'wrap')
      return res;
    return boundBody;
  };
}

Tree.prototype.methods = function(kind) {
  var out = new Array(Tree.methods.length);

  for (var i = 0; i < out.length; i++) {
    var name = Tree.methods[i];
    out[i] = methodFactory(this, kind, name);
  }

  return out;
};

// Called after all matches
Tree.prototype.flush = function(conditions, item) {
  var subcond = item.conditions ?
    conditions.concat(item.conditions) :
    item.conditions;

  for (var i = 0; i < item.children.length; i++) {
    var arg = item.children[i];

    // Go deeper
    if (arg instanceof Item) {
      this.flush(subcond, item.children[i]);

    // Body
    } else {
      if (this.isShortcutAllowed(arg, conditions)) {
        var keys = Object.keys(arg);
        for (var n = 0; n < keys.length; n++)
          this.addTemplate(
            conditions.concat(this.createMatch(keys[n])),
            arg[keys[n]]
          );
      } else {
        this.addTemplate(conditions, arg);
      }
    }
  }
};

Tree.prototype.createMatch = function(modeName) {
  switch (modeName) {
    case 'addAttrs':
      return [
        new PropertyMatch('_mode', 'attrs'),
        new AddMatch('attrs', this.refs)
      ];
    case 'addJs':
      return [
        new PropertyMatch('_mode', 'js'),
        new AddMatch('js', this.refs)
      ];
    case 'addMix':
      return [
        new PropertyMatch('_mode', 'mix'),
        new AddMatch('mix', this.refs)
      ];
    case 'addMods':
      return [
        new PropertyMatch('_mode', 'mods'),
        new AddMatch('mods', this.refs)
      ];
    case 'addElemMods':
      return [
        new PropertyMatch('_mode', 'elemMods'),
        new AddMatch('elemMods', this.refs)
      ];
    case 'appendContent':
    case 'prependContent':
      return [
        new PropertyMatch('_mode', 'content'),
        new AddMatch(modeName, this.refs)
      ];

    case 'wrap':
      return new WrapMatch(this.refs);

    case 'replace':
      return new ReplaceMatch(this.refs);

    case 'extend':
      return new ExtendMatch(this.refs);

    case 'def':
      return new PropertyMatch('_mode', 'default');

    default:
      return new PropertyMatch('_mode', modeName);
  }
};

Tree.prototype.addTemplate = function(conditions, arg) {
  var template = new Template(conditions, arg);
  template.wrap();
  this.templates.push(template);
};

Tree.prototype.body = function() {
  var children = new Array(arguments.length);
  for (var i = 0; i < arguments.length; i++)
    children[i] = arguments[i];

  var child = new Item(this, children);
  this.queue[this.queue.length - 1].children.push(child);

  if (this.queue.length === 1)
    this.flush([], this.queue.shift());

  return this.boundBody;
};

Tree.modsCheck = { mods: 1, elemMods: 1 };

Tree.checkConditions = function(conditions) {
  for (var i = 0; i < conditions.length; i++) {
    var condition = conditions[i];
    if (condition.key === 'block' ||
      condition.key === 'elem' ||
      (Array.isArray(condition.key) && Tree.modsCheck[condition.key[0]]) ||
      condition instanceof CustomMatch) continue;
    return false;
  }

  return true;
};

Tree.prototype.isShortcutAllowed = function(arg, conditions) {
  return typeof arg === 'object' &&
    arg !== null &&
    !Array.isArray(arg) &&
    Tree.checkConditions(conditions);
};

Tree.prototype.match = function() {
  var children = new Array(arguments.length);

  if (!arguments.length)
    throw new Error('.match() must have argument');

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (typeof arg === 'function')
      arg = new CustomMatch(arg);

    if (!(arg instanceof MatchBase))
      throw new Error('Wrong .match() argument');

    children[i] = arg;
  }

  this.queue.push(new Item(this, children));

  return this.boundBody;
};

Tree.prototype.applyMode = function(args, mode) {
  if (args.length) {
    throw new Error('Predicate should not have arguments but ' +
      JSON.stringify(args) + ' passed');
  }

  return this.mode(mode);
};

Tree.prototype.xjstOptions = function(options) {
  this.queue.push(new Item(this, [
    new CompilerOptions(options)
  ]));
  return this.boundBody;
};

[ 'mode', 'elem', 'block' ].forEach(function(method) {
  Tree.prototype[method] = function(name) {
    return this.match(new PropertyMatch(
      method === 'mode' ? '_mode' : method, name));
  };
});

[ 'mod', 'elemMod' ].forEach(function(method) {
  Tree.prototype[method] = function(name, value) {
    return this.match(new PropertyMatch([ method + 's', name ],
                                  value === undefined ? true : String(value)));
  };
});

Tree.prototype.def = function() {
  return this.applyMode(arguments, 'default');
};

[
  'content', 'mix', 'bem', 'js', 'cls', 'attrs', 'tag', 'elemMods', 'mods'
].forEach(function(method) {
  Tree.prototype[method] = function() {
    return this.applyMode(arguments, method);
  };
});

[ 'appendContent', 'prependContent' ].forEach(function(method) {
  Tree.prototype[method] = function() {
    return this.content.apply(this, arguments)
      .match(new AddMatch(method, this.refs));
  };
});

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

[ 'mods', 'elemMods', 'attrs', 'js', 'mix' ].forEach(function(method) {
  Tree.prototype['add' + capitalize(method)] = function() {
    return this[method].apply(this, arguments)
      .match(new AddMatch(method, this.refs));
  };
});

Tree.prototype.wrap = function() {
  return this.def.apply(this, arguments).match(new WrapMatch(this.refs));
};

Tree.prototype.replace = function() {
  return this.def.apply(this, arguments).match(new ReplaceMatch(this.refs));
};

Tree.prototype.extend = function() {
  return this.def.apply(this, arguments).match(new ExtendMatch(this.refs));
};

Tree.prototype.oninit = function(fn) {
  this.initializers.push(fn);
};

},{"./utils":10,"inherits":11}],10:[function(require,module,exports){
var amp = '&amp;';
var lt = '&lt;';
var gt = '&gt;';
var quot = '&quot;';
var singleQuot = '&#39;';

var matchXmlRegExp = /[&<>]/;

function isEmpty(string) {
  return typeof string === 'undefined' ||
     string === null ||
     (typeof string === 'number' && isNaN(string));
}

exports.xmlEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchXmlRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 38: // &
        escape = amp;
        break;
      case 60: // <
        escape = lt;
        break;
      case 62: // >
        escape = gt;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

var matchAttrRegExp = /["&]/;

exports.attrEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchAttrRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = quot;
        break;
      case 38: // &
        escape = amp;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

var matchJsAttrRegExp = /['&]/;

exports.jsAttrEscape = function(string) {
  if (isEmpty(string))
    return '';

  var str = '' + string;
  var match = matchJsAttrRegExp.exec(str);

  if (!match)
    return str;

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 38: // &
        escape = amp;
        break;
      case 39: // '
        escape = singleQuot;
        break;
      default:
        continue;
    }

    if (lastIndex !== index)
      html += str.substring(lastIndex, index);

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ?
    html + str.substring(lastIndex, index) :
    html;
};

exports.extend = function(o1, o2) {
  if (!o1 || !o2)
    return o1 || o2;

  var res = {};
  var n;

  for (n in o1)
    /* istanbul ignore else */
    if (o1.hasOwnProperty(n))
      res[n] = o1[n];
  for (n in o2)
    /* istanbul ignore else */
    if (o2.hasOwnProperty(n))
      res[n] = o2[n];
  return res;
};

var SHORT_TAGS = { // hash for quick check if tag short
  area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1,
  input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, wbr: 1
};

exports.isShortTag = function(t) {
  return SHORT_TAGS.hasOwnProperty(t);
};

exports.isSimple = function isSimple(obj) {
  if (!obj || obj === true) return true;
  if (!obj.block &&
      !obj.elem &&
      !obj.tag &&
      !obj.cls &&
      !obj.attrs &&
      obj.hasOwnProperty('html') &&
      isSimple(obj.html))
    return true;
  return typeof obj === 'string' || typeof obj === 'number';
};

exports.isObj = function(val) {
  return val && typeof val === 'object' && !Array.isArray(val) &&
    val !== null;
};

var uniqCount = 0;
var uniqId = +new Date();
var uniqExpando = '__' + uniqId;
var uniqPrefix = 'uniq' + uniqId;

function getUniq() {
  return uniqPrefix + (++uniqCount);
}
exports.getUniq = getUniq;

exports.identify = function(obj, onlyGet) {
  if (!obj)
    return getUniq();
  if (onlyGet || obj[uniqExpando])
    return obj[uniqExpando];

  var u = getUniq();
  obj[uniqExpando] = u;
  return u;
};

exports.fnToString = function(code) {
  // It is fine to compile without templates at first
  if (!code)
    return '';

  if (typeof code === 'function') {
    // Examples for regular function
    //   function () { … }
    //   function name() { … }
    //   function (a, b) { … }
    //   function name(a, b) { … }
    //
    // Examples for arrow function
    //   () => { … }
    //   (a, b) => { … }
    //   _ => { … }

    code = code.toString();
    code = code.replace(
      code.indexOf('function') === 0 ?
      /^function\s*[^{]+{|}$/g :
      /^(_|\(\w|[^=>]+\))\s=>\s{|}$/g,
    '');
  }

  return code;
};

/**
 * regexp for check may attribute be unquoted
 *
 * https://www.w3.org/TR/html4/intro/sgmltut.html#h-3.2.2
 * https://www.w3.org/TR/html5/syntax.html#attributes
 */
var UNQUOTED_ATTR_REGEXP = /^[:\w.-]+$/;

exports.isUnquotedAttr = function(str) {
  return str && UNQUOTED_ATTR_REGEXP.exec(str);
};

},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}]},{},[2])(2)
});;
return module.exports || exports.BEMHTML;
}({}, {});
var api = new BEMHTML({"elemJsInstances":true,"exportName":"BEMHTML","sourceMap":{"from":"zuriona.bemhtml.js"},"to":"/Users/anton/Documents/GitHub/whitepaper-portal"});
api.compile(function(match, block, elem, mod, elemMod, oninit, xjstOptions, wrap, replace, extend, mode, def, content, appendContent, prependContent, attrs, addAttrs, js, addJs, mix, addMix, mods, addMods, addElemMods, elemMods, tag, cls, bem, local, applyCtx, applyNext, apply) {
/* BEM-XJST User code here: */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/page.bemhtml.js */
block('page')(

    mode('doctype')(function() {
        return { html : this.ctx.doctype || '<!DOCTYPE html>' };
    }),

    wrap()(function() {
        var ctx = this.ctx;
        this._nonceCsp = ctx.nonce;

        return [
            apply('doctype'),
            {
                tag : 'html',
                attrs : { lang : ctx.lang },
                cls : 'ua_js_no',
                content : [
                    {
                        elem : 'head',
                        content : [
                            { tag : 'meta', attrs : { charset : 'utf-8' } },
                            ctx.uaCompatible === false? '' : {
                                tag : 'meta',
                                attrs : {
                                    'http-equiv' : 'X-UA-Compatible',
                                    content : ctx.uaCompatible || 'IE=edge'
                                }
                            },
                            { tag : 'title', content : ctx.title },
                            { block : 'ua', attrs : { nonce : ctx.nonce } },
                            ctx.head,
                            ctx.styles,
                            ctx.favicon? { elem : 'favicon', url : ctx.favicon } : ''
                        ]
                    },
                    ctx
                ]
            }
        ];
    }),

    tag()('body'),

    content()(function() {
        return [
            applyNext(),
            this.ctx.scripts
        ];
    }),

    elem('head')(
        bem()(false),
        tag()('head')
    ),

    elem('meta')(
        bem()(false),
        tag()('meta')
    ),

    elem('link')(
        bem()(false),
        tag()('link')
    ),

    elem('favicon')(
        bem()(false),
        tag()('link'),
        attrs()(function() {
            return this.extend(applyNext() || {}, { rel : 'shortcut icon', href : this.ctx.url });
        })
    )

);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/page.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/ua/ua.bemhtml.js */
block('ua')(
    tag()('script'),
    bem()(false),
    content()([
        '(function(e,c){',
            'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");',
        '})(document.documentElement,"className");'
    ])
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/ua/ua.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/__css/page__css.bemhtml.js */
block('page').elem('css')(
    bem()(false),
    tag()('style'),
    match(function() { return this.ctx.url; })(
        tag()('link'),
        attrs()(function() {
            return this.extend(applyNext() || {}, { rel : 'stylesheet', href : this.ctx.url });
        })
    )
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/__css/page__css.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/__js/page__js.bemhtml.js */
block('page').elem('js')(
    bem()(false),
    tag()('script'),
    attrs()(function() {
        var attrs = {};
        if(this.ctx.url) {
            attrs.src = this.ctx.url;
        } else if(this._nonceCsp) {
            attrs.nonce = this._nonceCsp;
        }

        return this.extend(applyNext() || {}, attrs);
    })
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/page/__js/page__js.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/ua/__svg/ua__svg.bemhtml.js */
block('ua').content()(function() {
    return [
        applyNext(),
        {
            html : [
                '(function(d,n){',
                    'd.documentElement.className+=',
                    '" ua_svg_"+(d[n]&&d[n]("http://www.w3.org/2000/svg","svg").createSVGRect?"yes":"no");',
                '})(document,"createElementNS");'
            ].join('')
        }
    ];
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-core/common.blocks/ua/__svg/ua__svg.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/common.blocks/menu-zuriona/menu-zuriona.bemhtml.js */
block('menu-zuriona')(
    content()(function () {
        return {
            elem: 'container',
            mix: { block: 'tpl-layout', elem: 'container', elemMods: { size: 'm', align: 'center' }, },
            attrs: { style: 'width:1024px;' },
            content: [
                {
                    elem: 'logo',
                },
                {
                    elem: 'nav',
                    content: [
                        {
                            block: 'text',
                            mods: { size: 'm', view: 'primary', },
                            mix: { block: 'menu-zuriona', elem: 'item', elemMods: { view: 'link' }, },
                            content: 'Щенки'

                        },
                        {


                            block: 'text',
                            mods: { size: 'm', view: 'primary', },
                            mix: { block: 'menu-zuriona', elem: 'item', elemMods: { view: 'link' }, },
                            content: 'О питомнике'


                        },
                        {

                            block: 'text',
                            mods: { size: 'm', view: 'primary', },
                            mix: { block: 'menu-zuriona', elem: 'item', elemMods: { view: 'link' }, },
                            content: 'О породе'


                        },
                        {

                            block: 'text',
                            mods: { size: 'm', view: 'primary', },
                            mix: { block: 'menu-zuriona', elem: 'item', elemMods: { view: 'link' }, },
                            content: 'Контакты'


                        },
                        {

                            block: 'text',
                            mods: { size: 'm', view: 'primary', },
                            mix: { block: 'menu-zuriona', elem: 'item' },
                            content: '+7 909 381 95 40'

                        }
                    ]
                },
            ]
        }
    }
    )
);
/* end: /Users/anton/Documents/GitHub/whitepaper-portal/common.blocks/menu-zuriona/menu-zuriona.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/icon/icon.bemhtml.js */
block('icon')(
    tag()('span'),
    addAttrs()(function() {
        var attrs = {},
            url = this.ctx.url;
        if(url) attrs.style = 'background-image:url(' + url + ')';
        return attrs;
    })
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/icon/icon.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_telegram.bemhtml.js */
block('social-icon').mod('name', 'telegram')({
	content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill-rule="evenodd" d="M6.995 13.249L8.48 17.73c.196.493.1.69.666.69.437 0 .63-.182.874-.4l2.1-1.872 4.365 2.96c.803.406 1.383.196 1.583-.685l2.866-12.387c.294-1.078-.448-1.568-1.217-1.248L2.887 10.74c-1.15.422-1.141 1.01-.21 1.272l4.32 1.237-.002-.001zM8 12.668l8.996-5.205c.472-.262.905-.122.55.168l-8.103 6.705-.165 2.27L8 12.669v-.001z"/></svg>' }
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_telegram.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_twitter.bemhtml.js */
block('social-icon').mod('name', 'twitter')({
	content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="M14.839 4.335c-1.718.624-2.801 2.232-2.678 3.991l.041.679-.686-.082c-2.498-.32-4.682-1.401-6.534-3.217l-.907-.9-.233.665c-.495 1.484-.178 3.05.85 4.103.55.582.427.665-.521.318-.329-.111-.617-.193-.645-.153-.096.097.234 1.359.494 1.857.358.694 1.084 1.373 1.881 1.774l.673.32-.796.014c-.769 0-.796.014-.714.304.274.902 1.36 1.857 2.567 2.275l.85.29-.74.442c-1.099.638-2.39 1-3.68 1.026-.617.015-1.126.07-1.126.112 0 .138 1.676.914 2.65 1.22 2.924.9 6.397.512 9.006-1.026 1.854-1.095 3.706-3.271 4.572-5.378.466-1.122.933-3.174.933-4.157 0-.638.042-.721.81-1.484.453-.444.88-.928.961-1.067.137-.263.123-.263-.577-.027-1.166.415-1.331.36-.754-.264.425-.444.933-1.247.933-1.483 0-.041-.206.029-.44.153-.247.138-.795.347-1.207.47l-.742.236-.673-.456c-.37-.25-.892-.528-1.165-.611a4.273 4.273 0 0 0-1.098-.13c-.478 0-.959.065-1.305.186z"/></defs><use xlink:href="#a" fill-rule="evenodd"/></svg>' }
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_twitter.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_codepen.bemhtml.js */
block('social-icon').mod('name', 'codepen')({
	content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M18.1521392,13.8613333 C18.1521392,13.8847089 18.1504937,13.9077468 18.1474135,13.9307848 C18.1462743,13.9382532 18.1444599,13.9460591 18.1431941,13.9535274 C18.1404515,13.9684641 18.1378354,13.9834008 18.1339114,13.998 C18.1316751,14.0067764 18.1284262,14.015173 18.1256414,14.023654 C18.1214219,14.0366076 18.1172447,14.0496456 18.1120549,14.0626414 C18.1084684,14.0713755 18.104038,14.0798143 18.1001983,14.0882532 C18.0945021,14.1002785 18.0886371,14.1119241 18.0821814,14.123654 C18.0774135,14.1317553 18.072097,14.1398987 18.0670338,14.148 C18.059903,14.1590549 18.0526456,14.1697722 18.0446709,14.1801519 C18.0388059,14.1882532 18.0328143,14.1957215 18.0263586,14.2031899 C18.0180464,14.2128945 18.00927,14.2226414 18.0000295,14.2317131 C17.9930253,14.2388861 17.9861899,14.2460169 17.9789325,14.2525148 C17.9693544,14.2612911 17.9591435,14.26973 17.9487637,14.2778312 C17.9409156,14.2840338 17.9331519,14.2901941 17.9248397,14.2960169 C17.9218017,14.298 17.9190591,14.3005738 17.9159367,14.3025148 L12.275135,18.0631899 C12.1860211,18.1225992 12.0835738,18.1524304 11.9808312,18.1524304 C11.8784262,18.1524304 11.7758101,18.1225992 11.6866962,18.0631899 L6.04572574,14.3025148 C6.04277215,14.3005738 6.04002954,14.298 6.03711814,14.2960169 C6.02880591,14.2901941 6.02087342,14.2840338 6.01306751,14.2778312 C6.00268776,14.26973 5.99260338,14.2612911 5.98302532,14.2525148 C5.97572574,14.2460169 5.96876371,14.2388861 5.96175949,14.2317131 C5.95251899,14.2226414 5.94395359,14.2128945 5.9353038,14.2031899 C5.92914346,14.1957215 5.92298312,14.1882532 5.91716034,14.1801519 C5.90935443,14.1697722 5.90188608,14.1590549 5.89488186,14.148 C5.88952321,14.1398987 5.88450211,14.1317553 5.87964979,14.123654 C5.8731519,14.1119241 5.86732911,14.1002785 5.86163291,14.0882532 C5.85758228,14.0798143 5.85348945,14.0713755 5.84977637,14.0626414 C5.8445865,14.0496456 5.84019831,14.0366076 5.83614768,14.023654 C5.83323629,14.015173 5.83032489,14.0067764 5.82787764,13.998 C5.82395359,13.9834008 5.82137975,13.9684641 5.81859494,13.9535274 C5.81732911,13.9460591 5.81538819,13.9382532 5.81437553,13.9307848 C5.81129536,13.9077468 5.80952321,13.8847089 5.80952321,13.8613333 L5.80952321,10.1006582 C5.80952321,10.0772827 5.81129536,10.0542447 5.81437553,10.0315021 C5.81538819,10.0237384 5.81732911,10.01627 5.81859494,10.0084641 C5.82137975,9.99352743 5.82395359,9.97859072 5.82787764,9.96399156 C5.83032489,9.95521519 5.83323629,9.94677637 5.83614768,9.93833755 C5.84019831,9.92534177 5.8445865,9.91238819 5.84977637,9.89968776 C5.85348945,9.89095359 5.85758228,9.88217722 5.86163291,9.8737384 C5.86732911,9.86171308 5.8731519,9.85002532 5.87964979,9.83867511 C5.88450211,9.83023629 5.88952321,9.82213502 5.89488186,9.81399156 C5.90188608,9.8029789 5.90935443,9.7922616 5.91716034,9.78183966 C5.92298312,9.77407595 5.92914346,9.76627004 5.9353038,9.75884388 C5.94395359,9.74909705 5.95251899,9.73935021 5.96175949,9.73023629 C5.96876371,9.72310549 5.97572574,9.71597468 5.98302532,9.70947679 C5.99260338,9.70070042 6.00268776,9.6922616 6.01306751,9.68411814 C6.02087342,9.67795781 6.02880591,9.67179747 6.03711814,9.66597468 C6.04002954,9.66399156 6.04277215,9.66141772 6.04572574,9.65947679 L11.6866962,5.89880169 C11.8649241,5.77998312 12.096865,5.77998312 12.275135,5.89880169 L17.9159367,9.65947679 C17.9190591,9.66141772 17.9218017,9.66399156 17.9248397,9.66597468 C17.9331519,9.67179747 17.9409156,9.67795781 17.9487637,9.68411814 C17.9591435,9.6922616 17.9693544,9.70070042 17.9789325,9.70947679 C17.9861899,9.71597468 17.9930253,9.72310549 18.0000295,9.73023629 C18.00927,9.73935021 18.0180464,9.74909705 18.0263586,9.75884388 C18.0328143,9.76627004 18.0388059,9.77407595 18.0446709,9.78183966 C18.0526456,9.7922616 18.059903,9.8029789 18.0670338,9.81399156 C18.072097,9.82213502 18.0774135,9.83023629 18.0821814,9.83867511 C18.0886371,9.85002532 18.0945021,9.86171308 18.1001983,9.8737384 C18.104038,9.88217722 18.1084684,9.89095359 18.1120549,9.89968776 C18.1172447,9.91238819 18.1214219,9.92534177 18.1256414,9.93833755 C18.1284262,9.94677637 18.1316751,9.95521519 18.1339114,9.96399156 C18.1378354,9.97859072 18.1404515,9.99352743 18.1431941,10.0084641 C18.1444599,10.01627 18.1462743,10.0237384 18.1474135,10.0315021 C18.1504937,10.0542447 18.1521392,10.0772827 18.1521392,10.1006582 L18.1521392,13.8613333 Z M11.9808312,2.00002532 C17.4932785,2.00002532 21.9618017,6.46859072 21.9618017,11.9809958 C21.9618017,17.493443 17.4932785,21.9617975 11.9808312,21.9617975 C6.46872152,21.9617975 1.99998734,17.493443 1.99998734,11.9809958 C1.99998734,6.46859072 6.46872152,2.00002532 11.9808312,2.00002532 Z M11.9808397,10.7262574 L10.1050169,11.9809831 L11.9808397,13.2357511 L13.856789,11.9809831 L11.9808397,10.7262574 Z M6.87028692,11.0934177 L6.87028692,12.8685654 L8.19729114,11.9810127 L6.87028692,11.0934177 Z M11.4505105,9.80491139 L11.4505105,7.33115612 L7.29494093,10.1013249 L9.15122785,11.343097 L11.4505105,9.80491139 Z M16.6668987,10.1013207 L12.5112869,7.3311519 L12.5112869,9.80490717 L14.8107384,11.3430928 L16.6668987,10.1013207 Z M7.29492405,13.8606751 L11.4504937,16.6308439 L11.4504937,14.1570464 L9.15125316,12.6192405 L7.29492405,13.8606751 Z M17.0915148,12.8685781 L17.0915148,11.0934304 L15.7647215,11.9809831 L17.0915148,12.8685781 Z M12.5112743,14.1570633 L12.5112743,16.6308608 L16.6668861,13.860692 L14.8107257,12.6192574 L12.5112743,14.1570633 Z"/></svg>' }
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_codepen.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_dribbble.bemhtml.js */
block('social-icon').mod('name', 'dribbble')({
	content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M16.7174162,19.0300324 C16.630173,18.5124108 16.1773081,16.0212757 15.064227,12.9626811 C17.7309297,12.5358703 20.0737405,13.2346811 20.3648757,13.3264649 C19.9855243,15.6943568 18.6264973,17.7392216 16.7174162,19.0300324 M11.9628216,20.4854919 C9.99557838,20.4854919 8.18228108,19.8142486 6.73947027,18.6890595 C6.89255135,18.3759784 8.61557838,15.0474378 13.4153622,13.3747892 C13.4340649,13.3684108 13.4527676,13.3622486 13.4714703,13.3559784 C14.666173,16.4605189 15.1603351,19.062573 15.2869297,19.8091676 C14.2650919,20.2443027 13.1416324,20.4854919 11.9628216,20.4854919 M3.45298378,11.9756541 C3.45298378,11.888627 3.45471351,11.8021405 3.45741622,11.7156541 C3.82974054,11.7233297 7.95352432,11.7764108 12.2031459,10.504627 C12.4467135,10.9813838 12.6793622,11.4653838 12.8930919,11.9488432 C12.7804432,11.9805189 12.6686595,12.0142486 12.5576324,12.0501405 C8.16887568,13.4687351 5.83341622,17.3355459 5.64065946,17.6656 C4.28152432,16.1569514 3.45298378,14.1613838 3.45298378,11.9756541 M8.34487568,4.27457297 C8.5692,4.58214054 10.0899568,6.68949189 11.4999027,9.19597838 C7.51936216,10.2530595 4.01341622,10.2378162 3.63276757,10.2327351 C4.18455135,7.59219459 5.96411892,5.39738378 8.34487568,4.27457297 M11.9628216,3.46592432 C14.1250919,3.46592432 16.1010919,4.27705946 17.6037946,5.61024865 C17.4507135,5.8283027 16.1698486,7.55003243 13.1437946,8.68419459 C11.7494162,6.12224865 10.2037946,4.01749189 9.96855135,3.70257297 C10.6085514,3.54819459 11.2761189,3.46592432 11.9628216,3.46592432 M18.5498486,6.59435676 C19.7350378,8.04235676 20.4527676,9.88678919 20.4715784,11.8953297 C20.1909297,11.8359784 17.3774162,11.2653838 14.5459568,11.6213838 C14.4862811,11.4757622 14.4253081,11.3293838 14.3627135,11.1822486 C14.1859568,10.7672216 13.9961189,10.3550054 13.7980649,9.9496 C16.9445514,8.66505946 18.3704973,6.83705946 18.5498486,6.59435676 M11.9628216,1.99997838 C6.46930811,1.99997838 2.00001081,6.46916757 2.00001081,11.9626811 C2.00001081,17.4561946 6.46930811,21.9254919 11.9628216,21.9254919 C17.4563351,21.9254919 21.9255243,17.4561946 21.9255243,11.9626811 C21.9255243,6.46916757 17.4563351,1.99997838 11.9628216,1.99997838"/></svg>' }
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_dribbble.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/image/image.bemhtml.js */
block('image')(
    addAttrs()({ role : 'img' }),

    tag()('span'),

    match(function() { return typeof this.ctx.content === 'undefined'; })(
        tag()('img'),
        addAttrs()(function() {
            var ctx = this.ctx;
            return this.extend(applyNext(),
                {
                    role : undefined,
                    src : ctx.url,
                    width : ctx.width,
                    height : ctx.height,
                    alt : ctx.alt,
                    title : ctx.title
                });
        })
    )
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/image/image.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/link/link.bemhtml.js */
block('link')(
    def()(function() {
        var ctx = this.ctx;
        typeof ctx.url === 'object' && // url could contain bemjson
            (ctx.url = this.reapply(ctx.url));
        return applyNext();
    }),

    tag()('a'),

    addJs()(true),

    // NOTE: mix below is to satisfy interface of `control`
    addMix()([{ elem : 'control' }]),

    addAttrs()(function() {
        var ctx = this.ctx,
            attrs = { role : 'link' },
            tabIndex;

        if(!this.mods.disabled) {
            if(ctx.url) {
                attrs.href = ctx.url;
                tabIndex = ctx.tabIndex;
            } else {
                tabIndex = ctx.tabIndex || 0;
            }
        } else {
            attrs['aria-disabled'] = 'true';
        }

        typeof tabIndex === 'undefined' || (attrs.tabindex = tabIndex);

        ctx.title && (attrs.title = ctx.title);
        ctx.target && (attrs.target = ctx.target);

        return attrs;
    }),

    mod('disabled', true)
        .js()(function() {
            return this.extend(applyNext(), { url : this.ctx.url });
        })
);

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/bem-components-custom/common.blocks/link/link.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/icon/_name/icon_name_arrow-down.bemhtml.js */
block('icon').mod('name', 'arrow-down').mod('size', 'm')({content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill-rule="evenodd" d="M12.007 15.674L20.588 7 22 8.425 11.99 18.5 2 8.424l1.414-1.423z"/></svg>' }});block('icon').mod('name', 'arrow-down').mod('size', 's')({content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path fill-rule="evenodd" d="M15 4.425L13.59 3 8 8.65 2.41 3 1 4.425 8 11.5z"/></svg>' }});
/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/icon/_name/icon_name_arrow-down.bemhtml.js */
/* begin: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_github.bemhtml.js */
block('social-icon').mod('name', 'github')({
	content: { html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.8718788,2 C6.42036364,2 1.99975758,6.42 1.99975758,11.8733333 C1.99975758,16.2345455 4.82824242,19.9345455 8.75187879,21.2406061 C9.24581818,21.3309091 9.42581818,21.0260606 9.42581818,20.7642424 C9.42581818,20.530303 9.41733333,19.9090909 9.41248485,19.0854545 C6.66642424,19.6818182 6.0870303,17.7618182 6.0870303,17.7618182 C5.63793939,16.6212121 4.99066667,16.3181818 4.99066667,16.3181818 C4.09430303,15.7054545 5.05854545,15.7175758 5.05854545,15.7175758 C6.04945455,15.7878788 6.57066667,16.7351515 6.57066667,16.7351515 C7.45127273,18.2436364 8.8809697,17.8078788 9.444,17.5557576 C9.53369697,16.9175758 9.78824242,16.4824242 10.0706667,16.2357576 C7.87854545,15.9866667 5.57369697,15.1393939 5.57369697,11.3563636 C5.57369697,10.2787879 5.95854545,9.39757576 6.59006061,8.70727273 C6.48824242,8.45757576 6.14945455,7.45393939 6.68642424,6.09454545 C6.68642424,6.09454545 7.51551515,5.82909091 9.40157576,7.10666667 C10.1888485,6.88727273 11.033697,6.77818182 11.8730909,6.77393939 C12.7112727,6.77818182 13.5561212,6.88727273 14.3446061,7.10666667 C16.2294545,5.82909091 17.0567273,6.09454545 17.0567273,6.09454545 C17.5955152,7.45393939 17.2567273,8.45757576 17.1549091,8.70727273 C17.7876364,9.39757576 18.1700606,10.2787879 18.1700606,11.3563636 C18.1700606,15.1490909 15.8615758,15.9836364 13.6621818,16.2278788 C14.0167273,16.5327273 14.3324848,17.1351515 14.3324848,18.0563636 C14.3324848,19.3757576 14.3203636,20.4406061 14.3203636,20.7642424 C14.3203636,21.0284848 14.4979394,21.3357576 14.9991515,21.2393939 C18.9185455,19.9309091 21.7452121,16.2333333 21.7452121,11.8733333 C21.7452121,6.42 17.3246061,2 11.8718788,2"/></svg>' }
});

/* end: /Users/anton/Documents/GitHub/whitepaper-portal/node_modules/whitepaper-bem/social-icon/_name/social-icon_name_github.bemhtml.js */

;oninit(function(exports, context) {
var BEMContext = exports.BEMContext || context.BEMContext;
BEMContext.prototype.require = function(lib) {
return this._libs[lib];
};
});
;});
exports = api.exportApply(exports);
if (libs) exports.BEMContext.prototype._libs = libs;
return exports;
};

var glob = this.window || this.global || this;
var exp = typeof exports !== "undefined" ? exports : global;
if (typeof modules === "object") {



modules.define("BEMHTML",[],function(provide) { var engine = buildBemXjst({});provide(engine);});
} else {
var _libs = {};


if (Object.keys(_libs).length) {
BEMHTML = buildBemXjst(_libs);
exp["BEMHTML"] = BEMHTML;
exp["BEMHTML"].libs = _libs;
} else {
BEMHTML= buildBemXjst(glob);
exp["BEMHTML"] = BEMHTML;exp["BEMHTML"].libs = glob;
}
}
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInp1cmlvbmEuYmVtaHRtbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ6dXJpb25hLmJlbWh0bWwuanMifQ==