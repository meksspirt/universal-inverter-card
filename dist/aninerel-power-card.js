function e(e,t,i,r){var a,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(o=(n<3?a(o):n>3?a(t,i,o):a(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:g,getPrototypeOf:h}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",y=u.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...g(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=r;const n=a.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const n=this.constructor;if(!1===r&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,y?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,C=$.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,M="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+A,E=`<${N}>`,B=document,P=()=>B.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,L=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,R=/"/g,H=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),U=W(1),q=W(2),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,K=B.createTreeWalker(B,129);function J(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,r=[];let a,n=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===z?"!--"===l[1]?o=V:void 0!==l[1]?o=L:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=D):void 0!==l[3]&&(o=D):o===D?">"===l[0]?(o=a??z,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?D:'"'===l[3]?R:F):o===R||o===F?o=D:o===V||o===L?o=z:(o=D,a=void 0);const p=o===D&&e[t+1].startsWith("/>")?" ":"";n+=o===z?i+E:c>=0?(r.push(s),i.slice(0,c)+M+i.slice(c)+A+p):i+A+(-2===c?t:p)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class X{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,n=0;const o=e.length-1,s=this.parts,[l,c]=Z(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&s.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(M)){const t=c[n++],i=r.getAttribute(e).split(A),o=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?re:"?"===o[1]?ae:"@"===o[1]?ne:ie}),r.removeAttribute(e)}else e.startsWith(A)&&(s.push({type:6,index:a}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(A),t=e.length-1;if(t>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],P()),K.nextNode(),s.push({type:2,index:++a});r.append(e[t],P())}}}else if(8===r.nodeType)if(r.data===N)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(A,e+1));)s.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){const i=B.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,r){if(t===j)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??B).importNode(t,!0);K.currentNode=r;let a=K.nextNode(),n=0,o=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new oe(a,this,e)),this._$AV.push(t),s=i[++o]}n!==s?.index&&(a=K.nextNode(),n++)}return K.currentNode=B,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new te(this.O(P()),this.O(P()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const a=this.strings;let n=!1;if(void 0===a)e=Q(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==j,n&&(this._$AH=e);else{const r=e;let o,s;for(e=a[0],o=0;o<a.length-1;o++)s=Q(this,r[i+o],t,o),s===j&&(s=this._$AH[o]),n||=!O(s)||s!==this._$AH[o],s===G?e=G:e!==G&&(e+=(s??"")+a[o+1]),this._$AH[o]=s}n&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ne extends ie{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===j)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=$.litHtmlPolyfillSupport;se?.(X,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new te(t.insertBefore(P(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ge={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},he=(e=ge,t,i)=>{const{kind:r,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ue({...e,state:!0,attribute:!1})}const me="aninerel-power-card",ye={title:"Aninerel ANL 4200T",max_power:4200,inverter_capacity:4200,min_flow_rate:.75,max_flow_rate:6,use_log_flow_model:!0,show_header:!0,show_flow:!0,show_solar:!1,grid_position:"bottom",show_params:!0,show_bms:!0,show_controls:!0,show_energy:!0,show_alerts:!0,compact_mode:!1,language:"auto"},be="var(--energy-solar-color, #F59E0B)",fe="var(--energy-battery-in-color, #10B981)",ve="var(--energy-battery-out-color, #FF9800)",xe="var(--energy-grid-consumption-color, #4285F4)",we="var(--energy-grid-return-color, #2ecc71)",$e="var(--primary-text-color, #E0E0E0)",ke={type:"custom:aninerel-power-card",title:"Aninerel ANL 4200T",show_solar:!1,entities:{battery_power:"sensor.aninerel_anl_4200t_24l_w_pro_battery_power",grid_power:"sensor.aninerel_anl_4200t_24l_w_pro_grid_power",load_power:"sensor.aninerel_anl_4200t_24l_w_pro_load_power"},battery_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage",battery_current_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_current",grid_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage",operating_mode_entity:"sensor.aninerel_anl_4200t_24l_w_pro_operating_mode",charging_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active",inverter_temperature_entity:"sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature",inverter_load_percent_entity:"sensor.aninerel_anl_4200t_24l_w_pro_load_percent",self_consumption_power_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",grid_breaker_switch_entity:"switch.invertor_vkhod",bms:{soc_entity:"sensor.redodo_battery_state_of_charge",cell_count:8,cell_voltage_prefix:"sensor.redodo_battery_cell_voltage_",nominal_capacity_wh:2560},controls:{charge_source_entity:"select.aninerel_anl_4200t_24l_w_pro_charge_source_priority",output_priority_entity:"select.aninerel_anl_4200t_24l_w_pro_output_source_priority",max_charge_current_entity:"number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current",bulk_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage",float_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage",equalization_entity:"switch.aninerel_anl_4200t_24l_w_pro_battery_equalization"},safety:{fault_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active",fault_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_fault_code",warnings_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active",warning_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_code",warning_details_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_details"},daily_energy:{load_energy_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today",grid_import_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today",battery_charge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today",battery_discharge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today",self_consumption_daily_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",self_consumption_monthly_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats"}},Ce=o`
  :host {
    display: block;
    box-sizing: border-box;
    container-type: inline-size;
    --card-bg: var(--ha-card-background, var(--card-background-color, #1a1a2e));
    --primary-text: var(--primary-text-color, #ffffff);
    --secondary-text: var(--secondary-text-color, #9ca3af);
    --divider: var(--divider-color, rgba(255, 255, 255, 0.08));
    --solar-color: var(--energy-solar-color, #f59e0b);
    --battery-charge-color: var(--energy-battery-in-color, #10b981);
    --battery-discharge-color: var(--energy-battery-out-color, #ff9800);
    --grid-import-color: var(--energy-grid-consumption-color, #4285f4);
    --grid-export-color: var(--energy-grid-return-color, #2ecc71);
    --home-color: var(--primary-text-color, #ffffff);
    --inverter-color: #3b82f6;
  }

  ha-card {
    background: var(--card-bg);
    color: var(--primary-text);
    border-radius: var(--ha-card-border-radius, 16px);
    padding: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.3));
    border: 1px solid var(--divider);
    position: relative;
  }

  ha-card.compact {
    padding: 10px 12px;
    gap: 10px;
  }

  ha-card.compact .power-flow-container {
    max-width: 420px;
  }

  button,
  input,
  select {
    font: inherit;
    color: inherit;
  }

  /* ============================================================
     HEADER BAR SECTION
     ============================================================ */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-icon-box ha-icon {
    --mdc-icon-size: 24px;
    color: var(--solar-color);
  }

  .header-title-box {
    display: flex;
    flex-direction: column;
  }

  .header-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.2;
  }

  .header-subtitle {
    font-size: 0.72rem;
    color: var(--secondary-text);
  }

  .header-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 9999px;
    font-size: 0.73rem;
    font-weight: 600;
    color: var(--chip-color, #10b981);
    background: color-mix(in srgb, var(--chip-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--chip-color, #10b981) 35%, transparent);
    cursor: pointer;
    border-style: solid;
    outline: none;
    font-family: inherit;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .status-chip:hover {
    transform: scale(1.04);
    filter: brightness(1.15);
  }

  .status-chip ha-icon {
    --mdc-icon-size: 14px;
  }

  .pulse-chip {
    animation: pulse-glow 2s infinite ease-in-out;
  }

  .pulse-chip-danger {
    animation: pulse-danger 1.2s infinite ease-in-out;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 4px rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.9);
    }
  }

  @keyframes pulse-danger {
    0%, 100% {
      box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
    }
    50% {
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.9);
    }
  }

  .chip-ok {
    color: #10b981;
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    cursor: default;
  }

  /* ============================================================
     POWER FLOW VISUALIZATION SECTION
     ============================================================ */
  .power-flow-container {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: 2px auto 6px;
    aspect-ratio: var(--flow-aspect-ratio, 500 / 305);
    user-select: none;
  }

  svg.flow-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  .pipe-track-outer {
    fill: none;
    stroke: rgba(148, 163, 184, 0.12);
    stroke-width: 5;
    stroke-linecap: round;
  }

  .pipe-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.14);
    stroke-width: 1.5;
    stroke-dasharray: 2 5;
    stroke-linecap: round;
  }

  .pipe-port {
    fill: #0f172a;
    stroke: rgba(148, 163, 184, 0.45);
    stroke-width: 1.6;
  }

  .flow-glow-line {
    fill: none;
    stroke-linecap: round;
    opacity: 0.22;
    filter: blur(2px);
  }

  .flow-line {
    fill: none;
    stroke-dasharray: 6 10;
    stroke-linecap: round;
    animation: flow-dash var(--flow-duration, 2.5s) linear infinite;
    will-change: stroke-dashoffset;
    filter: drop-shadow(0 0 5px currentColor);
  }

  .flow-orb-halo {
    opacity: 0.35;
    filter: blur(2px);
  }

  .flow-orb-core {
    filter: drop-shadow(0 0 4px currentColor);
  }

  @keyframes flow-dash {
    from {
      stroke-dashoffset: 32;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .flow-nodes-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  /* Precision anchor: (left, top) is ALWAYS the exact center of .node-badge */
  .flow-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease;
  }

  .flow-node:hover {
    transform: translate(-50%, -50%) scale(1.04);
    filter: brightness(1.1);
  }

  .node-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 25%, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.92) 100%);
    border: 2px solid var(--node-border, rgba(255, 255, 255, 0.16));
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.42),
      inset 0 1px 1px rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Metadata block hangs below the badge without shifting the badge center */
  .node-meta {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    pointer-events: none;
    min-width: 110px;
  }

  .node-value {
    font-size: 0.96rem;
    font-weight: 800;
    letter-spacing: 0.2px;
    line-height: 1.15;
    white-space: nowrap;
  }

  .node-label {
    font-size: 0.68rem;
    color: var(--secondary-text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    line-height: 1.2;
    margin-top: 1px;
    white-space: nowrap;
  }

  .node-sub {
    font-size: 0.66rem;
    color: rgba(148, 163, 184, 0.85);
    font-weight: 600;
    line-height: 1.2;
    margin-top: 2px;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    white-space: nowrap;
  }

  /* SOLAR NODE */
  .node-solar { --node-border: var(--solar-color); }
  .node-solar .node-badge {
    width: 66px;
    height: 66px;
    box-shadow: 0 0 18px rgba(245, 158, 11, 0.18), 0 6px 16px rgba(0, 0, 0, 0.4);
  }
  .node-solar ha-icon { --mdc-icon-size: 30px; color: var(--solar-color); }
  .node-solar .node-value { color: var(--solar-color); }

  /* CENTRAL INVERTER HUB (Self-contained Glassmorphic Core) */
  .node-inverter .inverter-hub-badge {
    width: 122px;
    height: 88px;
    border-radius: 20px;
    flex-direction: column;
    justify-content: space-between;
    padding: 9px 10px 8px;
    box-sizing: border-box;
    background: linear-gradient(155deg, rgba(30, 41, 59, 0.96) 0%, rgba(15, 23, 42, 0.96) 100%);
    border: 1.8px solid color-mix(in srgb, var(--hub-accent, #3b82f6) 55%, rgba(255, 255, 255, 0.15));
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.48),
      0 0 22px color-mix(in srgb, var(--hub-accent, #3b82f6) 20%, transparent),
      inset 0 1px 1px rgba(255, 255, 255, 0.14);
  }

  .hub-top-row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .inverter-core-svg {
    width: 36px;
    height: 26px;
    color: var(--hub-accent, #3b82f6);
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.3));
  }

  .inverter-status-dot {
    position: absolute;
    top: 1px;
    right: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
  }

  .hub-mode-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--primary-text, #f8fafc);
    letter-spacing: 0.2px;
    line-height: 1.1;
    max-width: 106px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hub-sub-pill {
    font-size: 0.64rem;
    font-weight: 700;
    color: rgba(148, 163, 184, 0.92);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 1.5px 7px;
    line-height: 1.15;
    white-space: nowrap;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hub-sub-pill.active-self {
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.12);
    border-color: rgba(245, 158, 11, 0.3);
  }

  /* BATTERY NODE */
  .node-battery { --node-border: transparent; }
  .node-battery .node-badge {
    width: 78px;
    height: 78px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .battery-gauge-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.38));
  }
  .battery-gauge-bg {
    fill: rgba(15, 23, 42, 0.92);
    stroke: rgba(255, 255, 255, 0.09);
    stroke-width: 5.5;
  }
  .battery-gauge-fill {
    fill: none;
    stroke-width: 5.8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
  }
  .battery-gauge-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .battery-gauge-center ha-icon { --mdc-icon-size: 20px; }
  .battery-soc-text {
    font-size: 0.84rem;
    font-weight: 800;
    line-height: 1;
    margin-top: 2px;
  }

  /* HOME NODE */
  .node-home { --node-border: rgba(6, 182, 212, 0.35); }
  .node-home .node-badge {
    width: 72px;
    height: 72px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .home-gauge-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.38));
  }
  .home-gauge-bg {
    fill: rgba(15, 23, 42, 0.92);
    stroke: rgba(6, 182, 212, 0.25);
    stroke-width: 2.5;
  }
  .home-gauge-fill {
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
  }
  .node-home ha-icon {
    position: relative;
    z-index: 1;
    --mdc-icon-size: 30px;
    color: var(--home-color);
  }
  .node-home .node-value { color: var(--home-color); }

  /* GRID NODE */
  .node-grid { --node-border: rgba(59, 130, 246, 0.45); }
  .node-grid .node-badge {
    width: 68px;
    height: 68px;
  }
  .node-grid ha-icon { --mdc-icon-size: 29px; color: var(--grid-import-color); }
  .node-grid .node-value { color: var(--grid-import-color); }
  .grid-status-dot {
    position: absolute;
    bottom: 3px;
    right: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #0f172a;
  }

  /* ============================================================
     ELECTRICAL PARAMETERS SECTION
     ============================================================ */
  .params-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .param-tile {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }

  .param-tile:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  .param-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .param-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .param-title {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .param-badge {
    font-size: 0.62rem;
    padding: 1px 5px;
    border-radius: 4px;
    font-weight: 600;
  }

  .param-main-value {
    font-size: 1.08rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .param-slash {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
  }

  .param-chart-box {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .sparkline-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .sparkline-placeholder {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
  }

  .param-kpi-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .kpi-val {
    font-size: 1.3rem;
  }

  .arc-gauge-wrapper {
    width: 44px;
    height: 26px;
  }

  .arc-gauge-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* ============================================================
     BMS REDODO SECTION (SINGLE & DUAL BATTERY)
     ============================================================ */
  .bms-card-section {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    container-type: inline-size;
    container-name: bms-card;
  }

  .bms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .bms-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    flex-wrap: wrap;
  }

  .bms-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #10b981;
    filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.35));
  }

  .bms-brand-text {
    color: var(--primary-text);
    white-space: nowrap;
  }

  .bms-topology-badge {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.32);
    padding: 2px 8px;
    border-radius: 9999px;
    white-space: nowrap;
  }

  .bms-soc-badge {
    font-size: 0.72rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 2px 7px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .bms-header-status {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .bms-delta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--delta-color, #10b981);
    background: color-mix(in srgb, var(--delta-color, #10b981) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--delta-color, #10b981) 32%, transparent);
    padding: 2.5px 8px;
    border-radius: 9999px;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }

  .bms-delta-pill:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--delta-color, #10b981) 22%, transparent);
  }

  .bms-delta-pill ha-icon {
    --mdc-icon-size: 13px;
  }

  .series-drift-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.35);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.72rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .series-drift-alert ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
    flex-shrink: 0;
  }

  /* Universal Multi-Pack / Single-Pack Grid Layout */
  .bms-packs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .bms-packs-grid.multi-pack {
    grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
  }

  @container bms-card (max-width: 410px) {
    .bms-packs-grid.multi-pack {
      grid-template-columns: 1fr;
    }
  }

  .pack-column {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.35) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    padding: 10px 11px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    transition: border-color 0.2s ease;
  }

  .pack-column:hover {
    border-color: rgba(255, 255, 255, 0.14);
  }

  .pack-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    min-width: 0;
  }

  .pack-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    overflow: hidden;
  }

  .pack-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .pack-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--primary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pack-soc-badge {
    font-size: 0.66rem;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 9999px;
    border: 1px solid transparent;
    flex-shrink: 0;
    line-height: 1.3;
  }

  .pack-telemetry-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .pack-voltage {
    font-size: 0.84rem;
    font-weight: 800;
    color: #38bdf8;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.2px;
  }

  .pack-temp {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--secondary-text);
    background: rgba(255, 255, 255, 0.04);
    padding: 1px 5px;
    border-radius: 6px;
  }

  .pack-temp ha-icon {
    --mdc-icon-size: 12px;
    color: #94a3b8;
  }

  /* Thin Pack SoC Progress Bar */
  .pack-soc-bar-track {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 9999px;
    overflow: hidden;
  }

  .pack-soc-bar-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Prismatic Cell Equalizer Columns */
  .cells-grid {
    display: grid;
    grid-template-columns: repeat(var(--cell-cols, 4), minmax(0, 1fr));
    gap: 6px;
    padding-top: 2px;
  }

  .cell-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    min-width: 0;
    padding: 4px 2px 3px 2px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .cell-col:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
  }

  /* Battery Cell Positive Terminal Cap */
  .cell-cap {
    width: 38%;
    max-width: 16px;
    height: 3px;
    border-radius: 2px 2px 0 0;
    background: rgba(148, 163, 184, 0.35);
    margin-bottom: -2px;
    transition: background 0.25s ease;
  }

  .cell-col.cell-max .cell-cap {
    background: #10b981;
    box-shadow: 0 0 5px rgba(16, 185, 129, 0.6);
  }

  .cell-col.cell-min .cell-cap {
    background: #38bdf8;
    box-shadow: 0 0 5px rgba(56, 189, 248, 0.6);
  }

  .cell-bar-track {
    width: 100%;
    height: 44px;
    background: rgba(2, 6, 23, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 5px;
    padding: 2px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
  }

  .cell-bar-fill {
    width: 100%;
    border-radius: 3px;
    transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
  }

  .cell-col.cell-max {
    border-color: rgba(16, 185, 129, 0.32);
    background: rgba(16, 185, 129, 0.04);
  }

  .cell-col.cell-max .cell-bar-fill {
    background: linear-gradient(180deg, #34d399 0%, #059669 100%);
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.45);
  }

  .cell-col.cell-min {
    border-color: rgba(56, 189, 248, 0.32);
    background: rgba(56, 189, 248, 0.04);
  }

  .cell-col.cell-min .cell-bar-fill {
    background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.45);
  }

  .cell-col.cell-offline .cell-bar-fill {
    background: rgba(100, 116, 139, 0.25);
  }

  .cell-voltage {
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.15;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text);
    margin-top: 1px;
  }

  .cell-col.cell-max .cell-voltage {
    color: #34d399;
  }

  .cell-col.cell-min .cell-voltage {
    color: #60a5fa;
  }

  .cell-id {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--secondary-text);
    line-height: 1;
  }

  .cell-tag {
    font-size: 0.52rem;
    line-height: 1;
  }

  .cell-col.cell-max .cell-tag {
    color: #10b981;
  }

  .cell-col.cell-min .cell-tag {
    color: #38bdf8;
  }

  /* Footer Summary Stats (Min / Avg / Max + Cycles & Ah) */
  .bms-footer-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 8px;
    margin-top: 2px;
    border-top: 1px solid var(--divider);
    font-size: 0.7rem;
    color: var(--secondary-text);
  }

  .bms-footer-cells-summary {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .cell-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 7px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.66rem;
    font-variant-numeric: tabular-nums;
  }

  .cell-stat-chip strong {
    color: var(--primary-text);
    font-weight: 700;
  }

  .cell-stat-chip.min-chip strong {
    color: #60a5fa;
  }

  .cell-stat-chip.max-chip strong {
    color: #34d399;
  }

  .bms-footer-right {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: auto;
  }

  .bms-footer-item {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .bms-footer-item:hover {
    opacity: 0.8;
  }

  .bms-footer-item ha-icon {
    --mdc-icon-size: 15px;
    color: #10b981;
  }

  .bms-footer-item strong {
    color: var(--primary-text);
  }

  /* ============================================================
     CONTROLS SECTION
     ============================================================ */
  .controls-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .controls-card-section.expanded {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }

  .controls-header:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .controls-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: var(--inverter-color);
  }

  .controls-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .controls-quick-summary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  .chevron-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text);
    transition: transform 0.25s ease;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .controls-body {
    padding: 4px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid var(--divider);
  }

  .controls-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .control-box {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .control-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .control-box-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .control-box-header label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    flex-grow: 1;
  }

  .control-label-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .control-live-val {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--inverter-color);
  }

  /* Pill Buttons Selector */
  .pill-selector {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px;
    border-radius: 8px;
    gap: 4px;
  }

  .pill-btn {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--secondary-text);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 6px 4px;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-align: center;
    font-family: inherit;
  }

  .pill-btn:hover {
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.05);
  }

  .pill-btn.active {
    background: var(--inverter-color);
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
  }

  /* Slider Styling */
  .slider-box {
    padding: 10px 14px;
  }

  .slider-input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .slider-boundary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
  }

  .control-range {
    flex-grow: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.12);
    outline: none;
  }

  .control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--inverter-color);
    cursor: pointer;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
    transition: transform 0.15s ease;
  }

  .control-range::-webkit-slider-thumb:hover {
    transform: scale(1.15);
  }

  /* Mini Voltage Steppers */
  .voltage-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 2px 4px;
  }

  .stepper-btn {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: var(--primary-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background 0.15s ease;
  }

  .stepper-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper-btn:active {
    transform: scale(0.92);
  }

  .stepper-val {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  /* Danger Zone: Equalization */
  .danger-switch-row {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .danger-switch-row.danger-active {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
    animation: pulse-danger 1.5s infinite ease-in-out;
  }

  .danger-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .danger-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: #ef4444;
  }

  .danger-title ha-icon {
    --mdc-icon-size: 16px;
  }

  .danger-desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.2;
  }

  .toggle-switch-btn {
    min-width: 52px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .switch-off {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text);
  }

  .switch-on {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  }

  /* ============================================================
     DAILY ENERGY SECTION
     ============================================================ */
  .energy-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .energy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .energy-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .energy-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
  }

  .energy-header-pills {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .energy-total-pill {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 8px;
    border-radius: 9999px;
  }

  .energy-bars-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .energy-row {
    display: grid;
    grid-template-columns: 140px 1fr 85px;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 6px;
    transition: background 0.15s ease;
  }

  .energy-row:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .energy-row-info {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .energy-row-info ha-icon {
    --mdc-icon-size: 18px;
  }

  .energy-row-label {
    font-size: 0.73rem;
    font-weight: 500;
    color: var(--secondary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .energy-track-wrapper {
    width: 100%;
    height: 8px;
    display: flex;
    align-items: center;
  }

  .energy-track {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .energy-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .energy-row-val {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .energy-kwh small {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--secondary-text);
  }

  .energy-pct {
    font-size: 0.65rem;
    color: var(--secondary-text);
    font-weight: 500;
  }

  /* ============================================================
     ALERT & DIAGNOSTICS SECTION
     ============================================================ */
  .alert-section-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .alert-box {
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .alert-box:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .alert-critical {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid #ef4444;
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.3);
    animation: pulse-danger 1.8s infinite ease-in-out;
  }

  .alert-critical .alert-icon-col ha-icon {
    --mdc-icon-size: 26px;
    color: #ef4444;
  }

  .alert-critical .alert-badge {
    background: #ef4444;
    color: #ffffff;
  }

  .alert-warn {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.4);
  }

  .alert-warn .alert-icon-col ha-icon {
    --mdc-icon-size: 24px;
    color: #f59e0b;
  }

  .alert-warn .alert-badge {
    background: #f59e0b;
    color: #000000;
  }

  .alert-content-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }

  .alert-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .alert-badge {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.3px;
  }

  .alert-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .alert-desc {
    margin: 0;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  .alert-rec {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fcd34d;
  }

  .alert-rec ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ============================================================
     RESPONSIVE BREAKPOINTS
     ============================================================ */
  @container (max-width: 440px) {
    .header-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .params-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .controls-grid-2 {
      grid-template-columns: 1fr;
    }
    .energy-row {
      grid-template-columns: 100px 1fr 70px;
    }
    .bms-body {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .bms-telemetry-panel {
      border-left: none;
      border-top: 1px solid var(--divider);
      padding-left: 0;
      padding-top: 8px;
      flex-direction: row;
      justify-content: space-around;
    }
    .node-solar .node-badge,
    .node-grid .node-badge {
      width: 56px;
      height: 56px;
    }
    .node-battery .node-badge {
      width: 68px;
      height: 68px;
    }
    .node-home .node-badge {
      width: 60px;
      height: 60px;
    }
    .node-inverter .node-badge {
      width: 54px;
      height: 54px;
    }
    .node-value {
      font-size: 0.82rem;
    }
    .node-label {
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-line {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 0.8;
    }
    .flow-node, .status-chip, .cell-col, .bms-stat-item, .pill-btn, .stepper-btn, .alert-box {
      transition: none !important;
      animation: none !important;
    }
  }
`;const Se={en:{common:{version:"Version",name:"Aninerel Power Card",description:"Ultimate card for Aninerel ANL 4200T inverter + Redodo BMS",offline:"OFFLINE",ok:"OK",chg:"CHG",fault:"FAULT",warn:"WARN",na:"N/A"},header:{subtitle_solar:"Hybrid 24V 4.2kW Inverter",subtitle_ups:"24V 4.2kW UPS Inverter",self_power:"Self",input_breaker:"Input"},alerts:{offline_title:"Inverter Collector Offline",offline_desc:"Key inverter telemetry sensors are currently unavailable. Check Wi-Fi/RS485 datalogger connection."},mode:{battery:"Battery",mains:"Mains",bypass:"Bypass",line:"Line",grid:"Grid",off_grid:"Off-Grid"},nodes:{solar:"Solar",battery:"Battery",inverter:"Inverter",home:"Home",grid:"Grid"},flow:{charge:"Charge",discharge:"Discharge",standby:"Standby",import:"Import",export:"Export",self:"Self",offline:"Offline",input_on:"Input ON",input_off:"Input OFF",output_off:"Output Off",load:"Load"},params:{battery:"Battery DC",grid:"Grid AC",battery_soc:"Battery SoC",battery_autonomy:"Battery Autonomy",inverter_load:"Inverter Load",self_sufficiency:"Self-Sufficiency",normal:"Normal",deviated:"Deviated",sag:"Low (Sag)",surge:"High (Surge)",offline:"Offline"},bms:{title:"BMS LiFePO4",title_dual:"BMS: 2× 12V Series (24V)",series_badge:"Series",parallel_badge:"Parallel",single_badge:"Single Pack",delta_packs:"Δ Packs",delta_cells:"Δ Cells",min_cell:"Min",max_cell:"Max",avg_cell:"Avg",temp:"Temp",cycles:"Cycles",capacity:"Capacity",remaining:"Remaining",balanced:"Balanced",drift:"Normal Drift",imbalance:"Imbalance Alert",pack_drift_warn:"Pack voltage drift detected ({delta} mV: {v1}V vs {v2}V). An active battery equalizer is recommended.",offline:"BMS telemetry unavailable"},controls:{title:"Inverter: Controls & Settings",charge_source:"Charge Source Priority",output_priority:"Output Source Priority",max_charge_current:"Max AC Charge Current",bulk_voltage:"Bulk Voltage",float_voltage:"Float Voltage",equalization:"Battery Equalization",equalization_warning:"⚠️ For LiFePO4, must ALWAYS BE OFF to prevent cell overcharging!",confirm_on:"Confirm ON?"},energy:{title:"Daily Energy Balance",total:"Total",load:"Home Consumption",grid_import:"Grid Import",bat_charge:"Battery Charged",bat_discharge:"Battery Discharged",self_consumption:"Inverter Self-Consumption",month_short:"Mo"},editor:{title:"Card Title",entities_group:"⚡ Real-time Power Entities (Required)",params_group:"📊 Electrical Parameters & Telemetry",bms_group:"🔋 Battery Bank & BMS Telemetry",controls_group:"🎛️ Inverter Controls & Settings",safety_group:"🛡️ Safety & Diagnostics",energy_group:"📈 Daily Energy Counters",display_group:"🎨 Layout & Visualization Toggles"}},ru:{common:{version:"Версия",name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo",offline:"НЕТ СВЯЗИ",ok:"ОК",chg:"ЗАРЯД",fault:"АВАРИЯ",warn:"ВНИМ.",na:"Н/Д"},header:{subtitle_solar:"Гибридный инвертор 24В 4.2 кВт",subtitle_ups:"ИБП квартиры 24В 4.2 кВт",self_power:"ХХ",input_breaker:"Вход"},alerts:{offline_title:"Потеряна связь с инвертором (Offline)",offline_desc:"Основные сенсоры телеметрии недоступны (unavailable). Проверьте питание и Wi-Fi/RS485 даталоггер."},mode:{battery:"Батарея",mains:"Сеть",bypass:"Байпас",line:"Сеть",grid:"Сеть",off_grid:"Автономно"},nodes:{solar:"Солнце",battery:"АКБ",inverter:"Инвертор",home:"Дом",grid:"Сеть"},flow:{charge:"Заряд",discharge:"Разряд",standby:"Ожидание",import:"Импорт",export:"Экспорт",self:"ХХ",offline:"Выкл",input_on:"Вход ВКЛ",input_off:"Вход ВЫКЛ",output_off:"Выход откл",load:"Нагрузка"},params:{battery:"Батарея DC",grid:"Сеть AC",battery_soc:"Заряд АКБ",battery_autonomy:"Автономность АКБ",inverter_load:"Нагрузка инвертора",self_sufficiency:"Самообеспечение",normal:"Норма",deviated:"Отклонение",sag:"Просадка (0В)",surge:"Перенапряжение",offline:"Нет связи"},bms:{title:"BMS LiFePO4",title_dual:"BMS: 2× 12В Последовательно (24В)",series_badge:"Последовательно",parallel_badge:"Параллельно",single_badge:"Моноблок",delta_packs:"Δ Батарей",delta_cells:"Δ Ячеек",min_cell:"Мин",max_cell:"Макс",avg_cell:"Сред",temp:"Темп.",cycles:"Циклы",capacity:"Емкость",remaining:"Остаток",balanced:"Сбалансировано",drift:"Легкий дрейф",imbalance:"Разбаланс!",pack_drift_warn:"Разбаланс между батареями: {delta} мВ ({v1}В против {v2}В). Рекомендуется активный балансир.",offline:"Нет данных от BMS"},controls:{title:"Инвертор: Управление и настройки",charge_source:"Приоритет источника заряда",output_priority:"Приоритет питания дома",max_charge_current:"Макс. ток сетевого заряда AC",bulk_voltage:"Напряжение Bulk (Заряд)",float_voltage:"Напряжение Float (Поддержка)",equalization:"Выравнивание (Equalization)",equalization_warning:"⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!",confirm_on:"Точно ВКЛ?"},energy:{title:"Суточный баланс энергии",total:"Дом",load:"Потребление дома",grid_import:"Импорт из сети",bat_charge:"Заряд АКБ",bat_discharge:"Отдано из АКБ",self_consumption:"Собств. нужды инвертора (ХХ)",month_short:"Мес"},editor:{title:"Заголовок карточки",entities_group:"⚡ Мощности реального времени (Обязательно)",params_group:"📊 Электрические параметры и телеметрия",bms_group:"🔋 Телеметрия BMS и блока аккумуляторов",controls_group:"🎛️ Управление инвертором и настройки",safety_group:"🛡️ Безопасность и диагностика сбоев",energy_group:"📈 Суточные счетчики электроэнергии",display_group:"🎨 Настройки отображения и видимости секций"}}};function Me(e,t){if(t&&"auto"!==t&&Se[t.toLowerCase()])return t.toLowerCase();const i=(e?.locale?.language||e?.language||("undefined"!=typeof navigator?navigator.language:"")||"ru").toLowerCase().split("-")[0];return Se[i]?i:"ru"}function Ae(e,t,i,r,a){const n=Me(t,i);let o;try{o=e.split(".").reduce((e,t)=>e?.[t],Se[n])}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.ru)}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.en)}catch(e){o=void 0}return void 0!==o&&"string"==typeof o||(o=e),o}function Ne(e,t=1){return Math.abs(e)>=1e3?`${(e/1e3).toFixed(t)} kW`:`${Math.round(e)} W`}function Ee(e,t="ru"){if(null==e||isNaN(e)||!isFinite(e)||e<=0)return null;const i=Math.min(99,e),r=Math.floor(i),a=Math.round(60*(i-r));return"ru"===t?r<=0?`~${Math.max(1,a)} мин`:a<=0||r>=24?`~${r} ч`:`~${r}ч ${a}м`:r<=0?`~${Math.max(1,a)}m`:a<=0||r>=24?`~${r}h`:`~${r}h ${a}m`}function Be(e){const{hass:t,config:i,hasSolar:r=!1,isOffline:a=!1,gridPosition:n="bottom",solarWatts:o=0,batteryWatts:s,gridWatts:l,loadWatts:c,batterySoc:d,batteryVoltage:p=null,batteryCurrent:g=null,gridVoltage:h=null,gridBreakerState:u=null,inverterLoadPercent:_=0,batteryRuntimeText:m,selfConsumptionWatts:y,operatingMode:b,isFault:f,onNodeClick:v}=e,x=i.language,w=i.max_power||4200,$=!1!==i.use_log_flow_model,k=i.min_flow_rate||.75,C=i.max_flow_rate||5,S=function(e=!1,t="bottom"){if(e){const e=[{id:"solar",d:"M 250 116 L 250 134",x1:250,y1:116,x2:250,y2:134},{id:"battery",d:"M 115 182 L 187 182",x1:115,y1:182,x2:187,y2:182},{id:"home",d:"M 313 182 L 388 182",x1:313,y1:182,x2:388,y2:182},{id:"grid",d:"M 250 230 L 250 267",x1:250,y1:230,x2:250,y2:267}];return{viewBoxHeight:375,aspectRatio:"500 / 375",tracks:e.map(e=>e.d),conduits:e,nodes:{solar:{x:250,y:44,radius:34},inverter:{x:250,y:182,radius:46},battery:{x:74,y:182,radius:39},home:{x:426,y:182,radius:36},grid:{x:250,y:304,radius:35}}}}if("top"===t){const e=[{id:"grid",d:"M 250 128 L 250 156",x1:250,y1:128,x2:250,y2:156},{id:"battery",d:"M 115 204 L 187 204",x1:115,y1:204,x2:187,y2:204},{id:"home",d:"M 313 204 L 388 204",x1:313,y1:204,x2:388,y2:204}];return{viewBoxHeight:300,aspectRatio:"500 / 300",tracks:e.map(e=>e.d),conduits:e,nodes:{grid:{x:250,y:48,radius:35},inverter:{x:250,y:204,radius:46},battery:{x:74,y:204,radius:39},home:{x:426,y:204,radius:36}}}}const i=[{id:"battery",d:"M 115 84 L 187 84",x1:115,y1:84,x2:187,y2:84},{id:"home",d:"M 313 84 L 388 84",x1:313,y1:84,x2:388,y2:84},{id:"grid",d:"M 250 131 L 250 179",x1:250,y1:131,x2:250,y2:179}];return{viewBoxHeight:305,aspectRatio:"500 / 305",tracks:i.map(e=>e.d),conduits:i,nodes:{battery:{x:74,y:84,radius:39},inverter:{x:250,y:84,radius:46},home:{x:426,y:84,radius:36},grid:{x:250,y:216,radius:35}}}}(r,n),{viewBoxHeight:M}=S,{solar:A,inverter:N,battery:E,home:B,grid:P}=S.nodes,O=function(e,t,i,r,a,n=!1,o="bottom"){const s=[],l=a?.solar||be,c=a?.battery_charge||fe,d=a?.battery_discharge||ve,p=a?.grid_import||xe,g=a?.grid_export||we,h=a?.home||$e;if(n){const t=Math.max(0,e);t>=5&&s.push({id:"flow-solar-inverter",d:"M 250 116 L 250 134",watts:t,color:l,reversed:!1})}let u="M 115 182 L 187 182",_="M 313 182 L 388 182",m="M 250 230 L 250 267",y=!0;n||("top"===o?(u="M 115 204 L 187 204",_="M 313 204 L 388 204",m="M 250 128 L 250 156",y=!1):(u="M 115 84 L 187 84",_="M 313 84 L 388 84",m="M 250 131 L 250 179",y=!0));const b=Math.max(0,r);b>=5&&s.push({id:"flow-inverter-home",d:_,watts:b,color:h,reversed:!1});const f=Math.abs(t);if(f>=5){const e=t>0;s.push({id:"flow-battery-inverter",d:u,watts:f,color:e?c:d,reversed:e})}const v=Math.abs(i);if(v>=5){const e=i>0;s.push({id:"flow-grid-inverter",d:m,watts:v,color:e?p:g,reversed:e?y:!y})}return s}(o,s,l,c,i.colors,r,n),I=null!==d&&!isNaN(d),T=I?Math.max(0,Math.min(100,Math.round(d))):0,z=2*Math.PI*33,V=z*(1-T/100),L=I?T>50?"#10b981":T>20?"#f59e0b":"#ef4444":"#64748b",D=Ae(s>=5?"flow.charge":s<=-5?"flow.discharge":"flow.standby",t,x),F=[];null===p||isNaN(p)||F.push(`${p.toFixed(1)}V`),null===g||isNaN(g)||F.push(`${g>0?"+":""}${g.toFixed(1)}A`);const R=F.join(" • ");let H="";r&&o>=10?H=` ← ${Ae("nodes.solar",t,x)}`:l>=5?H=` ← ${Ae("nodes.grid",t,x)}`:s<=-5&&(H=` ← ${Ae("nodes.battery",t,x)}`);const W=null!=y&&!isNaN(y)&&y>0,j=W?`${Ae("flow.self",t,x)}: ${Math.round(y)} W${H}`:`${(w/1e3).toFixed(1)} kW • 24V`,G=b&&"N/A"!==b&&"unavailable"!==b?b:null,Y=G||(a&&Math.abs(s)<5&&Math.abs(l)<5?Ae("flow.offline",t,x):Ae("flow.standby",t,x)),K=f?"#ef4444":a&&Math.abs(s)<5&&Math.abs(l)<5?"#64748b":s<=-5?"#f59e0b":"#3b82f6",J=f?"#ef4444":a&&Math.abs(s)<5&&Math.abs(l)<5?"#64748b":s<=-5?"#f59e0b":"#10b981",Z=Math.max(0,Math.min(100,Math.round(_??0))),X=2*Math.PI*31,Q=X*(1-Z/100),ee=a&&0===c?Ae("flow.output_off",t,x):`${Ae("flow.load",t,x)} ${Z}%`,te=[];null===h||isNaN(h)||te.push(`${Math.round(h)}V`),"off"===u?te.push(Ae("flow.input_off",t,x)):"on"===u&&te.push(Ae("flow.input_on",t,x));const ie=te.join(" • "),re=null!==h&&h<100?"#ef4444":"off"===u?"#f59e0b":null!==h&&h>=190?"#10b981":"#3b82f6";return U`
    <div
      class="power-flow-container ${r?"with-solar":"no-solar"}"
      style="--flow-aspect-ratio: 500 / ${M};"
    >
      <!-- 1. Background Conduits, Terminal Ports & Animated Energy Streams -->
      <svg class="flow-svg" viewBox="0 0 500 ${M}" preserveAspectRatio="xMidYMid meet">
        <!-- Static dual-layer conduits with terminal port sockets -->
        ${S.conduits.map(e=>q`
            <g class="conduit-group">
              <path class="pipe-track-outer" d="${e.d}" />
              <path class="pipe-track" d="${e.d}" />
              <circle class="pipe-port" cx="${e.x1}" cy="${e.y1}" r="3" />
              <circle class="pipe-port" cx="${e.x2}" cy="${e.y2}" r="3" />
            </g>
          `)}

        <!-- Active animated energy streams + moving glowing particles -->
        ${O.map(e=>{const t=function(e,t=4200,i=.75,r=5,a=!0){const n=Math.abs(e);if(n<5)return 0;const o=Math.min(n,t);let s;s=a?Math.log10(o+1)/Math.log10(t+1):o/t;const l=r-s*(r-i);return Math.max(i,Math.min(r,Number(l.toFixed(2))))}(e.watts,w,k,C,$),i=function(e,t=4200){const i=Math.min(Math.abs(e)/t,1);return Number((2.8+2.7*i).toFixed(1))}(e.watts,w),r=e.reversed?function(e){const t=e.match(/M\s*([\d.]+)\s+([\d.]+)\s+L\s*([\d.]+)\s+([\d.]+)/i);return t?`M ${t[3]} ${t[4]} L ${t[1]} ${t[2]}`:e}(e.d):e.d;return q`
            <g class="active-flow-group" style="color: ${e.color};">
              <path
                class="flow-glow-line"
                d="${r}"
                stroke="${e.color}"
                stroke-width="${i+3}"
              />
              <path
                id="${e.id}"
                class="flow-line"
                d="${r}"
                stroke="${e.color}"
                stroke-width="${i}"
                style="--flow-duration: ${t}s;"
              />
              <circle class="flow-orb-halo" r="${i+2}" fill="${e.color}">
                <animateMotion dur="${t}s" repeatCount="indefinite" path="${r}" />
              </circle>
              <circle class="flow-orb-core" r="2.6" fill="#ffffff">
                <animateMotion dur="${t}s" repeatCount="indefinite" path="${r}" />
              </circle>
            </g>
          `})}
      </svg>

      <!-- 2. Precision-Anchored Interactive Nodes (Center of badge = exact SVG (x, y)) -->
      <div class="flow-nodes-layer">
        <!-- SOLAR NODE (Top) - Only rendered when solar is enabled -->
        ${r&&A?U`
              <div
                class="flow-node node-solar"
                style="left: ${A.x/500*100}%; top: ${A.y/M*100}%;"
                @click=${()=>v(i.entities?.solar_power)}
                title="${Ae("nodes.solar",t,x)}"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <div class="node-meta">
                  <span class="node-value">${Ne(o)}</span>
                  <span class="node-label">${Ae("nodes.solar",t,x)}</span>
                </div>
              </div>
            `:""}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${E.x/500*100}%; top: ${E.y/M*100}%;"
          @click=${()=>v(i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.entities?.battery_power)}
          title="${Ae("nodes.battery",t,x)}"
        >
          <div class="node-badge">
            <svg class="battery-gauge-svg" viewBox="0 0 80 80">
              <circle class="battery-gauge-bg" cx="40" cy="40" r="${33}" />
              <circle
                class="battery-gauge-fill"
                cx="40"
                cy="40"
                r="${33}"
                stroke="${L}"
                stroke-dasharray="${z}"
                stroke-dashoffset="${V}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${I?s>=5?"mdi:battery-charging":T>80?"mdi:battery-high":T>30?"mdi:battery-medium":"mdi:battery-low":"mdi:battery-unknown"}"
                style="color: ${L};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${L};">
                ${I?`${T}%`:"—"}
              </span>
            </div>
          </div>
          <div class="node-meta">
            <span class="node-value" style="color: ${L};">
              ${Ne(Math.abs(s))}
            </span>
            <span class="node-label">
              ${m?`${D} • ${m}`:D}
            </span>
            ${R?U`<span class="node-sub">${R}</span>`:""}
          </div>
        </div>

        <!-- CENTRAL INVERTER HUB (Self-contained Glassmorphic Core — Zero Wire Overlap) -->
        <div
          class="flow-node node-inverter"
          style="left: ${N.x/500*100}%; top: ${N.y/M*100}%; --hub-accent: ${K};"
          @click=${()=>v(i.self_consumption_power_entity||i.operating_mode_entity)}
          title="${Ae("nodes.inverter",t,x)}"
        >
          <div class="node-badge inverter-hub-badge">
            <div class="hub-top-row">
              <!-- Custom Inline SVG DC/AC Hybrid Inverter Icon (Never missing!) -->
              <svg class="inverter-core-svg" viewBox="0 0 36 26" aria-hidden="true">
                <rect
                  x="1.5"
                  y="1.5"
                  width="33"
                  height="23"
                  rx="5.5"
                  fill="rgba(59, 130, 246, 0.14)"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <!-- DC symbol (top-left) -->
                <line x1="6.5" y1="7.5" x2="14.5" y2="7.5" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" />
                <line x1="6.5" y1="10.5" x2="9" y2="10.5" stroke="#10b981" stroke-width="1.6" stroke-linecap="round" />
                <line x1="12" y1="10.5" x2="14.5" y2="10.5" stroke="#10b981" stroke-width="1.6" stroke-linecap="round" />
                <!-- Diagonal converter slash -->
                <line x1="14" y1="20" x2="22" y2="6" stroke="rgba(255,255,255,0.45)" stroke-width="1.5" stroke-linecap="round" />
                <!-- AC sine wave (bottom-right) -->
                <path
                  d="M 19.5 16.5 Q 22 12, 24.5 16.5 T 29.5 16.5"
                  fill="none"
                  stroke="#38bdf8"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              <span
                class="inverter-status-dot"
                style="background: ${J}; box-shadow: 0 0 8px ${J};"
              ></span>
            </div>
            <span class="hub-mode-title">${Y}</span>
            <span class="hub-sub-pill ${W?"active-self":""}">${j}</span>
          </div>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${B.x/500*100}%; top: ${B.y/M*100}%;"
          @click=${()=>v(i.entities?.load_power)}
          title="${Ae("nodes.home",t,x)}"
        >
          <div class="node-badge">
            <svg class="home-gauge-svg" viewBox="0 0 72 72">
              <circle class="home-gauge-bg" cx="36" cy="36" r="${31}" />
              ${Z>0?q`
                    <circle
                      class="home-gauge-fill"
                      cx="36"
                      cy="36"
                      r="${31}"
                      stroke="var(--home-color, #06b6d4)"
                      stroke-dasharray="${X}"
                      stroke-dashoffset="${Q}"
                    />
                  `:""}
            </svg>
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <div class="node-meta">
            <span class="node-value">${Ne(c)}</span>
            <span class="node-label">${Ae("nodes.home",t,x)}</span>
            <span class="node-sub">${ee}</span>
          </div>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${P.x/500*100}%; top: ${P.y/M*100}%;"
          @click=${()=>v(i.grid_breaker_power_entity||i.grid_breaker_switch_entity||i.entities?.grid_power)}
          title="${Ae("nodes.grid",t,x)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
            <span
              class="grid-status-dot"
              style="background: ${re}; box-shadow: 0 0 6px ${re};"
            ></span>
          </div>
          <div class="node-meta">
            <span class="node-value">${Ne(Math.abs(l))}</span>
            <span class="node-label">
              ${Ae(l>=5?"flow.import":l<=-5?"flow.export":"nodes.grid",t,x)}
            </span>
            ${ie?U`<span class="node-sub">${ie}</span>`:""}
          </div>
        </div>
      </div>
    </div>
  `}function Pe(e,t,i=1,r="spark"){if(!e||e.length<2)return U`<div class="sparkline-placeholder"></div>`;const a=Math.min(...e),n=Math.max(...e);let o=a,s=n;if(n-a<i){const e=(a+n)/2;o=e-i/2,s=e+i/2}const l=s-o||1,c=e.map((t,i)=>{const r=i/(e.length-1)*110,a=23-(Math.max(o,Math.min(s,t))-o)/l*20;return{x:Number(r.toFixed(1)),y:Number(a.toFixed(1))}}),d=c.map(e=>`${e.x},${e.y}`).join(" "),p=`spark-grad-${r}`;return q`
    <svg class="sparkline-svg" viewBox="0 0 ${110} ${26}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${p}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${t}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${t}" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points="${`0,26 ${d} 110,26`}"
        fill="url(#${p})"
      />
      <polyline
        points="${d}"
        fill="none"
        stroke="${t}"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `}function Oe(e){const{hass:t,config:i,hasSolar:r=!1,batteryVoltage:a,batteryCurrent:n,gridVoltage:o,batterySoc:s,gridImportEnergyToday:l,loadEnergyToday:c,batteryDischargeEnergyToday:d,inverterLoadPercent:p,historyMap:g,onParamClick:h}=e,u=i.language,_=Ae("common.na",t,u);let m="#10b981";null===a||isNaN(a)?m="#64748b":a<24||a>29?m="#ef4444":a<25.6&&(m="#f59e0b");let y="#4285f4",b=Ae("params.normal",t,u);null===o||isNaN(o)?(y="#64748b",b=Ae("params.offline",t,u)):o<190||o>255?(y="#ef4444",b=Ae(o<190?"params.sag":"params.surge",t,u)):(o<210||o>245)&&(y="#f59e0b",b=Ae("params.deviated",t,u));const f=i.kpi_mode&&"auto"!==i.kpi_mode?i.kpi_mode:r?"self_sufficiency":"battery_soc";let v=Ae("params.battery_soc",t,u),x=v,w="mdi:battery-heart-variant",$=0,k="#10b981",C=i.kpi_entity||i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.battery_voltage_entity;if("battery_soc"===f)v=Ae("params.battery_soc",t,u),x=v,w=n&&n>.5?"mdi:battery-charging-high":"mdi:battery-heart-variant",$=null==s||isNaN(s)?0:Math.max(0,Math.min(100,Math.round(s))),k=$>=75?"#10b981":$>=30?"#f59e0b":"#ef4444";else if("battery_autonomy"===f)v=Ae("params.battery_autonomy",t,u),x=v,w="mdi:shield-battery-outline",C=i.kpi_entity||i.daily_energy?.battery_discharge_entity||i.daily_energy?.load_energy_entity,$=0,null!==c&&c>0&&null!=d&&($=Math.max(0,Math.min(100,Math.round(Math.max(0,d)/c*100)))),k=$>=75?"#10b981":$>=30?"#f59e0b":"#ef4444";else if("inverter_load"===f)v=Ae("params.inverter_load",t,u),x=v,w="mdi:gauge",C=i.kpi_entity||i.inverter_load_percent_entity||i.entities?.load_power,$=null==p||isNaN(p)?0:Math.max(0,Math.min(100,Math.round(p))),k=$<60?"#10b981":$<85?"#f59e0b":"#ef4444";else{if(v=Ae("params.self_sufficiency",t,u),x=v,w=r?"mdi:shield-sun":"mdi:shield-battery-outline",C=i.kpi_entity||i.daily_energy?.grid_import_entity,$=100,null!==c&&c>0){const e=null!==l?Math.max(0,l):0;$=Math.max(0,Math.min(100,Math.round(100*(1-e/c))))}k=$>=75?"#10b981":$>=40?"#f59e0b":"#ef4444"}const S=g.get("battery_voltage")||[],M=g.get("grid_voltage")||[];return U`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(i.battery_voltage_entity)}
        title="${Ae("params.battery",t,u)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">${Ae("params.battery",t,u)}</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${m}">
            ${null===a||isNaN(a)?_:`${a.toFixed(1)}V`}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${n&&n>0?"#10b981":"#f59e0b"}">
            ${null===n||isNaN(n)?_:`${n>0?"+":""}${n.toFixed(1)}A`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Pe(S,m,1.5,"bat")}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(i.grid_voltage_entity)}
        title="${Ae("params.grid",t,u)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">${Ae("params.grid",t,u)}</span>
          <span class="param-badge" style="background: ${y}22; color: ${y}">
            ${b}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${y}">
            ${null===o||isNaN(o)?_:`${Math.round(o)}V`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Pe(M,y,20,"grid")}
        </div>
      </div>

      <!-- TILE 3: KPI (BATTERY SOC / SELF-SUFFICIENCY / AUTONOMY / LOAD) -->
      <div
        class="param-tile"
        @click=${()=>h(C)}
        title="${x}"
      >
        <div class="param-header">
          <ha-icon icon="${w}"></ha-icon>
          <span class="param-title">${v}</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${k}">
            ${$}%
          </div>
          <div class="arc-gauge-wrapper">
            ${function(e,t){const i=19.75*Math.PI,r=Math.max(0,Math.min(100,e));return q`
    <svg class="arc-gauge-svg" viewBox="0 0 50 30">
      <!-- Background track -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-width="${4.5}"
        stroke-linecap="round"
      />
      <!-- Active gauge arc -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="${t}"
        stroke-width="${4.5}"
        stroke-linecap="round"
        stroke-dasharray="${i}"
        stroke-dashoffset="${i*(1-r/100)}"
      />
    </svg>
  `}($,k)}
          </div>
        </div>
      </div>
    </div>
  `}function Ie(e){const t=e.voltage??0;if(t>=40)return 48;if(t>=30)return 36;if(t>=19)return 24;if(t>=8)return 12;const i=e.cells.length;return i>=13?48:i>=10?36:i>=6?24:12}function Te(e){const{hass:t,language:i,bmsConfig:r,soc:a,voltage:n=null,current:o=null,temperature:s,cellDelta:l,cycleCount:c,remainingCapacity:d,fullCapacity:p,cells:g,onBmsClick:h,isDual:u=!1,battery1:_,battery2:m,packs:y}=e;let b=[];b=y&&y.length>0?y:u&&_&&m?[_,m]:[{name:r.bank_name||Ae("bms.single_badge",t,i),soc:a,voltage:n,current:o,temperature:s,cycleCount:c,remainingCapacity:d,voltageEntity:r.voltage_entity,socEntity:r.soc_entity,temperatureEntity:r.temperature_entity,cells:g}];const f=b.length>1,v=b.flatMap(e=>e.cells),x=v.map(e=>e.voltage).filter(e=>e>0),w=x.length>0?Math.min(...x):0,$=x.length>0?Math.max(...x):0,k=x.length>0?x.reduce((e,t)=>e+t,0)/x.length:0,C=r.chemistry||"auto";let S=3,M=3.6;"li_ion"===C||"auto"===C&&k>3.68?(S=3.1,M=4.2):("lto"===C||"auto"===C&&k>0&&k<2.85)&&(S=1.9,M=2.75);const A=M-S;let N="single";if(f)if(r.topology&&"auto"!==r.topology)N=r.topology;else{const e=b.map(e=>e.voltage??0).filter(e=>e>0);if(e.length>=2&&null!==n&&n>0){const t=e.reduce((e,t)=>e+t,0),i=t/e.length;N=Math.abs(n-t)<=Math.abs(n-i)?"series":"parallel"}else{N=Ie(b[0])<=12?"series":"parallel"}}const E=function(e,t,i){if(e.bank_name&&""!==e.bank_name.trim())return e.bank_name.trim();const r=JSON.stringify(e).toLowerCase();return r.includes("redodo")?"BMS Redodo":r.includes("growatt")?"Growatt BMS":r.includes("jikong")||r.includes("jk_bms")?"JK BMS":r.includes("daly")?"Daly BMS":r.includes("pylon")?"Pylontech BMS":r.includes("seplos")?"Seplos BMS":r.includes("pace")?"Pace BMS":r.includes("jbd")?"JBD BMS":r.includes("deye")?"Deye BMS":r.includes("felicity")?"Felicity BMS":Ae("bms.title",t,i)}(r,t,i),B=Ie(b[0]),P=v.length;let O="",I="";if(f)if("series"===N){const e=b.reduce((e,t)=>e+Ie(t),0);O=`${b.length}× ${B}V → ${e}V (${P}S)`,I=`${b.length}S • ${Ae("bms.series_badge",t,i)}`}else O=`${b.length}× ${B}V ∥ (${P} Cells)`,I=`${b.length}P • ${Ae("bms.parallel_badge",t,i)}`;else O=`${B}V (${P}S)`,I=`${P}S • ${B}V`;const T=b.map(e=>e.voltage??0).filter(e=>e>0),z=T.length>1?Math.round(1e3*(Math.max(...T)-Math.min(...T))):null;let V="#10b981",L=Ae("bms.balanced",t,i);null===z?(V="#64748b",L=Ae("bms.offline",t,i)):z>200?(V="#ef4444",L=Ae("bms.imbalance",t,i)):z>80&&(V="#f59e0b",L=Ae("bms.drift",t,i));const D=null===l||isNaN(l)?x.length>1?Math.round(1e3*($-w)):null:Math.round(l<1?1e3*l:l),F=null===D?"#64748b":D>50?"#ef4444":D>25?"#f59e0b":"#10b981",R=f&&null!==z&&z>150&&T.length>=2?Ae("bms.pack_drift_warn",t,i).replace("{delta}",String(z)).replace("{v1}",Math.min(...T).toFixed(2)).replace("{v2}",Math.max(...T).toFixed(2)):"",H=e=>{const t=Math.min(Math.max(e.length,4),8);return U`
      <div
        class="cells-grid"
        style="--cell-cols: ${t};"
        role="group"
        aria-label="Battery Cell Voltages"
      >
        ${e.map(e=>{const t=e.voltage>0,i=t&&e.voltage===w&&x.length>1&&w!==$,a=t&&e.voltage===$&&x.length>1&&w!==$;let n=8;if(t){const t=Math.max(0,Math.min(1,(e.voltage-S)/A)),i=$-w,r=.72*t+.28*(i>.002?(e.voltage-w)/i:.5);n=Math.max(18,Math.min(98,Math.round(100*r)))}const o=t?a?"cell-max":i?"cell-min":"cell-nom":"cell-offline",s=a?"▲":i?"▼":"",l="per_pack"===r.cell_numbering&&e.packCellIndex?e.packCellIndex:e.index;return U`
            <div
              class="cell-col ${o}"
              @click=${()=>h(e.rawEntityId)}
              title="Cell #${l}: ${t?`${e.voltage.toFixed(3)} V`:"Offline"} ${a?"(MAX)":i?"(MIN)":""}"
            >
              <div class="cell-cap"></div>
              <div class="cell-bar-track">
                <div class="cell-bar-fill" style="height: ${n}%;"></div>
              </div>
              <span class="cell-voltage">${function(e){return e<=0?"—":Math.round(1e3*e)%10!=0?`${e.toFixed(3)}V`:`${e.toFixed(2)}V`}(e.voltage)}</span>
              <span class="cell-id">
                #${l}${s?U`<span class="cell-tag">${s}</span>`:""}
              </span>
            </div>
          `})}
      </div>
    `};return U`
    <div class="bms-card-section universal-bms-section">
      <!-- 1. Universal BMS Bank Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="${f?"mdi:battery-sync":"mdi:battery-heart-variant"}"></ha-icon>
          <span class="bms-brand-text">${E}: ${O}</span>
          <span class="bms-topology-badge">${I}</span>
        </div>

        <div class="bms-header-status">
          ${f?U`
                <span
                  class="bms-delta-pill"
                  style="--delta-color: ${V}"
                  title="${L}"
                >
                  <ha-icon icon="mdi:scale-balance"></ha-icon>
                  <span>
                    ${Ae("bms.delta_packs",t,i)}:
                    ${null!==z?`${z} mV`:"—"}
                  </span>
                </span>
              `:""}

          <span
            class="bms-delta-pill cell-delta-pill"
            style="--delta-color: ${F}"
            @click=${()=>h(r.cell_delta_entity)}
            title="${x.length>0?`Min: ${w.toFixed(3)}V • Max: ${$.toFixed(3)}V • Avg: ${k.toFixed(3)}V`:""}"
          >
            <ha-icon icon="mdi:vector-difference"></ha-icon>
            <span>
              ${Ae("bms.delta_cells",t,i)}:
              ${null!==D?`${D} mV`:"—"}
            </span>
          </span>
        </div>
      </div>

      <!-- 2. Warning Banner if Pack Voltage Drift is High -->
      ${R?U`
            <div class="series-drift-alert">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>${R}</span>
            </div>
          `:""}

      <!-- 3. Universal Responsive Packs Grid (1, 2, 3, 4+ Packs) -->
      <div class="bms-packs-grid ${f?"multi-pack":"single-pack"}">
        ${b.map((e,t)=>{const i=null===e.soc||isNaN(e.soc)?null:Math.max(0,Math.min(100,Math.round(e.soc))),a=null===i?"#64748b":i>50?"#10b981":i>20?"#f59e0b":"#ef4444",n=e.voltageEntity||e.socEntity||(0===t?r.bat1_voltage_entity||r.battery_1?.voltage_entity||r.voltage_entity:1===t?r.bat2_voltage_entity||r.battery_2?.voltage_entity:void 0);return U`
            <div class="pack-column">
              <!-- Pack Header: Single-line Name + SoC Badge on Left, Voltage + Temp on Right -->
              <div
                class="pack-header"
                @click=${()=>h(n)}
                title="${e.name}"
              >
                <div class="pack-name-row">
                  <span
                    class="pack-dot"
                    style="background: ${a}; box-shadow: 0 0 6px ${a};"
                  ></span>
                  <span class="pack-name">${e.name}</span>
                  ${null!==i?U`
                        <span
                          class="pack-soc-badge"
                          style="color: ${a}; background: color-mix(in srgb, ${a} 15%, transparent); border-color: color-mix(in srgb, ${a} 32%, transparent);"
                        >
                          ${i}%
                        </span>
                      `:""}
                </div>

                <div class="pack-telemetry-row">
                  <span class="pack-voltage">
                    ${null!==e.voltage&&e.voltage>0?`${e.voltage.toFixed(2)}V`:"—"}
                  </span>
                  ${null===e.temperature||isNaN(e.temperature)?"":U`
                        <span class="pack-temp">
                          <ha-icon icon="mdi:thermometer"></ha-icon>
                          ${Math.round(e.temperature)}°C
                        </span>
                      `}
                </div>
              </div>

              <!-- Thin SoC Progress Bar under Header -->
              <div class="pack-soc-bar-track">
                <div
                  class="pack-soc-bar-fill"
                  style="width: ${i??0}%; background: linear-gradient(90deg, ${a} 0%, #38bdf8 100%);"
                ></div>
              </div>

              <!-- Prismatic Cell Equalizer Columns -->
              ${H(e.cells)}
            </div>
          `})}
      </div>

      <!-- 4. Summary Footer (Min/Avg/Max Cell Voltages + Cycles & Remaining Capacity) -->
      ${x.length>0||null!==c||null!==d?U`
            <div class="bms-footer-stats">
              ${x.length>1?U`
                    <div class="bms-footer-cells-summary">
                      <span class="cell-stat-chip min-chip">
                        ${Ae("bms.min_cell",t,i)}: <strong>${w.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip avg-chip">
                        ${Ae("bms.avg_cell",t,i)}: <strong>${k.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip max-chip">
                        ${Ae("bms.max_cell",t,i)}: <strong>${$.toFixed(3)}V</strong>
                      </span>
                    </div>
                  `:U`<div></div>`}

              <div class="bms-footer-right">
                ${null===c||isNaN(c)?"":U`
                      <div class="bms-footer-item" @click=${()=>h(r.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>${Ae("bms.cycles",t,i)}: <strong>${c}</strong></span>
                      </div>
                    `}
                ${null===d||isNaN(d)?"":U`
                      <div class="bms-footer-item" @click=${()=>h(r.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>
                          ${Ae("bms.remaining",t,i)}:
                          <strong>${d.toFixed(1)}${p?`/${Math.round(p)}`:""} Ah</strong>
                        </span>
                      </div>
                    `}
              </div>
            </div>
          `:""}
    </div>
  `}function ze(e){const{hass:t,language:i,dailyConfig:r,loadEnergy:a,gridImportEnergy:n,batteryChargeEnergy:o,batteryDischargeEnergy:s,selfConsumptionDailyEnergy:l,selfConsumptionDailyEntity:c,selfConsumptionMonthlyEnergy:d,selfConsumptionMonthlyEntity:p,onEnergyClick:g}=e,h=null===a||isNaN(a)?0:Math.max(0,a),u=null===n||isNaN(n)?0:Math.max(0,n),_=null===o||isNaN(o)?0:Math.max(0,o),m=null===s||isNaN(s)?0:Math.max(0,s),y=null==l||isNaN(l)?null:Math.max(0,l),b=null==d||isNaN(d)?null:Math.max(0,d),f=Math.max(h,u,_,m,y??0,.1),v=[{id:r.load_energy_entity,label:Ae("energy.load",t,i),value:h,color:"#e2e8f0",icon:"mdi:home-lightning-bolt",pct:h>0?100:0},{id:r.grid_import_entity,label:Ae("energy.grid_import",t,i),value:u,color:"#4285f4",icon:"mdi:transmission-tower",pct:h>0?Math.round(u/h*100):0},{id:r.battery_charge_entity,label:Ae("energy.bat_charge",t,i),value:_,color:"#10b981",icon:"mdi:battery-plus-variant",pct:h>0?Math.round(_/h*100):0},{id:r.battery_discharge_entity,label:Ae("energy.bat_discharge",t,i),value:m,color:"#f59e0b",icon:"mdi:battery-minus-variant",pct:h>0?Math.round(m/h*100):0}];return null!==y&&v.push({id:c||r.self_consumption_daily_entity,label:Ae("energy.self_consumption",t,i),value:y,color:"#a855f7",icon:"mdi:flash-outline",pct:0,extraTag:null!==b?`${Ae("energy.month_short",t,i)}: ${b.toFixed(1)} kWh`:void 0}),U`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>${Ae("energy.title",t,i)}</span>
        </div>
        <div class="energy-header-pills">
          ${null!==b?U`
                <span
                  class="energy-total-pill"
                  style="color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); cursor: pointer;"
                  @click=${()=>g(p||r.self_consumption_monthly_entity)}
                  title="${Ae("energy.self_consumption",t,i)} (${Ae("energy.month_short",t,i)})"
                >
                  ${Ae("flow.self",t,i)} ${Ae("energy.month_short",t,i)}: ${b.toFixed(2)} kWh
                </span>
              `:""}
          <span class="energy-total-pill">
            ${Ae("energy.total",t,i)}: ${function(e,t=1){return null==e||isNaN(e)?"0.0 kWh":`${e.toFixed(t)} kWh`}(h)}
          </span>
        </div>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${v.map(e=>{const t=Math.max(3,Math.min(100,Math.round(e.value/f*100)));return U`
            <div
              class="energy-row"
              @click=${()=>g(e.id)}
              title="${e.label}: ${e.value.toFixed(2)} kWh ${e.extraTag?`(${e.extraTag})`:""}"
            >
              <!-- Icon and Label -->
              <div class="energy-row-info">
                <ha-icon icon="${e.icon}" style="color: ${e.color}"></ha-icon>
                <span class="energy-row-label">${e.label}</span>
              </div>

              <!-- Bar Track -->
              <div class="energy-track-wrapper">
                <div class="energy-track">
                  <div
                    class="energy-fill"
                    style="width: ${t}%; background-color: ${e.color};"
                  ></div>
                </div>
              </div>

              <!-- Numeric Value & Percentage -->
              <div class="energy-row-val">
                <span class="energy-kwh" style="color: ${e.color}">
                  ${e.value.toFixed(2)} <small>kWh</small>
                </span>
                ${e.pct>0&&100!==e.pct?U`<span class="energy-pct">(${e.pct}%)</span>`:""}
              </div>
            </div>
          `})}
      </div>
    </div>
  `}const Ve={0:{code:0,title:"Normal",description:"Inverter is operating normally. No faults detected.",recommendation:"System is functioning properly.",severity:"info"},1:{code:1,title:"Fan Locked",description:"Cooling fan is locked or stopped by an obstruction.",recommendation:"Inspect cooling vents, remove dust or foreign objects from fans.",severity:"critical"},2:{code:2,title:"Inverter Over-Temperature",description:"Internal heatsink temperature exceeded the safe operating limit (>100°C).",recommendation:"Ensure adequate ventilation, reduce inverter load and allow it to cool down.",severity:"critical"},3:{code:3,title:"Battery Over-Voltage",description:"Battery terminal voltage exceeded the maximum safety threshold.",recommendation:"Verify Bulk/Float charging voltage settings and BMS parameters.",severity:"critical"},4:{code:4,title:"Battery Under-Voltage (Critical Discharge)",description:"Battery voltage dropped below the critical cut-off protection threshold.",recommendation:"Connect AC grid power to charge the battery or shed heavy loads.",severity:"warning"},5:{code:5,title:"Output Short Circuit",description:"Short circuit or extreme over-current detected on the AC output circuit.",recommendation:"Immediately disconnect AC load breakers and resolve short circuits in wiring or appliances.",severity:"critical"},6:{code:6,title:"Output Voltage Too High",description:"Inverter AC output voltage exceeded the safe operating range (>260V).",recommendation:"Disconnect sensitive appliances, restart inverter. If error persists, service is required.",severity:"critical"},7:{code:7,title:"Overload Time-Out",description:"Connected load exceeded rated inverter power longer than allowed duration.",recommendation:"Disconnect high-power loads (heaters, water heaters, kettles).",severity:"warning"},8:{code:8,title:"DC Bus Over-Voltage",description:"Internal DC bus voltage exceeded the maximum safety limit.",recommendation:"Restart inverter. If issue persists, check solar panel array Voc specifications.",severity:"critical"},9:{code:9,title:"DC Bus Soft-Start Failed",description:"High-voltage DC bus pre-charge circuit failed during startup.",recommendation:"Check battery and PV input voltages, then restart the inverter.",severity:"critical"},10:{code:10,title:"PV Over-Current",description:"Solar array input current exceeded MPPT controller maximum rating.",recommendation:"Verify solar string configuration and parallel panel wiring.",severity:"critical"},11:{code:11,title:"PV Over-Voltage",description:"Solar panel open-circuit voltage (Voc) exceeded the maximum MPPT limit.",recommendation:"Immediately disconnect solar input, reduce number of panels in series.",severity:"critical"},12:{code:12,title:"DC-DC Converter Over-Current",description:"Over-current detected in the battery DC-DC converter stage.",recommendation:"Check battery cable integrity, terminal torque, and eliminate surge loads.",severity:"critical"},13:{code:13,title:"Inverter Current Surge",description:"Hardware protection triggered due to sudden current spike or inrush surge.",recommendation:"Avoid simultaneous starting of heavy inductive loads (motors, pumps, compressors).",severity:"critical"},14:{code:14,title:"DC Bus Under-Voltage",description:"DC bus voltage dropped below minimum required operating level.",recommendation:"Check battery health under load and AC grid input stability.",severity:"warning"},51:{code:51,title:"Inverter Over-Current",description:"Hardware over-current protection triggered on power bridge transistors (IGBT/MOSFET).",recommendation:"Disconnect devices with high inrush currents, power cycle the inverter.",severity:"critical"},52:{code:52,title:"DC Bus Voltage Low",description:"DC bus voltage dropped sharply below 230V generation threshold.",recommendation:"Inspect battery condition, terminal connections, and cable lugs.",severity:"warning"},53:{code:53,title:"Inverter Soft-Start Failed",description:"Failed to establish smooth AC output waveform during startup.",recommendation:"Disconnect all AC output loads before powering on the inverter.",severity:"critical"},55:{code:55,title:"DC Voltage on AC Output",description:"Dangerous DC voltage component detected on the 230V AC output.",recommendation:"Hazardous to transformers and motors! Immediately disconnect loads and contact service.",severity:"critical"},56:{code:56,title:"Battery Connection Open",description:"Inverter did not detect a connected battery during operation.",recommendation:"Check battery breaker, DC fuse, and terminal connections.",severity:"critical"},57:{code:57,title:"Current Sensor Failed",description:"Internal current measurement sensor (Hall sensor) communication or calibration failure.",recommendation:"Restart the inverter. If error persists, main control board repair is needed.",severity:"critical"},58:{code:58,title:"Output Voltage Too Low",description:"Inverter cannot maintain 230V AC output (voltage dropped below 190V) due to overload.",recommendation:"Reduce load on the inverter.",severity:"warning"},59:{code:59,title:"Control Board Communication Error",description:"Internal communication loss between control board and power module.",recommendation:"Restart the inverter. If error persists, inspect internal ribbon cables.",severity:"critical"},60:{code:60,title:"Grid Feedback / Sync Error",description:"Reverse power flow detected or grid synchronization failed during bypass switch.",recommendation:"Verify AC grid input parameters and phase polarity.",severity:"warning"},71:{code:71,title:"Firmware / BMS Incompatibility",description:"Firmware version mismatch or lost communication with lithium battery BMS.",recommendation:"Check BMS communication cable and selected battery protocol settings.",severity:"critical"},72:{code:72,title:"BMS Critical Error",description:"Battery Management System triggered an emergency protection signal.",recommendation:"Check battery health and error logs in the BMS app.",severity:"critical"},80:{code:80,title:"Parallel CAN Bus Fault",description:"Lost communication over CAN bus between parallel inverters.",recommendation:"Check parallel communication cables and bus termination resistors.",severity:"critical"},81:{code:81,title:"Host Loss in Parallel System",description:"Follower inverter lost communication with Master unit.",recommendation:"Check power and state of the Master inverter and cable connections.",severity:"critical"},82:{code:82,title:"AC Phase Sync Loss",description:"Parallel inverters failed to synchronize AC output phases.",recommendation:"Ensure simultaneous AC grid connection to all parallel units.",severity:"critical"}},Le={0:{title:"No Warnings",description:"System operating normally without warnings."},1:{title:"Off-Grid / Battery Mode",description:"Inverter operating in autonomous battery mode (grid outage)."},2:{title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching."},4:{title:"Low Battery Voltage",description:"Battery voltage below warning threshold (recharge recommended)."},7:{title:"Overload Warning",description:"Home consumption approaching rated inverter limit (4.2 kW)."},8:{title:"Mains Low Voltage",description:"Utility AC grid voltage is 0V or below acceptable threshold (grid outage)."},10:{title:"Output Power Derating",description:"Inverter automatically derating power to prevent overheating."},14:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},15:{title:"PV Energy Weak",description:"Solar voltage below MPPT operating threshold (panels not connected or night).",isPvRelated:!0},16:{title:"Mains Over Frequency",description:"Utility AC grid frequency out of acceptable range."},19:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},20:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured threshold."},32:{title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below acceptable range."},64:{title:"PV Low Voltage",description:"Solar array voltage below MPPT operating threshold (panels not connected or overcast).",isPvRelated:!0},128:{title:"Inverter Over-Temperature",description:"Internal heatsink temperature is too high."},256:{title:"Battery Low Voltage",description:"Battery voltage has dropped below warning threshold (recharge needed)."},512:{title:"Battery Not Connected",description:"Battery circuit is open or battery is not detected."},1024:{title:"Overload Warning",description:"Home consumption is approaching or exceeding rated inverter limit (4.2 kW)."},2048:{title:"Battery Equalization Active",description:"Battery equalization charging cycle is currently active."},4096:{title:"Battery Discharged Below Recovery",description:"Battery voltage discharged below recovery threshold."},8192:{title:"Output Power Derating",description:"Inverter automatically derating output power due to thermal or voltage limits."},16384:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},32768:{title:"PV Energy Too Low",description:"Solar input power is too weak for MPPT conversion.",isPvRelated:!0},524288:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},1048576:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured safety threshold."}},De=[{bit:0,mask:1,code:0,title:"Off-Grid Mode",description:"Inverter operating in autonomous battery mode (grid outage).",isInformational:!0},{bit:1,mask:2,code:1,title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching.",isInformational:!0},{bit:2,mask:4,code:2,title:"Vendor Status Bit 2",description:"Vendor-specific operational status bit 2.",isInformational:!0},{bit:3,mask:8,code:3,title:"Mains Low Voltage",description:"Utility AC grid voltage is low or 0V (grid outage).",isInformational:!0},{bit:4,mask:16,code:4,title:"Mains Over Frequency",description:"Utility AC grid frequency exceeded upper bound.",isInformational:!0},{bit:5,mask:32,code:5,title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below lower bound.",isInformational:!0},{bit:6,mask:64,code:6,title:"PV Low Voltage",description:"Solar array voltage below MPPT startup range (panels not connected or night).",isPvRelated:!0},{bit:7,mask:128,code:7,title:"W02: Over Temperature",description:"Internal inverter heatsink temperature is elevated."},{bit:8,mask:256,code:8,title:"W04: Battery Low Voltage",description:"Battery voltage has dropped below warning threshold."},{bit:9,mask:512,code:9,title:"W09: Battery Not Connected",description:"Battery circuit is open or battery is not detected."},{bit:10,mask:1024,code:10,title:"W07: Overload",description:"Home consumption is approaching rated inverter power (4.2 kW)."},{bit:11,mask:2048,code:11,title:"Battery Equalization Charging",description:"Battery equalization charging cycle is active.",isInformational:!0},{bit:12,mask:4096,code:12,title:"Battery Discharged Below Recovery",description:"Battery discharged below recovery voltage threshold."},{bit:13,mask:8192,code:13,title:"W10: Output Power Derating",description:"Output power derating active due to high temperature."},{bit:14,mask:16384,code:14,title:"W14: Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},{bit:15,mask:32768,code:15,title:"W15: PV Energy Too Low",description:"Solar input energy is too low to use.",isPvRelated:!0},{bit:16,mask:65536,code:16,title:"Parallel Comm Interrupted",description:"Parallel communication link interrupted."},{bit:17,mask:1<<17,code:17,title:"Output Mode Mismatch",description:"Single/Parallel output mode mismatch."},{bit:18,mask:1<<18,code:18,title:"Parallel Battery Voltage Diff",description:"Parallel battery voltage difference is too large."},{bit:19,mask:1<<19,code:19,title:"Lithium Battery Comm Abnormal",description:"Lithium battery BMS communication abnormal."},{bit:20,mask:1<<20,code:20,title:"Battery Discharge Over-Current",description:"Battery discharge current exceeds set value."}];function Fe(e){const{hass:t,language:i,safetyConfig:r,isOffline:a=!1,offlineEntity:n,isFault:o,faultCode:s,faultDetailsText:l,isWarning:c,warningCode:d,warningDetailsText:p,onAlertClick:g}=e;if(!a&&!o&&!c)return U``;const h=s??0,u=function(e,t){const i=Ve[e];return i?t&&t!==i.title&&"N/A"!==t&&"0"!==t?{...i,description:`${i.description} (Inverter: ${t})`}:i:{code:e,title:t||`Fault Code F${e}`,description:t?`Inverter reports error: ${t}`:"Hardware or firmware fault detected by inverter.",recommendation:"Check inverter LCD display messages and documentation.",severity:"critical"}}(h,l),_=d??0,m=function(e,t){if(0===e||isNaN(e))return{title:"No Warnings",description:"Warnings are absent.",isBitmask:!1,isPv:!1};const i=De.filter(t=>0!==(e&t.mask));if(i.length>1){const e=i.map(e=>e.title).join("; "),r=i.map(e=>`${e.title}: ${e.description}`).join(" | "),a=i.some(e=>e.isPvRelated);return{title:e,description:t?`${r} (Status: ${t})`:r,isBitmask:!0,isPv:a}}if(1===i.length){const e=i[0];return{title:e.title,description:t&&t!==e.title?`${e.description} (Status: ${t})`:e.description,isBitmask:!0,isPv:!!e.isPvRelated}}const r=Le[e];return r?{title:r.title,description:t&&t!==r.title?`${r.description} (Status: ${t})`:r.description,isBitmask:!1,isPv:!!r.isPvRelated}:{title:t||`Warning W${e}`,description:t?`Inverter reports: ${t}`:"Inverter reported an operational parameter deviation.",isBitmask:!1,isPv:64===e||15===e}}(_,p);return U`
    <div class="alert-section-wrapper">
      <!-- Collector / Inverter Offline Banner -->
      ${a?U`
            <div
              class="alert-box alert-warn"
              @click=${()=>g(n)}
              title="Click to view entity status"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ae("common.offline",t,i)}</span>
                  <span class="alert-title">${Ae("alerts.offline_title",t,i)}</span>
                </div>
                <p class="alert-desc">${Ae("alerts.offline_desc",t,i)}</p>
              </div>
            </div>
          `:""}

      <!-- Critical Inverter Fault Banner -->
      ${o&&!a?U`
            <div
              class="alert-box alert-critical"
              @click=${()=>g(r?.fault_details_entity||r?.fault_code_entity||r?.fault_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ae("common.fault",t,i)} F${h}</span>
                  <span class="alert-title">${u.title}</span>
                </div>
                <p class="alert-desc">${u.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${u.recommendation}</span>
                </div>
              </div>
            </div>
          `:""}

      <!-- Inverter Warning Banner -->
      ${!c||o||a?"":U`
            <div
              class="alert-box alert-warn"
              @click=${()=>g(r?.warning_details_entity||r?.warning_code_entity||r?.warnings_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ae("common.warn",t,i)} W${_}</span>
                  <span class="alert-title">${m.title}</span>
                </div>
                <p class="alert-desc">${m.description}</p>
              </div>
            </div>
          `}
    </div>
  `}console.info("%c  ANINEREL-POWER-CARD  %c  Version 1.2.4  ","color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;","color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;");const Re="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",He="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",We="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats",Ue="switch.invertor_vkhod",qe="sensor.invertor_vkhod_power",je="sensor.invertor_vkhod_voltage",Ge="sensor.kukhnia_redodo_24v_bms_to_inverter_rs485_bridge_redodo_24v_remaining_energy",Ye="sensor.aninerel_anl_4200t_24l_w_pro_load_percent";let Ke=class extends ce{constructor(){super(...arguments),this._controlsExpanded=!1,this._chargeCurrentPreview=null,this._equalizationConfirmPending=!1,this._historyMap=new Map,this._lastBucketIndexMap=new Map,this._maxHistoryPoints=32,this._bucketDurationMs=27e5,this._lastHistoryFetch=0,this._historyFetchInterval=9e5}static{this.styles=[Ce]}setConfig(e){if(!e)throw new Error("Invalid card configuration");if(!e.entities)throw new Error('Required "entities" block is not defined in configuration');if(!e.entities.load_power)throw new Error("At least entities.load_power must be specified");this._config={...ye,...e,entities:{...e.entities},bms:e.bms?{...e.bms}:void 0,controls:e.controls?{...e.controls}:void 0,safety:e.safety?{...e.safety}:void 0,daily_energy:e.daily_energy?{...e.daily_energy}:void 0,colors:e.colors?{...e.colors}:void 0}}set hass(e){const t=this._hass;this._hass=e,t||this._fetchHistory(),t&&!this._hasRelevantEntitiesChanged(t,e)||(this._updateHistoryBuffers(),this.requestUpdate())}get hass(){return this._hass}firstUpdated(){this._fetchHistory()}getCardSize(){return this._config?.compact_mode?10:14}getLayoutOptions(){return{grid_rows:this._config?.compact_mode?10:14,grid_columns:4,grid_min_rows:8,grid_min_columns:2}}static getStubConfig(){return ke}static async getConfigElement(){return await Promise.resolve().then(function(){return Ze}),document.createElement("aninerel-power-card-editor")}async _fetchHistory(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity,t=this._config.grid_voltage_entity,i=[];if(e&&i.push(e),t&&i.push(t),0===i.length)return;const r=Date.now();if(!(r-this._lastHistoryFetch<this._historyFetchInterval&&this._historyMap.size>0)){this._lastHistoryFetch=r;try{const a=r-864e5,n=new Date(a).toISOString();let o=null;if("function"==typeof this._hass.callWS)o=await this._hass.callWS({type:"history/history_during_period",start_time:n,entity_ids:i,minimal_response:!0,no_attributes:!0});else if("function"==typeof this._hass.callApi){const e=`history/period/${n}?filter_entity_id=${i.join(",")}&minimal_response&no_attributes`;o=await this._hass.callApi("GET",e)}if(o){const i=Math.floor(r/this._bucketDurationMs);if(e){const t=this._extractStateList(o,e),n=this._sampleHistoryPoints(t,this._maxHistoryPoints,a,r);n.length>0&&(this._historyMap.set("battery_voltage",n),this._lastBucketIndexMap.set("battery_voltage",i))}if(t){const e=this._extractStateList(o,t),n=this._sampleHistoryPoints(e,this._maxHistoryPoints,a,r);n.length>0&&(this._historyMap.set("grid_voltage",n),this._lastBucketIndexMap.set("grid_voltage",i))}this.requestUpdate()}}catch(e){console.warn("AninerelPowerCard: using live buffer for sparklines (history API unavailable):",e)}}}_extractStateList(e,t){if(!e)return[];if(e[t]&&Array.isArray(e[t]))return e[t];if(Array.isArray(e)){for(const i of e)if(Array.isArray(i)&&i.length>0){if(i[0]?.entity_id===t)return i}else if(i?.entity_id===t&&Array.isArray(i.states))return i.states;if(void 0!==e[0]?.state||void 0!==e[0]?.s)return e}return e.entity_id===t&&Array.isArray(e.states)?e.states:[]}_sampleHistoryPoints(e,t,i,r){if(!e||0===e.length)return[];const a=[];for(const t of e){const e=void 0!==t.s?t.s:t.state,i=parseFloat(e);if(isNaN(i)||!isFinite(i))continue;let r=NaN;"number"==typeof t.lu?r=1e3*t.lu:"number"==typeof t.lc?r=1e3*t.lc:(t.last_updated||t.last_changed)&&(r=Date.parse(t.last_updated||t.last_changed)),a.push({t:r,v:i})}if(0===a.length)return[];if(a.some(e=>!isNaN(e.t))&&r>i){const e=[],n=r-i;let o=0,s=a[0].v;for(let r=0;r<t;r++){const l=i+(r+1)/t*n;let c=0,d=0;for(;o<a.length;){const e=a[o];if(!isNaN(e.t)&&e.t>l)break;s=e.v,c+=e.v,d++,o++}e.push(d>0?Number((c/d).toFixed(2)):s)}return e}const n=a.map(e=>e.v);if(n.length<=t)return n;const o=[],s=(n.length-1)/(t-1);for(let e=0;e<t;e++)o.push(n[Math.min(Math.round(e*s),n.length-1)]);return o}_updateHistoryBuffers(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity;if(e){const t=this._getNullableNumber(e);null!==t&&this._pushHistory("battery_voltage",t)}if(this._config.grid_voltage_entity){const e=this._getNullableNumber(this._config.grid_voltage_entity);null!==e&&this._pushHistory("grid_voltage",e)}}_pushHistory(e,t){const i=this._historyMap.get(e)||[],r=Math.floor(Date.now()/this._bucketDurationMs),a=this._lastBucketIndexMap.get(e);i.length<this._maxHistoryPoints?(0===i.length||Math.abs(i[i.length-1]-t)>.001)&&(i.push(t),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,r)):void 0!==a&&r>a?(i.push(t),i.length>this._maxHistoryPoints&&i.shift(),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,r)):(i[i.length-1]=t,this._historyMap.set(e,i))}_hasRelevantEntitiesChanged(e,t){if(!this._config)return!0;if(e.language!==t.language||e.locale?.language!==t.locale?.language)return!0;const i=this._getMonitoredEntityIds();for(const r of i)if(e.states[r]!==t.states[r])return!0;return!1}_getMonitoredEntityIds(){const e=[Re,He,We,Ue,qe,je,Ge,Ye];if(!this._config)return e;const{entities:t,bms:i,controls:r,safety:a,daily_energy:n}=this._config;if(t&&(t.solar_power&&e.push(t.solar_power),t.battery_power&&e.push(t.battery_power),t.grid_power&&e.push(t.grid_power),t.load_power&&e.push(t.load_power)),this._config.battery_voltage_entity&&e.push(this._config.battery_voltage_entity),this._config.battery_current_entity&&e.push(this._config.battery_current_entity),this._config.grid_voltage_entity&&e.push(this._config.grid_voltage_entity),this._config.operating_mode_entity&&e.push(this._config.operating_mode_entity),this._config.charging_active_entity&&e.push(this._config.charging_active_entity),this._config.inverter_temperature_entity&&e.push(this._config.inverter_temperature_entity),this._config.inverter_load_percent_entity&&e.push(this._config.inverter_load_percent_entity),this._config.self_consumption_power_entity&&e.push(this._config.self_consumption_power_entity),this._config.grid_breaker_switch_entity&&e.push(this._config.grid_breaker_switch_entity),this._config.grid_breaker_power_entity&&e.push(this._config.grid_breaker_power_entity),this._config.kpi_entity&&e.push(this._config.kpi_entity),i){i.soc_entity&&e.push(i.soc_entity),i.voltage_entity&&e.push(i.voltage_entity),i.current_entity&&e.push(i.current_entity),i.temperature_entity&&e.push(i.temperature_entity),i.temperature_2_entity&&e.push(i.temperature_2_entity),i.cycle_count_entity&&e.push(i.cycle_count_entity),i.cell_delta_entity&&e.push(i.cell_delta_entity),i.remaining_capacity_entity&&e.push(i.remaining_capacity_entity),i.full_capacity_entity&&e.push(i.full_capacity_entity),i.remaining_energy_entity&&e.push(i.remaining_energy_entity);const t=(t,i)=>{const r=t.trim();for(let t=1;t<=i;t++)e.push(`${r}${t}`),e.push(`${r}${t}_voltage`)},r=i.cell_count||8;t(i.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_",r);const a=i.bat1_cell_count||i.battery_1?.cell_count||4;i.bat1_soc_entity&&e.push(i.bat1_soc_entity),i.bat1_voltage_entity&&e.push(i.bat1_voltage_entity),i.bat1_temperature_entity&&e.push(i.bat1_temperature_entity),i.bat1_cell_prefix&&t(i.bat1_cell_prefix,a);const n=i.bat2_cell_count||i.battery_2?.cell_count||4;i.bat2_soc_entity&&e.push(i.bat2_soc_entity),i.bat2_voltage_entity&&e.push(i.bat2_voltage_entity),i.bat2_temperature_entity&&e.push(i.bat2_temperature_entity),i.bat2_cell_prefix&&t(i.bat2_cell_prefix,n);const o=[i.battery_1,i.battery_2,i.battery_3,i.battery_4,...Array.isArray(i.packs)?i.packs:[]];for(const i of o)i&&(i.soc_entity&&e.push(i.soc_entity),i.voltage_entity&&e.push(i.voltage_entity),i.current_entity&&e.push(i.current_entity),i.temperature_entity&&e.push(i.temperature_entity),i.cell_voltage_prefix&&t(i.cell_voltage_prefix,i.cell_count||4))}return r&&(r.charge_source_entity&&e.push(r.charge_source_entity),r.output_priority_entity&&e.push(r.output_priority_entity),r.max_charge_current_entity&&e.push(r.max_charge_current_entity),r.bulk_voltage_entity&&e.push(r.bulk_voltage_entity),r.float_voltage_entity&&e.push(r.float_voltage_entity),r.equalization_entity&&e.push(r.equalization_entity)),a&&(a.fault_active_entity&&e.push(a.fault_active_entity),a.fault_code_entity&&(e.push(a.fault_code_entity),e.push(a.fault_code_entity.replace(/_code$/,"_details"))),a.fault_details_entity&&e.push(a.fault_details_entity),a.warnings_active_entity&&e.push(a.warnings_active_entity),a.warning_code_entity&&(e.push(a.warning_code_entity),e.push(a.warning_code_entity.replace(/_code$/,"_details"))),a.warning_details_entity&&e.push(a.warning_details_entity)),n&&(n.load_energy_entity&&e.push(n.load_energy_entity),n.grid_import_entity&&e.push(n.grid_import_entity),n.battery_charge_entity&&e.push(n.battery_charge_entity),n.battery_discharge_entity&&e.push(n.battery_discharge_entity),n.self_consumption_daily_entity&&e.push(n.self_consumption_daily_entity),n.self_consumption_monthly_entity&&e.push(n.self_consumption_monthly_entity)),e.filter(Boolean)}_resolveCellEntityId(e,t){const i=e.trim(),r=[`${i}${t}`,`${i}${t}_voltage`,`${i.replace(/_voltage_?$/,"_")}${t}_voltage`,`${i.replace(/_cell_?$/,"_cell_voltage_")}${t}`];if(this._hass?.states){for(const e of r)if(this._hass.states[e]&&!this._isEntityUnavailable(e))return e;for(const e of r)if(this._hass.states[e])return e}return r[0]}_findMatchingEntity(e,t){if(!(e&&t&&this._hass&&this._hass.states))return;const i=e.replace(/_code$/,t.replace(/^_+/,"_"));return this._hass.states[i]?i:void 0}_resolveEntity(e,t){return e&&""!==e.trim()?e:t&&this._hass?.states?.[t]?t:void 0}_isEntityUnavailable(e){if(!e||!this._hass||!this._hass.states[e])return!0;const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t||""===t}_getState(e){if(!e||!this._hass||!this._hass.states[e])return"N/A";const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t?"N/A":t}_getNumber(e){return this._getNullableNumber(e)??0}_getNullableNumber(e){if(!e||!this._hass||!this._hass.states[e])return null;const t=this._hass.states[e].state;if("unavailable"===t||"unknown"===t||""===t)return null;const i=parseFloat(t);return isNaN(i)||!isFinite(i)?null:i}_getOptions(e){return e&&this._hass&&this._hass.states[e]&&this._hass.states[e].attributes?.options||[]}_handleEntityClick(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}async _handleSelectOption(e,t){if(this._hass)try{await this._hass.callService("select","select_option",{entity_id:e,option:t})}catch(e){console.error("Failed to set option:",e)}}async _handleSetNumber(e,t){if(this._hass)try{await this._hass.callService("number","set_value",{entity_id:e,value:t})}catch(e){console.error("Failed to set number value:",e)}}async _handleToggleEqualization(e,t){if(this._hass){if(!t&&!this._equalizationConfirmPending)return this._equalizationConfirmPending=!0,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer),void(this._equalizationConfirmTimer=setTimeout(()=>{this._equalizationConfirmPending=!1},4e3));this._equalizationConfirmPending=!1,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer);try{await this._hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e})}catch(e){console.error("Failed to toggle switch:",e)}}}render(){if(!this._config)return U``;const e=Me(this._hass,this._config.language),t=this._config.max_power||4200,i=Boolean(this._config.show_solar&&this._config.entities.solar_power&&""!==this._config.entities.solar_power.trim()),r=this._isEntityUnavailable(this._config.entities.load_power),a=this._config.operating_mode_entity?this._isEntityUnavailable(this._config.operating_mode_entity):r,n=Boolean(this._hass&&r&&a),o=i&&this._config.entities.solar_power?this._getNumber(this._config.entities.solar_power):0,s=this._getNumber(this._config.entities.battery_power),l=this._getNumber(this._config.entities.grid_power),c=this._resolveEntity(this._config.grid_breaker_power_entity,qe),d=c?this._getNullableNumber(c):null,p=null!==d&&d>l?d:l,g=this._getNumber(this._config.entities.load_power),h=this._getNullableNumber(this._config.battery_voltage_entity||this._config.bms?.voltage_entity),u=this._getNullableNumber(this._config.battery_current_entity||this._config.bms?.current_entity),_=this._getNullableNumber(this._config.grid_voltage_entity)??this._getNullableNumber(je),m=this._resolveEntity(this._config.self_consumption_power_entity,Re),y=m?this._getNullableNumber(m):null,b=this._resolveEntity(this._config.grid_breaker_switch_entity,Ue),f=b?this._getState(b):null;let v=this._config.bms?.soc_entity?this._getNullableNumber(this._config.bms.soc_entity):null;const x=this._getState(this._config.operating_mode_entity),w=this._getNullableNumber(this._config.inverter_temperature_entity),$="on"===this._getState(this._config.charging_active_entity),k="on"===this._getState(this._config.safety?.fault_active_entity),C=this._getNullableNumber(this._config.safety?.fault_code_entity),S=null!==C?Math.round(C):null,M=this._config.safety?.fault_details_entity||this._findMatchingEntity(this._config.safety?.fault_code_entity,"_fault_details"),A=M?this._getState(M):null,N=A&&"N/A"!==A&&"0"!==A?A:null;let E="on"===this._getState(this._config.safety?.warnings_active_entity);const B=this._getNullableNumber(this._config.safety?.warning_code_entity),P=null!==B?Math.round(B):null,O=this._config.safety?.warning_details_entity||this._findMatchingEntity(this._config.safety?.warning_code_entity,"_warning_details"),I=O?this._getState(O):null,T=I&&"N/A"!==I&&"0"!==I?I:null;let z=P;if(!i){const{effectiveCode:e,hasNonPvWarning:t}=function(e){if(null===e||0===e||isNaN(e))return{effectiveCode:null,hasNonPvWarning:!1};const t=-34944&e;return 0===t?{effectiveCode:null,hasNonPvWarning:!1}:{effectiveCode:t,hasNonPvWarning:!0}}(P);z=e,t||(E=!1)}const V=this._getNullableNumber(this._config.daily_energy?.grid_import_entity),L=this._getNullableNumber(this._config.daily_energy?.load_energy_entity),D=this._getNullableNumber(this._config.daily_energy?.battery_charge_entity),F=this._getNullableNumber(this._config.daily_energy?.battery_discharge_entity),R=this._resolveEntity(this._config.daily_energy?.self_consumption_daily_entity,He),H=R?this._getNullableNumber(R):null,W=this._resolveEntity(this._config.daily_energy?.self_consumption_monthly_entity,We),q=W?this._getNullableNumber(W):null,j=this._config.bms,G=Boolean("series"===j?.topology||"parallel"===j?.topology||j?.dual_battery||j?.battery_1&&j?.battery_2||Array.isArray(j?.packs)&&j.packs.length>1||j?.bat1_soc_entity||j?.bat1_voltage_entity||j?.bat2_soc_entity||j?.bat2_voltage_entity);let Y,K,J=[];const Z=[];if(j)if(G&&"single"!==j.topology){const e=Array.isArray(j.packs)&&j.packs.length>0?j.packs:[{name:j.bat1_name||j.battery_1?.name||"Battery #1",soc_entity:j.bat1_soc_entity||j.battery_1?.soc_entity,voltage_entity:j.bat1_voltage_entity||j.battery_1?.voltage_entity,current_entity:j.battery_1?.current_entity,temperature_entity:j.bat1_temperature_entity||j.battery_1?.temperature_entity,cell_count:j.bat1_cell_count||j.battery_1?.cell_count||4,cell_voltage_prefix:j.bat1_cell_prefix||j.battery_1?.cell_voltage_prefix||"sensor.redodo_1_cell_voltage_"},{name:j.bat2_name||j.battery_2?.name||"Battery #2",soc_entity:j.bat2_soc_entity||j.battery_2?.soc_entity,voltage_entity:j.bat2_voltage_entity||j.battery_2?.voltage_entity,current_entity:j.battery_2?.current_entity,temperature_entity:j.bat2_temperature_entity||j.battery_2?.temperature_entity,cell_count:j.bat2_cell_count||j.battery_2?.cell_count||4,cell_voltage_prefix:j.bat2_cell_prefix||j.battery_2?.cell_voltage_prefix||"sensor.redodo_2_cell_voltage_"},...j.battery_3?[j.battery_3]:[],...j.battery_4?[j.battery_4]:[]];let t=1;for(let i=0;i<e.length;i++){const r=e[i],a=this._getNullableNumber(r.voltage_entity),n=this._getNullableNumber(r.soc_entity),o=this._getNullableNumber(r.temperature_entity),s=this._getNullableNumber(r.current_entity),l=r.cell_count||4,c=r.cell_voltage_prefix||`sensor.battery_${i+1}_cell_`,d=[];for(let e=1;e<=l;e++){const i=this._resolveCellEntityId(c,e);let r=this._getNullableNumber(i)??0;r>100&&(r/=1e3),d.push({index:t++,packCellIndex:e,voltage:r>0?r:0,rawEntityId:i})}Z.push({name:r.name||`Battery #${i+1}`,voltage:a,soc:n,current:s,temperature:o,voltageEntity:r.voltage_entity,socEntity:r.soc_entity,temperatureEntity:r.temperature_entity,cells:d})}if(Y=Z[0],K=Z[1],null===v||isNaN(v)){const e=Z.map(e=>e.soc).filter(e=>null!==e&&!isNaN(e)&&e>=0);e.length>0&&(v="parallel"===j.topology?Math.round(e.reduce((e,t)=>e+t,0)/e.length):Math.min(...e))}}else{const e=j.cell_count||8,t=j.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=e;i++){const e=this._resolveCellEntityId(t,i);let r=this._getNullableNumber(e)??0;r>100&&(r/=1e3),J.push({index:i,packCellIndex:i,voltage:r>0?r:0,rawEntityId:e})}}(null===v||isNaN(v))&&null!==h&&h>=20&&(v=h>=27.2?100:h>=26.8?Math.round(80+(h-26.8)/.4*20):h>=26.4?Math.round(50+(h-26.4)/.4*30):h>=26?Math.round(20+(h-26)/.4*30):h>=24?Math.max(5,Math.round((h-24)/2*20)):5);const X=j?.nominal_capacity_wh||2560,Q=this._resolveEntity(j?.remaining_energy_entity,Ge);let ee=null;if(Q){const e=this._getNullableNumber(Q);if(null!==e){ee="kwh"===(this._hass?.states[Q]?.attributes?.unit_of_measurement?.toLowerCase()||"")?1e3*e:e}}null===ee&&null!==v&&(ee=Math.max(0,v)/100*X);let te=null;if(null!==ee&&Math.abs(s)>15)if(s<-15){const t=.1*X;te=Ee(Math.max(0,ee-t)/Math.abs(s),e)}else if(s>15&&(null===v||v<99.5)){te=Ee(Math.max(0,X-ee)/s,e)}const ie=this._resolveEntity(this._config.inverter_load_percent_entity,Ye),re=ie?this._getNullableNumber(ie):null,ae=null!==re?re:t>0?Math.min(100,Math.round(g/t*100)):0,ne=this._config.controls,oe=this._config.safety,se=this._config.daily_energy,le=ne?.max_charge_current_entity,ce=le?this._hass?.states[le]?.attributes:void 0,de="number"==typeof ce?.min?ce.min:2,pe="number"==typeof ce?.max?ce.max:100,ge="number"==typeof ce?.step?ce.step:1;return U`
      <ha-card class="${this._config.compact_mode?"compact":""}">
        <!-- 1. Header Bar with live status chips -->
        ${!1!==this._config.show_header?function(e){const{hass:t,config:i,hasSolar:r=!1,isOffline:a=!1,operatingMode:n,temperature:o,selfConsumptionWatts:s,selfConsumptionEntity:l,gridBreakerState:c,gridBreakerEntity:d,isCharging:p,isFault:g,faultCode:h,isWarning:u,warningCode:_,onChipClick:m}=e,y=i.language,b=n?n.toLowerCase():"";let f="#10b981",v="mdi:battery-charging-60";b.includes("mains")||b.includes("line")||b.includes("grid")?(f="#3b82f6",v="mdi:transmission-tower"):b.includes("bypass")?(f="#ef4444",v="mdi:transit-connection-variant"):(b.includes("battery")||b.includes("off-grid")||b.includes("off_grid"))&&(f="#10b981",v="mdi:battery-outline");let x="#10b981";null===o||isNaN(o)||(o>55?x="#ef4444":o>42&&(x="#f59e0b"));const w=r?"mdi:solar-power-variant-outline":"mdi:home-battery-outline",$=Ae(r?"header.subtitle_solar":"header.subtitle_ups",t,y);return U`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="${i.icon||w}"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${i.title||"Aninerel ANL 4200T"}</span>
          <span class="header-subtitle">${i.subtitle||$}</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${n&&"N/A"!==n&&!a?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${f}"
                @click=${()=>m(i.operating_mode_entity)}
                title="Inverter operating mode"
              >
                <ha-icon .icon=${v}></ha-icon>
                <span>${n}</span>
              </button>
            `:""}

        <!-- Inverter Temperature Chip -->
        ${null===o||isNaN(o)?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${x}"
                @click=${()=>m(i.inverter_temperature_entity)}
                title="Inverter power unit temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(o)}°C</span>
              </button>
            `}

        <!-- Self-Consumption Power Chip -->
        ${null!=s&&!isNaN(s)&&s>0?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #a855f7"
                @click=${()=>m(l)}
                title="Inverter own power consumption"
              >
                <ha-icon icon="mdi:flash-outline"></ha-icon>
                <span>${Ae("header.self_power",t,y)}: ${Math.round(s)}W</span>
              </button>
            `:""}

        <!-- Input Breaker Chip (Zigbee Smart Plug / Breaker) -->
        ${"on"===c||"off"===c?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${"on"===c?"#3b82f6":"#f59e0b"}"
                @click=${()=>m(d)}
                title="AC Input Breaker (${c.toUpperCase()})"
              >
                <ha-icon icon="${"on"===c?"mdi:electric-switch-closed":"mdi:electric-switch"}"></ha-icon>
                <span>${Ae("header.input_breaker",t,y)}: ${c.toUpperCase()}</span>
              </button>
            `:""}

        <!-- Charging Active Flag -->
        ${p&&!a?U`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${()=>m(i.charging_active_entity)}
                title="Charging active"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>${Ae("common.chg",t,y)}</span>
              </button>
            `:""}

        <!-- Offline Chip -->
        ${a?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>m(i.operating_mode_entity||i.entities?.load_power)}
                title="${Ae("alerts.offline_title",t,y)}"
              >
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
                <span>${Ae("common.offline",t,y)}</span>
              </button>
            `:""}

        <!-- Fault Active Chip -->
        ${g&&!a?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>m(i.safety?.fault_code_entity||i.safety?.fault_active_entity)}
                title="Inverter fault status"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${h?`F${h}`:Ae("common.fault",t,y)}</span>
              </button>
            `:""}

        <!-- Warnings Active Chip -->
        ${!u||g||a?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${()=>m(i.safety?.warning_code_entity||i.safety?.warnings_active_entity)}
                title="Inverter warning"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${_?`W${_}`:Ae("common.warn",t,y)}</span>
              </button>
            `}

        <!-- System Normal Chip -->
        ${g||u||a?"":U`
              <div class="status-chip chip-ok" title="System normal">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>${Ae("common.ok",t,y)}</span>
              </div>
            `}
      </div>
    </div>
  `}({hass:this._hass,config:this._config,hasSolar:i,isOffline:n,operatingMode:x,temperature:w,selfConsumptionWatts:y,selfConsumptionEntity:m,gridBreakerState:f,gridBreakerEntity:b,isCharging:$,isFault:k,faultCode:S,isWarning:E,warningCode:z,onChipClick:e=>this._handleEntityClick(e)}):""}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if offline or any faults/warnings) -->
        ${!1!==this._config.show_alerts&&(oe||n)?Fe({hass:this._hass,language:this._config.language,safetyConfig:oe,isOffline:n,offlineEntity:this._config.operating_mode_entity||this._config.entities.load_power,isFault:k,faultCode:S,faultDetailsText:N,isWarning:E,warningCode:z,warningDetailsText:T,onAlertClick:e=>this._handleEntityClick(e)}):""}

        <!-- 3. Power Flow Animated Diagram -->
        ${!1!==this._config.show_flow?Be({hass:this._hass,config:this._config,hasSolar:i,isOffline:n,gridPosition:this._config.grid_position||"bottom",solarWatts:o,batteryWatts:s,gridWatts:p,loadWatts:g,batterySoc:v,batteryVoltage:h,batteryCurrent:u,gridVoltage:_,gridBreakerState:f,inverterLoadPercent:ae,batteryRuntimeText:te,selfConsumptionWatts:y,operatingMode:x,isFault:k,onNodeClick:e=>this._handleEntityClick(e)}):""}

        <!-- 4. Electrical Telemetry & Battery SoC / Self-Sufficiency KPI -->
        ${!1!==this._config.show_params?Oe({hass:this._hass,config:this._config,hasSolar:i,batteryVoltage:h,batteryCurrent:u,gridVoltage:_,batterySoc:v,gridImportEnergyToday:V,loadEnergyToday:L,batteryDischargeEnergyToday:F,inverterLoadPercent:ae,historyMap:this._historyMap,onParamClick:e=>this._handleEntityClick(e)}):""}

        <!-- 5. Universal BMS Battery Cell Telemetry & Balancing (Single, Series, or Parallel) -->
        ${!1!==this._config.show_bms&&j?Te({hass:this._hass,language:this._config.language,bmsConfig:j,isDual:G,battery1:Y,battery2:K,packs:Z.length>0?Z:void 0,soc:v,voltage:h,current:u,temperature:this._getNullableNumber(j.temperature_entity),temperature2:this._getNullableNumber(j.temperature_2_entity),cycleCount:this._getNullableNumber(j.cycle_count_entity),remainingCapacity:this._getNullableNumber(j.remaining_capacity_entity),fullCapacity:this._getNullableNumber(j.full_capacity_entity),cellDelta:this._getNullableNumber(j.cell_delta_entity),cells:J,onBmsClick:e=>this._handleEntityClick(e)}):""}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${!1!==this._config.show_controls&&ne?function(e){const{controlsConfig:t,hass:i,language:r,expanded:a,chargeSource:n,chargeSourceOptions:o,outputPriority:s,outputPriorityOptions:l,maxChargeCurrent:c,maxChargeCurrentPreview:d,maxChargeCurrentMin:p=2,maxChargeCurrentMax:g=100,maxChargeCurrentStep:h=1,bulkVoltage:u,floatVoltage:_,isEqualization:m,equalizationConfirmPending:y=!1,onToggleExpand:b,onSelectOption:f,onPreviewNumber:v,onSetNumber:x,onToggleEqualization:w}=e,$=d??c??15,k=[];s&&"N/A"!==s&&"unavailable"!==s&&k.push(s),null==c||isNaN(c)||k.push(`${c}A`);const C=k.join(" • ");return U`
    <div class="controls-card-section ${a?"expanded":""}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${b}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>${Ae("controls.title",i,r)}</span>
        </div>
        <div class="controls-header-right">
          ${C?U`<span class="controls-quick-summary">${C}</span>`:""}
          <ha-icon
            class="chevron-icon ${a?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${a?U`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority -->
                ${t.charge_source_entity?U`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>${Ae("controls.charge_source",i,r)}</label>
                        </div>
                        <div class="pill-selector">
                          ${(o.length>0?o:["Solar First","Solar and Utility","Only Solar"]).map(e=>U`
                              <button
                                type="button"
                                class="pill-btn ${n===e?"active":""}"
                                @click=${()=>f(t.charge_source_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}

                <!-- Select 2: Output Source Priority -->
                ${t.output_priority_entity?U`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:power-plug-outline"></ha-icon>
                          <label>${Ae("controls.output_priority",i,r)}</label>
                        </div>
                        <div class="pill-selector">
                          ${(l.length>0?l:["SUB","SBU","USB"]).map(e=>U`
                              <button
                                type="button"
                                class="pill-btn ${s===e?"active":""}"
                                @click=${()=>f(t.output_priority_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- Slider: Max AC Charging Current (Dynamic min/max/step) -->
              ${t.max_charge_current_entity?U`
                    <div class="control-box slider-box">
                      <div class="control-box-header">
                        <div class="control-label-wrap">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <label>${Ae("controls.max_charge_current",i,r)}</label>
                        </div>
                        <span class="control-live-val">${$} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">${p}A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="${p}"
                          max="${g}"
                          step="${h}"
                          .value=${String($)}
                          @input=${e=>{const t=parseFloat(e.target.value);v?.(t)}}
                          @change=${e=>{const i=parseFloat(e.target.value);v?.(null),x(t.max_charge_current_entity,i)}}
                        />
                        <span class="slider-boundary">${g}A</span>
                      </div>
                    </div>
                  `:""}

              <!-- Dual Voltage Inputs: Bulk & Float -->
              <div class="controls-grid-2">
                <!-- Bulk Voltage -->
                ${t.bulk_voltage_entity?U`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-up-bold-box-outline"></ha-icon>
                          <label>${Ae("controls.bulk_voltage",i,r)}</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((u??28.2)-.1).toFixed(1));x(t.bulk_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${null!=u?u.toFixed(1):"28.2"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((u??28.2)+.1).toFixed(1));x(t.bulk_voltage_entity,e)}}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `:""}

                <!-- Float Voltage -->
                ${t.float_voltage_entity?U`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-down-bold-box-outline"></ha-icon>
                          <label>${Ae("controls.float_voltage",i,r)}</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((_??27)-.1).toFixed(1));x(t.float_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${null!=_?_.toFixed(1):"27.0"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((_??27)+.1).toFixed(1));x(t.float_voltage_entity,e)}}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- DANGER ZONE: Equalization Switch (Inline 2-Step Confirmation) -->
              ${t.equalization_entity?U`
                    <div class="danger-switch-row ${m||y?"danger-active":""}">
                      <div class="danger-info">
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>${Ae("controls.equalization",i,r)}</span>
                        </div>
                        <span class="danger-desc">
                          ${Ae("controls.equalization_warning",i,r)}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${m||y?"switch-on":"switch-off"}"
                        @click=${()=>w(t.equalization_entity,m)}
                      >
                        ${m?"ON":y?Ae("controls.confirm_on",i,r):"OFF"}
                      </button>
                    </div>
                  `:""}
            </div>
          `:""}
    </div>
  `}({controlsConfig:ne,hass:this._hass,language:this._config.language,expanded:this._controlsExpanded,onToggleExpand:()=>{this._controlsExpanded=!this._controlsExpanded},chargeSource:ne.charge_source_entity?this._getState(ne.charge_source_entity):void 0,chargeSourceOptions:this._getOptions(ne.charge_source_entity),outputPriority:ne.output_priority_entity?this._getState(ne.output_priority_entity):void 0,outputPriorityOptions:this._getOptions(ne.output_priority_entity),maxChargeCurrent:this._getNullableNumber(ne.max_charge_current_entity),maxChargeCurrentPreview:this._chargeCurrentPreview,maxChargeCurrentMin:de,maxChargeCurrentMax:pe,maxChargeCurrentStep:ge,bulkVoltage:this._getNullableNumber(ne.bulk_voltage_entity),floatVoltage:this._getNullableNumber(ne.float_voltage_entity),isEqualization:!!ne.equalization_entity&&"on"===this._getState(ne.equalization_entity),equalizationConfirmPending:this._equalizationConfirmPending,onSelectOption:(e,t)=>this._handleSelectOption(e,t),onPreviewNumber:e=>{this._chargeCurrentPreview=e},onSetNumber:(e,t)=>this._handleSetNumber(e,t),onToggleEqualization:(e,t)=>this._handleToggleEqualization(e,t)}):""}

        <!-- 7. Daily Energy Statistics (Today's Production, Consumption & Self-Consumption) -->
        ${!1!==this._config.show_energy&&se?ze({hass:this._hass,language:this._config.language,dailyConfig:se,loadEnergy:L,gridImportEnergy:V,batteryChargeEnergy:D,batteryDischargeEnergy:F,selfConsumptionDailyEnergy:H,selfConsumptionDailyEntity:R,selfConsumptionMonthlyEnergy:q,selfConsumptionMonthlyEntity:W,onEnergyClick:e=>this._handleEntityClick(e)}):""}
      </ha-card>
    `}};e([_e()],Ke.prototype,"_config",void 0),e([_e()],Ke.prototype,"_hass",void 0),e([_e()],Ke.prototype,"_controlsExpanded",void 0),e([_e()],Ke.prototype,"_chargeCurrentPreview",void 0),e([_e()],Ke.prototype,"_equalizationConfirmPending",void 0),Ke=e([pe(me)],Ke),window.customCards=window.customCards||[],window.customCards.push({type:me,name:"Aninerel Power Card",description:"Ultimate power card for Aninerel ANL 4200T inverter + Redodo BMS",preview:!0,documentationURL:"https://github.com/ziffmafiya/aninerel-power-card"});let Je=class extends ce{setConfig(e){const t=JSON.parse(JSON.stringify(e||{}));t.bms&&(t.bms.battery_1&&(!t.bms.bat1_name&&t.bms.battery_1.name&&(t.bms.bat1_name=t.bms.battery_1.name),!t.bms.bat1_soc_entity&&t.bms.battery_1.soc_entity&&(t.bms.bat1_soc_entity=t.bms.battery_1.soc_entity),!t.bms.bat1_voltage_entity&&t.bms.battery_1.voltage_entity&&(t.bms.bat1_voltage_entity=t.bms.battery_1.voltage_entity),!t.bms.bat1_temperature_entity&&t.bms.battery_1.temperature_entity&&(t.bms.bat1_temperature_entity=t.bms.battery_1.temperature_entity),!t.bms.bat1_cell_prefix&&t.bms.battery_1.cell_voltage_prefix&&(t.bms.bat1_cell_prefix=t.bms.battery_1.cell_voltage_prefix)),t.bms.battery_2&&(!t.bms.bat2_name&&t.bms.battery_2.name&&(t.bms.bat2_name=t.bms.battery_2.name),!t.bms.bat2_soc_entity&&t.bms.battery_2.soc_entity&&(t.bms.bat2_soc_entity=t.bms.battery_2.soc_entity),!t.bms.bat2_voltage_entity&&t.bms.battery_2.voltage_entity&&(t.bms.bat2_voltage_entity=t.bms.battery_2.voltage_entity),!t.bms.bat2_temperature_entity&&t.bms.battery_2.temperature_entity&&(t.bms.bat2_temperature_entity=t.bms.battery_2.temperature_entity),!t.bms.bat2_cell_prefix&&t.bms.battery_2.cell_voltage_prefix&&(t.bms.bat2_cell_prefix=t.bms.battery_2.cell_voltage_prefix))),this._config=t}_computeLabel(e){return e.label?e.label:Ae(`editor.${e.name}`,this.hass,this._config?.language)||e.name}_valueChanged(e){const t=e.detail.value,i=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_getSchema(){const e=this._config?.language;return[{name:"title",label:Ae("editor.title",this.hass,e)||"Card Title",selector:{text:{}}},{name:"subtitle",label:"Card Subtitle",selector:{text:{}}},{name:"icon",label:"Header Icon (MDI)",selector:{icon:{}}},{name:"language",label:"Interface Language (Язык интерфейса)",selector:{select:{options:[{value:"auto",label:"Auto (Home Assistant Default)"},{value:"ru",label:"Русский (Russian)"},{value:"en",label:"English"}]}}},{name:"entities",type:"expandable",title:Ae("editor.entities_group",this.hass,e)||"⚡ Real-time Power Entities (Required)",schema:[{name:"solar_power",label:"Solar Generation (PV Power) [Optional]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_power",label:"Battery Power (+Charge / -Discharge)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"grid_power",label:"Grid Power (AC Input)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"load_power",label:"Home Load Power",required:!0,selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ae("editor.params_group",this.hass,e)||"📊 Electrical Parameters & Telemetry",schema:[{name:"battery_voltage_entity",label:"Battery Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"battery_current_entity",label:"Battery Current (A)",selector:{entity:{domain:"sensor"}}},{name:"grid_voltage_entity",label:"Grid AC Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"operating_mode_entity",label:"Inverter Operating Mode",selector:{entity:{domain:"sensor"}}},{name:"inverter_temperature_entity",label:"Inverter Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"inverter_load_percent_entity",label:"Inverter Load Percentage (%)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_power_entity",label:"Inverter Self-Consumption Power (W)",selector:{entity:{domain:"sensor"}}},{name:"grid_breaker_switch_entity",label:"AC Input Zigbee Breaker / Smart Plug (Switch)",selector:{entity:{domain:"switch"}}},{name:"charging_active_entity",label:"Charging Active Flag",selector:{entity:{domain:"binary_sensor"}}},{name:"kpi_mode",label:"3rd Radial Gauge KPI Metric",selector:{select:{options:[{value:"auto",label:"Auto (Battery SoC for UPS, Self-Sufficiency for Solar)"},{value:"battery_soc",label:"Battery SoC % (State of Charge)"},{value:"battery_autonomy",label:"Battery Autonomy % (Daily Load Powered by Battery)"},{value:"self_sufficiency",label:"Solar Self-Sufficiency % (Autarky)"},{value:"inverter_load",label:"Inverter Load %"}]}}},{name:"kpi_entity",label:"Custom KPI Entity (Overrides click/gauge entity)",selector:{entity:{domain:"sensor"}}}]},{name:"bms",type:"expandable",title:Ae("editor.bms_group",this.hass,e)||"🔋 Universal BMS & Battery Bank Telemetry",schema:[{name:"bank_name",label:"Battery Bank / BMS Title (Auto-detected if empty, e.g. BMS Redodo, JK BMS, Pylontech)",selector:{text:{}}},{name:"topology",label:"Connection Topology (Series / Parallel / Single)",selector:{select:{options:[{value:"auto",label:"Auto-Detect (From Pack & Total Voltages)"},{value:"series",label:"Series Connection (e.g. 2× 12V → 24V)"},{value:"parallel",label:"Parallel Connection (e.g. 2× 24V / 48V ∥)"},{value:"single",label:"Single Battery Pack (12V / 24V / 48V)"}]}}},{name:"chemistry",label:"Battery Chemistry (Cell Voltage Curve)",selector:{select:{options:[{value:"auto",label:"Auto-Detect (LiFePO4 / Li-Ion / LTO)"},{value:"lifepo4",label:"LiFePO4 (3.00V – 3.65V / cell)"},{value:"li_ion",label:"Li-Ion / NMC / LCO (3.10V – 4.20V / cell)"},{value:"lto",label:"LTO Lithium Titanate (1.90V – 2.75V / cell)"}]}}},{name:"cell_numbering",label:"Multi-Pack Cell Numbering Style",selector:{select:{options:[{value:"continuous",label:"Continuous (#1..#8 across packs)"},{value:"per_pack",label:"Per Pack (#1..#4 in each pack)"}]}}},{name:"dual_battery",label:"🔋 Enable Multi-Pack / Dual Battery Mode",selector:{boolean:{}}},{name:"nominal_capacity_wh",label:"Total Battery Nominal Energy Capacity (Wh, e.g. 2560 for 24V 100Ah)",selector:{number:{min:500,max:6e4,step:100,mode:"box"}}},{name:"remaining_energy_entity",label:"Remaining Battery Energy Entity (Wh / kWh, for Runtime calc)",selector:{entity:{domain:"sensor"}}},{name:"bat1_name",label:"Battery #1: Name (e.g. Redodo #1 / Pack 1)",selector:{text:{}}},{name:"bat1_soc_entity",label:"Battery #1: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat1_voltage_entity",label:"Battery #1: Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"bat1_temperature_entity",label:"Battery #1: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat1_cell_count",label:"Battery #1: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:1,max:24,step:1,mode:"box"}}},{name:"bat1_cell_prefix",label:"Battery #1: Cell Sensor Prefix (e.g. sensor.pack1_cell_)",selector:{text:{}}},{name:"bat2_name",label:"Battery #2: Name (e.g. Redodo #2 / Pack 2)",selector:{text:{}}},{name:"bat2_soc_entity",label:"Battery #2: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat2_voltage_entity",label:"Battery #2: Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"bat2_temperature_entity",label:"Battery #2: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat2_cell_count",label:"Battery #2: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:1,max:24,step:1,mode:"box"}}},{name:"bat2_cell_prefix",label:"Battery #2: Cell Sensor Prefix (e.g. sensor.pack2_cell_)",selector:{text:{}}},{name:"soc_entity",label:"Total / Bank SOC % (Single Pack or Bank Sensor)",selector:{entity:{domain:"sensor"}}},{name:"voltage_entity",label:"Total Battery Voltage via BMS (V)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"BMS Cell Temperature Probe (°C)",selector:{entity:{domain:"sensor"}}},{name:"cell_delta_entity",label:"Cell Imbalance (Delta mV)",selector:{entity:{domain:"sensor"}}},{name:"cycle_count_entity",label:"Battery Cycle Count",selector:{entity:{domain:"sensor"}}},{name:"remaining_capacity_entity",label:"Remaining Capacity (Ah)",selector:{entity:{domain:"sensor"}}},{name:"cell_count",label:"Single Pack Cell Count (4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:3,max:24,step:1,mode:"box"}}},{name:"cell_voltage_prefix",label:"Single Pack Cell Sensor Prefix (1..N)",selector:{text:{}}}]},{name:"controls",type:"expandable",title:Ae("editor.controls_group",this.hass,e)||"🎛️ Inverter Controls & Settings",schema:[{name:"charge_source_entity",label:"Charge Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"output_priority_entity",label:"Output Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"max_charge_current_entity",label:"Max AC Charge Current (Number)",selector:{entity:{domain:"number"}}},{name:"bulk_voltage_entity",label:"Bulk Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"float_voltage_entity",label:"Float Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"equalization_entity",label:"Battery Equalization Mode (Switch)",selector:{entity:{domain:"switch"}}}]},{name:"safety",type:"expandable",title:Ae("editor.safety_group",this.hass,e)||"🛡️ Safety & Diagnostics",schema:[{name:"fault_active_entity",label:"Fault Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"fault_code_entity",label:"Fault Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"fault_details_entity",label:"Fault Details Text [Optional]",selector:{entity:{domain:"sensor"}}},{name:"warnings_active_entity",label:"Warnings Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"warning_code_entity",label:"Warning Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"warning_details_entity",label:"Warning Details Text [Optional]",selector:{entity:{domain:"sensor"}}}]},{name:"daily_energy",type:"expandable",title:Ae("editor.energy_group",this.hass,e)||"📈 Daily Energy Counters",schema:[{name:"load_energy_entity",label:"Daily Home Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_import_entity",label:"Daily Grid Import (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_charge_entity",label:"Daily Battery Charge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_entity",label:"Daily Battery Discharge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_daily_entity",label:"Daily Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_monthly_entity",label:"Monthly Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ae("editor.display_group",this.hass,e)||"🎨 Layout & Visualization Toggles",schema:[{name:"max_power",label:"Scale Max Power Rating (W)",selector:{number:{min:1e3,max:2e4,step:200,mode:"box"}}},{name:"use_log_flow_model",label:"Logarithmic flow animation speed model",selector:{boolean:{}}},{name:"compact_mode",label:"Compact layout mode (smaller padding & spacing)",selector:{boolean:{}}},{name:"show_header",label:"Show header bar with status chips",selector:{boolean:{}}},{name:"show_flow",label:"Show animated power flow diagram",selector:{boolean:{}}},{name:"show_solar",label:"Show solar generation (PV)",selector:{boolean:{}}},{name:"grid_position",label:"Grid position when solar is hidden",selector:{select:{options:[{value:"bottom",label:"Bottom (Default)"},{value:"top",label:"Top (Replaces solar)"}]}}},{name:"show_params",label:"Show electrical telemetry parameters",selector:{boolean:{}}},{name:"show_bms",label:"Show Battery Bank & BMS section",selector:{boolean:{}}},{name:"show_controls",label:"Show inverter controls & settings",selector:{boolean:{}}},{name:"show_energy",label:"Show daily energy statistics",selector:{boolean:{}}},{name:"show_alerts",label:"Show diagnostic alerts & warnings",selector:{boolean:{}}}]}]}static{this.styles=o`
    ha-form {
      display: block;
      padding: 12px 0;
    }
  `}render(){return this.hass&&this._config?U`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${e=>this._computeLabel(e)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:U``}};e([ue({attribute:!1})],Je.prototype,"hass",void 0),e([_e()],Je.prototype,"_config",void 0),Je=e([pe("aninerel-power-card-editor")],Je);var Ze=Object.freeze({__proto__:null,get AninerelPowerCardEditor(){return Je}});export{Ke as AninerelPowerCard};
