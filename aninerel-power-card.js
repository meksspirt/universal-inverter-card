function e(e,t,i,r){var a,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(o=(n<3?a(o):n>3?a(t,i,o):a(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:g,getPrototypeOf:u}=Object,h=globalThis,_=h.trustedTypes,m=_?_.emptyScript:"",b=h.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...g(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=r;const n=a.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const n=this.constructor;if(!1===r&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,b?.({ReactiveElement:w}),(h.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=e=>e,C=$.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,M="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+N,E=`<${A}>`,P=document,B=()=>P.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,O="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,L=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,D=/"/g,W=/^(?:script|style|textarea|title)$/i,H=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),U=H(1),q=H(2),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,K=P.createTreeWalker(P,129);function Z(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,r=[];let a,n=2===t?"<svg>":3===t?"<math>":"",o=T;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===T?"!--"===l[1]?o=V:void 0!==l[1]?o=L:void 0!==l[2]?(W.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=F):void 0!==l[3]&&(o=F):o===F?">"===l[0]?(o=a??T,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?F:'"'===l[3]?D:R):o===D||o===R?o=F:o===V||o===L?o=T:(o=F,a=void 0);const p=o===F&&e[t+1].startsWith("/>")?" ":"";n+=o===T?i+E:c>=0?(r.push(s),i.slice(0,c)+M+i.slice(c)+N+p):i+N+(-2===c?t:p)}return[Z(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,n=0;const o=e.length-1,s=this.parts,[l,c]=J(e,t);if(this.el=Q.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&s.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(M)){const t=c[n++],i=r.getAttribute(e).split(N),o=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?re:"?"===o[1]?ae:"@"===o[1]?ne:ie}),r.removeAttribute(e)}else e.startsWith(N)&&(s.push({type:6,index:a}),r.removeAttribute(e));if(W.test(r.tagName)){const e=r.textContent.split(N),t=e.length-1;if(t>0){r.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],B()),K.nextNode(),s.push({type:2,index:++a});r.append(e[t],B())}}}else if(8===r.nodeType)if(r.data===A)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(N,e+1));)s.push({type:7,index:a}),e+=N.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===j)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const n=z(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=X(e,a._$AS(e,t.values),a,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??P).importNode(t,!0);K.currentNode=r;let a=K.nextNode(),n=0,o=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new oe(a,this,e)),this._$AV.push(t),s=i[++o]}n!==s?.index&&(a=K.nextNode(),n++)}return K.currentNode=P,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),z(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new Q(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new te(this.O(B()),this.O(B()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const a=this.strings;let n=!1;if(void 0===a)e=X(this,e,t,0),n=!z(e)||e!==this._$AH&&e!==j,n&&(this._$AH=e);else{const r=e;let o,s;for(e=a[0],o=0;o<a.length-1;o++)s=X(this,r[i+o],t,o),s===j&&(s=this._$AH[o]),n||=!z(s)||s!==this._$AH[o],s===G?e=G:e!==G&&(e+=(s??"")+a[o+1]),this._$AH[o]=s}n&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class ne extends ie{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??G)===j)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=$.litHtmlPolyfillSupport;se?.(Q,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new te(t.insertBefore(B(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ge={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},ue=(e=ge,t,i)=>{const{kind:r,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function he(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return he({...e,state:!0,attribute:!1})}const me="aninerel-power-card",be={max_power:4200,inverter_capacity:4200,min_flow_rate:.75,max_flow_rate:6,use_log_flow_model:!0,show_header:!0,show_flow:!0,grid_position:"bottom",show_params:!0,show_bms:!0,show_controls:!0,show_energy:!0,show_alerts:!0,compact_mode:!1,language:"auto"},ye="var(--energy-solar-color, #F59E0B)",fe="var(--energy-battery-in-color, #10B981)",ve="var(--energy-battery-out-color, #FF9800)",xe="var(--energy-grid-consumption-color, #4285F4)",we="var(--energy-grid-return-color, #2ecc71)",$e="var(--primary-text-color, #E0E0E0)",ke={type:"custom:aninerel-power-card",title:"Aninerel ANL 4200T",show_solar:!1,entities:{battery_power:"sensor.aninerel_anl_4200t_24l_w_pro_battery_power",grid_power:"sensor.aninerel_anl_4200t_24l_w_pro_grid_power",load_power:"sensor.aninerel_anl_4200t_24l_w_pro_load_power"},battery_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage",battery_current_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_current",grid_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage",operating_mode_entity:"sensor.aninerel_anl_4200t_24l_w_pro_operating_mode",charging_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active",inverter_temperature_entity:"sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature",inverter_load_percent_entity:"sensor.aninerel_anl_4200t_24l_w_pro_load_percent",self_consumption_power_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",grid_breaker_switch_entity:"switch.invertor_vkhod",bms:{soc_entity:"sensor.redodo_battery_state_of_charge",cell_count:8,cell_voltage_prefix:"sensor.redodo_battery_cell_voltage_",nominal_capacity_wh:2560},controls:{charge_source_entity:"select.aninerel_anl_4200t_24l_w_pro_charge_source_priority",output_priority_entity:"select.aninerel_anl_4200t_24l_w_pro_output_source_priority",max_charge_current_entity:"number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current",bulk_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage",float_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage",equalization_entity:"switch.aninerel_anl_4200t_24l_w_pro_battery_equalization"},safety:{fault_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active",fault_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_fault_code",warnings_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active",warning_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_code",warning_details_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_details"},daily_energy:{load_energy_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today",grid_import_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today",battery_charge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today",battery_discharge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today",self_consumption_daily_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",self_consumption_monthly_entity:"sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats"}},Ce=[o`
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

  .self-power-chip {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    color: #60a5fa;
  }

  .input-breaker-chip {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
  }

  .input-breaker-chip.breaker-on {
    color: #34d399;
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    cursor: default;
  }
`,o`
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
`,o`
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
`,o`
  /* ============================================================
     BMS SECTION (SINGLE & DUAL BATTERY)
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

  .cell-col.is-balancing {
    border-color: rgba(245, 158, 11, 0.38);
    background: rgba(245, 158, 11, 0.035);
  }

  .cell-top-indicator {
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .cell-balance-tag {
    font-size: 0.68rem;
    color: #fbbf24;
    animation: balance-pulse 1.2s infinite ease-in-out;
    filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.9));
    line-height: 1;
  }

  @keyframes balance-pulse {
    0%, 100% {
      transform: scale(0.9);
      opacity: 0.75;
    }
    50% {
      transform: scale(1.25);
      opacity: 1;
    }
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

  .cell-cap.cap-balancing {
    background: #fbbf24;
    box-shadow: 0 0 6px rgba(245, 158, 11, 0.85);
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

  .cell-ir-text {
    font-size: 0.58rem;
    font-weight: 600;
    color: rgba(148, 163, 184, 0.78);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    margin-top: 1px;
    white-space: nowrap;
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
`,o`
  /* ============================================================
     UNIVERSAL INVERTER CONTROLS & SETTINGS SECTION
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
    gap: 8px;
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
    min-width: 0;
  }

  .controls-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: var(--inverter-color);
    flex-shrink: 0;
  }

  .controls-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex-shrink: 0;
  }

  .controls-quick-summary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 2px 8px;
    border-radius: 999px;
    white-space: nowrap;
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
    padding: 10px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid var(--divider);
  }

  /* Responsive Priority Selectors Grid (Stacks cleanly on standard cards, 2-col on wide cards) */
  .controls-select-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 10px;
    width: 100%;
  }

  /* Responsive Steppers Grid (2-col on standard cards, 1-col on narrow mobile) */
  .controls-stepper-grid,
  .controls-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
    gap: 10px;
    width: 100%;
  }

  .control-box {
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 11px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    box-sizing: border-box;
  }

  .control-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    cursor: pointer;
  }

  .control-box-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--inverter-color);
    opacity: 0.85;
    flex-shrink: 0;
  }

  .control-box-header label {
    font-size: 0.71rem;
    color: var(--secondary-text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.45px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .control-label-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    flex: 1;
  }

  .control-current-tag {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--inverter-color);
    background: rgba(59, 130, 246, 0.14);
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 1px 7px;
    border-radius: 6px;
    flex-shrink: 0;
    letter-spacing: 0.3px;
  }

  .control-live-val {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--inverter-color);
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.25);
    padding: 2px 8px;
    border-radius: 6px;
    flex-shrink: 0;
    cursor: pointer;
  }

  /* Smart Pill Selector (Never clips horizontally) */
  .pill-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
    background: rgba(0, 0, 0, 0.35);
    padding: 4px;
    border-radius: 9px;
    gap: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  .pill-btn {
    min-width: 0;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.02);
    color: var(--secondary-text);
    padding: 6px 6px;
    border-radius: 7px;
    cursor: pointer;
    outline: none;
    transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    text-align: center;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .pill-btn:hover {
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .pill-btn:focus-visible {
    outline: 2px solid var(--inverter-color);
    outline-offset: 1px;
  }

  .pill-btn.active {
    background: linear-gradient(135deg, var(--inverter-color), #2563eb);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.45);
  }

  .pill-code {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.35px;
    line-height: 1.15;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pill-sub {
    font-size: 0.61rem;
    font-weight: 500;
    opacity: 0.78;
    line-height: 1.1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pill-btn.active .pill-sub {
    opacity: 0.92;
  }

  /* ============================================================
     RANGE SLIDER WITH FILLED TRACK, STEPPERS & PRESET CHIPS
     ============================================================ */
  .slider-box {
    padding: 11px 12px;
    gap: 9px;
  }

  .slider-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .slider-track-wrap {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .slider-Sub-bounds {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2px;
  }

  .slider-boundary {
    font-size: 0.64rem;
    color: var(--secondary-text);
    font-weight: 600;
    opacity: 0.75;
  }

  .slider-step-btn {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  /* Cross-browser <input type="range"> styling (separate WebKit & Firefox rule blocks) */
  .control-range {
    --slider-track-size: 6px;
    --slider-thumb-size: 18px;
    width: 100%;
    margin: 4px 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
  }

  .control-range:focus-visible {
    outline: 2px solid var(--inverter-color);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .control-range::-webkit-slider-runnable-track {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--inverter-color) 0%,
      #60a5fa var(--slider-progress, 0%),
      rgba(255, 255, 255, 0.14) var(--slider-progress, 0%)
    );
  }

  .control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    margin-block-start: calc((var(--slider-track-size) - var(--slider-thumb-size)) / 2);
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid var(--inverter-color);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.85);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .control-range::-webkit-slider-thumb:hover {
    transform: scale(1.14);
    box-shadow: 0 0 14px rgba(59, 130, 246, 1);
  }

  .control-range::-moz-range-track {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
  }

  .control-range::-moz-range-progress {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: linear-gradient(90deg, var(--inverter-color), #60a5fa);
  }

  .control-range::-moz-range-thumb {
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid var(--inverter-color);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.85);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .control-range::-moz-range-thumb:hover {
    transform: scale(1.14);
  }

  /* Quick-Select Preset Chips under Slider */
  .slider-presets-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-top: 2px;
  }

  .preset-chip {
    flex: 1;
    min-width: 42px;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: var(--secondary-text);
    font-size: 0.68rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
  }

  .preset-chip:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-text);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .preset-chip.active {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    border-color: rgba(59, 130, 246, 0.5);
  }

  /* ============================================================
     PRECISION VOLTAGE / SOC STEPPERS
     ============================================================ */
  .voltage-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 8px;
    padding: 3px 4px;
    gap: 6px;
  }

  .stepper-btn {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.06);
    color: var(--primary-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background 0.15s ease, transform 0.1s ease;
    user-select: none;
  }

  .stepper-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper-btn:active:not(:disabled) {
    transform: scale(0.92);
  }

  .stepper-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .stepper-val {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    cursor: pointer;
    text-align: center;
  }

  /* ============================================================
     NORMAL SWITCHES & DANGER ZONE (EQUALIZATION)
     ============================================================ */
  .normal-switch-row {
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .normal-switch-row.switch-row-active {
    border-color: rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.06);
  }

  .switch-row-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    cursor: pointer;
  }

  .switch-row-left ha-icon {
    --mdc-icon-size: 17px;
    color: var(--inverter-color);
    flex-shrink: 0;
  }

  .switch-row-title {
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--primary-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

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
    min-width: 0;
    cursor: pointer;
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
    flex-shrink: 0;
  }

  .danger-desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.25;
  }

  .toggle-switch-btn {
    min-width: 54px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.74rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
    flex-shrink: 0;
  }

  .switch-off {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text);
  }

  .switch-off:hover {
    background: rgba(255, 255, 255, 0.16);
    color: var(--primary-text);
  }

  .normal-toggle.normal-on {
    background: var(--inverter-color);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.45);
  }

  .switch-on {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  }
