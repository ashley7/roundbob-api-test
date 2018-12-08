/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 DataTables 1.10.19
 ©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function Z(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&Z(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||Z(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Ca(a){var b=n.defaults.oLanguage,c=b.sDecimal;c&&Da(c);if(a){var d=a.sZeroRecords;!a.sEmptyTable&&(d&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(d&&"Loading..."===b.sLoadingRecords)&&F(a,
a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&c!==a&&Da(a)}}function fb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":
"");"boolean"===typeof a.scrollX&&(a.scrollX=a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(n.models.oSearch,a[b])}function gb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!h.isArray(b)&&(a.aDataSort=[b])}function hb(a){if(!n.__browser){var b={};n.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,width:1,
overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,n.__browser);a.oScroll.iBarWidth=n.__browser.barWidth}
function ib(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=n.defaults.column,d=a.aoColumns.length,c=h.extend({},n.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},n.models.oSearch,c[d]);ka(a,d,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],
d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(gb(c),J(n.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),c.sClass&&e.addClass(c.sClass),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=S(g),i=b.mRender?
S(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return N(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,
b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function $(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&la(a);r(a,null,"column-sizing",[a])}function aa(a,b){var c=ma(a,"bVisible");return"number"===
typeof c[b]?c[b]:null}function ba(a,b){var c=ma(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function V(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function ma(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=n.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<
j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function jb(a,b,c,d){var e,f,g,j,i,m,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){m=b[e];var q=m.targets!==k?m.targets:m.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],m)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],m);else if("string"===
typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&d(j,m)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},n.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function na(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,
e){c=Ia(a,e);return O(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function kb(a,
b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function S(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=S(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||
-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);for(var i=0,m=j.length;i<m;i++){f=j[i].match(ca);g=j[i].match(W);if(f){j[i]=j[i].replace(ca,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(m=a.length;i<m;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(W,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}
function N(a){if(h.isPlainObject(a))return N(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,m=e.length-1;i<m;i++){g=e[i].match(ca);j=e[i].match(W);if(g){e[i]=e[i].replace(ca,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(m=d.length;j<m;j++)f={},b(f,d[j],g),
a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(W,""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(W))a[f.replace(W,"")](d);else a[f.replace(ca,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function pa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,
1)}function da(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,
j,i=0,m,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),N(a)(d,b.getAttribute(c)))}},G=function(a){if(c===k||c===i)j=l[i],m=h.trim(a.innerHTML),j&&j._bAttrSrc?(N(j.mData._)(d,m),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=N(j.mData)),j._setter(d,m)):d[i]=m;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)G(f),e.push(f);f=f.nextSibling}else{e=b.anCells;
f=0;for(g=e.length;f<g;f++)G(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&N(a.rowId)(d,b);return{data:d,cells:e}}function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,m,l,q;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){m=a.aoColumns[l];i=c?d[l]:H.createElement(m.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||m.mRender||m.mData!==l)&&(!h.isPlainObject(m.mData)||m.mData._!==l+".display"))i.innerHTML=
B(a,b,l,"display");m.sClass&&(i.className+=" "+m.sClass);m.bVisible&&!c?j.appendChild(i):!m.bVisible&&c&&i.parentNode.removeChild(i);m.fnCreatedCell&&m.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}r(a,"aoRowCreatedCallback",null,[j,f,b,g])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?qa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function lb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,m=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,
f,m);i&&ea(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function fa(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,m;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=
0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(m=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+m]!==k&&g[d][f].cell==g[d][f+m].cell;){for(c=0;c<i;c++)j[d+c][f+m]=1;m++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",m)}}}}function P(a){var b=r(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=
d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,m=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!mb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:m;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);var t=q.nTr;if(0!==e){var G=d[c%e];q._sRowStripe!=G&&(h(t).removeClass(q._sRowStripe).addClass(G),
q._sRowStripe=G)}r(a,"aoRowCallback",null,[t,q._aData,c,j,l]);b.push(t);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:V(a),"class":a.oClasses.sRowEmpty}).html(c))[0];r(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,m,i]);r(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,m,i]);d=h(a.nTBody);d.children().detach();
d.append(h(b));r(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&nb(a);d?ga(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;P(a);a._drawHold=!1}function ob(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=
a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,m,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];m=f[k+1];if("'"==m||'"'==m){l="";for(q=2;f[k+q]!=m;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(m=l.split("."),i.id=m[0].substr(1,m[0].length-1),i.className=m[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=pb(a);else if("f"==j&&
d.bFilter)g=qb(a);else if("r"==j&&d.bProcessing)g=rb(a);else if("t"==j)g=sb(a);else if("i"==j&&d.bInfo)g=tb(a);else if("p"==j&&d.bPaginate)g=ub(a);else if(0!==n.ext.feature.length){i=n.ext.feature;q=0;for(m=i.length;q<m;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function ea(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,m,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<
i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;m=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][m+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ra(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],ea(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||
!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function sa(a,b,c){r(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){r(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var m="function"===typeof f?f(b,a):f,b="function"===typeof f&&m?m:h.extend(!0,b,m);delete g.data}m={data:b,success:function(b){var c=
b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=r(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;r(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(m,{url:g||a.sAjaxSource})):
"function"===typeof g?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(m,g)),g.data=f)}function mb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,!0),sa(a,vb(a),function(b){wb(a,b)}),!1):!0}function vb(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,m,l,k=X(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var t=function(a,b){j.push({name:a,value:b})};t("sEcho",a.iDraw);t("iColumns",c);t("sColumns",D(b,"sName").join(","));t("iDisplayStart",g);t("iDisplayLength",
i);var G={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)m=b[g],l=f[g],i="function"==typeof m.mData?"function":m.mData,G.columns.push({data:i,name:m.sName,searchable:m.bSearchable,orderable:m.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),t("mDataProp_"+g,i),d.bFilter&&(t("sSearch_"+g,l.sSearch),t("bRegex_"+g,l.bRegex),t("bSearchable_"+g,m.bSearchable)),d.bSort&&t("bSortable_"+g,m.bSortable);d.bFilter&&(t("sSearch",e.sSearch),t("bRegex",
e.bRegex));d.bSort&&(h.each(k,function(a,b){G.order.push({column:b.col,dir:b.dir});t("iSortCol_"+a,b.col);t("sSortDir_"+a,b.dir)}),t("iSortingCols",k.length));b=n.ext.legacy.ajax;return null===b?a.sAjaxSource?j:G:b?j:G}function wb(a,b){var c=ta(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}oa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,
10);d=0;for(e=c.length;d<e;d++)O(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;P(a);a._bInitComplete||ua(a,b);a.bAjaxDataGet=!0;C(a,!1)}function ta(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?S(c)(b):b}function qb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",
g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ga(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,P(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",
c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==H.activeElement&&i.val(e.sSearch)}catch(d){}});return b[0]}function ga(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){xb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)yb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,
e[b].bSmart,e[b].bCaseInsensitive);zb(a)}else f(b);a.bFiltered=!0;r(a,null,"search",[a])}function zb(a){for(var b=n.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,m=c.length;i<m;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function yb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Pa(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function xb(a,b,c,d,e,f){var d=Pa(b,
d,e,f),f=a.oPreviousSearch.sSearch,g=a.aiDisplayMaster,j,e=[];0!==n.ext.search.length&&(c=!0);j=Ab(a);if(0>=b.length)a.aiDisplay=g.slice();else{if(j||c||f.length>b.length||0!==b.indexOf(f)||a.bSorted)a.aiDisplay=g.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)d.test(a.aoData[b[c]]._sFilterRow)&&e.push(b[c]);a.aiDisplay=e}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',
"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function Ab(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=n.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(va.innerHTML=i,i=Wb?va.textContent:va.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);
h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Bb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Cb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function tb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Db,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",
b+"_info"));return d[0]}function Db(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Eb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Eb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,
c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ha(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){ob(a);lb(a);fa(a,a.aoHeader);fa(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=v(f.sWidth));r(a,null,"preInit",[a]);T(a);e=
y(a);if("ssp"!=e||g)"ajax"==e?sa(a,[],function(c){var f=ta(a,c);for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ua(a,c)},a):(C(a,!1),ua(a))}else setTimeout(function(){ha(a)},200)}function ua(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&$(a);r(a,null,"plugin-init",[a,b]);r(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);r(a,null,"length",[a,c])}function pb(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=
e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option("number"===typeof d[g]?a.fnFormatNumber(d[g]):d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ra(a,h(this).val());P(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===
c&&h("select",i).val(d)});return i[0]}function ub(a){var b=a.sPaginationType,c=n.ext.pager[b],d="function"===typeof c,e=function(a){P(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,
e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(r(a,null,"page",[a]),c&&P(a));return b}function rb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}
function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");r(a,null,"processing",[a,b])}function sb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),m=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",
position:"relative",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:v(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",
{"class":f.sScrollFootInner}).append(m.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:la,sName:"scrolling"});return i[0]}function la(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,
f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,m=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),n=t.children("table"),o=h(a.nTHead),p=h(a.nTable),s=p[0],r=s.style,u=a.nTFoot?h(a.nTFoot):null,x=a.oBrowser,U=x.bScrollOversize,Xb=D(a.aoColumns,"nTh"),Q,L,R,w,Ua=[],y=[],z=[],A=[],B,C=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==
L&&a.scrollBarVis!==k)a.scrollBarVis=L,$(a);else{a.scrollBarVis=L;p.children("thead, tfoot").remove();u&&(R=u.clone().prependTo(p),Q=u.find("tr"),R=R.find("tr"));w=o.clone().prependTo(p);o=o.find("tr");L=w.find("tr");w.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(ra(a,w),function(b,c){B=aa(a,b);c.style.width=a.aoColumns[B].sWidth});u&&I(function(a){a.style.width=""},R);f=p.outerWidth();if(""===c){r.width="100%";if(U&&(p.find("tbody").height()>j.offsetHeight||
"scroll"==l.css("overflow-y")))r.width=v(p.outerWidth()-b);f=p.outerWidth()}else""!==d&&(r.width=v(d),f=p.outerWidth());I(C,L);I(function(a){z.push(a.innerHTML);Ua.push(v(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,Xb)!==-1)a.style.width=Ua[b]},o);h(L).height(0);u&&(I(C,R),I(function(a){A.push(a.innerHTML);y.push(v(h(a).css("width")))},R),I(function(a,b){a.style.width=y[b]},Q),h(R).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+z[b]+"</div>";a.childNodes[0].style.height=
"0";a.childNodes[0].style.overflow="hidden";a.style.width=Ua[b]},L);u&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+A[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=y[b]},R);if(p.outerWidth()<f){Q=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(U&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=v(Q-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else Q="100%";q.width=v(Q);
g.width=v(Q);u&&(a.nScrollFoot.style.width=v(Q));!e&&U&&(q.height=v(s.offsetHeight+b));c=p.outerWidth();m[0].style.width=v(c);i.width=v(c);d=p.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(x.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";u&&(n[0].style.width=v(c),t[0].style.width=v(c),t[0].style[e]=d?b+"px":"0px");p.children("colgroup").insertBefore(p.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,
f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=ma(a,"bVisible"),m=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,n,o,p=a.oBrowser,d=p.bScrollOversize;(n=b.style.width)&&-1!==n.indexOf("%")&&(l=n);for(n=0;n<i.length;n++)o=c[i[n]],null!==o.sWidth&&(o.sWidth=Fb(o.sWidthOrig,k),t=!0);if(d||
!t&&!f&&!e&&j==V(a)&&j==m.length)for(n=0;n<j;n++)i=aa(a,n),null!==i&&(c[i].sWidth=v(m.eq(n).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var s=h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");m=ra(a,j.find("thead")[0]);for(n=0;n<i.length;n++)o=c[i[n]],m[n].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?v(o.sWidthOrig):
"",o.sWidthOrig&&f&&h(m[n]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(n=0;n<i.length;n++)t=i[n],o=c[t],h(Gb(a,t)).clone(!1).append(o.sContentPadding).appendTo(s);h("[name]",j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):
l&&j.width(l);for(n=e=0;n<i.length;n++)k=h(m[n]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(m[n].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[n]].sWidth=v(k-g);b.style.width=v(e);o.remove()}l&&(b.style.width=v(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Oa(function(){$(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Fb(a,b){if(!a)return 0;var c=h("<div/>").css("width",v(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Gb(a,
b){var c=Hb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Hb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(Yb,""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function v(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function X(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var m=[];f=function(a){a.length&&
!h.isArray(a[0])?m.push(a):h.merge(m,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<m.length;a++){i=m[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",m[a]._idx===k&&(m[a]._idx=h.inArray(m[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:m[a][1],index:m[a]._idx,type:j,formatter:n.ext.type.order[j+"-pre"]})}return d}function nb(a){var b,c,d=[],e=n.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=X(a);b=0;for(c=h.length;b<
c;b++)j=h[b],j.formatter&&g++,Ib(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,n=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],e=n[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,n=f[a]._aSortData,o=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=n[i.col],g=o[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],
c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Jb(a){for(var b,c,d=a.aoColumns,e=X(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,
b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==
typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}function wa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=X(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(D(a.aoData,"anCells",g)).addClass(c+
(2>e?e+1:3))}a.aLastSort=d}function Ib(a,b){var c=a.aoColumns[b],d=n.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,ba(a,b)));for(var f,g=n.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function xa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Bb(a.oPreviousSearch),
columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Bb(a.aoPreSearchCols[d])}})};r(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Kb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=r(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&
(a._iDisplayStart=b.start,a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==k&&h.extend(a.oPreviousSearch,Cb(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Cb(g.search))}r(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=
a.fnStateLoadCallback.call(a.oInstance,a,b);g!==k&&b(g)}else c()}function ya(a){var b=n.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=n.ext,b=b.sErrMode||b.errMode,a&&r(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==
typeof b&&b(a,d,c)}}function F(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Xa(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).on("click.DT",b,function(b){h(a).blur();c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",
function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function r(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=n.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===
typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ia(a,b){var c=[],c=Lb.numbers_length,d=Math.floor(c/2);b<=c?c=Y(0,b):a<=d?(c=Y(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=Y(b-(c-2),b):(c=Y(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function Da(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Ya)},"html-num":function(b){return za(b,
a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Ya)}},function(b,c){x.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(x.type.search[b+a]=x.type.search.html)})}function Mb(a){return function(){var b=[ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this,b)}}var n=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new s(ya(this[x.iApiIndex])):new s(this)};
this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&la(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,
b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():
c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};
this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return ya(this[x.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();
(d===k||d)&&h.draw();return 0};this.fnVersionCheck=x.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=x.internal;for(var e in n.ext.internal)e&&(this[e]=Mb(e));this.each(function(){var e={},g=1<d?Xa(e,a,!0):a,j=0,i,e=this.getAttribute("id"),m=!1,l=n.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{fb(l);gb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()));var t=n.settings,
j=0;for(i=t.length;j<i;j++){var o=t[j];if(o.nTable==this||o.nTHead&&o.nTHead.parentNode==this||o.nTFoot&&o.nTFoot.parentNode==this){var s=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||s)return o.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){o.oInstance.fnDestroy();break}else{K(o,0,"Cannot reinitialise DataTable",3);return}}if(o.sTableId==this.id){t.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+n.ext._unique++;var p=h.extend(!0,{},n.models.oSettings,{sDestroyWidth:q[0].style.width,
sInstance:e,sTableId:e});p.nTable=this;p.oApi=b.internal;p.oInit=g;t.push(p);p.oInstance=1===b.length?b:q.dataTable();fb(g);Ca(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Xa(h.extend(!0,{},l),g);F(p.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod",
"aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);F(p.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(p.oLanguage,g,"fnInfoCallback");
z(p,"aoDrawCallback",g.fnDrawCallback,"user");z(p,"aoServerParams",g.fnServerParams,"user");z(p,"aoStateSaveParams",g.fnStateSaveParams,"user");z(p,"aoStateLoadParams",g.fnStateLoadParams,"user");z(p,"aoStateLoaded",g.fnStateLoaded,"user");z(p,"aoRowCallback",g.fnRowCallback,"user");z(p,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(p,"aoHeaderCallback",g.fnHeaderCallback,"user");z(p,"aoFooterCallback",g.fnFooterCallback,"user");z(p,"aoInitComplete",g.fnInitComplete,"user");z(p,"aoPreDrawCallback",
g.fnPreDrawCallback,"user");p.rowIdFn=S(g.rowId);hb(p);var u=p.oClasses;h.extend(u,n.ext.classes,g.oClasses);q.addClass(u.sTable);p.iInitDisplayStart===k&&(p.iInitDisplayStart=g.iDisplayStart,p._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(p.bDeferLoading=!0,e=h.isArray(g.iDeferLoading),p._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,p._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var v=p.oLanguage;h.extend(!0,v,g.oLanguage);v.sUrl&&(h.ajax({dataType:"json",url:v.sUrl,success:function(a){Ca(a);
J(l.oLanguage,a);h.extend(true,v,a);ha(p)},error:function(){ha(p)}}),m=!0);null===g.asStripeClasses&&(p.asStripeClasses=[u.sStripeOdd,u.sStripeEven]);var e=p.asStripeClasses,x=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return x.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),p.asDestroyStripes=e.slice());e=[];t=this.getElementsByTagName("thead");0!==t.length&&(ea(p.aoHeader,t[0]),e=ra(p));if(null===g.aoColumns){t=[];j=0;for(i=e.length;j<i;j++)t.push(null)}else t=
g.aoColumns;j=0;for(i=t.length;j<i;j++)Ea(p,e?e[j]:null);jb(p,g.aoColumnDefs,t,function(a,b){ka(p,a,b)});if(x.length){var w=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(x[0]).children("th, td").each(function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=w(b,"sort")||w(b,"order"),e=w(b,"filter")||w(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var U=p.oFeatures,
e=function(){if(g.aaSorting===k){var a=p.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=p.aoColumns[j].asSorting[0]}wa(p);U.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=X(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});r(p,null,"order",[p,a,b]);Jb(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||y(p)==="ssp"||U.bDeferRender)&&wa(p)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));
p.nTHead=b[0];b=q.children("tbody");b.length===0&&(b=h("<tbody/>").appendTo(q));p.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(p.oScroll.sX!==""||p.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(u.sNoFooter);else if(b.length>0){p.nTFoot=b[0];ea(p.aoFooter,p.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)O(p,g.aaData[j]);else(p.bDeferLoading||y(p)=="dom")&&na(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();
p.bInitialised=true;m===false&&ha(p)};g.bStateSave?(U.bStateSave=!0,z(p,"aoDrawCallback",xa,"state_save"),Kb(p,g,e)):e()}});b=null;return this},x,s,o,u,Za={},Nb=/[\r\n]/g,Aa=/<.*?>/g,Zb=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,$b=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Ya=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Ob=function(a){var b=parseInt(a,10);return!isNaN(b)&&
isFinite(a)?b:null},Pb=function(a,b){Za[b]||(Za[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Za[b],"."):a},$a=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Pb(a,b));c&&d&&(a=a.replace(Ya,""));return!isNaN(parseFloat(a))&&isFinite(a)},Qb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:$a(a.replace(Aa,""),b,c)?!0:null},D=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<
f;e++)a[e]&&d.push(a[e][b]);return d},ja=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},Y=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Rb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},qa=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();
b=[];var e=a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};n.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,j=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=k;a.apply(b,j)},c)):(d=g,a.apply(b,j))}},escapeRegex:function(a){return a.replace($b,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ca=/\[.*?\]$/,W=/\(\)$/,Qa=n.util.escapeRegex,va=h("<div>")[0],Wb=va.textContent!==k,Yb=
/<.*?>/g,Oa=n.util.throttle,Sb=[],w=Array.prototype,ac=function(a){var b,c,d=n.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};s=function(a,b){if(!(this instanceof
s))return new s(a,b);var c=[],d=function(a){(a=ac(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=qa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};s.extend(this,this,Sb)};n.Api=s;h.extend(s.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new s(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new s(this.context,b)},flatten:function(){var a=[];return new s(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,j,h,m,l=this.context,
n,o,u=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(j=l.length;g<j;g++){var r=new s(l[g]);if("table"===b)f=c.call(r,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(r,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){o=this[g];"column-rows"===b&&(n=Ba(l[g],u.opts));h=0;for(m=o.length;h<m;h++)f=o[h],f="cell"===b?c.call(r,l[g],f.row,f.column,g,h):c.call(r,l[g],f,g,h,n),f!==k&&e.push(f)}}return e.length||d?(a=new s(l,a?
e.concat.apply([],e):e),b=a.selector,b.rows=u.rows,b.cols=u.cols,b.opts=u.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new s(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return ib(this,a,b,0,this.length,
1)},reduceRight:w.reduceRight||function(a,b){return ib(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,slice:function(){return new s(this.context,this)},sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new s(this.context,qa(this))},unshift:w.unshift});s.extend=function(a,b,c){if(c.length&&b&&(b instanceof s||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=
b.apply(a,arguments);s.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,s.extend(a,b[f.name],f.propExt)}};s.register=o=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)s.register(a[c],b);else for(var e=a.split("."),f=Sb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var m=f.length;i<m;i++)if(f[i].name===g){i=
f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};s.registerPlural=u=function(a,b,c){s.register(a,c);s.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof s?a.length?h.isArray(a[0])?new s(a.context,a[0]):a[0]:k:a})};o("tables()",function(a){var b;if(a){b=s;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,
d);return c[a]}).toArray();b=new b(a)}else b=this;return b});o("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new s(b[0]):a});u("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});u("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});u("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});u("tables().footer()",
"table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});u("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});o("draw()",function(a){return this.iterator("table",function(b){"page"===a?P(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});o("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});o("page.info()",function(){if(0===
this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:"ssp"===y(a)}});o("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Tb=function(a,b,c){if(c){var d=new s(a);
d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();sa(a,[],function(c){oa(a);for(var c=ta(a,c),d=0,e=c.length;d<e;d++)O(a,c[d]);T(a,b);C(a,!1)})}};o("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});o("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});o("ajax.reload()",function(a,b){return this.iterator("table",function(c){Tb(c,!1===b,a)})});o("ajax.url()",function(a){var b=
this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});o("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Tb(c,!1===b,a)})});var ab=function(a,b,c,d,e){var f=[],g,j,i,m,l,n;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(m=b.length;i<m;i++){j=b[i]&&b[i].split&&!b[i].match(/[\[\(:]/)?b[i].split(","):
[b[i]];l=0;for(n=j.length;l<n;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=x.selector[a];if(a.length){i=0;for(m=a.length;i<m;i++)f=a[i](d,e,f)}return qa(f)},bb=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},cb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,
d,e,f=[],g=a.aiDisplay;e=a.aiDisplayMaster;var j=b.search;c=b.order;d=b.page;if("ssp"==y(a))return"removed"===j?[]:Y(0,e.length);if("current"==d){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==c||"applied"==c)if("none"==j)f=e.slice();else if("applied"==j)f=g.slice();else{if("removed"==j){var i={};c=0;for(d=g.length;c<d;c++)i[g[c]]=null;f=h.map(e,function(a){return!i.hasOwnProperty(a)?a:null})}}else if("index"==c||"original"==c){c=0;for(d=a.aoData.length;c<d;c++)"none"==
j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};o("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=b,f;return ab("row",a,function(a){var b=Ob(a),i=c.aoData;if(b!==null&&!e)return[b];f||(f=Ba(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var c=i[b];return a(b,c._aData,c.nTr)?b:null});if(a.nodeName){var b=
a._DT_RowIndex,m=a._DT_CellIndex;if(b!==k)return i[b]&&i[b].nTr===a?[b]:[];if(m)return i[m.row]&&i[m.row].nTr===a?[m.row]:[];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){b=c.aIds[a.replace(/^#/,"")];if(b!==k)return[b.idx]}b=Rb(ja(c.aoData,f,"nTr"));return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});o("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});o("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ja(a.aoData,b,"_aData")},1)});u("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});u("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){da(b,c,a)})});u("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});u("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new s(c,b)});u("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,m,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(m=
l.length;i<m;i++)l[i]._DT_CellIndex.row=g}pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[d],c,!1);0<b._iRecordsDisplay&&b._iRecordsDisplay--;Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});o("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(na(b,c)[0]):h.push(O(b,c));return h},
1),c=this.rows(-1);c.pop();h.merge(c,b);return c});o("row()",function(a,b){return cb(this.rows(a,b))});o("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;var c=b[0].aoData[this[0]];c._aData=a;h.isArray(a)&&c.nTr.id&&N(b[0].rowId)(a,c.nTr.id);da(b[0],this[0],"data");return this});o("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});o("row.add()",function(a){a instanceof h&&
a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?na(b,a)[0]:O(b,a)});return this.row(b[0])});var db=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Ub=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new s(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=V(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&db(f,c)}))}}};o("row().child()",function(a,b){var c=
this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)db(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=V(d),e.push(c[0]))};f(a,b);c._details&&c._details.detach();c._details=h(e);
c._detailsShow&&c._details.insertAfter(c.nTr)}return this});o(["row().child.show()","row().child().show()"],function(){Ub(this,!0);return this});o(["row().child.hide()","row().child().hide()"],function(){Ub(this,!1);return this});o(["row().child.remove()","row().child().remove()"],function(){db(this);return this});o("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var bc=/^([^:]+):(name|visIdx|visible)$/,Vb=function(a,b,
c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};o("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return ab("column",e,function(a){var b=Ob(a);if(a==="")return Y(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Vb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(bc):
"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var n=h.map(g,function(a,b){return a.bVisible?b:null});return[n[n.length+b]]}return[aa(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},
1);c.selector.cols=a;c.selector.opts=b;return c});u("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});u("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});u("columns().data()","column().data()",function(){return this.iterator("column-rows",Vb,1)});u("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},
1)});u("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ja(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});u("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ja(a.aoData,e,"anCells",b)},1)});u("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,
i,m,l;if(a!==k&&g.bVisible!==a){if(a){var n=h.inArray(!0,D(f,"bVisible"),c+1);i=0;for(m=j.length;i<m;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[n]||null)}else h(D(b.aoData,"anCells",c)).detach();g.bVisible=a;fa(b,b.aoHeader);fa(b,b.aoFooter);b.aiDisplay.length||h(b.nTBody).find("td[colspan]").attr("colspan",V(b));xa(b)}});a!==k&&(this.iterator("column",function(c,e){r(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});u("columns().indexes()","column().index()",
function(a){return this.iterator("column",function(b,c){return"visible"===a?ba(b,c):c},1)});o("columns.adjust()",function(){return this.iterator("table",function(a){$(a)},1)});o("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return aa(c,b);if("fromData"===a||"toVisible"===a)return ba(c,b)}});o("column()",function(a,b){return cb(this.columns(a,b))});o("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));
h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=bb(c),f=b.aoData,g=Ba(b,e),j=Rb(ja(f,g,"anCells")),i=h([].concat.apply([],j)),l,m=b.aoColumns.length,n,o,u,s,r,v;return ab("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){n=[];o=0;for(u=g.length;o<u;o++){l=g[o];for(s=0;s<m;s++){r={row:l,column:s};if(c){v=f[l];a(r,B(b,l,s),v.anCells?v.anCells[s]:null)&&n.push(r)}else n.push(r)}}return n}if(h.isPlainObject(a))return a.column!==
k&&a.row!==k&&h.inArray(a.row,g)!==-1?[a]:[];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=this.columns(b),e=this.rows(a),f,g,j,i,m;this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(m=d[b].length;i<m;i++)f.push({row:e[b][g],column:d[b][i]})}},1);var l=this.cells(f,
c);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});u("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});o("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});u("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});u("cells().render()","cell().render()",
function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});u("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:ba(a,c)}},1)});u("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){da(b,c,a,d)})});o("cell()",function(a,b,c){return cb(this.cells(a,b,c))});o("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],
c[0].row,c[0].column):k;kb(b[0],c[0].row,c[0].column,a);da(b[0],c[0].row,"data",c[0].column);return this});o("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});o("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});o("order.fixed()",function(a){if(!a){var b=
this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});o(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});o("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ga(e,
h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});u("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),ga(e,e.oPreviousSearch,1))})});o("state()",function(){return this.context.length?this.context[0].oSavedState:
null});o("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});o("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});o("state.save()",function(){return this.iterator("table",function(a){xa(a)})});n.versionCheck=n.fnVersionCheck=function(a){for(var b=n.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};n.isDataTable=
n.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;if(a instanceof n.Api)return!0;h.each(n.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=!0});return c};n.tables=n.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(n.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new s(c):c};n.camelToHungarian=J;o("$()",function(a,b){var c=
this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){o(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});o("clear()",function(){return this.iterator("table",function(a){oa(a)})});o("settings()",function(){return new s(this.context,this.context)});o("init()",function(){var a=
this.context;return a.length?a[0].oInit:null});o("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});o("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=!0;r(b,"aoDestroyCallback","destroy",[b]);a||(new s(b)).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");
h(E).off(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];wa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),
(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])}));c=h.inArray(b,n.settings);-1!==c&&n.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){o(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,m)})})});o("i18n()",function(a,b,c){var d=this.context[0],a=S(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:
a._);return a.replace("%d",c)});n.version="1.10.19";n.settings=[];n.models={};n.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};n.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};n.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,
sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};n.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,
bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+
a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},
oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},
n.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};Z(n.defaults);n.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};
Z(n.defaults.column);n.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],
aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",
iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:
this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};n.ext=x={buttons:{},
classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:n.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:n.version};h.extend(x,{afnFiltering:x.search,aTypes:x.type.detect,ofnSearch:x.type.search,oSort:x.type.order,afnSortData:x.order,aoFeatures:x.feature,oApi:x.internal,oStdClasses:x.classes,oPagination:x.pager});
h.extend(n.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",
sJUIHeader:"",sJUIFooter:""});var Lb=n.ext.pager;h.extend(Lb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ia(a,b)]},simple_numbers:function(a,b){return["previous",ia(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ia(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ia(a,b),"last"]},_numbers:ia,numbers_length:7});h.extend(!0,n.ext.renderer,{pageButton:{_:function(a,b,c,d,e,
f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,n=0,o=function(b,d){var k,s,u,r,v=function(b){Ta(a,b.data.action,true)};k=0;for(s=d.length;k<s;k++){r=d[k];if(h.isArray(r)){u=h("<"+(r.DT_el||"div")+"/>").appendTo(b);o(u,r)}else{m=null;l="";switch(r){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":m=j.sPrevious;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":m=
j.sNext;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":m=j.sLast;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:m=r+1;l=e===r?g.sPageButtonActive:""}if(m!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[r],"data-dt-idx":n,tabindex:a.iTabIndex,id:c===0&&typeof r==="string"?a.sTableId+"_"+r:null}).html(m).appendTo(b);Wa(u,{action:r},v);n++}}}},s;try{s=h(b).find(H.activeElement).data("dt-idx")}catch(u){}o(h(b).empty(),d);s!==k&&h(b).find("[data-dt-idx="+
s+"]").focus()}}});h.extend(n.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!Zb.test(a))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||
"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(n.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Nb," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Nb," "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Pb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(x.type.order,{"date-pre":function(a){a=Date.parse(a);return isNaN(a)?-Infinity:a},"html-pre":function(a){return M(a)?
"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});Da("");h.extend(!0,n.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:
c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]==
"asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var eb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};n.render={number:function(a,b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return eb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+f+(e||"")}}},text:function(){return{display:eb,filter:eb}}};h.extend(n.ext.internal,{_fnExternApiFunc:Mb,_fnBuildAjax:sa,_fnAjaxUpdate:mb,_fnAjaxParameters:vb,_fnAjaxUpdateDraw:wb,_fnAjaxDataSrc:ta,_fnAddColumn:Ea,_fnColumnOptions:ka,_fnAdjustColumnSizing:$,_fnVisibleToColumnIndex:aa,_fnColumnIndexToVisible:ba,_fnVisbleColumns:V,_fnGetColumns:ma,_fnColumnTypes:Ga,_fnApplyColumnDefs:jb,_fnHungarianMap:Z,_fnCamelToHungarian:J,_fnLanguageCompat:Ca,_fnBrowserDetect:hb,_fnAddData:O,_fnAddTr:na,_fnNodeToDataIndex:function(a,
b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:kb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:S,_fnSetObjectDataFn:N,_fnGetDataMaster:Ka,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:da,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:lb,_fnDrawHead:fa,_fnDraw:P,_fnReDraw:T,_fnAddOptionsHtml:ob,_fnDetectHeader:ea,_fnGetUniqueThs:ra,_fnFeatureHtmlFilter:qb,_fnFilterComplete:ga,_fnFilterCustom:zb,
_fnFilterColumn:yb,_fnFilter:xb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:Ab,_fnFeatureHtmlInfo:tb,_fnUpdateInfo:Db,_fnInfoMacros:Eb,_fnInitialise:ha,_fnInitComplete:ua,_fnLengthChange:Ra,_fnFeatureHtmlLength:pb,_fnFeatureHtmlPaginate:ub,_fnPageChange:Ta,_fnFeatureHtmlProcessing:rb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:sb,_fnScrollDraw:la,_fnApplyToChildren:I,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Fb,_fnGetWidestNode:Gb,_fnGetMaxLenString:Hb,_fnStringToCss:v,
_fnSortFlatten:X,_fnSort:nb,_fnSortAria:Jb,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:wa,_fnSortData:Ib,_fnSaveState:xa,_fnLoadState:Kb,_fnSettingsFromNode:ya,_fnLog:K,_fnMap:F,_fnBindAction:Wa,_fnCallbackReg:z,_fnCallbackFire:r,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnExtend:Xa,_fnCalculateEnd:function(){}});h.fn.dataTable=n;n.$=h;h.fn.dataTableSettings=n.settings;h.fn.dataTableExt=n.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};
h.each(n,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});

/*!
 Buttons for DataTables 1.5.2
 ©2016-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(n){return d(n,window,document)}):"object"===typeof exports?module.exports=function(n,o){n||(n=window);if(!o||!o.fn.dataTable)o=require("datatables.net")(n,o).$;return d(o,n,n.document)}:d(jQuery,window,document)})(function(d,n,o,m){var i=d.fn.dataTable,x=0,y=0,k=i.ext.buttons,l=function(a,b){"undefined"===typeof b&&(b={});!0===b&&(b={});d.isArray(b)&&(b={buttons:b});this.c=d.extend(!0,{},l.defaults,b);
b.buttons&&(this.c.buttons=b.buttons);this.s={dt:new i.Api(a),buttons:[],listenKeys:"",namespace:"dtb"+x++};this.dom={container:d("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)};this._constructor()};d.extend(l.prototype,{action:function(a,b){var c=this._nodeToButton(a);if(b===m)return c.conf.action;c.conf.action=b;return this},active:function(a,b){var c=this._nodeToButton(a),e=this.c.dom.button.active,c=d(c.node);if(b===m)return c.hasClass(e);c.toggleClass(e,b===m?!0:
b);return this},add:function(a,b){var c=this.s.buttons;if("string"===typeof b){for(var e=b.split("-"),c=this.s,d=0,h=e.length-1;d<h;d++)c=c.buttons[1*e[d]];c=c.buttons;b=1*e[e.length-1]}this._expandButton(c,a,!1,b);this._draw();return this},container:function(){return this.dom.container},disable:function(a){a=this._nodeToButton(a);d(a.node).addClass(this.c.dom.button.disabled);return this},destroy:function(){d("body").off("keyup."+this.s.namespace);var a=this.s.buttons.slice(),b,c;b=0;for(c=a.length;b<
c;b++)this.remove(a[b].node);this.dom.container.remove();a=this.s.dt.settings()[0];b=0;for(c=a.length;b<c;b++)if(a.inst===this){a.splice(b,1);break}return this},enable:function(a,b){if(!1===b)return this.disable(a);var c=this._nodeToButton(a);d(c.node).removeClass(this.c.dom.button.disabled);return this},name:function(){return this.c.name},node:function(a){a=this._nodeToButton(a);return d(a.node)},processing:function(a,b){var c=this._nodeToButton(a);if(b===m)return d(c.node).hasClass("processing");
d(c.node).toggleClass("processing",b);return this},remove:function(a){var b=this._nodeToButton(a),c=this._nodeToHost(a),e=this.s.dt;if(b.buttons.length)for(var g=b.buttons.length-1;0<=g;g--)this.remove(b.buttons[g].node);b.conf.destroy&&b.conf.destroy.call(e.button(a),e,d(a),b.conf);this._removeKey(b.conf);d(b.node).remove();a=d.inArray(b,c);c.splice(a,1);return this},text:function(a,b){var c=this._nodeToButton(a),e=this.c.dom.collection.buttonLiner,e=c.inCollection&&e&&e.tag?e.tag:this.c.dom.buttonLiner.tag,
g=this.s.dt,h=d(c.node),f=function(a){return"function"===typeof a?a(g,h,c.conf):a};if(b===m)return f(c.conf.text);c.conf.text=b;e?h.children(e).html(f(b)):h.html(f(b));return this},_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0],e=this.c.buttons;c._buttons||(c._buttons=[]);c._buttons.push({inst:this,name:this.c.name});for(var g=0,h=e.length;g<h;g++)this.add(e[g]);b.on("destroy",function(b,e){e===c&&a.destroy()});d("body").on("keyup."+this.s.namespace,function(b){if(!o.activeElement||
o.activeElement===o.body){var c=String.fromCharCode(b.keyCode).toLowerCase();a.s.listenKeys.toLowerCase().indexOf(c)!==-1&&a._keypress(c,b)}})},_addKey:function(a){a.key&&(this.s.listenKeys+=d.isPlainObject(a.key)?a.key.key:a.key)},_draw:function(a,b){a||(a=this.dom.container,b=this.s.buttons);a.children().detach();for(var c=0,e=b.length;c<e;c++)a.append(b[c].inserter),a.append(" "),b[c].buttons&&b[c].buttons.length&&this._draw(b[c].collection,b[c].buttons)},_expandButton:function(a,b,c,e){for(var g=
this.s.dt,h=0,b=!d.isArray(b)?[b]:b,f=0,q=b.length;f<q;f++){var j=this._resolveExtends(b[f]);if(j)if(d.isArray(j))this._expandButton(a,j,c,e);else{var p=this._buildButton(j,c);if(p){e!==m?(a.splice(e,0,p),e++):a.push(p);if(p.conf.buttons){var u=this.c.dom.collection;p.collection=d("<"+u.tag+"/>").addClass(u.className).attr("role","menu");p.conf._collection=p.collection;this._expandButton(p.buttons,p.conf.buttons,!0,e)}j.init&&j.init.call(g.button(p.node),g,d(p.node),j);h++}}}},_buildButton:function(a,
b){var c=this.c.dom.button,e=this.c.dom.buttonLiner,g=this.c.dom.collection,h=this.s.dt,f=function(b){return"function"===typeof b?b(h,j,a):b};b&&g.button&&(c=g.button);b&&g.buttonLiner&&(e=g.buttonLiner);if(a.available&&!a.available(h,a))return!1;var q=function(a,b,c,e){e.action.call(b.button(c),a,b,c,e);d(b.table().node()).triggerHandler("buttons-action.dt",[b.button(c),b,c,e])},g=a.tag||c.tag,j=d("<"+g+"/>").addClass(c.className).attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",
this.s.dt.table().node().id).on("click.dtb",function(b){b.preventDefault();!j.hasClass(c.disabled)&&a.action&&q(b,h,j,a);j.blur()}).on("keyup.dtb",function(b){b.keyCode===13&&!j.hasClass(c.disabled)&&a.action&&q(b,h,j,a)});"a"===g.toLowerCase()&&j.attr("href","#");"button"===g.toLowerCase()&&j.attr("type","button");e.tag?(g=d("<"+e.tag+"/>").html(f(a.text)).addClass(e.className),"a"===e.tag.toLowerCase()&&g.attr("href","#"),j.append(g)):j.html(f(a.text));!1===a.enabled&&j.addClass(c.disabled);a.className&&
j.addClass(a.className);a.titleAttr&&j.attr("title",f(a.titleAttr));a.attr&&j.attr(a.attr);a.namespace||(a.namespace=".dt-button-"+y++);e=(e=this.c.dom.buttonContainer)&&e.tag?d("<"+e.tag+"/>").addClass(e.className).append(j):j;this._addKey(a);return{conf:a,node:j.get(0),inserter:e,buttons:[],inCollection:b,collection:null}},_nodeToButton:function(a,b){b||(b=this.s.buttons);for(var c=0,e=b.length;c<e;c++){if(b[c].node===a)return b[c];if(b[c].buttons.length){var d=this._nodeToButton(a,b[c].buttons);
if(d)return d}}},_nodeToHost:function(a,b){b||(b=this.s.buttons);for(var c=0,e=b.length;c<e;c++){if(b[c].node===a)return b;if(b[c].buttons.length){var d=this._nodeToHost(a,b[c].buttons);if(d)return d}}},_keypress:function(a,b){if(!b._buttonsHandled){var c=function(e){for(var g=0,h=e.length;g<h;g++){var f=e[g].conf,q=e[g].node;if(f.key)if(f.key===a)b._buttonsHandled=!0,d(q).click();else if(d.isPlainObject(f.key)&&f.key.key===a&&(!f.key.shiftKey||b.shiftKey))if(!f.key.altKey||b.altKey)if(!f.key.ctrlKey||
b.ctrlKey)if(!f.key.metaKey||b.metaKey)b._buttonsHandled=!0,d(q).click();e[g].buttons.length&&c(e[g].buttons)}};c(this.s.buttons)}},_removeKey:function(a){if(a.key){var b=d.isPlainObject(a.key)?a.key.key:a.key,a=this.s.listenKeys.split(""),b=d.inArray(b,a);a.splice(b,1);this.s.listenKeys=a.join("")}},_resolveExtends:function(a){for(var b=this.s.dt,c,e,g=function(c){for(var e=0;!d.isPlainObject(c)&&!d.isArray(c);){if(c===m)return;if("function"===typeof c){if(c=c(b,a),!c)return!1}else if("string"===
typeof c){if(!k[c])throw"Unknown button type: "+c;c=k[c]}e++;if(30<e)throw"Buttons: Too many iterations";}return d.isArray(c)?c:d.extend({},c)},a=g(a);a&&a.extend;){if(!k[a.extend])throw"Cannot extend unknown button type: "+a.extend;var h=g(k[a.extend]);if(d.isArray(h))return h;if(!h)return!1;c=h.className;a=d.extend({},h,a);c&&a.className!==c&&(a.className=c+" "+a.className);var f=a.postfixButtons;if(f){a.buttons||(a.buttons=[]);c=0;for(e=f.length;c<e;c++)a.buttons.push(f[c]);a.postfixButtons=null}if(f=
a.prefixButtons){a.buttons||(a.buttons=[]);c=0;for(e=f.length;c<e;c++)a.buttons.splice(c,0,f[c]);a.prefixButtons=null}a.extend=h.extend}return a}});l.background=function(a,b,c){c===m&&(c=400);a?d("<div/>").addClass(b).css("display","none").appendTo("body").fadeIn(c):d("body > div."+b).fadeOut(c,function(){d(this).removeClass(b).remove()})};l.instanceSelector=function(a,b){if(!a)return d.map(b,function(a){return a.inst});var c=[],e=d.map(b,function(a){return a.name}),g=function(a){if(d.isArray(a))for(var f=
0,q=a.length;f<q;f++)g(a[f]);else"string"===typeof a?-1!==a.indexOf(",")?g(a.split(",")):(a=d.inArray(d.trim(a),e),-1!==a&&c.push(b[a].inst)):"number"===typeof a&&c.push(b[a].inst)};g(a);return c};l.buttonSelector=function(a,b){for(var c=[],e=function(a,b,c){for(var d,g,f=0,h=b.length;f<h;f++)if(d=b[f])g=c!==m?c+f:f+"",a.push({node:d.node,name:d.conf.name,idx:g}),d.buttons&&e(a,d.buttons,g+"-")},g=function(a,b){var f,h,i=[];e(i,b.s.buttons);f=d.map(i,function(a){return a.node});if(d.isArray(a)||a instanceof
d){f=0;for(h=a.length;f<h;f++)g(a[f],b)}else if(null===a||a===m||"*"===a){f=0;for(h=i.length;f<h;f++)c.push({inst:b,node:i[f].node})}else if("number"===typeof a)c.push({inst:b,node:b.s.buttons[a].node});else if("string"===typeof a)if(-1!==a.indexOf(",")){i=a.split(",");f=0;for(h=i.length;f<h;f++)g(d.trim(i[f]),b)}else if(a.match(/^\d+(\-\d+)*$/))f=d.map(i,function(a){return a.idx}),c.push({inst:b,node:i[d.inArray(a,f)].node});else if(-1!==a.indexOf(":name")){var k=a.replace(":name","");f=0;for(h=
i.length;f<h;f++)i[f].name===k&&c.push({inst:b,node:i[f].node})}else d(f).filter(a).each(function(){c.push({inst:b,node:this})});else"object"===typeof a&&a.nodeName&&(i=d.inArray(a,f),-1!==i&&c.push({inst:b,node:f[i]}))},h=0,f=a.length;h<f;h++)g(b,a[h]);return c};l.defaults={buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:"dt-button-collection"},button:{tag:"button",className:"dt-button",active:"active",
disabled:"disabled"},buttonLiner:{tag:"span",className:""}}};l.version="1.5.2";d.extend(k,{collection:{text:function(a){return a.i18n("buttons.collection","Collection")},className:"buttons-collection",action:function(a,b,c,e){var g=d(c).parents("div.dt-button-collection"),a=c.position(),h=d(b.table().container()),f=!1,i=c;g.length&&(f=d(".dt-button-collection").position(),i=g,d("body").trigger("click.dtb-collection"));i.parents("body")[0]!==o.body&&(i=o.body.lastChild);e._collection.addClass(e.collectionLayout).css("display",
"none").insertAfter(i).fadeIn(e.fade);g=e._collection.css("position");f&&"absolute"===g?e._collection.css({top:f.top,left:f.left}):"absolute"===g?(e._collection.css({top:a.top+c.outerHeight(),left:a.left}),f=h.offset().top+h.height(),f=a.top+c.outerHeight()+e._collection.outerHeight()-f,g=a.top-e._collection.outerHeight(),g=h.offset().top-g,(f>g||e.dropup)&&e._collection.css("top",a.top-e._collection.outerHeight()-5),f=a.left+e._collection.outerWidth(),h=h.offset().left+h.width(),f>h&&e._collection.css("left",
a.left-(f-h)),c=c.offset().left+e._collection.outerWidth(),c>d(n).width()&&e._collection.css("left",a.left-(c-d(n).width()))):(c=e._collection.height()/2,c>d(n).height()/2&&(c=d(n).height()/2),e._collection.css("marginTop",-1*c));e.background&&l.background(!0,e.backgroundClassName,e.fade);var j=function(){e._collection.fadeOut(e.fade,function(){e._collection.detach()});d("div.dt-button-background").off("click.dtb-collection");l.background(false,e.backgroundClassName,e.fade);d("body").off(".dtb-collection");
b.off("buttons-action.b-internal")};setTimeout(function(){d("div.dt-button-background").on("click.dtb-collection",function(){});d("body").on("click.dtb-collection",function(a){var b=d.fn.addBack?"addBack":"andSelf";d(a.target).parents()[b]().filter(e._collection).length||j()}).on("keyup.dtb-collection",function(a){a.keyCode===27&&j()});if(e.autoClose)b.on("buttons-action.b-internal",function(){j()})},10)},background:!0,collectionLayout:"",backgroundClassName:"dt-button-background",autoClose:!1,fade:400,
attr:{"aria-haspopup":!0}},copy:function(a,b){if(k.copyHtml5)return"copyHtml5";if(k.copyFlash&&k.copyFlash.available(a,b))return"copyFlash"},csv:function(a,b){if(k.csvHtml5&&k.csvHtml5.available(a,b))return"csvHtml5";if(k.csvFlash&&k.csvFlash.available(a,b))return"csvFlash"},excel:function(a,b){if(k.excelHtml5&&k.excelHtml5.available(a,b))return"excelHtml5";if(k.excelFlash&&k.excelFlash.available(a,b))return"excelFlash"},pdf:function(a,b){if(k.pdfHtml5&&k.pdfHtml5.available(a,b))return"pdfHtml5";
if(k.pdfFlash&&k.pdfFlash.available(a,b))return"pdfFlash"},pageLength:function(a){var a=a.settings()[0].aLengthMenu,b=d.isArray(a[0])?a[0]:a,c=d.isArray(a[0])?a[1]:a,e=function(a){return a.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},a.page.len())};return{extend:"collection",text:e,className:"buttons-page-length",autoClose:!0,buttons:d.map(b,function(a,b){return{text:c[b],className:"button-page-length",action:function(b,c){c.page.len(a).draw()},init:function(b,c,e){var d=this,
c=function(){d.active(b.page.len()===a)};b.on("length.dt"+e.namespace,c);c()},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}),init:function(a,b,c){var d=this;a.on("length.dt"+c.namespace,function(){d.text(e(a))})},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}});i.Api.register("buttons()",function(a,b){b===m&&(b=a,a=m);this.selector.buttonGroup=a;var c=this.iterator(!0,"table",function(c){if(c._buttons)return l.buttonSelector(l.instanceSelector(a,c._buttons),b)},!0);c._groupSelector=
a;return c});i.Api.register("button()",function(a,b){var c=this.buttons(a,b);1<c.length&&c.splice(1,c.length);return c});i.Api.registerPlural("buttons().active()","button().active()",function(a){return a===m?this.map(function(a){return a.inst.active(a.node)}):this.each(function(b){b.inst.active(b.node,a)})});i.Api.registerPlural("buttons().action()","button().action()",function(a){return a===m?this.map(function(a){return a.inst.action(a.node)}):this.each(function(b){b.inst.action(b.node,a)})});i.Api.register(["buttons().enable()",
"button().enable()"],function(a){return this.each(function(b){b.inst.enable(b.node,a)})});i.Api.register(["buttons().disable()","button().disable()"],function(){return this.each(function(a){a.inst.disable(a.node)})});i.Api.registerPlural("buttons().nodes()","button().node()",function(){var a=d();d(this.each(function(b){a=a.add(b.inst.node(b.node))}));return a});i.Api.registerPlural("buttons().processing()","button().processing()",function(a){return a===m?this.map(function(a){return a.inst.processing(a.node)}):
this.each(function(b){b.inst.processing(b.node,a)})});i.Api.registerPlural("buttons().text()","button().text()",function(a){return a===m?this.map(function(a){return a.inst.text(a.node)}):this.each(function(b){b.inst.text(b.node,a)})});i.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(a){a.inst.node(a.node).trigger("click")})});i.Api.registerPlural("buttons().containers()","buttons().container()",function(){var a=d(),b=this._groupSelector;this.iterator(!0,
"table",function(c){if(c._buttons)for(var c=l.instanceSelector(b,c._buttons),d=0,g=c.length;d<g;d++)a=a.add(c[d].container())});return a});i.Api.register("button().add()",function(a,b){var c=this.context;c.length&&(c=l.instanceSelector(this._groupSelector,c[0]._buttons),c.length&&c[0].add(b,a));return this.button(this._groupSelector,a)});i.Api.register("buttons().destroy()",function(){this.pluck("inst").unique().each(function(a){a.destroy()});return this});i.Api.registerPlural("buttons().remove()",
"buttons().remove()",function(){this.each(function(a){a.inst.remove(a.node)});return this});var r;i.Api.register("buttons.info()",function(a,b,c){var e=this;if(!1===a)return d("#datatables_buttons_info").fadeOut(function(){d(this).remove()}),clearTimeout(r),r=null,this;r&&clearTimeout(r);d("#datatables_buttons_info").length&&d("#datatables_buttons_info").remove();d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a?"<h2>"+a+"</h2>":"").append(d("<div/>")["string"===typeof b?"html":
"append"](b)).css("display","none").appendTo("body").fadeIn();c!==m&&0!==c&&(r=setTimeout(function(){e.buttons.info(!1)},c));return this});i.Api.register("buttons.exportData()",function(a){if(this.context.length){var b=new i.Api(this.context[0]),c=d.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(a){return e(a)},footer:function(a){return e(a)},body:function(a){return e(a)}},
customizeData:null},a),e=function(a){if("string"!==typeof a)return a;a=a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");a=a.replace(/<!\-\-.*?\-\->/g,"");c.stripHtml&&(a=a.replace(/<[^>]*>/g,""));c.trim&&(a=a.replace(/^\s+|\s+$/g,""));c.stripNewlines&&(a=a.replace(/\n/g," "));c.decodeEntities&&(v.innerHTML=a,a=v.value);return a},a=b.columns(c.columns).indexes().map(function(a){var d=b.column(a).header();return c.format.header(d.innerHTML,a,d)}).toArray(),g=b.table().footer()?b.columns(c.columns).indexes().map(function(a){var d=
b.column(a).footer();return c.format.footer(d?d.innerHTML:"",a,d)}).toArray():null,h=d.extend({},c.modifier);b.select&&"function"===typeof b.select.info&&h.selected===m&&b.rows(c.rows,d.extend({selected:!0},h)).any()&&d.extend(h,{selected:!0});for(var h=b.rows(c.rows,h).indexes().toArray(),f=b.cells(h,c.columns),h=f.render(c.orthogonal).toArray(),f=f.nodes().toArray(),k=a.length,j=[],l=0,n=0,o=0<k?h.length/k:0;n<o;n++){for(var r=[k],s=0;s<k;s++)r[s]=c.format.body(h[l],n,s,f[l]),l++;j[n]=r}a={header:a,
footer:g,body:j};c.customizeData&&c.customizeData(a);return a}});i.Api.register("buttons.exportInfo()",function(a){a||(a={});var b;var c=a;b="*"===c.filename&&"*"!==c.title&&c.title!==m&&null!==c.title&&""!==c.title?c.title:c.filename;"function"===typeof b&&(b=b());b===m||null===b?b=null:(-1!==b.indexOf("*")&&(b=d.trim(b.replace("*",d("head > title").text()))),b=b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""),(c=t(c.extension))||(c=""),b+=c);c=t(a.title);c=null===c?null:-1!==c.indexOf("*")?
c.replace("*",d("head > title").text()||"Exported data"):c;return{filename:b,title:c,messageTop:w(this,a.message||a.messageTop,"top"),messageBottom:w(this,a.messageBottom,"bottom")}});var t=function(a){return null===a||a===m?null:"function"===typeof a?a():a},w=function(a,b,c){b=t(b);if(null===b)return null;a=d("caption",a.table().container()).eq(0);return"*"===b?a.css("caption-side")!==c?null:a.length?a.text():"":b},v=d("<textarea/>")[0];d.fn.dataTable.Buttons=l;d.fn.DataTable.Buttons=l;d(o).on("init.dt plugin-init.dt",
function(a,b){if("dt"===a.namespace){var c=b.oInit.buttons||i.defaults.buttons;c&&!b._buttons&&(new l(b,c)).container()}});i.ext.feature.push({fnInit:function(a){var a=new i.Api(a),b=a.init().buttons||i.defaults.buttons;return(new l(a,b)).container()},cFeature:"B"});return l});

(function(g){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(k){return g(k,window,document)}):"object"===typeof exports?module.exports=function(k,l){k||(k=window);if(!l||!l.fn.dataTable)l=require("datatables.net")(k,l).$;l.fn.dataTable.Buttons||require("datatables.net-buttons")(k,l);return g(l,k,k.document)}:g(jQuery,window,document)})(function(g,k,l,q){function w(a){for(var b="";0<=a;)b=String.fromCharCode(a%26+65)+b,a=Math.floor(a/26)-
1;return b}function o(a,b,d){var c=a.createElement(b);d&&(d.attr&&g(c).attr(d.attr),d.children&&g.each(d.children,function(a,b){c.appendChild(b)}),null!==d.text&&d.text!==q&&c.appendChild(a.createTextNode(d.text)));return c}function C(a,b){var d=a.header[b].length,c;a.footer&&a.footer[b].length>d&&(d=a.footer[b].length);for(var e=0,f=a.body.length;e<f;e++)if(c=a.body[e][b],c=null!==c&&c!==q?c.toString():"",-1!==c.indexOf("\n")?(c=c.split("\n"),c.sort(function(a,b){return b.length-a.length}),c=c[0].length):
c=c.length,c>d&&(d=c),40<d)return 52;d*=1.3;return 6<d?d:6}function x(a){r===q&&(r=-1===v.serializeToString(g.parseXML(n["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"));g.each(a,function(b,d){if(g.isPlainObject(d))x(d);else{if(r){var c=d.childNodes[0],e,f,h=[];for(e=c.attributes.length-1;0<=e;e--){f=c.attributes[e].nodeName;var i=c.attributes[e].nodeValue;-1!==f.indexOf(":")&&(h.push({name:f,value:i}),c.removeAttribute(f))}e=0;for(f=h.length;e<f;e++)i=d.createAttribute(h[e].name.replace(":","_dt_b_namespace_token_")),
i.value=h[e].value,c.setAttributeNode(i)}c=v.serializeToString(d);r&&(-1===c.indexOf("<?xml")&&(c='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+c),c=c.replace(/_dt_b_namespace_token_/g,":"));c=c.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,"<$1 $2>");a[b]=c}})}var j=g.fn.dataTable,h={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,$:function(a){"string"==typeof a&&(a=l.getElementById(a));a.addClass||(a.hide=function(){this.style.display="none"},a.show=function(){this.style.display=
""},a.addClass=function(a){this.removeClass(a);this.className+=" "+a},a.removeClass=function(a){this.className=this.className.replace(RegExp("\\s*"+a+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")},a.hasClass=function(a){return!!this.className.match(RegExp("\\s*"+a+"\\s*"))});return a},setMoviePath:function(a){this.moviePath=a},dispatch:function(a,b,d){(a=this.clients[a])&&a.receiveEvent(b,d)},log:function(a){console.log("Flash: "+a)},register:function(a,b){this.clients[a]=b},getDOMObjectPosition:function(a){var b=
{left:0,top:0,width:a.width?a.width:a.offsetWidth,height:a.height?a.height:a.offsetHeight};""!==a.style.width&&(b.width=a.style.width.replace("px",""));""!==a.style.height&&(b.height=a.style.height.replace("px",""));for(;a;)b.left+=a.offsetLeft,b.top+=a.offsetTop,a=a.offsetParent;return b},Client:function(a){this.handlers={};this.id=h.nextId++;this.movieId="ZeroClipboard_TableToolsMovie_"+this.id;h.register(this.id,this);a&&this.glue(a)}};h.Client.prototype={id:0,ready:!1,movie:null,clipText:"",fileName:"",
action:"copy",handCursorEnabled:!0,cssEffects:!0,handlers:null,sized:!1,sheetName:"",glue:function(a,b){this.domElement=h.$(a);var d=99;this.domElement.style.zIndex&&(d=parseInt(this.domElement.style.zIndex,10)+1);var c=h.getDOMObjectPosition(this.domElement);this.div=l.createElement("div");var e=this.div.style;e.position="absolute";e.left="0px";e.top="0px";e.width=c.width+"px";e.height=c.height+"px";e.zIndex=d;"undefined"!=typeof b&&""!==b&&(this.div.title=b);0!==c.width&&0!==c.height&&(this.sized=
!0);this.domElement&&(this.domElement.appendChild(this.div),this.div.innerHTML=this.getHTML(c.width,c.height).replace(/&/g,"&amp;"))},positionElement:function(){var a=h.getDOMObjectPosition(this.domElement),b=this.div.style;b.position="absolute";b.width=a.width+"px";b.height=a.height+"px";0!==a.width&&0!==a.height&&(this.sized=!0,b=this.div.childNodes[0],b.width=a.width,b.height=a.height)},getHTML:function(a,b){var d="",c="id="+this.id+"&width="+a+"&height="+b;if(navigator.userAgent.match(/MSIE/))var e=
location.href.match(/^https/i)?"https://":"http://",d=d+('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+a+'" height="'+b+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+h.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+
c+'"/><param name="wmode" value="transparent"/></object>');else d+='<embed id="'+this.movieId+'" src="'+h.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+a+'" height="'+b+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+c+'" wmode="transparent" />';return d},hide:function(){this.div&&(this.div.style.left="-2000px")},
show:function(){this.reposition()},destroy:function(){var a=this;this.domElement&&this.div&&(g(this.div).remove(),this.div=this.domElement=null,g.each(h.clients,function(b,d){d===a&&delete h.clients[b]}))},reposition:function(a){a&&((this.domElement=h.$(a))||this.hide());if(this.domElement&&this.div){var a=h.getDOMObjectPosition(this.domElement),b=this.div.style;b.left=""+a.left+"px";b.top=""+a.top+"px"}},clearText:function(){this.clipText="";this.ready&&this.movie.clearText()},appendText:function(a){this.clipText+=
a;this.ready&&this.movie.appendText(a)},setText:function(a){this.clipText=a;this.ready&&this.movie.setText(a)},setFileName:function(a){this.fileName=a;this.ready&&this.movie.setFileName(a)},setSheetData:function(a){this.ready&&this.movie.setSheetData(JSON.stringify(a))},setAction:function(a){this.action=a;this.ready&&this.movie.setAction(a)},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");this.handlers[a]||(this.handlers[a]=[]);this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=
a;this.ready&&this.movie.setHandCursor(a)},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(a,b){var d,a=a.toString().toLowerCase().replace(/^on/,"");switch(a){case "load":this.movie=l.getElementById(this.movieId);if(!this.movie){d=this;setTimeout(function(){d.receiveEvent("load",null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){d=this;setTimeout(function(){d.receiveEvent("load",null)},100);this.ready=!0;return}this.ready=
!0;this.movie.clearText();this.movie.appendText(this.clipText);this.movie.setFileName(this.fileName);this.movie.setAction(this.action);this.movie.setHandCursor(this.handCursorEnabled);break;case "mouseover":this.domElement&&this.cssEffects&&this.recoverActive&&this.domElement.addClass("active");break;case "mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&(this.domElement.removeClass("active"),this.recoverActive=!0));break;case "mousedown":this.domElement&&
this.cssEffects&&this.domElement.addClass("active");break;case "mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[a])for(var c=0,e=this.handlers[a].length;c<e;c++){var f=this.handlers[a][c];if("function"==typeof f)f(this,b);else if("object"==typeof f&&2==f.length)f[0][f[1]](this,b);else if("string"==typeof f)k[f](this,b)}}};h.hasFlash=function(){try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(a){if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]!==q&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1};k.ZeroClipboard_TableTools=h;var y=function(a,b){b.attr("id");b.parents("html").length?a.glue(b[0],""):setTimeout(function(){y(a,b)},500)},D=function(a){var b="Sheet1";a.sheetName&&(b=a.sheetName.replace(/[\[\]\*\/\\\?\:]/g,""));return b},t=function(a,b){var d=b.match(/[\s\S]{1,8192}/g)||[];a.clearText();for(var c=0,e=d.length;c<e;c++)a.appendText(d[c])},
z=function(a){return a.newline?a.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},A=function(a,b){for(var d=z(b),c=a.buttons.exportData(b.exportOptions),e=b.fieldBoundary,f=b.fieldSeparator,g=RegExp(e,"g"),h=b.escapeChar!==q?b.escapeChar:"\\",k=function(a){for(var b="",c=0,d=a.length;c<d;c++)0<c&&(b+=f),b+=e?e+(""+a[c]).replace(g,h+e)+e:a[c];return b},l=b.header?k(c.header)+d:"",o=b.footer&&c.footer?d+k(c.footer):"",m=[],p=0,j=c.body.length;p<j;p++)m.push(k(c.body[p]));return{str:l+m.join(d)+
o,rows:m.length}},u={available:function(){return h.hasFlash()},init:function(a,b,d){h.moviePath=j.Buttons.swfPath;var c=new h.Client;c.setHandCursor(!0);c.addEventListener("mouseDown",function(){d._fromFlash=!0;a.button(b[0]).trigger();d._fromFlash=!1});y(c,b);d._flash=c},destroy:function(a,b,d){d._flash.destroy()},fieldSeparator:",",fieldBoundary:'"',exportOptions:{},title:"*",messageTop:"*",messageBottom:"*",filename:"*",extension:".csv",header:!0,footer:!1},v="",v="undefined"===typeof k.XMLSerializer?
new function(){this.serializeToString=function(a){return a.xml}}:new XMLSerializer,r,n={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="61"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'},
B=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(a){return a/100}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(a){return a/100}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\([\d,]+\)$/,style:61,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^[\d,]+$/,style:63},{match:/^[\d,]+\.\d{2}$/,style:64}];j.Buttons.swfPath="//cdn.datatables.net/buttons/"+
j.Buttons.version+"/swf/flashExport.swf";j.Api.register("buttons.resize()",function(){g.each(h.clients,function(a,b){b.domElement!==q&&b.domElement.parentNode&&b.positionElement()})});j.ext.buttons.copyFlash=g.extend({},u,{className:"buttons-copy buttons-flash",text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,b,d,c){if(c._fromFlash){this.processing(!0);var a=c._flash,e=A(b,c),d=b.buttons.exportInfo(c),f=z(c),e=e.str;d.title&&(e=d.title+f+f+e);d.messageTop&&(e=d.messageTop+
f+f+e);d.messageBottom&&(e=e+f+f+d.messageBottom);c.customize&&(e=c.customize(e,c,b));a.setAction("copy");t(a,e);this.processing(!1);b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),b.i18n("buttons.copySuccess",{_:"Copied %d rows to clipboard",1:"Copied 1 row to clipboard"},data.rows),3E3)}},fieldSeparator:"\t",fieldBoundary:""});j.ext.buttons.csvFlash=g.extend({},u,{className:"buttons-csv buttons-flash",text:function(a){return a.i18n("buttons.csv","CSV")},action:function(a,b,d,c){var a=
c._flash,e=A(b,c),d=b.buttons.exportInfo(c),b=c.customize?c.customize(e.str,c,b):e.str;a.setAction("csv");a.setFileName(d.filename);t(a,b)},escapeChar:'"'});j.ext.buttons.excelFlash=g.extend({},u,{className:"buttons-excel buttons-flash",text:function(a){return a.i18n("buttons.excel","Excel")},action:function(a,b,d,c){this.processing(!0);var a=c._flash,e=0,f=g.parseXML(n["xl/worksheets/sheet1.xml"]),h=f.getElementsByTagName("sheetData")[0],d={_rels:{".rels":g.parseXML(n["_rels/.rels"])},xl:{_rels:{"workbook.xml.rels":g.parseXML(n["xl/_rels/workbook.xml.rels"])},
"workbook.xml":g.parseXML(n["xl/workbook.xml"]),"styles.xml":g.parseXML(n["xl/styles.xml"]),worksheets:{"sheet1.xml":f}},"[Content_Types].xml":g.parseXML(n["[Content_Types].xml"])},i=b.buttons.exportData(c.exportOptions),k,l,j=function(a){k=e+1;l=o(f,"row",{attr:{r:k}});for(var b=0,d=a.length;b<d;b++){var j=w(b)+""+k,i=null;if(null===a[b]||a[b]===q||""===a[b])if(!0===c.createEmptyCells)a[b]="";else continue;a[b]=g.trim(a[b]);for(var m=0,p=B.length;m<p;m++){var n=B[m];if(a[b].match&&!a[b].match(/^0\d+/)&&
a[b].match(n.match)){i=a[b].replace(/[^\d\.\-]/g,"");n.fmt&&(i=n.fmt(i));i=o(f,"c",{attr:{r:j,s:n.style},children:[o(f,"v",{text:i})]});break}}i||("number"===typeof a[b]||a[b].match&&a[b].match(/^-?\d+(\.\d+)?$/)&&!a[b].match(/^0\d+/)?i=o(f,"c",{attr:{t:"n",r:j},children:[o(f,"v",{text:a[b]})]}):(n=!a[b].replace?a[b]:a[b].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,""),i=o(f,"c",{attr:{t:"inlineStr",r:j},children:{row:o(f,"is",{children:{row:o(f,"t",{text:n})}})}})));l.appendChild(i)}h.appendChild(l);
e++};g("sheets sheet",d.xl["workbook.xml"]).attr("name",D(c));c.customizeData&&c.customizeData(i);var m=function(a,b){var c=g("mergeCells",f);c[0].appendChild(o(f,"mergeCell",{attr:{ref:"A"+a+":"+w(b)+a}}));c.attr("count",c.attr("count")+1);g("row:eq("+(a-1)+") c",f).attr("s","51")},p=b.buttons.exportInfo(c);p.title&&(j([p.title],e),m(e,i.header.length-1));p.messageTop&&(j([p.messageTop],e),m(e,i.header.length-1));c.header&&(j(i.header,e),g("row:last c",f).attr("s","2"));for(var s=0,r=i.body.length;s<
r;s++)j(i.body[s],e);c.footer&&i.footer&&(j(i.footer,e),g("row:last c",f).attr("s","2"));p.messageBottom&&(j([p.messageBottom],e),m(e,i.header.length-1));j=o(f,"cols");g("worksheet",f).prepend(j);m=0;for(s=i.header.length;m<s;m++)j.appendChild(o(f,"col",{attr:{min:m+1,max:m+1,width:C(i,m),customWidth:1}}));c.customize&&c.customize(d,c,b);x(d);a.setAction("excel");a.setFileName(p.filename);a.setSheetData(d);t(a,"");this.processing(!1)},extension:".xlsx",createEmptyCells:!1});j.ext.buttons.pdfFlash=
g.extend({},u,{className:"buttons-pdf buttons-flash",text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,b,d,c){this.processing(!0);var a=c._flash,d=b.buttons.exportData(c.exportOptions),e=b.buttons.exportInfo(c),f=b.table().node().offsetWidth,g=b.columns(c.columns).indexes().map(function(a){return b.column(a).header().offsetWidth/f});a.setAction("pdf");a.setFileName(e.filename);t(a,JSON.stringify({title:e.title||"",messageTop:e.messageTop||"",messageBottom:e.messageBottom||"",
colWidth:g.toArray(),orientation:c.orientation,size:c.pageSize,header:c.header?d.header:null,footer:c.footer?d.footer:null,body:d.body}));this.processing(!1)},extension:".pdf",orientation:"portrait",pageSize:"A4",newline:"\n"});return j.Buttons});

/*!

JSZip v3.1.3 - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d=a("./utils"),e=a("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,g,h,i,j,k=[],l=0,m=a.length,n=m,o="string"!==d.getTypeOf(a);l<a.length;)n=m-l,o?(b=a[l++],c=l<m?a[l++]:0,e=l<m?a[l++]:0):(b=a.charCodeAt(l++),c=l<m?a.charCodeAt(l++):0,e=l<m?a.charCodeAt(l++):0),g=b>>2,h=(3&b)<<4|c>>4,i=n>1?(15&c)<<2|e>>6:64,j=n>2?63&e:64,k.push(f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j));return k.join("")},c.decode=function(a){var b,c,d,g,h,i,j,k=0,l=0,m="data:";if(a.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");var n=3*a.length/4;if(a.charAt(a.length-1)===f.charAt(64)&&n--,a.charAt(a.length-2)===f.charAt(64)&&n--,n%1!==0)throw new Error("Invalid base64 input, bad content length.");var o;for(o=e.uint8array?new Uint8Array(0|n):new Array(0|n);k<a.length;)g=f.indexOf(a.charAt(k++)),h=f.indexOf(a.charAt(k++)),i=f.indexOf(a.charAt(k++)),j=f.indexOf(a.charAt(k++)),b=g<<2|h>>4,c=(15&h)<<4|i>>2,d=(3&i)<<6|j,o[l++]=b,64!==i&&(o[l++]=c),64!==j&&(o[l++]=d);return o}},{"./support":30,"./utils":32}],2:[function(a,b,c){"use strict";function d(a,b,c,d,e){this.compressedSize=a,this.uncompressedSize=b,this.crc32=c,this.compression=d,this.compressedContent=e}var e=a("./external"),f=a("./stream/DataWorker"),g=a("./stream/DataLengthProbe"),h=a("./stream/Crc32Probe"),g=a("./stream/DataLengthProbe");d.prototype={getContentWorker:function(){var a=new f(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new g("data_length")),b=this;return a.on("end",function(){if(this.streamInfo.data_length!==b.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),a},getCompressedWorker:function(){return new f(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(a,b,c){return a.pipe(new h).pipe(new g("uncompressedSize")).pipe(b.compressWorker(c)).pipe(new g("compressedSize")).withStreamInfo("compression",b)},b.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,b,c){"use strict";var d=a("./stream/GenericWorker");c.STORE={magic:"\0\0",compressWorker:function(a){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},c.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b[g])];return a^-1}function f(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b.charCodeAt(g))];return a^-1}var g=a("./utils"),h=d();b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==g.getTypeOf(a);return c?e(0|b,a,a.length,0):f(0|b,a,a.length,0)}},{"./utils":32}],5:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!0,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],6:[function(a,b,c){"use strict";var d=null;d="undefined"!=typeof Promise?Promise:a("lie"),b.exports={Promise:d}},{lie:58}],7:[function(a,b,c){"use strict";function d(a,b){h.call(this,"FlateWorker/"+a),this._pako=new f[a]({raw:!0,level:b.level||-1}),this.meta={};var c=this;this._pako.onData=function(a){c.push({data:a,meta:c.meta})}}var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,f=a("pako"),g=a("./utils"),h=a("./stream/GenericWorker"),i=e?"uint8array":"array";c.magic="\b\0",g.inherits(d,h),d.prototype.processChunk=function(a){this.meta=a.meta,this._pako.push(g.transformTo(i,a.data),!1)},d.prototype.flush=function(){h.prototype.flush.call(this),this._pako.push([],!0)},d.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},c.compressWorker=function(a){return new d("Deflate",a)},c.uncompressWorker=function(){return new d("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:59}],8:[function(a,b,c){"use strict";function d(a,b,c,d){f.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=c,this.encodeFileName=d,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}var e=a("../utils"),f=a("../stream/GenericWorker"),g=a("../utf8"),h=a("../crc32"),i=a("../signature"),j=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},k=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},l=function(a,b){return 63&(a||0)},m=function(a,b,c,d,f,m){var n,o,p=a.file,q=a.compression,r=m!==g.utf8encode,s=e.transformTo("string",m(p.name)),t=e.transformTo("string",g.utf8encode(p.name)),u=p.comment,v=e.transformTo("string",m(u)),w=e.transformTo("string",g.utf8encode(u)),x=t.length!==p.name.length,y=w.length!==u.length,z="",A="",B="",C=p.dir,D=p.date,E={crc32:0,compressedSize:0,uncompressedSize:0};b&&!c||(E.crc32=a.crc32,E.compressedSize=a.compressedSize,E.uncompressedSize=a.uncompressedSize);var F=0;b&&(F|=8),r||!x&&!y||(F|=2048);var G=0,H=0;C&&(G|=16),"UNIX"===f?(H=798,G|=k(p.unixPermissions,C)):(H=20,G|=l(p.dosPermissions,C)),n=D.getUTCHours(),n<<=6,n|=D.getUTCMinutes(),n<<=5,n|=D.getUTCSeconds()/2,o=D.getUTCFullYear()-1980,o<<=4,o|=D.getUTCMonth()+1,o<<=5,o|=D.getUTCDate(),x&&(A=j(1,1)+j(h(s),4)+t,z+="up"+j(A.length,2)+A),y&&(B=j(1,1)+j(h(v),4)+w,z+="uc"+j(B.length,2)+B);var I="";I+="\n\0",I+=j(F,2),I+=q.magic,I+=j(n,2),I+=j(o,2),I+=j(E.crc32,4),I+=j(E.compressedSize,4),I+=j(E.uncompressedSize,4),I+=j(s.length,2),I+=j(z.length,2);var J=i.LOCAL_FILE_HEADER+I+s+z,K=i.CENTRAL_FILE_HEADER+j(H,2)+I+j(v.length,2)+"\0\0\0\0"+j(G,4)+j(d,4)+s+z+v;return{fileRecord:J,dirRecord:K}},n=function(a,b,c,d,f){var g="",h=e.transformTo("string",f(d));return g=i.CENTRAL_DIRECTORY_END+"\0\0\0\0"+j(a,2)+j(a,2)+j(b,4)+j(c,4)+j(h.length,2)+h},o=function(a){var b="";return b=i.DATA_DESCRIPTOR+j(a.crc32,4)+j(a.compressedSize,4)+j(a.uncompressedSize,4)};e.inherits(d,f),d.prototype.push=function(a){var b=a.meta.percent||0,c=this.entriesCount,d=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,f.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:c?(b+100*(c-d-1))/c:100}}))},d.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var b=this.streamFiles&&!a.file.dir;if(b){var c=m(a,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:c.fileRecord,meta:{percent:0}})}else this.accumulate=!0},d.prototype.closedSource=function(a){this.accumulate=!1;var b=this.streamFiles&&!a.file.dir,c=m(a,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(c.dirRecord),b)this.push({data:o(a),meta:{percent:100}});else for(this.push({data:c.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},d.prototype.flush=function(){for(var a=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var c=this.bytesWritten-a,d=n(this.dirRecords.length,c,a,this.zipComment,this.encodeFileName);this.push({data:d,meta:{percent:100}})},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},d.prototype.registerPrevious=function(a){this._sources.push(a);var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),a.on("error",function(a){b.error(a)}),this},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(a){var b=this._sources;if(!f.prototype.error.call(this,a))return!1;for(var c=0;c<b.length;c++)try{b[c].error(a)}catch(a){}return!0},d.prototype.lock=function(){f.prototype.lock.call(this);for(var a=this._sources,b=0;b<a.length;b++)a[b].lock()},b.exports=d},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,b,c){"use strict";var d=a("../compressions"),e=a("./ZipFileWorker"),f=function(a,b){var c=a||b,e=d[c];if(!e)throw new Error(c+" is not a valid compression method !");return e};c.generateWorker=function(a,b,c){var d=new e(b.streamFiles,c,b.platform,b.encodeFileName),g=0;try{a.forEach(function(a,c){g++;var e=f(c.options.compression,b.compression),h=c.options.compressionOptions||b.compressionOptions||{},i=c.dir,j=c.date;c._compressWorker(e,h).withStreamInfo("file",{name:a,dir:i,date:j,comment:c.comment||"",unixPermissions:c.unixPermissions,dosPermissions:c.dosPermissions}).pipe(d)}),d.entriesCount=g}catch(h){d.error(h)}return d}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,b,c){"use strict";function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a}}d.prototype=a("./object"),d.prototype.loadAsync=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.version="3.1.3",d.loadAsync=function(a,b){return(new d).loadAsync(a,b)},d.external=a("./external"),b.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,b,c){"use strict";function d(a){return new f.Promise(function(b,c){var d=a.decompressed.getContentWorker().pipe(new i);d.on("error",function(a){c(a)}).on("end",function(){d.streamInfo.crc32!==a.decompressed.crc32?c(new Error("Corrupted zip : CRC32 mismatch")):b()}).resume()})}var e=a("./utils"),f=a("./external"),g=a("./utf8"),e=a("./utils"),h=a("./zipEntries"),i=a("./stream/Crc32Probe"),j=a("./nodejsUtils");b.exports=function(a,b){var c=this;return b=e.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:g.utf8decode}),j.isNode&&j.isStream(a)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):e.prepareContent("the loaded zip file",a,!0,b.optimizedBinaryString,b.base64).then(function(a){var c=new h(b);return c.load(a),c}).then(function(a){var c=[f.Promise.resolve(a)],e=a.files;if(b.checkCRC32)for(var g=0;g<e.length;g++)c.push(d(e[g]));return f.Promise.all(c)}).then(function(a){for(var d=a.shift(),e=d.files,f=0;f<e.length;f++){var g=e[f];c.file(g.fileNameStr,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:b.createFolders})}return d.zipComment.length&&(c.comment=d.zipComment),c})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,b,c){"use strict";function d(a,b){f.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(b)}var e=a("../utils"),f=a("../stream/GenericWorker");e.inherits(d,f),d.prototype._bindStream=function(a){var b=this;this._stream=a,a.pause(),a.on("data",function(a){b.push({data:a,meta:{percent:0}})}).on("error",function(a){b.isPaused?this.generatedError=a:b.error(a)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},d.prototype.pause=function(){return!!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},b.exports=d},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,b,c){"use strict";function d(a,b,c){e.call(this,b),this._helper=a;var d=this;a.on("data",function(a,b){d.push(a)||d._helper.pause(),c&&c(b)}).on("error",function(a){d.emit("error",a)}).on("end",function(){d.push(null)})}var e=a("readable-stream").Readable,f=a("util");f.inherits(d,e),d.prototype._read=function(){this._helper.resume()},b.exports=d},{"readable-stream":16,util:void 0}],14:[function(a,b,c){"use strict";b.exports={isNode:"undefined"!=typeof Buffer,newBuffer:function(a,b){return new Buffer(a,b)},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&"function"==typeof a.on&&"function"==typeof a.pause&&"function"==typeof a.resume}}},{}],15:[function(a,b,c){"use strict";function d(a){return"[object RegExp]"===Object.prototype.toString.call(a)}var e=a("./utf8"),f=a("./utils"),g=a("./stream/GenericWorker"),h=a("./stream/StreamHelper"),i=a("./defaults"),j=a("./compressedObject"),k=a("./zipObject"),l=a("./generate"),m=a("./nodejsUtils"),n=a("./nodejs/NodejsStreamInputAdapter"),o=function(a,b,c){var d,e=f.getTypeOf(b),h=f.extend(c||{},i);h.date=h.date||new Date,null!==h.compression&&(h.compression=h.compression.toUpperCase()),"string"==typeof h.unixPermissions&&(h.unixPermissions=parseInt(h.unixPermissions,8)),h.unixPermissions&&16384&h.unixPermissions&&(h.dir=!0),h.dosPermissions&&16&h.dosPermissions&&(h.dir=!0),h.dir&&(a=q(a)),h.createFolders&&(d=p(a))&&r.call(this,d,!0);var l="string"===e&&h.binary===!1&&h.base64===!1;c&&"undefined"!=typeof c.binary||(h.binary=!l);var o=b instanceof j&&0===b.uncompressedSize;(o||h.dir||!b||0===b.length)&&(h.base64=!1,h.binary=!0,b="",h.compression="STORE",e="string");var s=null;s=b instanceof j||b instanceof g?b:m.isNode&&m.isStream(b)?new n(a,b):f.prepareContent(a,b,h.binary,h.optimizedBinaryString,h.base64);var t=new k(a,s,h);this.files[a]=t},p=function(a){"/"===a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},q=function(a){return"/"!==a.slice(-1)&&(a+="/"),a},r=function(a,b){return b="undefined"!=typeof b?b:i.createFolders,a=q(a),this.files[a]||o.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},s={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(a){var b,c,d;for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],c=b.slice(this.root.length,b.length),c&&b.slice(0,this.root.length)===this.root&&a(c,d))},filter:function(a){var b=[];return this.forEach(function(c,d){a(c,d)&&b.push(d)}),b},file:function(a,b,c){if(1===arguments.length){if(d(a)){var e=a;return this.filter(function(a,b){return!b.dir&&e.test(a)})}var f=this.files[this.root+a];return f&&!f.dir?f:null}return a=this.root+a,o.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(d(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=r.call(this,b),e=this.clone();return e.root=c.name,e},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!==a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(a){var b,c={};try{if(c=f.extend(a||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode}),c.type=c.type.toLowerCase(),c.compression=c.compression.toUpperCase(),"binarystring"===c.type&&(c.type="string"),!c.type)throw new Error("No output type specified.");f.checkSupport(c.type),"darwin"!==c.platform&&"freebsd"!==c.platform&&"linux"!==c.platform&&"sunos"!==c.platform||(c.platform="UNIX"),"win32"===c.platform&&(c.platform="DOS");var d=c.comment||this.comment||"";b=l.generateWorker(this,c,d)}catch(i){b=new g("error"),b.error(i)}return new h(b,c.type||"string",c.mimeType)},generateAsync:function(a,b){return this.generateInternalStream(a).accumulate(b)},generateNodeStream:function(a,b){return a=a||{},a.type||(a.type="nodebuffer"),this.generateInternalStream(a).toNodejsStream(b)}};b.exports=s},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,b,c){b.exports=a("stream")},{stream:void 0}],17:[function(a,b,c){"use strict";function d(a){e.call(this,a);for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readAndCheckSignature=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.readData(4);return b===f[0]&&c===f[1]&&d===f[2]&&e===f[3]},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],18:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}var e=a("../utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readAndCheckSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},b.exports=d},{"../utils":32}],19:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./Uint8ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readAndCheckSignature=function(a){var b=this.readData(4);return a===b},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],21:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./ArrayReader":17}],22:[function(a,b,c){"use strict";var d=a("../utils"),e=a("../support"),f=a("./ArrayReader"),g=a("./StringReader"),h=a("./NodeBufferReader"),i=a("./Uint8ArrayReader");b.exports=function(a){var b=d.getTypeOf(a);return d.checkSupport(b),"string"!==b||e.uint8array?"nodebuffer"===b?new h(a):e.uint8array?new i(d.transformTo("uint8array",a)):new f(d.transformTo("array",a)):new g(a)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],24:[function(a,b,c){"use strict";function d(a){e.call(this,"ConvertWorker to "+a),this.destType=a}var e=a("./GenericWorker"),f=a("../utils");f.inherits(d,e),d.prototype.processChunk=function(a){this.push({data:f.transformTo(this.destType,a.data),meta:a.meta})},b.exports=d},{"../utils":32,"./GenericWorker":28}],25:[function(a,b,c){"use strict";function d(){e.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}var e=a("./GenericWorker"),f=a("../crc32"),g=a("../utils");g.inherits(d,e),d.prototype.processChunk=function(a){this.streamInfo.crc32=f(a.data,this.streamInfo.crc32||0),this.push(a)},b.exports=d},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,b,c){"use strict";function d(a){f.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}var e=a("../utils"),f=a("./GenericWorker");e.inherits(d,f),d.prototype.processChunk=function(a){if(a){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+a.data.length}f.prototype.processChunk.call(this,a)},b.exports=d},{"../utils":32,"./GenericWorker":28}],27:[function(a,b,c){"use strict";function d(a){f.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(a){b.dataIsReady=!0,b.data=a,b.max=a&&a.length||0,b.type=e.getTypeOf(a),b.isPaused||b._tickAndRepeat()},function(a){b.error(a)})}var e=a("../utils"),f=a("./GenericWorker"),g=16384;e.inherits(d,f),d.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,e.delay(this._tickAndRepeat,[],this)),!0)},d.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(e.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},d.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=g,b=null,c=Math.min(this.max,this.index+a);if(this.index>=this.max)return this.end();switch(this.type){case"string":b=this.data.substring(this.index,c);break;case"uint8array":b=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":b=this.data.slice(this.index,c)}return this.index=c,this.push({data:b,meta:{percent:this.max?this.index/this.max*100:0}})},b.exports=d},{"../utils":32,"./GenericWorker":28}],28:[function(a,b,c){"use strict";function d(a){this.name=a||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(a){this.emit("data",a)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(a){this.emit("error",a)}return!0},error:function(a){return!this.isFinished&&(this.isPaused?this.generatedError=a:(this.isFinished=!0,this.emit("error",a),this.previous&&this.previous.error(a),this.cleanUp()),!0)},on:function(a,b){return this._listeners[a].push(b),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(a,b){if(this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)this._listeners[a][c].call(this,b)},pipe:function(a){return a.registerPrevious(this)},registerPrevious:function(a){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=a.streamInfo,this.mergeStreamInfo(),this.previous=a;var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.end()}),a.on("error",function(a){b.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;this.isPaused=!1;var a=!1;return this.generatedError&&(this.error(this.generatedError),a=!0),this.previous&&this.previous.resume(),!a},flush:function(){},processChunk:function(a){this.push(a)},withStreamInfo:function(a,b){return this.extraStreamInfo[a]=b,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var a in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(a)&&(this.streamInfo[a]=this.extraStreamInfo[a])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var a="Worker "+this.name;return this.previous?this.previous+" -> "+a:a}},b.exports=d},{}],29:[function(a,b,c){"use strict";function d(a,b,c,d){var f=null;switch(a){case"blob":return h.newBlob(c,d);case"base64":return f=e(b,c),k.encode(f);default:return f=e(b,c),h.transformTo(a,f)}}function e(a,b){var c,d=0,e=null,f=0;for(c=0;c<b.length;c++)f+=b[c].length;switch(a){case"string":return b.join("");case"array":return Array.prototype.concat.apply([],b);case"uint8array":for(e=new Uint8Array(f),c=0;c<b.length;c++)e.set(b[c],d),d+=b[c].length;return e;case"nodebuffer":return Buffer.concat(b);default:throw new Error("concat : unsupported type '"+a+"'")}}function f(a,b){return new m.Promise(function(c,e){var f=[],g=a._internalType,h=a._outputType,i=a._mimeType;a.on("data",function(a,c){f.push(a),b&&b(c)}).on("error",function(a){f=[],e(a)}).on("end",function(){try{var a=d(h,g,f,i);c(a)}catch(b){e(b)}f=[]}).resume()})}function g(a,b,c){var d=b;switch(b){case"blob":d="arraybuffer";break;case"arraybuffer":d="uint8array";break;case"base64":d="string"}try{this._internalType=d,this._outputType=b,this._mimeType=c,h.checkSupport(d),this._worker=a.pipe(new i(d)),a.lock()}catch(e){this._worker=new j("error"),this._worker.error(e)}}var h=a("../utils"),i=a("./ConvertWorker"),j=a("./GenericWorker"),k=a("../base64"),l=a("../support"),m=a("../external"),n=null;if(l.nodestream)try{n=a("../nodejs/NodejsStreamOutputAdapter")}catch(o){}g.prototype={accumulate:function(a){return f(this,a)},on:function(a,b){var c=this;return"data"===a?this._worker.on(a,function(a){b.call(c,a.data,a.meta)}):this._worker.on(a,function(){h.delay(b,arguments,c)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(a){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new n(this,{objectMode:"nodebuffer"!==this._outputType},a)}},b.exports=g},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,b,c){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof Buffer,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var d=new ArrayBuffer(0);try{c.blob=0===new Blob([d],{type:"application/zip"}).size}catch(e){try{var f=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,g=new f;g.append(d),c.blob=0===g.getBlob("application/zip").size}catch(e){c.blob=!1}}}try{c.nodestream=!!a("readable-stream").Readable}catch(e){c.nodestream=!1}},{"readable-stream":16}],31:[function(a,b,c){"use strict";function d(){i.call(this,"utf-8 decode"),this.leftOver=null}function e(){i.call(this,"utf-8 encode")}for(var f=a("./utils"),g=a("./support"),h=a("./nodejsUtils"),i=a("./stream/GenericWorker"),j=new Array(256),k=0;k<256;k++)j[k]=k>=252?6:k>=248?5:k>=240?4:k>=224?3:k>=192?2:1;j[254]=j[254]=1;var l=function(a){var b,c,d,e,f,h=a.length,i=0;for(e=0;e<h;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=g.uint8array?new Uint8Array(i):new Array(i),f=0,e=0;f<i;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),c<128?b[f++]=c:c<2048?(b[f++]=192|c>>>6,b[f++]=128|63&c):c<65536?(b[f++]=224|c>>>12,b[f++]=128|c>>>6&63,b[f++]=128|63&c):(b[f++]=240|c>>>18,b[f++]=128|c>>>12&63,b[f++]=128|c>>>6&63,b[f++]=128|63&c);return b},m=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+j[a[c]]>b?c:b},n=function(a){var b,c,d,e,g=a.length,h=new Array(2*g);for(c=0,b=0;b<g;)if(d=a[b++],d<128)h[c++]=d;else if(e=j[d],e>4)h[c++]=65533,b+=e-1;else{for(d&=2===e?31:3===e?15:7;e>1&&b<g;)d=d<<6|63&a[b++],e--;e>1?h[c++]=65533:d<65536?h[c++]=d:(d-=65536,h[c++]=55296|d>>10&1023,h[c++]=56320|1023&d)}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),f.applyFromCharCode(h)};c.utf8encode=function(a){return g.nodebuffer?h.newBuffer(a,"utf-8"):l(a)},c.utf8decode=function(a){return g.nodebuffer?f.transformTo("nodebuffer",a).toString("utf-8"):(a=f.transformTo(g.uint8array?"uint8array":"array",a),n(a))},f.inherits(d,i),d.prototype.processChunk=function(a){var b=f.transformTo(g.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(g.uint8array){var d=b;b=new Uint8Array(d.length+this.leftOver.length),b.set(this.leftOver,0),b.set(d,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var e=m(b),h=b;e!==b.length&&(g.uint8array?(h=b.subarray(0,e),this.leftOver=b.subarray(e,b.length)):(h=b.slice(0,e),this.leftOver=b.slice(e,b.length))),this.push({data:c.utf8decode(h),meta:a.meta})},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:c.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},c.Utf8DecodeWorker=d,f.inherits(e,i),e.prototype.processChunk=function(a){this.push({data:c.utf8encode(a.data),meta:a.meta})},c.Utf8EncodeWorker=e},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,b,c){"use strict";function d(a){var b=null;return b=i.uint8array?new Uint8Array(a.length):new Array(a.length),f(a,b)}function e(a){return a}function f(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function g(a){var b=65536,d=c.getTypeOf(a),e=!0;if("uint8array"===d?e=n.applyCanBeUsed.uint8array:"nodebuffer"===d&&(e=n.applyCanBeUsed.nodebuffer),e)for(;b>1;)try{return n.stringifyByChunk(a,d,b)}catch(f){b=Math.floor(b/2)}return n.stringifyByChar(a)}function h(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var i=a("./support"),j=a("./base64"),k=a("./nodejsUtils"),l=a("core-js/library/fn/set-immediate"),m=a("./external");c.newBlob=function(a,b){c.checkSupport("blob");try{return new Blob(a,{type:b})}catch(d){try{for(var e=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,f=new e,g=0;g<a.length;g++)f.append(a[g]);
return f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}};var n={stringifyByChunk:function(a,b,c){var d=[],e=0,f=a.length;if(f<=c)return String.fromCharCode.apply(null,a);for(;e<f;)"array"===b||"nodebuffer"===b?d.push(String.fromCharCode.apply(null,a.slice(e,Math.min(e+c,f)))):d.push(String.fromCharCode.apply(null,a.subarray(e,Math.min(e+c,f)))),e+=c;return d.join("")},stringifyByChar:function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(a){return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&1===String.fromCharCode.apply(null,k.newBuffer(1)).length}catch(a){return!1}}()}};c.applyFromCharCode=g;var o={};o.string={string:e,array:function(a){return f(a,new Array(a.length))},arraybuffer:function(a){return o.string.uint8array(a).buffer},uint8array:function(a){return f(a,new Uint8Array(a.length))},nodebuffer:function(a){return f(a,k.newBuffer(a.length))}},o.array={string:g,array:e,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBuffer(a)}},o.arraybuffer={string:function(a){return g(new Uint8Array(a))},array:function(a){return h(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:e,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBuffer(new Uint8Array(a))}},o.uint8array={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){var b=new Uint8Array(a.length);return a.length&&b.set(a,0),b.buffer},uint8array:e,nodebuffer:function(a){return k.newBuffer(a)}},o.nodebuffer={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return o.nodebuffer.uint8array(a).buffer},uint8array:function(a){return h(a,new Uint8Array(a.length))},nodebuffer:e},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=o[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":i.nodebuffer&&k.isBuffer(a)?"nodebuffer":i.uint8array&&a instanceof Uint8Array?"uint8array":i.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=i[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this platform")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.delay=function(a,b,c){l(function(){a.apply(c||null,b||[])})},c.inherits=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},c.prepareContent=function(a,b,e,f,g){var h=m.Promise.resolve(b).then(function(a){var b=i.blob&&(a instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(a))!==-1);return b&&"undefined"!=typeof FileReader?new m.Promise(function(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result)},d.onerror=function(a){c(a.target.error)},d.readAsArrayBuffer(a)}):a});return h.then(function(b){var h=c.getTypeOf(b);return h?("arraybuffer"===h?b=c.transformTo("uint8array",b):"string"===h&&(g?b=j.decode(b):e&&f!==!0&&(b=d(b))),b):m.Promise.reject(new Error("The data of '"+a+"' is in an unsupported format !"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(a,b,c){"use strict";function d(a){this.files=[],this.loadOptions=a}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./signature"),h=a("./zipEntry"),i=(a("./utf8"),a("./support"));d.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug : unexpected signature ("+f.pretty(b)+", expected "+f.pretty(a)+")")}},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=i.uint8array?"uint8array":"array",c=f.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readData(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(g.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(g.CENTRAL_FILE_HEADER);)a=new h({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(g.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,g.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip : can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(g.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,g.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,g.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){this.reader=e(a)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./compressedObject"),h=a("./crc32"),i=a("./utf8"),j=a("./compressions"),k=a("./support"),l=0,m=3,n=function(a){for(var b in j)if(j.hasOwnProperty(b)&&j[b].magic===a)return j[b];return null};d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(b=n(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new g(this.compressedSize,this.uncompressedSize,this.crc32,b,a.readData(this.compressedSize))},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var b=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(b),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===l&&(this.dosPermissions=63&this.externalFileAttributes),a===m&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index<e;)b=a.readInt(2),c=a.readInt(2),d=a.readData(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=k.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=i.utf8decode(this.fileName),this.fileCommentStr=i.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileName)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileComment)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null}},b.exports=d},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,b,c){"use strict";var d=a("./stream/StreamHelper"),e=a("./stream/DataWorker"),f=a("./utf8"),g=a("./compressedObject"),h=a("./stream/GenericWorker"),i=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}};i.prototype={internalStream:function(a){var b=a.toLowerCase(),c="string"===b||"text"===b;"binarystring"!==b&&"text"!==b||(b="string");var e=this._decompressWorker(),g=!this._dataBinary;return g&&!c&&(e=e.pipe(new f.Utf8EncodeWorker)),!g&&c&&(e=e.pipe(new f.Utf8DecodeWorker)),new d(e,b,"")},async:function(a,b){return this.internalStream(a).accumulate(b)},nodeStream:function(a,b){return this.internalStream(a||"nodebuffer").toNodejsStream(b)},_compressWorker:function(a,b){if(this._data instanceof g&&this._data.compression.magic===a.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new f.Utf8EncodeWorker)),g.createWorkerFrom(c,a,b)},_decompressWorker:function(){return this._data instanceof g?this._data.getContentWorker():this._data instanceof h?this._data:new e(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],k=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<j.length;l++)i.prototype[j[l]]=k;b.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,b,c){a("../modules/web.immediate"),b.exports=a("../modules/_core").setImmediate},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(a,b,c){b.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},{}],38:[function(a,b,c){var d=a("./_is-object");b.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},{"./_is-object":51}],39:[function(a,b,c){var d={}.toString;b.exports=function(a){return d.call(a).slice(8,-1)}},{}],40:[function(a,b,c){var d=b.exports={version:"2.3.0"};"number"==typeof __e&&(__e=d)},{}],41:[function(a,b,c){var d=a("./_a-function");b.exports=function(a,b,c){if(d(a),void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},{"./_a-function":37}],42:[function(a,b,c){b.exports=!a("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":45}],43:[function(a,b,c){var d=a("./_is-object"),e=a("./_global").document,f=d(e)&&d(e.createElement);b.exports=function(a){return f?e.createElement(a):{}}},{"./_global":46,"./_is-object":51}],44:[function(a,b,c){var d=a("./_global"),e=a("./_core"),f=a("./_ctx"),g=a("./_hide"),h="prototype",i=function(a,b,c){var j,k,l,m=a&i.F,n=a&i.G,o=a&i.S,p=a&i.P,q=a&i.B,r=a&i.W,s=n?e:e[b]||(e[b]={}),t=s[h],u=n?d:o?d[b]:(d[b]||{})[h];n&&(c=b);for(j in c)k=!m&&u&&void 0!==u[j],k&&j in s||(l=k?u[j]:c[j],s[j]=n&&"function"!=typeof u[j]?c[j]:q&&k?f(l,d):r&&u[j]==l?function(a){var b=function(b,c,d){if(this instanceof a){switch(arguments.length){case 0:return new a;case 1:return new a(b);case 2:return new a(b,c)}return new a(b,c,d)}return a.apply(this,arguments)};return b[h]=a[h],b}(l):p&&"function"==typeof l?f(Function.call,l):l,p&&((s.virtual||(s.virtual={}))[j]=l,a&i.R&&t&&!t[j]&&g(t,j,l)))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,i.U=64,i.R=128,b.exports=i},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(a,b,c){b.exports=function(a){try{return!!a()}catch(b){return!0}}},{}],46:[function(a,b,c){var d=b.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=d)},{}],47:[function(a,b,c){var d=a("./_object-dp"),e=a("./_property-desc");b.exports=a("./_descriptors")?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(a,b,c){b.exports=a("./_global").document&&document.documentElement},{"./_global":46}],49:[function(a,b,c){b.exports=!a("./_descriptors")&&!a("./_fails")(function(){return 7!=Object.defineProperty(a("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(a,b,c){b.exports=function(a,b,c){var d=void 0===c;switch(b.length){case 0:return d?a():a.call(c);case 1:return d?a(b[0]):a.call(c,b[0]);case 2:return d?a(b[0],b[1]):a.call(c,b[0],b[1]);case 3:return d?a(b[0],b[1],b[2]):a.call(c,b[0],b[1],b[2]);case 4:return d?a(b[0],b[1],b[2],b[3]):a.call(c,b[0],b[1],b[2],b[3])}return a.apply(c,b)}},{}],51:[function(a,b,c){b.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},{}],52:[function(a,b,c){var d=a("./_an-object"),e=a("./_ie8-dom-define"),f=a("./_to-primitive"),g=Object.defineProperty;c.f=a("./_descriptors")?Object.defineProperty:function(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(a,b,c){b.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},{}],54:[function(a,b,c){var d,e,f,g=a("./_ctx"),h=a("./_invoke"),i=a("./_html"),j=a("./_dom-create"),k=a("./_global"),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function(a){delete q[a]},"process"==a("./_cof")(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),b.exports={set:m,clear:n}},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(a,b,c){var d=a("./_is-object");b.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":51}],56:[function(a,b,c){var d=a("./_export"),e=a("./_task");d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},{"./_export":44,"./_task":54}],57:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],58:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(e){return p.reject(a,e)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&"object"==typeof a&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(d){c.status="error",c.value=d}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a("immediate"),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype["catch"]=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{immediate:57}],59:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],63:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":62}],64:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],65:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],66:[function(a,b,c){"use strict";function d(){
for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],67:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],69:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],70:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(var T=0;;){T++,z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":62}],72:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],73:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;
for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":62}],74:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});
/*! pdfmake v0.1.36, @license MIT, @link http://pdfmake.org */
//# sourceMappingURL=pdfmake.min.js.map

this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {
  "Roboto-Italic.ttf": "AAEAAAASAQAABAAgR0RFRtRX1FkAAgp8AAACREdQT1NKcuCzAAIMwAAAUiRHU1VCw4aZEQACXuQAABfoT1MvMqCnsO0AAAGoAAAAYGNtYXBAbb9DAAAafAAABoBjdnQgJEEG5QAAI5QAAABMZnBnbWf0XKsAACD8AAABvGdhc3AACAATAAIKcAAAAAxnbHlmoLsktAAALagAAdn2aGRteCEe/AUAABWQAAAE7GhlYWT4gasAAAABLAAAADZoaGVhDKYSegAAAWQAAAAkaG10eHJO1ygAAAIIAAATiGxvY2EXM5zBAAAj4AAACcZtYXhwBxICWwAAAYgAAAAgbmFtZTlLZFAAAgegAAACrnBvc3T/YQBkAAIKUAAAACBwcmVwdKCP7AAAIrgAAADbAAEAAAACAAAcadIiXw889QAbCAAAAAAAxPARLgAAAADQ206M+jj91QlMCHMAAgAJAAIAAAAAAAAAAQAAB2z+DAAACRb6OP52CUwIAAGzAAAAAAAAAAAAAAAABOIAAQAABOIAkAAWAFYABQABAAAAAAAOAAACAAFzAAYAAQADBAsBkAAFAAAFmgUzAAABHwWaBTMAAAPRAGYCAAAAAgAAAAAAAAAAAOAACv9QACF/AAAAIQAAAABHT09HAAEAAP/9BgD+AABmB5oCACAAAZ8AAAAABDoFsAAgACAAAgOWAGQACgAAAAoAAAH2AAAB9gAAAgkAQwKFAMgE0QBSBGYASgW5ALsE3QA6AWQAqgKxAG0Cvf+PA2IAawRwAEwBkP+PAi4AGQIVADUDPf+PBGYAaARmAPkEZgAXBGYANARmAAUEZgByBGYAcARmAJ0EZgBBBGYAlAHrACsBrv+bA/wAQQRMAHAEGAA6A7QApQcCAEQFGv+vBN8AOwUXAHQFIQA7BHMAOwRUADsFUwB5BZIAOwImAEkEUgAKBOcAOwQ3ADsG0AA7BZIAOwVgAHcE7wA7BWAAbwTRADoEpQAnBKsAqAUSAGcE+gCkBuwAwwTn/9QEswCoBK//6wIZ//8DOQC/Ahn/egNIAE8Div+BAnAAzwRDADMEZQAfBBoARgRqAEsEJgBFArwAdARlAAQEUAAfAewALwHk/xQD+QAgAewALwbXAB4EUgAfBHcARQRl/9cEcwBJAqoAHwQKAC4CkwBDBFEAWwPMAG4F3wCAA+P/xAO2/6UD4//tAqoAOAHuACECqv+MBVEAaQHu//EESABSBIz/8wWSABIEvQBTAeb/9wTM/90DSADbBiMAYgOCAMMDrgBZBFYAgQYkAGEDmADjAvAA6AQvACUC4gBcAuIAbgJ5ANUEb//lA9UAewIQAKUB9v/IAuIA3wORAMADrQAPBbkAuQYPALQGEwCeA7b/0wdL/4QELQAoBWAAIASgADgEpwAeBpcAEwSWAFwEeABEBG8AOQSD/+AFeQA1AfUALgRbAC0EOAAiAiIAIwVqADUEbwAkB3AAVAcWAEcB9wAzBWcAUQKu/0kFXgBnBHkAQgVvAGcE1wBaAf7/CQQhAD4DsQEXA3wBJgOZAOMDWgEHAewBDgKiAQECI/+vA7MA3QLvAMICUv/pAAr9agAK/esACv0LAAr99QAK/NsB6vy7AgcBIQP2APMCEQClBFsAQwWD/7EFUQBpBSD/xAR4AAwFkwBEBHj/2gWZAFQFaACGBTMACgRsAEgEo//wA+0AhARvAEMEOQApBA8AggRvACQEdQBzAo0AhQRW/7cD2AA/BKkAYARv/9wENgBOBG8ASgQWAIcERQBnBYIAQQV5AE8GbgBmBIcAUQQrAGcGIgBmBdsAoQVFAHgIWf/MCGwAQwZaALQFkgBCBO4ANAXg/4sHFf+sBKUAJQWSAEMFiP/KBOoAkwYHAFsFtgBBBVoAzgdXAEIHjgBCBe0AiQbAAEUE6AA2BUUAdAb6AEkE+//oBFQARgR5ADADSwAtBLn/jQX7/6UD+wAhBIUALwQ7AC8Ehv/IBcsAMASEAC8EhQAvA8QAYAWqAEwEowAvBEIAewZQAC8GdQAkBNsAVgYQADAEQQAwBDYANAZfADAETP+/BFAAHwQ2AE4Gn//DBrkALwRwAB8EhQAvBtwAbwYGAE8EPwAuBv4ASQXUACwEt/+6BC//ogbfAFoF5wBOBqcAJgW+ACkIyQBIB58ALgQN/84Dx//KBVEAaQRyAEIE7QCtA+4AhAVRAGoEbwBEBtUAdAX/AFIG3ABvBgYATwUUAGYEMABNBOEAQAAK/OgACv0LAAr+FwAK/jsACvo4AAr6TwQ/AC4E/gA6BHD/1wRLADUDfwAkBMAAQwPwACQE7AA2BGYALQZkALsFYwB0B50AOgWSACQH/ABCBskAJAXKAHEEuABfBv8ArAU9AFcFTwDEBFIAmAVQAOwGCgCKBKMABwTsADUEQwAtBZAAQwRvACQFZwBRBI4APASO//wEnf/4Azr/6QTaADEGawAyBrkATAYvAK0FDQBoBDIArwPyAKAHj//fBk3/2gfIADsGeAAjBNoAagQHAEwFiwCaBQMAfQVFAGoDEgDyA/8AAAf0AAAD/wAAB/QAAAKuAAACBAAAAVwAAARmAAACKQAAAZ8AAADVAAAACgAAAi0AGQItABkFIgCnBhkAmQOU/18BlwCuAZcAiQGV/5gBlwDUAsgAtgLPAJUCtv+UBFEAdwR2//YCpwCgA7EAOQU7ADkA+QAaB3kAlwJeAF8CXgACA5H/7wLiAGEDUAB+BIz/8wYuAAoGaAA5CD8AOgc0ACIGBgAfBGYAUQW3AEMEDABJBFwACgUp//IFMP/lBcQAzAO7AEsIBQA1BOUA6gT6AIIGAQC1BqwAkgalAI8GQwC+BHYATQVtACQElf+sBHkAqwSqAEEIBQBNAgb/GgRpADEETABwA/z/1AQZABkD8wBBAkQAeAKFAHAB/v/jBNcAdARWAFgEcgB0BqoAdAaqAHQE0gB0BnIAKQAKAAAH/v+rCDUAXAQKAGIEhQBBAff/DwGP/70DkgETA4wBEgONARED4ADNA/kAzgPfACID2wDSA5IBEQH4APwEbP+lBDkAHQRkAEcEZwAdA9IAHQO4AB0EkgBMBMcAHQHjACoDvP/2BD0AHQOiAB0F3gAdBMcAHQShAEoERQAdBKEARQQzAB0ECgARBBAAbQRkAEUETwB6BfAAlQQ9/7YEFQB0BA3/3ALiAB0C4gBrAuL/6QLi//sC4v/wAuIAFgLiAB4C4gAvAuIACwLiADYDhACTAqoBCwQk/5oEqABLBS0AQwUHAEQD/gAlBR8ARAP6ACUECgASBB0ABgQlADQDnQAdBE//sAShAEoET/+wA3j/0wSzAB0D2//VBUgAUQT6AH4E1gAMBVIAbARkAEcHE//EByEAHQVUAG0EsgAdBEIAHwUH/4kF5/+vBCgAEQTQAB8ENwAeBKb/xAQJAFgFCgAdBFIAWgYqAB0GgwAdBQAAUAXNAB8ENwAfBGMAIAZOAB0Ebv/fA/z/+gYh/68EYQAeBOwAHgUZAGkFoABQBEcAdASO/7YGOgBsBFIAWgRSAB0FoQAvBK8AQQQoABEEoQBKBB3//wPPAB4H7gAdBJH/3QRlAB8EHABDBHoARwRzACQDaACpBHT/1wSDAEYEJgBFBGUANQVhAIEFjACEBXIARAW9AIUFwACFA8IAuwRpADkDnQAdBEH/gQS0/9MC4gCQAuIAYQLiAIkC4gCRAuIAogLiAH4C4gCpBFP/1QQYACsGewBJBJ8APwTkAGQCAP8JAf//CQH2AC4B9v96AfYALgH2//EEOQAdAfYAAAIuABkFPwAvBT8ALwRuAD0EqwCoApP/9AUa/68FGv+vBRr/rwUa/68FGv+vBRr/rwUa/68FFwB0BHMAOwRzADsEcwA7BHMAOwImAEkCJgBJAiYASQImAEkFkgA7BWAAdwVgAHcFYAB3BWAAdwVgAHcFEgBnBRIAZwUSAGcFEgBnBLMAqARDADMEQwAzBEMAMwRDADMEQwAzBEMAMwRDADMEGgBGBCYARQQmAEUEJgBFBCYARQH1AC4B9QAuAfUALgH1AC4EUgAfBHcARQR3AEUEdwBFBHcARQR3AEUEUQBbBFEAWwRRAFsEUQBbA7b/pQO2/6UFGv+vBEMAMwUa/68EQwAzBRr/rwRDADMFFwB0BBoARgUXAHQEGgBGBRcAdAQaAEYFFwB0BBoARgUhADsFAABLBHMAOwQmAEUEcwA7BCYARQRzADsEJgBFBHMAOwQmAEUEcwA7BCYARQVTAHkEZQAEBVMAeQRlAAQFUwB5BGUABAVTAHkEZQAEBZIAOwRQAB8CJgBJAfUAEQImAEkB9QAaAiYASQH1AC4CJv+OAez/cAImAEkGeABJA9AALwRSAAoB/v8JBOcAOwP5ACAENwA7AewALwQ3ADsB7P+jBDcAOwKCAC8ENwA7AsgALwWSADsEUgAfBZIAOwRSAB8FkgA7BFIAHwRSAB8FYAB3BHcARQVgAHcEdwBFBWAAdwR3AEUE0QA6AqoAHwTRADoCqv+fBNEAOgKqAB8EpQAnBAoALgSlACcECgAuBKUAJwQKAC4EpQAnBAoALgSlACcECgAuBKsAqAKTAEMEqwCoApMAQwSrAKgCuwBDBRIAZwRRAFsFEgBnBFEAWwUSAGcEUQBbBRIAZwRRAFsFEgBnBFEAWwUSAGcEUQBbBuwAwwXfAIAEswCoA7b/pQSzAKgEr//rA+P/7QSv/+sD4//tBK//6wPj/+0HS/+EBpcAEwVgACAEbwA5BGf/sARn/7AEEABtBGz/pQRs/6UEbP+lBGz/pQRs/6UEbP+lBGz/pQRkAEcD0gAdA9IAHQPSAB0D0gAdAeMAKgHjACoB4wAqAeMAKgTHAB0EoQBKBKEASgShAEoEoQBKBKEASgRkAEUEZABFBGQARQRkAEUEFQB0BGz/pQRs/6UEbP+lBGQARwRkAEcEZABHBGQARwRnAB0D0gAdA9IAHQPSAB0D0gAdA9IAHQSSAEwEkgBMBJIATASSAEwExwAdAeMADwHjABgB4wAqAeP/egHjACoDvP/2BD0AHQOiAB0DogAdA6IAHQOiAB0ExwAdBMcAHQTHAB0EoQBKBKEASgShAEoEMwAdBDMAHQQzAB0ECgARBAoAEQQKABEECgARBBAAbQQQAG0EEABtBGQARQRkAEUEZABFBGQARQRkAEUEZABFBfAAlQQVAHQEFQB0BA3/3AQN/9wEDf/cBRr/rwTXAGMF9gBxAooAdwV0AGoFF//uBUcAHgKNACAFGv+vBN8AOwRzADsEr//rBZIAOwImAEkE5wA7BtAAOwWSADsFYAB3BO8AOwSrAKgEswCoBOf/1AImAEkEswCoBGwASAQ5ACkEbwAkAo0AhQRFAGcEWwAtBHcARQRv/+UDzABuA+P/xAKNAGcERQBnBHcARQRFAGcGbgBmBHMAOwRbAEMEpQAnAiYASQImAEkEUgAKBQcARATnADsE6gCTBRr/rwTfADsEWwBDBHMAOwWSAEMG0AA7BZIAOwVgAHcFkwBEBO8AOwUXAHQEqwCoBOf/1ARDADMEJgBFBIUALwR3AEUEZf/XBBoARgO2/6UD4//EBCYARQNLAC0ECgAuAewALwH1AC4B5P8UBDsALwO2/6UG7ADDBd8AgAbsAMMF3wCABuwAwwXfAIAEswCoA7b/pQFkAKoChQDIBBIAQwH+/wkBlwCJBtAAOwbXAB4FGv+vBEMAMwRzADsFkgBDBCYARQSFAC8FaACGBXkATwTtAK0D7gCECC0ARQkWAHcEpQAlA/sAIQUXAHQEGgBGBLMAqAPtAIQCJgBJBxX/rAX7/6UCJgBJBRr/rwRDADMFGv+vBEMAMwdL/4QGlwATBHMAOwQmAEUFZwBRBCEAPgQhAD4HFf+sBfv/pQSlACUD+wAhBZIAQwSFAC8FkgBDBIUALwVgAHcEdwBFBVEAaQRyAEIFUQBpBHIAQgVFAHQENgA0BOoAkwO2/6UE6gCTA7b/pQTqAJMDtv+lBVoAzgRCAHsGwABFBhAAMATn/9QD4//EBGoASwWI/8oEhv/IBRr/rwRDADMFGv+vBEMAMwUa/68EQwAzBRr/rwRDADMFGv+vBEMAMwUa/68EQwAzBRr/rwRDADMFGv+vBEMAMwUa/68EQwAzBRr/rwRDADMFGv+vBEMAMwUa/68EQwAzBHMAOwQmAEUEcwA7BCYARQRzADsEJgBFBHMAOwQmAEUEcwA7BCYARQRzADsEJgBFBHMAOwQmAEUEcwA7BCYARQImAEkB9QAuAiYADgHs//EFYAB3BHcARQVgAHcEdwBFBWAAdwR3AEUFYAB3BHcARQVgAHcEdwBFBWAAdwR3AEUFYAB3BHcARQVeAGcEeQBCBV4AZwR5AEIFXgBnBHkAQgVeAGcEeQBCBV4AZwR5AEIFEgBnBFEAWwUSAGcEUQBbBW8AZwTXAFoFbwBnBNcAWgVvAGcE1wBaBW8AZwTXAFoFbwBnBNcAWgSzAKgDtv+lBLMAqAO2/6UEswCoA7b/pQSIAEsEiAAABQcARAQ7AC8FkgA7BIQALwSrAKgDxABgBOf/1APj/8QFWgDOBEIAewVaAM4EQgB7BFsAQwNLAC0HFf+sBfv/pQYKAIoEowAHBFAAHwToACsE6AArBFsAEANL/+YFGwBYBBIAOQWSAEMEhQAvBZIAOwSEAC8G0AA7BcsAMAWI/8oEhv/IBLMAqAPtAF0E5//UA+P/xAQ5ACkEVP/XBhkAmQRmABcEZgA0BGYABQRmAHIEegCUBI4AfAVTAHkEZQAEBZIAOwRSAB8FGv+vBEMAMwRzADsEJgBFAib/3wH1/40FYAB3BHcARQTRADoCqgAfBRIAZwRRAFsEj/+yBN8AOwRlAB8FIQA7BGoASwUhADsEagBLBZIAOwRQAB8E5wA7A/kAIATnADsD+QAgBDcAOwHs//IG0AA7BtcAHgWSADsEUgAfBO8AOwRl/9cE0QA6Aqr/7gSlACcECgAuBKsAqAKTAEME+gCkA8wAbgT6AKQDzABuBuwAwwXfAIAEr//rA+P/7QWm/wwEbP+lBA7/4QUD//0CHwABBKsAHQRR/5sE4AAWBGz/pQQ5AB0D0gAdBA3/3ATHAB0B4wAqBD0AHQXeAB0EoQBKBEUAHQQQAG0EFQB0BD3/tgHjACoEFQB0A9IAHQOdAB0ECgARAeMAKgHjACoDvP/2BD0AHQQJAFgEbP+lBDkAHQOdAB0D0gAdBNAAHwXeAB0ExwAdBKEASgSzAB0ERQAdBGQARwQQAG0EPf+2BCgAEQTHAB0EZABIBBUAdAWhAC8E0AAfBAkAWAVIAFEFGv+vBEMAMwRzADsEJgBFAAAAAQAABOQJCgQAAAICAgMFBQYFAgMDBAUCAgIEBQUFBQUFBQUFBQICBAUFBAgGBQYGBQUGBgIFBgUIBgYGBgUFBQYGCAYFBQIEAgQEAwUFBQUFAwUFAgIEAggFBQUFAwUDBQQHBAQEAwIDBgIFBQYFAgUEBwQEBQcEAwUDAwMFBAICAwQEBgcHBAgFBgUFBwUFBQUGAgUFAgYFCAgCBgMGBQYFAgUEBAQEAgMCBAMDAAAAAAACAgQCBQYGBgUGBQYGBgUFBAUFBQUFAwUEBQUFBQUFBgYHBQUHBwYJCQcGBgcIBQYGBgcGBggJBwgGBggGBQUEBQcEBQUFBwUFBAYFBQcHBQcFBQcFBQUHCAUFCAcFCAcFBQgHBwYKCQUEBgUGBAYFCAcIBwYFBQAAAAAAAAUGBQUEBQQGBQcGCQYJCAcFCAYGBQYHBQYFBgUGBQUFBAUHCAcGBQQJBwkHBQUGBgYDBQkFCQMCAgUCAgEAAgIGBwQCAgICAwMDBQUDBAYBCAMDBAMEBQcHCQgHBQYFBQYGBgQJBgYHCAcHBQYFBQUJAgUFBAUEAwMCBQUFCAgFBwAJCQUFAgIEBAQEBAQEBAIFBQUFBAQFBQIEBQQHBQUFBQUFBQUFBwUFBQMDAwMDAwMDAwMEAwUFBgYEBgQFBQUEBQUFBAUEBgYFBgUICAYFBQYHBQUFBQUGBQcHBgcFBQcFBAcFBgYGBQUHBQUGBQUFBQQJBQUFBQUEBQUFBQYGBgYGBAUEBQUDAwMDAwMDBQUHBQYCAgICAgIFAgIGBgUFAwYGBgYGBgYGBQUFBQICAgIGBgYGBgYGBgYGBQUFBQUFBQUFBQUFBQICAgIFBQUFBQUFBQUFBAQGBQYFBgUGBQYFBgUGBQYGBQUFBQUFBQUFBQYFBgUGBQYFBgUCAgICAgICAgIHBAUCBgQFAgUCBQMFAwYFBgUGBQUGBQYFBgUFAwUDBQMFBQUFBQUFBQUFBQMFAwUDBgUGBQYFBgUGBQYFCAcFBAUFBAUEBQQIBwYFBQUFBQUF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c3dzd3N/c4dzkXObc7Jz0XPvdA50LnQ6dEZ0d3S4dR11QnVOdV51cnZGdmJ2f3aSdqZ273d6eBx4qXi1eXh503pZewR7ZnvpfEd8uH1dfcl+W368fyR/Pn9Yf3J/jH//gCeAYYB9gLKBO4GBgfiCOYJHglWCjoKbgsKC24Lng0qDo4Q3hMKFQ4YXhheHlIfxiCKIgIiviMWJKIl6ibqKLIqFisWLCItIi2KLqIwejHqMx40TjU+Nto4EjiKOWI6cjsSPFo9Uj7OQA5BhkLWRI5FPkYuRvpISkleSi5LIkxuTRpOVlAaUSJSolQiVNZW+liCWN5aBlz6XuZgtmHyYwpkEmUyZzJo4mq+a2psQm4ibuZwHnDqcepzunVCdu54enoyfA597n9KgDaBpoMGhN6G8ofqiS6KUotijE6Nbo5uj5aRApEyknaURpZyl+aZIptCnM6eYp/iooqiuqQGpTamiqeuqZarSqzerq6xHrM6tb63irk+uqK8Tr5yvpLAQsH6w6bFysdWyQLKSsvSzWrOFs9q0BLRdtKG0tbTJtNu077UBtRi1LLWOtba2RLa0tw23FbcdtyW3MLc4t0S3sLewt7i4KLiYuPq5QLmoub+51rntugS6HLovuju6R7peunC6h7qaurG6w7rauu27BLsbuy27RLtbu267hbuXu667wbvTu+q7/LwSvCO8NrxJvFW8Ybx4vIq8oLyzvMm82rzxvQm9Gr0xvUO9Wb1qvX29lL2mvby9z73hvfO+Cr4gvje+Sb62v2S/dr+Iv5q/q7+9v8+/4b/ywATAEMAiwDPARcBXwGnAe8DvwX3Bj8GgwbLBw8HVwefB+cILwhfCKcI7wk/CYcJzwoXCl8KpwrvCxsLRwuPC78L7ww3DH8MrwzfDScNbw2fDc8OIw5TDoMOsw77D0MPcw+jD+sQLxBfEKcQ6xEzEXsRxxITElsSoxLTEwMTSxOPE9cUHxRnFKsU2xULFTsVaxWzFfcWJxZXFocWtxb/Fy8Xdxe7GAMYRxiPGNcZIxlvGbsaBxuLHUcdjx3XHh8eYx6vHvcfPx+HH88gFyBbILchEyFvIcsiVyLjIyMjfyPHJB8kYySvJPslKyVbJbcl/yZDJosm4ycnJ28nuygDKF8opyjvKTcpgynfKicqayq3Kv8rQyuLLSctby2zLfsuQy6HLssvDy9XMT8xg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AdMAAAEHAKEBFwAeAAkAsAcvsBPcMDEA////3AAABA4GIAImAdMAAAEGAJ5VHwAJALAHL7AO3DAxAP///68AAASLBj8CJgAlAAAABgCtBAD//wBjAAAFFQY/ACYAKWQAAAcArf9CAAD//wBxAAAF2wZBACYALGQAAAcArf9QAAL//wB3AAACZQZAACYALWQAAAcArf9WAAH//wBq/+cFIQY/ACYAMxQAAAcArf9JAAD////uAAAFlgY/ACYAPWQAAAcArf7NAAD//wAeAAAE7gY/ACYAuRQAAAcArf9MAAD//wAg//QDGwZ0AiYAwgAAAQcArv8t/+wAHACwAEVYsA4vG7EOGD5ZsBvcsBHQsBsQsCTQMDH///+vAAAEiwWwAgYAJQAA//8AOwAABKAFsAIGACYAAP//ADsAAASxBbACBgApAAD////rAAAEzgWwAgYAPgAA//8AOwAABXcFsAIGACwAAP//AEkAAAIBBbACBgAtAAD//wA7AAAFUAWwAgYALwAA//8AOwAABrcFsAIGADEAAP//ADsAAAV3BbACBgAyAAD//wB3/+cFDQXIAgYAMwAA//8AOwAABPMFsAIGADQAAP//AKgAAAUJBbACBgA4AAD//wCoAAAFMgWwAgYAPQAA////1AAABSsFsAIGADwAAP//AEkAAAMKBwkCJgAtAAABBwBq/7gBQgAMALACL7AZ3LAE0DAx//8AqAAABTIG/QImAD0AAAEHAGoA/QE2AAwAsAEvsB7csAnQMDH//wBI/+cEMgY6AiYAugAAAQcArQFo//sACQCwFS+wKNwwMQD//wAp/+cD5QY5AiYAvgAAAQcArQEh//oACQCwGi+wK9wwMQD//wAk/mED8wY6AiYAwAAAAQcArQE7//sACQCwAy+wFdwwMQD//wCF//QCZQYlAiYAwgAAAQYArSTmAAkAsAAvsBHcMDEA//8AZ//lBAoGdAImAMoAAAEGAK4c7AASALALL7Ar3LAW0LArELAa0DAx//8ALQAABFcEOgIGAI0AAP//AEX/6AQfBFICBgBTAAD////l/mAEJQQ6AgYAdgAA//8AbgAAA+0EOgIGAFoAAP///8QAAAP0BDoCBgBcAAD//wBn//QC3gWzAiYAwgAAAQYAaozsAAwAsAAvsCTcsA/QMDH//wBn/+UD+gWzAiYAygAAAQYAanvs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3LAi0DAx//8Ak//mBUAG+gImAN0AAAEHAHAA7AFKAAkAsAEvsBHcMDEA////pf5FA+wFuAImAF0AAAEGAHAvCAAJALABL7AQ3DAxAP//AJP/5gVABwkCJgDdAAABBwBqARsBQgAMALABL7Am3LAR0DAx////pf5FA+wFxwImAF0AAAEGAGpeAAAMALABL7Al3LAQ0DAx//8Ak//mBUAHQQImAN0AAAEHAKUBXQFCABYAsABFWLABLxuxARw+WbAT3LAX0DAx////pf5FBF4F/wImAF0AAAEHAKUAoAAAABYAsABFWLABLxuxARg+WbAS3LAW0DAx//8AzgAABUQHCQImAOAAAAEHAGoBRAFCABYAsABFWLASLxuxEhw+WbAo3LAc0DAx//8AewAABAAFswImAPgAAAEGAGpp7AAMALAIL7Ao3LAT0DAx//8ARQAABpYHCQAmAOUPAAAnAC0ElQAAAQcAagIIAUIAFgCwAEVYsAovG7EKHD5ZsCHcsC3QMDH//wAwAAAFqQWzACYA/QAAACcAjAQKAAABBwBqAWr/7AAWALAARViwCi8bsQoYPlmwIdywLdAwMf///9T+RQUrBbACJgA8AAAABwGvA5UAAP///8T+RQP0BDoCJgBcAAAABwGvAqoAAP//AEv/6AR1BgACBgBIAAD////K/kUFZQWwAiYA3AAAAAcBrwQkAAD////I/kUESgQ6AiYA8QAAAAcBrwM7AAD///+v/p8EiwWwAiYAJQAAAAcArATcAAD//wAz/p8DzwRRAiYARQAAAAcArAQpAAD///+vAAAEiwe5AiYAJQAAAQcAqgUBAUYACQCwBC+wGNwwMQD//wAz/+gDzwaDAiYARQAAAQcAqgRzABAACQCwGC+wOdwwMQD///+vAAAF7QfDAiYAJQAAAQcBtwDyAS4AFgCwAEVYsAUvG7EFHD5ZsA7csBTQMDH//wAz/+gFXwaOAiYARQAAAQYBt2T5ABYAsABFWLAYLxuxGBg+WbAv3LA10DAx////rwAABIsHvwImACUAAAEHAbYA+AE9ABYAsABFWLAFLxuxBRw+WbAM3LAT0DAx//8AM//oA/0GiQImAEUAAAEGAbZqBwAWALAARViwGC8bsRgYPlmwL9ywNNAwMf///68AAAVsB+oCJgAlAAABBwG1APMBGwAWALAARViwBS8bsQUc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ALAARViwBC8bsQQcPlmwDNywENAwMf//ADP/6APPBesCJgBFAAABBwCrA/L//QAWALAARViwGC8bsRgYPlmwLdywMdAwMf//ADsAAASxBywCJgApAAABBwCrBE4BPgAWALAARViwBi8bsQYcPlmwDdywEdAwMf//AEX/6gPgBesCJgBJAAABBwCrA9f//QAWALAARViwCC8bsQgYPlmwIdywJdAwMf///98AAAKKBywCJgAtAAABBwCrAwQBPgAWALAARViwAi8bsQIcPlmwBdywCdAwMf///40AAAI4BekCJgCMAAABBwCrArL/+wAWALAARViwAi8bsQIYPlmwBdywCdAwMf//AHf/5wUNByICJgAzAAABBwCrBKEBNAAWALAARViwCi8bsQocPlmwJNywKNAwMf//AEX/6AQfBesCJgBTAAABBwCrA+D//QAWALAARViwAC8bsQAYPlmwJNywKNAwMf//ADoAAATCByACJgA2AAABBwCrBEMBMgAWALAARViwBC8bsQQcPlmwGdywHdAwMf//AB8AAALUBesCJgBWAAABBwCrA0n//QAWALAARViwCi8bsQoYPlmwEtywDdAwMf//AGf/5wUgByACJgA5AAABBwCrBHsBMgAWALAARViwCi8bsQocPlmwFNywGNAwMf//AFv/6AQeBesCJgBZAAABBwCrA+T//QAWALAARViwBy8bsQcYPlmwFdywGdAwMf///7IAAAU8Bj8AJgDPZAAABwCt/pEAAP//ADv+qQSgBbACJgAmAAAABwCsBJgACv//AB/+lgP+BgACJgBGAAAABwCsBIb/9///ADv+qQTVBbACJgAoAAAABwCsBJcACv//AEv+nwR1BgACJgBIAAAABwCsBJkAAP//ADv+CQTVBbACJgAoAAAABwGiAR/+qv//AEv9/wR1BgACJgBIAAAABwGiASH+oP//ADv+qQV3BbACJgAsAAAABwCsBPoACv//AB/+qQPjBgACJgBMAAAABwCsBH8ACv//ADsAAAVQBy4CJgAvAAABBwB1AbABMAATALAARViwBS8bsQUcPlmwDtwwMQD//wAgAAAEIgc/AiYATwAAAQcAdQF9AUEACQCwBS+wD9wwMQD//wA7/vgFUAWwAiYALwAAAAcArATSAFn//wAg/uUEGgYAAiYATwAAAAcArARQAEb//wA7/qkDsQWwAiYAMAAAAAcArASdAAr////y/qkB7gYAAiYAUAAAAAcArAM3AAr//wA7/qkGtwWwAiYAMQAAAAcArAWnAAr//wAe/qkGagRSAiYAUQAAAAcArAWrAAr//wA7/qkFdwWwAiYAMgAAAAcArAT+AAr//wAf/qkD4wRSAiYAUgAAAAcArARmAAr//wA7AAAE8wdAAiYANAAAAQcAdQG0AUIAEwCwAEVYsAMvG7EDHD5ZsBbcMDEA////1/5gBDYF9QImAFQAAAEHAHUBkf/3ABMAsABFWLANLxuxDRg+WbAh3DAxAP//ADr+qQTCBbACJgA2AAAABwCsBJUACv///+7+qQLUBFQCJgBWAAAABwCsAzMACv//ACf+nwSjBccCJgA3AAAABwCsBKQAAP//AC7+lwO2BFACJgBXAAAABwCsBG3/+P//AKj+nwUJBbACJgA4AAAABwCsBJYAAP//AEP+nwKUBUACJgBYAAAABwCsA/oAAP//AKQAAAVhBy0CJgA6AAABBwCkAOEBRgATALAARViwAS8bsQEcPlmwCtwwMQD//wBuAAAD7QXiAiYAWgAAAQYApBv7ABMAsABFWLABLxuxARg+WbAK3DAxAP//AKT+qQVhBbACJgA6AAAABwCsBMoACv//AG7+qQPtBDoCJgBaAAAABwCsBDgACv//AMP+qQdBBbACJgA7AAAABwCsBc0ACv//AID+qQX+BDoCJgBbAAAABwCsBSwACv///+v+qQTOBbACJgA+AAAABwCsBJgACv///+3+qQPOBDoCJgBeAAAABwCsBEIACv///wz/5wVTBdYAJgAzRgAABwFa/hoAAP///6UAAAPjBRwCJgG6AAAABwCt/6v+3f///+EAAAQrBR8AJgG+PAAABwCt/sD+4P////0AAATWBRwAJgHBPAAABwCt/tz+3f//AAEAAAHmBR4AJgHCPAAABwCt/uD+3///AB3/6gRYBRwAJgHICgAABwCt/vz+3f///5sAAAShBRwAJgHSPAAABwCt/nr+3f//ABYAAAR0BRsAJgHzCgAABwCt/xT+3P///6UAAAPjBI0CBgG6AAD//wAdAAAD5wSNAgYBuwAA//8AHQAAA+8EjQIGAb4AAP///9wAAAQOBI0CBgHTAAD//wAdAAAEmgSNAgYBwQAA//8AKgAAAaoEjQIGAcIAAP//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DAAGiA7uDu4MRg6gCiIO7g7uD5oKigaSDGYMRgrYCqwNUg8QCl4L4gsQDBYGmA22DbYNtgwgCxAKUAxMDbAMTAsQBqYN5gtwD5oLcAasBrIGvAbCBsgMTAbOBtgNtgb+BxQHKgcwB0YHTAdSB4QHigeQDcANwAe+Du4H4AgCDVIIMA7uDu4LJg7uDu4IRg3ADcAIeAiCCIwIpg1ICLgNsAjSCOgLEAkyCUwJaAloCxAJYgloCWgJaAtwDCAK2AxMCxAN5g1IDqAOoA1ICtIK0grSCtIK0gmKCbAJugnECeIJ9AoGChgK/g+aD5oPmg+aDGYLcAtwC3ALcAtwC3ALcAr+DAAMAAwADAAO7g7uDu4O7g7uD5oPmg+aD5oPmgxGDEYMRgxGDxAL4gviC+IL4gviC+IL4gwWDBYMFgwWDbYMIAwgDCAMIAwgDEwMTAtwC+ILcAviC3AL4gr+Cv4K/gr+D5oMAAwWDAAMFgwADBYMAAwWDAAMFg7uDbYO7g7uDu4O7g7uDEYOoAoiCiIKIgoiDu4Ntg7uDbYO7g22DbYPmgwgD5oMIA+aDCAKUApQClAMZgxmDGYMRgxGDEYMRgxGDEYKrA8QDEwPEApeCl4KXgtwDAAO7g7uD5oPEAtwCoAMAApeDu4O7g6gDu4O7g+aCooMZg8QDVIO7g8QDbYMIAxMDCAMAA3mDu4O7gxGDqAOoAsmC3AKgA3mDAAO7g7uD5oKigr+DGYNUgviDBYMIAsQDEwNsAwWDUgMTAqsCqwKrA8QDEwK0grSCtIO7g22C3AL4gwADBYK2AxMCv4PEAxMDu4NUg2wDu4LcAviC3AL4gwADBYMFgwWDVINsA+aDCAMIAsQCyYMTAsmDEwLJgxMDVINsAtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gtwC+ILcAviC3AL4gwADBYMAAwWDAAMFgwADBYMAAwWDAAMFgwADBYMAAwWDu4O7g+aDCAPmgwgD5oMIA+aDCAPmgwgD5oMIA+aDCAMIAxGDEYPEAxMDxAMTA8QDEwOoA7uDGYNUg2wDeYNSA1SDbANtg3ADeYOoA7uDu4PEA+aAAIAhwAGAAYAAAALAAsAAQATABMAAgAlACoAAwAsADUACQA4AD4AEwBFAEYAGgBJAEoAHABMAEwAHgBRAFQAHwBWAFYAIwBaAFoAJABcAF0AJQCKAIoAJwCcAJwAKACwALQAKQC2ALgALgC6ALoAMQC8AL0AMgC/AMAANADCAMQANgDGAMsAOQDRANEAPwDTAN0AQADfAN8ASwDhAOMATADlAOcATwDpAO0AUgDwAPAAVwD1APcAWAD6APsAWwD9AP8AXQEDAQQAYAEJAQkAYgEMAQwAYwEXARkAZAErAS0AZwEwATAAagEyATIAawFJAUkAbAFsAW0AbQFvAXEAbwG6AboAcgG9Ab0AcwHEAcUAdAHIAcgAdgHKAcsAdwHNAc0AeQIoAigAegIqAisAewJHAkgAfQJKAkoAfwJMAm0AgAJvAnIAogJ3AnwApgKBAokArAKLAosAtQKNAo0AtgKPAo8AtwKRApEAuAKTApwAuQKlAqcAwwKpAqkAxgKrAqsAxwKtAq0AyAKvAq8AyQKyArIAygK0ArQAywK2ArYAzAK4ArgAzQK6AroAzgK8ArwAzwK+AsoA0ALMAswA3QLOAs4A3gLQAtAA3wLbAtsA4ALdAt0A4QLfAt8A4gLhAuEA4wLjAuMA5ALlAuUA5QLnAucA5gLpAukA5wLrAusA6ALtAu0A6QLvAvIA6gL0AvQA7gL2AvYA7wNTA1gA8ANbA2oA9gNtA20BBgNxA3EBBwNzA3MBCAN3A3cBCQN6A3sBCgN9A4YBDAOIA4oBFgOMA5EBGQOTA5QBHwOWA5kBIQOfA6ABJQOiA6IBJwOkA6QBKAOmA6kBKQOsA7EBLQOzA7MBMwO3A7gBNAO9A70BNgO/A8gBNwPLA8wBQQPOA9EBQwPYA9kBRwPdA90BSQPfA+UBSgPqA+sBUQPvBBcBUwQZBBkBfAQbBCgBfQQwBDABiwQzBDMBjAQ1BDUBjQRBBEYBjgRJBEkBlARLBEsBlQRNBE0BlgRPBFABlwRVBFgBmQRbBFsBnQRdBF4BngRgBGABoARkBGQBoQRmBGYBogRqBGoBowSqBKoBpAABABP/IAACAFb/5gG6/8AAAQG6AA4AAwANABQAQQASAGEAEwABAPX/9QABAMMADQACALf/wgDDABAAAQDD/+IAAQDG//IAAQDDAA4AAgDJ/+0A9f/AAAkAvv/mAMH/6wDC/+kAxP/wAMX/5wDJ/+MAy//OAMz/1ADN/9sABQDB/+wAwwAPAMX/6gDJ/8QAy//nAAUASv/pAMH/7gDD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Aor/6wKM/+sCjv/rApD/6wKS/+sClP/rApb/6wKY/+sCmv/rApz/6wKe/+sCoP/rAqL/6wKk/+sCsv74Asb/6wLI/+sCyv/rAtsAFALdABQC3wAUAuL/6gLk/+oC5v/qAuj/6gLq/+oC7P/qAvD/6ANT/1YDW/9WA2v/6wNv/+oDcf/rA3P/6AN2/+oDd//rA3j/6gN//vgDg/9WA44AFAOQ/94Dkf/rA5P/6wOV/+sDlv/oA5j/6wOf/+gDp//oA6//VgOw/94Ds//rA7j/6AO5/+sDvv/rA8D/6APF/1YDxv/eA8f/VgPI/94DzP/rA87/6wPP/+sD2f/rA9v/6wPd/+sD4f/oA+P/6APl/+gD7P/rA+//VgPw/94D8f9WA/L/3gPz/1YD9P/eA/X/VgP2/94D9/9WA/j/3gP5/1YD+v/eA/v/VgP8/94D/f9WA/7/3gP//1YEAP/eBAH/VgQC/94EA/9WBAT/3gQF/1YEBv/eBAj/6wQK/+sEDP/rBA7/6wQQ/+sEEv/rBBT/6wQW/+sEHP/rBB7/6wQg/+sEIv/rBCT/6wQm/+sEKP/rBCr/6wQs/+sELv/rBDD/6wQy/+sENP/qBDb/6gQ4/+oEOv/qBDz/6gQ+/+oEQP/qBEL/6ARE/+gERv/oBE0AFAAfADj/1QA6/+QAO//sAD3/3QDR/9UA1f/VARj/5AEy/9UBOv/VAmb/3QLb/9UC3f/VAt//1QLt/+wC7//dAvH/3QNY/90DZ//dA2r/3QOO/9UDoP/sA6L/7AOk/+wDpv/dA7f/5AO//90EQf/dBEP/3QRF/90ETf/VBGr/3QAaADj/sAA6/+0APf/QANH/sADV/7ABGP/tATL/sAE6/7ACZv/QAtv/sALd/7AC3/+wAu//0ALx/9ADWP/QA2f/0ANq/9ADjv+wA6b/0AO3/+0Dv//QBEH/0ARD/9AERf/QBE3/sARq/9AAEAAu/+4AOf/uAmL/7gJj/+4CZP/uAmX/7gKy/+4C4f/uAuP/7gLl/+4C5//uAun/7gLr/+4Df//uBDP/7gQ1/+4ARwAGABAACwAQAEf/6ABI/+gASf/oAEv/6ABV/+gAk//oAJj/6AC6/+gAx//oAMj/6AD2/+gBAv/oAR3/6AEh/+gBOf/oAUv/6AFM/+gBVv/oAWwAEAFtABABbwAQAXAAEAFxABACbv/o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/90AWv/hAF3/4QCT/9wAmP/cAJr/3QC6/9wAvP/hAMD/8wDH/9wAyP/cAMr/3QDr//MA7//zAPD/8wDy//MA8//zAPT/8wD2/9wA9//zAPn/8wD6//MA/f/zAP//8wEC/9wBBP/zARf/1gEZ/+EBHf/cASH/3AE1//MBOf/cAUT/8wFJ//MBS//cAUz/3AFW/9wCbv/cAm//3AJw/9wCcf/cAnL/3AJ3//MCeP/WAnn/1gJ6/9YCe//WAnz/1gJ9/90Cfv/dAn//3QKA/90Cgf/hAoL/4QKK/9wCjP/cAo7/3AKQ/9wCkv/cApT/3AKW/9wCmP/cApr/3AKc/9wCnv/cAqD/3AKi/9wCpP/cAr//8wLB//MCw//zAsT/8wLG/9YCyP/WAsr/1gLi/90C5P/dAub/3QLo/90C6v/dAuz/3QLw/+EDa//cA23/8wNv/90Dcf/WA3P/4QN2/90Dd//WA3j/3QOR/9wDkv/zA5P/1gOU//MDlf/cA5b/4QOY/9wDmf/zA57/8wOf/+EDp//hA67/8wOz/9wDtP/zA7j/4QO5/9wDvv/cA8D/4QPM/9wDzv/cA8//3APV//MD1//zA9n/1gPb/9wD3f/WA+H/4QPj/+ED5f/hA+n/8wPs/9wECP/cBAr/3AQM/9wEDv/cBBD/3AQS/9wEFP/cBBb/3AQc/9YEHv/WBCD/1gQi/9YEJP/WBCb/1gQo/9YEKv/cBCz/3AQu/9wEMP/WBDL/3AQ0/90ENv/dBDj/3QQ6/90EPP/dBD7/3QRA/90EQv/hBET/4QRG/+EESv/zBEz/8wRW//MEY//zBGX/8wRn//MAcQAG/9oAC//aAEf/8ABI//AASf/wAEv/8ABV//AAWf/vAFr/3ABd/9wAk//wAJj/8ACa/+8Auv/wALz/3ADH//AAyP/wAMr/7wD2//ABAv/wARn/3AEd//ABIf/wATn/8AFL//ABTP/wAVb/8AFs/9oBbf/aAW//2gFw/9oBcf/aAm7/8AJv//ACcP/wAnH/8AJy//ACff/vAn7/7wJ//+8CgP/vAoH/3AKC/9wCiv/wAoz/8AKO//ACkP/wApL/8AKU//AClv/wApj/8AKa//ACnP/wAp7/8AKg//ACov/wAqT/8ALi/+8C5P/vAub/7wLo/+8C6v/vAuz/7wLw/9wDa//wA2//7wNz/9wDdv/v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//UA1f/xANn/9ADc//UA3f/zARj/9AEy//EBOv/xAVH/9QJm//AC2//xAt3/8QLf//EC7//wAvH/8ANY//ADZ//wA2j/9ANq//ADgv/zA47/8QOP//QDpv/wA7f/9AO///ADwv/0A9D/9APg//MD4v/zA+T/8wPq//QD7f/1BEH/8ARD//AERf/wBE3/8QRP//QEV//0BGj/9QRq//AAWQAlAA8AOP/mADr/5gA8AA4APf/mALEADwCzAA8A0f/mANMADgDV/+YA2QAOANwADgDdAAsA4P/lAPEADwD4/+gBAwAPAQwADwEY/+YBMv/mATr/5gFRAA4CTAAPAk0ADwJOAA8CTwAPAlAADwJRAA8CUgAPAmb/5gKDAA8ChQAPAocADwLb/+YC3f/mAt//5gLv/+YC8f/mA1MADwNY/+YDWwAPA2f/5gNoAA4Dav/mA4IACwODAA8Djv/mA48ADgOm/+YDrwAPA7f/5gO//+YDwgAOA8UADwPHAA8D0AAOA+AACwPiAAsD5AALA+b/5QPn/+gD6gAOA+0ADgPuAA8D7wAPA/EADwPzAA8D9QAPA/cADwP5AA8D+wAPA/0ADwP/AA8EAQAPBAMADwQFAA8EQf/mBEP/5gRF/+YETf/mBE8ADgRR/+UEUv/oBFP/5QRU/+gEVwAOBGgADgRpAA8Eav/mAC4AOP/jADz/5QA9/+QA0f/jANP/5QDV/+MA2f/lANz/5QDd/+kA8f/qAQP/6gEy/+MBOv/jAVH/5QJm/+QC2//jAt3/4wLf/+MC7//kAvH/5ANY/+QDZ//kA2j/5QNq/+QDgv/pA47/4wOP/+UDpv/kA7//5APC/+UD0P/lA+D/6QPi/+kD5P/pA+r/5QPt/+UD7v/qBEH/5ARD/+QERf/kBE3/4wRP/+UEV//lBGj/5QRp/+oEav/kACEAOP/iADz/5ADR/+IA0//kANX/4gDZ/+QA3P/kAN3/6QDx/+sBA//rATL/4gE6/+IBUf/kAtv/4gLd/+IC3//iA2j/5AOC/+kDjv/iA4//5APC/+QD0P/kA+D/6QPi/+kD5P/pA+r/5APt/+QD7v/rBE3/4gRP/+QEV//kBGj/5ARp/+sAFwA4/+sAPf/zANH/6wDV/+sBMv/rATr/6wJm//MC2//rAt3/6wLf/+sC7//zAvH/8wNY//MDZ//zA2r/8wOO/+sDpv/zA7//8wRB//MEQ//zBEX/8wRN/+sEav/zADAAUf/vAFL/7wBU/+8AXP/wAMD/7wDr/+8A7f/wAO//7wDw/+8A8v/vAPP/7wD0/+8A9//vAPn/7wD6/+8A/f/vAP//7wEE/+8BNf/vAUT/7wFJ/+8Cd//vAr//7wLB/+8Cw//vAsT/7wNt/+8Dkv/vA5T/7wOX//ADmf/vA57/7wOu/+8DtP/vA8P/8APR//AD1f/vA9f/7wPp/+8D6//wBEr/7wRM/+8EUP/wBFb/7wRY//AEY//vBGX/7wRn/+8AHQAG//IAC//yAFr/9QBd//UAvP/1ARn/9QFs//IBbf/yAW//8gFw//IBcf/yAoH/9QKC//UC8P/1A3P/9QOW//UDn//1A6f/9QOo//IDqf/yA6z/8gO4//UDwP/1A+H/9QPj//UD5f/1BEL/9QRE//UERv/1AAQA+P/tA+f/7QRS/+0EVP/tAFQAR//wAEj/8ABJ//AAS//wAFP/6wBV//AAk//wAJj/8AC6//AAx//wAMj/8AD2//ABAv/wARf/6wEd//ABIf/wATn/8AFL//ABTP/wAVb/8AJu//ACb//wAnD/8AJx//ACcv/wAnj/6wJ5/+sCev/rAnv/6wJ8/+sCiv/wAoz/8AKO//ACkP/wApL/8AKU//AClv/wApj/8AKa//ACnP/wAp7/8AKg//ACov/wAqT/8ALG/+sCyP/rAsr/6wNr//ADcf/rA3f/6wOR//ADk//rA5X/8AOY//ADs//wA7n/8AO+//ADzP/wA87/8APP//AD2f/rA9v/8APd/+sD7P/wBAj/8AQK//AEDP/wBA7/8AQQ//AEEv/wBBT/8AQW//AEHP/rBB7/6wQg/+sEIv/rBCT/6wQm/+sEKP/rBCr/8AQs//AELv/wBDD/6wQy//AAjwAGAA0ACwANAEX/8ABH/7AASP+wAEn/sABL/7AAU//WAFX/sABaAAsAXQALAJP/sACY/7AAuv+wALwACwDI/7AA8f+vAPb/sAEC/7ABA/+vARf/1gEZAAsBHf+wASH/sAE5/7ABS/+wAUz/sAFW/7ABbAANAW0ADQFvAA0BcAANAXEADQJn//ACaP/wAmn/8AJq//ACa//wAmz/8AJt//ACbv+wAm//sAJw/7ACcf+wAnL/sAJ4/9YCef/WAnr/1gJ7/9YCfP/WAoEACwKCAAsChP/wAob/8AKI//ACiv+wAoz/sAKO/7ACkP+wApL/sAKU/7AClv+wApj/sAKa/7ACnP+wAp7/sAKg/7ACov+wAqT/sALG/9YCyP/WAsr/1gLwAAsDa/+wA3H/1gNzAAsDd//WA5D/8AOR/7ADk//WA5X/sAOWAAsDmP+wA58ACwOnAAsDqAANA6kADQOsAA0DsP/wA7P/sAO4AAsDuf+wA77/sAPAAAsDxv/wA8j/8APM/7ADzv+wA8//sAPZ/9YD2/+wA93/1gPhAAsD4wALA+UACwPs/7AD7v+vA/D/8APy//AD9P/wA/b/8AP4//AD+v/wA/z/8AP+//AEAP/wBAL/8AQE//AEBv/wBAj/sAQK/7AEDP+wBA7/sAQQ/7AEEv+wBBT/sAQW/7AEHP/WBB7/1gQg/9YEIv/WBCT/1gQm/9YEKP/WBCr/sAQs/7AELv+wBDD/1gQy/7AEQgALBEQACwRGAAsEaf+vAAgA8QAQAPj/8AEDABAD5//wA+4AEARS//AEVP/wBGkAEABFAEcADABIAAwASQAMAEsADABVAAwAkwAMAJgADAC6AAwAxwAMAMgADADxABgA9gAMAPj/9wECAAwBAwAYAR0ADAEhAAwBOQAMAUsADAFMAAwBVgAMAm4ADAJvAAwCcAAMAnEADAJyAAwCigAMAowADAKOAAwCkAAMApIADAKUAAwClgAMApgADAKaAAwCnAAMAp4ADAKgAAwCogAMAqQADANrAAwDkQAMA5UADAOYAAwDswAMA7kADAO+AAwDzAAMA84ADAPPAAwD2wAMA+f/9wPsAAwD7gAYBAgADAQKAAwEDAAMBA4ADAQQAAwEEgAMBBQADAQWAAwEKgAMBCwADAQuAAwEMgAMBFL/9wRU//cEaQAYAB8AWv/0AFz/8ABd//QAvP/0AO3/8ADx//MBA//zARn/9AKB//QCgv/0AvD/9ANz//QDlv/0A5f/8AOf//QDp//0A7j/9APA//QDw//wA9H/8APh//QD4//0A+X/9APr//AD7v/zBEL/9ARE//QERv/0BFD/8ARY//AEaf/zAAoABv/WAAv/1gFs/9YBbf/WAW//1gFw/9YBcf/WA6j/1gOp/9YDrP/WAAoABv/1AAv/9QFs//UBbf/1AW//9QFw//UBcf/1A6j/9QOp//UDrP/1ACEATAAgAE8AIABQACAAU/+AAFf/kAEX/4ACeP+AAnn/gAJ6/4ACe/+AAnz/gALG/4ACyP+AAsr/gALS/5AC1P+QAtb/kALY/5AC2v+QA3H/gAN3/4ADk/+AA5r/kAPZ/4AD3f+ABBz/gAQe/4AEIP+ABCL/gAQk/4AEJv+ABCj/gAQw/4AAAgeKAAQAAApeEb4AIQAdAAAAEf/O/48AEv/1/+//iP/0/7v/f//1AAz/qf+i/8kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+UAAAAA/+j/yQAA//MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAD/5QARAAAAAAAAAAAAAP/jAAAAAAAA/+T/5AAAABIAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4QAAAAAAAAAAAAAAAAAAAAD/5QAAAAD/6v/VAAAAAP/r/+r/mv/pAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+YAAAAAAAAAAAAA/+0AAAAU/+8AAAAAAAAAAAAAAAAAAAAAAAD/7QAAAAAAAAAAAAAAAAAAAAD/y/+4/3z/fv/kAAAAAP+dAA8AEP+h/8QAEAAQAAAAAP+xAAD/JgAA/53/s/8Y/5P/8P+P/4z/EAAA/5L/cv8M/w//vQAAAAD/RAAFAAf/S/+GAAcABwAAAAD/PgAA/noAAP9E/2r+Yv8z/9H/LP8nAAAAAAAAAAAAAP/YAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAP/Y/6MAAP/hAAAAAP/lAAAAAP/pAAAAAAAAAAAAAAAAAAAAAAAA/+YAAP/A/+kAAAAAAAAAAAAAAAD/ewAAAAD/v//K/rAAAP9x/u3/1AAA/1H/EQAAAAAAEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/JAA8AAP/ZAAAAAAAA//MAAAAAAAAAAAAAAAAAAAAA/3b/4f68/+b/8wAAAAAAAAAA//UAAP84AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9QAAAAD/8wAAAAD/0gAAAAD/5AAAAAAAAAAAAAD/tQAA/x8AAP/UAAD/2wAAAAD/0gAAAAAAAAAR/+H/0QAR/+cAAAAA/+sAAAAA/+sAAAAOAAAAAAAAAAAAAAAAAAD/5gAA/9IAAAAAAAAAAAAAAAAAAP/sAAAAAP/j/6AAAP+/ABEAEf/Z/+IAEgASAAAAAP+iAA3/LQAA/7//6f/M/9j/8P+3/8b/oAAAAAAAAAAAAAAAAAAAAAD/4QAAAA7/7QAAAAAAAAAAAAD/1QAA/4UAAP/hAAD/xAAAAAD/3wAAAAAAAAAA/+UAAAAA/+YAAAAA/+sAAAAA/+0AAAAAAAAAAAAAAA0AAAAAAAD/6wAAAAAAAAAAAAAAAAAAAAD/ygAA/+n/u//pAAAAAP+9AAAAEgAAAAAAAAASAAAAAP+lAAD+bQAA/70AAP+J/5oAAP+R/9IAAAAAAAD/8QAAAAAAAAAA/70AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/1AAD/8gAAAAD/4wAAAAAAAAAA//EAAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAAAAAAAAAD/8wAAAAAAAAAA//IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAAD/8AAAAAD/eAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAD/6wAAAAAAAAAAAAAAAAAAAAAAAAAA/9cAAAAAAA//8QAAAAAAAAAAAAAAAAAAAAAAAAAA/5UAAP/zAAAAAAAAAAD/8QAAAAAAAAAAABIAAAAAAAAAAAAQ/+wAAAAAAAAAAAAAAAAAAAAAAAAAAP+FAAD/7QAAAAAAAAAA/9gAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+V/8MAAAAAAAAAAAAAAAAAAAAA/4gAAAAAAAD/xQAAAAD/7AAA/87/sAAAAAAAAAAAAAAAAAAAAAD/VgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//UAAAAAAAAAAAAA/8AAAAAA/vUAAAAA/8j/rf/n/+sAAP/wAAAAAAAA/8kAAAAAAAAAAAAAAAAAAAAA/93/2QAAAAAAAP95AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/1AAAAAAAAAAAAAAAAAAIAeAAGAAYAAAALAAsAAQAQABAAAgASABIAAwAlACkABAAsADQACQA4AD4AEgBFAEcAGQBJAEkAHABMAEwAHQBRAFQAHgBWAFYAIgBaAFoAIwBcAF4AJACKAIoAJwCwALMAKAC8ALwALADAAMAALQDGAMYALgDTANQALwDWANYAMQDZANkAMgDbAN0AMwDfAN8ANgDhAOEANwDjAOMAOADlAOUAOQDrAOsAOgDtAO0AOwD2APYAPAD7APsAPQD9AP4APgEDAQQAQAEJAQkAQgEMAQwAQwEXARkARAErAS0ARwEwATAASgEyATIASwFJAUkATAFsAXIATQF2AXcAVAIoAigAVgIqAisAVwJHAkgAWQJKAkoAWwJMAnIAXAJ3AnwAgwKBApEAiQKTApwAmgKlAqcApAKpAqkApwKrAqsAqAKtAq0AqQKvAq8AqgKyArIAqwK0ArQArAK2ArYArQK4ArgArgK6AroArwK8ArwAsAK+AsoAsQLMAswAvgLOAs4AvwLQAtAAwALbAtsAwQLdAt0AwgLfAt8AwwLhAuEAxALjAuMAxQLlAuUAxgLnAucAxwLpAukAyALrAusAyQLtAu0AygLvAvcAywNTA1gA1ANbA2oA2gNtA20A6gNxA3EA6wNzA3MA7AN3A3cA7QN6A3sA7gN9A4YA8AOIA4oA+gOMA5EA/QOTA5kBAwOfA6ABCgOiA6IBDAOkA6QBDQOmA6kBDgOsA7EBEgOzA7MBGAO3A7gBGQO9A8gBGwPLA8wBJwPOA9EBKQPYA9kBLQPdA90BLwPfA+UBMAPqA+sBNwPvBBcBOQQZBBkBYgQbBCgBYwQwBDABcQQzBDMBcgQ1BDUBcwRBBEYBdARJBEkBegRLBEsBewRNBE0BfARPBFABfQRVBFgBfwRbBFsBgwRdBF4BhARgBGABhgRkBGQBhwRmBGYBiARqBGoBiQSqBKoBigACAToABgAGAB0ACwALAB0AEAAQAB4AEgASAB4AJgAmAAEAJwAnAAQAKAAoAAMAKQApAAUALAAtAAIALgAuAAwALwAvAAkAMAAwAAoAMQAyAAIAMwAzAAMANAA0AAsAOAA4AAYAOQA5AAwAOgA6AA0AOwA7ABAAPAA8AA4APQA9AA8APgA+ABEARQBFABMARgBGABUARwBHABQASQBJABYATABMABcAUQBSABcAUwBTABgAVABUABUAVgBWABoAWgBaABkAXABcABsAXQBdABkAXgBeABwAigCKABUAsACwAAcAsgCyAAMAvAC8ABkAwADAABcAxgDGABUA0wDUAB8A1gDWAAIA2QDZAA4A2wDcAAIA3QDdABIA3wDfAAIA4QDhAAIA4wDjAB8A5QDlAB8A6wDrAAgA7QDtABsA9gD2ABUA+wD7ACAA/QD9ACAA/gD+ABUBAwEEACABCQEJACABFwEXABgBGAEYAA0BGQEZABkBKwErABUBLAEsAAcBLQEtAAgBMAEwAAkBMgEyAAkBSQFJAAgBbAFtAB0BbgFuAB4BbwFxAB0BcgFyAB4BdgF3AB4CKAIoAAQCKgIrAAMCRwJIAAMCSgJKAAYCUwJTAAQCVAJXAAUCWAJcAAICXQJhAAMCYgJlAAwCZgJmAA8CZwJtABMCbgJuABQCbwJyABYCdwJ3ABcCeAJ8ABgCgQKCABkChAKEABMChgKGABMCiAKIABMCiQKJAAQCigKKABQCiwKLAAQCjAKMABQCjQKNAAQCjgKOABQCjwKPAAQCkAKQABQCkQKRAAMCkwKTAAUClAKUABYClQKVAAUClgKWABYClwKXAAUCmAKYABYCmQKZAAUCmgKaABYCmwKbAAUCnAKcABYCpQKlAAICpgKmABcCpwKnAAICqQKpAAICqwKrAAICrQKtAAICrwKvAAICsgKyAAwCtAK0AAkCtgK2AAoCuAK4AAoCugK6AAoCvAK8AAoCvgK+AAICvwK/ABcCwALAAAICwQLBABcCwgLCAAICwwLEABcCxQLFAAMCxgLGABgCxwLHAAMCyALIABgCyQLJAAMCygLKABgCzALMABoCzgLOABoC0ALQABoC2wLbAAYC3QLdAAYC3wLfAAYC4QLhAAwC4wLjAAwC5QLlAAwC5wLnAAwC6QLpAAwC6wLrAAwC7QLtABAC7wLvAA8C8ALwABkC8QLxAA8C8gLyABEC8wLzABwC9AL0ABEC9QL1ABwC9gL2ABEC9wL3ABwDVANUAAUDVQNWAAIDVwNXAAMDWANYAA8DXANcAAEDXQNdAAUDXgNeABEDXwNgAAIDYQNhAAkDYgNjAAIDZANkAAMDZQNlAAsDZgNmAAYDZwNnAA8DaANoAA4DaQNpAAIDagNqAA8DbQNtABcDcQNxABgDcwNzABkDdwN3ABgDegN6AAUDewN7AAcDfQN+AAIDfwN/AAwDgAOBAAkDggOCABIDhAOEAAEDhQOFAAcDhgOGAAUDiAOJAAIDigOKAAMDjAOMAAsDjQONAAQDjgOOAAYDjwOPAA4DkAOQABMDkQORABYDkwOTABgDlAOUABUDlQOVABQDlgOWABkDlwOXABsDmAOYABYDmQOZAAgDnwOfABkDoAOgABADogOiABADpAOkABADpgOmAA8DpwOnABkDqAOpAB0DrAOsAB0DrQOtAAIDrgOuABcDsAOwABMDsQOxAAUDswOzABYDtwO3AA0DuAO4ABkDvQO9AAQDvgO+ABQDvwO/AA8DwAPAABkDwQPBAAIDwgPCAA4DwwPDABsDxAPEAAIDxgPGABMDyAPIABMDywPLAAUDzAPMABYDzgPPABYD0APQAA4D0QPRABsD2APYAAMD2QPZABgD3QPdABgD3wPfABUD4APgABID4QPhABkD4gPiABID4wPjABkD5APkABID5QPlABkD6gPqAA4D6wPrABsD8APwABMD8gPyABMD9AP0ABMD9gP2ABMD+AP4ABMD+gP6ABMD/AP8ABMD/gP+ABMEAAQAABMEAgQCABMEBAQEABMEBgQGABMEBwQHAAUECAQIABYECQQJAAUECgQKABYECwQLAAUEDAQMABYEDQQNAAUEDgQOABYEDwQPAAUEEAQQABYEEQQRAAUEEgQSABYEEwQTAAUEFAQUABYEFQQVAAUEFgQWABYEFwQXAAIEGQQZAAIEGwQbAAMEHAQcABgEHQQdAAMEHgQeABgEHwQfAAMEIAQgABgEIQQhAAMEIgQiABgEIwQjAAMEJAQkABgEJQQlAAMEJgQmABgEJwQnAAMEKAQoABgEMAQwABgEMwQzAAwENQQ1AAwEQQRBAA8EQgRCABkEQwRDAA8ERAREABkERQRFAA8ERgRGABkESQRJAAkESwRLAAIETQRNAAYETwRPAA4EUARQABsEVQRVAAcEVgRWAAgEVwRXAA4EWARYABsEWwRbABcEXQRdAB8EXgReAAcEYARgAAkEZARkAAIEZgRmAAIEagRqAA8EqgSqAAMAAgFtAAYABgAHAAsACwAHABAAEAATABEAEQAXABIAEgATACUAJQARACcAJwAFACsAKwAFAC4ALgAcADMAMwAFADUANQAFADcANwAZADgAOAAKADkAOQAGADoAOgANADsAOwAJADwAPAASAD0APQAOAD4APgAUAEUARQAaAEcASQAVAEsASwAVAFEAUgAYAFMAUwAIAFQAVAAYAFUAVQAVAFcAVwAbAFkAWQALAFoAWgACAFwAXAAWAF0AXQACAF4AXgAMAIMAgwAFAJIAkgAFAJMAkwAVAJcAlwAFAJgAmAAVAJoAmgALALEAsQARALIAsgAFALMAswARALoAugAVALwAvAACAMAAwAAYAMcAyAAVAMoAygALANEA0QAKANIA0gAFANMA0wABANUA1QAKANkA2QASANwA3AABAN0A3QAQAOAA4AAPAOsA6wAYAO0A7QAWAO8A8AAYAPEA8QAEAPIA9AAYAPYA9gAVAPcA9wAYAPgA+AADAPkA+gAYAP0A/QAYAP8A/wAYAQIBAgAVAQMBAwAEAQQBBAAYAQcBBwAFAQwBDAARARYBFgAFARcBFwAIARgBGAANARkBGQACARoBGgAFARwBHAAFAR0BHQAVAR4BHgAFASABIAAFASEBIQAVATIBMgAKATUBNQAYATgBOAAFATkBOQAVAToBOgAKAUQBRAAYAUkBSQAYAUsBTAAVAVEBUQABAVUBVQAFAVYBVgAVAWkBagAXAWwBbQAHAW4BbgATAW8BcQAHAXIBcgATAXYBdwATAigCKQAFAisCLAAFAkYCRgAXAkwCUgARAlMCUwAFAl0CYQAFAmICZQAGAmYCZgAOAmcCbQAaAm4CcgAVAncCdwAYAngCfAAIAn0CgAALAoECggACAoMCgwARAoQChAAaAoUChQARAoYChgAaAocChwARAogCiAAaAokCiQAFAooCigAVAosCiwAFAowCjAAVAo0CjQAFAo4CjgAVAo8CjwAFApACkAAVApICkgAVApQClAAVApYClgAVApgCmAAVApoCmgAVApwCnAAVAp0CnQAFAp4CngAVAp8CnwAFAqACoAAVAqECoQAFAqICogAVAqMCowAFAqQCpAAVArICsgAcAr8CvwAYAsECwQAYAsMCxAAYAsUCxQAFAsYCxgAIAscCxwAFAsgCyAAIAskCyQAFAsoCygAIAtEC0QAZAtIC0gAbAtMC0wAZAtQC1AAbAtUC1QAZAtYC1gAbAtcC1wAZAtgC2AAbAtkC2QAZAtoC2gAbAtsC2wAKAt0C3QAKAt8C3wAKAuEC4QAGAuIC4gALAuMC4wAGAuQC5AALAuUC5QAGAuYC5gALAucC5wAGAugC6AALAukC6QAGAuoC6gALAusC6wAGAuwC7AALAu0C7QAJAu8C7wAOAvAC8AACAvEC8QAOAvIC8gAUAvMC8wAMAvQC9AAUAvUC9QAMAvYC9gAUAvcC9wAMAvoC+gAFA1MDUwARA1cDVwAFA1gDWAAOA1sDWwARA14DXgAUA2QDZAAFA2cDZwAOA2gDaAASA2oDagAOA2sDawAVA20DbQAYA28DbwALA3EDcQAIA3MDcwACA3YDdgALA3cDdwAIA3gDeAALA38DfwAcA4IDggAQA4MDgwARA4oDigAFA40DjQAFA44DjgAKA48DjwASA5ADkAAaA5EDkQAVA5IDkgAYA5MDkwAIA5QDlAAYA5UDlQAVA5YDlgACA5cDlwAWA5gDmAAVA5kDmQAYA5oDmgAbA54DngAYA58DnwACA6ADoAAJA6IDogAJA6QDpAAJA6YDpgAOA6cDpwACA6gDqQAHA6wDrAAHA64DrgAYA68DrwARA7ADsAAaA7MDswAVA7QDtAAYA7cDtwANA7gDuAACA7kDuQAVA7oDugAFA70DvQAFA74DvgAVA78DvwAOA8ADwAACA8IDwgASA8MDwwAWA8UDxQARA8YDxgAaA8cDxwARA8gDyAAaA8wDzAAVA84DzwAVA9AD0AASA9ED0QAWA9UD1QAYA9cD1wAYA9gD2AAFA9kD2QAIA9oD2gAFA9sD2wAVA9wD3AAFA90D3QAIA+AD4AAQA+ED4QACA+ID4gAQA+MD4wACA+QD5AAQA+UD5QACA+YD5gAPA+cD5wADA+kD6QAYA+oD6gASA+sD6wAWA+wD7AAVA+0D7QABA+4D7gAEA+8D7wARA/AD8AAaA/ED8QARA/ID8gAaA/MD8wARA/QD9AAaA/UD9QARA/YD9gAaA/cD9wARA/gD+AAaA/kD+QARA/oD+gAaA/sD+wARA/wD/AAaA/0D/QARA/4D/gAaA/8D/wARBAAEAAAaBAEEAQARBAIEAgAaBAMEAwARBAQEBAAaBAUEBQARBAYEBgAaBAgECAAVBAoECgAVBAwEDAAVBA4EDgAVBBAEEAAVBBIEEgAVBBQEFAAVBBYEFgAVBBsEGwAFBBwEHAAIBB0EHQAFBB4EHgAIBB8EHwAFBCAEIAAIBCEEIQAFBCIEIgAIBCMEIwAFBCQEJAAIBCUEJQAFBCYEJgAIBCcEJwAFBCgEKAAIBCkEKQAFBCoEKgAVBCsEKwAFBCwELAAVBC0ELQAFBC4ELgAVBC8ELwAFBDAEMAAIBDEEMQAFBDIEMgAVBDMEMwAGBDQENAALBDUENQAGBDYENgALBDgEOAALBDoEOgALBDwEPAALBD4EPgALBEAEQAALBEEEQQAOBEIEQgACBEMEQwAOBEQERAACBEUERQAOBEYERgACBEoESgAYBEwETAAYBE0ETQAKBE8ETwASBFAEUAAWBFEEUQAPBFIEUgADBFMEUwAPBFQEVAADBFYEVgAYBFcEVwASBFgEWAAWBGMEYwAYBGUEZQAYBGcEZwAYBGgEaAABBGkEaQAEBGoEagAOBHAEcAAXBKoEqgAFAAEAAAAKAgYG8AAEREZMVAAaY3lybABIZ3JlawB2bGF0bgCkAAQAAAAA//8AEgAAAAoAFAAeACgANABBAEsAVQBfAGkAcwB9AIcAkQCbAKUArwAEAAAAAP//ABIAAQALABUAHwApADUAQgBMAFYAYABqAHQAfgCIAJIAnACmALAABAAAAAD//wASAAIADAAWACAAKgA2AEMATQBXAGEAawB1AH8AiQCTAJ0ApwCxACgABkFaRSAAVENSVCAAfk1PTCAAqE5BViAA1FJPTSABAFRVUiABLAAA//8AEwADAA0AFwAhACsAMgA3AEQATgBYAGIAbAB2AIAAigCUAJ4AqACyAAD//wASAAQADgAYACIALAA4AEUATwBZAGMAbQB3AIEAiwCVAJ8AqQCzAAD//wASAAUADwAZACMALQA5AEYAUABaAGQAbgB4AIIAjACWAKAAqgC0AAD//wATAAYAEAAaACQALgA6AD4ARwBRAFsAZQBvAHkAgwCNAJcAoQCrALUAAP//ABMABwARABsAJQAvADsAPwBIAFIAXABmAHAAegCEAI4AmACiAKwAtgAA//8AEwAIABIAHAAmADAAPABAAEkAUwBdAGcAcQB7AIUAjwCZAKMArQC3AAD//wATAAkAEwAdACcAMQAzAD0ASgBUAF4AaAByAHwAhgCQAJoApACuALgAuWMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGMyc2MEWGNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmNjbXAEXmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRsaWcEZmRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGRub20EbGZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmZyYWMEcmxpZ2EEfGxpZ2EEhGxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxudW0EimxvY2wEkGxvY2wElmxvY2wEnG51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom51bXIEom9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqG9udW0EqHBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnBudW0ErnNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNtY3AEtHNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDEEunNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDIEwHNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDMExnNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDQEzHNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDUE0nNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDYE2HNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nNzMDcE3nRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5HRudW0E5AAAAAEAAAAAAAIAAgADAAAAAQAHAAAAAQAYAAAAAwAVABYAFwAAAAIACAAJAAAAAQAJAAAAAQAUAAAAAQAEAAAAAQAGAAAAAQAFAAAAAQAZAAAAAQARAAAAAQATAAAAAQABAAAAAQAKAAAAAQALAAAAAQAMAAAAAQANAAAAAQAOAAAAAQAPAAAAAQAQAAAAAQASABsAOAPGBrQHYA3wDfAOBg4oDl4OhA6yDsYO2g7uDwAPGg9cD3oPmA/KD/wQLhBCEHoQbBB6EKYAAQAAAAEACAACAcQA3wHnAboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHoAekCRAI7AeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgACAQTdAgICAwIEAgUCBgIHAggCCQIKAgsCLwIPAhACEQIUAhUCFgIXAhgCGQIbAhwCHgIdAvwC/QL+Av8DAAMBAwIDAwMEAwUDBgMHAwgDCQMKAwsDDAMNAw4DDwMQAxEDEgMTAxQDFQMWAxcDGAMZAxoDGwMcAx0DHgMfAyADIQMiAyMDJAMlAyYDJwMoAykDKgMrAywDLQMuAy8DMAMxAzIDMwM0AzUDNgM3AzgDOQM6AzsDPAM9Az4DPwNAA0EDQgNDA0QDRgNFA0cDSANJA0oDSwNMA00DTgNPA1ADUQNSBKsErAStBK4ErwSwBLEEsgSzBLQEtQS2BLcEuAS5BLoEuwS8BL0EvgS/BMAEwQTCBMMExATFBMYB/wTHBMgEyQTKBMsEzATNBM4EzwTQBNEE0gTTBNQE1QTWBNgE2QTbAhoE3AIOBNcCEwINBNoCDAISAAEA3wAIACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgBlAGcAhQCSALAAsQCyALMAtAC1ALYAtwC4ALkA0QDSANMA1ADVANYA1wDYANkA2gDbANwA3QDeAN8A4ADhAOIA4wDkAOUA5gDnAOgBLAEwATIBOAE6ATwBPgE/AUUBRgF/AYUBigGNAkcCSAJKAkwCTQJOAk8CUAJRAlICUwJUAlUCVgJXAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAoMChQKHAokCiwKNAo8CkQKTApUClwKZApsCnQKfAqECowKlAqcCqQKrAq0CrwKyArQCtgK4AroCvAK+AsACwgLFAscCyQLLAs0CzwLRAtMC1QLZAtsC3QLfAuEC4wLlAucC6QLrAu0C7wLxAvIC9AL2A1MDVANVA1YDVwNYA1kDWwNcA10DXgNfA2ADYQNiA2QDZQNmA2cDaANpA2oDegN7A3wDfQN+A38DgAOBA4IDgwOEA4UDhgOHA4gDiQOKA4sDjAONA44DjwO7A70DvwPUA9oD4ARJBEsETwRXBFkEXgRqAAEAAAABAAgAAgF0ALcBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAv0DMAI7AfoEygTLAfsB/AH9Af4B/wIABM4EzwTRBNQE3QICAgMCBAIFAgYCBwIIAgkCCgILAfQB9QH2AfcB+AH5Ai8CDwIQAhECFAIVAhcCGQL+Av8DAAMBAwIDAwMEAwUDBgMHAwgDCQMKAwsDDAMNAw4DDwMQAxEDEgMTAxQDFQMWAxcDGAMZA08DGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMxAzIDMwM0AzUDNgM3AzgDOQM6AzsDPAM9Az4DPwNAA0EDQgNDA0QDRgNFA0cDSANJA0oDSwNMA00DTgNQA1EDUgTJBMwEzQTQBNIE0wIBBNUEwQTCBMMExATFBMYExwTIBNYE2ATZAhgE2wIaBNwC/AIOBNcCEwINBNoCFgIMAhIAAQC3AEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgCHAIwAkwDpAOoA6wDsAO0A7gDvAPAA8QDyAPMA9AD1APYA9wD4APkA+gD7APwA/QD+AP8BAAEBAQIBAwEEAQUBBgEtATEBMwE5ATsBPQFAAUcCSwJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoQChgKIAooCjAKOApACkgKUApYCmAKaApwCngKgAqICpAKmAqgCqgKsAq4CswK1ArcCuQK7Ar0CvwLBAsMCxgLIAsoCzALOAtAC0gLUAtYC2gLcAt4C4ALiAuQC5gLoAuoC7ALuAvAC8wL1AvcDkAORA5IDkwOUA5UDlgOXA5gDmQOaA5sDnAOdA54DnwO8A74DwAPOA9UD2wPhBEcESgRMBFAEWARaBFsEXwRrAAYAAAAGABIAKgBCAFoAcgCKAAMAAAABABIAAQCQAAEAAAAaAAEAAQBNAAMAAAABABIAAQB4AAEAAAAaAAEAAQBOAAMAAAABABIAAQBgAAEAAAAaAAEAAQKuAAMAAAABABIAAQBIAAEAAAAaAAEAAQObAAMAAAABABIAAQAwAAEAAAAaAAEAAQOdAAMAAAABABIAAQAYAAEAAAAaAAEAAQQaAAIAAQCnAKsAAAAEAAAAAQAIAAEGHgA2AHIApACuALgAygD8AQ4BGAFKAWQBfgGQAboB7AH2AhgCMgJEAnYCiAKiAswC3gMQAxoDJAM2A2gDcgN8A4YDoAO6A8wD9gQoBDIEVARuBIAEsgTEBN4FCAUaBSQFLgU4BUIFbAWWBcAF6gYUAAYADgAUABoAIAAmACwCTAACAKcCTQACAKgCTwACAKkD8QACAKoEewACAKsD7wACAKwAAQAEBIgAAgCsAAEABAKJAAIAqAACAAYADASKAAIArASMAAIBogAGAA4AFAAaACAAJgAsAlQAAgCnAlUAAgCoBAsAAgCpBAkAAgCqBH0AAgCrBAcAAgCsAAIABgAMBHcAAgCoAqMAAgGiAAEABASOAAIArAAGAA4AFAAaACAAJgAsAlgAAgCnAlkAAgCoAqcAAgCpBBcAAgCqBH8AAgCrBBkAAgCsAAMACAAOABQEkAACAKgEkgACAKwCtAACAaIAAwAIAA4AFAK2AAIAqASUAAIArAK4AAIBogACAAYADAOtAAIAqASWAAIArAAFAAwAEgAYAB4AJAR5AAIApwK+AAIAqAJcAAIAqQSYAAIArALAAAIBogAGAA4AFAAaACAAJgAsAl0AAgCnAl4AAgCoAmAAAgCpBB0AAgCqBIEAAgCrBBsAAgCsAAEABASaAAIAqAAEAAoAEAAWABwCywACAKgEgwACAKsEnAACAKwCzQACAaIAAwAIAA4AFALRAAIAqASeAAIArALXAAIBogACAAYADASgAAIArALbAAIBogAGAA4AFAAaACAAJgAsAmIAAgCnAmMAAgCoAuEAAgCpBDUAAgCqBIUAAgCrBDMAAgCsAAIABgAMBKIAAgCpBKQAAgCsAAMACAAOABQDoAACAKcDogACAKgEpgACAKwABQAMABIAGAAeACQDpgACAKcCZgACAKgERQACAKkEQwACAKoEQQACAKwAAgAGAAwC8gACAKgEqAACAKwABgAOABQAGgAgACYALAJnAAIApwJoAAIAqAJqAAIAqQPyAAIAqgR8AAIAqwPwAAIArAABAAQEiQACAKwAAQAEAooAAgCoAAIABgAMBIsAAgCsBI0AAgGiAAYADgAUABoAIAAmACwCbwACAKcCcAACAKgEDAACAKkECgACAKoEfgACAKsECAACAKwAAQAEBHgAAgCoAAEABASPAAIArAABAAQEGgACAKwAAwAIAA4AFASRAAIAqASTAAIArAK1AAIBogADAAgADgAUArcAAgCoBJUAAgCsArkAAgGiAAIABgAMA64AAgCoBJcAAgCsAAUADAASABgAHgAkBHoAAgCnAr8AAgCoAncAAgCpBJkAAgCsAsEAAgGiAAYADgAUABoAIAAmACwCeAACAKcCeQACAKgCewACAKkEHgACAKoEggACAKsEHAACAKwAAQAEBJsAAgCoAAQACgAQABYAHALMAAIAqASEAAIAqwSdAAIArALOAAIBogADAAgADgAUAtIAAgCoBJ8AAgCsAtgAAgGiAAIABgAMBKEAAgCsAtwAAgGiAAYADgAUABoAIAAmACwCfQACAKcCfgACAKgC4gACAKkENgACAKoEhgACAKsENAACAKwAAgAGAAwEowACAKkEpQACAKwAAwAIAA4AFAOhAAIApwOjAAIAqASnAAIArAAFAAwAEgAYAB4AJAOnAAIApwKBAAIAqARGAAIAqQREAAIAqgRCAAIArAACAAYADALzAAIAqASpAAIArAABAAQC+AACAKgAAQAEAvoAAgCoAAEABAL5AAIAqAABAAQC+wACAKgABQAMABIAGAAeACQCcwACAKcCdAACAKgCqAACAKkEGAACAKoEgAACAKsABQAMABIAGAAeACQEKwACAKcEKQACAKgELwACAKkELQACAKoEMQACAKwABQAMABIAGAAeACQELAACAKcEKgACAKgEMAACAKkELgACAKoEMgACAKwABQAMABIAGAAeACQEOQACAKcENwACAKgEPQACAKkEOwACAKoEPwACAKwABQAMABIAGAAeACQEOgACAKcEOAACAKgEPgACAKkEPAACAKoEQAACAKwAAQAEBIcAAgCoAAIAEQAlACkAAAArAC0ABQAvADQACAA2ADsADgA9AD4AFABFAEkAFgBLAE0AGwBPAFQAHgBWAFsAJABdAF4AKgCBAIEALACDAIMALQCGAIYALgCJAIkALwCMAIwAMACXAJoAMQDPAM8ANQABAAAAAQAIAAEABgACAAEAAgLVAtYAAQAAAAEACAACAA4ABATeBN8E4AThAAEABAKHAogCmQKaAAQAAAABAAgAAQAmAAIACgAcAAIABgAMAaMAAgBKAagAAgBYAAEABAGpAAIAWAABAAIASgBXAAQAAAABAAgAAQBEAAIACgAUAAEABAGkAAIATQABAAQBpgACAE0ABAAAAAEACAABAB4AAgAKABQAAQAEAaUAAgBQAAEABAGnAAIAUAABAAIASgGjAAEAAAABAAgAAQAGAZUAAQABAEsAAQAAAAEACAABAAYBJwABAAEAugABAAAAAQAIAAEABgGsAAEAAQA2AAEAAAABAAgAAgAcAAIB4wHkAAEAAAABAAgAAgAKAAIB5QHmAAEAAgAvAE8AAQAAAAEACAACAB4ADAIoAioCKQIrAiwCHwIgAiECIgGuAiQCJQABAAwAJwAoACsAMwA1AEYARwBIAEsAUwBUAFUAAQAAAAEACAACAAwAAwImAicCJwABAAMASQBLAiIAAQAAAAEACAACAGYACAI9Ai0CLgIwAjECOQI6AjwAAQAAAAEACAACABYACAAbABUAFgAXABgAGQAdABQAAQAIAa0CIwRxBHIEcwR0BHUEdgABAAAAAQAIAAIAFgAIBHYCIwRxBHIEcwR0Aa0EdQABAAgAFAAVABYAFwAYABkAGwAdAAEAAAABAAgAAgAWAAgAFQAWABcAGAAZABsAHQAUAAEACAItAi4CMAIxAjkCOgI8Aj0AAQAAAAEACAABAAYBaQABAAEAEwAGAAAAAQAIAAMAAQASAAEAUgAAAAEAAAAaAAIAAgF8AXwAAAHUAd0AAQABAAAAAQAIAAEAKAHAAAEAAAABAAgAAgAaAAoCMgB6AHMAdAIzAjQCNQI2AjcCOAACAAEAFAAdAAAAAQAAAAEACAACACYAEAHUAdUB1gHXAdgB2QHaAdsB3AHdAkACPgJBAkICPwJDAAEAEAAUABUAFgAXABgAGQAaABsAHAAdAE0ATgKuA5sDnQQa",
  "Roboto-Medium.ttf": "AAEAAAARAQAABAAQR1BPU32qcYwAAgioAABZDEdTVUJMnCjgAAJhtAAAGWhPUy8yoQuxtgAAAZgAAABgY21hcEAmSHIAABpsAAASyGN2dCAElytKAAAvvAAAAFZmcGdte/lhqwAALTQAAAG8Z2FzcAAIABMAAgicAAAADGdseWaunmLpAAA53AABy8xoZG14PT88IAAAFYAAAATsaGVhZPh7qwgAAAEcAAAANmhoZWEK7wqbAAABVAAAACRobXR4JPNE9QAAAfgAABOIbG9jYd3eZq0AADAUAAAJxm1heHAHEgL1AAABeAAAACBuYW1lPWNvTAACBagAAALUcG9zdP9tAGQAAgh8AAAAIHByZXAbsfg2AAAu8AAAAMwAAQAAAAIAABFApG1fDzz1ABsIAAAAAADE8BEuAAAAANDbTpT6JP3VCVwIcwAAAAkAAgAAAAAAAAABAAAHbP4MAAAJa/ok/kEJXAABAAAAAAAAAAAAAAAAAAAE4gABAAAE4gCPABYATgAFAAEAAAAAAA4AAAIAAhYABgABAAMElQH0AAUAAAWaBTMAAAEfBZoFMwAAA9EAZgIAAAACAAAAAAAAAAAA4AAK/1AAIX8AAAAhAAAAAEdPT0cAQAAA//0GAP4AAGYHmgIAIAABnwAAAAAEOgWwACAAIAACA4wAZAAAAAAAAAAAAf4AAAH+AAACJQCPApgAZQTiAGAEjABkBeAAYwUdAFYBWgBSAsoAgALSACgDiQAbBHUARAHCABwCoABHAjwAhwMqAAIEjABpBIwAqASMAFEEjABPBIwANASMAIEEjAB1BIwARQSMAGgEjABdAh8AggHnAC4EEQA/BHoAkQQqAIAD5AA8BygAWwVTABIFDACUBTkAZgU6AJQEhgCUBGUAlAVyAGoFrwCUAkIAowRxAC0FCwCUBFQAlAcBAJQFrgCUBYYAZgUdAJQFhgBgBP4AlATUAEoE2wAtBTcAfQUtABIHCgAwBRAAKQTgAAcE0QBQAjEAhANYABQCMQAMA2sANQOcAAMClAAxBFQAWgSBAHwEMABPBIQATwRLAFMC1gAtBIkAUgRxAHkCCwB9AgH/tQQtAH0CCwCMBvYAfARzAHkEjgBPBIEAfASLAE8C0AB8BCEASwKpAAgEcgB3A/UAFgXyACEEBgAfA+UADAQGAFICrwA4AgIArgKvABsFUQB1Ah4AhgR9AGQEtQBeBZ0AXQTgABkB/ACIBPgAWgOFAF0GRABXA5EAjQPiAFcEbQB/BkQAVwPbAIcDCgB/BEoAXwL2ADwC9gA3ApsAcAS7AJID7QBFAkIAjgIQAG0C9gCAA6cAdwPiAF0F0ABZBisAUAZXAGcD5ABCB4X/9gREAE0FhABpBMoAlATnAIgGwQBIBKcAZwSRAEMEiABPBJcAggWwAB8CGgCPBJgAjgRkACICTwAhBZMAkASIAH4HtABkBzoAWwIMAIsFiABRAtD/5AWKAFgEngBPBaQAfQTyAHcCJv+1BDwAWQPmAJQDsAByA9wAhwN8AHUCCwCBArIAeAJNACkD2AB6Ax8ASQJsAIIAAPyOAAD9XgAA/HMAAP0+AAD8DAAA/RwCXQDGBDwAZwJCAI4EdQCbBb8AGQV6AFsFOAAgBJAAbAWxAJsEkABHBe8ASgWqAEQFWwBrBIQAVgTGAJYEDgAgBIgAVARgAGAEGgBhBIgAfgShAHMCqgCpBGoAFgQTAGQE8wAtBIgAgAQ3AFIEkABSBC0APwRgAIAF0ABEBckATwaUAGYEswB2BHv/4QZxADMF/gAiBVkAaAiIAC0IjwCbBlsAMQWqAJIFCACQBgYAJAeiABYE1gBJBagAlAWpAC0FCgA5Bl8ATwX5AJIFiQCOB5sAmAf5AJgGGgAYBvkAmwUHAJAFUABrB1QAoAT3ACAEfQBbBI8AjwNaAIUE9gAnBnYAHgQWAE0EmACGBG4AjwSaACEGAwCPBJcAhgSYAIYD9QAjBdMAVATTAIYEZgBfBo4AhgbsAH4FFwAfBm8AjwRoAI8EPABRBoQAkQRwACcEcf/bBDwAVAbRAB4G5ACGBIn/7gSYAIYHSQCIBk8AcARn/+AHKACYBgEAhgUMABwEYAAKB0IArAY2AJ0G7QCABeYAggkyAKMH+QCPBCAAKAPwADMFegBfBIgATwUaABAEDgAgBXoAXwSIAE8HRQCIBkQAdAdJAIgGTwBwBRoAZgRKAFwE/wBtAAD8ZgAA/HMAAP17AAD9pQAA+iQAAPpNBGf/4AUTAJQEhgB8BGoAjwOhAH4EtwCbBCAAfgUsAJAEqwCOBpUANAWkAD0H0ACUBaoAfghHAJsG9QB+BioAZwT/AGEHMQAtBXAAJgV0AIAEcwB0BYcAhQYkABYEw//LBSEAkAR4AI4FrwCbBIgAfgWIAFEEpgBbBKYAXQTHADQDUwAtBQcAUgbxAGgG3QBeBlMAPAUoAC8EewBIBD4AdAe+AEIGnQBAB/0AlAaeAHcFBABdBCwAVQWqACEFHQBEBVUAgQMsAGcEFAAACCkAAAQUAAAIKQAAArkAAAIKAAABXAAABH8AAAIwAAABogAAANEAAAAAAAACoQBHAqEARwUpAJ0GMACBA50ABAHAAGMBvAAzAc4AMgGoAEoDFABsAxsAQAMIADIEXQBABJkAXALLAIgD+gCKBaYAigFsAEcHpwBKAnIAbAJpAFQDnAAtAvYANQNcAGkEtQBfBnAAIQa4AJgIkwCUB4gANQaMAHwEjABeBfUAIQQ0ACgEogAhBV4ATwV9ACgF5ABwA+IATAguAJAFCQBtBRQAlgY1AFkG3QBUBtEAWwaiAFgEkQBiBZYApgTZAEAEgwCeBLIAOwhFAF4CLf+vBI4AZQR6AJEEEQA8BCoAgAQMACQCWwChApgAYwHxAEUFGwAtBKgAGAS8AC0HIwAtByMALQURAC0GtwBLAAAAAAgwAFkINQBcBDMAOgSTAE8CEP+wAbMAXAOhAHUDoQB1A6EAdQQLAHUECwB1BAv/TAQLAHoDoQB1AgUAlASeAAkEYAB2BIAATwR6AHYD4AB2A8UAdgSmAFQE3gB2AfwAhQPVACQEWwB2A7kAdgYGAHYE3QB2BMAATwRtAHYEwABMBFwAdgQ0AD4EOwAkBIQAZwR7AAkGBwAoBF4AFQQ8AAUEKgBBAvYASwL2AIAC9gA8AvYANwL2ADUC9gBPAvYATQL2ADYC9gBLAvYARgO5AJACsgCWBDsACgS7AFYFRACbBSgAmwQwAIEFOQCbBC0AgQQ0AD4EZgA4BE0ADgO5AHYEewAJBMAATwR7AAkDmABCBNgAdgQZAEQFnQBQBVQAUATkAF8FkQAkBIAATwdUACQHVwB2BZcAJATXAHYEcQB2BVkAJwY6ABoERgBCBOQAdgRcAHYEywAkBEYAHwVdAHYEjABBBoQAdgcKAHYFWgAKBiAAdgRnAHYEgAA8BpIAdgSIAEMEIgAKBpIAGgSdAHYFGgB2BW4AJAXwAE8EWgAFBMQAFQaVACQEjABBBIwAdgX+AAoE0gBPBEYAQgTAAE8EZgA4A/cARgg2AHYE6wAoBIgAfAQ9AFAEmABPA6QAWwShAEwElAB8BJ8ATwRLAFMEiQBRBXoAawWiAGsFhgCbBeAAawXiAGsEGwCXBIIAbgO5AHYEVwAPBL4ANQL2AEsC9gA1AvYATwL2AE0C9gA2AvYASwL2AEYEawBmBC4AQwaYAE8EtABzBOsAYgIm/7UCJv+1AhsAjwIb//sCGwCPBGAAdgH+AAACoABHBVj/9wVY//cEj//UBNsALQKp/+gFUwASBVMAEgVTABIFUwASBVMAEgVTABIFUwASBTkAZgSGAJQEhgCUBIYAlASGAJQCQv/IAkIAowJC/8sCQv+/Ba4AlAWGAGYFhgBmBYYAZgWGAGYFhgBmBTcAfQU3AH0FNwB9BTcAfQTgAAcEVABaBFQAWgRUAFoEVABaBFQAWgRUAFoEVABaBDAATwRLAFMESwBTBEsAUwRLAFMCGv+0AhoAjwIa/7cCGv+rBHMAeQSOAE8EjgBPBI4ATwSOAE8EjgBPBHIAdwRyAHcEcgB3BHIAdwPlAAwD5QAMBVMAEgRUAFoFUwASBFQAWgVTABIEVABaBTkAZgQwAE8FOQBmBDAATwU5AGYEMABPBTkAZgQwAE8FOgCUBRoATwSGAJQESwBTBIYAlARLAFMEhgCUBEsAUwSGAJQESwBTBIYAlARLAFMFcgBqBIkAUgVyAGoEiQBSBXIAagSJAFIFcgBqBIkAUgWvAJQEcQB5AkL/swIa/58CQv+5Ahr/pQJC/98CGv/LAkIAFwILAAACQgCdBrMAowQMAH0EcQAtAib/tQULAJQELQB9BFQAlAILAIoEVACUAgsAVQRUAJQCoQCMBFQAlALnAIwFrgCUBHMAeQWuAJQEcwB5Ba4AlARzAHkEc/+lBYYAZgSOAE8FhgBmBI4ATwWGAGYEjgBPBP4AlALQAHwE/gCUAtAATwT+AJQC0AA4BNQASgQhAEsE1ABKBCEASwTUAEoEIQBLBNQASgQhAEsE1ABKBCEASwTbAC0CqQAIBNsALQKpAAgE2wAtAtEACAU3AH0EcgB3BTcAfQRyAHcFNwB9BHIAdwU3AH0EcgB3BTcAfQRyAHcFNwB9BHIAdwcKADAF8gAhBOAABwPlAAwE4AAHBNEAUAQGAFIE0QBQBAYAUgTRAFAEBgBSB4X/9gbBAEgFhABpBIgATwR6/6YEev+mBDsAJASeAAkEngAJBJ4ACQSeAAkEngAJBJ4ACQSeAAkEgABPA+AAdgPgAHYD4AB2A+AAdgH8/6YB/ACDAfz/qQH8/50E3QB2BMAATwTAAE8EwABPBMAATwTAAE8EhABnBIQAZwSEAGcEhABnBDwABQSeAAkEngAJBJ4ACQSAAE8EgABPBIAATwSAAE8EegBqA+AAdgPgAHYD4AB2A+AAdgPgAHYEpgBUBKYAVASmAFQEpgBUBN4AdgH8/5EB/P+XAfz/vQH8ABUB/AB8A9UAJARbAHYDuQB2A7kAdgO5AHYDuQB2BN0AdgTdAHYE3QB2BMAATwTAAE8EwABPBFwAdgRcAHYEXAB2BDQAPgQ0AD4ENAA+BDQAPgQ7ACQEOwAkBDsAJASEAGcEhABnBIQAZwSEAGcEhABnBIQAZwYHACgEPAAFBDwABQQqAEEEKgBBBCoAQQVTABIE6v9KBhP/UwKm/1YFmv+nBUT+4QVv/7ICqv+HBVMAEgUMAJQEhgCUBNEAUAWvAJQCQgCjBQsAlAcBAJQFrgCUBYYAZgUdAJQE2wAtBOAABwUQACkCQv+/BOAABwSEAFYEYABgBIgAfgKqAKkEYACABJgAjgSOAE8EuwCSA/UAFgQGAB8Cqv/MBGAAgASOAE8EYACABpQAZgSGAJQEdQCbBNQASgJCAKMCQv+/BHEALQUoAJsFCwCUBQoAOQVTABIFDACUBHUAmwSGAJQFqACUBwEAlAWvAJQFhgBmBbEAmwUdAJQFOQBmBNsALQUQACkEVABaBEsAUwSYAIYEjgBPBIEAfAQwAE8D5QAMBAYAHwRLAFMDWgCFBCEASwILAH0CGv+rAgH/tQRuAI8D5QAMBwoAMAXyACEHCgAwBfIAIQcKADAF8gAhBOAABwPlAAwBWgBSApgAZQRKAI8CJv+xAbwAMwcBAJQG9gB8BVMAEgRUAFoEhgCUBagAlARLAFMEmACGBaoARAXJAE8FGgAQBA7/8QhzAE8JawBmBNYASQQWAE0FOQBmBDAATwTgAAcEDgAgAkIAoweiABYGdgAeAkIAowVTABIEVABaBVMAEgRUAFoHhf/2BsEASASGAJQESwBTBYgAUQQ8AFkEPABZB6IAFgZ2AB4E1gBJBBYATQWoAJQEmACGBagAlASYAIYFhgBmBI4ATwV6AF8EiABPBXoAXwSIAE8FUABrBDwAUQUKADkD5QAMBQoAOQPlAAwFCgA5A+UADAWJAI4EZgBfBvkAmwZvAI8FEAApBAYAHwSEAE8FqQAtBJoAIQVTABIEVABaBVMAEgRUAFoFUwASBFQAWgVTABAEVP+aBVMAEgRUAFoFUwASBFQAWgVTABIEVABaBVMAEgRUAFoFUwASBFQAWgVTABIEVABaBVMAEgRUAFoFUwASBFQAWgSGAJQESwBTBIYAlARLAFMEhgCUBEsAUwSGAJQESwBTBIb/1QRL/44EhgCUBEsAUwSGAJQESwBTBIYAlARLAFMCQgCjAhoAjwJCAJQCCwB4BYYAZgSOAE8FhgBmBI4ATwWGAGYEjgBPBYYAJwSO/6MFhgBmBI4ATwWGAGYEjgBPBYYAZgSOAE8FigBYBJ4ATwWKAFgEngBPBYoAWASeAE8FigBYBJ4ATwWKAFgEngBPBTcAfQRyAHcFNwB9BHIAdwWkAH0E8gB3BaQAfQTyAHcFpAB9BPIAdwWkAH0E8gB3BaQAfQTyAHcE4AAHA+UADATgAAcD5QAMBOAABwPlAAwEogBPBKIATwUoAJsEbgCPBa8AlASXAIYE2wAtA/UAIwUQACkEBgAfBYkAjgRmAF8FiQCOBGYAXwR1AJsDWgCFB6IAFgZ2AB4GJAAWBMP/ywRxAHkFB//QBQf/0AR1//ADWv/iBTz/4wRE/64FqACUBJgAhgWvAJQElwCGBwEAlAYDAI8FqQAtBJoAIQTgAAcEDgAgBRAAKQQGAB8EYABgBGUAAgYwAIEEjABRBIwATwSMADQEjACBBKAAXQS0AH0FcgBqBIkAUgWuAJQEcwB5BVMAEgRUAA0EhgBIBEsAAQJC/vYCGv7iBYYAZgSOABYE/gAyAtD/bgU3AHEEcgAPBN/+rAUMAJQEgQB8BToAlASEAE8FOgCUBIQATwWvAJQEcQB5BQsAlAQtAH0FCwCUBC0AfQRUAJQCCwB4BwEAlAb2AHwFrgCUBHMAeQUdAJQEgQB8BP4AlALQAHIE1ABKBCEASwTbAC0CqQAIBS0AEgP1ABYFLQASA/UAFgcKADAF8gAhBNEAUAQGAFIFzP4cBJ4ACQQc/yoFGv83Ajj/OQTK/5MEeP7oBO7/pASeAAkEYAB2A+AAdgQqAEEE3gB2AfwAhQRbAHYGBgB2BMAATwRtAHYEOwAkBDwABQReABUB/P+dBDwABQPgAHYDuQB2BDQAPgH8AIUB/P+dA9UAJARbAHYERgAfBJ4ACQRgAHYDuQB2A+AAdgTkAHYGBgB2BN4AdgTAAE8E2AB2BG0AdgSAAE8EOwAkBF4AFQRGAEIE3gB2BIAATwQ8AAUF/gAKBOQAdgRGAB8FnQBQBVMAEgRUAFoEhgCUBEsAUwIaAHgAAAABAAAE5AkLBAAAAgICAwYFBwYCAwMEBQIDAwQFBQUFBQUFBQUFAgIFBQUECAYGBgYFBQYGAwUGBQgGBgYGBgUFBgYIBgUFAgQCBAQDBQUFBQUDBQUCAgUCCAUFBQUDBQMFBAcFBAUDAgMGAgUFBgUCBgQHBAQFBwQDBQMDAwUEAwIDBAQHBwcECAUGBQYIBQUFBQYCBQUDBgUJCAIGAwYFBgYCBQQEBAQCAwMEBAMAAAAAAAADBQMFBgYGBQYFBwYGBQUFBQUFBQUDBQUGBQUFBQUHBwcFBQcHBgoKBwYGBwkFBgYGBwcGCQkHCAYGCAYFBQQGBwUFBQUHBQUEBwUFBwgGBwUFBwUFBQgIBQUIBwUIBwYFCAcIBwoJBQQGBQYFBgUIBwgHBgUGAAAAAAAABQYFBQQFBQYFBwYJBgkIBwYIBgYFBgcFBgUGBQYFBQUEBggIBwYFBQkHCQcGBQYGBgQFCQUJAwICBQICAQADAwYHBAICAgIDBAMFBQMEBgIJAwMEAwQFBwgKCAcFBwUFBgYHBAkGBgcICAcFBgUFBQkCBQUFBQUDAwIGBQUICAYIAAkJBQUCAgQEBAUFBQUEAgUFBQUEBAUFAgQFBAcFBQUFBQUFBQUHBQUFAwMDAwMDAwMDAwQDBQUGBgUGBQUFBQQFBQUEBQUGBgYGBQgIBgUFBgcFBgUFBQYFBwgGBwUFBwUFBwUGBgcFBQcFBQcFBQUFBAkGBQUFBAUFBQUFBgYGBwcFBQQFBQMDAwMDAwMFBQcFBgICAgICBQIDBgYFBQMGBgYGBgYGBgUFBQUDAwMDBgYGBgYGBgYGBgUFBQUFBQUFBQUFBQUCAgICBQUFBQUFBQUFBQQEBgUGBQYFBgUGBQYFBgUGBgUFBQUFBQUFBQUGBQYFBgUGBQYFAwIDAgMCAwIDCAUFAgYFBQIFAgUDBQMGBQYFBgUFBgUGBQYFBgMGAwYDBQUFBQUFBQUFBQUDBQMFAwYFBgUGBQYFBgUGBQgHBQQFBQUFBQUFCAgGBQUFBQUFBQUFBQUFBAQEBAICAgIFBQUF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AAADfwAABBsAAAQbAAAA3AAABBwAAAQiAAADhwAABCMAAAQkAAAA3QAABCUAAAQlAAADjgAABCYAAAQvAAAA3wAABDAAAAQwAAADjwAABDEAAAQ0AAAA6QAABDUAAAQ1AAADkAAABDYAAAQ4AAAA7QAABDkAAAQ5AAADkQAABDoAAAQ9AAAA8AAABD4AAAQ+AAADkgAABD8AAAQ/AAAA9AAABEAAAARBAAADkwAABEIAAARCAAAA9QAABEMAAARDAAADlQAABEQAAAREAAAA9gAABEUAAARFAAADlgAABEYAAARPAAAA9wAABFAAAARQAAADsgAABFEAAARRAAADlwAABFIAAARSAAABAQAABFMAAARTAAADmAAABFQAAARUAAABAgAABFUAAARYAAADmQAABFkAAARbAAABAwAABFwAAARcAAADnQAABF0AAARdAAADswAABF4AAAReAAADngAABF8AAARhAAABBgAABGIAAARiAAAEXAAABGMAAARvAAABCQAABHAAAARxAAADtAAABHIAAAR1AAABFgAABHYAAAR3AAADtgAABHgAAAR4AAADuQAABHkAAAR5AAADuAAABHoAAASGAAABGgAABIgAAASJAAABJwAABIoAAASLAAAEYQAABIwAAASMAAAEWwAABI0AAASRAAABKQAABJIAAASTAAAEXQAABJQAAASVAAABLgAABJYAAASXAAAEVgAABJgAAASZAAADugAABJoAAASbAAAESAAABJwAAASdAAABMAAABJ4AAASfAAAEXwAABKAAAAShAAABMgAABKIAAASjAAAESgAABKQAAASpAAABNAAABKoAAASrAAADvAAABKwAAAStAAAETAAABK4AAASvAAADvgAABLAAAASxAAAEaQAABLIAAASzAAAETgAABLQAAAS1AAABOgAABLYAAAS3AAAEUAAABLgAAAS6AAABPAAABLsAAAS7AAAEWgAABLwAAAS9AAABPwAABL4AAAS/AAAEWAAABMAAAATCAAADwAAABMMAAATEAAABQQAABMUAAATGAAAEZwAABMcAAATIAAABQwAABMkAAATKAAAEYwAABMsAAATMAAAEUgAABM0AAATOAAAEZQAABM8AAATXAAADwwAABNgAAATYAAABRQAABNkAAATZAAADzQAABNoAAATaAAADzAAABNsAAATfAAADzgAABOAAAAThAAABRgAABOIAAAT1AAAD0wAABPYAAAT3AAAEVAAABPgAAAT5AAAD5wAABPoAAAT7AAABSAAABPwAAAT9AAAD6QAABP4AAAT/AAAEawAABQAAAAUAAAABSgAABQEAAAUBAAAD6wAABQIAAAUQAAABSwAABREAAAURAAAEbQAABRIAAAUTAAAD7AAAHgAAAB4BAAADrgAAHj4AAB4/AAADrAAAHoAAAB6FAAADnwAAHqAAAB7xAAAD7gAAHvIAAB7zAAADpQAAHvQAAB75AAAEQAAAH00AAB9NAAAEqQAAIAAAACALAAABWwAAIBAAACARAAABZwAAIBMAACAUAAABaQAAIBUAACAVAAAEbwAAIBcAACAeAAABawAAICAAACAiAAABcwAAICUAACAnAAABdgAAIDAAACAwAAABeQAAIDIAACAzAAADpwAAIDkAACA6AAABegAAIDwAACA8AAADqQAAIEQAACBEAAABfAAAIHQAACB0AAABfQAAIH8AACB/AAABfgAAIKMAACCjAAAEbgAAIKQAACCkAAABfwAAIKYAACCqAAABgAAAIKsAACCrAAAERwAAIKwAACCsAAABhQAAILEAACCxAAABhgAAILkAACC6AAABhwAAILwAACC9AAABiQAAIQUAACEFAAABiwAAIRMAACETAAABjAAAIRYAACEWAAABjQAAISIAACEiAAABjgAAISYAACEmAAAAuQAAIS4AACEuAAABjwAAIVsAACFeAAABkAAAIgIAACICAAABlAAAIgYAACIGAAAAsQAAIg8AACIPAAABlQAAIhEAACISAAABlgAAIhoAACIaAAABmAAAIh4AACIeAAABmQAAIisAACIrAAABmgAAIkgAACJIAAABmwAAImAAACJgAAABnAAAImQAACJlAAABnQAAJcoAACXKAAABnwAA7gEAAO4CAAABoAAA9sMAAPbDAAABogAA+wEAAPsEAAABpAAA/v8AAP7/AAABqgAA//wAAP/9AAABq7AALEuwCVBYsQEBjlm4Af+FsIQdsQkDX14tsAEsICBFaUSwAWAtsAIssAEqIS2wAywgRrADJUZSWCNZIIogiklkiiBGIGhhZLAEJUYgaGFkUlgjZYpZLyCwAFNYaSCwAFRYIbBAWRtpILAAVFghsEBlWVk6LbAELCBGsAQlRlJYI4pZIEYgamFksAQlRiBqYWRSWCOKWS/9LbAFLEsgsAMmUFhRWLCARBuwQERZGyEhIEWwwFBYsMBEGyFZWS2wBiwgIEVpRLABYCAgRX1pGESwAWAtsAcssAYqLbAILEsgsAMmU1iwQBuwAFmKiiCwAyZTWCMhsICKihuKI1kgsAMmU1gjIbDAioobiiNZILADJlNYIyG4AQCKihuKI1kgsAMmU1gjIbgBQIqKG4ojWSCwAyZTWLADJUW4AYBQWCMhuAGAIyEbsAMlRSMhIyFZGyFZRC2wCSxLU1hFRBshIVktsAossClFLbALLLAqRS2wDCyxJwGIIIpTWLlAAAQAY7gIAIhUWLkAKQPocFkbsCNTWLAgiLgQAFRYuQApA+hwWVlZLbANLLBAiLggAFpYsSoARBu5ACoD6ERZLbAMK7AAKwCyAQ0CKwGyDgECKwG3DjowJRsQAAgrALcBOC4kGhEACCu3Ak5AMiMVAAgrtwNIOy4hFAAIK7cETkAyIxUACCu3BTAoHxYOAAgrtwZjUT8tGwAIK7cHQDQkGhEACCu3CFtKOikZAAgrtwmDZE46IwAIK7cKd2JMNiEACCu3C5F3XDojAAgrtwx2YEs2HQAIK7cNLCQcFAwACCsAsg8NByuwACBFfWkYRLKwEwFzslATAXSygBMBdLJwEwF1sg8fAXOybx8BdQAqAMwAkQCeAJEA7AByALIAfQBWAF8ATgBgAQQAxAAAABT+YAAUApsAEP85AA3+lwASAyEACwQ6ABQEjQAQBbAAFAYYABUGwAAQAlsAEgcEAAUAAAAAAAAAAABgAGAAYABgAGAAmgDEAUABvwJYAvQDDgM6A2kDnAPBA+MD+QQgBDcEiwS5BQoFfQXBBicGjwa8BzoHpAewB7wH2wgCCCEIhwkzCXMJ3QowCnkKuQrvC04LiwumC9kMIAxEDJ0M2Q0zDX4N3g43DqUOzw8NDz4PjQ/YEAkQQRBlEHwQoRDIEOMRBBGDEeMSNxKUEwgTURPLFAsURRSQFNcU8hVdFaYV9BZYFrgW9RdjF64X9BgkGHIYuxj8GTQZdxmOGc8aExpQGrIbFRt2G9kb+ByTHMQdZR3jHe8eDB68HtIfER9UH6cgGSA5IIogtiDWIQshOSGDIY8hqSHDId0iRiKqIugjYyO0JCAk3iVWJasmHSZ8Jtom9SdBJ4onxygeKHko/SmZKckqLCqSKv8rYyu3LBEsQiylLNwtBC0MLTstXi2WLcIuBS46Ln4uni6+Lscu9S8nL0MvXC+hL6kvzy/8MHUwozDjMRExTTHCMhwyhTL4M2gzmzQPNI005zUwNaM10DYoNpg26TdCN5839Tg5OHg45Dk2OZY6DjpeOtM7NDujPBg8jDzdPRk9cT3NPjk+uD7xPzo/gD/sQCJAY0CgQOlBQkGmQfJCaELnQ0FDqUQTRDlEjkT7RXlFskYDRkpGlEbqRxhHREfOSARIRkiDSMdJG0l9ScdKOEqwSwlLgUvvTGNM0003TXNN0k4xTphPHU+eT+tQOVClURJRhFH1Un5TBlOkVDdUpVUPVVNVmVYEVmtXK1fjWFxY21kwWYNZuFnUWgdaHVozWwRbclvaXDFcoFzMXPVdSl2VXetePV6NXuJfQV+PX+1gQ2DSYVxhomHlYjdihmLJYzhjt2QXZGxkymUlZYxl7mZIZldmZ2a2Zx5npWgXaIBo5mlKabVqH2qDavBrS2uda+9sQGy2bOFs4WzhbOFs4WzhbOFs4WzhbOFs4WzhbOFs6WzxbPttBW0gbUNtZW2FbaRtsG28be5uLG6NbrFuvW7NbuZvtG/Qb+xv/3ATcFpw3HF+cgpyFnLmc0tzyXR+dOR1XnW2diR2wXcid7h4Fnh4eJJ4rHjGeOB5S3lxeal5v3nzeoV6x3tGe4V7lHuje9x773wYfDF8PXygfPV9jn4Yfo9/SH9IgPiBYYGOgguCPIJSgsGDG4Nog9mEL4R1hLyFCoUthWuF74ZEhoyGzIcCh2CHuofViACIQ4hniLmI8olGiY+J6opCiquK1YsOiz+LiYvSjAOMO4yDjKyM/o1xjbOOEo5ujpuPH49/j5WP6JCWkP+RYpGrkfGSM5J0kuqTU5PJk/OUKJSblM6VGJVKlY2V+5ZMlq+XDJeFl/iYiJjYmReZbJnCmj2au5r3m0+bmJvbnBScVZyNnMudIZ0tnXmd755+ntGfE5+Un/mgX6DBoVChXKGtofmiR6KIovejXKO6pDCkwqVHpd6mU6aypwWnZadtp7moHqiBqPKpbanAqiKqbarJqyqrVKurq9esLqx2rIqsnqywrMSs1qztrQGtX62FrgKuZq64rsCuyK7Qrtuu469Jr0mvUa/BsDGwkrDUsTexTrFlsXyxjrGmsbmxxbHRseix/7IWsi6yRbJcsnOyi7KdsrSyy7LisvmzEbMoszqzUbNps4Czl7Ops7+z1bPstAS0ELQctDO0RbRbtHK0iLSetLW0zbTetPW1B7UdtS61RrVdtW+1hbWcta61xbXcte22BLYbtoW3J7c5t0u3Yrd4t4+3pre4t8m327fruAK4E7gquEC4V7huuNu5crmJuZq5sbnHud659LoLuiK6LrpAule6abqAupK6qbrAute67rr5uwS7G7snuzO7Srthu227ebuQu6e7s7u/u9S76bv1vAG8GLwqvDa8QrxZvGq8f7yWvKe8vrzVvO29Bb0XvSm9Nb1BvVO9ZL12vYi9n721vcG9zb3ZveW9974IvhS+IL4svji+T75bvnK+iL6avrC+x77evvG/BL8cvy+/jb/vwAbAHcA0wErAYsB5wJDAp8C+wNDA4cD4wQrBIcE4wWjBmMGowb/B1sHswf3CFcItwjnCRcJcwnPCicKgwrfCzcLkwvzDDsMlwzfDTcNew3bDjcOkw7rD0sPpw//EFsR9xI/EpcS8xM3E3sT0xQrFIcWOxaTFusXRxejF9MYKxhzGM8ZKxlXGa8aCxo7GpMawxsXG0cboxvTHC8ccxzPHRsdYx2THdceHx53Hqce6x8bH3Mfox/7ID8gmyDnITMityMTI2sjxyQjJH8k1yUDJTMlYyWTJcMl8yYjJo8mrybPJu8nDycvJ08nbyePJ68nzyfvKA8oLyhPKK8pDylXKZ8p5yorKpMqsyrTKvMrEyszK5Mr7yw3LH8sxy0nLYMvOy9bL7sv2y/7MFcwszDTMPMxEzEzMY8xrzHPMe8yDzIvMk8ybzKPMq8yzzMrM0szazS7NNs0+zVXNbM10zXzNlM2czbPNyc3gzffODs4lzjjOS85iznPOh86mzrLOxM7MzuPO9c8Bzw3PJM87z1LPac9xz3nPkc+pz7XPwc/Nz9nP5c/xz/nQAdAJ0CDQN9A/0FbQbdCF0JzQpNCs0MPQ2dDx0PnRENEo0UDRWNFv0YbRnNG00czR5NH80gTSDNIk0jvSU9Jq0nzSjdKl0rzS1NLs0wTTG9M301PTX9Nr03PTf9OL05fTo9O108fT4NPy1AvUHdQw1ELUVdRn1HfUhtSZ1KvUvtTQ1OPU9dUI1RrVKtU61UbVUtVk1XbViNWZ1bLVxNXd1e/WAtYU1ifWOdZJ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CRCwBtCwBi+wAdCwAS8wMf//AI//8gPIBbAAJgAFAAAABwAFAiUAAP///7H+SwJzBd8CJgCbAAABBwCe/z//3gAJALAAL7AR3DAxAP//ADMEAAFlBgACBgFtAAD//wCUAAAGagc2AiYAMQAAAQcAdQKQATYAEwCwAEVYsAIvG7ECHz5ZsBHcMDEA//8AfAAABnkGAAImAFEAAAEHAHUCoAAAAAkAsAMvsCDcMDEA//8AEv5tBUIFsAImACUAAAAHAKYBegAD//8AWv5xA/sETgImAEUAAAAHAKYArQAH//8AlAAABEwHPQImACkAAAEHAEQA6AE9ABMAsABFWLAGLxuxBh8+WbAN3DAxAP//AJQAAAUNBz0CJgDbAAABBwBEAUoBPQATALAARViwCC8bsQgfPlmwC9wwMQD//wBT/+wECwYAAiYASQAAAQcARAChAAAAEwCwAEVYsAgvG7EIGz5ZsB/cMDEA//8AhgAABBIF8wImAO8AAAEHAEQAxP/zABMAsABFWLAILxuxCBs+WbAL3DAxAP//AEQAAAVcBbACBgC4AAD//wBP/iIFfgQ6AgYAzAAA//8AEAAABPMG/AImARgAAAEHAKsESQEOABYAsABFWLAPLxuxDx8+WbAR3LAV0DAx////8QAABBgF0AImARkAAAEHAKsD5f/iABYAsABFWLARLxuxERs+WbAT3LAX0DAx//8AT/5LCGQETgAmAFMAAAAHAF0EjgAA//8AZv5LCVwFxAAmADMAAAAHAF0FhgAA//8ASf46BH8FwwImANoAAAAHAbABkv+g//8ATf47A8QETQImAO4AAAAHAbABOf+h//8AZv4+BOsFxAImACcAAAAHAbAB1v+k//8AT/4+A/UETgImAEcAAAAHAbABSv+k//8ABwAABNYFsAIGAD0AAP//ACD+XwP1BDoCBgC8AAD//wCjAAABnwWwAgYALQAA//8AFgAAB5sHIwImANkAAAEHAKACHQE9ABMAsABFWLANLxuxDR8+WbAZ3DAxAP//AB4AAAZcBdkCJgDtAAABBwCgAYf/8wATALAARViwDS8bsQ0bPlmwGdwwMQD//wCjAAABnwWwAgYALQAA//8AEgAABUIHHAImACUAAAEHAKAA9gE2ABMAsABFWLAELxuxBB8+WbAO3DAxAP//AFr/7AP7BeYCJgBFAAABBwCg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ALAARViwBy8bsQcfPlmxDwn0sBXQMDEA//8AU//sBMgGfAImAEkAAAEGAbc97AAMALAIL7Ag3LAl0DAx////1QAABEwHtQImACkAAAEHAbYAiQEyABcAsABFWLAGLxuxBh8+WbEPCfSwFNAwMQD///+O/+wECwZ5AiYASQAAAQYBtkL2AAwAsAgvsB7csCXQMDH//wCUAAAEkgflAiYAKQAAAQcBtQCIARoADACwBi+wDNywE9AwMf//AFP/7ARLBqkCJgBJAAABBgG1Qd4ADACwCC+wHtywJdAwMf//AJQAAARMB90CJgApAAABBwG0AIkBDAAMALAGL7AM3LAT0DAx//8AU//sBAsGoQImAEkAAAEGAbRC0AAMALAIL7Ae3LAl0DAx//8AlP6eBEwHPgImACkAAAAnAJ0AiAE9AAcArATLAAr//wBT/pQECwYBAiYASQAAACYAnUEAAAcArASPAAD//wCjAAACEQfCAiYALQAAAQcAqgN4AUMACQCwAi+wBNwwMQD//wCPAAAB/QZ+AiYAjAAAAQcAqgNk//8ACQCwAi+wBNwwMQD//wCU/poBpwWwAiYALQAAAAcArAN4AAb//wB4/p4BkAXVAiYATQAAAAcArANcAAr//wBm/pQFHgXEAiYAMwAAAAcArAUdAAD//wBP/pIEPQROAiYAUwAAAAcArASd//7//wBm/+wFHge7AiYAMwAAAQcAqgUcATwACQCwFC+wH9wwMQD//wBP/+wEPQaFAiYAUwAAAQcAqgSYAAYACQCwBC+wG9wwMQD//wBm/+wFYQexAiYAMwAAAQcBtwDWASEADACwFC+wIdywJtAwMf//AE//7ATdBnwCJgBTAAABBgG3UuwADACwBC+wHdywItAwMf//ACf/7AUeB64CJgAzAAABBwG2ANsBKwAMALAUL7Af3LAm0DAx////o//sBD0GeQImAFMAAAEGAbZX9gAMALAEL7Ab3LAi0DAx//8AZv/sBR4H3gImADMAAAEHAbUA2gETAAwAsBQvsB/csCbQMDH//wBP/+wEYAapAiYAUwAAAQYBtVbeAAwAsAQvsBvcsCLQMDH//wBm/+wFHgfWAiYAMwAAAQcBtADbAQUADACwFC+wH9ywJtAwMf//AE//7AQ9BqECJgBTAAABBgG0V9AADACwBC+wG9ywItAwMf//AGb+lAUe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GzIcqB5aIBg63iFOIuA5MiUuOt463jb2Ot463iX4J5I5oChwKTIpwCoeKvg5KCuCOZAsTCx2Ldw23DBiMKAx0jOQNtwyVDLaMwQzWjOQN0A3+DakOCQztjbcOco5KDqMOow5KDaeM+A2njaeNp41UjV4NYI1jDWqNbw1zjXgNso7ijuKO4o7ijg+N0A3QDdAN0A3QDdAN0A2yjfYN9g32DfYOt463jreOt463juKO4o7ijuKO4o4HjgeOB44HjsAN7Y3tje2N7Y3tje2N7Y37jfuN+437jmWN/g3+Df4N/g3+DgkOCQ3QDe2N0A3tjdAN7Y2yjbKNso2yjuKN9g37jfYN+432DfuN9g37jfYN+463jmWOt463jreOt463jgeOow16jXqNeo16jreOZY63jmWOt45ljmWO4o3+DuKN/g7ijf4Nhg2GDYYOD44Pjg+OB44HjgeOB44HjgeNng7ADgkOwA2KjYqNio3QDfYOt463juKOwA3QDZMN9g2KjreOt46jDreOt47ijZWOD47ADkyOt47ADmWN/g4JDf4N9g5yjreOt44HjqMOow29jdANkw5yjfYOt463juKNlY2yjg+OTI3tjfuN/g23DgkOZA37jkoOCQ2eDZ4Nng7ADgkNp42njaeOt45ljdAN7Y32DfuNqQ4JDbKOwA4JDreOTI5kDreN0A3tjdAN7Y32DfuN+437jkyOZA7ijf4N/g23Db2OCQ29jgkNvY4JDkyOZA3QDe2N0A3tjdAN7Y3QDe2N0A3tjdAN7Y3QDe2N0A3tjdAN7Y3QDe2N0A3tjdAN7Y32DfuN9g37jfYN+432DfuN9g37jfYN+432DfuN9g37jreOt47ijf4O4o3+DuKN/g7ijf4O4o3+DuKN/g7ijf4N/g4HjgeOwA4JDsAOCQ7ADgkOow63jg+OTI5kDnKOSg5MjmQOZY5oDnKOow63jreOwA7igACAIsABAAEAAAABgAGAAEACwAMAAIAEwATAAQAJQAqAAUALAA2AAsAOAA/ABYARQBGAB4ASQBKACAATABMACIATwBPACMAUQBUACQAVgBWACgAWABYACkAWgBdACoAXwBfAC4AigCKAC8AnACcADAAsAC0ADEAtgC4ADYAugC6ADkAvAC8ADoAvwDAADsAwgDCAD0AxADEAD4AxgDNAD8A0QDRAEcA0wDdAEgA3wDfAFMA4QDjAFQA5QDuAFcA8ADwAGEA9QD3AGIA+gD7AGUA/QD/AGcBAgEEAGoBCQEJAG0BDAEMAG4BFwEZAG8BIQEhAHIBKwEtAHMBMAEwAHYBMgEyAHcBSQFJAHgBbAFtAHkBbwFxAHsBugG6AH4BvQG9AH8BxAHFAIAByAHIAIIBygHLAIMBzQHNAIUCKAIoAIYCKgIrAIcCRgJHAIkCSQJJAIsCSwJsAIwCbgJxAK4CdgJ7ALICgAKIALgCigKKAMECjAKMAMICjgKOAMMCkAKQAMQCkgKbAMUCpAKmAM8CqAKoANICqgKqANMCrAKsANQCrgKuANUCsQKxANYCswKzANcCtQK1ANgCtwK3ANkCuQK5ANoCuwK7ANsCvQLJANwCywLLAOkCzQLNAOoCzwLPAOsC2gLaAOwC3ALcAO0C3gLeAO4C4ALgAO8C4gLiAPAC5ALkAPEC5gLmAPIC6ALoAPMC6gLqAPQC7ALsAPUC7gLxAPYC8wLzAPoC9QL1APsDUgNXAPwDWgNpAQIDbANsARIDcANwARMDcgNyARQDdgN2ARUDeQN6ARYDfAOFARgDhwOJASIDiwOQASUDkgOTASsDlQOYAS0DngOfATEDoQOhATMDowOjATQDpQOoATUDqwOwATkDsgOyAT8DtgO3AUADvAO8AUIDvgPHAUMDygPLAU0DzQPQAU8D1wPYAVMD3APcAVUD3gPkAVYD6QPqAV0D7gQWAV8EGAQYAYgEGgQnAYkELwQvAZcEMgQyAZgENAQ0AZkEQARFAZoESARIAaAESgRKAaEETARMAaIETgRPAaMEVARXAaUEWgRaAakEXARdAaoEXwRfAawEYwRjAa0EZQRlAa4EaQRpAa8EqQSpAbAACgA4/8QA0f/EANX/xAEy/8QBOv/EAtr/xALc/8QC3v/EA43/xARM/8QAFQA6ABQAOwAmAD0AFgEYABQCZQAWAuwAJgLuABYC8AAWA1cAFgNmABYDaQAWA58AJgOhACYDowAmA6UAFgO2ABQDvgAWBEAAFgRCABYERAAWBGkAFgABABP/CADOABD+7gAS/u4AJf9AAC7/MAA4ABQARf/eAEf/6wBI/+sASf/rAEv/6wBT/+sAVf/rAFb/5gBZ/+oAWv/oAF3/6ACT/+sAmP/rAJr/6gCx/0AAs/9AALr/6wC8/+gAx//rAMj/6wDK/+oA0QAUANUAFAD2/+sBAv/rAQz/QAEX/+sBGf/oAR3/6wEh/+sBMgAUATn/6wE6ABQBS//rAUz/6wFW/+sBbv7uAXL+7gF2/u4Bd/7uAbr/wAJL/0ACTP9AAk3/QAJO/0ACT/9AAlD/QAJR/0ACZv/eAmf/3gJo/94Caf/eAmr/3gJr/94CbP/eAm3/6wJu/+sCb//rAnD/6wJx/+sCd//rAnj/6wJ5/+sCev/rAnv/6wJ8/+oCff/qAn7/6gJ//+oCgP/oAoH/6AKC/0ACg//eAoT/QAKF/94Chv9AAof/3gKJ/+sCi//rAo3/6wKP/+sCkf/rApP/6wKV/+sCl//rApn/6wKb/+sCnf/rAp//6wKh/+sCo//rArH/MALF/+sCx//rAsn/6wLaABQC3AAUAt4AFALh/+oC4//qAuX/6gLn/+oC6f/qAuv/6gLv/+gDUv9AA1r/QANq/+sDbv/qA3D/6wNy/+gDdf/qA3b/6wN3/+oDfv8wA4L/QAONABQDj//eA5D/6wOS/+sDlP/rA5X/6AOX/+sDnv/oA6b/6AOu/0ADr//eA7L/6wO3/+gDuP/rA73/6wO//+gDxP9AA8X/3gPG/0ADx//eA8v/6wPN/+sDzv/rA9j/6wPa/+sD3P/rA+D/6APi/+gD5P/oA+v/6wPu/0AD7//eA/D/QAPx/94D8v9AA/P/3gP0/0AD9f/eA/b/QAP3/94D+P9AA/n/3gP6/0AD+//eA/z/QAP9/94D/v9AA///3gQA/0AEAf/eBAL/QAQD/94EBP9ABAX/3gQH/+sECf/rBAv/6wQN/+sED//rBBH/6wQT/+sEFf/rBBv/6wQd/+sEH//rBCH/6wQj/+sEJf/rBCf/6wQp/+sEK//rBC3/6wQv/+sEMf/rBDP/6gQ1/+oEN//qBDn/6gQ7/+oEPf/qBD//6gRB/+gEQ//oBEX/6ARMABQAIAA4/98AOv/kADv/7AA9/90A0f/fANX/3wEY/+QBMv/fATr/3wG6AA4CZf/dAtr/3wLc/98C3v/fAuz/7ALu/90C8P/dA1f/3QNm/90Daf/dA43/3wOf/+wDof/sA6P/7AOl/90Dtv/kA77/3QRA/90EQv/dBET/3QRM/98Eaf/dABoAOP/OADr/7QA9/9AA0f/OANX/zgEY/+0BMv/OATr/zgJl/9AC2v/OAtz/zgLe/84C7v/QAvD/0ANX/9ADZv/QA2n/0AON/84Dpf/QA7b/7QO+/9AEQP/QBEL/0ARE/9AETP/OBGn/0AAQAC7/7gA5/+4CYf/uAmL/7gJj/+4CZP/uArH/7gLg/+4C4v/uAuT/7gLm/+4C6P/uAur/7gN+/+4EMv/uBDT/7gBKAAYAEAALABAADQAUAEEAEgBH/+gASP/oAEn/6ABL/+gAVf/oAGEAEwCT/+gAmP/oALr/6ADH/+gAyP/oAPb/6AEC/+gBHf/oASH/6AE5/+gBS//oAUz/6AFW/+gBbAAQAW0AEAFvABABcAAQAXEAEAJt/+gCbv/oAm//6AJw/+gCcf/oAon/6AKL/+gCjf/oAo//6AKR/+gCk//oApX/6AKX/+gCmf/oApv/6AKd/+gCn//oAqH/6AKj/+gDav/oA5D/6AOU/+gDl//oA6cAEAOoABADqwAQA7L/6AO4/+gDvf/oA8v/6APN/+gDzv/oA9r/6APr/+gEB//oBAn/6AQL/+gEDf/oBA//6AQR/+gEE//oBBX/6AQp/+gEK//oBC3/6AQx/+gAAgD1/9YBbf+YAD0AR//sAEj/7ABJ/+wAS//sAFX/7ACT/+wAmP/sALr/7ADH/+wAyP/sAPb/7AEC/+wBHf/sASH/7AE5/+wBS//sAUz/7AFW/+wCbf/sAm7/7AJv/+wCcP/sAnH/7AKJ/+wCi//sAo3/7AKP/+wCkf/sApP/7AKV/+wCl//sApn/7AKb/+wCnf/sAp//7AKh/+wCo//sA2r/7AOQ/+wDlP/sA5f/7AOy/+wDuP/sA73/7APL/+wDzf/sA87/7APa/+wD6//sBAf/7AQJ/+wEC//sBA3/7AQP/+wEEf/sBBP/7AQV/+wEKf/sBCv/7AQt/+wEMf/sABgAU//iARf/4gFtABgCd//iAnj/4gJ5/+ICev/iAnv/4gLF/+ICx//iAsn/4gNw/+IDdv/iA5L/4gPY/+ID3P/iBBv/4gQd/+IEH//iBCH/4gQj/+IEJf/iBCf/4gQv/+IABgAQ/4QAEv+EAW7/hAFy/4QBdv+EAXf/hAAQAC7/7AA5/+wCYf/sAmL/7AJj/+wCZP/sArH/7ALg/+wC4v/sAuT/7ALm/+wC6P/sAur/7AN+/+wEMv/sBDT/7AAeAAb/8gAL//IAWv/zAF3/8wC8//MA9f/1ARn/8wFs//IBbf/yAW//8gFw//IBcf/yAoD/8wKB//MC7//zA3L/8wOV//MDnv/zA6b/8wOn//IDqP/yA6v/8gO3//MDv//zA+D/8wPi//MD5P/zBEH/8wRD//MERf/zAD4AJ//zACv/8wAz//MANf/zAIP/8wCS//MAl//zALL/8wDDAA0A0v/zAQf/8wEW//MBGv/zARz/8wEe//MBIP/zATj/8wFV//MCKP/zAin/8wIr//MCLP/zAlL/8wJc//MCXf/zAl7/8wJf//MCYP/zAoj/8wKK//MCjP/zAo7/8wKc//MCnv/zAqD/8wKi//MCxP/zAsb/8wLI//MC+f/zA1b/8wNj//MDif/zA4z/8wO5//MDvP/zA9f/8wPZ//MD2//zBBr/8wQc//MEHv/zBCD/8wQi//MEJP/zBCb/8wQo//MEKv/zBCz/8wQu//MEMP/zBKn/8wA/ACf/5gAr/+YAM//mADX/5gCD/+YAkv/mAJf/5gCy/+YAt//CAMMAEADS/+YBB//mARb/5gEa/+YBHP/mAR7/5gEg/+YBOP/mAVX/5gIo/+YCKf/mAiv/5gIs/+YCUv/mAlz/5gJd/+YCXv/mAl//5gJg/+YCiP/mAor/5gKM/+YCjv/mApz/5gKe/+YCoP/mAqL/5gLE/+YCxv/mAsj/5gL5/+YDVv/mA2P/5gOJ/+YDjP/mA7n/5gO8/+YD1//mA9n/5gPb/+YEGv/mBBz/5gQe/+YEIP/mBCL/5gQk/+YEJv/mBCj/5gQq/+YELP/mBC7/5gQw/+YEqf/mADcAJf/kADz/0gA9/9MAsf/kALP/5ADD/+IA2f/SAQz/5AJL/+QCTP/kAk3/5AJO/+QCT//kAlD/5AJR/+QCZf/TAoL/5AKE/+QChv/kAu7/0wLw/9MDUv/kA1f/0wNa/+QDZv/TA2f/0gNp/9MDgv/kA47/0gOl/9MDrv/kA77/0wPB/9IDxP/kA8b/5APP/9ID6f/SA+7/5APw/+QD8v/kA/T/5AP2/+QD+P/kA/r/5AP8/+QD/v/kBAD/5AQC/+QEBP/kBED/0wRC/9MERP/TBE7/0gRW/9IEaf/TACcAEP9GABL/RgAl/80Asf/NALP/zQDG//IBDP/NAW7/RgFy/0YBdv9GAXf/RgJL/80CTP/NAk3/zQJO/80CT//NAlD/zQJR/80Cgv/NAoT/zQKG/80DUv/NA1r/zQOC/80Drv/NA8T/zQPG/80D7v/NA/D/zQPy/80D9P/NA/b/zQP4/80D+v/NA/z/zQP+/80EAP/NBAL/zQQE/80AAQDDAA4ArwBH/9wASP/cAEn/3ABL/9wAUf/BAFL/wQBT/9YAVP/BAFX/3ABZ/90AWv/hAF3/4QCT/9wAmP/cAJr/3QC6/9wAvP/hAL7/5gDA/8EAwf/rAML/6QDE//AAxf/nAMf/3ADI/9wAyf/jAMr/3QDL/84AzP/UAM3/2wDr/8EA7//BAPD/wQDy/8EA8//BAPT/wQD2/9wA9//BAPn/wQD6/8EA/f/BAP//wQEC/9wBBP/BARf/1gEZ/+EBHf/cASH/3AE1/8EBOf/cAUT/wQFJ/8EBS//cAUz/3AFW/9wCbf/cAm7/3AJv/9wCcP/cAnH/3AJ2/8ECd//WAnj/1gJ5/9YCev/WAnv/1gJ8/90Cff/dAn7/3QJ//90CgP/hAoH/4QKJ/9wCi//cAo3/3AKP/9wCkf/cApP/3AKV/9wCl//cApn/3AKb/9wCnf/cAp//3AKh/9wCo//cAr7/wQLA/8ECwv/BAsP/wQLF/9YCx//WAsn/1gLh/90C4//dAuX/3QLn/90C6f/dAuv/3QLv/+EDav/cA2z/wQNu/90DcP/WA3L/4QN1/90Ddv/WA3f/3QOQ/9wDkf/BA5L/1gOT/8EDlP/cA5X/4QOX/9wDmP/BA53/wQOe/+EDpv/hA63/wQOy/9wDs//BA7f/4QO4/9wDvf/cA7//4QPL/9wDzf/cA87/3APU/8ED1v/BA9j/1gPa/9wD3P/WA+D/4QPi/+ED5P/hA+j/wQPr/9wEB//cBAn/3AQL/9wEDf/cBA//3AQR/9wEE//cBBX/3AQb/9YEHf/WBB//1gQh/9YEI//WBCX/1gQn/9YEKf/cBCv/3AQt/9wEL//WBDH/3AQz/90ENf/dBDf/3QQ5/90EO//dBD3/3QQ//90EQf/hBEP/4QRF/+EESf/BBEv/wQRV/8EEYv/BBGT/wQRm/8EAdgAG/9oAC//aAEf/8ABI//AASf/wAEv/8ABV//AAWf/vAFr/3ABd/9wAk//wAJj/8ACa/+8Auv/wALz/3ADB/+wAwwAPAMX/6gDH//AAyP/wAMn/zgDK/+8Ay//nAPb/8AEC//ABGf/cAR3/8AEh//ABOf/wAUv/8AFM//ABVv/wAWz/2gFt/9oBb//aAXD/2gFx/9oCbf/wAm7/8AJv//ACcP/wAnH/8AJ8/+8Cff/vAn7/7wJ//+8CgP/cAoH/3AKJ//ACi//wAo3/8AKP//ACkf/wApP/8AKV//ACl//wApn/8AKb//ACnf/wAp//8AKh//ACo//wAuH/7wLj/+8C5f/vAuf/7wLp/+8C6//vAu//3ANq//ADbv/vA3L/3AN1/+8Dd//vA5D/8AOU//ADlf/cA5f/8AOe/9wDpv/cA6f/2gOo/9oDq//aA7L/8AO3/9wDuP/wA73/8AO//9wDy//wA83/8APO//AD2v/wA+D/3APi/9wD5P/cA+v/8AQH//AECf/wBAv/8AQN//AED//wBBH/8AQT//AEFf/wBCn/8AQr//AELf/wBDH/8AQz/+8ENf/vBDf/7wQ5/+8EO//vBD3/7wQ//+8EQf/cBEP/3ARF/9wARAAQAAwAEgAMAEf/5wBI/+cASf/nAEv/5wBV/+cAk//nAJj/5wC6/+cAwwAPAMf/5wDI/+cA9v/nAQL/5wEd/+cBIf/nATn/5wFL/+cBTP/nAVb/5wFuAAwBcgAMAXYADAF3AAwCbf/nAm7/5wJv/+cCcP/nAnH/5wKJ/+cCi//nAo3/5wKP/+cCkf/nApP/5wKV/+cCl//nApn/5wKb/+cCnf/nAp//5wKh/+cCo//nA2r/5wOQ/+cDlP/nA5f/5wOy/+cDuP/nA73/5wPL/+cDzf/nA87/5wPa/+cD6//nBAf/5wQJ/+cEC//nBA3/5wQP/+cEEf/nBBP/5wQV/+cEKf/nBCv/5wQt/+cEMf/nAAYAyf/qAOz/7gD1/9UA/f/tATP/7AFY/+wAAQD1/8AAAQDJACAAfgAGAAwACwAMAEf/6ABI/+gASf/oAEoADABL/+gAU//qAFX/6ABaAAsAXQALAJP/6ACY/+gAuv/oALwACwDD/5AAxQALAMf/6ADI/+gAyQAMAPb/6AEC/+gBF//qARkACwEd/+gBIf/oATn/6AFL/+gBTP/oAVb/6AFsAAwBbQAMAW8ADAFwAAwBcQAMAbr/vwG8/+4BwP/sAcj/7QHK/+wBzP/1Ac0ADgHPAA0B0gANAm3/6AJu/+gCb//oAnD/6AJx/+gCd//qAnj/6gJ5/+oCev/qAnv/6gKAAAsCgQALAon/6AKL/+gCjf/oAo//6AKR/+gCk//oApX/6AKX/+gCmf/oApv/6AKd/+gCn//oAqH/6AKj/+gCxf/qAsf/6gLJ/+oC7wALA2r/6ANw/+oDcgALA3b/6gOQ/+gDkv/qA5T/6AOVAAsDl//oA54ACwOmAAsDpwAMA6gADAOrAAwDsv/oA7cACwO4/+gDvf/oA78ACwPL/+gDzf/oA87/6APY/+oD2v/oA9z/6gPgAAsD4gALA+QACwPr/+gEB//oBAn/6AQL/+gEDf/oBA//6AQR/+gEE//oBBX/6AQb/+oEHf/qBB//6gQh/+oEI//qBCX/6gQn/+oEKf/oBCv/6AQt/+gEL//qBDH/6ARBAAsEQwALBEUACwABAPX/4gANAFz/7QBe/+0A7f/tAPX/wALy/+0C9P/tAvb/7QOW/+0Dwv/tA9D/7QPq/+0ET//tBFf/7QAMAFz/8gBe//IA7f/yAvL/8gL0//IC9v/yA5b/8gPC//ID0P/yA+r/8gRP//IEV//yAB8AWv/0AFz/8gBd//QAXv/zALz/9ADt//IBGf/0AoD/9AKB//QC7//0AvL/8wL0//MC9v/zA3L/9AOV//QDlv/yA57/9AOm//QDt//0A7//9APC//ID0P/yA+D/9APi//QD5P/0A+r/8gRB//QEQ//0BEX/9ARP//IEV//yAF0ABv/KAAv/ygA4/9IAOv/UADz/9AA9/9MAWv/mAFz/7wBd/+YAvP/mANH/0gDV/9IA2f/0AN3/7QDg/+EA5f/UAO3/7wD1/8kA/f/RAQj/5QEY/9QBGf/mAR//4wEy/9IBM//EATr/0gE8/+EBTf/UAU7/9QFP/+cBV/9kAVj/yQFs/8oBbf/KAW//ygFw/8oBcf/KAmX/0wKA/+YCgf/mAtr/0gLc/9IC3v/SAu7/0wLv/+YC8P/TA1f/0wNm/9MDZ//0A2n/0wNy/+YDgf/tA43/0gOO//QDlf/mA5b/7wOe/+YDpf/TA6b/5gOn/8oDqP/KA6v/ygO2/9QDt//mA77/0wO//+YDwf/0A8L/7wPP//QD0P/vA9//7QPg/+YD4f/tA+L/5gPj/+0D5P/mA+X/4QPp//QD6v/vBED/0wRB/+YEQv/TBEP/5gRE/9MERf/mBEz/0gRO//QET//vBFD/4QRS/+EEVv/0BFf/7wRp/9MAbAAG/8AAC//AADj/nQA6/8cAPP/wAD3/qwBR/9IAUv/SAFT/0gDA/9IA0f+dANP/9QDV/50A2f/wANz/9QDd/+oA4P/lAOX/wQDr/9IA7//SAPD/0gDy/9IA8//SAPT/0gD1/80A9//SAPn/0gD6/9IA/f/SAP//0gEE/9IBGP/HATL/nQEz/8wBNf/SATr/nQE8/+UBP//fAUT/0gFJ/9IBTf/OAU//6gFR//UBV/+eAVj/zgFs/8ABbf/AAW//wAFw/8ABcf/AAmX/qwJ2/9ICvv/SAsD/0gLC/9ICw//SAtr/nQLc/50C3v+dAu7/qwLw/6sDV/+rA2b/qwNn//ADaf+rA2z/0gOB/+oDjf+dA47/8AOR/9IDk//SA5j/0gOd/9IDpf+rA6f/wAOo/8ADq//AA63/0gOz/9IDtv/HA77/qwPB//ADz//wA9T/0gPW/9ID3//qA+H/6gPj/+oD5f/lA+j/0gPp//AD7P/1BED/qwRC/6sERP+rBEn/0gRL/9IETP+dBE7/8ARQ/+UEUv/lBFX/0gRW//AEYv/SBGT/0gRm/9IEZ//1BGn/qwBvAAb/sQAL/7EAOP+eADr/xQA8//IAPf+oAFH/zwBS/88AVP/PAFz/7wDA/88A0f+eANX/ngDZ//IA3f/sAOD/4QDl/8IA6//PAO3/7wDv/88A8P/PAPL/zwDz/88A9P/PAPX/xgD3/88A+f/PAPr/zwD9/88A///PAQT/zwEY/8UBMv+eATP/wAE1/88BOv+eATz/4QE//98BRP/PAUn/zwFN/80BT//oAVf/nwFY/8YBbP+xAW3/sQFv/7EBcP+xAXH/sQJl/6gCdv/PAr7/zwLA/88Cwv/PAsP/zwLa/54C3P+eAt7/ngLu/6gC8P+oA1f/qANm/6gDZ//yA2n/qANs/88Dgf/sA43/ngOO//IDkf/PA5P/zwOW/+8DmP/PA53/zwOl/6gDp/+xA6j/sQOr/7EDrf/PA7P/zwO2/8UDvv+oA8H/8gPC/+8Dz//yA9D/7wPU/88D1v/PA9//7APh/+wD4//sA+X/4QPo/88D6f/yA+r/7wRA/6gEQv+oBET/qARJ/88ES//PBEz/ngRO//IET//vBFD/4QRS/+EEVf/PBFb/8gRX/+8EYv/PBGT/zwRm/88Eaf+oAE0AOP++AFH/4QBS/+EAVP/hAFr/7wBd/+8AvP/vAMD/4QDR/74A1f++AOX/yQDr/+EA7//hAPD/4QDy/+EA8//hAPT/4QD1/98A9//hAPn/4QD6/+EA/f/hAP//4QEE/+EBCP/tARn/7wEf/+sBMv++ATP/3wE1/+EBOv++AT//6QFE/+EBSf/hAU7/9QFY/+ACdv/hAoD/7wKB/+8Cvv/hAsD/4QLC/+ECw//hAtr/vgLc/74C3v++Au//7wNs/+EDcv/vA43/vgOR/+EDk//hA5X/7wOY/+EDnf/hA57/7wOm/+8Drf/hA7P/4QO3/+8Dv//vA9T/4QPW/+ED4P/vA+L/7wPk/+8D6P/hBEH/7wRD/+8ERf/vBEn/4QRL/+EETP++BFX/4QRi/+EEZP/hBGb/4QBkADj/5gA6/+cAPP/yAD3/5wBR/9YAUv/WAFT/1gBc//EAwP/WANH/5gDV/+YA2f/yAN3/7gDg/+gA5f/mAOv/1gDt//EA7//WAPD/1gDy/9YA8//WAPT/1gD1/9AA9//WAPn/1gD6/9YA/f/WAP//1gEE/9YBGP/nATL/5gEz/84BNf/WATr/5gE8/+gBRP/WAUn/1gFN/+cBT//tAVf/5gFY/9ACZf/nAnb/1gK+/9YCwP/WAsL/1gLD/9YC2v/mAtz/5gLe/+YC7v/nAvD/5wNX/+cDZv/nA2f/8gNp/+cDbP/WA4H/7gON/+YDjv/yA5H/1gOT/9YDlv/xA5j/1gOd/9YDpf/nA63/1gOz/9YDtv/nA77/5wPB//IDwv/xA8//8gPQ//ED1P/WA9b/1gPf/+4D4f/uA+P/7gPl/+gD6P/WA+n/8gPq//EEQP/nBEL/5wRE/+cESf/WBEv/1gRM/+YETv/yBE//8QRQ/+gEUv/oBFX/1gRW//IEV//xBGL/1gRk/9YEZv/WBGn/5wCTACUAEAAn/+gAK//oADP/6AA1/+gAOP/gADr/4AA9/98Ag//oAJL/6ACX/+gAsQAQALL/6ACzABAA0f/gANL/6ADTABAA1f/gANgAFADcABAA4P/hAOX/4ADsABMA8QAQAPj/4AEDABABB//oAQwAEAEW/+gBGP/gARr/6AEc/+gBHv/oASD/6AEy/+ABOP/oATr/4AE8/+EBPf/gAUD/4QFF/+kBTf/fAU//3gFRABABVf/oAVf/3wFZ//ICKP/oAin/6AIr/+gCLP/oAksAEAJMABACTQAQAk4AEAJPABACUAAQAlEAEAJS/+gCXP/oAl3/6AJe/+gCX//oAmD/6AJl/98CggAQAoQAEAKGABACiP/oAor/6AKM/+gCjv/oApz/6AKe/+gCoP/oAqL/6ALE/+gCxv/oAsj/6ALa/+AC3P/gAt7/4ALu/98C8P/fAvn/6ANSABADVv/oA1f/3wNaABADY//oA2b/3wNp/98DggAQA4n/6AOM/+gDjf/gA6X/3wOuABADtv/gA7n/6AO8/+gDvv/fA8QAEAPGABAD1//oA9n/6APb/+gD5f/hA+b/4APsABAD7QAQA+4AEAPwABAD8gAQA/QAEAP2ABAD+AAQA/oAEAP8ABAD/gAQBAAAEAQCABAEBAAQBBr/6AQc/+gEHv/oBCD/6AQi/+gEJP/oBCb/6AQo/+gEKv/oBCz/6AQu/+gEMP/oBED/3wRC/98ERP/fBEz/4ARQ/+EEUf/gBFL/4QRT/+AEZwAQBGgAEARp/98Eqf/oADIAG//yADj/8QA6//QAPP/0AD3/8ADR//EA0//1ANX/8QDZ//QA3P/1AN3/8wDl//EBGP/0ATL/8QE6//EBTf/yAU//8gFR//UBV//yAmX/8ALa//EC3P/xAt7/8QLu//AC8P/wA1f/8ANm//ADZ//0A2n/8AOB//MDjf/xA47/9AOl//ADtv/0A77/8APB//QDz//0A9//8wPh//MD4//zA+n/9APs//UEQP/wBEL/8ARE//AETP/xBE7/9ARW//QEZ//1BGn/8ABmACUADwA4/+YAOv/mADwADgA9/+YAsQAPALMADwDR/+YA0wAOANX/5gDYABMA2QAOANwADgDdAAsA4P/lAOX/5gDm//QA7AASAPEADwD1/+cA+P/oAP3/5wEDAA8BDAAPARj/5gEy/+YBM//nATr/5gE8/+UBPf/oAU3/5gFP/+YBUQAOAVf/5gFY/+cCSwAPAkwADwJNAA8CTgAPAk8ADwJQAA8CUQAPAmX/5gKCAA8ChAAPAoYADwLa/+YC3P/mAt7/5gLu/+YC8P/mA1IADwNX/+YDWgAPA2b/5gNnAA4Daf/mA4EACwOCAA8Djf/mA44ADgOl/+YDrgAPA7b/5gO+/+YDwQAOA8QADwPGAA8DzwAOA98ACwPhAAsD4wALA+X/5QPm/+gD6QAOA+wADgPtAA8D7gAPA/AADwPyAA8D9AAPA/YADwP4AA8D+gAPA/wADwP+AA8EAAAPBAIADwQEAA8EQP/mBEL/5gRE/+YETP/mBE4ADgRQ/+UEUf/oBFL/5QRT/+gEVgAOBGcADgRoAA8Eaf/mADcABv+/AAv/vwA4/58AOv/JAD3/rQDR/58A1f+fAN3/7ADg/+YA5f/EAPX/zQD9/9UBGP/JATL/nwEz/8wBOv+fATz/5gE//98BTf/RAU//7AFX/6EBWP/PAWz/vwFt/78Bb/+/AXD/vwFx/78CZf+tAtr/nwLc/58C3v+fAu7/rQLw/60DV/+tA2b/rQNp/60Dgf/sA43/nwOl/60Dp/+/A6j/vwOr/78Dtv/JA77/rQPf/+wD4f/sA+P/7APl/+YEQP+tBEL/rQRE/60ETP+fBFD/5gRS/+YEaf+tADAAOP/jADz/5QA9/+QA0f/jANP/5QDV/+MA2P/iANn/5QDc/+UA3f/pAPH/6gED/+oBMv/jATr/4wFR/+UBV//kAmX/5ALa/+MC3P/jAt7/4wLu/+QC8P/kA1f/5ANm/+QDZ//lA2n/5AOB/+kDjf/jA47/5QOl/+QDvv/kA8H/5QPP/+UD3//pA+H/6QPj/+kD6f/lA+z/5QPt/+oEQP/kBEL/5ARE/+QETP/jBE7/5QRW/+UEZ//lBGj/6gRp/+QAIwA4/+IAPP/kANH/4gDT/+QA1f/iANj/4QDZ/+QA3P/kAN3/6QDs/+QA8f/rAQP/6wEy/+IBOv/iAVH/5ALa/+IC3P/iAt7/4gNn/+QDgf/pA43/4gOO/+QDwf/kA8//5APf/+kD4f/pA+P/6QPp/+QD7P/kA+3/6wRM/+IETv/kBFb/5ARn/+QEaP/rABcAOP/rAD3/8wDR/+sA1f/rATL/6wE6/+sCZf/zAtr/6wLc/+sC3v/rAu7/8wLw//MDV//zA2b/8wNp//MDjf/rA6X/8wO+//MEQP/zBEL/8wRE//METP/rBGn/8wA2AFH/7wBS/+8AVP/vAFz/8ADA/+8A6//vAOz/7gDt//AA7//vAPD/7wDy/+8A8//vAPT/7wD1/+4A9//vAPn/7wD6/+8A/f/vAP//7wEE/+8BCP/0AR//8QEz/+8BNf/vAUT/7wFJ/+8BWP/vAnb/7wK+/+8CwP/vAsL/7wLD/+8DbP/vA5H/7wOT/+8Dlv/wA5j/7wOd/+8Drf/vA7P/7wPC//AD0P/wA9T/7wPW/+8D6P/vA+r/8ARJ/+8ES//vBE//8ARV/+8EV//wBGL/7wRk/+8EZv/vACIABv/yAAv/8gBa//UAXf/1ALz/9QD1//QA/f/0AQj/9QEZ//UBM//1AVj/9QFs//IBbf/yAW//8gFw//IBcf/yAoD/9QKB//UC7//1A3L/9QOV//UDnv/1A6b/9QOn//IDqP/yA6v/8gO3//UDv//1A+D/9QPi//UD5P/1BEH/9QRD//UERf/1ADIAUf/uAFL/7gBU/+4AwP/uAOv/7gDsABQA7//uAPD/7gDy/+4A8//uAPT/7gD1/+0A9//uAPj/7QD5/+4A+v/uAPv/0AD9/+4A///uAQT/7gEz/+0BNf/uAT3/7QFE/+4BSf/uAVj/7QJ2/+4Cvv/uAsD/7gLC/+4Cw//uA2z/7gOR/+4Dk//uA5j/7gOd/+4Drf/uA7P/7gPU/+4D1v/uA+b/7QPo/+4ESf/uBEv/7gRR/+0EU//tBFX/7gRi/+4EZP/uBGb/7gAKAAb/9QAL//UBbP/1AW3/9QFv//UBcP/1AXH/9QOn//UDqP/1A6v/9QBZAEf/8ABI//AASf/wAEv/8ABT/8cAVf/wAJP/8ACY//AAuv/wAMf/8ADI//AA9v/wAQL/8AEX/8cBG//rAR3/8AEh//ABOf/wAUv/8AFM//ABVv/wAbz/6wHA/+kByP/rAcr/6wJt//ACbv/wAm//8AJw//ACcf/wAnf/xwJ4/8cCef/HAnr/xwJ7/8cCif/wAov/8AKN//ACj//wApH/8AKT//AClf/wApf/8AKZ//ACm//wAp3/8AKf//ACof/wAqP/8ALF/8cCx//HAsn/xwNq//ADcP/HA3b/xwOQ//ADkv/HA5T/8AOX//ADsv/wA7j/8AO9//ADy//wA83/8APO//AD2P/HA9r/8APc/8cD6//wBAf/8AQJ//AEC//wBA3/8AQP//AEEf/wBBP/8AQV//AEG//HBB3/xwQf/8cEIf/HBCP/xwQl/8cEJ//HBCn/8AQr//AELf/wBC//xwQx//AAoQAGAA0ACwANAEX/8ABH/8AASP/AAEn/wABKAA0AS//AAFP/4gBV/8AAWgALAF0ACwCT/8AAmP/AALr/wAC8AAsAxv/WAMf/wADI/8AAy//VAOz/yADx/9cA9v/AAQL/wAED/9cBF//iARkACwEb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AD4AEgBFAEcAGQBJAEkAHABMAEwAHQBRAFQAHgBWAFYAIgBaAFoAIwBcAF4AJACKAIoAJwCwALMAKAC8ALwALADAAMAALQDGAMYALgDTANQALwDWANYAMQDZANkAMgDbAN0AMwDfAN8ANgDhAOEANwDjAOMAOADlAOUAOQDrAOsAOgDtAO0AOwD2APYAPAD7APsAPQD9AP4APgEDAQQAQAEJAQkAQgEMAQwAQwEXARkARAErAS0ARwEwATAASgEyATIASwFJAUkATAFsAXIATQF2AXcAVAIoAigAVgIqAisAVwJGAkcAWQJJAkkAWwJLAnEAXAJ2AnsAgwKAApAAiQKSApsAmgKkAqYApAKoAqgApwKqAqoAqAKsAqwAqQKuAq4AqgKxArEAqwKzArMArAK1ArUArQK3ArcArgK5ArkArwK7ArsAsAK9AskAsQLLAssAvgLNAs0AvwLPAs8AwALaAtoAwQLcAtwAwgLeAt4AwwLgAuAAxALiAuIAxQLkAuQAxgLmAuYAxwLoAugAyALqAuoAyQLsAuwAygLuAvYAywNSA1cA1ANaA2kA2gNsA2wA6gNwA3AA6wNyA3IA7AN2A3YA7QN5A3oA7gN8A4UA8AOHA4kA+gOLA5AA/QOSA5gBAwOeA58BCgOhA6EBDAOjA6MBDQOlA6gBDgOrA7ABEgOyA7IBGAO2A7cBGQO8A8cBGwPKA8sBJwPNA9ABKQPXA9gBLQPcA9wBLwPeA+QBMAPpA+oBNwPuBBYBOQQYBBgBYgQaBCcBYwQvBC8BcQQyBDIBcgQ0BDQBcwRABEUBdARIBEgBegRKBEoBewRMBEwBfAROBE8BfQRUBFcBfwRaBFoBgwRcBF0BhARfBF8BhgRjBGMBhwRlBGUBiARpBGkBiQSpBKkBigACAU4AEAAQAAEAEgASAAEAJQAlAAIAJgAmAAMAJwAnAAQAKAAoAAUAKQApAAYALAAtAAcALgAuAAgALwAvAAkAMAAwAAoAMQAyAAcAMwAzAAUANAA0AAsAOAA4AAwAOQA5AAgAOgA6AA0AOwA7AA4APAA8AA8APQA9ABAAPgA+ABEARQBFABIARgBGABMARwBHABQASQBJABUATABMABYAUQBSABYAUwBTABcAVABUABMAVgBWABgAWgBaABkAXABcABoAXQBdABkAXgBeABsAigCKABMAsACwABwAsQCxAAIAsgCyAAUAswCzAAIAvAC8ABkAwADAABYAxgDGABMA0wDUAB0A1gDWAAcA2QDZAA8A2wDcAAcA3QDdAB4A3wDfAAcA4QDhAAcA4wDjAB0A5QDlAB0A6wDrAB8A7QDtABoA9gD2ABMA+wD7ACAA/QD9ACAA/gD+ABMBAwEEACABCQEJACABDAEMAAIBFwEXABcBGAEYAA0BGQEZABkBKwErABMBLAEsABwBLQEtAB8BMAEwAAkBMgEyAAkBSQFJAB8BbgFuAAEBcgFyAAEBdgF3AAECKAIoAAQCKgIrAAUCRgJHAAUCSQJJAAwCSwJRAAICUgJSAAQCUwJWAAYCVwJbAAcCXAJgAAUCYQJkAAgCZQJlABACZgJsABICbQJtABQCbgJxABUCdgJ2ABYCdwJ7ABcCgAKBABkCggKCAAICgwKDABIChAKEAAIChQKFABIChgKGAAIChwKHABICiAKIAAQCiQKJABQCigKKAAQCiwKLABQCjAKMAAQCjQKNABQCjgKOAAQCjwKPABQCkAKQAAUCkgKSAAYCkwKTABUClAKUAAYClQKVABUClgKWAAYClwKXABUCmAKYAAYCmQKZABUCmgKaAAYCmwKbABUCpAKkAAcCpQKlABYCpgKmAAcCqAKoAAcCqgKqAAcCrAKsAAcCrgKuAAcCsQKxAAgCswKzAAkCtQK1AAoCtwK3AAoCuQK5AAoCuwK7AAoCvQK9AAcCvgK+ABYCvwK/AAcCwALAABYCwQLBAAcCwgLDABYCxALEAAUCxQLFABcCxgLGAAUCxwLHABcCyALIAAUCyQLJABcCywLLABgCzQLNABgCzwLPABgC2gLaAAwC3ALcAAwC3gLeAAwC4ALgAAgC4gLiAAgC5ALkAAgC5gLmAAgC6ALoAAgC6gLqAAgC7ALsAA4C7gLuABAC7wLvABkC8ALwABAC8QLxABEC8gLyABsC8wLzABEC9AL0ABsC9QL1ABEC9gL2ABsDUgNSAAIDUwNTAAYDVANVAAcDVgNWAAUDVwNXABADWgNaAAIDWwNbAAMDXANcAAYDXQNdABEDXgNfAAcDYANgAAkDYQNiAAcDYwNjAAUDZANkAAsDZQNlAAwDZgNmABADZwNnAA8DaANoAAcDaQNpABADbANsABYDcANwABcDcgNyABkDdgN2ABcDeQN5AAYDegN6ABwDfAN9AAcDfgN+AAgDfwOAAAkDgQOBAB4DggOCAAIDgwODAAMDhAOEABwDhQOFAAYDhwOIAAcDiQOJAAUDiwOLAAsDjAOMAAQDjQONAAwDjgOOAA8DjwOPABIDkAOQABUDkgOSABcDkwOTABMDlAOUABQDlQOVABkDlgOWABoDlwOXABUDmAOYAB8DngOeABkDnwOfAA4DoQOhAA4DowOjAA4DpQOlABADpgOmABkDrAOsAAcDrQOtABYDrgOuAAIDrwOvABIDsAOwAAYDsgOyABUDtgO2AA0DtwO3ABkDvAO8AAQDvQO9ABQDvgO+ABADvwO/ABkDwAPAAAcDwQPBAA8DwgPCABoDwwPDAAcDxAPEAAIDxQPFABIDxgPGAAIDxwPHABIDygPKAAYDywPLABUDzQPOABUDzwPPAA8D0APQABoD1wPXAAUD2APYABcD3APcABcD3gPeABMD3wPfAB4D4APgABkD4QPhAB4D4gPiABkD4wPjAB4D5APkABkD6QPpAA8D6gPqABoD7gPuAAID7wPvABID8APwAAID8QPxABID8gPyAAID8wPzABID9AP0AAID9QP1ABID9gP2AAID9wP3ABID+AP4AAID+QP5ABID+gP6AAID+wP7ABID/AP8AAID/QP9ABID/gP+AAID/wP/ABIEAAQAAAIEAQQBABIEAgQCAAIEAwQDABIEBAQEAAIEBQQFABIEBgQGAAYEBwQHABUECAQIAAYECQQJABUECgQKAAYECwQLABUEDAQMAAYEDQQNABUEDgQOAAYEDwQPABUEEAQQAAYEEQQRABUEEgQSAAYEEwQTABUEFAQUAAYEFQQVABUEFgQWAAcEGAQYAAcEGgQaAAUEGwQbABcEHAQcAAUEHQQdABcEHgQeAAUEHwQfABcEIAQgAAUEIQQhABcEIgQiAAUEIwQjABcEJAQkAAUEJQQlABcEJgQmAAUEJwQnABcELwQvABcEMgQyAAgENAQ0AAgEQARAABAEQQRBABkEQgRCABAEQwRDABkERAREABAERQRFABkESARIAAkESgRKAAcETARMAAwETgROAA8ETwRPABoEVARUABwEVQRVAB8EVgRWAA8EVwRXABoEWgRaABYEXARcAB0EXQRdABwEXwRfAAkEYwRjAAcEZQRlAAcEaQRpABAEqQSpAAUAAgFtAAYABgABAAsACwABABAAEAAWABEAEQAZABIAEgAWACUAJQACACcAJwAIACsAKwAIAC4ALgAaADMAMwAIADUANQAIADcANwAbADgAOAAJADkAOQAKADoAOgALADsAOwAMADwAPAAXAD0APQANAD4APgAYAEUARQADAEcASQAEAEsASwAEAFEAUgAFAFMAUwAGAFQAVAAFAFUAVQAEAFcAVwAHAFkAWQAOAFoAWgAPAFwAXAAcAF0AXQAPAF4AXgAQAIMAgwAIAJIAkgAIAJMAkwAEAJcAlwAIAJgAmAAEAJoAmgAOALEAsQACALIAsgAIALMAswACALoAugAEALwAvAAPAMAAwAAFAMcAyAAEAMoAygAOANEA0QAJANIA0gAIANMA0wARANUA1QAJANkA2QAXANwA3AARAN0A3QAVAOAA4AASAOsA6wAFAO0A7QAcAO8A8AAFAPEA8QATAPIA9AAFAPYA9gAEAPcA9wAFAPgA+AAUAPkA+gAFAP0A/QAFAP8A/wAFAQIBAgAEAQMBAwATAQQBBAAFAQcBBwAIAQwBDAACARYBFgAIARcBFwAGARgBGAALARkBGQAPARoBGgAIARwBHAAIAR0BHQAEAR4BHgAIASABIAAIASEBIQAEATIBMgAJATUBNQAFATgBOAAIATkBOQAEAToBOgAJAUQBRAAFAUkBSQAFAUsBTAAEAVEBUQARAVUBVQAIAVYBVgAEAWkBagAZAWwBbQABAW4BbgAWAW8BcQABAXIBcgAWAXYBdwAWAigCKQAIAisCLAAIAkUCRQAZAksCUQACAlICUgAIAlwCYAAIAmECZAAKAmUCZQANAmYCbAADAm0CcQAEAnYCdgAFAncCewAGAnwCfwAOAoACgQAPAoICggACAoMCgwADAoQChAACAoUChQADAoYChgACAocChwADAogCiAAIAokCiQAEAooCigAIAosCiwAEAowCjAAIAo0CjQAEAo4CjgAIAo8CjwAEApECkQAEApMCkwAEApUClQAEApcClwAEApkCmQAEApsCmwAEApwCnAAIAp0CnQAEAp4CngAIAp8CnwAEAqACoAAIAqECoQAEAqICogAIAqMCowAEArECsQAaAr4CvgAFAsACwAAFAsICwwAFAsQCxAAIAsUCxQAGAsYCxgAIAscCxwAGAsgCyAAIAskCyQAGAtAC0AAbAtEC0QAH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ALgAuWMyc2MEWGMyc2MEXmMyc2MEZGMyc2MEamMyc2MEamMyc2MEamMyc2MEamMyc2MEamMyc2MEamMyc2MEamNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGNjbXAEcGRsaWcEeGRsaWcEfmRsaWcEhGRsaWcEimRsaWcEimRsaWcEimRsaWcEimRsaWcEimRsaWcEimRsaWcEimRub20EkGRub20ElmRub20EnGRub20EomRub20EomRub20EomRub20EomRub20EomRub20EomRub20EomZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGZyYWMEqGxpZ2EEsmxpZ2EEumxudW0EwGxudW0ExmxudW0EzGxudW0E0mxudW0E0mxudW0E0mxudW0E0mxudW0E0mxudW0E0mxudW0E0mxvY2wE2GxvY2wE3mxvY2wE5G51bXIE6m51bXIE8G51bXIE9m51bXIE/G51bXIE/G51bXIE/G51bXIE/G51bXIE/G51bXIE/G51bXIE/G9udW0FAm9udW0FCG9udW0FDm9udW0FFG9udW0FFG9udW0FFG9udW0FFG9udW0FFG9udW0FFG9udW0FFHBudW0FGnBudW0FIHBudW0FJnBudW0FLHBudW0FLHBudW0FLHBudW0FLHBudW0FLHBudW0FLHBudW0FLHNtY3AFMnNtY3AFOHNtY3AFPnNtY3AFRHNtY3AFRHNtY3AFRHNtY3AFRHNtY3AFRHNtY3AFRHNtY3AFRHNzMDEFSnNzMDEFUHNzMDEFVnNzMDEFXHNzMDEFXHNzMDEFXHNzMDEFXHNzMDEFXHNzMDEFXHNzMDEFXHNzMDIFYnNzMDIFaHNzMDIFbnNzMDIFdHNzMDIFdHNzMDIFdHNzMDIFdHNzMDIFdHNzMDIFdHNzMDIFdHNzMDMFenNzMDMFgHNzMDMFhnNzMDMFjHNzMDMFjHNzMDMFjHNzMDMFjHNzMDMFjHNzMDMFjHNzMDMFjHNzMDQFknNzMDQFmHNzMDQFnnNzMDQFpHNzMDQFpHNzMDQFpHNzMDQFpHNzMDQFpHNzMDQFpHNzMDQFpHNzMDUFqnNzMDUFsHNzMDUFtnNzMDUFvHNzMDUFvHNzMDUFvHNzMDUFvHNzMDUFvHNzMDUFvHNzMDUFvHNzMDYFwnNzMDYFyHNzMDYFznNzMDYF1HNzMDYF1HNzMDYF1HNzMDYF1HNzMDYF1HNzMDYF1HNzMDYF1HNzMDcF2nNzMDcF4HNzMDcF5nNzMDcF7HNzMDcF7HNzMDcF7HNzMDcF7HNzMDcF7HNzMDcF7HNzMDcF7HRudW0F8nRudW0F+HRudW0F/nRudW0GBHRudW0GBHRudW0GBHRudW0GBHRudW0GBHRudW0GBHRudW0GBAAAAAEAAQAAAAEAAwAAAAEAAgAAAAEAAAAAAAIACAAJAAAAAQAOAAAAAQAQAAAAAQAPAAAAAQANAAAAAQBDAAAAAQBFAAAAAQBEAAAAAQBCAAAAAwA/AEAAQQAAAAIAEQASAAAAAQASAAAAAQA8AAAAAQA+AAAAAQA9AAAAAQA7AAAAAQAKAAAAAQAMAAAAAQALAAAAAQBHAAAAAQBJAAAAAQBIAAAAAQBGAAAAAQAwAAAAAQAyAAAAAQAxAAAAAQAvAAAAAQA4AAAAAQA6AAAAAQA5AAAAAQA3AAAAAQAFAAAAAQAHAAAAAQAGAAAAAQAEAAAAAQAUAAAAAQAWAAAAAQAVAAAAAQATAAAAAQAYAAAAAQAaAAAAAQAZAAAAAQAXAAAAAQAcAAAAAQAeAAAAAQAdAAAAAQAbAAAAAQAgAAAAAQAiAAAAAQAhAAAAAQAfAAAAAQAkAAAAAQAmAAAAAQAlAAAAAQAjAAAAAQAoAAAAAQAqAAAAAQApAAAAAQAnAAAAAQAsAAAAAQAuAAAAAQAtAAAAAQArAAAAAQA0AAAAAQA2AAAAAQA1AAAAAQAzAEsAmACYAJgAmAQmBCYEJgQmBxQHwA5QDlAOZg6IDogOiA6IDr4O5A8SDxIPEg8SDyYPJg8mDyYPOg86DzoPOg9OD04PTg9OD2APYA9gD2APeg96D3oPeg+8D7wPvA+8D9oP2g/aD9oP+A/4D/gP+BAqECoQKhAqEFwQXBBcEFwQjhCiENoQzBDMEMwQzBDaENoQ2hDaEQYAAQAAAAEACAACAcQA3wHnAboBuwG8Ab0BvgG/AcABwQHCAcMBxAHFAcYBxwHIAckBygHLAcwBzQHOAc8B0AHRAdIB0wHoAekCQwI7AeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgACAQTcAgICAwIEAgUCBgIHAggCCQIKAgsCLwIPAhACEQIUAhUCFgIXAhgCGQIbAhwCHgIdAvsC/AL9Av4C/wMAAwEDAgMDAwQDBQMGAwcDCAMJAwoDCwMMAw0DDgMPAxADEQMSAxMDFAMVAxYDFwMYAxkDGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRQNEA0YDRwNIA0kDSgNLA0wDTQNOA08DUANRBKoEqwSsBK0ErgSvBLAEsQSyBLMEtAS1BLYEtwS4BLkEugS7BLwEvQS+BL8EwATBBMIEwwTEBMUB/wTGBMcEyATJBMoEywTMBM0EzgTPBNAE0QTSBNME1ATVBNcE2ATaAhoE2wIOBNYCEwINBNkCDAISAAEA3wAIACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgBlAGcAhQCSALAAsQCyALMAtAC1ALYAtwC4ALkA0QDSANMA1ADVANYA1wDYANkA2gDbANwA3QDeAN8A4ADhAOIA4wDkAOUA5gDnAOgBLAEwATIBOAE6ATwBPgE/AUUBRgF/AYUBigGNAkYCRwJJAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXgJfAmACYQJiAmMCZAJlAoIChAKGAogCigKMAo4CkAKSApQClgKYApoCnAKeAqACogKkAqYCqAKqAqwCrgKxArMCtQK3ArkCuwK9Ar8CwQLEAsYCyALKAswCzgLQAtIC1ALYAtoC3ALeAuAC4gLkAuYC6ALqAuwC7gLwAvEC8wL1A1IDUwNUA1UDVgNXA1gDWgNbA1wDXQNeA18DYANhA2MDZANlA2YDZwNoA2kDeQN6A3sDfAN9A34DfwOAA4EDggODA4QDhQOGA4cDiAOJA4oDiwOMA40DjgO6A7wDvgPTA9kD3wRIBEoETgRWBFgEXQRpAAEAAAABAAgAAgF0ALcBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAvwDLwI7AfoEyQTKAfsB/AH9Af4B/wIABM0EzgTQBNME3AICAgMCBAIFAgYCBwIIAgkCCgILAfQB9QH2AfcB+AH5Ai8CDwIQAhECFAIVAhcCGQL9Av4C/wMAAwEDAgMDAwQDBQMGAwcDCAMJAwoDCwMMAw0DDgMPAxADEQMSAxMDFAMVAxYDFwMYA04DGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRQNEA0YDRwNIA0kDSgNLA0wDTQNPA1ADUQTIBMsEzATPBNEE0gIBBNQEwATBBMIEwwTEBMUExgTHBNUE1wTYAhgE2gIaBNsC+wIOBNYCEwINBNkCFgIMAhIAAQC3AEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgCHAIwAkwDpAOoA6wDsAO0A7gDvAPAA8QDyAPMA9AD1APYA9wD4APkA+gD7APwA/QD+AP8BAAEBAQIBAwEEAQUBBgEtATEBMwE5ATsBPQFAAUcCSgJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoMChQKHAokCiwKNAo8CkQKTApUClwKZApsCnQKfAqECowKlAqcCqQKrAq0CsgK0ArYCuAK6ArwCvgLAAsICxQLHAskCywLNAs8C0QLTAtUC2QLbAt0C3wLhAuMC5QLnAukC6wLtAu8C8gL0AvYDjwOQA5EDkgOTA5QDlQOWA5cDmAOZA5oDmwOcA50DngO7A70DvwPNA9QD2gPgBEYESQRLBE8EVwRZBFoEXgRqAAYAAAAGABIAKgBCAFoAcgCKAAMAAAABABIAAQCQAAEAAABKAAEAAQBNAAMAAAABABIAAQB4AAEAAABKAAEAAQBOAAMAAAABABIAAQBgAAEAAABKAAEAAQKtAAMAAAABABIAAQBIAAEAAABKAAEAAQOaAAMAAAABABIAAQAwAAEAAABKAAEAAQOcAAMAAAABABIAAQAYAAEAAABKAAEAAQQZAAIAAQCnAKsAAAAEAAAAAQAIAAEGHgA2AHIApACuALgAygD8AQ4BGAFKAWQBfgGQAboB7AH2AhgCMgJEAnYCiAKiAswC3gMQAxoDJAM2A2gDcgN8A4YDoAO6A8wD9gQoBDIEVARuBIAEsgTEBN4FCAUaBSQFLgU4BUIFbAWWBcAF6gYUAAYADgAUABoAIAAmACwCSwACAKcCTAACAKgCTgACAKkD8AACAKoEegACAKsD7gACAKwAAQAEBIcAAgCsAAEABAKIAAIAqAACAAYADASJAAIArASLAAIBogAGAA4AFAAaACAAJgAsAlMAAgCnAlQAAgCoBAoAAgCpBAgAAgCqBHwAAgCrBAYAAgCsAAIABgAMBHYAAgCoAqIAAgGiAAEABASNAAIArAAGAA4AFAAaACAAJgAsAlcAAgCnAlgAAgCoAqYAAgCpBBYAAgCqBH4AAgCrBBgAAgCsAAMACAAOABQEjwACAKgEkQACAKwCswACAaIAAwAIAA4AFAK1AAIAqASTAAIArAK3AAIBogACAAYADAOsAAIAqASVAAIArAAFAAwAEgAYAB4AJAR4AAIApwK9AAIAqAJbAAIAqQSXAAIArAK/AAIBogAGAA4AFAAaACAAJgAsAlwAAgCnAl0AAgCoAl8AAgCpBBwAAgCqBIAAAgCrBBoAAgCsAAEABASZAAIAqAAEAAoAEAAWABwCygACAKgEggACAKsEmwACAKwCzAACAaIAAwAIAA4AFALQAAIAqASdAAIArALWAAIBogACAAYADASfAAIArALaAAIBogAGAA4AFAAaACAAJgAsAmEAAgCnAmIAAgCoAuAAAgCpBDQAAgCqBIQAAgCrBDIAAgCsAAIABgAMBKEAAgCpBKMAAgCsAAMACAAOABQDnwACAKcDoQACAKgEpQACAKwABQAMABIAGAAeACQDpQACAKcCZQACAKgERAACAKkEQgACAKoEQAACAKwAAgAGAAwC8QACAKgEpwACAKwABgAOABQAGgAgACYALAJmAAIApwJnAAIAqAJpAAIAqQPxAAIAqgR7AAIAqwPvAAIArAABAAQEiAACAKwAAQAEAokAAgCoAAIABgAMBIoAAgCsBIwAAgGiAAYADgAUABoAIAAmACwCbgACAKcCbwACAKgECwACAKkECQACAKoEfQACAKsEBwACAKwAAQAEBHcAAgCoAAEABASOAAIArAABAAQEGQACAKwAAwAIAA4AFASQAAIAqASSAAIArAK0AAIBogADAAgADgAUArYAAgCoBJQAAgCsArgAAgGiAAIABgAMA60AAgCoBJYAAgCsAAUADAASABgAHgAkBHkAAgCnAr4AAgCoAnYAAgCpBJgAAgCsAsAAAgGiAAYADgAUABoAIAAmACwCdwACAKcCeAACAKgCegACAKkEHQACAKoEgQACAKsEGwACAKwAAQAEBJoAAgCoAAQACgAQABYAHALLAAIAqASDAAIAqwScAAIArALNAAIBogADAAgADgAUAtEAAgCoBJ4AAgCsAtcAAgGiAAIABgAMBKAAAgCsAtsAAgGiAAYADgAUABoAIAAmACwCfAACAKcCfQACAKgC4QACAKkENQACAKoEhQACAKsEMwACAKwAAgAGAAwEogACAKkEpAACAKwAAwAIAA4AFAOgAAIApwOiAAIAqASmAAIArAAFAAwAEgAYAB4AJAOmAAIApwKAAAIAqARFAAIAqQRDAAIAqgRBAAIArAACAAYADALyAAIAqASoAAIArAABAAQC9wACAKgAAQAEAvkAAgCoAAEABAL4AAIAqAABAAQC+gACAKgABQAMABIAGAAeACQCcgACAKcCcwACAKgCpwACAKkEFwACAKoEfwACAKsABQAMABIAGAAeACQEKgACAKcEKAACAKgELgACAKkELAACAKoEMAACAKwABQAMABIAGAAeACQEKwACAKcEKQACAKgELwACAKkELQACAKoEMQACAKwABQAMABIAGAAeACQEOAACAKcENgACAKgEPAACAKkEOgACAKoEPgACAKwABQAMABIAGAAeACQEOQACAKcENwACAKgEPQACAKkEOwACAKoEPwACAKwAAQAEBIYAAgCoAAIAEQAlACkAAAArAC0ABQAvADQACAA2ADsADgA9AD4AFABFAEkAFgBLAE0AGwBPAFQAHgBWAFsAJABdAF4AKgCBAIEALACDAIMALQCGAIYALgCJAIkALwCMAIwAMACXAJoAMQDPAM8ANQABAAAAAQAIAAEABgACAAEAAgLUAtUAAQAAAAEACAACAA4ABATdBN4E3wTgAAEABAKGAocCmAKZAAQAAAABAAgAAQAmAAIACgAcAAIABgAMAaMAAgBKAagAAgBYAAEABAGpAAIAWAABAAIASgBXAAQAAAABAAgAAQBEAAIACgAUAAEABAGkAAIATQABAAQBpgACAE0ABAAAAAEACAABAB4AAgAKABQAAQAEAaUAAgBQAAEABAGnAAIAUAABAAIASgGjAAEAAAABAAgAAQAGAZUAAQABAEsAAQAAAAEACAABAAYBJwABAAEAugABAAAAAQAIAAEABgGsAAEAAQA2AAEAAAABAAgAAgAcAAIB4wHkAAEAAAABAAgAAgAKAAIB5QHmAAEAAgAvAE8AAQAAAAEACAACAB4ADAIoAioCKQIrAiwCHwIgAiEBrgIjAiQCJQABAAwAJwAoACsAMwA1AEYARwBIAEsAUwBUAFUAAQAAAAEACAACAAwAAwImAicCJwABAAMASQBLAa4AAQAAAAEACAACAGYACAI9Ai0CLgIwAjECOQI6AjwAAQAAAAEACAACABYACAAbABUAFgAXABgAGQAdABQAAQAIAa0CIgRwBHEEcgRzBHQEdQABAAAAAQAIAAIAFgAIBHUCIgRwBHEEcgRzAa0EdAABAAgAFAAVABYAFwAYABkAGwAdAAEAAAABAAgAAgAWAAgAFQAWABcAGAAZABsAHQAUAAEACAItAi4CMAIxAjkCOgI8Aj0AAQAAAAEACAABAAYBaQABAAEAEwAGAAAAAQAIAAMAAQASAAEAUgAAAAEAAABKAAIAAgF8AXwAAAHUAd0AAQABAAAAAQAIAAEAKAHAAAEAAAABAAgAAgAaAAoCMgB6AHMAdAIzAjQCNQI2AjcCOAACAAEAFAAdAAAAAQAAAAEACAACACYAEAHUAdUB1gHXAdgB2QHaAdsB3AHdAkACPgJBAkICPwThAAEAEAAUABUAFgAXABgAGQAaABsAHAAdAE0ATgKtA5oDnAQZ",
};
(function(i){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(j){return i(j,window,document)}):"object"===typeof exports?module.exports=function(j,l,v,u){j||(j=window);if(!l||!l.fn.dataTable)l=require("datatables.net")(j,l).$;l.fn.dataTable.Buttons||require("datatables.net-buttons")(j,l);return i(l,j,j.document,v,u)}:i(jQuery,window,document)})(function(i,j,l,v,u,s){function z(a){for(var b="";0<=a;)b=String.fromCharCode(a%26+65)+b,a=Math.floor(a/
26)-1;return b}function A(a,b){w===s&&(w=-1===y.serializeToString(i.parseXML(B["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"));i.each(b,function(d,c){if(i.isPlainObject(c)){var b=a.folder(d);A(b,c)}else{if(w){var b=c.childNodes[0],g,e,n=[];for(g=b.attributes.length-1;0<=g;g--){e=b.attributes[g].nodeName;var h=b.attributes[g].nodeValue;-1!==e.indexOf(":")&&(n.push({name:e,value:h}),b.removeAttribute(e))}g=0;for(e=n.length;g<e;g++)h=c.createAttribute(n[g].name.replace(":","_dt_b_namespace_token_")),
h.value=n[g].value,b.setAttributeNode(h)}b=y.serializeToString(c);w&&(-1===b.indexOf("<?xml")&&(b='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+b),b=b.replace(/_dt_b_namespace_token_/g,":"));b=b.replace(/<([^<>]*?) xmlns=""([^<>]*?)>/g,"<$1 $2>");a.file(d,b)}})}function q(a,b,d){var c=a.createElement(b);d&&(d.attr&&i(c).attr(d.attr),d.children&&i.each(d.children,function(a,b){c.appendChild(b)}),null!==d.text&&d.text!==s&&c.appendChild(a.createTextNode(d.text)));return c}function K(a,b){var d=
a.header[b].length,c;a.footer&&a.footer[b].length>d&&(d=a.footer[b].length);for(var f=0,g=a.body.length;f<g;f++)if(c=a.body[f][b],c=null!==c&&c!==s?c.toString():"",-1!==c.indexOf("\n")?(c=c.split("\n"),c.sort(function(a,c){return c.length-a.length}),c=c[0].length):c=c.length,c>d&&(d=c),40<d)return 52;d*=1.3;return 6<d?d:6}var o=i.fn.dataTable,t;var h="undefined"!==typeof self&&self||"undefined"!==typeof j&&j||this.content;if("undefined"===typeof h||"undefined"!==typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))t=
void 0;else{var x=h.document.createElementNS("http://www.w3.org/1999/xhtml","a"),L="download"in x,M=/constructor/i.test(h.HTMLElement)||h.safari,C=/CriOS\/[\d]+/.test(navigator.userAgent),N=function(a){(h.setImmediate||h.setTimeout)(function(){throw a;},0)},D=function(a){setTimeout(function(){"string"===typeof a?(h.URL||h.webkitURL||h).revokeObjectURL(a):a.remove()},4E4)},E=function(a){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob([String.fromCharCode(65279),
a],{type:a.type}):a},F=function(a,b,d){d||(a=E(a));var c=this,d="application/octet-stream"===a.type,f,g=function(){for(var a=["writestart","progress","write","writeend"],a=[].concat(a),b=a.length;b--;){var d=c["on"+a[b]];if("function"===typeof d)try{d.call(c,c)}catch(e){N(e)}}};c.readyState=c.INIT;if(L)f=(h.URL||h.webkitURL||h).createObjectURL(a),setTimeout(function(){x.href=f;x.download=b;var a=new MouseEvent("click");x.dispatchEvent(a);g();D(f);c.readyState=c.DONE});else if((C||d&&M)&&h.FileReader){var e=
new FileReader;e.onloadend=function(){var a=C?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");h.open(a,"_blank")||(h.location.href=a);c.readyState=c.DONE;g()};e.readAsDataURL(a);c.readyState=c.INIT}else f||(f=(h.URL||h.webkitURL||h).createObjectURL(a)),d?h.location.href=f:h.open(f,"_blank")||(h.location.href=f),c.readyState=c.DONE,g(),D(f)},m=F.prototype;"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob?t=function(a,b,d){b=b||a.name||"download";d||(a=E(a));return navigator.msSaveOrOpenBlob(a,
b)}:(m.abort=function(){},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,t=function(a,b,d){return new F(a,b||a.name||"download",d)})}o.fileSave=t;var O=function(a){var b="Sheet1";a.sheetName&&(b=a.sheetName.replace(/[\[\]\*\/\\\?\:]/g,""));return b},G=function(a){return a.newline?a.newline:navigator.userAgent.match(/Windows/)?"\r\n":"\n"},H=function(a,b){for(var d=G(b),c=a.buttons.exportData(b.exportOptions),f=b.fieldBoundary,
g=b.fieldSeparator,e=RegExp(f,"g"),n=b.escapeChar!==s?b.escapeChar:"\\",i=function(a){for(var c="",b=0,d=a.length;b<d;b++)0<b&&(c+=g),c+=f?f+(""+a[b]).replace(e,n+f)+f:a[b];return c},h=b.header?i(c.header)+d:"",j=b.footer&&c.footer?d+i(c.footer):"",k=[],l=0,m=c.body.length;l<m;l++)k.push(i(c.body[l]));return{str:h+k.join(d)+j,rows:k.length}},I=function(){if(!(-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&-1===navigator.userAgent.indexOf("Opera")))return!1;
var a=navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);return a&&1<a.length&&603.1>1*a[1]?!0:!1};try{var y=new XMLSerializer,w}catch(P){}var B={"_rels/.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',"xl/_rels/workbook.xml.rels":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
"[Content_Types].xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
"xl/workbook.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
"xl/worksheets/sheet1.xml":'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/><mergeCells count="0"/></worksheet>',"xl/styles.xml":'<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="67"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'},
J=[{match:/^\-?\d+\.\d%$/,style:60,fmt:function(a){return a/100}},{match:/^\-?\d+\.?\d*%$/,style:56,fmt:function(a){return a/100}},{match:/^\-?\$[\d,]+.?\d*$/,style:57},{match:/^\-?£[\d,]+.?\d*$/,style:58},{match:/^\-?€[\d,]+.?\d*$/,style:59},{match:/^\-?\d+$/,style:65},{match:/^\-?\d+\.\d{2}$/,style:66},{match:/^\([\d,]+\)$/,style:61,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^\([\d,]+\.\d{2}\)$/,style:62,fmt:function(a){return-1*a.replace(/[\(\)]/g,"")}},{match:/^\-?[\d,]+$/,style:63},
{match:/^\-?[\d,]+\.\d{2}$/,style:64}];o.ext.buttons.copyHtml5={className:"buttons-copy buttons-html5",text:function(a){return a.i18n("buttons.copy","Copy")},action:function(a,b,d,c){this.processing(!0);var f=this,a=H(b,c),g=b.buttons.exportInfo(c),e=G(c),n=a.str,d=i("<div/>").css({height:1,width:1,overflow:"hidden",position:"fixed",top:0,left:0});g.title&&(n=g.title+e+e+n);g.messageTop&&(n=g.messageTop+e+e+n);g.messageBottom&&(n=n+e+e+g.messageBottom);c.customize&&(n=c.customize(n,c,b));c=i("<textarea readonly/>").val(n).appendTo(d);
if(l.queryCommandSupported("copy")){d.appendTo(b.table().container());c[0].focus();c[0].select();try{var h=l.execCommand("copy");d.remove();if(h){b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),b.i18n("buttons.copySuccess",{1:"Copied one row to clipboard",_:"Copied %d rows to clipboard"},a.rows),2E3);this.processing(!1);return}}catch(j){}}h=i("<span>"+b.i18n("buttons.copyKeys","Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.")+
"</span>").append(d);b.buttons.info(b.i18n("buttons.copyTitle","Copy to clipboard"),h,0);c[0].focus();c[0].select();var m=i(h).closest(".dt-button-info"),k=function(){m.off("click.buttons-copy");i(l).off(".buttons-copy");b.buttons.info(!1)};m.on("click.buttons-copy",k);i(l).on("keydown.buttons-copy",function(a){27===a.keyCode&&(k(),f.processing(!1))}).on("copy.buttons-copy cut.buttons-copy",function(){k();f.processing(!1)})},exportOptions:{},fieldSeparator:"\t",fieldBoundary:"",header:!0,footer:!1,
title:"*",messageTop:"*",messageBottom:"*"};o.ext.buttons.csvHtml5={bom:!1,className:"buttons-csv buttons-html5",available:function(){return j.FileReader!==s&&j.Blob},text:function(a){return a.i18n("buttons.csv","CSV")},action:function(a,b,d,c){this.processing(!0);var a=H(b,c).str,d=b.buttons.exportInfo(c),f=c.charset;c.customize&&(a=c.customize(a,c,b));!1!==f?(f||(f=l.characterSet||l.charset),f&&(f=";charset="+f)):f="";c.bom&&(a="﻿"+a);t(new Blob([a],{type:"text/csv"+f}),d.filename,!0);this.processing(!1)},
filename:"*",extension:".csv",exportOptions:{},fieldSeparator:",",fieldBoundary:'"',escapeChar:'"',charset:null,header:!0,footer:!1};o.ext.buttons.excelHtml5={className:"buttons-excel buttons-html5",available:function(){return j.FileReader!==s&&(v||j.JSZip)!==s&&!I()&&y},text:function(a){return a.i18n("buttons.excel","Excel")},action:function(a,b,d,c){this.processing(!0);var f=this,g=0,a=function(a){return i.parseXML(B[a])},e=a("xl/worksheets/sheet1.xml"),h=e.getElementsByTagName("sheetData")[0],
a={_rels:{".rels":a("_rels/.rels")},xl:{_rels:{"workbook.xml.rels":a("xl/_rels/workbook.xml.rels")},"workbook.xml":a("xl/workbook.xml"),"styles.xml":a("xl/styles.xml"),worksheets:{"sheet1.xml":e}},"[Content_Types].xml":a("[Content_Types].xml")},d=b.buttons.exportData(c.exportOptions),l,m,r=function(a){l=g+1;m=q(e,"row",{attr:{r:l}});for(var b=0,d=a.length;b<d;b++){var f=z(b)+""+l,j=null;if(null===a[b]||a[b]===s||""===a[b])if(!0===c.createEmptyCells)a[b]="";else continue;var k=a[b];a[b]=i.trim(a[b]);
for(var o=0,r=J.length;o<r;o++){var p=J[o];if(a[b].match&&!a[b].match(/^0\d+/)&&a[b].match(p.match)){j=a[b].replace(/[^\d\.\-]/g,"");p.fmt&&(j=p.fmt(j));j=q(e,"c",{attr:{r:f,s:p.style},children:[q(e,"v",{text:j})]});break}}j||("number"===typeof a[b]||a[b].match&&a[b].match(/^-?\d+(\.\d+)?$/)&&!a[b].match(/^0\d+/)?j=q(e,"c",{attr:{t:"n",r:f},children:[q(e,"v",{text:a[b]})]}):(k=!k.replace?k:k.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,""),j=q(e,"c",{attr:{t:"inlineStr",r:f},children:{row:q(e,
"is",{children:{row:q(e,"t",{text:k,attr:{"xml:space":"preserve"}})}})}})));m.appendChild(j)}h.appendChild(m);g++};i("sheets sheet",a.xl["workbook.xml"]).attr("name",O(c));c.customizeData&&c.customizeData(d);var k=function(a,b){var c=i("mergeCells",e);c[0].appendChild(q(e,"mergeCell",{attr:{ref:"A"+a+":"+z(b)+a}}));c.attr("count",parseFloat(c.attr("count"))+1);i("row:eq("+(a-1)+") c",e).attr("s","51")},p=b.buttons.exportInfo(c);p.title&&(r([p.title],g),k(g,d.header.length-1));p.messageTop&&(r([p.messageTop],
g),k(g,d.header.length-1));c.header&&(r(d.header,g),i("row:last c",e).attr("s","2"));for(var o=0,u=d.body.length;o<u;o++)r(d.body[o],g);c.footer&&d.footer&&(r(d.footer,g),i("row:last c",e).attr("s","2"));p.messageBottom&&(r([p.messageBottom],g),k(g,d.header.length-1));r=q(e,"cols");i("worksheet",e).prepend(r);k=0;for(o=d.header.length;k<o;k++)r.appendChild(q(e,"col",{attr:{min:k+1,max:k+1,width:K(d,k),customWidth:1}}));c.customize&&c.customize(a,c,b);0===i("mergeCells",e).children().length&&i("mergeCells",
e).remove();b=new (v||j.JSZip);d={type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};A(b,a);b.generateAsync?b.generateAsync(d).then(function(a){t(a,p.filename);f.processing(false)}):(t(b.generate(d),p.filename),this.processing(!1))},filename:"*",extension:".xlsx",exportOptions:{},header:!0,footer:!1,title:"*",messageTop:"*",messageBottom:"*",createEmptyCells:!1};o.ext.buttons.pdfHtml5={className:"buttons-pdf buttons-html5",available:function(){return j.FileReader!==
s&&(u||j.pdfMake)},text:function(a){return a.i18n("buttons.pdf","PDF")},action:function(a,b,d,c){this.processing(!0);var d=b.buttons.exportData(c.exportOptions),a=b.buttons.exportInfo(c),f=[];c.header&&f.push(i.map(d.header,function(a){return{text:"string"===typeof a?a:a+"",style:"tableHeader"}}));for(var g=0,e=d.body.length;g<e;g++)f.push(i.map(d.body[g],function(a){return{text:"string"===typeof a?a:a+"",style:g%2?"tableBodyEven":"tableBodyOdd"}}));c.footer&&d.footer&&f.push(i.map(d.footer,function(a){return{text:"string"===
typeof a?a:a+"",style:"tableFooter"}}));d={pageSize:c.pageSize,pageOrientation:c.orientation,content:[{table:{headerRows:1,body:f},layout:"noBorders"}],styles:{tableHeader:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154",alignment:"center"},tableBodyEven:{},tableBodyOdd:{fillColor:"#f3f3f3"},tableFooter:{bold:!0,fontSize:11,color:"white",fillColor:"#2d4154"},title:{alignment:"center",fontSize:15},message:{}},defaultStyle:{fontSize:10}};a.messageTop&&d.content.unshift({text:a.messageTop,style:"message",
margin:[0,0,0,12]});a.messageBottom&&d.content.push({text:a.messageBottom,style:"message",margin:[0,0,0,12]});a.title&&d.content.unshift({text:a.title,style:"title",margin:[0,0,0,12]});c.customize&&c.customize(d,c,b);b=(u||j.pdfMake).createPdf(d);"open"===c.download&&!I()?b.open():b.download(a.filename);this.processing(!1)},title:"*",filename:"*",extension:".pdf",exportOptions:{},orientation:"portrait",pageSize:"A4",header:!0,footer:!1,messageTop:"*",messageBottom:"*",customize:null,download:"download"};
return o.Buttons});

//# sourceMappingURL=main.js.map