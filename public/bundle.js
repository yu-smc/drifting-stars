/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/entry.js":
/*!*************************!*\
  !*** ./src/js/entry.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_shaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/shaders */ \"./src/js/modules/shaders.js\");\n\nconsole.log(_modules_shaders__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fragment);\nvar stage = document.getElementById('stage');\nvar scene;\nvar camera;\nvar renderer;\nvar stars;\nvar starsAmount = 600;\nvar starsVelo = [];\nvar collisionPoints = [];\n\nvar init = function init() {\n  scene = new THREE.Scene();\n  renderer = new THREE.WebGLRenderer();\n  renderer.setClearColor(0x000F1C);\n  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);\n  camera.position.set(0, 0, 0.5);\n  onResize();\n  stage.appendChild(renderer.domElement);\n  initStars();\n  render();\n};\n\nvar onResize = function onResize() {\n  var width = window.innerWidth;\n  var height = window.innerHeight;\n  renderer.setPixelRatio(window.devicePixelRatio);\n  renderer.setSize(width, height);\n  camera.aspect = width / height;\n  camera.updateProjectionMatrix();\n};\n\nvar initStars = function initStars() {\n  var geo = new THREE.BufferGeometry();\n  var positions = new Float32Array(starsAmount * 3);\n  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));\n  geo.setAttribute('pOpacity', new THREE.BufferAttribute(new Float32Array(starsAmount), 1));\n  geo.setAttribute('pSize', new THREE.BufferAttribute(new Float32Array(starsAmount), 1));\n  geo.setAttribute('pColor', new THREE.BufferAttribute(new Float32Array(starsAmount), 1));\n  var vertex = new THREE.Vector3();\n\n  for (var i = 0; i < starsAmount; i++) {\n    vertex.x = Math.random() * 2 - 1;\n    vertex.y = Math.random() * 2 - 1;\n    vertex.z = 0;\n    vertex.toArray(positions, i * 3);\n\n    if (i < starsAmount * 2 / 3) {\n      var rn = Math.random() * 0.001 - 0.0005;\n      starsVelo[i] = rn;\n    }\n  }\n\n  console.log(starsVelo.length);\n  var mat = new THREE.ShaderMaterial({\n    uniforms: {\n      time: {\n        type: \"f\",\n        value: 0.0\n      },\n      resolution: {\n        value: new THREE.Vector2(window.innerWidth, window.innerHeight)\n      }\n    },\n    vertexShader: _modules_shaders__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vertex,\n    fragmentShader: _modules_shaders__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fragment,\n    depthWrite: false,\n    transparent: true,\n    alphaTest: 0.5\n  });\n  stars = new THREE.Points(geo, mat);\n  scene.add(stars);\n  var opaArr = stars.geometry.attributes.pOpacity.array;\n  opaArr.forEach(function (opa) {\n    opa = 1.0;\n  });\n  render();\n};\n\nvar render = function render() {\n  animate();\n  renderer.render(scene, camera);\n  requestAnimationFrame(render);\n};\n\nvar changeStarsPos = function changeStarsPos() {\n  var posArr = stars.geometry.attributes.position.array;\n  var opaArr = stars.geometry.attributes.pOpacity.array;\n\n  for (var i = 0; i < posArr.length; i++) {\n    //position\n    if (1 < posArr[i * 3] && 0 < starsVelo[i * 3]) {\n      starsVelo[i * 3] = Math.random() * -0.001;\n    }\n\n    if (posArr[i * 3] < -1 && starsVelo[i * 3] < 0) {\n      starsVelo[i * 3] = Math.random() * 0.001;\n    }\n\n    if (1 < posArr[i * 3 + 1] && 0 < starsVelo[i * 3 + 1]) {\n      starsVelo[i * 3 + 1] = Math.random() * -0.001;\n    }\n\n    if (posArr[i * 3 + 1] < -1 && starsVelo[i * 3 + 1] < 0) {\n      starsVelo[i * 3 + 1] = Math.random() * 0.001;\n    }\n\n    posArr[i * 3] += starsVelo[i * 3];\n    posArr[i * 3 + 1] += starsVelo[i * 3 + 1]; //opacity\n\n    if (Math.random() < 0.1) {\n      opaArr[i] -= 0.4;\n    }\n\n    if (opaArr[i] < 0.3) {\n      opaArr[i] = 1.0;\n    }\n  }\n\n  console.log(posArr[1]);\n  stars.geometry.attributes.position.needsUpdate = true;\n  stars.geometry.attributes.pOpacity.needsUpdate = true;\n};\n\nvar animate = function animate() {\n  changeStarsPos();\n};\n\nwindow.onload = function () {\n  init();\n};\n\nwindow.addEventListener('resize', onResize);\n\n//# sourceURL=webpack:///./src/js/entry.js?");

/***/ }),

/***/ "./src/js/modules/shaders.js":
/*!***********************************!*\
  !*** ./src/js/modules/shaders.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  vertex: \"\\n    attribute float pOpacity;\\n    attribute float pSize;\\n    attribute float pColor;\\n    \\n    varying vec2 vUv;\\n    varying float vOpacity;\\n    varying float vColor;\\n    \\n    void main() {\\n      vUv = uv;\\n      vOpacity = pOpacity;\\n      vColor = pColor;\\n    \\n      gl_PointSize = 30.0;\\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\\n    }\\n  \",\n  fragment: \"\\n    precision mediump float;\\n\\n    varying vec2 vUv;\\n    varying float vOpacity;\\n    // varying float vColor;\\n\\n    uniform vec2 resolution;\\n    \\n    void main() {\\n      float dist = distance(vec2(gl_PointCoord.x, gl_PointCoord.y), vec2(0.5, 0.5));\\n\\n      vec4 baseColor = vec4(1., 1., 1., (0.04 / dist - dist * 0.2) * vOpacity);\\n\\n      gl_FragColor = baseColor;\\n\\n    }\\n  \"\n});\n\n//# sourceURL=webpack:///./src/js/modules/shaders.js?");

/***/ })

/******/ });