`,o`
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
`,o`
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
`,o`
  /* ============================================================
     RESPONSIVE BREAKPOINTS & ACCESSIBILITY
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
`];const Se={en:{common:{version:"Version",name:"Aninerel Power Card",description:"Ultimate card for Aninerel ANL 4200T inverter + Redodo BMS",offline:"OFFLINE",ok:"OK",chg:"CHG",fault:"FAULT",warn:"WARN",na:"N/A"},header:{subtitle_solar:"Hybrid 24V 4.2kW Inverter",subtitle_ups:"24V 4.2kW UPS Inverter",self_power:"Self",input_breaker:"Input"},alerts:{offline_title:"Inverter Collector Offline",offline_desc:"Key inverter telemetry sensors are currently unavailable. Check Wi-Fi/RS485 datalogger connection."},mode:{battery:"Battery",mains:"Mains",bypass:"Bypass",line:"Line",grid:"Grid",off_grid:"Off-Grid"},nodes:{solar:"Solar",battery:"Battery",inverter:"Inverter",home:"Home",grid:"Grid"},flow:{charge:"Charge",discharge:"Discharge",standby:"Standby",import:"Import",export:"Export",self:"Self",offline:"Offline",input_on:"Input ON",input_off:"Input OFF",output_off:"Output Off",load:"Load"},params:{battery:"Battery DC",grid:"Grid AC",battery_soc:"Battery SoC",battery_autonomy:"Battery Autonomy",inverter_load:"Inverter Load",self_sufficiency:"Self-Sufficiency",normal:"Normal",deviated:"Deviated",sag:"Low (Sag)",surge:"High (Surge)",offline:"Offline"},bms:{title:"BMS LiFePO4",title_dual:"BMS: 2× 12V Series (24V)",series_badge:"Series",parallel_badge:"Parallel",single_badge:"Single Pack",delta_packs:"Δ Packs",delta_cells:"Δ Cells",min_cell:"Min",max_cell:"Max",avg_cell:"Avg",temp:"Temp",cycles:"Cycles",soh:"Health (SOH)",balancing:"Balancing",capacity:"Capacity",remaining:"Remaining",balanced:"Balanced",drift:"Normal Drift",imbalance:"Imbalance Alert",pack_drift_warn:"Pack voltage drift detected ({delta} mV: {v1}V vs {v2}V). An active battery equalizer is recommended.",offline:"BMS telemetry unavailable"},controls:{title:"Inverter: Controls & Settings",charge_source:"Charge Source Priority",output_priority:"Output Source Priority",max_charge_current:"Max AC Charge Current",max_total_charge_current:"Max Total Charge Current",bulk_voltage:"Bulk / Absorption Voltage",float_voltage:"Float Voltage",back_to_grid_voltage:"Back to Grid Threshold",cutoff_voltage:"Low DC Cut-off Threshold",buzzer:"Audible Alarm (Buzzer)",equalization:"Battery Equalization",equalization_warning:"⚠️ For LiFePO4, must ALWAYS BE OFF to prevent cell overcharging!",confirm_on:"Confirm ON?",press:"Trigger"},energy:{title:"Daily Energy Balance",total:"Total",solar_production:"Solar Production (PV)",load:"Home Consumption",grid_import:"Grid Import",grid_export:"Grid Export",bat_charge:"Battery Charged",bat_discharge:"Battery Discharged",self_consumption:"Inverter Self-Consumption",month_short:"Mo"},editor:{title:"Card Title",entities_group:"⚡ Real-time Power Entities (Required)",params_group:"📊 Electrical Parameters & Telemetry",bms_group:"🔋 Battery Bank & BMS Telemetry",controls_group:"🎛️ Inverter Controls & Settings",safety_group:"🛡️ Safety & Diagnostics",energy_group:"📈 Daily Energy Counters",display_group:"🎨 Layout & Visualization Toggles"}},ru:{common:{version:"Версия",name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo",offline:"НЕТ СВЯЗИ",ok:"ОК",chg:"ЗАРЯД",fault:"АВАРИЯ",warn:"ВНИМ.",na:"Н/Д"},header:{subtitle_solar:"Гибридный инвертор 24В 4.2 кВт",subtitle_ups:"ИБП квартиры 24В 4.2 кВт",self_power:"ХХ",input_breaker:"Вход"},alerts:{offline_title:"Потеряна связь с инвертором (Offline)",offline_desc:"Основные сенсоры телеметрии недоступны (unavailable). Проверьте питание и Wi-Fi/RS485 даталоггер."},mode:{battery:"Батарея",mains:"Сеть",bypass:"Байпас",line:"Сеть",grid:"Сеть",off_grid:"Автономно"},nodes:{solar:"Солнце",battery:"АКБ",inverter:"Инвертор",home:"Дом",grid:"Сеть"},flow:{charge:"Заряд",discharge:"Разряд",standby:"Ожидание",import:"Импорт",export:"Экспорт",self:"ХХ",offline:"Выкл",input_on:"Вход ВКЛ",input_off:"Вход ВЫКЛ",output_off:"Выход откл",load:"Нагрузка"},params:{battery:"Батарея DC",grid:"Сеть AC",battery_soc:"Заряд АКБ",battery_autonomy:"Автономность АКБ",inverter_load:"Нагрузка инвертора",self_sufficiency:"Самообеспечение",normal:"Норма",deviated:"Отклонение",sag:"Просадка (0В)",surge:"Перенапряжение",offline:"Нет связи"},bms:{title:"BMS LiFePO4",title_dual:"BMS: 2× 12В Последовательно (24В)",series_badge:"Последовательно",parallel_badge:"Параллельно",single_badge:"Моноблок",delta_packs:"Δ Батарей",delta_cells:"Δ Ячеек",min_cell:"Мин",max_cell:"Макс",avg_cell:"Сред",temp:"Темп.",cycles:"Циклы",soh:"Здоровье",balancing:"Балансировка",capacity:"Емкость",remaining:"Остаток",balanced:"Сбалансировано",drift:"Легкий дрейф",imbalance:"Разбаланс!",pack_drift_warn:"Разбаланс между батареями: {delta} мВ ({v1}В против {v2}В). Рекомендуется активный балансир.",offline:"Нет данных от BMS"},controls:{title:"Инвертор: Управление и настройки",charge_source:"Приоритет источника заряда",output_priority:"Приоритет питания дома",max_charge_current:"Макс. ток сетевого заряда AC",max_total_charge_current:"Общий ток заряда (PV + AC)",bulk_voltage:"Напряжение Bulk (Заряд)",float_voltage:"Напряжение Float (Поддержка)",back_to_grid_voltage:"Переход на сеть (Back to Grid)",cutoff_voltage:"Отсечка по разряду (Cut-off)",buzzer:"Звуковой сигнал (Buzzer)",equalization:"Выравнивание (Equalization)",equalization_warning:"⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!",confirm_on:"Точно ВКЛ?",press:"Выполнить"},energy:{title:"Суточный баланс энергии",total:"Дом",solar_production:"Выработка СЭС (PV)",load:"Потребление дома",grid_import:"Импорт из сети",grid_export:"Экспорт в сеть",bat_charge:"Заряд АКБ",bat_discharge:"Отдано из АКБ",self_consumption:"Собств. нужды инвертора (ХХ)",month_short:"Мес"},editor:{title:"Заголовок карточки",entities_group:"⚡ Мощности реального времени (Обязательно)",params_group:"📊 Электрические параметры и телеметрия",bms_group:"🔋 Телеметрия BMS и блока аккумуляторов",controls_group:"🎛️ Управление инвертором и настройки",safety_group:"🛡️ Безопасность и диагностика сбоев",energy_group:"📈 Суточные счетчики электроэнергии",display_group:"🎨 Настройки отображения и видимости секций"}}};function Me(e,t){if(t&&"auto"!==t&&Se[t.toLowerCase()])return t.toLowerCase();const i=(e?.locale?.language||e?.language||("undefined"!=typeof navigator?navigator.language:"")||"ru").toLowerCase().split("-")[0];return Se[i]?i:"ru"}function Ne(e,t,i,r,a){const n=Me(t,i);let o;try{o=e.split(".").reduce((e,t)=>e?.[t],Se[n])}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.ru)}catch(e){o=void 0}if(void 0===o)try{o=e.split(".").reduce((e,t)=>e?.[t],Se.en)}catch(e){o=void 0}return void 0!==o&&"string"==typeof o||(o=e),o}function Ae(e){const{hass:t,config:i,hasSolar:r=!1,systemVoltage:a=24,isOffline:n=!1,operatingMode:o,temperature:s,selfConsumptionWatts:l,selfConsumptionEntity:c,gridBreakerState:d,gridBreakerEntity:p,isCharging:g,isFault:u,faultCode:h,isWarning:_,warningCode:m,onChipClick:b}=e,y=i.language,f=o?o.toLowerCase():"";let v="#10b981",x="mdi:battery-charging-60";f.includes("fault")||f.includes("error")||f.includes("alarm")?(v="#ef4444",x="mdi:alert-octagon"):f.includes("bypass")?(v="#ef4444",x="mdi:transit-connection-variant"):f.includes("solar")||f.includes("pv")||f.includes("hybrid")||"sbu"===f||"sub"===f?(v="#f59e0b",x="mdi:solar-power-variant"):f.includes("mains")||f.includes("line")||f.includes("grid")||f.includes("utility")||"usb"===f||"uti"===f?(v="#3b82f6",x="mdi:transmission-tower"):f.includes("standby")||f.includes("idle")||f.includes("saving")||f.includes("eco")?(v="#94a3b8",x="mdi:power-sleep"):(f.includes("battery")||f.includes("off-grid")||f.includes("off_grid")||f.includes("inverter")||f.includes("discharg")||f.includes("backup")||f.includes("ups"))&&(v="#10b981",x="mdi:battery-outline");let w="#10b981";null===s||isNaN(s)||(s>55?w="#ef4444":s>42&&(w="#f59e0b"));const $=r?"mdi:solar-power-variant-outline":"mdi:home-battery-outline",k=function(e,t){if(e.title&&""!==e.title.trim())return e.title.trim();const i=[e.entities?.load_power,e.entities?.battery_power,e.operating_mode_entity].filter(Boolean).join(" ").toLowerCase();return i.includes("aninerel")?"Aninerel ANL 4200T":i.includes("anenji")?"Anenji Hybrid Inverter":i.includes("powmr")?"PowMr Hybrid Inverter":i.includes("easun")?"EASun Power Inverter":i.includes("growatt")?"Growatt Inverter":i.includes("deye")?"Deye Hybrid Inverter":i.includes("sunsynk")?"Sunsynk Hybrid Inverter":i.includes("srne")?"SRNE Solar Inverter":i.includes("must")?"Must Power Inverter":i.includes("victron")?"Victron Energy":i.includes("luxpower")?"LuxPower Inverter":i.includes("sofar")?"Sofar Solar":i.includes("huawei")?"Huawei FusionSolar":i.includes("fronius")?"Fronius Inverter":i.includes("axioma")?"Axioma Energy":i.includes("voltronic")||i.includes("axpert")||i.includes("mppsolar")?"Voltronic Axpert":"ru"===Me(t,e.language)?"Гибридный инвертор":"Hybrid Power Inverter"}(i,t),C=function(e,t,i,r){if(e.subtitle&&""!==e.subtitle.trim())return e.subtitle.trim();const a=(e.max_power||e.inverter_capacity||4200)/1e3,n=a%1==0?a.toFixed(0):a.toFixed(1);return"ru"===Me(r,e.language)?t?`Гибридный инвертор ${i}В ${n} кВт`:`ИБП ${i}В ${n} кВт`:t?`Hybrid ${i}V ${n}kW Inverter`:`${i}V ${n}kW UPS Inverter`}(i,r,a,t);return U`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="${i.icon||$}"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${k}</span>
          <span class="header-subtitle">${C}</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${o&&"N/A"!==o&&!n?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${v}"
                @click=${()=>b(i.operating_mode_entity)}
                title="Inverter operating mode"
              >
                <ha-icon .icon=${x}></ha-icon>
                <span>${o}</span>
              </button>
            `:""}

        <!-- Inverter Temperature Chip -->
        ${null===s||isNaN(s)?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${w}"
                @click=${()=>b(i.inverter_temperature_entity)}
                title="Inverter power unit temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(s)}°C</span>
              </button>
            `}

        <!-- Self-Consumption Power Chip -->
        ${null!=l&&!isNaN(l)&&l>0?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #a855f7"
                @click=${()=>b(c)}
                title="Inverter own power consumption"
              >
                <ha-icon icon="mdi:flash-outline"></ha-icon>
                <span>${Ne("header.self_power",t,y)}: ${Math.round(l)}W</span>
              </button>
            `:""}

        <!-- Input Breaker Chip (Zigbee Smart Plug / Breaker) -->
        ${"on"===d||"off"===d?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${"on"===d?"#3b82f6":"#f59e0b"}"
                @click=${()=>b(p)}
                title="AC Input Breaker (${d.toUpperCase()})"
              >
                <ha-icon icon="${"on"===d?"mdi:electric-switch-closed":"mdi:electric-switch"}"></ha-icon>
                <span>${Ne("header.input_breaker",t,y)}: ${d.toUpperCase()}</span>
              </button>
            `:""}

        <!-- Charging Active Flag -->
        ${g&&!n?U`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${()=>b(i.charging_active_entity)}
                title="Charging active"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>${Ne("common.chg",t,y)}</span>
              </button>
            `:""}

        <!-- Offline Chip -->
        ${n?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>b(i.operating_mode_entity||i.entities?.load_power)}
                title="${Ne("alerts.offline_title",t,y)}"
              >
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
                <span>${Ne("common.offline",t,y)}</span>
              </button>
            `:""}

        <!-- Fault Active Chip -->
        ${u&&!n?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>b(i.safety?.fault_code_entity||i.safety?.fault_active_entity)}
                title="Inverter fault status"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${h?`F${h}`:Ne("common.fault",t,y)}</span>
              </button>
            `:""}

        <!-- Warnings Active Chip -->
        ${!_||u||n?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${()=>b(i.safety?.warning_code_entity||i.safety?.warnings_active_entity)}
                title="Inverter warning"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${m?`W${m}`:Ne("common.warn",t,y)}</span>
              </button>
            `}

        <!-- System Normal Chip -->
        ${u||_||n?"":U`
              <div class="status-chip chip-ok" title="System normal">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>${Ne("common.ok",t,y)}</span>
              </div>
            `}
      </div>
    </div>
  `}function Ee(e,t=1){return Math.abs(e)>=1e3?`${(e/1e3).toFixed(t)} kW`:`${Math.round(e)} W`}function Pe(e,t="ru"){if(null==e||isNaN(e)||!isFinite(e)||e<=0)return null;const i=Math.min(99,e),r=Math.floor(i),a=Math.round(60*(i-r));return"ru"===t?r<=0?`~${Math.max(1,a)} мин`:a<=0||r>=24?`~${r} ч`:`~${r}ч ${a}м`:r<=0?`~${Math.max(1,a)}m`:a<=0||r>=24?`~${r}h`:`~${r}h ${a}m`}function Be(e){const{hass:t,config:i,hasSolar:r=!1,systemVoltage:a=24,isOffline:n=!1,gridPosition:o="bottom",solarWatts:s=0,batteryWatts:l,gridWatts:c,loadWatts:d,batterySoc:p,batteryVoltage:g=null,batteryCurrent:u=null,gridVoltage:h=null,gridBreakerState:_=null,inverterLoadPercent:m=0,batteryRuntimeText:b,selfConsumptionWatts:y,operatingMode:f,isFault:v,onNodeClick:x}=e,w=i.language,$=i.max_power||4200,k=!1!==i.use_log_flow_model,C=i.min_flow_rate||.75,S=i.max_flow_rate||5,M=function(e=!1,t="bottom"){if(e){const e=[{id:"solar",d:"M 250 116 L 250 134",x1:250,y1:116,x2:250,y2:134},{id:"battery",d:"M 115 182 L 187 182",x1:115,y1:182,x2:187,y2:182},{id:"home",d:"M 313 182 L 388 182",x1:313,y1:182,x2:388,y2:182},{id:"grid",d:"M 250 230 L 250 267",x1:250,y1:230,x2:250,y2:267}];return{viewBoxHeight:375,aspectRatio:"500 / 375",tracks:e.map(e=>e.d),conduits:e,nodes:{solar:{x:250,y:44,radius:34},inverter:{x:250,y:182,radius:46},battery:{x:74,y:182,radius:39},home:{x:426,y:182,radius:36},grid:{x:250,y:304,radius:35}}}}if("top"===t){const e=[{id:"grid",d:"M 250 128 L 250 156",x1:250,y1:128,x2:250,y2:156},{id:"battery",d:"M 115 204 L 187 204",x1:115,y1:204,x2:187,y2:204},{id:"home",d:"M 313 204 L 388 204",x1:313,y1:204,x2:388,y2:204}];return{viewBoxHeight:300,aspectRatio:"500 / 300",tracks:e.map(e=>e.d),conduits:e,nodes:{grid:{x:250,y:48,radius:35},inverter:{x:250,y:204,radius:46},battery:{x:74,y:204,radius:39},home:{x:426,y:204,radius:36}}}}const i=[{id:"battery",d:"M 115 84 L 187 84",x1:115,y1:84,x2:187,y2:84},{id:"home",d:"M 313 84 L 388 84",x1:313,y1:84,x2:388,y2:84},{id:"grid",d:"M 250 131 L 250 179",x1:250,y1:131,x2:250,y2:179}];return{viewBoxHeight:305,aspectRatio:"500 / 305",tracks:i.map(e=>e.d),conduits:i,nodes:{battery:{x:74,y:84,radius:39},inverter:{x:250,y:84,radius:46},home:{x:426,y:84,radius:36},grid:{x:250,y:216,radius:35}}}}(r,o),{viewBoxHeight:N}=M,{solar:A,inverter:E,battery:P,home:B,grid:z}=M.nodes,I=function(e,t,i,r,a,n=!1,o="bottom"){const s=[],l=a?.solar||ye,c=a?.battery_charge||fe,d=a?.battery_discharge||ve,p=a?.grid_import||xe,g=a?.grid_export||we,u=a?.home||$e;if(n){const t=Math.max(0,e);t>=5&&s.push({id:"flow-solar-inverter",d:"M 250 116 L 250 134",watts:t,color:l,reversed:!1})}let h="M 115 182 L 187 182",_="M 313 182 L 388 182",m="M 250 230 L 250 267",b=!0;n||("top"===o?(h="M 115 204 L 187 204",_="M 313 204 L 388 204",m="M 250 128 L 250 156",b=!1):(h="M 115 84 L 187 84",_="M 313 84 L 388 84",m="M 250 131 L 250 179",b=!0));const y=Math.max(0,r);y>=5&&s.push({id:"flow-inverter-home",d:_,watts:y,color:u,reversed:!1});const f=Math.abs(t);if(f>=5){const e=t>0;s.push({id:"flow-battery-inverter",d:h,watts:f,color:e?c:d,reversed:e})}const v=Math.abs(i);if(v>=5){const e=i>0;s.push({id:"flow-grid-inverter",d:m,watts:v,color:e?p:g,reversed:e?b:!b})}return s}(s,l,c,d,i.colors,r,o),O=null!==p&&!isNaN(p),T=O?Math.max(0,Math.min(100,Math.round(p))):0,V=2*Math.PI*33,L=V*(1-T/100),F=O?T>50?"#10b981":T>20?"#f59e0b":"#ef4444":"#64748b",R=Ne(l>=5?"flow.charge":l<=-5?"flow.discharge":"flow.standby",t,w),D=[];null===g||isNaN(g)||D.push(`${g.toFixed(1)}V`),null===u||isNaN(u)||D.push(`${u>0?"+":""}${u.toFixed(1)}A`);const W=D.join(" • ");let H="";r&&s>=10?H=` ← ${Ne("nodes.solar",t,w)}`:c>=5?H=` ← ${Ne("nodes.grid",t,w)}`:l<=-5&&(H=` ← ${Ne("nodes.battery",t,w)}`);const j=null!=y&&!isNaN(y)&&y>0,G=j?`${Ne("flow.self",t,w)}: ${Math.round(y)} W${H}`:`${($/1e3).toFixed(1)} kW • ${a}V`,Y=f&&"N/A"!==f&&"unavailable"!==f?f:null,K=Y||(n&&Math.abs(l)<5&&Math.abs(c)<5?Ne("flow.offline",t,w):Ne("flow.standby",t,w)),Z=v?"#ef4444":n&&Math.abs(l)<5&&Math.abs(c)<5?"#64748b":l<=-5?"#f59e0b":"#3b82f6",J=v?"#ef4444":n&&Math.abs(l)<5&&Math.abs(c)<5?"#64748b":l<=-5?"#f59e0b":"#10b981",Q=Math.max(0,Math.min(100,Math.round(m??0))),X=2*Math.PI*31,ee=X*(1-Q/100),te=n&&0===d?Ne("flow.output_off",t,w):`${Ne("flow.load",t,w)} ${Q}%`,ie=[];null===h||isNaN(h)||ie.push(`${Math.round(h)}V`),"off"===_?ie.push(Ne("flow.input_off",t,w)):"on"===_&&ie.push(Ne("flow.input_on",t,w));const re=ie.join(" • "),ae=null!==h&&h<100?"#ef4444":"off"===_?"#f59e0b":null!==h&&h>=190?"#10b981":"#3b82f6";return U`
    <div
      class="power-flow-container ${r?"with-solar":"no-solar"}"
      style="--flow-aspect-ratio: 500 / ${N};"
    >
      <!-- 1. Background Conduits, Terminal Ports & Animated Energy Streams -->
      <svg class="flow-svg" viewBox="0 0 500 ${N}" preserveAspectRatio="xMidYMid meet">
        <!-- Static dual-layer conduits with terminal port sockets -->
        ${M.conduits.map(e=>q`
            <g class="conduit-group">
              <path class="pipe-track-outer" d="${e.d}" />
              <path class="pipe-track" d="${e.d}" />
              <circle class="pipe-port" cx="${e.x1}" cy="${e.y1}" r="3" />
              <circle class="pipe-port" cx="${e.x2}" cy="${e.y2}" r="3" />
            </g>
          `)}

        <!-- Active animated energy streams + moving glowing particles with dynamic power intensity -->
        ${I.map(e=>{const t=function(e,t=4200,i=.75,r=5,a=!0){const n=Math.abs(e);if(n<5)return 0;const o=Math.min(n,t);let s;s=a?Math.log10(o+1)/Math.log10(t+1):o/t;const l=r-s*(r-i);return Math.max(i,Math.min(r,Number(l.toFixed(2))))}(e.watts,$,C,S,k),i=function(e,t=4200){const i=Math.min(Math.abs(e)/t,1);return Number((2.8+2.7*i).toFixed(1))}(e.watts,$),r=e.reversed?function(e){const t=e.match(/M\s*([\d.]+)\s+([\d.]+)\s+L\s*([\d.]+)\s+([\d.]+)/i);return t?`M ${t[3]} ${t[4]} L ${t[1]} ${t[2]}`:e}(e.d):e.d,a=Math.min(1,Math.max(.12,Math.abs(e.watts)/$)),n=Number((.18+.58*a).toFixed(2)),o=Number((1.5+3.5*a).toFixed(1)),s=Number((i+2+4.5*a).toFixed(1)),l=Number((i+1.5+3.2*a).toFixed(1)),c=Number((2+1.4*a).toFixed(1));return q`
            <g class="active-flow-group" style="color: ${e.color};">
              <path
                class="flow-glow-line"
                d="${r}"
                stroke="${e.color}"
                stroke-width="${s}"
                style="opacity: ${n}; filter: blur(${o}px);"
              />
              <path
                id="${e.id}"
                class="flow-line"
                d="${r}"
                stroke="${e.color}"
                stroke-width="${i}"
                style="--flow-duration: ${t}s; opacity: ${Number((.78+.22*a).toFixed(2))};"
              />
              <circle
                class="flow-orb-halo"
                r="${l}"
                fill="${e.color}"
                style="opacity: ${Number((.28+.42*a).toFixed(2))};"
              >
                <animateMotion dur="${t}s" repeatCount="indefinite" path="${r}" />
              </circle>
              <circle
                class="flow-orb-core"
                r="${c}"
                fill="#ffffff"
                style="filter: drop-shadow(0 0 ${Number((3+4*a).toFixed(1))}px currentColor);"
              >
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
                style="left: ${A.x/500*100}%; top: ${A.y/N*100}%;"
                @click=${()=>x(i.entities?.solar_power)}
                title="${Ne("nodes.solar",t,w)}"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <div class="node-meta">
                  <span class="node-value">${Ee(s)}</span>
                  <span class="node-label">${Ne("nodes.solar",t,w)}</span>
                </div>
              </div>
            `:""}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${P.x/500*100}%; top: ${P.y/N*100}%;"
          @click=${()=>x(i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.entities?.battery_power)}
          title="${Ne("nodes.battery",t,w)}"
        >
          <div class="node-badge">
            <svg class="battery-gauge-svg" viewBox="0 0 80 80">
              <circle class="battery-gauge-bg" cx="40" cy="40" r="${33}" />
              <circle
                class="battery-gauge-fill"
                cx="40"
                cy="40"
                r="${33}"
                stroke="${F}"
                stroke-dasharray="${V}"
                stroke-dashoffset="${L}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${O?l>=5?"mdi:battery-charging":T>80?"mdi:battery-high":T>30?"mdi:battery-medium":"mdi:battery-low":"mdi:battery-unknown"}"
                style="color: ${F};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${F};">
                ${O?`${T}%`:"—"}
              </span>
            </div>
          </div>
          <div class="node-meta">
            <span class="node-value" style="color: ${F};">
              ${Ee(Math.abs(l))}
            </span>
            <span class="node-label">
              ${b?`${R} • ${b}`:R}
            </span>
            ${W?U`<span class="node-sub">${W}</span>`:""}
          </div>
        </div>

        <!-- CENTRAL INVERTER HUB (Self-contained Glassmorphic Core — Zero Wire Overlap) -->
        <div
          class="flow-node node-inverter"
          style="left: ${E.x/500*100}%; top: ${E.y/N*100}%; --hub-accent: ${Z};"
          @click=${()=>x(i.self_consumption_power_entity||i.operating_mode_entity)}
          title="${Ne("nodes.inverter",t,w)}"
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
            <span class="hub-mode-title">${K}</span>
            <span class="hub-sub-pill ${j?"active-self":""}">${G}</span>
          </div>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${B.x/500*100}%; top: ${B.y/N*100}%;"
          @click=${()=>x(i.entities?.load_power)}
          title="${Ne("nodes.home",t,w)}"
        >
          <div class="node-badge">
            <svg class="home-gauge-svg" viewBox="0 0 72 72">
              <circle class="home-gauge-bg" cx="36" cy="36" r="${31}" />
              ${Q>0?q`
                    <circle
                      class="home-gauge-fill"
                      cx="36"
                      cy="36"
                      r="${31}"
                      stroke="var(--home-color, #06b6d4)"
                      stroke-dasharray="${X}"
                      stroke-dashoffset="${ee}"
                    />
                  `:""}
            </svg>
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <div class="node-meta">
            <span class="node-value">${Ee(d)}</span>
            <span class="node-label">${Ne("nodes.home",t,w)}</span>
            <span class="node-sub">${te}</span>
          </div>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${z.x/500*100}%; top: ${z.y/N*100}%;"
          @click=${()=>x(i.grid_breaker_power_entity||i.grid_breaker_switch_entity||i.entities?.grid_power)}
          title="${Ne("nodes.grid",t,w)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
            <span
              class="grid-status-dot"
              style="background: ${ae}; box-shadow: 0 0 6px ${ae};"
            ></span>
          </div>
          <div class="node-meta">
            <span class="node-value">${Ee(Math.abs(c))}</span>
            <span class="node-label">
              ${Ne(c>=5?"flow.import":c<=-5?"flow.export":"nodes.grid",t,w)}
            </span>
            ${re?U`<span class="node-sub">${re}</span>`:""}
          </div>
        </div>
      </div>
    </div>
  `}function ze(e,t,i=1,r="spark"){if(!e||e.length<2)return U`<div class="sparkline-placeholder"></div>`;const a=Math.min(...e),n=Math.max(...e);let o=a,s=n;if(n-a<i){const e=(a+n)/2;o=e-i/2,s=e+i/2}const l=s-o||1,c=e.map((t,i)=>{const r=i/(e.length-1)*110,a=23-(Math.max(o,Math.min(s,t))-o)/l*20;return{x:Number(r.toFixed(1)),y:Number(a.toFixed(1))}}),d=c.map(e=>`${e.x},${e.y}`).join(" "),p=`spark-grad-${r}`;return q`
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
  `}function Ie(e){const{hass:t,config:i,hasSolar:r=!1,systemVoltage:a=24,batteryVoltage:n,batteryCurrent:o,gridVoltage:s,batterySoc:l,gridImportEnergyToday:c,loadEnergyToday:d,batteryDischargeEnergyToday:p,inverterLoadPercent:g,historyMap:u,onParamClick:h}=e,_=i.language,m=Ne("common.na",t,_),{color:b,sparklineRange:y}=function(e,t){const i=t/24,r=Number((1.5*i).toFixed(1));return null===e||isNaN(e)?{color:"#64748b",sparklineRange:r}:e<(48===t?47:24*i)||e>29.2*i?{color:"#ef4444",sparklineRange:r}:e<(48===t?49.5:25.6*i)?{color:"#f59e0b",sparklineRange:r}:{color:"#10b981",sparklineRange:r}}(n,a),{color:f,label:v,sparklineRange:x}=function(e,t,i){return null===e||isNaN(e)?{color:"#64748b",label:Ne("params.offline",t,i),sparklineRange:20}:e<50?{color:"#ef4444",label:Ne("params.sag",t,i),sparklineRange:20}:e>=85&&e<=150?e<98||e>138?{color:"#ef4444",label:Ne(e<98?"params.sag":"params.surge",t,i),sparklineRange:12}:e<108||e>132?{color:"#f59e0b",label:Ne("params.deviated",t,i),sparklineRange:12}:{color:"#4285f4",label:Ne("params.normal",t,i),sparklineRange:12}:e<190||e>255?{color:"#ef4444",label:Ne(e<190?"params.sag":"params.surge",t,i),sparklineRange:20}:e<208||e>246?{color:"#f59e0b",label:Ne("params.deviated",t,i),sparklineRange:20}:{color:"#4285f4",label:Ne("params.normal",t,i),sparklineRange:20}}(s,t,_),w=i.kpi_mode&&"auto"!==i.kpi_mode?i.kpi_mode:r?"self_sufficiency":"battery_soc";let $=Ne("params.battery_soc",t,_),k=$,C="mdi:battery-heart-variant",S=0,M="#10b981",N=i.kpi_entity||i.bms?.soc_entity||i.bms?.battery_1?.soc_entity||i.bms?.bat1_soc_entity||i.battery_voltage_entity;if("battery_soc"===w)$=Ne("params.battery_soc",t,_),k=$,C=o&&o>.5?"mdi:battery-charging-high":"mdi:battery-heart-variant",S=null==l||isNaN(l)?0:Math.max(0,Math.min(100,Math.round(l))),M=S>=75?"#10b981":S>=30?"#f59e0b":"#ef4444";else if("battery_autonomy"===w)$=Ne("params.battery_autonomy",t,_),k=$,C="mdi:shield-battery-outline",N=i.kpi_entity||i.daily_energy?.battery_discharge_entity||i.daily_energy?.load_energy_entity,S=0,null!==d&&d>0&&null!=p&&(S=Math.max(0,Math.min(100,Math.round(Math.max(0,p)/d*100)))),M=S>=75?"#10b981":S>=30?"#f59e0b":"#ef4444";else if("inverter_load"===w)$=Ne("params.inverter_load",t,_),k=$,C="mdi:gauge",N=i.kpi_entity||i.inverter_load_percent_entity||i.entities?.load_power,S=null==g||isNaN(g)?0:Math.max(0,Math.min(100,Math.round(g))),M=S<60?"#10b981":S<85?"#f59e0b":"#ef4444";else{if($=Ne("params.self_sufficiency",t,_),k=$,C=r?"mdi:shield-sun":"mdi:shield-battery-outline",N=i.kpi_entity||i.daily_energy?.grid_import_entity,S=100,null!==d&&d>0){const e=null!==c?Math.max(0,c):0;S=Math.max(0,Math.min(100,Math.round(100*(1-e/d))))}M=S>=75?"#10b981":S>=40?"#f59e0b":"#ef4444"}const A=u.get("battery_voltage")||[],E=u.get("grid_voltage")||[];return U`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(i.battery_voltage_entity||i.bms?.voltage_entity||i.bms?.bat1_voltage_entity)}
        title="${Ne("params.battery",t,_)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">${Ne("params.battery",t,_)}</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${b}">
            ${null===n||isNaN(n)?m:`${n.toFixed(1)}V`}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${o&&o>0?"#10b981":"#f59e0b"}">
            ${null===o||isNaN(o)?m:`${o>0?"+":""}${o.toFixed(1)}A`}
          </span>
        </div>
        <div class="param-chart-box">
          ${ze(A,b,y,"bat")}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(i.grid_voltage_entity)}
        title="${Ne("params.grid",t,_)}"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">${Ne("params.grid",t,_)}</span>
          <span class="param-badge" style="background: ${f}22; color: ${f}">
            ${v}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${f}">
            ${null===s||isNaN(s)?m:`${Math.round(s)}V`}
          </span>
        </div>
        <div class="param-chart-box">
          ${ze(E,f,x,"grid")}
        </div>
      </div>

      <!-- TILE 3: KPI (BATTERY SOC / SELF-SUFFICIENCY / AUTONOMY / LOAD) -->
      <div
        class="param-tile"
        @click=${()=>h(N)}
        title="${k}"
      >
        <div class="param-header">
          <ha-icon icon="${C}"></ha-icon>
          <span class="param-title">${$}</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${M}">
            ${S}%
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
  `}(S,M)}
          </div>
        </div>
      </div>
    </div>
  `}function Oe(e){const t=e.voltage??0;if(t>=40)return 48;if(t>=30)return 36;if(t>=19)return 24;if(t>=8)return 12;const i=e.cells.length;return i>=13?48:i>=10?36:i>=6?24:12}function Te(e){const{hass:t,language:i,bmsConfig:r,soc:a,soh:n=null,voltage:o=null,current:s=null,temperature:l,cellDelta:c,cycleCount:d,remainingCapacity:p,fullCapacity:g,cells:u,onBmsClick:h,isDual:_=!1,battery1:m,battery2:b,packs:y}=e;let f=[];f=y&&y.length>0?y:_&&m&&b?[m,b]:[{name:r.bank_name||Ne("bms.single_badge",t,i),soc:a,voltage:o,current:s,temperature:l,cycleCount:d,remainingCapacity:p,voltageEntity:r.voltage_entity,socEntity:r.soc_entity,temperatureEntity:r.temperature_entity,cells:u}];const v=f.length>1,x=f.flatMap(e=>e.cells),w=x.map(e=>e.voltage).filter(e=>e>0),$=w.length>0?Math.min(...w):0,k=w.length>0?Math.max(...w):0,C=w.length>0?w.reduce((e,t)=>e+t,0)/w.length:0,S=r.chemistry||"auto";let M=3,N=3.6;"li_ion"===S||"auto"===S&&C>3.68?(M=3.1,N=4.2):("lto"===S||"auto"===S&&C>0&&C<2.85)&&(M=1.9,N=2.75);const A=N-M;let E="single";if(v)if(r.topology&&"auto"!==r.topology)E=r.topology;else{const e=f.map(e=>e.voltage??0).filter(e=>e>0);if(e.length>=2&&null!==o&&o>0){const t=e.reduce((e,t)=>e+t,0),i=t/e.length;E=Math.abs(o-t)<=Math.abs(o-i)?"series":"parallel"}else{E=Oe(f[0])<=12?"series":"parallel"}}const P=function(e,t,i){if(e.bank_name&&""!==e.bank_name.trim())return e.bank_name.trim();const r=JSON.stringify(e).toLowerCase();return r.includes("redodo")?"BMS Redodo":r.includes("growatt")?"Growatt BMS":r.includes("jikong")||r.includes("jk_bms")?"JK BMS":r.includes("daly")?"Daly BMS":r.includes("pylon")?"Pylontech BMS":r.includes("seplos")?"Seplos BMS":r.includes("pace")?"Pace BMS":r.includes("jbd")?"JBD BMS":r.includes("deye")?"Deye BMS":r.includes("felicity")?"Felicity BMS":Ne("bms.title",t,i)}(r,t,i),B=Oe(f[0]),z=x.length>0?x.length:Math.round(B/3)*(v&&"series"===E?f.length:1);let I="",O="";if(v)if("series"===E){const e=f.reduce((e,t)=>e+Oe(t),0);I=`${f.length}× ${B}V → ${e}V (${z}S)`,O=`${f.length}S • ${Ne("bms.series_badge",t,i)}`}else I=x.length>0?`${f.length}× ${B}V ∥ (${x.length} Cells)`:`${f.length}× ${B}V ∥`,O=`${f.length}P • ${Ne("bms.parallel_badge",t,i)}`;else I=`${B}V (${z}S)`,O=`${z}S • ${B}V`;const T=f.map(e=>e.voltage??0).filter(e=>e>0),V=T.length>1?Math.round(1e3*(Math.max(...T)-Math.min(...T))):null;let L="#10b981",F=Ne("bms.balanced",t,i);null===V?(L="#64748b",F=Ne("bms.offline",t,i)):V>200?(L="#ef4444",F=Ne("bms.imbalance",t,i)):V>80&&(L="#f59e0b",F=Ne("bms.drift",t,i));const R=null===c||isNaN(c)?w.length>1?Math.round(1e3*(k-$)):null:Math.round(c<1?1e3*c:c),D=null===R?"#64748b":R>50?"#ef4444":R>25?"#f59e0b":"#10b981",W=v&&null!==V&&V>150&&T.length>=2?Ne("bms.pack_drift_warn",t,i).replace("{delta}",String(V)).replace("{v1}",Math.min(...T).toFixed(2)).replace("{v2}",Math.max(...T).toFixed(2)):"",H=e=>{const a=Math.min(Math.max(e.length,4),8);return U`
      <div
        class="cells-grid"
        style="--cell-cols: ${a};"
        role="group"
        aria-label="Battery Cell Voltages"
      >
        ${e.map(e=>{const a=e.voltage>0,n=a&&e.voltage===$&&w.length>1&&$!==k,o=a&&e.voltage===k&&w.length>1&&$!==k;let s=8;if(a){const t=Math.max(0,Math.min(1,(e.voltage-M)/A)),i=k-$,r=.72*t+.28*(i>.002?(e.voltage-$)/i:.5);s=Math.max(18,Math.min(98,Math.round(100*r)))}const l=a?o?"cell-max":n?"cell-min":"cell-nom":"cell-offline",c=o?"▲":n?"▼":"",d="per_pack"===r.cell_numbering&&e.packCellIndex?e.packCellIndex:e.index,p=[`Cell #${d}: ${a?`${e.voltage.toFixed(3)} V`:"Offline"}${o?" (MAX)":n?" (MIN)":""}`];return null!==e.resistance&&void 0!==e.resistance&&e.resistance>0&&p.push(`IR: ${e.resistance.toFixed(2)} mΩ`),e.isBalancing&&p.push(`⚡ ${Ne("bms.balancing",t,i)||"Active Balancing"}`),U`
            <div
              class="cell-col ${l} ${e.isBalancing?"is-balancing":""}"
              @click=${()=>h(e.rawEntityId)}
              title="${p.join(" • ")}"
            >
              <div class="cell-top-indicator">
                ${e.isBalancing?U`<span class="cell-balance-tag" title="Active Balancing">⚡</span>`:""}
              </div>
              <div class="cell-cap ${e.isBalancing?"cap-balancing":""}"></div>
              <div class="cell-bar-track">
                <div class="cell-bar-fill" style="height: ${s}%;"></div>
              </div>
              <span class="cell-voltage">${function(e){return e<=0?"—":Math.round(1e3*e)%10!=0?`${e.toFixed(3)}V`:`${e.toFixed(2)}V`}(e.voltage)}</span>
              <span class="cell-id">
                #${d}${c?U`<span class="cell-tag">${c}</span>`:""}
              </span>
              ${null!==e.resistance&&void 0!==e.resistance&&e.resistance>0?U`<span class="cell-ir-text">${e.resistance<10?e.resistance.toFixed(1):Math.round(e.resistance)}mΩ</span>`:""}
            </div>
          `})}
      </div>
    `};return U`
    <div class="bms-card-section universal-bms-section">
      <!-- 1. Universal BMS Bank Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="${v?"mdi:battery-sync":"mdi:battery-heart-variant"}"></ha-icon>
          <span class="bms-brand-text">${P}: ${I}</span>
          <span class="bms-topology-badge">${O}</span>
        </div>

        <div class="bms-header-status">
          ${v?U`
                <span
                  class="bms-delta-pill"
                  style="--delta-color: ${L}"
                  title="${F}"
                >
                  <ha-icon icon="mdi:scale-balance"></ha-icon>
                  <span>
                    ${Ne("bms.delta_packs",t,i)}:
                    ${null!==V?`${V} mV`:"—"}
                  </span>
                </span>
              `:""}

          ${x.length>0||null!==R?U`
                <span
                  class="bms-delta-pill cell-delta-pill"
                  style="--delta-color: ${D}"
                  @click=${()=>h(r.cell_delta_entity)}
                  title="${w.length>0?`Min: ${$.toFixed(3)}V • Max: ${k.toFixed(3)}V • Avg: ${C.toFixed(3)}V`:""}"
                >
                  <ha-icon icon="mdi:vector-difference"></ha-icon>
                  <span>
                    ${Ne("bms.delta_cells",t,i)}:
                    ${null!==R?`${R} mV`:"—"}
                  </span>
                </span>
              `:""}
        </div>
      </div>

      <!-- 2. Warning Banner if Pack Voltage Drift is High -->
      ${W?U`
            <div class="series-drift-alert">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>${W}</span>
            </div>
          `:""}

      <!-- 3. Universal Responsive Packs Grid (1, 2, 3, 4+ Packs) -->
      <div class="bms-packs-grid ${v?"multi-pack":"single-pack"}">
        ${f.map((e,t)=>{const i=null===e.soc||isNaN(e.soc)?null:Math.max(0,Math.min(100,Math.round(e.soc))),a=null===i?"#64748b":i>50?"#10b981":i>20?"#f59e0b":"#ef4444",n=e.voltageEntity||e.socEntity||(0===t?r.bat1_voltage_entity||r.battery_1?.voltage_entity||r.voltage_entity:1===t?r.bat2_voltage_entity||r.battery_2?.voltage_entity:void 0);return U`
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

              <!-- Prismatic Cell Equalizer Columns (Rendered when per-cell sensors exist) -->
              ${e.cells.length>0?H(e.cells):""}
            </div>
          `})}
      </div>

      <!-- 4. Summary Footer (Min/Avg/Max Cell Voltages + Cycles & Remaining Capacity & SOH) -->
      ${w.length>0||null!==d||null!==p||null!==n?U`
            <div class="bms-footer-stats">
              ${w.length>1?U`
                    <div class="bms-footer-cells-summary">
                      <span class="cell-stat-chip min-chip">
                        ${Ne("bms.min_cell",t,i)}: <strong>${$.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip avg-chip">
                        ${Ne("bms.avg_cell",t,i)}: <strong>${C.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip max-chip">
                        ${Ne("bms.max_cell",t,i)}: <strong>${k.toFixed(3)}V</strong>
                      </span>
                    </div>
                  `:U`<div></div>`}

              <div class="bms-footer-right">
                ${null===n||isNaN(n)?"":U`
                      <div class="bms-footer-item" @click=${()=>h(r.soh_entity)}>
                        <ha-icon icon="mdi:heart-pulse" style="color: #ec4899;"></ha-icon>
                        <span>${Ne("bms.soh",t,i)||"SOH"}: <strong>${Math.round(n)}%</strong></span>
                      </div>
                    `}
                ${null===d||isNaN(d)?"":U`
                      <div class="bms-footer-item" @click=${()=>h(r.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>${Ne("bms.cycles",t,i)}: <strong>${d}</strong></span>
                      </div>
                    `}
                ${null===p||isNaN(p)?"":U`
                      <div class="bms-footer-item" @click=${()=>h(r.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>
                          ${Ne("bms.remaining",t,i)}:
                          <strong>${p.toFixed(1)}${g?`/${Math.round(g)}`:""} Ah</strong>
                        </span>
                      </div>
                    `}
              </div>
            </div>
          `:""}
    </div>
  `}function Ve(e){const t=e.trim(),i=t.match(/^(.+?)\s*\(([A-Za-z0-9_-]{2,8})\)$/);if(i){const t=i[1].trim().replace(/\band\b/gi,"&");return{raw:e,code:i[2].trim(),subtitle:t}}const r=t.match(/^([A-Za-z0-9_-]{2,6})\s*\((.+?)\)$/);if(r)return{raw:e,code:r[1].trim(),subtitle:r[2].trim().replace(/\band\b/gi,"&")};const a=t.match(/^(?:\d+[_:\s-]+)?([A-Z]{2,5})\s*[-:]\s*(.+)$/);return a?{raw:e,code:a[1].trim(),subtitle:a[2].trim()}:{raw:e,code:t,subtitle:""}}function Le(e){return e.split(".")[0]||""}function Fe(e,t,i){if(i)return i;const r=e?.states[t]?.attributes?.friendly_name;return r||t}function Re(e){const{hass:t,language:i,dailyConfig:r,solarEnergy:a,loadEnergy:n,gridImportEnergy:o,gridExportEnergy:s,batteryChargeEnergy:l,batteryDischargeEnergy:c,selfConsumptionDailyEnergy:d,selfConsumptionDailyEntity:p,selfConsumptionMonthlyEnergy:g,selfConsumptionMonthlyEntity:u,onEnergyClick:h}=e,_=null==a||isNaN(a)?null:Math.max(0,a),m=null===n||isNaN(n)?0:Math.max(0,n),b=null===o||isNaN(o)?0:Math.max(0,o),y=null==s||isNaN(s)?null:Math.max(0,s),f=null===l||isNaN(l)?0:Math.max(0,l),v=null===c||isNaN(c)?0:Math.max(0,c),x=null==d||isNaN(d)?null:Math.max(0,d),w=null==g||isNaN(g)?null:Math.max(0,g),$=Math.max(_??0,m,b,y??0,f,v,x??0,.1),k=[];return null!==_&&r.solar_energy_entity&&k.push({id:r.solar_energy_entity,label:Ne("energy.solar_production",t,i),value:_,color:"#f59e0b",icon:"mdi:solar-power",pct:m>0?Math.round(_/m*100):0}),(r.load_energy_entity||null!==n)&&k.push({id:r.load_energy_entity,label:Ne("energy.load",t,i),value:m,color:"#e2e8f0",icon:"mdi:home-lightning-bolt",pct:m>0?100:0}),(r.grid_import_entity||null!==o)&&k.push({id:r.grid_import_entity,label:Ne("energy.grid_import",t,i),value:b,color:"#4285f4",icon:"mdi:transmission-tower",pct:m>0?Math.round(b/m*100):0}),null!==y&&r.grid_export_entity&&k.push({id:r.grid_export_entity,label:Ne("energy.grid_export",t,i),value:y,color:"#2ecc71",icon:"mdi:transmission-tower-export",pct:_&&_>0?Math.round(y/_*100):0}),(r.battery_charge_entity||null!==l)&&k.push({id:r.battery_charge_entity,label:Ne("energy.bat_charge",t,i),value:f,color:"#10b981",icon:"mdi:battery-plus-variant",pct:m>0?Math.round(f/m*100):0}),(r.battery_discharge_entity||null!==c)&&k.push({id:r.battery_discharge_entity,label:Ne("energy.bat_discharge",t,i),value:v,color:"#f59e0b",icon:"mdi:battery-minus-variant",pct:m>0?Math.round(v/m*100):0}),null!==x&&k.push({id:p||r.self_consumption_daily_entity,label:Ne("energy.self_consumption",t,i),value:x,color:"#a855f7",icon:"mdi:flash-outline",pct:0,extraTag:null!==w?`${Ne("energy.month_short",t,i)}: ${w.toFixed(1)} kWh`:void 0}),U`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>${Ne("energy.title",t,i)}</span>
        </div>
        <div class="energy-header-pills">
          ${null!==w?U`
                <span
                  class="energy-total-pill"
                  style="color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); cursor: pointer;"
                  @click=${()=>h(u||r.self_consumption_monthly_entity)}
                  title="${Ne("energy.self_consumption",t,i)} (${Ne("energy.month_short",t,i)})"
                >
                  ${Ne("flow.self",t,i)} ${Ne("energy.month_short",t,i)}: ${w.toFixed(2)} kWh
                </span>
              `:""}
          <span class="energy-total-pill">
            ${Ne("energy.total",t,i)}: ${function(e,t=1){return null==e||isNaN(e)?"0.0 kWh":`${e.toFixed(t)} kWh`}(m)}
          </span>
        </div>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${k.map(e=>{const t=Math.max(3,Math.min(100,Math.round(e.value/$*100)));return U`
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
  `}const De={0:{code:0,title:"Normal",description:"Inverter is operating normally. No faults detected.",recommendation:"System is functioning properly.",severity:"info"},1:{code:1,title:"Fan Locked",description:"Cooling fan is locked or stopped by an obstruction.",recommendation:"Inspect cooling vents, remove dust or foreign objects from fans.",severity:"critical"},2:{code:2,title:"Inverter Over-Temperature",description:"Internal heatsink temperature exceeded the safe operating limit (>100°C).",recommendation:"Ensure adequate ventilation, reduce inverter load and allow it to cool down.",severity:"critical"},3:{code:3,title:"Battery Over-Voltage",description:"Battery terminal voltage exceeded the maximum safety threshold.",recommendation:"Verify Bulk/Float charging voltage settings and BMS parameters.",severity:"critical"},4:{code:4,title:"Battery Under-Voltage (Critical Discharge)",description:"Battery voltage dropped below the critical cut-off protection threshold.",recommendation:"Connect AC grid power to charge the battery or shed heavy loads.",severity:"warning"},5:{code:5,title:"Output Short Circuit",description:"Short circuit or extreme over-current detected on the AC output circuit.",recommendation:"Immediately disconnect AC load breakers and resolve short circuits in wiring or appliances.",severity:"critical"},6:{code:6,title:"Output Voltage Too High",description:"Inverter AC output voltage exceeded the safe operating range (>260V).",recommendation:"Disconnect sensitive appliances, restart inverter. If error persists, service is required.",severity:"critical"},7:{code:7,title:"Overload Time-Out",description:"Connected load exceeded rated inverter power longer than allowed duration.",recommendation:"Disconnect high-power loads (heaters, water heaters, kettles).",severity:"warning"},8:{code:8,title:"DC Bus Over-Voltage",description:"Internal DC bus voltage exceeded the maximum safety limit.",recommendation:"Restart inverter. If issue persists, check solar panel array Voc specifications.",severity:"critical"},9:{code:9,title:"DC Bus Soft-Start Failed",description:"High-voltage DC bus pre-charge circuit failed during startup.",recommendation:"Check battery and PV input voltages, then restart the inverter.",severity:"critical"},10:{code:10,title:"PV Over-Current",description:"Solar array input current exceeded MPPT controller maximum rating.",recommendation:"Verify solar string configuration and parallel panel wiring.",severity:"critical"},11:{code:11,title:"PV Over-Voltage",description:"Solar panel open-circuit voltage (Voc) exceeded the maximum MPPT limit.",recommendation:"Immediately disconnect solar input, reduce number of panels in series.",severity:"critical"},12:{code:12,title:"DC-DC Converter Over-Current",description:"Over-current detected in the battery DC-DC converter stage.",recommendation:"Check battery cable integrity, terminal torque, and eliminate surge loads.",severity:"critical"},13:{code:13,title:"Inverter Current Surge",description:"Hardware protection triggered due to sudden current spike or inrush surge.",recommendation:"Avoid simultaneous starting of heavy inductive loads (motors, pumps, compressors).",severity:"critical"},14:{code:14,title:"DC Bus Under-Voltage",description:"DC bus voltage dropped below minimum required operating level.",recommendation:"Check battery health under load and AC grid input stability.",severity:"warning"},51:{code:51,title:"Inverter Over-Current",description:"Hardware over-current protection triggered on power bridge transistors (IGBT/MOSFET).",recommendation:"Disconnect devices with high inrush currents, power cycle the inverter.",severity:"critical"},52:{code:52,title:"DC Bus Voltage Low",description:"DC bus voltage dropped sharply below 230V generation threshold.",recommendation:"Inspect battery condition, terminal connections, and cable lugs.",severity:"warning"},53:{code:53,title:"Inverter Soft-Start Failed",description:"Failed to establish smooth AC output waveform during startup.",recommendation:"Disconnect all AC output loads before powering on the inverter.",severity:"critical"},55:{code:55,title:"DC Voltage on AC Output",description:"Dangerous DC voltage component detected on the 230V AC output.",recommendation:"Hazardous to transformers and motors! Immediately disconnect loads and contact service.",severity:"critical"},56:{code:56,title:"Battery Connection Open",description:"Inverter did not detect a connected battery during operation.",recommendation:"Check battery breaker, DC fuse, and terminal connections.",severity:"critical"},57:{code:57,title:"Current Sensor Failed",description:"Internal current measurement sensor (Hall sensor) communication or calibration failure.",recommendation:"Restart the inverter. If error persists, main control board repair is needed.",severity:"critical"},58:{code:58,title:"Output Voltage Too Low",description:"Inverter cannot maintain 230V AC output (voltage dropped below 190V) due to overload.",recommendation:"Reduce load on the inverter.",severity:"warning"},59:{code:59,title:"Control Board Communication Error",description:"Internal communication loss between control board and power module.",recommendation:"Restart the inverter. If error persists, inspect internal ribbon cables.",severity:"critical"},60:{code:60,title:"Grid Feedback / Sync Error",description:"Reverse power flow detected or grid synchronization failed during bypass switch.",recommendation:"Verify AC grid input parameters and phase polarity.",severity:"warning"},71:{code:71,title:"Firmware / BMS Incompatibility",description:"Firmware version mismatch or lost communication with lithium battery BMS.",recommendation:"Check BMS communication cable and selected battery protocol settings.",severity:"critical"},72:{code:72,title:"BMS Critical Error",description:"Battery Management System triggered an emergency protection signal.",recommendation:"Check battery health and error logs in the BMS app.",severity:"critical"},80:{code:80,title:"Parallel CAN Bus Fault",description:"Lost communication over CAN bus between parallel inverters.",recommendation:"Check parallel communication cables and bus termination resistors.",severity:"critical"},81:{code:81,title:"Host Loss in Parallel System",description:"Follower inverter lost communication with Master unit.",recommendation:"Check power and state of the Master inverter and cable connections.",severity:"critical"},82:{code:82,title:"AC Phase Sync Loss",description:"Parallel inverters failed to synchronize AC output phases.",recommendation:"Ensure simultaneous AC grid connection to all parallel units.",severity:"critical"}},We={0:{title:"No Warnings",description:"System operating normally without warnings."},1:{title:"Off-Grid / Battery Mode",description:"Inverter operating in autonomous battery mode (grid outage)."},2:{title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching."},4:{title:"Low Battery Voltage",description:"Battery voltage below warning threshold (recharge recommended)."},7:{title:"Overload Warning",description:"Home consumption approaching rated inverter limit (4.2 kW)."},8:{title:"Mains Low Voltage",description:"Utility AC grid voltage is 0V or below acceptable threshold (grid outage)."},10:{title:"Output Power Derating",description:"Inverter automatically derating power to prevent overheating."},14:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},15:{title:"PV Energy Weak",description:"Solar voltage below MPPT operating threshold (panels not connected or night).",isPvRelated:!0},16:{title:"Mains Over Frequency",description:"Utility AC grid frequency out of acceptable range."},19:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},20:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured threshold."},32:{title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below acceptable range."},64:{title:"PV Low Voltage",description:"Solar array voltage below MPPT operating threshold (panels not connected or overcast).",isPvRelated:!0},128:{title:"Inverter Over-Temperature",description:"Internal heatsink temperature is too high."},256:{title:"Battery Low Voltage",description:"Battery voltage has dropped below warning threshold (recharge needed)."},512:{title:"Battery Not Connected",description:"Battery circuit is open or battery is not detected."},1024:{title:"Overload Warning",description:"Home consumption is approaching or exceeding rated inverter limit (4.2 kW)."},2048:{title:"Battery Equalization Active",description:"Battery equalization charging cycle is currently active."},4096:{title:"Battery Discharged Below Recovery",description:"Battery voltage discharged below recovery threshold."},8192:{title:"Output Power Derating",description:"Inverter automatically derating output power due to thermal or voltage limits."},16384:{title:"Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},32768:{title:"PV Energy Too Low",description:"Solar input power is too weak for MPPT conversion.",isPvRelated:!0},524288:{title:"Lithium Battery Comm Abnormal",description:"Lost RS485/CAN telemetry communication with lithium battery BMS."},1048576:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded configured safety threshold."}},He=[{bit:0,mask:1,code:0,title:"Off-Grid Mode",description:"Inverter operating in autonomous battery mode (grid outage).",isInformational:!0},{bit:1,mask:2,code:1,title:"Mains Waveform Abnormal",description:"Utility AC grid waveform distorted during outage or switching.",isInformational:!0},{bit:2,mask:4,code:2,title:"Vendor Status Bit 2",description:"Vendor-specific operational status bit 2.",isInformational:!0},{bit:3,mask:8,code:3,title:"Mains Low Voltage",description:"Utility AC grid voltage is low or 0V (grid outage).",isInformational:!0},{bit:4,mask:16,code:4,title:"Mains Over Frequency",description:"Utility AC grid frequency exceeded upper bound.",isInformational:!0},{bit:5,mask:32,code:5,title:"Mains Low Frequency",description:"Utility AC grid frequency dropped below lower bound.",isInformational:!0},{bit:6,mask:64,code:6,title:"PV Low Voltage",description:"Solar array voltage below MPPT startup range (panels not connected or night).",isPvRelated:!0},{bit:7,mask:128,code:7,title:"W02: Over Temperature",description:"Internal inverter heatsink temperature is elevated."},{bit:8,mask:256,code:8,title:"W04: Battery Low Voltage",description:"Battery voltage has dropped below warning threshold."},{bit:9,mask:512,code:9,title:"W09: Battery Not Connected",description:"Battery circuit is open or battery is not detected."},{bit:10,mask:1024,code:10,title:"W07: Overload",description:"Home consumption is approaching rated inverter power (4.2 kW)."},{bit:11,mask:2048,code:11,title:"Battery Equalization Charging",description:"Battery equalization charging cycle is active.",isInformational:!0},{bit:12,mask:4096,code:12,title:"Battery Discharged Below Recovery",description:"Battery discharged below recovery voltage threshold."},{bit:13,mask:8192,code:13,title:"W10: Output Power Derating",description:"Output power derating active due to high temperature."},{bit:14,mask:16384,code:14,title:"W14: Fan Blocked",description:"Cooling fan is blocked or operating at reduced speed."},{bit:15,mask:32768,code:15,title:"W15: PV Energy Too Low",description:"Solar input energy is too low to use.",isPvRelated:!0},{bit:16,mask:65536,code:16,title:"Parallel Comm Interrupted",description:"Parallel communication link interrupted."},{bit:17,mask:1<<17,code:17,title:"Output Mode Mismatch",description:"Single/Parallel output mode mismatch."},{bit:18,mask:1<<18,code:18,title:"Parallel Battery Voltage Diff",description:"Parallel battery voltage difference is too large."},{bit:19,mask:1<<19,code:19,title:"Lithium Battery Comm Abnormal",description:"Lithium battery BMS communication abnormal."},{bit:20,mask:1<<20,code:20,title:"Battery Discharge Over-Current",description:"Battery discharge current exceeds set value."}];const Ue={0:{title:"Автономный режим (От батареи)",description:"Инвертор питает дом от аккумулятора при отсутствии городской сети."},1:{title:"Искажение формы сети",description:"Форма напряжения в городской сети искажена во время аварии или переключения."},2:{title:"Статусный бит 2",description:"Служебный статус инвертора."},3:{title:"Отключение сети (0В)",description:"Напряжение в городской сети 0В или ниже нормы (отключение электричества)."},4:{title:"Высокая частота сети",description:"Частота переменного тока в городской сети превысила норму."},5:{title:"Низкая частота сети",description:"Частота переменного тока в городской сети упала ниже нормы."},6:{title:"Низкое напряжение панелей",description:"Напряжение панелей ниже порога запуска MPPT (пасмурно или ночь)."},7:{title:"W02: Повышенная температура",description:"Температура радиатора охлаждения инвертора повышена."},8:{title:"W04: Низкое напряжение батареи",description:"Напряжение аккумулятора упало до уровня предупреждения."},9:{title:"W09: Батарея не подключена",description:"Цепь аккумулятора разомкнута или батарея не обнаружена."},10:{title:"W07: Перегрузка инвертора",description:"Потребление дома приближается к номинальной мощности инвертора."},11:{title:"Выравнивающий заряд АКБ",description:"Идет цикл выравнивания аккумулятора."},12:{title:"Батарея глубоко разряжена",description:"Батарея разряжена ниже порога автовосстановления."},13:{title:"W10: Ограничение мощности",description:"Инвертор временно снизил мощность из-за нагрева."},14:{title:"W14: Вентилятор заблокирован",description:"Вентилятор охлаждения остановлен или забит пылью."},15:{title:"W15: Слабая энергия солнца",description:"Мощность солнечных панелей недостаточна для MPPT."},16:{title:"Сбой параллельной связи",description:"Нарушена связь между параллельными блоками."},17:{title:"Несовпадение режима выхода",description:"Несовпадение одиночного и параллельного режима."},18:{title:"Разность напряжений батарей",description:"Большая разница напряжений между параллельными АКБ."},19:{title:"Сбой связи с BMS батареи",description:"Потеряна телеметрия RS485/CAN с BMS аккумулятора."},20:{title:"Сверхток разряда АКБ",description:"Ток разряда аккумулятора превысил безопасный предел."}};const qe={0:{title:"Норма",description:"Инвертор работает в штатном режиме. Ошибок не обнаружено.",recommendation:"Система функционирует нормально."},1:{title:"Вентилятор заблокирован",description:"Охлаждающий вентилятор остановлен или заклинен посторонним предметом.",recommendation:"Проверьте решетки охлаждения, очистите вентиляторы от пыли или помех."},2:{title:"Перегрев инвертора",description:"Температура внутреннего радиатора превысила безопасный порог (>100°C).",recommendation:"Обеспечьте приток свежего воздуха, снизьте нагрузку дома и дайте инвертору остыть."},3:{title:"Перенапряжение батареи",description:"Напряжение на клеммах аккумулятора превысило максимальный предел безопасности.",recommendation:"Проверьте настройки напряжения заряда Bulk/Float и параметры BMS."},4:{title:"Критический разряд батареи",description:"Напряжение батареи упало ниже порога защитного отключения.",recommendation:"Включите сетевое питание AC для заряда или отключите мощные электроприборы."},5:{title:"Короткое замыкание на выходе",description:"Обнаружено короткое замыкание или сверхток в выходной цепи 230В дома.",recommendation:"Немедленно отключите автоматы нагрузки и устраните замыкание в проводке или приборах."},6:{title:"Высокое напряжение на выходе",description:"Выходное напряжение AC 230В превысило безопасный диапазон (>260В).",recommendation:"Отключите чувствительную технику, перезапустите инвертор. При повторении требуется сервис."},7:{title:"Перегрузка по времени",description:"Подключенная нагрузка превышала номинальную мощность дольше допустимого времени.",recommendation:"Отключите мощные потребители (бойлер, электроплиту, чайник, обогреватели)."},8:{title:"Высокое напряжение шины DC",description:"Напряжение внутренней высоковольтной шины DC превысило порог безопасности.",recommendation:"Перезапустите инвертор. Если ошибка повторяется, проверьте напряжение Voc солнечных панелей."},9:{title:"Сбой плавного пуска шины",description:"Цепь плавного предзаряда высоковольтной шины DC не смогла выйти на режим.",recommendation:"Проверьте стабильность напряжения АКБ и панелей, затем перезапустите инвертор."},10:{title:"Сверхток солнечных панелей",description:"Входной ток от солнечных панелей превысил допустимый предел контроллера MPPT.",recommendation:"Проверьте схему параллельного соединения солнечных стрингов."},11:{title:"Перенапряжение солнечных панелей",description:"Напряжение холостого хода панелей (Voc) превысило максимальный предел MPPT.",recommendation:"Немедленно отключите солнечный автомат, уменьшите число панелей в последовательной цепочке."},12:{title:"Сверхток преобразователя DC-DC",description:"Обнаружен сверхток в каскаде DC-DC преобразования батареи.",recommendation:"Проверьте надежность затяжки клемм АКБ, целостность кабелей и исключите броски пусковых токов."},13:{title:"Бросок тока инвертора",description:"Сработала аппаратная защита из-за резкого импульса тока или пусковой перегрузки.",recommendation:"Избегайте одновременного пуска мощных индуктивных нагрузок (насосы, компрессоры, моторы)."},14:{title:"Низкое напряжение шины DC",description:"Напряжение шины DC просело ниже минимально допустимого рабочего уровня.",recommendation:"Проверьте просадку напряжения аккумулятора под нагрузкой и стабильность сети."},51:{title:"Сверхток силового моста",description:"Сработала аппаратная защита силовых транзисторов (IGBT/MOSFET) от перегрузки по току.",recommendation:"Отключите приборы с высокими пусковыми токами, перезапустите инвертор по питанию."},52:{title:"Критически низкая шина DC",description:"Напряжение внутренней шины DC резко упало ниже порога генерации 230В.",recommendation:"Проверьте состояние батареи, клеммные соединения и наконечники силовых проводов."},53:{title:"Сбой плавного пуска инвертора",description:"Не удалось сформировать плавную синусоиду 230В на выходе при включении.",recommendation:"Отключите все нагрузки перед включением кнопки питания инвертора."},55:{title:"Постоянный ток на выходе AC",description:"Обнаружена опасная постоянная составляющая напряжения на выходе 230В.",recommendation:"Опасно для трансформаторов и моторов! Немедленно отключите нагрузку и обратитесь в сервис."},56:{title:"Батарея не обнаружена",description:"Инвертор потерял контакт с аккумулятором во время работы.",recommendation:"Проверьте автомат АКБ, плавкий предохранитель и контакт на клеммах батареи."},57:{title:"Отказ датчика тока",description:"Сбой калибровки нуля или потеря сигнала внутреннего датчика тока (датчик Холла).",recommendation:"Перезапустите инвертор. При повторении ошибки требуется диагностика платы управления."},58:{title:"Просадка выходного напряжения",description:"Инвертор не может удержать 230В (напряжение просело ниже 190В) из-за тяжелой перегрузки.",recommendation:"Снизьте нагрузку на инвертор."},59:{title:"Ошибка связи плат управления",description:"Потеряна внутренняя связь между микроконтроллером и силовой платой.",recommendation:"Перезагрузите инвертор. При сохранении ошибки проверьте внутренние шлейфы."},60:{title:"Сбой синхронизации с сетью",description:"Обнаружен обратный переток мощности или сбой синхронизации фазы при переходе на байпас.",recommendation:"Проверьте правильность подключения фазы и нуля (L/N) на входе инвертора."},71:{title:"Несовместимость прошивки / BMS",description:"Несовпадение версии прошивки или потеря связи по протоколу с BMS аккумулятора.",recommendation:"Проверьте кабель связи BMS и выбранный протокол обмена в настройках батареи."},72:{title:"Критическая авария BMS",description:"Система управления батареей (BMS) послала сигнал аварийного отключения.",recommendation:"Проверьте состояние аккумулятора и журнал аварий в приложении BMS."},80:{title:"Сбой шины CAN параллельного режима",description:"Потеряна связь по шине CAN между параллельно соединенными инверторами.",recommendation:"Проверьте кабели связи CAN и согласующие терминальные резисторы."},81:{title:"Потеря ведущего инвертора (Master)",description:"Ведомый инвертор (Slave) потерял связь с ведущим блоком (Master).",recommendation:"Проверьте питание и состояние ведущего инвертора, а также кабели связи."},82:{title:"Рассинхронизация фаз AC",description:"Параллельные инверторы не смогли синхронизировать фазы выходного напряжения.",recommendation:"Убедитесь, что все блоки подключены к одной фазе сетевого входа."}},je={0:{title:"Нет предупреждений",description:"Система работает штатно без предупреждений."},1:{title:"Автономный режим (От батареи)",description:"Инвертор питает дом от аккумулятора (сеть отключена)."},2:{title:"Искажение формы сети",description:"Форма напряжения в городской сети искажена во время аварии или переключения."},4:{title:"Низкий заряд батареи",description:"Напряжение АКБ снизилось до порога предупреждения (рекомендуется заряд)."},7:{title:"Предупреждение: Высокая нагрузка",description:"Потребление дома приближается к предельной мощности инвертора."},8:{title:"Низкое напряжение сети / Авария",description:"Напряжение в сети 0В или ниже нормы (отключение электричества)."},10:{title:"Ограничение мощности (Derating)",description:"Инвертор снижает мощность для предотвращения перегрева."},14:{title:"Вентилятор замедлен",description:"Вентилятор охлаждения заблокирован или работает на пониженных оборотах."},15:{title:"Слабая солнечная генерация",description:"Напряжение панелей ниже рабочего диапазона MPPT (ночь или нет панелей)."},16:{title:"Высокая частота сети",description:"Частота переменного тока в городской сети превысила норму."},19:{title:"Сбой связи с литиевой BMS",description:"Потеряна связь телеметрии RS485/CAN с BMS аккумулятора."},20:{title:"Превышение тока разряда АКБ",description:"Ток разряда аккумулятора превысил настроенный порог."},32:{title:"Низкая частота сети",description:"Частота переменного тока в городской сети упала ниже нормы."},64:{title:"Низкое напряжение солнечных панелей",description:"Напряжение панелей ниже порога запуска MPPT (пасмурно или ночь)."},128:{title:"Повышенная температура инвертора",description:"Температура радиатора охлаждения повышена."},256:{title:"Низкое напряжение батареи",description:"Напряжение батареи упало до уровня предупреждения."},512:{title:"Батарея не подключена",description:"Цепь аккумулятора разомкнута или батарея не обнаружена."},1024:{title:"Высокая нагрузка дома",description:"Потребление дома превышает номинал инвертора."},2048:{title:"Выравнивание батареи активно",description:"Идет цикл выравнивающего заряда батареи."},4096:{title:"Глубокий разряд аккумулятора",description:"Батарея разряжена ниже порога автовосстановления."},8192:{title:"Ограничение мощности по температуре",description:"Инвертор временно ограничивает мощность из-за нагрева."},16384:{title:"Вентилятор заблокирован",description:"Вентилятор охлаждения остановлен или забит пылью."},32768:{title:"Слабая энергия солнца",description:"Мощность солнечных панелей недостаточна для преобразования."},524288:{title:"Сбой связи с BMS",description:"Потеряна связь RS485/CAN с контроллером батареи."},1048576:{title:"Сверхток разряда АКБ",description:"Ток разряда аккумулятора превысил безопасный предел."}};function Ge(e){const{hass:t,language:i,safetyConfig:r,isOffline:a=!1,offlineEntity:n,isFault:o,faultCode:s,faultDetailsText:l,isWarning:c,warningCode:d,warningDetailsText:p,onAlertClick:g}=e;if(!a&&!o&&!c)return U``;const u=s??0,h=function(e,t,i){const r=De[e],a="ru"===i?qe[e]:void 0;if(r){const e=a?.title||r.title,n=a?.description||r.description,o=a?.recommendation||r.recommendation;return t&&t!==r.title&&t!==a?.title&&"N/A"!==t&&"0"!==t?{...r,title:e,description:`${n} (${"ru"===i?"Инвертор":"Inverter"}: ${t})`,recommendation:o}:{...r,title:e,description:n,recommendation:o}}const n="ru"===i;return{code:e,title:t||(n?`Код аварии F${e}`:`Fault Code F${e}`),description:t?n?`Отчет инвертора об аварии: ${t}`:`Inverter reports error: ${t}`:n?"Инвертор обнаружил аппаратный или программный сбой.":"Hardware or firmware fault detected by inverter.",recommendation:n?"Проверьте сообщения на дисплее инвертора и документацию производителя.":"Check inverter LCD display messages and documentation.",severity:"critical"}}(u,l,i),_=d??0,m=function(e,t,i){const r="ru"===i;if(0===e||isNaN(e))return{title:r?"Нет предупреждений":"No Warnings",description:r?"Предупреждения отсутствуют.":"Warnings are absent.",isBitmask:!1,isPv:!1};const a=He.filter(t=>0!==(e&t.mask));if(a.length>1){const e=a.map(e=>r&&Ue[e.code]?.title||e.title).join("; "),i=a.map(e=>`${r&&Ue[e.code]?.title||e.title}: ${r&&Ue[e.code]?.description||e.description}`).join(" | "),n=a.some(e=>e.isPvRelated);return{title:e,description:t?`${i} (Status: ${t})`:i,isBitmask:!0,isPv:n}}if(1===a.length){const e=a[0],i=r&&Ue[e.code]?.title||e.title,n=r&&Ue[e.code]?.description||e.description;return{title:i,description:t&&t!==e.title&&t!==i?`${n} (Status: ${t})`:n,isBitmask:!0,isPv:!!e.isPvRelated}}const n=We[e],o="ru"===i?je[e]:void 0;if(n){const e=o?.title||n.title,i=o?.description||n.description;return{title:e,description:t&&t!==n.title&&t!==o?.title?`${i} (Status: ${t})`:i,isBitmask:!1,isPv:!!n.isPvRelated}}return{title:t||(r?`Предупреждение W${e}`:`Warning W${e}`),description:t?r?`Отчет инвертора: ${t}`:`Inverter reports: ${t}`:r?"Инвертор сообщил об отклонении рабочего параметра.":"Inverter reported an operational parameter deviation.",isBitmask:!1,isPv:64===e||15===e}}(_,p,i);return U`
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
                  <span class="alert-badge">${Ne("common.offline",t,i)}</span>
                  <span class="alert-title">${Ne("alerts.offline_title",t,i)}</span>
                </div>
                <p class="alert-desc">${Ne("alerts.offline_desc",t,i)}</p>
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
                  <span class="alert-badge">${Ne("common.fault",t,i)} F${u}</span>
                  <span class="alert-title">${h.title}</span>
                </div>
                <p class="alert-desc">${h.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${h.recommendation}</span>
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
                  <span class="alert-badge">${Ne("common.warn",t,i)} W${_}</span>
                  <span class="alert-title">${m.title}</span>
                </div>
                <p class="alert-desc">${m.description}</p>
              </div>
            </div>
          `}
    </div>
  `}console.info("%c  ANINEREL-POWER-CARD  %c  Version 1.3.0  ","color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;","color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;");const Ye="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie",Ke="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den",Ze="sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats",Je="switch.invertor_vkhod",Qe="sensor.invertor_vkhod_power",Xe="sensor.invertor_vkhod_voltage",et="sensor.kukhnia_redodo_24v_bms_to_inverter_rs485_bridge_redodo_24v_remaining_energy",tt="sensor.aninerel_anl_4200t_24l_w_pro_load_percent";let it=class extends ce{constructor(){super(...arguments),this._controlsExpanded=!1,this._chargeCurrentPreview=null,this._equalizationConfirmPending=!1,this._monitoredEntitiesSet=new Set,this._historyMap=new Map,this._lastBucketIndexMap=new Map,this._maxHistoryPoints=32,this._bucketDurationMs=27e5,this._lastHistoryFetch=0,this._historyFetchInterval=9e5}static{this.styles=Ce}setConfig(e){if(!e)throw new Error("Invalid card configuration");if(!e.entities)throw new Error('Required "entities" block is not defined in configuration');if(!e.entities.load_power)throw new Error("At least entities.load_power must be specified");this._config={...be,...e,entities:{...e.entities},bms:e.bms?{...e.bms}:void 0,controls:e.controls?{...e.controls}:void 0,safety:e.safety?{...e.safety}:void 0,daily_energy:e.daily_energy?{...e.daily_energy}:void 0,colors:e.colors?{...e.colors}:void 0},this._updateMonitoredEntities()}set hass(e){const t=this._hass;this._hass=e,t||this._fetchHistory(),t&&!this._hasRelevantEntitiesChanged(t,e)||this.requestUpdate()}get hass(){return this._hass}willUpdate(e){super.willUpdate(e),this._updateHistoryBuffers()}firstUpdated(){this._fetchHistory()}getCardSize(){return this._config?.compact_mode?10:14}getLayoutOptions(){return{grid_rows:this._config?.compact_mode?10:14,grid_columns:4,grid_min_rows:8,grid_min_columns:2}}static getStubConfig(e){if(!e||!e.states)return ke;const t=Object.keys(e.states),i=(e,i)=>{for(const r of i){const i=t.find(t=>t.startsWith(`${e}.`)&&t.toLowerCase().includes(r));if(i)return i}},r=i("sensor",["load_power","consumption_power","home_load","house_power"])||"sensor.load_power",a=i("sensor",["battery_power","bat_power","battery_charge_power"]),n=i("sensor",["grid_power","mains_power","grid_consumption"]),o=i("sensor",["solar_power","pv_power","pv1_power","mppt_power"]),s=i("sensor",["battery_voltage","bat_voltage","total_voltage"]),l=i("sensor",["battery_current","bat_current"]),c=i("sensor",["grid_voltage","mains_voltage","ac_voltage"]),d=i("sensor",["operating_mode","inverter_mode","work_mode"]),p=i("sensor",["inverter_temperature","inverter_temp","heatsink_temperature"]),g=i("sensor",["battery_state_of_charge","battery_soc","bms_soc"]),u=i("select",["charge_source_priority","charge_priority"]),h=i("select",["output_source_priority","output_priority"]),_=i("number",["max_ac_charge_current","max_charge_current"]);return{type:"custom:aninerel-power-card",show_solar:Boolean(o),entities:{load_power:r,...a?{battery_power:a}:{},...n?{grid_power:n}:{},...o?{solar_power:o}:{}},...s?{battery_voltage_entity:s}:{},...l?{battery_current_entity:l}:{},...c?{grid_voltage_entity:c}:{},...d?{operating_mode_entity:d}:{},...p?{inverter_temperature_entity:p}:{},...g?{bms:{soc_entity:g}}:{},...u||h||_?{controls:{...u?{charge_source_entity:u}:{},...h?{output_priority_entity:h}:{},..._?{max_charge_current_entity:_}:{}}}:{}}}static async getConfigElement(){return await Promise.resolve().then(function(){return at}),document.createElement("aninerel-power-card-editor")}async _fetchHistory(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity,t=this._config.grid_voltage_entity,i=[];if(e&&i.push(e),t&&i.push(t),0===i.length)return;const r=Date.now();if(!(r-this._lastHistoryFetch<this._historyFetchInterval&&this._historyMap.size>0)){this._lastHistoryFetch=r;try{const a=r-864e5,n=new Date(a).toISOString();let o=null;if("function"==typeof this._hass.callWS)o=await this._hass.callWS({type:"history/history_during_period",start_time:n,entity_ids:i,minimal_response:!0,no_attributes:!0});else if("function"==typeof this._hass.callApi){const e=`history/period/${n}?filter_entity_id=${i.join(",")}&minimal_response&no_attributes`;o=await this._hass.callApi("GET",e)}if(o){const i=Math.floor(r/this._bucketDurationMs);if(e){const t=this._extractStateList(o,e),n=this._sampleHistoryPoints(t,this._maxHistoryPoints,a,r);n.length>0&&(this._historyMap.set("battery_voltage",n),this._lastBucketIndexMap.set("battery_voltage",i))}if(t){const e=this._extractStateList(o,t),n=this._sampleHistoryPoints(e,this._maxHistoryPoints,a,r);n.length>0&&(this._historyMap.set("grid_voltage",n),this._lastBucketIndexMap.set("grid_voltage",i))}this.requestUpdate()}}catch(e){console.warn("AninerelPowerCard: using live buffer for sparklines (history API unavailable):",e)}}}_extractStateList(e,t){if(!e)return[];if(e[t]&&Array.isArray(e[t]))return e[t];if(Array.isArray(e)){for(const i of e)if(Array.isArray(i)&&i.length>0){if(i[0]?.entity_id===t)return i}else if(i?.entity_id===t&&Array.isArray(i.states))return i.states;if(void 0!==e[0]?.state||void 0!==e[0]?.s)return e}return e.entity_id===t&&Array.isArray(e.states)?e.states:[]}_sampleHistoryPoints(e,t,i,r){if(!e||0===e.length)return[];const a=[];for(const t of e){const e=void 0!==t.s?t.s:t.state,i=parseFloat(e);if(isNaN(i)||!isFinite(i))continue;let r=NaN;"number"==typeof t.lu?r=1e3*t.lu:"number"==typeof t.lc?r=1e3*t.lc:(t.last_updated||t.last_changed)&&(r=Date.parse(t.last_updated||t.last_changed)),a.push({t:r,v:i})}if(0===a.length)return[];if(a.some(e=>!isNaN(e.t))&&r>i){const e=[],n=r-i;let o=0,s=a[0].v;for(let r=0;r<t;r++){const l=i+(r+1)/t*n;let c=0,d=0;for(;o<a.length;){const e=a[o];if(!isNaN(e.t)&&e.t>l)break;s=e.v,c+=e.v,d++,o++}e.push(d>0?Number((c/d).toFixed(2)):s)}return e}const n=a.map(e=>e.v);if(n.length<=t)return n;const o=[],s=(n.length-1)/(t-1);for(let e=0;e<t;e++)o.push(n[Math.min(Math.round(e*s),n.length-1)]);return o}_updateHistoryBuffers(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity;if(e){const t=this._getNullableNumber(e);null!==t&&this._pushHistory("battery_voltage",t)}if(this._config.grid_voltage_entity){const e=this._getNullableNumber(this._config.grid_voltage_entity);null!==e&&this._pushHistory("grid_voltage",e)}}_pushHistory(e,t){const i=this._historyMap.get(e)||[],r=Math.floor(Date.now()/this._bucketDurationMs),a=this._lastBucketIndexMap.get(e);i.length<this._maxHistoryPoints?(0===i.length||Math.abs(i[i.length-1]-t)>.001)&&(i.push(t),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,r)):void 0!==a&&r>a?(i.push(t),i.length>this._maxHistoryPoints&&i.shift(),this._historyMap.set(e,i),this._lastBucketIndexMap.set(e,r)):(i[i.length-1]=t,this._historyMap.set(e,i))}_hasRelevantEntitiesChanged(e,t){if(!this._config)return!0;if(e.language!==t.language||e.locale?.language!==t.locale?.language)return!0;for(const i of this._monitoredEntitiesSet)if(e.states[i]!==t.states[i])return!0;return!1}_updateMonitoredEntities(){const e=new Set([Ye,Ke,Ze,Je,Qe,Xe,et,tt]);if(!this._config)return void(this._monitoredEntitiesSet=e);const{entities:t,bms:i,controls:r,safety:a,daily_energy:n}=this._config;if(t&&(t.solar_power&&e.add(t.solar_power),t.battery_power&&e.add(t.battery_power),t.battery_charge_power&&e.add(t.battery_charge_power),t.battery_discharge_power&&e.add(t.battery_discharge_power),t.grid_power&&e.add(t.grid_power),t.load_power&&e.add(t.load_power)),this._config.battery_voltage_entity&&e.add(this._config.battery_voltage_entity),this._config.battery_current_entity&&e.add(this._config.battery_current_entity),this._config.grid_voltage_entity&&e.add(this._config.grid_voltage_entity),this._config.operating_mode_entity&&e.add(this._config.operating_mode_entity),this._config.charging_active_entity&&e.add(this._config.charging_active_entity),this._config.inverter_temperature_entity&&e.add(this._config.inverter_temperature_entity),this._config.inverter_load_percent_entity&&e.add(this._config.inverter_load_percent_entity),this._config.self_consumption_power_entity&&e.add(this._config.self_consumption_power_entity),this._config.grid_breaker_switch_entity&&e.add(this._config.grid_breaker_switch_entity),this._config.grid_breaker_power_entity&&e.add(this._config.grid_breaker_power_entity),this._config.kpi_entity&&e.add(this._config.kpi_entity),i){i.soc_entity&&e.add(i.soc_entity),i.soh_entity&&e.add(i.soh_entity),i.voltage_entity&&e.add(i.voltage_entity),i.current_entity&&e.add(i.current_entity),i.temperature_entity&&e.add(i.temperature_entity),i.temperature_2_entity&&e.add(i.temperature_2_entity),i.cycle_count_entity&&e.add(i.cycle_count_entity),i.cell_delta_entity&&e.add(i.cell_delta_entity),i.remaining_capacity_entity&&e.add(i.remaining_capacity_entity),i.full_capacity_entity&&e.add(i.full_capacity_entity),i.remaining_energy_entity&&e.add(i.remaining_energy_entity),i.active_balancer_entity&&e.add(i.active_balancer_entity);const t=(t,i)=>{const r=t.trim();for(let t=1;t<=i;t++)e.add(`${r}${t}`),e.add(`${r}${t}_voltage`)},r=i.cell_count||8;t(i.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_",r),i.cell_balancing_prefix&&t(i.cell_balancing_prefix,r),i.cell_resistance_prefix&&t(i.cell_resistance_prefix,r);const a=i.bat1_cell_count||i.battery_1?.cell_count||4;i.bat1_soc_entity&&e.add(i.bat1_soc_entity),i.bat1_voltage_entity&&e.add(i.bat1_voltage_entity),i.bat1_temperature_entity&&e.add(i.bat1_temperature_entity),i.bat1_cell_prefix&&t(i.bat1_cell_prefix,a);const n=i.bat2_cell_count||i.battery_2?.cell_count||4;i.bat2_soc_entity&&e.add(i.bat2_soc_entity),i.bat2_voltage_entity&&e.add(i.bat2_voltage_entity),i.bat2_temperature_entity&&e.add(i.bat2_temperature_entity),i.bat2_cell_prefix&&t(i.bat2_cell_prefix,n);const o=[i.battery_1,i.battery_2,i.battery_3,i.battery_4,...Array.isArray(i.packs)?i.packs:[]];for(const i of o)i&&(i.soc_entity&&e.add(i.soc_entity),i.voltage_entity&&e.add(i.voltage_entity),i.current_entity&&e.add(i.current_entity),i.temperature_entity&&e.add(i.temperature_entity),i.soh_entity&&e.add(i.soh_entity),i.cell_voltage_prefix&&t(i.cell_voltage_prefix,i.cell_count||4),i.cell_balancing_prefix&&t(i.cell_balancing_prefix,i.cell_count||4),i.cell_resistance_prefix&&t(i.cell_resistance_prefix,i.cell_count||4))}if(r&&(r.charge_source_entity&&e.add(r.charge_source_entity),r.output_priority_entity&&e.add(r.output_priority_entity),r.max_charge_current_entity&&e.add(r.max_charge_current_entity),r.max_total_charge_current_entity&&e.add(r.max_total_charge_current_entity),r.bulk_voltage_entity&&e.add(r.bulk_voltage_entity),r.float_voltage_entity&&e.add(r.float_voltage_entity),r.back_to_grid_voltage_entity&&e.add(r.back_to_grid_voltage_entity),r.cutoff_voltage_entity&&e.add(r.cutoff_voltage_entity),r.buzzer_entity&&e.add(r.buzzer_entity),r.equalization_entity&&e.add(r.equalization_entity),Array.isArray(r.extra_entities)))for(const t of r.extra_entities){const i="string"==typeof t?t:t?.entity;i&&e.add(i)}a&&(a.fault_active_entity&&e.add(a.fault_active_entity),a.fault_code_entity&&(e.add(a.fault_code_entity),e.add(a.fault_code_entity.replace(/_code$/,"_details"))),a.fault_details_entity&&e.add(a.fault_details_entity),a.warnings_active_entity&&e.add(a.warnings_active_entity),a.warning_code_entity&&(e.add(a.warning_code_entity),e.add(a.warning_code_entity.replace(/_code$/,"_details"))),a.warning_details_entity&&e.add(a.warning_details_entity)),n&&(n.solar_energy_entity&&e.add(n.solar_energy_entity),n.load_energy_entity&&e.add(n.load_energy_entity),n.grid_import_entity&&e.add(n.grid_import_entity),n.grid_export_entity&&e.add(n.grid_export_entity),n.battery_charge_entity&&e.add(n.battery_charge_entity),n.battery_discharge_entity&&e.add(n.battery_discharge_entity),n.self_consumption_daily_entity&&e.add(n.self_consumption_daily_entity),n.self_consumption_monthly_entity&&e.add(n.self_consumption_monthly_entity)),this._monitoredEntitiesSet=e}_resolveCellEntityId(e,t){const i=e.trim(),r=[`${i}${t}`,`${i}${t}_voltage`,`${i.replace(/_voltage_?$/,"_")}${t}_voltage`,`${i.replace(/_cell_?$/,"_cell_voltage_")}${t}`];if(this._hass?.states){for(const e of r)if(this._hass.states[e]&&!this._isEntityUnavailable(e))return e;for(const e of r)if(this._hass.states[e])return e}return r[0]}_checkCellBalancing(e,t,i,r){if(!this._hass?.states)return!1;if(i){const t=this._resolveCellEntityId(i,e),r=this._hass.states[t];if(r){const e=String(r.state).toLowerCase();if("on"===e||"true"===e||"1"===e||"balancing"===e||"active"===e)return!0}}if(r){const t=this._hass.states[r];if(t){const i=String(t.state).toLowerCase();if(new RegExp(`\\b${e}\\b`).test(i)&&"off"!==i&&"none"!==i&&"false"!==i&&"unavailable"!==i)return!0;const r=t.attributes?.active_cells||t.attributes?.balancing_cells;if(Array.isArray(r)&&r.includes(e))return!0}}if(t&&this._hass.states[t]){const e=this._hass.states[t].attributes;if(e&&(!0===e.balancing||!0===e.is_balancing||!0===e.balance))return!0}return!1}_checkCellResistance(e,t,i){if(!this._hass?.states)return null;if(i){const t=this._resolveCellEntityId(i,e),r=this._getNullableNumber(t);if(null!==r&&r>=0)return r<.1?1e3*r:r}if(t&&this._hass.states[t]){const e=this._hass.states[t].attributes;if(e){const t=e.resistance??e.internal_resistance??e.resistance_mohm??e.mohm;if("number"==typeof t&&!isNaN(t))return t<.1?1e3*t:t;if("string"==typeof t){const e=parseFloat(t);if(!isNaN(e))return e<.1?1e3*e:e}}}return null}_findMatchingEntity(e,t){if(!(e&&t&&this._hass&&this._hass.states))return;const i=e.replace(/_code$/,t.replace(/^_+/,"_"));return this._hass.states[i]?i:void 0}_resolveEntity(e,t){return e&&""!==e.trim()?e:t&&this._hass?.states?.[t]?t:void 0}_isEntityUnavailable(e){if(!e||!this._hass||!this._hass.states[e])return!0;const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t||""===t}_getState(e){if(!e||!this._hass||!this._hass.states[e])return"N/A";const t=this._hass.states[e].state;return"unavailable"===t||"unknown"===t?"N/A":t}_getNumber(e){return this._getNullableNumber(e)??0}_getNullableNumber(e){if(!e||!this._hass||!this._hass.states[e])return null;const t=this._hass.states[e].state;if("unavailable"===t||"unknown"===t||""===t)return null;const i=parseFloat(t);return isNaN(i)||!isFinite(i)?null:i}_getOptions(e){return e&&this._hass&&this._hass.states[e]&&this._hass.states[e].attributes?.options||[]}_handleEntityClick(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}async _handleSelectOption(e,t){if(!this._hass)return;const i=e.startsWith("input_select.")?"input_select":"select";try{await this._hass.callService(i,"select_option",{entity_id:e,option:t})}catch(e){console.error("Failed to set option:",e)}}async _handleSetNumber(e,t){if(!this._hass)return;const i=e.startsWith("input_number.")?"input_number":"number";try{await this._hass.callService(i,"set_value",{entity_id:e,value:t})}catch(e){console.error("Failed to set number value:",e)}}async _handleToggleSwitch(e,t){if(!this._hass)return;const i=e.startsWith("input_boolean.")?"input_boolean":"switch";try{await this._hass.callService(i,t?"turn_off":"turn_on",{entity_id:e})}catch(e){console.error("Failed to toggle switch:",e)}}async _handlePressButton(e){if(!this._hass)return;const t=e.startsWith("input_button.")?"input_button":"button";try{await this._hass.callService(t,"press",{entity_id:e})}catch(e){console.error("Failed to press button:",e)}}async _handleToggleEqualization(e,t){if(this._hass){if(!t&&!this._equalizationConfirmPending)return this._equalizationConfirmPending=!0,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer),void(this._equalizationConfirmTimer=setTimeout(()=>{this._equalizationConfirmPending=!1},4e3));this._equalizationConfirmPending=!1,this._equalizationConfirmTimer&&clearTimeout(this._equalizationConfirmTimer),await this._handleToggleSwitch(e,t)}}render(){if(!this._config)return U``;const e=Me(this._hass,this._config.language),t=this._config.max_power||4200,i=Boolean(this._config.entities.solar_power&&""!==this._config.entities.solar_power.trim()),r=void 0!==this._config.show_solar?Boolean(this._config.show_solar&&i):i,a=this._isEntityUnavailable(this._config.entities.load_power),n=this._config.operating_mode_entity?this._isEntityUnavailable(this._config.operating_mode_entity):a,o=Boolean(this._hass&&a&&n),s=r&&this._config.entities.solar_power?this._getNumber(this._config.entities.solar_power):0;let l=0;if(this._config.entities.battery_power)l=this._getNumber(this._config.entities.battery_power);else if(this._config.entities.battery_charge_power||this._config.entities.battery_discharge_power){const e=this._getNumber(this._config.entities.battery_charge_power),t=this._getNumber(this._config.entities.battery_discharge_power);l=Math.max(0,e)-Math.max(0,t)}const c=this._config.invert_battery_power?-l:l,d=this._getNumber(this._config.entities.grid_power),p=this._config.invert_grid_power?-d:d,g=this._resolveEntity(this._config.grid_breaker_power_entity,Qe),u=g?this._getNullableNumber(g):null,h=null!==u&&u>p?u:p,_=this._getNumber(this._config.entities.load_power),m=this._getNullableNumber(this._config.battery_voltage_entity||this._config.bms?.voltage_entity),b=this._getNullableNumber(this._config.battery_current_entity||this._config.bms?.current_entity),y=null!==b?this._config.invert_battery_power?-b:b:null,f=this._getNullableNumber(this._config.grid_voltage_entity)??this._getNullableNumber(Xe),v=this._resolveEntity(this._config.self_consumption_power_entity,Ye),x=v?this._getNullableNumber(v):null,w=this._resolveEntity(this._config.grid_breaker_switch_entity,Je),$=w?this._getState(w):null;let k=this._config.bms?.soc_entity?this._getNullableNumber(this._config.bms.soc_entity):null;const C=this._getState(this._config.operating_mode_entity),S=this._getNullableNumber(this._config.inverter_temperature_entity),M="on"===this._getState(this._config.charging_active_entity),N="on"===this._getState(this._config.safety?.fault_active_entity),A=this._getNullableNumber(this._config.safety?.fault_code_entity),E=null!==A?Math.round(A):null,P=this._config.safety?.fault_details_entity||this._findMatchingEntity(this._config.safety?.fault_code_entity,"_fault_details"),B=P?this._getState(P):null,z=B&&"N/A"!==B&&"0"!==B?B:null;let I="on"===this._getState(this._config.safety?.warnings_active_entity);const O=this._getNullableNumber(this._config.safety?.warning_code_entity),T=null!==O?Math.round(O):null,V=this._config.safety?.warning_details_entity||this._findMatchingEntity(this._config.safety?.warning_code_entity,"_warning_details"),L=V?this._getState(V):null,F=L&&"N/A"!==L&&"0"!==L?L:null;let R=T;if(!r){const{effectiveCode:e,hasNonPvWarning:t}=function(e){if(null===e||0===e||isNaN(e))return{effectiveCode:null,hasNonPvWarning:!1};const t=-34944&e;return 0===t?{effectiveCode:null,hasNonPvWarning:!1}:{effectiveCode:t,hasNonPvWarning:!0}}(T);R=e,t||(I=!1)}const D=this._getNullableNumber(this._config.daily_energy?.solar_energy_entity),W=this._getNullableNumber(this._config.daily_energy?.grid_import_entity),H=this._getNullableNumber(this._config.daily_energy?.grid_export_entity),q=this._getNullableNumber(this._config.daily_energy?.load_energy_entity),j=this._getNullableNumber(this._config.daily_energy?.battery_charge_entity),G=this._getNullableNumber(this._config.daily_energy?.battery_discharge_entity),Y=this._resolveEntity(this._config.daily_energy?.self_consumption_daily_entity,Ke),K=Y?this._getNullableNumber(Y):null,Z=this._resolveEntity(this._config.daily_energy?.self_consumption_monthly_entity,Ze),J=Z?this._getNullableNumber(Z):null,Q=this._config.bms,X=Boolean("series"===Q?.topology||"parallel"===Q?.topology||Q?.dual_battery||Q?.battery_1&&Q?.battery_2||Array.isArray(Q?.packs)&&Q.packs.length>1||Q?.bat1_soc_entity||Q?.bat1_voltage_entity||Q?.bat2_soc_entity||Q?.bat2_voltage_entity);let ee,te,ie=[];const re=[];if(Q)if(X&&"single"!==Q.topology){const e=Array.isArray(Q.packs)&&Q.packs.length>0?Q.packs:[{name:Q.bat1_name||Q.battery_1?.name||"Battery #1",soc_entity:Q.bat1_soc_entity||Q.battery_1?.soc_entity,voltage_entity:Q.bat1_voltage_entity||Q.battery_1?.voltage_entity,current_entity:Q.battery_1?.current_entity,temperature_entity:Q.bat1_temperature_entity||Q.battery_1?.temperature_entity,cell_count:Q.bat1_cell_count||Q.battery_1?.cell_count||4,cell_voltage_prefix:Q.bat1_cell_prefix||Q.battery_1?.cell_voltage_prefix||"sensor.redodo_1_cell_voltage_"},{name:Q.bat2_name||Q.battery_2?.name||"Battery #2",soc_entity:Q.bat2_soc_entity||Q.battery_2?.soc_entity,voltage_entity:Q.bat2_voltage_entity||Q.battery_2?.voltage_entity,current_entity:Q.battery_2?.current_entity,temperature_entity:Q.bat2_temperature_entity||Q.battery_2?.temperature_entity,cell_count:Q.bat2_cell_count||Q.battery_2?.cell_count||4,cell_voltage_prefix:Q.bat2_cell_prefix||Q.battery_2?.cell_voltage_prefix||"sensor.redodo_2_cell_voltage_"},...Q.battery_3?[Q.battery_3]:[],...Q.battery_4?[Q.battery_4]:[]];let t=1;for(let i=0;i<e.length;i++){const r=e[i],a=this._getNullableNumber(r.voltage_entity),n=this._getNullableNumber(r.soc_entity),o=this._getNullableNumber(r.temperature_entity),s=this._getNullableNumber(r.current_entity),l=void 0!==r.cell_count?r.cell_count:4,c=r.cell_voltage_prefix||"",d=c?this._resolveCellEntityId(c,1):"",p=[];if(l>0&&Boolean(c&&(!c.startsWith("sensor.redodo_")||Boolean(this._hass?.states?.[d]))))for(let e=1;e<=l;e++){const i=this._resolveCellEntityId(c,e);let a=this._getNullableNumber(i)??0;a>100&&(a/=1e3);const n=this._checkCellBalancing(e,i,r.cell_balancing_prefix||Q.cell_balancing_prefix,Q.active_balancer_entity),o=this._checkCellResistance(e,i,r.cell_resistance_prefix||Q.cell_resistance_prefix);p.push({index:t++,packCellIndex:e,voltage:a>0?a:0,rawEntityId:i,isBalancing:n,resistance:o})}re.push({name:r.name||`Battery #${i+1}`,voltage:a,soc:n,current:s,temperature:o,voltageEntity:r.voltage_entity,socEntity:r.soc_entity,temperatureEntity:r.temperature_entity,cells:p})}if(ee=re[0],te=re[1],null===k||isNaN(k)){const e=re.map(e=>e.soc).filter(e=>null!==e&&!isNaN(e)&&e>=0);e.length>0&&(k="parallel"===Q.topology?Math.round(e.reduce((e,t)=>e+t,0)/e.length):Math.min(...e))}}else{const e=void 0!==Q.cell_count?Q.cell_count:8,t=Q.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_",i=this._resolveCellEntityId(t,1);if(e>0&&Boolean(Q.cell_voltage_prefix||this._hass?.states?.[i]))for(let i=1;i<=e;i++){const e=this._resolveCellEntityId(t,i);let r=this._getNullableNumber(e)??0;r>100&&(r/=1e3);const a=this._checkCellBalancing(i,e,Q.cell_balancing_prefix,Q.active_balancer_entity),n=this._checkCellResistance(i,e,Q.cell_resistance_prefix);ie.push({index:i,packCellIndex:i,voltage:r>0?r:0,rawEntityId:e,isBalancing:a,resistance:n})}}const ae=function(e,t,i){if(12===e.system_voltage||24===e.system_voltage||36===e.system_voltage||48===e.system_voltage)return e.system_voltage;if(null!==t&&!isNaN(t)&&t>8)return t>=38?48:t>=30?36:t>=18?24:12;const r=e.bms;if(i&&i.length>0){const e=i.map(e=>e.voltage??0).filter(e=>e>8);if(e.length>0){const t="parallel"===r?.topology?e[0]:e.reduce((e,t)=>e+t,0);return t>=38?48:t>=30?36:t>=18?24:12}}if(r?.cell_count){if(r.cell_count>=13)return 48;if(r.cell_count>=10)return 36;if(r.cell_count>=6)return 24;if(r.cell_count>=3)return 12}const a=JSON.stringify({e:e.entities,bv:e.battery_voltage_entity,bms:e.bms?.soc_entity||e.bms?.voltage_entity}).toLowerCase();return a.includes("48v")||a.includes("51.2v")||a.includes("51_2v")?48:a.includes("12v")?12:24}(this._config,m,re);(null===k||isNaN(k))&&(k=function(e,t){if(null===e||isNaN(e))return null;const i=e/(t/24);return i<19.5||i>31?null:i>=27.2?100:i>=26.8?Math.round(80+(i-26.8)/.4*20):i>=26.4?Math.round(50+(i-26.4)/.4*30):i>=26?Math.round(20+(i-26)/.4*30):i>=24?Math.max(5,Math.round((i-24)/2*20)):5}(m,ae));const ne=Q?.full_capacity_entity?this._getNullableNumber(Q.full_capacity_entity):null,oe=Q?.nominal_capacity_wh||(null!==ne&&ne>0?Math.round(ne*(48===ae?51.2:24===ae?25.6:12.8)):48===ae?5120:12===ae?1280:2560),se=this._resolveEntity(Q?.remaining_energy_entity,et);let le=null;if(se){const e=this._getNullableNumber(se);if(null!==e){le="kwh"===(this._hass?.states[se]?.attributes?.unit_of_measurement?.toLowerCase()||"")?1e3*e:e}}null===le&&null!==k&&(le=Math.max(0,k)/100*oe);let ce=null;if(null!==le&&Math.abs(c)>15)if(c<-15){const t=.1*oe;ce=Pe(Math.max(0,le-t)/Math.abs(c),e)}else if(c>15&&(null===k||k<99.5)){ce=Pe(Math.max(0,oe-le)/c,e)}const de=this._resolveEntity(this._config.inverter_load_percent_entity,tt),pe=de?this._getNullableNumber(de):null,ge=null!==pe?pe:t>0?Math.min(100,Math.round(_/t*100)):0,ue=this._config.controls,he=this._config.safety,_e=this._config.daily_energy,me=ue?.max_charge_current_entity,be=me?this._hass?.states[me]?.attributes:void 0,ye="number"==typeof be?.min?be.min:2,fe="number"==typeof be?.max?be.max:100,ve="number"==typeof be?.step?be.step:1;return U`
      <ha-card class="${this._config.compact_mode?"compact":""}">
        <!-- 1. Header Bar with live status chips -->
        ${!1!==this._config.show_header?Ae({hass:this._hass,config:this._config,hasSolar:r,systemVoltage:ae,isOffline:o,operatingMode:C,temperature:S,selfConsumptionWatts:x,selfConsumptionEntity:v,gridBreakerState:$,gridBreakerEntity:w,isCharging:M,isFault:N,faultCode:E,isWarning:I,warningCode:R,onChipClick:e=>this._handleEntityClick(e)}):""}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if offline or any faults/warnings) -->
        ${!1!==this._config.show_alerts&&(he||o)?Ge({hass:this._hass,language:this._config.language,safetyConfig:he,isOffline:o,offlineEntity:this._config.operating_mode_entity||this._config.entities.load_power,isFault:N,faultCode:E,faultDetailsText:z,isWarning:I,warningCode:R,warningDetailsText:F,onAlertClick:e=>this._handleEntityClick(e)}):""}

        <!-- 3. Power Flow Animated Diagram -->
        ${!1!==this._config.show_flow?Be({hass:this._hass,config:this._config,hasSolar:r,systemVoltage:ae,isOffline:o,gridPosition:this._config.grid_position||"bottom",solarWatts:s,batteryWatts:c,gridWatts:h,loadWatts:_,batterySoc:k,batteryVoltage:m,batteryCurrent:y,gridVoltage:f,gridBreakerState:$,inverterLoadPercent:ge,batteryRuntimeText:ce,selfConsumptionWatts:x,operatingMode:C,isFault:N,onNodeClick:e=>this._handleEntityClick(e)}):""}

        <!-- 4. Electrical Telemetry & Battery SoC / Self-Sufficiency KPI -->
        ${!1!==this._config.show_params?Ie({hass:this._hass,config:this._config,hasSolar:r,systemVoltage:ae,batteryVoltage:m,batteryCurrent:y,gridVoltage:f,batterySoc:k,gridImportEnergyToday:W,loadEnergyToday:q,batteryDischargeEnergyToday:G,inverterLoadPercent:ge,historyMap:this._historyMap,onParamClick:e=>this._handleEntityClick(e)}):""}

        <!-- 5. Universal BMS Battery Cell Telemetry & Balancing (Single, Series, or Parallel) -->
        ${!1!==this._config.show_bms&&Q?Te({hass:this._hass,language:this._config.language,bmsConfig:Q,isDual:X,battery1:ee,battery2:te,packs:re.length>0?re:void 0,soc:k,soh:this._getNullableNumber(Q.soh_entity),voltage:m,current:y,temperature:this._getNullableNumber(Q.temperature_entity),temperature2:this._getNullableNumber(Q.temperature_2_entity),cycleCount:this._getNullableNumber(Q.cycle_count_entity),remainingCapacity:this._getNullableNumber(Q.remaining_capacity_entity),fullCapacity:this._getNullableNumber(Q.full_capacity_entity),cellDelta:this._getNullableNumber(Q.cell_delta_entity),cells:ie,onBmsClick:e=>this._handleEntityClick(e)}):""}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${!1!==this._config.show_controls&&ue?function(e){const{controlsConfig:t,hass:i,language:r,expanded:a,chargeSource:n,chargeSourceOptions:o,outputPriority:s,outputPriorityOptions:l,maxChargeCurrent:c,maxChargeCurrentPreview:d,maxChargeCurrentMin:p=0,maxChargeCurrentMax:g=100,maxChargeCurrentStep:u=1,bulkVoltage:h,floatVoltage:_,isEqualization:m,equalizationConfirmPending:b=!1,onToggleExpand:y,onSelectOption:f,onPreviewNumber:v,onSetNumber:x,onToggleEqualization:w,onToggleSwitch:$,onPressButton:k,onEntityMoreInfo:C}=e,S=t.max_charge_current_limit||(g>=180&&(c??0)<=100?100:g),M=d??c??15,N=Math.max(p,Math.min(S,M)),A=S>p?Math.max(0,Math.min(100,Math.round((N-p)/(S-p)*100))):0,E=[];if(s&&"N/A"!==s&&"unavailable"!==s){const e=Ve(s);E.push(e.code)}if(n&&"N/A"!==n&&"unavailable"!==n){const e=Ve(n);E.push(e.code)}null==c||isNaN(c)||E.push(`${c}A`);const P=E.join(" • "),B=(e,t,i,r,a,n=[])=>{const o=(a.length>0?a:n).map(Ve),s=o.some(e=>e.subtitle.length>0);return U`
      <div class="control-box select-control-box">
        <div class="control-box-header" @click=${()=>C?.(e)}>
          <div class="control-label-wrap">
            <ha-icon icon="${i}"></ha-icon>
            <label>${t}</label>
          </div>
          ${r&&"N/A"!==r?U`<span class="control-current-tag">${Ve(r).code}</span>`:""}
        </div>
        <div
          class="pill-selector ${s?"with-subtitles":""}"
          style="--pill-count: ${Math.min(o.length,4)};"
          role="radiogroup"
          aria-label="${t}"
        >
          ${o.map(t=>{const i=r===t.raw;return U`
              <button
                type="button"
                role="radio"
                aria-checked="${i?"true":"false"}"
                class="pill-btn ${i?"active":""}"
                title="${t.raw}"
                @click=${()=>f(e,t.raw)}
              >
                <span class="pill-code">${t.code}</span>
                ${t.subtitle?U`<span class="pill-sub">${t.subtitle}</span>`:""}
              </button>
            `})}
        </div>
      </div>
    `},z=(e,t,i,r,a,n,o,s,l=!1)=>{const c=l?N:r??a,d=n>a?Math.max(0,Math.min(100,Math.round((c-a)/(n-a)*100))):0,p=[];if("A"===s&&n>=30){const e=[2,10,15,20,30,40,50,60,80,100,120];for(const t of e)t>=a&&t<=n&&t%o===0&&p.push(t)}const g=p.length>6?[p[0],p[1],p[2],p[4],p[p.length-1]]:p,u=`slider-${e.replace(/[^a-zA-Z0-9_-]/g,"-")}`;return U`
      <div class="control-box slider-box">
        <div class="control-box-header">
          <div class="control-label-wrap" @click=${()=>C?.(e)}>
            <ha-icon icon="${i}"></ha-icon>
            <label for="${u}">${t}</label>
          </div>
          <span class="control-live-val" @click=${()=>C?.(e)}>
            ${null!=r?`${c} ${s}`:"—"}
          </span>
        </div>

        <div class="slider-input-container">
          <button
            type="button"
            class="stepper-btn slider-step-btn"
            title="-${o}${s}"
            ?disabled=${null===r||c<=a}
            @click=${()=>{const t=Math.max(a,Number((c-o).toFixed(2)));x(e,t)}}
          >
            −
          </button>

          <div class="slider-track-wrap">
            <input
              id="${u}"
              type="range"
              class="control-range"
              min="${a}"
              max="${n}"
              step="${o}"
              .value=${String(c)}
              aria-valuetext="${c} ${s}"
              style="--slider-progress: ${l?A:d}%; --attr-min: ${a}; --attr-max: ${n}; --control-value: ${c};"
              @input=${t=>{const i=t.target,r=parseFloat(i.value),o=n>a?Math.max(0,Math.min(100,Math.round((r-a)/(n-a)*100))):0;i.style.setProperty("--slider-progress",`${o}%`),i.style.setProperty("--control-value",String(r)),l&&v?.(r,e)}}
              @change=${t=>{const i=parseFloat(t.target.value);l&&v?.(null,e),x(e,i)}}
            />
            <div class="slider-Sub-bounds">
              <span class="slider-boundary">${a}${s}</span>
              <span class="slider-boundary">${n}${s}</span>
            </div>
          </div>

          <button
            type="button"
            class="stepper-btn slider-step-btn"
            title="+${o}${s}"
            ?disabled=${null===r||c>=n}
            @click=${()=>{const t=Math.min(n,Number((c+o).toFixed(2)));x(e,t)}}
          >
            +
          </button>
        </div>

        ${g.length>0?U`
              <div class="slider-presets-row">
                ${g.map(t=>U`
                    <button
                      type="button"
                      class="preset-chip ${Math.abs(c-t)<.01?"active":""}"
                      @click=${()=>x(e,t)}
                    >
                      ${t}${s}
                    </button>
                  `)}
              </div>
            `:""}
      </div>
    `},I=(e,t,r,a,n)=>{const o=i?.states[e],s=o?.attributes||{},l=o?.state,c=void 0!==a?a:void 0!==l&&"unavailable"!==l&&"unknown"!==l?parseFloat(l):null,d=null===c||isNaN(c)?null:c,p=n?.unit||s.unit_of_measurement||"V",g=n?.step||("number"==typeof s.step&&s.step>0?s.step:"V"===p?.1:1),u=void 0!==n?.min?n.min:"number"==typeof s.min?s.min:void 0,h=void 0!==n?.max?n.max:"number"==typeof s.max?s.max:void 0,_=g<.1?2:g<1?1:0,m=n?.icon||s.icon||r,b=n?.name||t||s.friendly_name||e;return U`
      <div class="control-box mini-voltage">
        <div class="control-box-header" @click=${()=>C?.(e)}>
          <div class="control-label-wrap">
            <ha-icon icon="${m}"></ha-icon>
            <label title="${b}">${b}</label>
          </div>
        </div>
        <div class="voltage-stepper">
          <button
            type="button"
            class="stepper-btn"
            ?disabled=${null===d||void 0!==u&&d<=u}
            @click=${()=>{if(null===d)return;let t=Number((d-g).toFixed(_));void 0!==u&&(t=Math.max(u,t)),x(e,t)}}
          >
            −
          </button>
          <span class="stepper-val" @click=${()=>C?.(e)}>
            ${null!==d?`${d.toFixed(_)} ${p}`:"—"}
          </span>
          <button
            type="button"
            class="stepper-btn"
            ?disabled=${null===d||void 0!==h&&d>=h}
            @click=${()=>{if(null===d)return;let t=Number((d+g).toFixed(_));void 0!==h&&(t=Math.min(h,t)),x(e,t)}}
          >
            +
          </button>
        </div>
      </div>
    `},O=(e,t,r,a)=>{const n=i?.states[e],o="on"===n?.state,s=a?.icon||n?.attributes?.icon||r,l=a?.name||t||n?.attributes?.friendly_name||e;return a?.dangerous?U`
        <div class="danger-switch-row ${o?"danger-active":""}">
          <div class="danger-info" @click=${()=>C?.(e)}>
            <div class="danger-title">
              <ha-icon icon="${s||"mdi:alert-octagon"}"></ha-icon>
              <span>${l}</span>
            </div>
            ${a.warning_text?U`<span class="danger-desc">${a.warning_text}</span>`:""}
          </div>
          <button
            type="button"
            class="toggle-switch-btn ${o?"switch-on":"switch-off"}"
            @click=${()=>$?$(e,o):w(e,o)}
          >
            ${o?"ON":"OFF"}
          </button>
        </div>
      `:U`
      <div class="normal-switch-row ${o?"switch-row-active":""}">
        <div class="switch-row-left" @click=${()=>C?.(e)}>
          <ha-icon icon="${s}"></ha-icon>
          <span class="switch-row-title">${l}</span>
        </div>
        <button
          type="button"
          class="toggle-switch-btn normal-toggle ${o?"normal-on":"switch-off"}"
          @click=${()=>$?$(e,o):w(e,o)}
        >
          ${o?"ON":"OFF"}
        </button>
      </div>
    `},T=[];t.bulk_voltage_entity&&T.push(I(t.bulk_voltage_entity,Ne("controls.bulk_voltage",i,r),"mdi:arrow-up-bold-box-outline",h)),t.float_voltage_entity&&T.push(I(t.float_voltage_entity,Ne("controls.float_voltage",i,r),"mdi:arrow-down-bold-box-outline",_)),t.back_to_grid_voltage_entity&&T.push(I(t.back_to_grid_voltage_entity,Ne("controls.back_to_grid_voltage",i,r),"mdi:transmission-tower-import")),t.cutoff_voltage_entity&&T.push(I(t.cutoff_voltage_entity,Ne("controls.cutoff_voltage",i,r),"mdi:battery-alert-variant-outline"));const V=[],L=[],F=[];if(Array.isArray(t.extra_entities))for(const e of t.extra_entities){const t="string"==typeof e?{entity:e}:e;if(!t.entity)continue;const a=Le(t.entity),n=i?.states[t.entity],o=n?.attributes||{},s=Fe(i,t.entity,t.name||""),l=t.ui_type||"auto";if("select"===l||"auto"===l&&("select"===a||"input_select"===a))V.push(B(t.entity,s,t.icon||o.icon||"mdi:tune-variant",n?.state,o.options||[]));else if("slider"===l){const e=n?parseFloat(n.state):null;L.push(z(t.entity,s,t.icon||o.icon||"mdi:ray-vertex",null===e||isNaN(e)?null:e,t.min??o.min??0,t.max??o.max??100,t.step??o.step??1,t.unit||o.unit_of_measurement||""))}else"stepper"===l||"auto"===l&&("number"===a||"input_number"===a)?T.push(I(t.entity,s,t.icon||o.icon||"mdi:numeric",void 0,t)):"switch"===l||"auto"===l&&("switch"===a||"input_boolean"===a)?F.push(O(t.entity,s,t.icon||o.icon||"mdi:toggle-switch-outline",t)):"button"!==l&&("auto"!==l||"button"!==a&&"input_button"!==a)||F.push(U`
          <div class="normal-switch-row">
            <div class="switch-row-left" @click=${()=>C?.(t.entity)}>
              <ha-icon icon="${t.icon||o.icon||"mdi:gesture-tap-button"}"></ha-icon>
              <span class="switch-row-title">${s}</span>
            </div>
            <button
              type="button"
              class="toggle-switch-btn normal-toggle"
              @click=${()=>k?.(t.entity)}
            >
              ${Ne("controls.press",i,r)}
            </button>
          </div>
        `)}return U`
    <div class="controls-card-section ${a?"expanded":""}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${y}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>${Ne("controls.title",i,r)}</span>
        </div>
        <div class="controls-header-right">
          ${P?U`<span class="controls-quick-summary">${P}</span>`:""}
          <ha-icon
            class="chevron-icon ${a?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${a?U`
            <div class="controls-body">
              <!-- 1. Priority Selectors Stack (Adaptive full-width or 2-col on wide screens, zero clipping) -->
              ${t.charge_source_entity||t.output_priority_entity||V.length>0?U`
                    <div class="controls-select-grid">
                      ${t.charge_source_entity?B(t.charge_source_entity,Ne("controls.charge_source",i,r),"mdi:solar-power",n,o,["Solar First (CSO)","Solar and Utility (SNU)","Only Solar (OSO)"]):""}
                      ${t.output_priority_entity?B(t.output_priority_entity,Ne("controls.output_priority",i,r),"mdi:power-plug-outline",s,l,["Utility First (UTI)","Solar First (USB)","SBU Priority (SBU)"]):""}
                      ${V}
                    </div>
                  `:""}

              <!-- 2. Current / Power Sliders (Max AC Charge Current, Max Total Charge Current, etc.) -->
              ${t.max_charge_current_entity?z(t.max_charge_current_entity,Ne("controls.max_charge_current",i,r),"mdi:current-ac",c,p,S,u,"A",!0):""}

              ${t.max_total_charge_current_entity?(()=>{const e=t.max_total_charge_current_entity,a=i?.states[e],n=a?.attributes||{},o=a?parseFloat(a.state):null,s="number"==typeof n.min?n.min:10,l="number"==typeof n.max?n.max>=180&&(o??0)<=120?120:n.max:120,c="number"==typeof n.step?n.step:10;return z(e,Ne("controls.max_total_charge_current",i,r),"mdi:lightning-bolt",null===o||isNaN(o)?null:o,s,l,c,n.unit_of_measurement||"A",!1)})():""}

              ${L}

              <!-- 3. Precision Steppers Grid (Bulk, Float, Back-to-Grid, Cut-off, or SoC Thresholds) -->
              ${T.length>0?U`
                    <div class="controls-stepper-grid">
                      ${T}
                    </div>
                  `:""}

              <!-- 4. Standard Switches (Buzzer / Sound, Grid Charge, etc.) -->
              ${t.buzzer_entity?O(t.buzzer_entity,Ne("controls.buzzer",i,r),"mdi:volume-high"):""}

              ${F}

              <!-- 5. DANGER ZONE: Equalization Switch (Inline 2-Step Confirmation) -->
              ${t.equalization_entity?U`
                    <div
                      class="danger-switch-row ${m||b?"danger-active":""}"
                    >
                      <div
                        class="danger-info"
                        @click=${()=>C?.(t.equalization_entity)}
                      >
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>${Ne("controls.equalization",i,r)}</span>
                        </div>
                        <span class="danger-desc">
                          ${Ne("controls.equalization_warning",i,r)}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${m||b?"switch-on":"switch-off"}"
                        @click=${()=>w(t.equalization_entity,m)}
                      >
                        ${m?"ON":b?Ne("controls.confirm_on",i,r):"OFF"}
                      </button>
                    </div>
                  `:""}
            </div>
          `:""}
    </div>
  `}({controlsConfig:ue,hass:this._hass,language:this._config.language,expanded:this._controlsExpanded,onToggleExpand:()=>{this._controlsExpanded=!this._controlsExpanded},chargeSource:ue.charge_source_entity?this._getState(ue.charge_source_entity):void 0,chargeSourceOptions:this._getOptions(ue.charge_source_entity),outputPriority:ue.output_priority_entity?this._getState(ue.output_priority_entity):void 0,outputPriorityOptions:this._getOptions(ue.output_priority_entity),maxChargeCurrent:this._getNullableNumber(ue.max_charge_current_entity),maxChargeCurrentPreview:this._chargeCurrentPreview,maxChargeCurrentMin:ye,maxChargeCurrentMax:fe,maxChargeCurrentStep:ve,bulkVoltage:this._getNullableNumber(ue.bulk_voltage_entity),floatVoltage:this._getNullableNumber(ue.float_voltage_entity),isEqualization:!!ue.equalization_entity&&"on"===this._getState(ue.equalization_entity),equalizationConfirmPending:this._equalizationConfirmPending,onSelectOption:(e,t)=>this._handleSelectOption(e,t),onPreviewNumber:e=>{this._chargeCurrentPreview=e},onSetNumber:(e,t)=>this._handleSetNumber(e,t),onToggleEqualization:(e,t)=>this._handleToggleEqualization(e,t),onToggleSwitch:(e,t)=>this._handleToggleSwitch(e,t),onPressButton:e=>this._handlePressButton(e),onEntityMoreInfo:e=>this._handleEntityClick(e)}):""}

        <!-- 7. Daily Energy Statistics (Today's Production, Consumption & Self-Consumption) -->
        ${!1!==this._config.show_energy&&_e?Re({hass:this._hass,language:this._config.language,dailyConfig:_e,solarEnergy:D,loadEnergy:q,gridImportEnergy:W,gridExportEnergy:H,batteryChargeEnergy:j,batteryDischargeEnergy:G,selfConsumptionDailyEnergy:K,selfConsumptionDailyEntity:Y,selfConsumptionMonthlyEnergy:J,selfConsumptionMonthlyEntity:Z,onEnergyClick:e=>this._handleEntityClick(e)}):""}
      </ha-card>
    `}};e([_e()],it.prototype,"_config",void 0),e([_e()],it.prototype,"_hass",void 0),e([_e()],it.prototype,"_controlsExpanded",void 0),e([_e()],it.prototype,"_chargeCurrentPreview",void 0),e([_e()],it.prototype,"_equalizationConfirmPending",void 0),it=e([pe(me)],it),window.customCards=window.customCards||[],window.customCards.push({type:me,name:"Aninerel Power Card",description:"Universal power card for hybrid inverters (Aninerel, Anenji, Deye, Growatt, PowMr, EASun, Voltronic) & BMS battery banks (LiFePO4, JK, Daly, Redodo, Pylontech)",preview:!0,documentationURL:"https://github.com/meksspirt/aninerel-power-card"});let rt=class extends ce{setConfig(e){const t=JSON.parse(JSON.stringify(e||{}));t.bms&&(t.bms.battery_1&&(!t.bms.bat1_name&&t.bms.battery_1.name&&(t.bms.bat1_name=t.bms.battery_1.name),!t.bms.bat1_soc_entity&&t.bms.battery_1.soc_entity&&(t.bms.bat1_soc_entity=t.bms.battery_1.soc_entity),!t.bms.bat1_voltage_entity&&t.bms.battery_1.voltage_entity&&(t.bms.bat1_voltage_entity=t.bms.battery_1.voltage_entity),!t.bms.bat1_temperature_entity&&t.bms.battery_1.temperature_entity&&(t.bms.bat1_temperature_entity=t.bms.battery_1.temperature_entity),!t.bms.bat1_cell_prefix&&t.bms.battery_1.cell_voltage_prefix&&(t.bms.bat1_cell_prefix=t.bms.battery_1.cell_voltage_prefix)),t.bms.battery_2&&(!t.bms.bat2_name&&t.bms.battery_2.name&&(t.bms.bat2_name=t.bms.battery_2.name),!t.bms.bat2_soc_entity&&t.bms.battery_2.soc_entity&&(t.bms.bat2_soc_entity=t.bms.battery_2.soc_entity),!t.bms.bat2_voltage_entity&&t.bms.battery_2.voltage_entity&&(t.bms.bat2_voltage_entity=t.bms.battery_2.voltage_entity),!t.bms.bat2_temperature_entity&&t.bms.battery_2.temperature_entity&&(t.bms.bat2_temperature_entity=t.bms.battery_2.temperature_entity),!t.bms.bat2_cell_prefix&&t.bms.battery_2.cell_voltage_prefix&&(t.bms.bat2_cell_prefix=t.bms.battery_2.cell_voltage_prefix))),this._config=t}_computeLabel(e){return e.label?e.label:Ne(`editor.${e.name}`,this.hass,this._config?.language)||e.name}_valueChanged(e){const t=e.detail.value,i=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_getSchema(){const e=this._config?.language;return[{name:"title",label:Ne("editor.title",this.hass,e)||"Card Title",selector:{text:{}}},{name:"subtitle",label:"Card Subtitle",selector:{text:{}}},{name:"icon",label:"Header Icon (MDI)",selector:{icon:{}}},{name:"language",label:"Interface Language (Язык интерфейса)",selector:{select:{options:[{value:"auto",label:"Auto (Home Assistant Default)"},{value:"ru",label:"Русский (Russian)"},{value:"en",label:"English"}]}}},{name:"entities",type:"expandable",title:Ne("editor.entities_group",this.hass,e)||"⚡ Real-time Power Entities (Required)",schema:[{name:"solar_power",label:"Solar Generation (PV Power) [Optional]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_power",label:"Battery Power (+Charge / -Discharge) [Or use split sensors below]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_charge_power",label:"Battery Charge Power (W) [Optional, for split Deye/Growatt sensors]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_power",label:"Battery Discharge Power (W) [Optional, for split Deye/Growatt sensors]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"grid_power",label:"Grid Power (AC Input)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"load_power",label:"Home Load Power",required:!0,selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ne("editor.params_group",this.hass,e)||"📊 Electrical Parameters & Telemetry",schema:[{name:"system_voltage",label:"Nominal System DC Voltage (Auto-detected from battery voltage)",selector:{select:{options:[{value:"auto",label:"Auto-Detect (12V / 24V / 36V / 48V)"},{value:12,label:"12V System (4S LiFePO4)"},{value:24,label:"24V System (8S LiFePO4)"},{value:36,label:"36V System (12S LiFePO4)"},{value:48,label:"48V / 51.2V System (15S / 16S LiFePO4)"}]}}},{name:"invert_battery_power",label:"Invert Battery Power & Current Polarity (Use if +W means Discharging)",selector:{boolean:{}}},{name:"invert_grid_power",label:"Invert Grid Power Polarity (Use if +W means Grid Export)",selector:{boolean:{}}},{name:"battery_voltage_entity",label:"Battery Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"battery_current_entity",label:"Battery Current (A)",selector:{entity:{domain:"sensor"}}},{name:"grid_voltage_entity",label:"Grid AC Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"operating_mode_entity",label:"Inverter Operating Mode",selector:{entity:{domain:"sensor"}}},{name:"inverter_temperature_entity",label:"Inverter Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"inverter_load_percent_entity",label:"Inverter Load Percentage (%)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_power_entity",label:"Inverter Self-Consumption Power (W)",selector:{entity:{domain:"sensor"}}},{name:"grid_breaker_switch_entity",label:"AC Input Zigbee Breaker / Smart Plug (Switch)",selector:{entity:{domain:"switch"}}},{name:"charging_active_entity",label:"Charging Active Flag",selector:{entity:{domain:"binary_sensor"}}},{name:"kpi_mode",label:"3rd Radial Gauge KPI Metric",selector:{select:{options:[{value:"auto",label:"Auto (Battery SoC for UPS, Self-Sufficiency for Solar)"},{value:"battery_soc",label:"Battery SoC % (State of Charge)"},{value:"battery_autonomy",label:"Battery Autonomy % (Daily Load Powered by Battery)"},{value:"self_sufficiency",label:"Solar Self-Sufficiency % (Autarky)"},{value:"inverter_load",label:"Inverter Load %"}]}}},{name:"kpi_entity",label:"Custom KPI Entity (Overrides click/gauge entity)",selector:{entity:{domain:"sensor"}}}]},{name:"bms",type:"expandable",title:Ne("editor.bms_group",this.hass,e)||"🔋 Universal BMS & Battery Bank Telemetry",schema:[{name:"bank_name",label:"Battery Bank / BMS Title (Auto-detected if empty, e.g. BMS Redodo, JK BMS, Pylontech)",selector:{text:{}}},{name:"topology",label:"Connection Topology (Series / Parallel / Single)",selector:{select:{options:[{value:"auto",label:"Auto-Detect (From Pack & Total Voltages)"},{value:"series",label:"Series Connection (e.g. 2× 12V → 24V)"},{value:"parallel",label:"Parallel Connection (e.g. 2× 24V / 48V ∥)"},{value:"single",label:"Single Battery Pack (12V / 24V / 48V)"}]}}},{name:"chemistry",label:"Battery Chemistry (Cell Voltage Curve)",selector:{select:{options:[{value:"auto",label:"Auto-Detect (LiFePO4 / Li-Ion / LTO)"},{value:"lifepo4",label:"LiFePO4 (3.00V – 3.65V / cell)"},{value:"li_ion",label:"Li-Ion / NMC / LCO (3.10V – 4.20V / cell)"},{value:"lto",label:"LTO Lithium Titanate (1.90V – 2.75V / cell)"}]}}},{name:"cell_numbering",label:"Multi-Pack Cell Numbering Style",selector:{select:{options:[{value:"continuous",label:"Continuous (#1..#8 across packs)"},{value:"per_pack",label:"Per Pack (#1..#4 in each pack)"}]}}},{name:"dual_battery",label:"🔋 Enable Multi-Pack / Dual Battery Mode",selector:{boolean:{}}},{name:"nominal_capacity_wh",label:"Total Battery Nominal Energy Capacity (Wh, e.g. 2560 for 24V 100Ah)",selector:{number:{min:500,max:6e4,step:100,mode:"box"}}},{name:"remaining_energy_entity",label:"Remaining Battery Energy Entity (Wh / kWh, for Runtime calc)",selector:{entity:{domain:"sensor"}}},{name:"bat1_name",label:"Battery #1: Name (e.g. Redodo #1 / Pack 1)",selector:{text:{}}},{name:"bat1_soc_entity",label:"Battery #1: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat1_voltage_entity",label:"Battery #1: Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"bat1_temperature_entity",label:"Battery #1: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat1_cell_count",label:"Battery #1: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:1,max:24,step:1,mode:"box"}}},{name:"bat1_cell_prefix",label:"Battery #1: Cell Sensor Prefix (e.g. sensor.pack1_cell_)",selector:{text:{}}},{name:"bat2_name",label:"Battery #2: Name (e.g. Redodo #2 / Pack 2)",selector:{text:{}}},{name:"bat2_soc_entity",label:"Battery #2: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat2_voltage_entity",label:"Battery #2: Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"bat2_temperature_entity",label:"Battery #2: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat2_cell_count",label:"Battery #2: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:1,max:24,step:1,mode:"box"}}},{name:"bat2_cell_prefix",label:"Battery #2: Cell Sensor Prefix (e.g. sensor.pack2_cell_)",selector:{text:{}}},{name:"soc_entity",label:"Total / Bank SOC % (Single Pack or Bank Sensor)",selector:{entity:{domain:"sensor"}}},{name:"voltage_entity",label:"Total Battery Voltage via BMS (V)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"BMS Cell Temperature Probe (°C)",selector:{entity:{domain:"sensor"}}},{name:"cell_delta_entity",label:"Cell Imbalance (Delta mV)",selector:{entity:{domain:"sensor"}}},{name:"cycle_count_entity",label:"Battery Cycle Count",selector:{entity:{domain:"sensor"}}},{name:"soh_entity",label:"Battery State of Health (SOH %)",selector:{entity:{domain:"sensor"}}},{name:"active_balancer_entity",label:"Active Balancer Switch / Balancing Status Sensor",selector:{entity:{}}},{name:"cell_balancing_prefix",label:"Cell Active Balancing Sensor Prefix (e.g. binary_sensor.cell_balancing_)",selector:{text:{}}},{name:"cell_resistance_prefix",label:"Cell Internal Resistance Prefix (e.g. sensor.cell_resistance_ [mΩ])",selector:{text:{}}},{name:"remaining_capacity_entity",label:"Remaining Capacity (Ah)",selector:{entity:{domain:"sensor"}}},{name:"cell_count",label:"Single Pack Cell Count (0 for CAN-bus without cells, 4 for 12V, 8 for 24V, 16 for 48V)",selector:{number:{min:0,max:24,step:1,mode:"box"}}},{name:"cell_voltage_prefix",label:"Single Pack Cell Sensor Prefix (1..N)",selector:{text:{}}}]},{name:"controls",type:"expandable",title:Ne("editor.controls_group",this.hass,e)||"🎛️ Inverter Controls & Settings",schema:[{name:"charge_source_entity",label:"Charge Source Priority (Select / Input Select)",selector:{entity:{domain:["select","input_select"]}}},{name:"output_priority_entity",label:"Output Source Priority / Work Mode (Select / Input Select)",selector:{entity:{domain:["select","input_select"]}}},{name:"max_charge_current_entity",label:"Max AC Charge Current (Number)",selector:{entity:{domain:["number","input_number"]}}},{name:"max_charge_current_limit",label:"Max AC Charge Slider Limit (A) [Overrides raw 200A Modbus ceiling]",selector:{number:{min:10,max:250,step:5,mode:"box"}}},{name:"max_total_charge_current_entity",label:"Max Total (PV + AC) Charge Current (Number) [Optional]",selector:{entity:{domain:["number","input_number"]}}},{name:"bulk_voltage_entity",label:"Bulk / Absorption Voltage Setting (Number)",selector:{entity:{domain:["number","input_number"]}}},{name:"float_voltage_entity",label:"Float Voltage Setting (Number)",selector:{entity:{domain:["number","input_number"]}}},{name:"back_to_grid_voltage_entity",label:"Back to Grid Voltage / SoC Threshold (Number) [Optional]",selector:{entity:{domain:["number","input_number"]}}},{name:"cutoff_voltage_entity",label:"Low DC Cut-off Voltage / SoC Threshold (Number) [Optional]",selector:{entity:{domain:["number","input_number"]}}},{name:"buzzer_entity",label:"Inverter Buzzer / Beep Sound (Switch) [Optional]",selector:{entity:{domain:["switch","input_boolean"]}}},{name:"equalization_entity",label:"Battery Equalization Mode (Switch - Danger Zone)",selector:{entity:{domain:["switch","input_boolean"]}}}]},{name:"safety",type:"expandable",title:Ne("editor.safety_group",this.hass,e)||"🛡️ Safety & Diagnostics",schema:[{name:"fault_active_entity",label:"Fault Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"fault_code_entity",label:"Fault Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"fault_details_entity",label:"Fault Details Text [Optional]",selector:{entity:{domain:"sensor"}}},{name:"warnings_active_entity",label:"Warnings Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"warning_code_entity",label:"Warning Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"warning_details_entity",label:"Warning Details Text [Optional]",selector:{entity:{domain:"sensor"}}}]},{name:"daily_energy",type:"expandable",title:Ne("editor.energy_group",this.hass,e)||"📈 Daily Energy Counters",schema:[{name:"solar_energy_entity",label:"Daily Solar Production (PV kWh) [Optional]",selector:{entity:{domain:"sensor"}}},{name:"load_energy_entity",label:"Daily Home Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_import_entity",label:"Daily Grid Import (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_export_entity",label:"Daily Grid Export (kWh) [Optional]",selector:{entity:{domain:"sensor"}}},{name:"battery_charge_entity",label:"Daily Battery Charge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_entity",label:"Daily Battery Discharge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_daily_entity",label:"Daily Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"self_consumption_monthly_entity",label:"Monthly Inverter Self-Consumption (kWh)",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:Ne("editor.display_group",this.hass,e)||"🎨 Layout & Visualization Toggles",schema:[{name:"max_power",label:"Scale Max Power Rating (W)",selector:{number:{min:1e3,max:2e4,step:200,mode:"box"}}},{name:"use_log_flow_model",label:"Logarithmic flow animation speed model",selector:{boolean:{}}},{name:"compact_mode",label:"Compact layout mode (smaller padding & spacing)",selector:{boolean:{}}},{name:"show_header",label:"Show header bar with status chips",selector:{boolean:{}}},{name:"show_flow",label:"Show animated power flow diagram",selector:{boolean:{}}},{name:"show_solar",label:"Show solar generation (PV)",selector:{boolean:{}}},{name:"grid_position",label:"Grid position when solar is hidden",selector:{select:{options:[{value:"bottom",label:"Bottom (Default)"},{value:"top",label:"Top (Replaces solar)"}]}}},{name:"show_params",label:"Show electrical telemetry parameters",selector:{boolean:{}}},{name:"show_bms",label:"Show Battery Bank & BMS section",selector:{boolean:{}}},{name:"show_controls",label:"Show inverter controls & settings",selector:{boolean:{}}},{name:"show_energy",label:"Show daily energy statistics",selector:{boolean:{}}},{name:"show_alerts",label:"Show diagnostic alerts & warnings",selector:{boolean:{}}}]}]}static{this.styles=o`
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
    `:U``}};e([he({attribute:!1})],rt.prototype,"hass",void 0),e([_e()],rt.prototype,"_config",void 0),rt=e([pe("aninerel-power-card-editor")],rt);var at=Object.freeze({__proto__:null,get AninerelPowerCardEditor(){return rt}});export{it as AninerelPowerCard};
