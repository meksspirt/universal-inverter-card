function e(e,t,i,a){var r,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new n(i,e,a)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",y=u.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);r?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),r=t.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=a;const n=r.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const n=this.constructor;if(!1===a&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,y?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,C=$.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+N,E=`<${M}>`,B=document,P=()=>B.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,D=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,V=/"/g,W=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),U=H(1),q=H(2),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,K=B.createTreeWalker(B,129);function Z(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,a=[];let r,n=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===z?"!--"===l[1]?o=L:void 0!==l[1]?o=D:void 0!==l[2]?(W.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=r??z,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?R:'"'===l[3]?V:F):o===V||o===F?o=R:o===L||o===D?o=z:(o=R,r=void 0);const p=o===R&&e[t+1].startsWith("/>")?" ":"";n+=o===z?i+E:c>=0?(a.push(s),i.slice(0,c)+A+i.slice(c)+N+p):i+N+(-2===c?t:p)}return[Z(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class X{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,n=0;const o=e.length-1,s=this.parts,[l,c]=J(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=K.nextNode())&&s.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(A)){const t=c[n++],i=a.getAttribute(e).split(N),o=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?ae:"?"===o[1]?re:"@"===o[1]?ne:ie}),a.removeAttribute(e)}else e.startsWith(N)&&(s.push({type:6,index:r}),a.removeAttribute(e));if(W.test(a.tagName)){const e=a.textContent.split(N),t=e.length-1;if(t>0){a.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],P()),K.nextNode(),s.push({type:2,index:++r});a.append(e[t],P())}}}else if(8===a.nodeType)if(a.data===M)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(N,e+1));)s.push({type:7,index:r}),e+=N.length-1}r++}}static createElement(e,t){const i=B.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,a){if(t===j)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,a)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??B).importNode(t,!0);K.currentNode=a;let r=K.nextNode(),n=0,o=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new te(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new oe(r,this,e)),this._$AV.push(t),s=i[++o]}n!==s?.index&&(r=K.nextNode(),n++)}return K.currentNode=B,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new ee(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new te(this.O(P()),this.O(P()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,a){const r=this.strings;let n=!1;if(void 0===r)e=Q(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==j,n&&(this._$AH=e);else{const a=e;let o,s;for(e=r[0],o=0;o<r.length-1;o++)s=Q(this,a[i+o],t,o),s===j&&(s=this._$AH[o]),n||=!O(s)||s!==this._$AH[o],s===G?e=G:e!==G&&(e+=(s??"")+r[o+1]),this._$AH[o]=s}n&&!a&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ae extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class re extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ne extends ie{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===j)return;const i=this._$AH,a=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==G&&(i===G||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=$.litHtmlPolyfillSupport;se?.(X,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new te(t.insertBefore(P(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},ge=(e=he,t,i)=>{const{kind:a,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,r,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];t.call(this,i),this.requestUpdate(a,r,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function ue(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ue({...e,state:!0,attribute:!1})}const me="aninerel-power-card",ye={title:"Aninerel ANL 4200T",max_power:4200,inverter_capacity:4200,min_flow_rate:.75,max_flow_rate:6,use_log_flow_model:!0,show_header:!0,show_flow:!0,show_solar:!1,grid_position:"bottom",show_params:!0,show_bms:!0,show_controls:!0,show_energy:!0,show_alerts:!0,compact_mode:!1,language:"auto"},be="var(--energy-solar-color, #F59E0B)",fe="var(--energy-battery-in-color, #10B981)",ve="var(--energy-battery-out-color, #FF9800)",xe="var(--energy-grid-consumption-color, #4285F4)",we="var(--energy-grid-return-color, #2ecc71)",$e="var(--primary-text-color, #E0E0E0)",ke={type:"custom:aninerel-power-card",title:"Aninerel ANL 4200T",show_solar:!1,entities:{battery_power:"sensor.aninerel_anl_4200t_24l_w_pro_battery_power",grid_power:"sensor.aninerel_anl_4200t_24l_w_pro_grid_power",load_power:"sensor.aninerel_anl_4200t_24l_w_pro_load_power"},battery_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage",battery_current_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_current",grid_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage",operating_mode_entity:"sensor.aninerel_anl_4200t_24l_w_pro_operating_mode",charging_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active",inverter_temperature_entity:"sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature",inverter_load_percent_entity:"sensor.aninerel_anl_4200t_24l_w_pro_load_percent",self_consumption_power_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",grid_breaker_switch_entity:"switch.invertor_vkhod",bms:{soc_entity:"sensor.redodo_battery_state_of_charge",cell_count:8,cell_voltage_prefix:"sensor.redodo_battery_cell_voltage_",nominal_capacity_wh:2560},controls:{charge_source_entity:"select.aninerel_anl_4200t_24l_w_pro_charge_source_priority",output_priority_entity:"select.aninerel_anl_4200t_24l_w_pro_output_source_priority",max_charge_current_entity:"number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current",bulk_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage",float_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage",equalization_entity:"switch.aninerel_anl_4200t_24l_w_pro_battery_equalization"},safety:{fault_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active",fault_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_fault_code",warnings_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active",warning_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_code",warning_details_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_details"},daily_energy:{load_energy_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today",grid_import_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today",battery_charge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today",battery_discharge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today",self_consumption_daily_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",self_consumption_monthly_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats"}},Ce=o`
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
    margin: 0 auto;
    aspect-ratio: var(--flow-aspect-ratio, 500 / 360);
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

  .pipe-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.07);
    stroke-width: 2.5;
    stroke-linecap: round;
  }

  .flow-line {
    fill: none;
    stroke-dasharray: 4 10;
    stroke-linecap: round;
    animation: flow-dash var(--flow-duration, 2.5s) linear infinite;
    will-change: stroke-dashoffset;
    filter: drop-shadow(0 0 4px currentColor);
  }

  .flow-line.reverse {
    animation-direction: reverse;
  }

  @keyframes flow-dash {
    from {
      stroke-dashoffset: 28;
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

  .flow-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  .flow-node:hover {
    transform: translate(-50%, -50%) scale(1.05);
    filter: brightness(1.1);
  }

  .node-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(20, 24, 38, 0.88);
    border: 2px solid var(--node-border, rgba(255, 255, 255, 0.15));
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .node-value {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    margin-top: 4px;
    white-space: nowrap;
  }

  .node-label {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .node-solar { --node-border: var(--solar-color); }
  .node-solar .node-badge { width: 66px; height: 66px; }
  .node-solar ha-icon { --mdc-icon-size: 30px; color: var(--solar-color); }
  .node-solar .node-value { color: var(--solar-color); }

  .node-inverter { --node-border: var(--inverter-color); }
  .node-inverter .node-badge {
    width: 64px;
    height: 64px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(20, 24, 38, 0.95) 80%);
    border: 2px solid rgba(59, 130, 246, 0.5);
  }
  .node-inverter ha-icon { --mdc-icon-size: 30px; color: var(--inverter-color); }
  .inverter-status-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #10b981;
    border: 2px solid #1a1a2e;
    box-shadow: 0 0 6px #10b981;
  }

  .node-battery { --node-border: transparent; }
  .node-battery .node-badge {
    width: 78px;
    height: 78px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .battery-gauge-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .battery-gauge-bg {
    fill: rgba(20, 24, 38, 0.85);
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 5;
  }
  .battery-gauge-fill {
    fill: none;
    stroke-width: 5.5;
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
    font-size: 0.85rem;
    font-weight: 700;
    line-height: 1;
    margin-top: 2px;
  }

  .node-home { --node-border: rgba(255, 255, 255, 0.3); }
  .node-home .node-badge { width: 70px; height: 70px; }
  .node-home ha-icon { --mdc-icon-size: 32px; color: var(--home-color); }
  .node-home .node-value { color: var(--home-color); }

  .node-grid { --node-border: var(--grid-import-color); }
  .node-grid .node-badge { width: 66px; height: 66px; }
  .node-grid ha-icon { --mdc-icon-size: 30px; color: var(--grid-import-color); }
  .node-grid .node-value { color: var(--grid-import-color); }

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
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .bms-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #10b981;
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
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--delta-color, #10b981);
    background: color-mix(in srgb, var(--delta-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--delta-color, #10b981) 30%, transparent);
    padding: 2px 8px;
    border-radius: 9999px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-delta-pill:hover {
    transform: scale(1.05);
  }

  .bms-delta-pill ha-icon {
    --mdc-icon-size: 14px;
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

  /* Dual Battery Layout */
  .dual-battery-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pack-column {
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pack-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--divider);
  }

  .pack-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pack-name {
    font-size: 0.78rem;
    font-weight: 700;
  }

  .pack-soc-badge {
    font-size: 0.68rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 1px 6px;
    border-radius: 9999px;
  }

  .pack-telemetry-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .pack-voltage {
    font-size: 0.85rem;
    font-weight: 700;
    color: #38bdf8;
  }

  .pack-temp {
    font-size: 0.7rem;
    color: var(--secondary-text);
  }

  .series-bridge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    user-select: none;
    flex-shrink: 0;
  }

  .bridge-line {
    width: 2px;
    height: 16px;
    background: rgba(255, 255, 255, 0.1);
  }

  .bridge-badge {
    font-size: 0.62rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--solar-color);
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    padding: 3px 6px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  .pack-cells {
    height: 72px;
  }

  .bms-footer-stats {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 8px;
    margin-top: 2px;
    border-top: 1px solid var(--divider);
    font-size: 0.72rem;
    color: var(--secondary-text);
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

  .bms-body {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .cells-grid {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    flex-grow: 1;
    height: 76px;
    padding-bottom: 2px;
  }

  .cell-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    height: 100%;
    transition: transform 0.15s ease;
  }

  .cell-col:hover {
    transform: translateY(-2px);
  }

  .cell-bar-track {
    width: 100%;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .cell-bar-fill {
    width: 100%;
    border-radius: 3px;
    transition: height 0.4s ease, background-color 0.3s ease;
  }

  .cell-max {
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  }

  .cell-min {
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
  }

  .cell-voltage {
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.1;
    white-space: nowrap;
  }

  .cell-id {
    font-size: 0.64rem;
    color: var(--secondary-text);
    line-height: 1;
  }

  .bms-telemetry-panel {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-left: 1px solid var(--divider);
    padding-left: 12px;
    min-width: 85px;
  }

  .bms-stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .bms-stat-item:hover {
    transform: translateX(2px);
  }

  .bms-stat-item ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
  }

  .bms-stat-text {
    display: flex;
    flex-direction: column;
  }

  .bms-stat-val {
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .bms-stat-lbl {
    font-size: 0.6rem;
    color: var(--secondary-text);
    text-transform: uppercase;
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
`;const Se={en:{common:{version:"Version",name:"Aninerel Power Card",description:"Ultimate card for Aninerel ANL 4200T inverter + Redodo BMS",offline:"OFFLINE",ok:"OK",chg:"CHG",fault:"FAULT",warn:"WARN",na:"N/A"},header:{subtitle_solar:"Hybrid 24V 4.2kW Inverter",subtitle_ups:"24V 4.2kW UPS Inverter",self_power:"Self",input_breaker:"Input"},alerts:{offline_title:"Inverter Collector Offline",offline_desc:"Key inverter telemetry sensors are currently unavailable. Check Wi-Fi/RS485 datalogger connection."},mode:{battery:"Battery",mains:"Mains",bypass:"Bypass",line:"Line",grid:"Grid",off_grid:"Off-Grid"},nodes:{solar:"Solar",battery:"Battery",inverter:"Inverter",home:"Home",grid:"Grid"},flow:{charge:"Charge",discharge:"Discharge",standby:"Standby",import:"Import",export:"Export",self:"Self"},params:{battery:"Battery DC",grid:"Grid AC",battery_soc:"Battery SoC",battery_autonomy:"Battery Autonomy",inverter_load:"Inverter Load",self_sufficiency:"Self-Sufficiency",normal:"Normal",deviated:"Deviated",sag:"Low (Sag)",surge:"High (Surge)",offline:"Offline"},bms:{title:"BMS Redodo LiFePO4",title_dual:"BMS Redodo: 2× 12V Series (24V)",series_badge:"24V Series",delta_packs:"Δ Packs",delta_cells:"Δ Cells",temp:"Temp",cycles:"Cycles",capacity:"Capacity",remaining:"Remaining",balanced:"Balanced",drift:"Normal Drift",imbalance:"Imbalance Alert",pack_drift_warn:"Pack voltage drift detected ({delta} mV: {v1}V vs {v2}V). A 24V active battery equalizer is recommended.",offline:"BMS telemetry unavailable"},controls:{title:"Inverter: Controls & Settings",charge_source:"Charge Source Priority",output_priority:"Output Source Priority",max_charge_current:"Max AC Charge Current",bulk_voltage:"Bulk Voltage",float_voltage:"Float Voltage",equalization:"Battery Equalization",equalization_warning:"⚠️ For LiFePO4, must ALWAYS BE OFF to prevent cell overcharging!",confirm_on:"Confirm ON?"},energy:{title:"Daily Energy Balance",total:"Total",load:"Home Consumption",grid_import:"Grid Import",bat_charge:"Battery Charged",bat_discharge:"Battery Discharged",self_consumption:"Inverter Self-Consumption",month_short:"Mo"},editor:{title:"Card Title",entities_group:"⚡ Real-time Power Entities (Required)",params_group:"📊 Electrical Parameters & Telemetry",bms_group:"🔋 BMS Redodo LiFePO4 Telemetry",controls_group:"🎛️ Inverter Controls & Settings",safety_group:"🛡️ Safety & Diagnostics",energy_group:"📈 Daily Energy Counters",display_group:"🎨 Layout & Visualization Toggles"}},ru:{common:{version:"Версия",name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo",offline:"НЕТ СВЯЗИ",ok:"ОК",chg:"ЗАРЯД",fault:"АВАРИЯ",warn:"ВНИМ.",na:"Н/Д"},header:{subtitle_solar:"Гибридный инвертор 24В 4.2 кВт",subtitle_ups:"ИБП квартиры 24В 4.2 кВт",self_power:"ХХ",input_breaker:"Вход"},alerts:{offline_title:"Потеряна связь с инвертором (Offline)",offline_desc:"Основные сенсоры телеметрии недоступны (unavailable). Проверьте питание и Wi-Fi/RS485 даталоггер."},mode:{battery:"Батарея",mains:"Сеть",bypass:"Байпас",line:"Сеть",grid:"Сеть",off_grid:"Автономно"},nodes:{solar:"Солнце",battery:"АКБ",inverter:"Инвертор",home:"Дом",grid:"Сеть"},flow:{charge:"Заряд",discharge:"Разряд",standby:"Ожидание",import:"Импорт",export:"Экспорт",self:"ХХ"},params:{battery:"Батарея DC",grid:"Сеть AC",battery_soc:"Заряд АКБ",battery_autonomy:"Автономность АКБ",inverter_load:"Нагрузка инвертора",self_sufficiency:"Самообеспечение",normal:"Норма",deviated:"Отклонение",sag:"Просадка (0В)",surge:"Перенапряжение",offline:"Нет связи"},bms:{title:"BMS Redodo LiFePO4",title_dual:"BMS Redodo: 2× 12В Последовательно (24В)",series_badge:"24В Сборка",delta_packs:"Δ Батарей",delta_cells:"Δ Ячеек",temp:"Темп.",cycles:"Циклы",capacity:"Емкость",remaining:"Остаток",balanced:"Сбалансировано",drift:"Легкий дрейф",imbalance:"Разбаланс!",pack_drift_warn:"Разбаланс между 12В батареями: {delta} мВ ({v1}В против {v2}В). Рекомендуется активный балансир 24В.",offline:"Нет данных от BMS"},controls:{title:"Инвертор: Управление и настройки",charge_source:"Приоритет источника заряда",output_priority:"Приоритет питания дома",max_charge_current:"Макс. ток сетевого заряда AC",bulk_voltage:"Напряжение Bulk (Заряд)",float_voltage:"Напряжение Float (Поддержка)",equalization:"Выравнивание (Equalization)",equalization_warning:"⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!",confirm_on:"Точно ВКЛ?"},energy:{title:"Суточный баланс энергии",total:"Дом",load:"Потребление дома",grid_import:"Импорт из сети",bat_charge:"Заряд АКБ",bat_discharge:"Отдано из АКБ",self_consumption:"Собств. нужды инвертора (ХХ)",month_short:"Мес"},editor:{title:"Заголовок карточки",entities_group:"⚡ Мощности реального времени (Обязательно)",params_group:"📊 Электрические параметры и телеметрия",bms_group:"🔋 Телеметрия BMS Redodo LiFePO4",controls_group:"🎛️ Управление инвертором и настройки",safety_group:"🛡️ Безопасность и диагностика сбоев",energy_group:"📈 Суточные счетчики электроэнергии",display_group:"🎨 Настройки отображения и видимости секций"}}};function Ae(e,t){if(t&&"auto"!==t&&Se[t.toLowerCase()])return t.toLowerCase();const i=(e?.locale?.language||e?.language||("undefined"!=typeof navigator?navigator.language:"")||"ru").toLowerCase().split("-")[0];return Se[i]?i:"ru"}function Ne(e,t,i,a,r){const n=Ae(t,i);let o;try{o=e.split(".").reduce((e,t)=>e?.[t],Se[n])}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.ru)}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.en)}catch(e){o=void 0}return void 0!==o&&"string"==typeof o||(o=e),o}function Me(e,t=1){return Math.abs(e)>=1e3?`${(e/1e3).toFixed(t)} kW`:`${Math.round(e)} W`}function Ee(e,t="ru"){if(null==e||isNaN(e)||!isFinite(e)||e<=0)return null;const i=Math.min(99,e),a=Math.floor(i),r=Math.round(60*(i-a));return"ru"===t?a<=0?`~${Math.max(1,r)} мин`:r<=0||a>=24?`~${a} ч`:`~${a}ч ${r}м`:a<=0?`~${Math.max(1,r)}m`:r<=0||a>=24?`~${a}h`:`~${a}h ${r}m`}function Be(e){const{hass:t,config:i,hasSolar:a=!1,isOffline:r=!1,gridPosition:n="bottom",solarWatts:o=0,batteryWatts:s,gridWatts:l,loadWatts:c,batterySoc:d,batteryRuntimeText:p,selfConsumptionWatts:h,operatingMode:g,isFault:u,onNodeClick:_}=e,m=i.language,y=i.max_power||4200,b=!1!==i.use_log_flow_model,f=i.min_flow_rate||.75,v=i.max_flow_rate||5,x=function(e=!1,t="bottom"){return e?{viewBoxHeight:360,aspectRatio:"500 / 360",tracks:["M 250 82 L 250 140","M 116 175 L 216 175","M 284 175 L 388 175","M 250 210 L 250 274"],nodes:{solar:{x:250,y:44,radius:34},inverter:{x:250,y:175,radius:32},battery:{x:74,y:175,radius:40},home:{x:426,y:175,radius:36},grid:{x:250,y:308,radius:34}}}:"top"===t?{viewBoxHeight:290,aspectRatio:"500 / 290",tracks:["M 250 115 L 250 163","M 116 195 L 216 195","M 284 195 L 388 195"],nodes:{grid:{x:250,y:65,radius:34},inverter:{x:250,y:195,radius:32},battery:{x:74,y:195,radius:40},home:{x:426,y:195,radius:36}}}:{viewBoxHeight:290,aspectRatio:"500 / 290",tracks:["M 116 90 L 216 90","M 284 90 L 388 90","M 250 145 L 250 191"],nodes:{battery:{x:74,y:90,radius:40},inverter:{x:250,y:90,radius:32},home:{x:426,y:90,radius:36},grid:{x:250,y:225,radius:34}}}}(a,n),{viewBoxHeight:w}=x,{solar:$,inverter:k,battery:C,home:S,grid:A}=x.nodes,N=r?[]:function(e,t,i,a,r,n=!1,o="bottom"){const s=[],l=r?.solar||be,c=r?.battery_charge||fe,d=r?.battery_discharge||ve,p=r?.grid_import||xe,h=r?.grid_export||we,g=r?.home||$e;if(n){const t=Math.max(0,e);t>=5&&s.push({id:"flow-solar-inverter",d:"M 250 82 L 250 140",watts:t,color:l,reversed:!1})}let u="M 116 175 L 216 175",_="M 284 175 L 388 175",m="M 250 210 L 250 274",y=!0;n||("top"===o?(u="M 116 195 L 216 195",_="M 284 195 L 388 195",m="M 250 115 L 250 163",y=!1):(u="M 116 90 L 216 90",_="M 284 90 L 388 90",m="M 250 145 L 250 191",y=!0));const b=Math.max(0,a);b>=5&&s.push({id:"flow-inverter-home",d:_,watts:b,color:g,reversed:!1});const f=Math.abs(t);if(f>=5){const e=t>0;s.push({id:"flow-battery-inverter",d:u,watts:f,color:e?c:d,reversed:e})}const v=Math.abs(i);if(v>=5){const e=i>0;s.push({id:"flow-grid-inverter",d:m,watts:v,color:e?p:h,reversed:e?y:!y})}return s}(o,s,l,c,i.colors,a,n),M=null!==d&&!isNaN(d),E=M?Math.max(0,Math.min(100,Math.round(d))):0,B=2*Math.PI*32,P=B*(1-E/100),O=M?E>50?"#10b981":E>20?"#f59e0b":"#ef4444":"#64748b",I=Ne(s>=5?"flow.charge":s<=-5?"flow.discharge":"flow.standby",t,m);let T="";a&&o>=10?T=` ← ${Ne("nodes.solar",t,m)}`:l>=5?T=` ← ${Ne("nodes.grid",t,m)}`:s<=-5&&(T=` ← ${Ne("nodes.battery",t,m)}`);const z=null!=h&&!isNaN(h)&&h>0?`${Ne("flow.self",t,m)}: ${Math.round(h)} W${T}`:`${(y/1e3).toFixed(1)} kW`;return U`
    <div
      class="power-flow-container ${a?"with-solar":"no-solar"}"
      style="--flow-aspect-ratio: 500 / ${w};"
    >
      <!-- 1. Background Pipelines and Animated Energy Flows -->
      <svg class="flow-svg" viewBox="0 0 500 ${w}" preserveAspectRatio="xMidYMid meet">
        <!-- Static background wire tracks with clean clearance -->
        ${x.tracks.map(e=>q`<path class="pipe-track" d="${e}" />`)}

        <!-- Active animated flow lines -->
        ${N.map(e=>{const t=function(e,t=4200,i=.75,a=5,r=!0){const n=Math.abs(e);if(n<5)return 0;const o=Math.min(n,t);let s;s=r?Math.log10(o+1)/Math.log10(t+1):o/t;const l=a-s*(a-i);return Math.max(i,Math.min(a,Number(l.toFixed(2))))}(e.watts,y,f,v,b),i=function(e,t=4200){const i=Math.min(Math.abs(e)/t,1);return Number((2.8+2.7*i).toFixed(1))}(e.watts,y);return q`
            <path
              id="${e.id}"
              class="flow-line ${e.reversed?"reverse":""}"
              d="${e.d}"
              stroke="${e.color}"
              stroke-width="${i}"
              style="--flow-duration: ${t}s; color: ${e.color};"
            />
          `})}
      </svg>

      <!-- 2. Interactive Badges Layer -->
      <div class="flow-nodes-layer">
        <!-- SOLAR NODE (Top) - Only rendered when solar is enabled -->
        ${a&&$?U`
              <div
                class="flow-node node-solar"
                style="left: ${$.x/500*100}%; top: ${$.y/w*100}%;"
                @click=${()=>_(i.entities?.solar_power)}
                title="${Ne("nodes.solar",t,m)}"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <span class="node-value">${Me(o)}</span>
                <span class="node-label">${Ne("nodes.solar",t,m)}</span>
              </div>
            `:""}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${C.x/500*100}%; top: ${C.y/w*100}%;"
          @click=${()=>_(i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.entities?.battery_power)}
          title="${Ne("nodes.battery",t,m)}"
        >
          <div class="node-badge">
            <svg class="battery-gauge-svg" viewBox="0 0 80 80">
              <circle
                class="battery-gauge-bg"
                cx="40"
                cy="40"
                r="${32}"
              />
              <circle
                class="battery-gauge-fill"
                cx="40"
                cy="40"
                r="${32}"
                stroke="${O}"
                stroke-dasharray="${B}"
                stroke-dashoffset="${P}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${M?s>20?"mdi:battery-charging":E>80?"mdi:battery-high":E>30?"mdi:battery-medium":"mdi:battery-low":"mdi:battery-unknown"}"
                style="color: ${O};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${O};">
                ${M?`${E}%`:"—"}
              </span>
            </div>
          </div>
          <span class="node-value" style="color: ${O};">
            ${Me(Math.abs(s))}
          </span>
          <span class="node-label">
            ${p?`${I} • ${p}`:I}
          </span>
        </div>

        <!-- CENTRAL INVERTER NODE -->
        <div
          class="flow-node node-inverter"
          style="left: ${k.x/500*100}%; top: ${k.y/w*100}%;"
          @click=${()=>_(i.self_consumption_power_entity||i.operating_mode_entity)}
          title="${Ne("nodes.inverter",t,m)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span
              class="inverter-status-dot"
              style="background: ${u||r?"#ef4444":"#10b981"}; box-shadow: 0 0 6px ${u||r?"#ef4444":"#10b981"};"
            ></span>
          </div>
          <span class="node-value">${g||Ne("nodes.inverter",t,m)}</span>
          <span class="node-label">${z}</span>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${S.x/500*100}%; top: ${S.y/w*100}%;"
          @click=${()=>_(i.entities?.load_power)}
          title="${Ne("nodes.home",t,m)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <span class="node-value">${r?"—":Me(c)}</span>
          <span class="node-label">${Ne("nodes.home",t,m)}</span>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${A.x/500*100}%; top: ${A.y/w*100}%;"
          @click=${()=>_(i.grid_breaker_power_entity||i.entities?.grid_power)}
          title="${Ne("nodes.grid",t,m)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
          </div>
          <span class="node-value">${r?"—":Me(Math.abs(l))}</span>
          <span class="node-label">
            ${Ne(l>=5?"flow.import":l<=-5?"flow.export":"nodes.grid",t,m)}
          </span>
        </div>
      </div>
    </div>
  `}function Pe(e,t,i=1,a="spark"){if(!e||e.length<2)return U`<div class="sparkline-placeholder"></div>`;const r=Math.min(...e),n=Math.max(...e);let o=r,s=n;if(n-r<i){const e=(r+n)/2;o=e-i/2,s=e+i/2}const l=s-o||1,c=e.map((t,i)=>{const a=i/(e.length-1)*110,r=23-(Math.max(o,Math.min(s,t))-o)/l*20;return{x:Number(a.toFixed(1)),y:Number(r.toFixed(1))}}),d=c.map(e=>`${e.x},${e.y}`).join(" "),p=`spark-grad-${a}`;return q`
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
  `}function Oe(e){const{hass:t,config:i,hasSolar:a=!1,batteryVoltage:r,batteryCurrent:n,gridVoltage:o,batterySoc:s,gridImportEnergyToday:l,loadEnergyToday:c,batteryDischargeEnergyToday:d,inverterLoadPercent:p,historyMap:h,onParamClick:g}=e,u=i.language,_=Ne("common.na",t,u);let m="#10b981";null===r||isNaN(r)?m="#64748b":r<24||r>29?m="#ef4444":r<25.6&&(m="#f59e0b");let y="#4285f4",b=Ne("params.normal",t,u);null===o||isNaN(o)?(y="#64748b",b=Ne("params.offline",t,u)):o<190||o>255?(y="#ef4444",b=Ne(o<190?"params.sag":"params.surge",t,u)):(o<210||o>245)&&(y="#f59e0b",b=Ne("params.deviated",t,u));const f=i.kpi_mode&&"auto"!==i.kpi_mode?i.kpi_mode:a?"self_sufficiency":"battery_soc";let v=Ne("params.battery_soc",t,u),x=v,w="mdi:battery-heart-variant",$=0,k="#10b981",C=i.kpi_entity||i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.battery_voltage_entity;if("battery_soc"===f)v=Ne("params.battery_soc",t,u),x=v,w=n&&n>.5?"mdi:battery-charging-high":"mdi:battery-heart-variant",$=null==s||isNaN(s)?0:Math.max(0,Math.min(100,Math.round(s))),k=$>=75?"#10b981":$>=30?"#f59e0b":"#ef4444";else if("battery_autonomy"===f)v=Ne("params.battery_autonomy",t,u),x=v,w="mdi:shield-battery-outline",C=i.kpi_entity||i.daily_energy?.battery_discharge_entity||i.daily_energy?.load_energy_entity,$=0,null!==c&&c>0&&null!=d&&($=Math.max(0,Math.min(100,Math.round(Math.max(0,d)/c*100)))),k=$>=75?"#10b981":$>=30?"#f59e0b":"#ef4444";else if("inverter_load"===f)v=Ne("params.inverter_load",t,u),x=v,w="mdi:gauge",C=i.kpi_entity||i.inverter_load_percent_entity||i.entities?.load_power,$=null==p||isNaN(p)?0:Math.max(0,Math.min(100,Math.round(p))),k=$<60?"#10b981":$<85?"#f59e0b":"#ef4444";else{if(v=Ne("params.self_sufficiency",t,u),x=v,w=a?"mdi:shield-sun":"mdi:shield-battery-outline",C=i.kpi_entity||i.daily_energy?.grid_import_entity,$=100,null!==c&&c>0){const e=null!==l?Math.max(0,l):0;$=Math.max(0,Math.min(100,Math.round(100*(1-e/c))))}k=$>=75?"#10b981":$>=40?"#f59e0b":"#ef4444"}const S=h.get("battery_voltage")||[],A=h.get("grid_voltage")||[];return U`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>g(i.battery_voltage_entity)}
        title="${Ne("params.battery",t,u)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">${Ne("params.battery",t,u)}</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${m}">
            ${null===r||isNaN(r)?_:`${r.toFixed(1)}V`}
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
        @click=${()=>g(i.grid_voltage_entity)}
        title="${Ne("params.grid",t,u)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">${Ne("params.grid",t,u)}</span>
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
          ${Pe(A,y,20,"grid")}
        </div>
      </div>

      <!-- TILE 3: KPI (BATTERY SOC / SELF-SUFFICIENCY / AUTONOMY / LOAD) -->
      <div
        class="param-tile"
        @click=${()=>g(C)}
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
            ${function(e,t){const i=19.75*Math.PI,a=Math.max(0,Math.min(100,e));return q`
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
        stroke-dashoffset="${i*(1-a/100)}"
      />
    </svg>
  `}($,k)}
          </div>
        </div>
      </div>
    </div>
  `}function Ie(e){const{hass:t,language:i,dailyConfig:a,loadEnergy:r,gridImportEnergy:n,batteryChargeEnergy:o,batteryDischargeEnergy:s,selfConsumptionDailyEnergy:l,selfConsumptionDailyEntity:c,selfConsumptionMonthlyEnergy:d,selfConsumptionMonthlyEntity:p,onEnergyClick:h}=e,g=null===r||isNaN(r)?0:Math.max(0,r),u=null===n||isNaN(n)?0:Math.max(0,n),_=null===o||isNaN(o)?0:Math.max(0,o),m=null===s||isNaN(s)?0:Math.max(0,s),y=null==l||isNaN(l)?null:Math.max(0,l),b=null==d||isNaN(d)?null:Math.max(0,d),f=Math.max(g,u,_,m,y??0,.1),v=[{id:a.load_energy_entity,label:Ne("energy.load",t,i),value:g,color:"#e2e8f0",icon:"mdi:home-lightning-bolt",pct:g>0?100:0},{id:a.grid_import_entity,label:Ne("energy.grid_import",t,i),value:u,color:"#4285f4",icon:"mdi:transmission-tower",pct:g>0?Math.round(u/g*100):0},{id:a.battery_charge_entity,label:Ne("energy.bat_charge",t,i),value:_,color:"#10b981",icon:"mdi:battery-plus-variant",pct:g>0?Math.round(_/g*100):0},{id:a.battery_discharge_entity,label:Ne("energy.bat_discharge",t,i),value:m,color:"#f59e0b",icon:"mdi:battery-minus-variant",pct:g>0?Math.round(m/g*100):0}];return null!==y&&v.push({id:c||a.self_consumption_daily_entity,label:Ne("energy.self_consumption",t,i),value:y,color:"#a855f7",icon:"mdi:flash-outline",pct:0,extraTag:null!==b?`${Ne("energy.month_short",t,i)}: ${b.toFixed(1)} kWh`:void 0}),U`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>${Ne("energy.title",t,i)}</span>
        </div>
        <div class="energy-header-pills">
          ${null!==b?U`
                <span
                  class="energy-total-pill"
                  style="color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); cursor: pointer;"
                  @click=${()=>h(p||a.self_consumption_monthly_entity)}
                  title="${Ne("energy.self_consumption",t,i)} (${Ne("energy.month_short",t,i)})"
                >
                  ${Ne("flow.self",t,i)} ${Ne("energy.month_short",t,i)}: ${b.toFixed(2)} kWh
                </span>
              `:""}
          <span class="energy-total-pill">
            ${Ne("energy.total",t,i)}: ${function(e,t=1){return null==e||isNaN(e)?"0.0 kWh":`${e.toFixed(t)} kWh`}(g)}
          </span>
        </div>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${v.map(e=>{const t=Math.max(3,Math.min(100,Math.round(e.value/f*100)));return U`
            <div
              class="energy-row"
              @click=${()=>h(e.id)}
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
  `}const Te={0:{code:0,title:"Normal",description:"Inverter is operating normally. No faults detected.",recommendation:"System is functioning properly.",severity:"info"},1:{code:1,title:"Fan Locked",description:"Cooling fan is locked or stopped by an obstruction.",recommendation:"Inspect cooling vents, remove dust or foreign objects from fans.",severity:"critical"},2:{code:2,title:"Inverter Over-Temperature",description:"Internal heatsink temperature exceeded the safe operating limit (>100°C).",recommendation:"Ensure adequate ventilation, reduce inverter load and allow it to cool down.",severity:"critical"},3:{code:3,title:"Battery Over-Voltage",description:"Battery terminal voltage exceeded the maximum safety threshold.",recommendation:"Verify Bulk/Float charging voltage settings and BMS parameters.",severity:"critical"},4:{code:4,title:"Battery Under-Voltage (Critical Discharge)",description:"Battery voltage dropped below the critical cut-off protection threshold.",recommendation:"Connect AC grid power to charge the battery or shed heavy loads.",severity:"warning"},5:{code:5,title:"Output Short Circuit",description:"Short circuit or extreme over-current detected on the AC output circuit.",recommendation:"Immediately disconnect AC load breakers and resolve short circuits in wiring or appliances.",severity:"critical"},6:{code:6,title:"Output Voltage Too High",description:"Inverter AC output voltage exceeded the safe operating range (>260V).",recommendation:"Disconnect sensitive appliances, restart inverter. If error persists, service is required.",severity:"critical"},7:{code:7,title:"Overload Time-Out",description:"Connected load exceeded rated inverter power longer than allowed duration.",recommendation:"Disconnect high-power loads (heaters, water heaters, kettles).",severity:"warning"},8:{code:8,title:"DC Bus Over-Voltage",description:"Internal DC bus voltage exceeded the maximum safety limit.",recommendation:"Restart inverter. If issue persists, check solar panel array Voc specifications.",severity:"critical"},9:{code:9,title:"DC Bus Soft-Start Failed",description:"High-voltage DC bus pre-charge circuit failed during startup.",recommendation:"Check battery and PV input voltages, then restart the inverter.",severity:"critical"},10:{code:10,title:"PV Over-Current",description:"Solar array input current exceeded MPPT controller maximum rating.",recommendation:"Verify solar string configuration and parallel panel wiring.",severity:"critical"},11:{code:11,title:"PV Over-Voltage",description:"Solar panel open-circuit voltage (Voc) exceeded the maximum MPPT limit.",recommendation:"Immediately disconnect solar input, reduce number of panels in series.",severity:"critical"},12:{code:12,title:"DC-DC Converter Over-Current",description:"Over-current detected in the battery DC-DC converter stage.",recommendation:"Check battery cable integrity, terminal torque, and eliminate surge loads.",severity:"critical"},13:{code:13,title:"Inverter Current Surge",description:"Hardware protection triggered due to sudden current spike or inrush surge.",recommendation:"Avoid simultaneous starting of heavy inductive loads (motors, pumps, compressors).",severity:"critical"},14:{code:14,title:"DC Bus Under-Voltage",description:"DC bus voltage dropped below minimum required operating level.",recommendation:"Check battery health under load and AC grid input stability.",severity:"warning"},51:{code:51,title:"Inverter Over-Current",description:"Hardware over-current protection triggered on power bridge transistors (IGBT/MOSFET).",recommendation:"Disconnect devices with high inrush currents, power cycle the inverter.",severity:"critical"},52:{code:52,title:"DC Bus Voltage Low",description:"DC bus voltage dropped sharply below 230V generation threshold.",recommendation:"Inspect battery condition, terminal connections, and cable lugs.",severity:"warning"},53:{code:53,title:"Inverter Soft-Start Failed",description:"Failed to establish smooth AC output waveform during startup.",recommendation:"Disconnect all AC output loads before powering on the inverter.",severity:"critical"},55:{code:55,title:"DC Voltage on AC Output",description:"Dangerous DC voltage component detected on the 230V AC output.",recommendation:"Hazardous to transformers and motors! Immediately disconnect loads and contact service.",severity:"critical"},56:{code:56,title:"Battery Connection Open",description:"Inverter did not detect a connected battery during operation.",recommendation:"Check battery breaker, DC fuse, and terminal connections.",severity:"critical"},57:{code:57,title:"Current Sensor Failed",description:"Internal current measurement sensor (Hall sensor) communication or calibration failure.",recommendation:"Restart the inverter. If error persists, main control board repair is needed.",severity:"critical"},58:{code:58,title:"Output Voltage Too Low",description:"Inverter cannot maintain 230V AC output (voltage dropped below 190V) due to overload.",recommendation:"Reduce load on the inverter.",severity:"warning"},59:{code:59,title:"Control Board Communication Error",description:"Internal communication loss between control board and power module.",recommendation:"Restart the inverter. If error persists, inspect internal ribbon cables.",severity:"critical"},60:{code:60,title:"Grid Feedback / Sync Error",description:"Reverse power flow detected or grid synchronization failed during bypass switch.",recommendation:"Verify AC grid input parameters and phase polarity.",severity:"warning"},71:{code:71,title:"Firmware / BMS Incompatibility",description:"Firmware version mismatch or lost communication with lithium battery BMS.",recommendation:"Check BMS communication cable and selected battery protocol settings.",severity:"critical"},72:{code:72,title:"BMS Critical Error",description:"Battery Management System triggered an emergency protection signal.",recommendation:"Check battery health and error logs in the BMS app.",severity:"critical"},80:{code:80,title:"Parallel CAN Bus Fault",description:"Lost communication over CAN bus between parallel inverters.",recommendation:"Check parallel communication cables and bus termination resistors.",severity:"critical"},81:{code:81,title:"Host Loss in Parallel System",description:"Follower inverter lost communication with Master unit.",recommendation:"Check power and state of the Master inverter and cable connections.",severity:"critical"},82:{code:82,title:"AC Phase Sync Loss",description:"Parallel inverters failed to synchronize AC output phases.",recommendation:"Ensure simultaneous AC grid connection to all parallel units.",severity:"critical"}},ze={0:{title:"No Warnings",description:"System operating normally without warnings."},1:{title:"Off-Grid / Battery Mode",description:"Inverter operating in autonomous battery mode (grid outage)."},2:{title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching."},4:{title:"Low Battery Voltage",description:"Battery voltage below warning threshold (recharge recommended)."},7:{title:"Overload Warning",description:"Home consumption approaching rated inverter limit (4.2 kW)."},8:{title:"Mains Low Voltage",description:"Utility AC grid voltage is 0V or below acceptable threshold (grid outage)."},10:{title:"Output Power Derating",description:"Inverter automatically derating power to prevent overheating."},14:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},15:{title:"PV Energy Weak",description:"Solar voltage below MPPT operating threshold (panels not connected or night).",isPvRelated:!0},16:{title:"Mains Over Frequency",description:"Utility AC grid frequency out of acceptable range."},19:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},20:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured threshold."},32:{title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below acceptable range."},64:{title:"PV Low Voltage",description:"Solar array voltage below MPPT operating threshold (panels not connected or overcast).",isPvRelated:!0},128:{title:"Inverter Over-Temperature",description:"Internal heatsink temperature is too high."},256:{title:"Battery Low Voltage",description:"Battery voltage has dropped below warning threshold (recharge needed)."},512:{title:"Battery Not Connected",description:"Battery circuit is open or battery is not detected."},1024:{title:"Overload Warning",description:"Home consumption is approaching or exceeding rated inverter limit (4.2 kW)."},2048:{title:"Battery Equalization Active",description:"Battery equalization charging cycle is currently active."},4096:{title:"Battery Discharged Below Recovery",description:"Battery voltage discharged below recovery threshold."},8192:{title:"Output Power Derating",description:"Inverter automatically derating output power due to thermal or voltage limits."},16384:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},32768:{title:"PV Energy Too Low",description:"Solar input power is too weak for MPPT conversion.",isPvRelated:!0},524288:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},1048576:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured safety threshold."}},Le=[{bit:0,mask:1,code:0,title:"Off-Grid Mode",description:"Inverter operating in autonomous battery mode (grid outage).",isInformational:!0},{bit:1,mask:2,code:1,title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching.",isInformational:!0},{bit:2,mask:4,code:2,title:"Vendor Status Bit 2",description:"Vendor-specific operational status bit 2.",isInformational:!0},{bit:3,mask:8,code:3,title:"Mains Low Voltage",description:"Utility AC grid voltage is low or 0V (grid outage).",isInformational:!0},{bit:4,mask:16,code:4,title:"Mains Over Frequency",description:"Utility AC grid frequency exceeded upper bound.",isInformational:!0},{bit:5,mask:32,code:5,title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below lower bound.",isInformational:!0},{bit:6,mask:64,code:6,title:"PV Low Voltage",description:"Solar array voltage below MPPT startup range (panels not connected or night).",isPvRelated:!0},{bit:7,mask:128,code:7,title:"W02: Over Temperature",description:"Internal inverter heatsink temperature is elevated."},{bit:8,mask:256,code:8,title:"W04: Battery Low Voltage",description:"Battery voltage has dropped below warning threshold."},{bit:9,mask:512,code:9,title:"W09: Battery Not Connected",description:"Battery circuit is open or battery is not detected."},{bit:10,mask:1024,code:10,title:"W07: Overload",description:"Home consumption is approaching rated inverter power (4.2 kW)."},{bit:11,mask:2048,code:11,title:"Battery Equalization Charging",description:"Battery equalization charging cycle is active.",isInformational:!0},{bit:12,mask:4096,code:12,title:"Battery Discharged Below Recovery",description:"Battery discharged below recovery voltage threshold."},{bit:13,mask:8192,code:13,title:"W10: Output Power Derating",description:"Output power derating active due to high temperature."},{bit:14,mask:16384,code:14,title:"W14: Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},{bit:15,mask:32768,code:15,title:"W15: PV Energy Too Low",description:"Solar input energy is too low to use.",isPvRelated:!0},{bit:16,mask:65536,code:16,title:"Parallel Comm Interrupted",description:"Parallel communication link interrupted."},{bit:17,mask:1<<17,code:17,title:"Output Mode Mismatch",description:"Single/Parallel output mode mismatch."},{bit:18,mask:1<<18,code:18,title:"Parallel Battery Voltage Diff",description:"Parallel battery voltage difference is too large."},{bit:19,mask:1<<19,code:19,title:"Lithium Battery Comm Abnormal",description:"Lithium battery BMS communication abnormal."},{bit:20,mask:1<<20,code:20,title:"Battery Discharge Over-Current",description:"Battery discharge current exceeds set value."}];function De(e){const{hass:t,language:i,safetyConfig:a,isOffline:r=!1,offlineEntity:n,isFault:o,faultCode:s,faultDetailsText:l,isWarning:c,warningCode:d,warningDetailsText:p,onAlertClick:h}=e;if(!r&&!o&&!c)return U``;const g=s??0,u=function(e,t){const i=Te[e];return i?t&&t!==i.title&&"N/A"!==t&&"0"!==t?{...i,description:`${i.description} (Inverter: ${t})`}:i:{code:e,title:t||`Fault Code F${e}`,description:t?`Inverter reports error: ${t}`:"Hardware or firmware fault detected by inverter.",recommendation:"Check inverter LCD display messages and documentation.",severity:"critical"}}(g,l),_=d??0,m=function(e,t){if(0===e||isNaN(e))return{title:"No Warnings",description:"Warnings are absent.",isBitmask:!1,isPv:!1};const i=Le.filter(t=>0!==(e&t.mask));if(i.length>1){const e=i.map(e=>e.title).join("; "),a=i.map(e=>`${e.title}: ${e.description}`).join(" | "),r=i.some(e=>e.isPvRelated);return{title:e,description:t?`${a} (Status: ${t})`:a,isBitmask:!0,isPv:r}}if(1===i.length){const e=i[0];return{title:e.title,description:t&&t!==e.title?`${e.description} (Status: ${t})`:e.description,isBitmask:!0,isPv:!!e.isPvRelated}}const a=ze[e];return a?{title:a.title,description:t&&t!==a.title?`${a.description} (Status: ${t})`:a.description,isBitmask:!1,isPv:!!a.isPvRelated}:{title:t||`Warning W${e}`,description:t?`Inverter reports: ${t}`:"Inverter reported an operational parameter deviation.",isBitmask:!1,isPv:64===e||15===e}}(_,p);return U`
    <div class="alert-section-wrapper">
      <!-- Collector / Inverter Offline Banner -->
      ${r?U`
            <div
              class="alert-box alert-warn"
              @click=${()=>h(n)}
              title="Click to view entity status"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ne("common.offline",t,i)}</span>
                  <span class="alert-title">${Ne("alerts.offline_title",t,i)}</span>
                </div>
                <p class="alert-desc">${Ne("alerts.offline_desc",t,i)}</p>
              </div>
            </div>
          `:""}

      <!-- Critical Inverter Fault Banner -->
      ${o&&!r?U`
            <div
              class="alert-box alert-critical"
              @click=${()=>h(a?.fault_details_entity||a?.fault_code_entity||a?.fault_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ne("common.fault",t,i)} F${g}</span>
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
      ${!c||o||r?"":U`
            <div
              class="alert-box alert-warn"
              @click=${()=>h(a?.warning_details_entity||a?.warning_code_entity||a?.warnings_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${Ne("common.warn",t,i)} W${_}</span>
                  <span class="alert-title">${m.title}</span>
                </div>
                <p class="alert-desc">${m.description}</p>
              </div>
            </div>
          `}
    </div>
  `}console.info("%c  ANINEREL-POWER-CARD  %c  Version 1.2.1  ","color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;","color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;");const Re="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",Fe="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",Ve="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats",We="switch.invertor_vkhod",He="sensor.invertor_vkhod_power",Ue="sensor.kukhnia_redodo_24v_bms_to_inverter_rs485_bridge_redodo_24v_remaining_energy",qe="sensor.aninerel_anl_4200t_24l_w_pro_load_percent";let je=class extends ce{constructor(){super(...arguments),this._controlsExpanded=!1,this._chargeCurrentPreview=null,this._equalizationConfirmPending=!1,this._historyMap=new Map,this._lastBucketIndexMap=new Map,this._maxHistoryPoints=32,this._bucketDurationMs=27e5,this._lastHistoryFetch=0,this._historyFetchInterval=9e5}static{this.styles=[Ce]}setConfig(e){if(!e)throw new Error("Invalid card configuration");if(!e.entities)throw new Error('Required "entities" block is not defined in configuration');if(!e.entities.load_power)throw new Error("At least entities.load_power must be specified");this._config={...ye,...e,entities:{...e.entities},bms:e.bms?{...e.bms}:void 0,controls:e.controls?{...e.controls}:void 0,safety:e.safety?{...e.safety}:void 0,daily_energy:e.daily_energy?{...e.daily_energy}:void 0,colors:e.colors?{...e.colors}:void 0}}set hass(e){const t=this._hass;this._hass=e,t||this._fetchHistory(),t&&!this._hasRelevantEntitiesChanged(t,e)||(this._updateHistoryBuffers(),this.requestUpdate())}get hass(){return this._hass}firstUpdated(){this._fetchHistory()}getCardSize(){return this._config?.compact_mode?10:14}getLayoutOptions(){return{grid_rows:this._config?.compact_mode?10:14,grid_columns:4,grid_min_rows:8,grid_min_columns:2}}static getStubConfig(){return ke}static async getConfigElement(){return await Promise.resolve().then(function(){return Ye}),document.createElement("aninerel-power-card-editor")}async _fetchHistory(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity,t=this._config.grid_voltage_entity,i=[];if(e&&i.push(e),t&&i.push(t),0===i.length)return;const a=Date.now();if(!(a-this._lastHistoryFetch<this._historyFetchInterval&&this._historyMap.size>0)){this._lastHistoryFetch=a;try{const r=a-864e5,n=new Date(r).toISOString();let o=null;if("function"==typeof this._hass.callWS)o=await this._hass.callWS({type:"history/history_during_period",start_time:n,entity_ids:i,minimal_response:!0,no_attributes:!0});else if("function"==typeof this._hass.callApi){const e=`history/period/${n}?filter_entity_id=${i.join(",")}&minimal_response&no_attributes`;o=await this._hass.callApi("GET",e)}if(o){const i=Math.floor(a/this._bucketDurationMs);if(e){const t=this._extractStateList(o,e),n=this._sampleHistoryPoints(t,this._maxHistoryPoints,r,a);n.length>0&&(this._historyMap.set("battery_voltage",n),this._lastBucketIndexMap.set("battery_voltage",i))}if(t){const e=this._extractStateList(o,t),n=this._sampleHistoryPoints(e,this._maxHistoryPoints,r,a);n.length>0&&(this._historyMap.set("grid_voltage",n),this._lastBucketIndexMap.set("grid_voltage",i))}this.requestUpdate()}}catch(e){console.warn("AninerelPowerCard: using live buffer for sparklines (history API unavailable):",e)}}}_extractStateList(e,t){if(!e)return[];if(e[t]&&Array.isArray(e[t]))return e[t];if(Array.isArray(e)){for(const i of e)if(Array.isArray(i)&&i.length>0){if(i[0]?.entity_id===t)return i}else if(i?.entity_id===t&&Array.isArray(i.states))return i.states;if(void 0!==e[0]?.state||void 0!==e[0]?.s)return e}return e.entity_id===t&&Array.isArray(e.states)?e.states:[]}_sampleHistoryPoints(e,t,i,a){if(!e||0===e.length)return[];const r=[];for(const t of e){const e=void 0!==t.s?t.s:t.state,i=parseFloat(e);if(isNaN(i)||!isFinite(i))continue;let a=NaN;"number"==typeof t.lu?a=1e3*t.lu:"number"==typeof t.lc?a=1e3*t.lc:(t.last_updated||t.last_changed)&&(a=Date.parse(t.last_updated||t.last_changed)),r.push({t:a,v:i})}if(0===r.length)return[];if(r.some(e=>!isNaN(e.t))&&a>i){const e=[],n=a-i;let o=0,s=r[0].v;for(let a=0;a<t;a++){const l=i+(a+1)/t*n;let c=0,d=0;for(;o<r.length;){const e=r[o];if(!isNaN(e.t)&&e.t>l)break;s=e.v,c+=e.v,d++,o++}e.push(d>0?Number((c/d).toFixed(2)):s)}return e}const n=r.map(e=>e.v);if(n.length<=t)return n;const o=[],s=(n.length-1)/(t-1);for(let e=0;e<t;e++)o.push(n[Math.min(Math.round(e*s),n.length-1)]);return o}_updateHistoryBuffers(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity;if(e){const t=this._getNullableNumber(e);null!==t&&this._pushHistory("battery_voltage",t)}if(this._config.grid_voltage_entity){const e=this._getNullableNumber(this._config.grid_voltage_entity);null!==e&&this._pushHistory("grid_voltage",e)}}_pushHistory(e,t){const i=this._historyMap.get(e)||[],a=Math.floor(Date.now()/this._bucketDurationMs),r=this._lastBucketIndexMap.get(e);i.length<this._maxHistoryPoints?(0===i.length||Math.abs(i[i.length-1]-t)>.001)&&(i.push(t),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,a)):void 0!==r&&a>r?(i.push(t),i.length>this._maxHistoryPoints&&i.shift(),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,a)):(i[i.length-1]=t,this._historyMap.set(e,i))}_hasRelevantEntitiesChanged(e,t){if(!this._config)return!0;if(e.language!==t.language||e.locale?.language!==t.locale?.language)return!0;const i=this._getMonitoredEntityIds();for(const a of i)if(e.states[a]!==t.states[a])return!0;return!1}_getMonitoredEntityIds(){const e=[Re,Fe,Ve,We,He,Ue,qe];if(!this._config)return e;const{entities:t,bms:i,controls:a,safety:r,daily_energy:n}=this._config;if(t&&(t.solar_power&&e.push(t.solar_power),t.battery_power&&e.push(t.battery_power),t.grid_power&&e.push(t.grid_power),t.load_power&&e.push(t.load_power)),this._config.battery_voltage_entity&&e.push(this._config.battery_voltage_entity),this._config.battery_current_entity&&e.push(this._config.battery_current_entity),this._config.grid_voltage_entity&&e.push(this._config.grid_voltage_entity),this._config.operating_mode_entity&&e.push(this._config.operating_mode_entity),this._config.charging_active_entity&&e.push(this._config.charging_active_entity),this._config.inverter_temperature_entity&&e.push(this._config.inverter_temperature_entity),this._config.inverter_load_percent_entity&&e.push(this._config.inverter_load_percent_entity),this._config.self_consumption_power_entity&&e.push(this._config.self_consumption_power_entity),this._config.grid_breaker_switch_entity&&e.push(this._config.grid_breaker_switch_entity),this._config.grid_breaker_power_entity&&e.push(this._config.grid_breaker_power_entity),this._config.kpi_entity&&e.push(this._config.kpi_entity),i){i.soc_entity&&e.push(i.soc_entity),i.voltage_entity&&e.push(i.voltage_entity),i.current_entity&&e.push(i.current_entity),i.temperature_entity&&e.push(i.temperature_entity),i.temperature_2_entity&&e.push(i.temperature_2_entity),i.cycle_count_entity&&e.push(i.cycle_count_entity),i.cell_delta_entity&&e.push(i.cell_delta_entity),i.remaining_capacity_entity&&e.push(i.remaining_capacity_entity),i.full_capacity_entity&&e.push(i.full_capacity_entity),i.remaining_energy_entity&&e.push(i.remaining_energy_entity);const t=(t,i)=>{const a=t.trim();for(let t=1;t<=i;t++)e.push(`${a}${t}`),e.push(`${a}${t}_voltage`)},a=i.cell_count||8;t(i.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_",a);const r=i.battery_1?.cell_count||4;if(i.bat1_soc_entity&&e.push(i.bat1_soc_entity),i.bat1_voltage_entity&&e.push(i.bat1_voltage_entity),i.bat1_temperature_entity&&e.push(i.bat1_temperature_entity),i.bat1_cell_prefix&&t(i.bat1_cell_prefix,r),i.battery_1){const a=i.battery_1;a.soc_entity&&e.push(a.soc_entity),a.voltage_entity&&e.push(a.voltage_entity),a.temperature_entity&&e.push(a.temperature_entity),a.cell_voltage_prefix&&t(a.cell_voltage_prefix,r)}const n=i.battery_2?.cell_count||4;if(i.bat2_soc_entity&&e.push(i.bat2_soc_entity),i.bat2_voltage_entity&&e.push(i.bat2_voltage_entity),i.bat2_temperature_entity&&e.push(i.bat2_temperature_entity),i.bat2_cell_prefix&&t(i.bat2_cell_prefix,n),i.battery_2){const a=i.battery_2;a.soc_entity&&e.push(a.soc_entity),a.voltage_entity&&e.push(a.voltage_entity),a.temperature_entity&&e.push(a.temperature_entity),a.cell_voltage_prefix&&t(a.cell_voltage_prefix,n)}}return a&&(a.charge_source_entity&&e.push(a.charge_source_entity),a.output_priority_entity&&e.push(a.output_priority_entity),a.max_charge_current_entity&&e.push(a.max_charge_current_entity),a.bulk_voltage_entity&&e.push(a.bulk_voltage_entity),a.float_voltage_entity&&e.push(a.float_voltage_entity),a.equalization_entity&&e.push(a.equalization_entity)),r&&(r.fault_active_entity&&e.push(r.fault_active_entity),r.fault_code_entity&&(e.push(r.fault_code_entity),e.push(r.fault_code_entity.replace(/_code$/,"_details"))),r.fault_details_entity&&e.push(r.fault_details_entity),r.warnings_active_entity&&e.push(r.warnings_active_entity),r.warning_code_entity&&(e.push(r.warning_code_entity),e.push(r.warning_code_entity.replace(/_code$/,"_details"))),r.warning_details_entity&&e.push(r.warning_details_entity)),n&&(n.load_energy_entity&&e.push(n.load_energy_entity),n.grid_import_entity&&e.push(n.grid_import_entity),n.battery_charge_entity&&e.push(n.battery_charge_entity),n.battery_discharge_entity&&e.push(n.battery_discharge_entity),n.self_consumption_daily_entity&&e.push(n.self_consumption_daily_entity),n.self_consumption_monthly_entity&&e.push(n.self_consumption_monthly_entity)),e.filter(Boolean)}_resolveCellEntityId(e,t){const i=e.trim(),a=[`${i}${t}`,`${i}${t}_voltage`,`${i.replace(/_voltage_?$/,"_")}${t}_voltage`,`${i.replace(/_cell_?$/,"_cell_voltage_")}${t}`];if(this._hass?.states){for(const e of a)if(this._hass.states[e]&&!this._isEntityUnavailable(e))return e;for(const e of a)if(this._hass.states[e])return e}return a[0]}_findMatchingEntity(e,t){if(!(e&&t&&this._hass&&this._hass.states))return;const i=e.replace(/_code$/,t.replace(/^_+/,"_"));return this._hass.states[i]?i:void 0}_resolveEntity(e,t){return e&&""!==e.trim()?e:t&&this._hass?.states?.[t]?t:void 0}_isEntityUnavailable(e){if(!e||!this._hass||!this._hass.states[e])return!0;const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t||""===t}_getState(e){if(!e||!this._hass||!this._hass.states[e])return"N/A";const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t?"N/A":t}_getNumber(e){return this._getNullableNumber(e)??0}_getNullableNumber(e){if(!e||!this._hass||!this._hass.states[e])return null;const t=this._hass.states[e].state;if("unavailable"===t||"unknown"===t||""===t)return null;const i=parseFloat(t);return isNaN(i)||!isFinite(i)?null:i}_getOptions(e){return e&&this._hass&&this._hass.states[e]&&this._hass.states[e].attributes?.options||[]}_handleEntityClick(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}async _handleSelectOption(e,t){if(this._hass)try{await this._hass.callService("select","select_option",{entity_id:e,option:t})}catch(e){console.error("Failed to set option:",e)}}async _handleSetNumber(e,t){if(this._hass)try{await this._hass.callService("number","set_value",{entity_id:e,value:t})}catch(e){console.error("Failed to set number value:",e)}}async _handleToggleEqualization(e,t){if(this._hass){if(!t&&!this._equalizationConfirmPending)return this._equalizationConfirmPending=!0,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer),void(this._equalizationConfirmTimer=setTimeout(()=>{this._equalizationConfirmPending=!1},4e3));this._equalizationConfirmPending=!1,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer);try{await this._hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e})}catch(e){console.error("Failed to toggle switch:",e)}}}render(){if(!this._config)return U``;const e=Ae(this._hass,this._config.language),t=this._config.max_power||4200,i=Boolean(this._config.show_solar&&this._config.entities.solar_power&&""!==this._config.entities.solar_power.trim()),a=this._isEntityUnavailable(this._config.entities.load_power),r=this._config.operating_mode_entity?this._isEntityUnavailable(this._config.operating_mode_entity):a,n=Boolean(this._hass&&a&&r),o=i&&this._config.entities.solar_power?this._getNumber(this._config.entities.solar_power):0,s=this._getNumber(this._config.entities.battery_power),l=this._getNumber(this._config.entities.grid_power),c=this._resolveEntity(this._config.grid_breaker_power_entity,He),d=c?this._getNullableNumber(c):null,p=null!==d&&d>l?d:l,h=this._getNumber(this._config.entities.load_power),g=this._getNullableNumber(this._config.battery_voltage_entity||this._config.bms?.voltage_entity),u=this._getNullableNumber(this._config.battery_current_entity||this._config.bms?.current_entity),_=this._getNullableNumber(this._config.grid_voltage_entity),m=this._resolveEntity(this._config.self_consumption_power_entity,Re),y=m?this._getNullableNumber(m):null,b=this._resolveEntity(this._config.grid_breaker_switch_entity,We),f=b?this._getState(b):null;let v=this._config.bms?.soc_entity?this._getNullableNumber(this._config.bms.soc_entity):null;const x=this._getState(this._config.operating_mode_entity),w=this._getNullableNumber(this._config.inverter_temperature_entity),$="on"===this._getState(this._config.charging_active_entity),k="on"===this._getState(this._config.safety?.fault_active_entity),C=this._getNullableNumber(this._config.safety?.fault_code_entity),S=null!==C?Math.round(C):null,A=this._config.safety?.fault_details_entity||this._findMatchingEntity(this._config.safety?.fault_code_entity,"_fault_details"),N=A?this._getState(A):null,M=N&&"N/A"!==N&&"0"!==N?N:null;let E="on"===this._getState(this._config.safety?.warnings_active_entity);const B=this._getNullableNumber(this._config.safety?.warning_code_entity),P=null!==B?Math.round(B):null,O=this._config.safety?.warning_details_entity||this._findMatchingEntity(this._config.safety?.warning_code_entity,"_warning_details"),I=O?this._getState(O):null,T=I&&"N/A"!==I&&"0"!==I?I:null;let z=P;if(!i){const{effectiveCode:e,hasNonPvWarning:t}=function(e){if(null===e||0===e||isNaN(e))return{effectiveCode:null,hasNonPvWarning:!1};const t=-34944&e;return 0===t?{effectiveCode:null,hasNonPvWarning:!1}:{effectiveCode:t,hasNonPvWarning:!0}}(P);z=e,t||(E=!1)}const L=this._getNullableNumber(this._config.daily_energy?.grid_import_entity),D=this._getNullableNumber(this._config.daily_energy?.load_energy_entity),R=this._getNullableNumber(this._config.daily_energy?.battery_charge_entity),F=this._getNullableNumber(this._config.daily_energy?.battery_discharge_entity),V=this._resolveEntity(this._config.daily_energy?.self_consumption_daily_entity,Fe),W=V?this._getNullableNumber(V):null,H=this._resolveEntity(this._config.daily_energy?.self_consumption_monthly_entity,Ve),q=H?this._getNullableNumber(H):null,j=this._config.bms,G=Boolean(j?.dual_battery||j?.battery_1&&j?.battery_2||j?.bat1_soc_entity||j?.bat1_voltage_entity||j?.bat2_soc_entity||j?.bat2_voltage_entity);let Y,K,Z=[];if(j)if(G){const e=j.battery_1,t=j.battery_2,i=j.bat1_voltage_entity||e?.voltage_entity,a=j.bat2_voltage_entity||t?.voltage_entity,r=this._getNullableNumber(i),n=this._getNullableNumber(a),o=j.bat1_soc_entity||e?.soc_entity,s=j.bat2_soc_entity||t?.soc_entity,l=this._getNullableNumber(o),c=this._getNullableNumber(s),d=j.bat1_temperature_entity||e?.temperature_entity,p=j.bat2_temperature_entity||t?.temperature_entity,h=this._getNullableNumber(d),g=this._getNullableNumber(p),u=[],_=j.bat1_cell_prefix||e?.cell_voltage_prefix||"sensor.redodo_1_cell_voltage_",m=e?.cell_count||4;for(let e=1;e<=m;e++){const t=this._resolveCellEntityId(_,e);let i=this._getNullableNumber(t)??0;i>100&&(i/=1e3),u.push({index:e,voltage:i>0?i:0,rawEntityId:t})}const y=[],b=j.bat2_cell_prefix||t?.cell_voltage_prefix||"sensor.redodo_2_cell_voltage_",f=t?.cell_count||4;for(let e=1;e<=f;e++){const t=this._resolveCellEntityId(b,e);let i=this._getNullableNumber(t)??0;i>100&&(i/=1e3),y.push({index:e+m,voltage:i>0?i:0,rawEntityId:t})}Y={name:j.bat1_name||e?.name||"Battery #1 (12V)",voltage:r,soc:l,temperature:h,cells:u},K={name:j.bat2_name||t?.name||"Battery #2 (12V)",voltage:n,soc:c,temperature:g,cells:y},null!==l&&null!==c&&l>=0&&c>=0?v=Math.min(l,c):null!==l?v=l:null!==c&&(v=c)}else{const e=j.cell_count||8,t=j.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=e;i++){const e=this._resolveCellEntityId(t,i);let a=this._getNullableNumber(e)??0;a>100&&(a/=1e3),Z.push({index:i,voltage:a>0?a:0,rawEntityId:e})}}(null===v||isNaN(v))&&null!==g&&g>=20&&(v=g>=27.2?100:g>=26.8?Math.round(80+(g-26.8)/.4*20):g>=26.4?Math.round(50+(g-26.4)/.4*30):g>=26?Math.round(20+(g-26)/.4*30):g>=24?Math.max(5,Math.round((g-24)/2*20)):5);const J=j?.nominal_capacity_wh||2560,X=this._resolveEntity(j?.remaining_energy_entity,Ue);let Q=null;if(X){const e=this._getNullableNumber(X);if(null!==e){Q="kwh"===(this._hass?.states[X]?.attributes?.unit_of_measurement?.toLowerCase()||"")?1e3*e:e}}null===Q&&null!==v&&(Q=Math.max(0,v)/100*J);let ee=null;if(null!==Q&&Math.abs(s)>15)if(s<-15){const t=.1*J;ee=Ee(Math.max(0,Q-t)/Math.abs(s),e)}else if(s>15&&(null===v||v<99.5)){ee=Ee(Math.max(0,J-Q)/s,e)}const te=this._resolveEntity(this._config.inverter_load_percent_entity,qe),ie=te?this._getNullableNumber(te):null,ae=null!==ie?ie:t>0?Math.min(100,Math.round(h/t*100)):0,re=this._config.controls,ne=this._config.safety,oe=this._config.daily_energy,se=re?.max_charge_current_entity,le=se?this._hass?.states[se]?.attributes:void 0,ce="number"==typeof le?.min?le.min:2,de="number"==typeof le?.max?le.max:100,pe="number"==typeof le?.step?le.step:1;return U`
      <ha-card class="${this._config.compact_mode?"compact":""}">
        <!-- 1. Header Bar with live status chips -->
        ${!1!==this._config.show_header?function(e){const{hass:t,config:i,hasSolar:a=!1,isOffline:r=!1,operatingMode:n,temperature:o,selfConsumptionWatts:s,selfConsumptionEntity:l,gridBreakerState:c,gridBreakerEntity:d,isCharging:p,isFault:h,faultCode:g,isWarning:u,warningCode:_,onChipClick:m}=e,y=i.language,b=n?n.toLowerCase():"";let f="#10b981",v="mdi:battery-charging-60";b.includes("mains")||b.includes("line")||b.includes("grid")?(f="#3b82f6",v="mdi:transmission-tower"):b.includes("bypass")?(f="#ef4444",v="mdi:transit-connection-variant"):(b.includes("battery")||b.includes("off-grid")||b.includes("off_grid"))&&(f="#10b981",v="mdi:battery-outline");let x="#10b981";null===o||isNaN(o)||(o>55?x="#ef4444":o>42&&(x="#f59e0b"));const w=a?"mdi:solar-power-variant-outline":"mdi:home-battery-outline",$=Ne(a?"header.subtitle_solar":"header.subtitle_ups",t,y);return U`
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
        ${n&&"N/A"!==n&&!r?U`
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
                <span>${Ne("header.self_power",t,y)}: ${Math.round(s)}W</span>
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
                <span>${Ne("header.input_breaker",t,y)}: ${c.toUpperCase()}</span>
              </button>
            `:""}

        <!-- Charging Active Flag -->
        ${p&&!r?U`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${()=>m(i.charging_active_entity)}
                title="Charging active"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>${Ne("common.chg",t,y)}</span>
              </button>
            `:""}

        <!-- Offline Chip -->
        ${r?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>m(i.operating_mode_entity||i.entities?.load_power)}
                title="${Ne("alerts.offline_title",t,y)}"
              >
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
                <span>${Ne("common.offline",t,y)}</span>
              </button>
            `:""}

        <!-- Fault Active Chip -->
        ${h&&!r?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>m(i.safety?.fault_code_entity||i.safety?.fault_active_entity)}
                title="Inverter fault status"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${g?`F${g}`:Ne("common.fault",t,y)}</span>
              </button>
            `:""}

        <!-- Warnings Active Chip -->
        ${!u||h||r?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${()=>m(i.safety?.warning_code_entity||i.safety?.warnings_active_entity)}
                title="Inverter warning"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${_?`W${_}`:Ne("common.warn",t,y)}</span>
              </button>
            `}

        <!-- System Normal Chip -->
        ${h||u||r?"":U`
              <div class="status-chip chip-ok" title="System normal">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>${Ne("common.ok",t,y)}</span>
              </div>
            `}
      </div>
    </div>
  `}({hass:this._hass,config:this._config,hasSolar:i,isOffline:n,operatingMode:x,temperature:w,selfConsumptionWatts:y,selfConsumptionEntity:m,gridBreakerState:f,gridBreakerEntity:b,isCharging:$,isFault:k,faultCode:S,isWarning:E,warningCode:z,onChipClick:e=>this._handleEntityClick(e)}):""}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if offline or any faults/warnings) -->
        ${!1!==this._config.show_alerts&&(ne||n)?De({hass:this._hass,language:this._config.language,safetyConfig:ne,isOffline:n,offlineEntity:this._config.operating_mode_entity||this._config.entities.load_power,isFault:k,faultCode:S,faultDetailsText:M,isWarning:E,warningCode:z,warningDetailsText:T,onAlertClick:e=>this._handleEntityClick(e)}):""}

        <!-- 3. Power Flow Animated Diagram -->
        ${!1!==this._config.show_flow?Be({hass:this._hass,config:this._config,hasSolar:i,isOffline:n,gridPosition:this._config.grid_position||"bottom",solarWatts:o,batteryWatts:s,gridWatts:p,loadWatts:h,batterySoc:v,batteryRuntimeText:ee,selfConsumptionWatts:y,operatingMode:"N/A"!==x?x:"Inverter",isFault:k,onNodeClick:e=>this._handleEntityClick(e)}):""}

        <!-- 4. Electrical Telemetry & Battery SoC / Self-Sufficiency KPI -->
        ${!1!==this._config.show_params?Oe({hass:this._hass,config:this._config,hasSolar:i,batteryVoltage:g,batteryCurrent:u,gridVoltage:_,batterySoc:v,gridImportEnergyToday:L,loadEnergyToday:D,batteryDischargeEnergyToday:F,inverterLoadPercent:ae,historyMap:this._historyMap,onParamClick:e=>this._handleEntityClick(e)}):""}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing (Single or Dual Battery Series) -->
        ${!1!==this._config.show_bms&&j?function(e){const{hass:t,language:i,bmsConfig:a,soc:r,temperature:n,cellDelta:o,cycleCount:s,remainingCapacity:l,fullCapacity:c,cells:d,onBmsClick:p,isDual:h=!1,battery1:g,battery2:u}=e,_=3.65-3;if(h&&g&&u){const e=g.voltage??0,r=u.voltage??0,n=e>0&&r>0?Math.round(1e3*Math.abs(e-r)):null;let o="#10b981",c=Ne("bms.balanced",t,i);null===n?(o="#64748b",c=Ne("bms.offline",t,i)):n>200?(o="#ef4444",c=Ne("bms.imbalance",t,i)):n>80&&(o="#f59e0b",c=Ne("bms.drift",t,i));const d=[...g.cells,...u.cells].map(e=>e.voltage).filter(e=>e>0),h=d.length>0?Math.min(...d):0,m=d.length>0?Math.max(...d):0,y=d.length>1?Math.round(1e3*(m-h)):null,b=null!==n&&n>150?Ne("bms.pack_drift_warn",t,i).replace("{delta}",String(n)).replace("{v1}",e.toFixed(2)).replace("{v2}",r.toFixed(2)):"";return U`
      <div class="bms-card-section dual-bms-section">
        <!-- Dual Battery Header -->
        <div class="bms-header">
          <div class="bms-header-title">
            <ha-icon icon="mdi:battery-sync"></ha-icon>
            <span>${Ne("bms.title_dual",t,i)}</span>
          </div>

          <div class="bms-header-status">
            <!-- Midpoint battery drift badge -->
            <span
              class="bms-delta-pill"
              style="--delta-color: ${o}"
              title="${c}"
            >
              <ha-icon icon="mdi:scale-balance"></ha-icon>
              <span>
                ${Ne("bms.delta_packs",t,i)}:
                ${null!==n?`${n} mV`:"—"}
              </span>
            </span>

            <!-- Cell delta badge -->
            <span
              class="bms-delta-pill cell-delta-pill"
              style="--delta-color: ${null===y?"#64748b":y>40?"#f59e0b":"#10b981"}"
              title="Delta between highest and lowest cell"
            >
              <span>
                ${Ne("bms.delta_cells",t,i)}:
                ${null!==y?`${y} mV`:"—"}
              </span>
            </span>
          </div>
        </div>

        <!-- Warning banner if series midpoint drift is significant -->
        ${b?U`
              <div class="series-drift-alert">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${b}</span>
              </div>
            `:""}

        <!-- Dual Battery Grid: Battery 1 and Battery 2 -->
        <div class="dual-battery-container">
          <!-- BATTERY 1 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${()=>p(a.bat1_voltage_entity||a.bat1_soc_entity||a.battery_1?.voltage_entity||a.battery_1?.soc_entity)}
              style="cursor: pointer;"
              title="${g.name}"
            >
              <div class="pack-name-row">
                <span class="pack-name">${g.name}</span>
                ${null===g.soc||isNaN(g.soc)?"":U`<span class="pack-soc-badge">${Math.round(g.soc)}%</span>`}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">
                  ${g.voltage&&g.voltage>0?`${g.voltage.toFixed(2)}V`:"—"}
                </span>
                ${null===g.temperature||isNaN(g.temperature)?"":U`<span class="pack-temp">${Math.round(g.temperature)}°C</span>`}
              </div>
            </div>

            <!-- Cells of Battery 1 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${g.name} Cells">
              ${g.cells.map(e=>{const t=e.voltage>0,i=t&&e.voltage===h&&d.length>1&&h!==m,a=t&&e.voltage===m&&d.length>1&&h!==m,r=t?Math.max(15,Math.min(100,Math.round((e.voltage-3)/_*100))):8,n=t?a?"#10b981":i?"#3b82f6":"#0ea5e9":"rgba(255,255,255,0.12)";return U`
                  <div
                    class="cell-col"
                    @click=${()=>p(e.rawEntityId)}
                    title="Cell #${e.index}: ${t?`${e.voltage.toFixed(3)} V`:"Offline"} ${a?"(MAX)":i?"(MIN)":""}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${a?"cell-max":""} ${i?"cell-min":""}"
                        style="height: ${r}%; background-color: ${n};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${t?`${e.voltage.toFixed(2)}V`:"—"}</span>
                    <span class="cell-id">#${e.index}</span>
                  </div>
                `})}
            </div>
          </div>

          <!-- Series Bridge Divider -->
          <div class="series-bridge" title="24V Series Connection (+ to -)">
            <span class="bridge-line"></span>
            <span class="bridge-badge">${Ne("bms.series_badge",t,i)}</span>
            <span class="bridge-line"></span>
          </div>

          <!-- BATTERY 2 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${()=>p(a.bat2_voltage_entity||a.bat2_soc_entity||a.battery_2?.voltage_entity||a.battery_2?.soc_entity)}
              style="cursor: pointer;"
              title="${u.name}"
            >
              <div class="pack-name-row">
                <span class="pack-name">${u.name}</span>
                ${null===u.soc||isNaN(u.soc)?"":U`<span class="pack-soc-badge">${Math.round(u.soc)}%</span>`}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">
                  ${u.voltage&&u.voltage>0?`${u.voltage.toFixed(2)}V`:"—"}
                </span>
                ${null===u.temperature||isNaN(u.temperature)?"":U`<span class="pack-temp">${Math.round(u.temperature)}°C</span>`}
              </div>
            </div>

            <!-- Cells of Battery 2 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${u.name} Cells">
              ${u.cells.map(e=>{const t=e.voltage>0,i=t&&e.voltage===h&&d.length>1&&h!==m,a=t&&e.voltage===m&&d.length>1&&h!==m,r=t?Math.max(15,Math.min(100,Math.round((e.voltage-3)/_*100))):8,n=t?a?"#10b981":i?"#3b82f6":"#0ea5e9":"rgba(255,255,255,0.12)";return U`
                  <div
                    class="cell-col"
                    @click=${()=>p(e.rawEntityId)}
                    title="Cell #${e.index}: ${t?`${e.voltage.toFixed(3)} V`:"Offline"} ${a?"(MAX)":i?"(MIN)":""}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${a?"cell-max":""} ${i?"cell-min":""}"
                        style="height: ${r}%; background-color: ${n};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${t?`${e.voltage.toFixed(2)}V`:"—"}</span>
                    <span class="cell-id">#${e.index}</span>
                  </div>
                `})}
            </div>
          </div>
        </div>

        <!-- Optional summary footer if cycleCount or capacity is configured -->
        ${null!==s||null!==l?U`
              <div class="bms-footer-stats">
                ${null===s||isNaN(s)?"":U`
                      <div class="bms-footer-item" @click=${()=>p(a.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>${Ne("bms.cycles",t,i)}: <strong>${s}</strong></span>
                      </div>
                    `}
                ${null===l||isNaN(l)?"":U`
                      <div class="bms-footer-item" @click=${()=>p(a.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>
                          ${Ne("bms.remaining",t,i)}:
                          <strong>${l.toFixed(1)} Ah</strong>
                        </span>
                      </div>
                    `}
              </div>
            `:""}
      </div>
    `}const m=d.map(e=>e.voltage).filter(e=>e>0),y=m.length>0?Math.min(...m):0,b=m.length>0?Math.max(...m):0,f=null===o||isNaN(o)?m.length>1?Math.round(1e3*(b-y)):null:o;let v="#10b981",x=Ne("bms.balanced",t,i);return null===f?(v="#64748b",x=Ne("bms.offline",t,i)):f>50?(v="#ef4444",x=Ne("bms.imbalance",t,i)):f>20&&(v="#f59e0b",x=Ne("bms.drift",t,i)),U`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>${Ne("bms.title",t,i)}</span>
          ${null===r||isNaN(r)?"":U`<span class="bms-soc-badge">${Math.round(r)}% SOC</span>`}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${v}"
            @click=${()=>p(a.cell_delta_entity)}
            title="${x}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${null!==f?`${f} mV`:"—"}</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${d.map(e=>{const t=e.voltage>0,i=t&&e.voltage===y&&m.length>1&&y!==b,a=t&&e.voltage===b&&m.length>1&&y!==b,r=t?Math.max(15,Math.min(100,Math.round((e.voltage-3)/_*100))):8,n=t?a?"#10b981":i?"#3b82f6":"#0ea5e9":"rgba(255,255,255,0.12)";return U`
              <div
                class="cell-col"
                @click=${()=>p(e.rawEntityId)}
                title="Cell #${e.index}: ${t?`${e.voltage.toFixed(3)} V`:"Offline"} ${a?"(MAX)":i?"(MIN)":""}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${a?"cell-max":""} ${i?"cell-min":""}"
                    style="height: ${r}%; background-color: ${n};"
                  ></div>
                </div>
                <span class="cell-voltage">${t?`${e.voltage.toFixed(2)}V`:"—"}</span>
                <span class="cell-id">#${e.index}</span>
              </div>
            `})}
        </div>

        <!-- Right Side: BMS Telemetry Columns -->
        <div class="bms-telemetry-panel">
          ${null===n||isNaN(n)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>p(a.temperature_entity)}
                  title="${Ne("bms.temp",t,i)}"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${n.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">${Ne("bms.temp",t,i)}</span>
                  </div>
                </div>
              `}

          ${null===s||isNaN(s)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>p(a.cycle_count_entity)}
                  title="${Ne("bms.cycles",t,i)}"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${s}</span>
                    <span class="bms-stat-lbl">${Ne("bms.cycles",t,i)}</span>
                  </div>
                </div>
              `}

          ${null===l||isNaN(l)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>p(a.remaining_capacity_entity)}
                  title="${Ne("bms.capacity",t,i)}"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(l)}${c?`/${Math.round(c)}`:""}Ah
                    </span>
                    <span class="bms-stat-lbl">${Ne("bms.capacity",t,i)}</span>
                  </div>
                </div>
              `}
        </div>
      </div>
    </div>
  `}({hass:this._hass,language:this._config.language,bmsConfig:j,isDual:G,battery1:Y,battery2:K,soc:v,temperature:this._getNullableNumber(j.temperature_entity),temperature2:this._getNullableNumber(j.temperature_2_entity),cycleCount:this._getNullableNumber(j.cycle_count_entity),remainingCapacity:this._getNullableNumber(j.remaining_capacity_entity),fullCapacity:this._getNullableNumber(j.full_capacity_entity),cellDelta:this._getNullableNumber(j.cell_delta_entity),cells:Z,onBmsClick:e=>this._handleEntityClick(e)}):""}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${!1!==this._config.show_controls&&re?function(e){const{controlsConfig:t,hass:i,language:a,expanded:r,chargeSource:n,chargeSourceOptions:o,outputPriority:s,outputPriorityOptions:l,maxChargeCurrent:c,maxChargeCurrentPreview:d,maxChargeCurrentMin:p=2,maxChargeCurrentMax:h=100,maxChargeCurrentStep:g=1,bulkVoltage:u,floatVoltage:_,isEqualization:m,equalizationConfirmPending:y=!1,onToggleExpand:b,onSelectOption:f,onPreviewNumber:v,onSetNumber:x,onToggleEqualization:w}=e,$=d??c??15,k=[];s&&"N/A"!==s&&"unavailable"!==s&&k.push(s),null==c||isNaN(c)||k.push(`${c}A`);const C=k.join(" • ");return U`
    <div class="controls-card-section ${r?"expanded":""}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${b}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>${Ne("controls.title",i,a)}</span>
        </div>
        <div class="controls-header-right">
          ${C?U`<span class="controls-quick-summary">${C}</span>`:""}
          <ha-icon
            class="chevron-icon ${r?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${r?U`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority -->
                ${t.charge_source_entity?U`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>${Ne("controls.charge_source",i,a)}</label>
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
                          <label>${Ne("controls.output_priority",i,a)}</label>
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
                          <label>${Ne("controls.max_charge_current",i,a)}</label>
                        </div>
                        <span class="control-live-val">${$} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">${p}A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="${p}"
                          max="${h}"
                          step="${g}"
                          .value=${String($)}
                          @input=${e=>{const t=parseFloat(e.target.value);v?.(t)}}
                          @change=${e=>{const i=parseFloat(e.target.value);v?.(null),x(t.max_charge_current_entity,i)}}
                        />
                        <span class="slider-boundary">${h}A</span>
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
                          <label>${Ne("controls.bulk_voltage",i,a)}</label>
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
                          <label>${Ne("controls.float_voltage",i,a)}</label>
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
                          <span>${Ne("controls.equalization",i,a)}</span>
                        </div>
                        <span class="danger-desc">
                          ${Ne("controls.equalization_warning",i,a)}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${m||y?"switch-on":"switch-off"}"
                        @click=${()=>w(t.equalization_entity,m)}
                      >
                        ${m?"ON":y?Ne("controls.confirm_on",i,a):"OFF"}
                      </button>
                    </div>
                  `:""}
            </div>
          `:""}
    </div>
  `}({controlsConfig:re,hass:this._hass,language:this._config.language,expanded:this._controlsExpanded,onToggleExpand:()=>{this._controlsExpanded=!this._controlsExpanded},chargeSource:re.charge_source_entity?this._getState(re.charge_source_entity):void 0,chargeSourceOptions:this._getOptions(re.charge_source_entity),outputPriority:re.output_priority_entity?this._getState(re.output_priority_entity):void 0,outputPriorityOptions:this._getOptions(re.output_priority_entity),maxChargeCurrent:this._getNullableNumber(re.max_charge_current_entity),maxChargeCurrentPreview:this._chargeCurrentPreview,maxChargeCurrentMin:ce,maxChargeCurrentMax:de,maxChargeCurrentStep:pe,bulkVoltage:this._getNullableNumber(re.bulk_voltage_entity),floatVoltage:this._getNullableNumber(re.float_voltage_entity),isEqualization:!!re.equalization_entity&&"on"===this._getState(re.equalization_entity),equalizationConfirmPending:this._equalizationConfirmPending,onSelectOption:(e,t)=>this._handleSelectOption(e,t),onPreviewNumber:e=>{this._chargeCurrentPreview=e},onSetNumber:(e,t)=>this._handleSetNumber(e,t),onToggleEqualization:(e,t)=>this._handleToggleEqualization(e,t)}):""}

        <!-- 7. Daily Energy Statistics (Today's Production, Consumption & Self-Consumption) -->
        ${!1!==this._config.show_energy&&oe?Ie({hass:this._hass,language:this._config.language,dailyConfig:oe,loadEnergy:D,gridImportEnergy:L,batteryChargeEnergy:R,batteryDischargeEnergy:F,selfConsumptionDailyEnergy:W,selfConsumptionDailyEntity:V,selfConsumptionMonthlyEnergy:q,selfConsumptionMonthlyEntity:H,onEnergyClick:e=>this._handleEntityClick(e)}):""}
      </ha-card>
    `}};e([_e()],je.prototype,"_config",void 0),e([_e()],je.prototype,"_hass",void 0),e([_e()],je.prototype,"_controlsExpanded",void 0),e([_e()],je.prototype,"_chargeCurrentPreview",void 0),e([_e()],je.prototype,"_equalizationConfirmPending",void 0),je=e([pe(me)],je),window.customCards=window.customCards||[],window.customCards.push({type:me,name:"Aninerel Power Card",description:"Ultimate power card for Aninerel ANL 4200T inverter + Redodo BMS",preview:!0,documentationURL:"https://github.com/ziffmafiya/aninerel-power-card"});let Ge=class extends ce{setConfig(e){const t=JSON.parse(JSON.stringify(e||{}));t.bms&&(t.bms.battery_1&&(!t.bms.bat1_name&&t.bms.battery_1.name&&(t.bms.bat1_name=t.bms.battery_1.name),!t.bms.bat1_soc_entity&&t.bms.battery_1.soc_entity&&(t.bms.bat1_soc_entity=t.bms.battery_1.soc_entity),!t.bms.bat1_voltage_entity&&t.bms.battery_1.voltage_entity&&(t.bms.bat1_voltage_entity=t.bms.battery_1.voltage_entity),!t.bms.bat1_temperature_entity&&t.bms.battery_1.temperature_entity&&(t.bms.bat1_temperature_entity=t.bms.battery_1.temperature_entity),!t.bms.bat1_cell_prefix&&t.bms.battery_1.cell_voltage_prefix&&(t.bms.bat1_cell_prefix=t.bms.battery_1.cell_voltage_prefix)),t.bms.battery_2&&(!t.bms.bat2_name&&t.bms.battery_2.name&&(t.bms.bat2_name=t.bms.battery_2.name),!t.bms.bat2_soc_entity&&t.bms.battery_2.soc_entity&&(t.bms.bat2_soc_entity=t.bms.battery_2.soc_entity),!t.bms.bat2_voltage_entity&&t.bms.battery_2.voltage_entity&&(t.bms.bat2_voltage_entity=t.bms.battery_2.voltage_entity),!t.bms.bat2_temperature_entity&&t.bms.battery_2.temperature_entity&&(t.bms.bat2_temperature_entity=t.bms.battery_2.temperature_entity),!t.bms.bat2_cell_prefix&&t.bms.battery_2.cell_voltage_prefix&&(t.bms.bat2_cell_prefix=t.bms.battery_2.cell_voltage_prefix))),this._config=t}_computeLabel(e){return e.label?e.label:Ne(`editor.${e.name}`,this.hass,this._config?.language)||e.name}_valueChanged(e){const t=e.detail.value,i=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_getSchema(){const e=this._config?.language;return[{name:"title",label:Ne("editor.title",this.hass,e)||"Card Title",selector:{text:{}}},{name:"subtitle",label:"Card Subtitle",selector:{text:{}}},{name:"icon",label:"Header Icon (MDI)",selector:{icon:{}}},{name:"language",label:"Interface Language (Язык интерфейса)",selector:{select:{options:[{value:"auto",label:"Auto (Home Assistant Default)"},{value:"ru",label:"Русский (Russian)"},{value:"en",label:"English"}]}}},{name:"entities",type:"expandable",title:Ne("editor.entities_group",this.hass,e)||"⚡ Real-time Power Entities (Required)",schema:[{name:"solar_power",label:"Solar Generation (PV Power) [Optional]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_power",label:"Battery Power (+Charge / -Discharge)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"grid_power",label:"Grid Power (AC Input)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"load_power",label:"Home Load Power",required:!0,selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ne("editor.params_group",this.hass,e)||"📊 Electrical Parameters & Telemetry",schema:[{name:"battery_voltage_entity",label:"Battery Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"battery_current_entity",label:"Battery Current (A)",selector:{entity:{domain:"sensor"}}},{name:"grid_voltage_entity",label:"Grid AC Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"operating_mode_entity",label:"Inverter Operating Mode",selector:{entity:{domain:"sensor"}}},{name:"inverter_temperature_entity",label:"Inverter Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"inverter_load_percent_entity",label:"Inverter Load Percentage (%)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_power_entity",label:"Inverter Self-Consumption Power (W)",selector:{entity:{domain:"sensor"}}},{name:"grid_breaker_switch_entity",label:"AC Input Zigbee Breaker / Smart Plug (Switch)",selector:{entity:{domain:"switch"}}},{name:"charging_active_entity",label:"Charging Active Flag",selector:{entity:{domain:"binary_sensor"}}},{name:"kpi_mode",label:"3rd Radial Gauge KPI Metric",selector:{select:{options:[{value:"auto",label:"Auto (Battery SoC for UPS, Self-Sufficiency for Solar)"},{value:"battery_soc",label:"Battery SoC % (State of Charge)"},{value:"battery_autonomy",label:"Battery Autonomy % (Daily Load Powered by Battery)"},{value:"self_sufficiency",label:"Solar Self-Sufficiency % (Autarky)"},{value:"inverter_load",label:"Inverter Load %"}]}}},{name:"kpi_entity",label:"Custom KPI Entity (Overrides click/gauge entity)",selector:{entity:{domain:"sensor"}}}]},{name:"bms",type:"expandable",title:Ne("editor.bms_group",this.hass,e)||"🔋 BMS Redodo LiFePO4 Telemetry",schema:[{name:"dual_battery",label:"🔋 Mode: Dual 12V Batteries in Series (24V Pack)",selector:{boolean:{}}},{name:"nominal_capacity_wh",label:"Total Battery Nominal Energy Capacity (Wh, e.g. 2560 for 24V 100Ah)",selector:{number:{min:500,max:3e4,step:100,mode:"box"}}},{name:"remaining_energy_entity",label:"Remaining Battery Energy Entity (Wh / kWh, for Runtime calc)",selector:{entity:{domain:"sensor"}}},{name:"bat1_name",label:"Battery #1: Name (e.g. Redodo #1)",selector:{text:{}}},{name:"bat1_soc_entity",label:"Battery #1: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat1_voltage_entity",label:"Battery #1: Voltage (~13.5V)",selector:{entity:{domain:"sensor"}}},{name:"bat1_temperature_entity",label:"Battery #1: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat1_cell_prefix",label:"Battery #1: Cell Sensor Prefix (1..4)",selector:{text:{}}},{name:"bat2_name",label:"Battery #2: Name (e.g. Redodo #2)",selector:{text:{}}},{name:"bat2_soc_entity",label:"Battery #2: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat2_voltage_entity",label:"Battery #2: Voltage (~13.5V)",selector:{entity:{domain:"sensor"}}},{name:"bat2_temperature_entity",label:"Battery #2: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat2_cell_prefix",label:"Battery #2: Cell Sensor Prefix (1..4)",selector:{text:{}}},{name:"soc_entity",label:"Total / Average SOC % (Single Pack)",selector:{entity:{domain:"sensor"}}},{name:"voltage_entity",label:"Total Battery Voltage via BMS (24V)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"BMS Cell Temperature Probe (°C)",selector:{entity:{domain:"sensor"}}},{name:"cell_delta_entity",label:"Cell Imbalance (Delta mV)",selector:{entity:{domain:"sensor"}}},{name:"cycle_count_entity",label:"Battery Cycle Count",selector:{entity:{domain:"sensor"}}},{name:"remaining_capacity_entity",label:"Remaining Capacity (Ah)",selector:{entity:{domain:"sensor"}}},{name:"cell_count",label:"Single Pack Cell Count (8 for 24V)",selector:{number:{min:4,max:16,step:1,mode:"box"}}},{name:"cell_voltage_prefix",label:"Single Pack Cell Sensor Prefix (1..8)",selector:{text:{}}}]},{name:"controls",type:"expandable",title:Ne("editor.controls_group",this.hass,e)||"🎛️ Inverter Controls & Settings",schema:[{name:"charge_source_entity",label:"Charge Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"output_priority_entity",label:"Output Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"max_charge_current_entity",label:"Max AC Charge Current (Number)",selector:{entity:{domain:"number"}}},{name:"bulk_voltage_entity",label:"Bulk Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"float_voltage_entity",label:"Float Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"equalization_entity",label:"Battery Equalization Mode (Switch)",selector:{entity:{domain:"switch"}}}]},{name:"safety",type:"expandable",title:Ne("editor.safety_group",this.hass,e)||"🛡️ Safety & Diagnostics",schema:[{name:"fault_active_entity",label:"Fault Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"fault_code_entity",label:"Fault Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"fault_details_entity",label:"Fault Details Text [Optional]",selector:{entity:{domain:"sensor"}}},{name:"warnings_active_entity",label:"Warnings Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"warning_code_entity",label:"Warning Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"warning_details_entity",label:"Warning Details Text [Optional]",selector:{entity:{domain:"sensor"}}}]},{name:"daily_energy",type:"expandable",title:Ne("editor.energy_group",this.hass,e)||"📈 Daily Energy Counters",schema:[{name:"load_energy_entity",label:"Daily Home Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_import_entity",label:"Daily Grid Import (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_charge_entity",label:"Daily Battery Charge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_entity",label:"Daily Battery Discharge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_daily_entity",label:"Daily Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_monthly_entity",label:"Monthly Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ne("editor.display_group",this.hass,e)||"🎨 Layout & Visualization Toggles",schema:[{name:"max_power",label:"Scale Max Power Rating (W)",selector:{number:{min:1e3,max:2e4,step:200,mode:"box"}}},{name:"use_log_flow_model",label:"Logarithmic flow animation speed model",selector:{boolean:{}}},{name:"compact_mode",label:"Compact layout mode (smaller padding & spacing)",selector:{boolean:{}}},{name:"show_header",label:"Show header bar with status chips",selector:{boolean:{}}},{name:"show_flow",label:"Show animated power flow diagram",selector:{boolean:{}}},{name:"show_solar",label:"Show solar generation (PV)",selector:{boolean:{}}},{name:"grid_position",label:"Grid position when solar is hidden",selector:{select:{options:[{value:"bottom",label:"Bottom (Default)"},{value:"top",label:"Top (Replaces solar)"}]}}},{name:"show_params",label:"Show electrical telemetry parameters",selector:{boolean:{}}},{name:"show_bms",label:"Show Redodo BMS section",selector:{boolean:{}}},{name:"show_controls",label:"Show inverter controls & settings",selector:{boolean:{}}},{name:"show_energy",label:"Show daily energy statistics",selector:{boolean:{}}},{name:"show_alerts",label:"Show diagnostic alerts & warnings",selector:{boolean:{}}}]}]}static{this.styles=o`
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
    `:U``}};e([ue({attribute:!1})],Ge.prototype,"hass",void 0),e([_e()],Ge.prototype,"_config",void 0),Ge=e([pe("aninerel-power-card-editor")],Ge);var Ye=Object.freeze({__proto__:null,get AninerelPowerCardEditor(){return Ge}});export{je as AninerelPowerCard};
