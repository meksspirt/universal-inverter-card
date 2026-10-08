function e(e,t,i,r){var a,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(o<3?a(n):o>3?a(t,i,n):a(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},s=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,u=globalThis,_=u.trustedTypes,y=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,b=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),a=t.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=r;const o=a.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,a){if(void 0!==e){const o=this.constructor;if(!1===r&&(a=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,C=e=>e,k=$.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,N=`<${M}>`,B=document,P=()=>B.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,I="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,z=/>/g,F=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,V=/"/g,H=/^(?:script|style|textarea|title)$/i,W=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),U=W(1),q=W(2),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,K=B.createTreeWalker(B,129);function Z(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,r=[];let a,o=2===t?"<svg>":3===t?"<math>":"",n=L;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===L?"!--"===l[1]?n=D:void 0!==l[1]?n=z:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=F):void 0!==l[3]&&(n=F):n===F?">"===l[0]?(n=a??L,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?F:'"'===l[3]?V:R):n===V||n===R?n=F:n===D||n===z?n=L:(n=F,a=void 0);const p=n===F&&e[t+1].startsWith("/>")?" ":"";o+=n===L?i+N:c>=0?(r.push(s),i.slice(0,c)+A+i.slice(c)+E+p):i+E+(-2===c?t:p)}return[Z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class X{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,o=0;const n=e.length-1,s=this.parts,[l,c]=J(e,t);if(this.el=X.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(A)){const t=c[o++],i=r.getAttribute(e).split(E),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?re:"?"===n[1]?ae:"@"===n[1]?oe:ie}),r.removeAttribute(e)}else e.startsWith(E)&&(s.push({type:6,index:a}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],P()),K.nextNode(),s.push({type:2,index:++a});r.append(e[t],P())}}}else if(8===r.nodeType)if(r.data===M)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)s.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const i=B.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,r){if(t===j)return t;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(t=Q(e,a._$AS(e,t.values),a,r)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??B).importNode(t,!0);K.currentNode=r;let a=K.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new te(a,a.nextSibling,this,e):1===s.type?t=new s.ctor(a,s.name,s.strings,this,e):6===s.type&&(t=new ne(a,this,e)),this._$AV.push(t),s=i[++n]}o!==s?.index&&(a=K.nextNode(),o++)}return K.currentNode=B,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new ee(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new X(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new te(this.O(P()),this.O(P()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,r){const a=this.strings;let o=!1;if(void 0===a)e=Q(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{const r=e;let n,s;for(e=a[0],n=0;n<a.length-1;n++)s=Q(this,r[i+n],t,n),s===j&&(s=this._$AH[n]),o||=!O(s)||s!==this._$AH[n],s===G?e=G:e!==G&&(e+=(s??"")+a[n+1]),this._$AH[n]=s}o&&!r&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class oe extends ie{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===j)return;const i=this._$AH,r=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==G&&(i===G||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const se=$.litHtmlPolyfillSupport;se?.(X,te),($.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ce extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let a=r._$litPart$;if(void 0===a){const e=i?.renderBefore??null;r._$litPart$=a=new te(t.insertBefore(P(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ce._$litElement$=!0,ce.finalized=!0,le.litElementHydrateSupport?.({LitElement:ce});const de=le.litElementPolyfillSupport;de?.({LitElement:ce}),(le.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},ge=(e=he,t,i)=>{const{kind:r,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,a,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];t.call(this,i),this.requestUpdate(r,a,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ue({...e,state:!0,attribute:!1})}const ye="aninerel-power-card",me={title:"Aninerel ANL 4200T",max_power:4200,inverter_capacity:4200,min_flow_rate:.75,max_flow_rate:6,use_log_flow_model:!0,show_header:!0,show_flow:!0,show_solar:!1,grid_position:"bottom",show_params:!0,show_bms:!0,show_controls:!0,show_energy:!0,show_alerts:!0,compact_mode:!1},be="var(--energy-solar-color, #F59E0B)",fe="var(--energy-battery-in-color, #10B981)",ve="var(--energy-battery-out-color, #FF9800)",xe="var(--energy-grid-consumption-color, #4285F4)",we="var(--energy-grid-return-color, #2ecc71)",$e="var(--primary-text-color, #E0E0E0)",Ce={type:"custom:aninerel-power-card",title:"Aninerel ANL 4200T",show_solar:!1,entities:{battery_power:"sensor.aninerel_anl_4200t_24l_w_pro_battery_power",grid_power:"sensor.aninerel_anl_4200t_24l_w_pro_grid_power",load_power:"sensor.aninerel_anl_4200t_24l_w_pro_load_power"},battery_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage",battery_current_entity:"sensor.aninerel_anl_4200t_24l_w_pro_battery_current",grid_voltage_entity:"sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage",operating_mode_entity:"sensor.aninerel_anl_4200t_24l_w_pro_operating_mode",charging_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active",inverter_temperature_entity:"sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature",bms:{soc_entity:"sensor.redodo_battery_state_of_charge",cell_count:8,cell_voltage_prefix:"sensor.redodo_battery_cell_voltage_"},controls:{charge_source_entity:"select.aninerel_anl_4200t_24l_w_pro_charge_source_priority",output_priority_entity:"select.aninerel_anl_4200t_24l_w_pro_output_source_priority",max_charge_current_entity:"number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current",bulk_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage",float_voltage_entity:"number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage",equalization_entity:"switch.aninerel_anl_4200t_24l_w_pro_battery_equalization"},safety:{fault_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active",fault_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_fault_code",warnings_active_entity:"binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active",warning_code_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_code",warning_details_entity:"sensor.aninerel_anl_4200t_24l_w_pro_warning_details"},daily_energy:{load_energy_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today",grid_import_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today",battery_charge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today",battery_discharge_entity:"sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today"}},ke=n`
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
`;function Se(e,t=1){return Math.abs(e)>=1e3?`${(e/1e3).toFixed(t)} kW`:`${Math.round(e)} W`}function Ae(e){const{config:t,hasSolar:i=!1,gridPosition:r="bottom",solarWatts:a=0,batteryWatts:o,gridWatts:n,loadWatts:s,batterySoc:l,operatingMode:c,isFault:d,onNodeClick:p}=e,h=t.max_power||4200,g=!1!==t.use_log_flow_model,u=t.min_flow_rate||.75,_=t.max_flow_rate||5,y=function(e=!1,t="bottom"){return e?{viewBoxHeight:360,aspectRatio:"500 / 360",tracks:["M 250 82 L 250 140","M 116 175 L 216 175","M 284 175 L 388 175","M 250 210 L 250 274"],nodes:{solar:{x:250,y:44,radius:34},inverter:{x:250,y:175,radius:32},battery:{x:74,y:175,radius:40},home:{x:426,y:175,radius:36},grid:{x:250,y:308,radius:34}}}:"top"===t?{viewBoxHeight:290,aspectRatio:"500 / 290",tracks:["M 250 115 L 250 163","M 116 195 L 216 195","M 284 195 L 388 195"],nodes:{grid:{x:250,y:65,radius:34},inverter:{x:250,y:195,radius:32},battery:{x:74,y:195,radius:40},home:{x:426,y:195,radius:36}}}:{viewBoxHeight:290,aspectRatio:"500 / 290",tracks:["M 116 90 L 216 90","M 284 90 L 388 90","M 250 145 L 250 191"],nodes:{battery:{x:74,y:90,radius:40},inverter:{x:250,y:90,radius:32},home:{x:426,y:90,radius:36},grid:{x:250,y:225,radius:34}}}}(i,r),{viewBoxHeight:m}=y,{solar:b,inverter:f,battery:v,home:x,grid:w}=y.nodes,$=function(e,t,i,r,a,o=!1,n="bottom"){const s=[],l=a?.solar||be,c=a?.battery_charge||fe,d=a?.battery_discharge||ve,p=a?.grid_import||xe,h=a?.grid_export||we,g=a?.home||$e;if(o){const t=Math.max(0,e);t>=5&&s.push({id:"flow-solar-inverter",d:"M 250 82 L 250 140",watts:t,color:l,reversed:!1})}let u="M 116 175 L 216 175",_="M 284 175 L 388 175",y="M 250 210 L 250 274",m=!0;o||("top"===n?(u="M 116 195 L 216 195",_="M 284 195 L 388 195",y="M 250 115 L 250 163",m=!1):(u="M 116 90 L 216 90",_="M 284 90 L 388 90",y="M 250 145 L 250 191",m=!0));const b=Math.max(0,r);b>=5&&s.push({id:"flow-inverter-home",d:_,watts:b,color:g,reversed:!1});const f=Math.abs(t);if(f>=5){const e=t>0;s.push({id:"flow-battery-inverter",d:u,watts:f,color:e?c:d,reversed:e})}const v=Math.abs(i);if(v>=5){const e=i>0;s.push({id:"flow-grid-inverter",d:y,watts:v,color:e?p:h,reversed:e?m:!m})}return s}(a,o,n,s,t.colors,i,r),C=Math.max(0,Math.min(100,isNaN(l)?0:l)),k=2*Math.PI*32,S=k*(1-C/100),A=C>50?"#10b981":C>20?"#f59e0b":"#ef4444",E=o>20?"Charge":o<-20?"Discharge":"Standby";return U`
    <div
      class="power-flow-container ${i?"with-solar":"no-solar"}"
      style="--flow-aspect-ratio: 500 / ${m};"
    >
      <!-- 1. Background Pipelines and Animated Energy Flows -->
      <svg class="flow-svg" viewBox="0 0 500 ${m}" preserveAspectRatio="xMidYMid meet">
        <!-- Static background wire tracks with clean clearance -->
        ${y.tracks.map(e=>q`<path class="pipe-track" d="${e}" />`)}

        <!-- Active animated flow lines -->
        ${$.map(e=>{const t=function(e,t=4200,i=.75,r=5,a=!0){const o=Math.abs(e);if(o<5)return 0;const n=Math.min(o,t);let s;s=a?Math.log10(n+1)/Math.log10(t+1):n/t;const l=r-s*(r-i);return Math.max(i,Math.min(r,Number(l.toFixed(2))))}(e.watts,h,u,_,g),i=function(e,t=4200){const i=Math.min(Math.abs(e)/t,1);return Number((2.8+2.7*i).toFixed(1))}(e.watts,h);return q`
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
        ${i&&b?U`
              <div
                class="flow-node node-solar"
                style="left: ${b.x/500*100}%; top: ${b.y/m*100}%;"
                @click=${()=>p(t.entities?.solar_power)}
                title="Solar Generation"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <span class="node-value">${Se(a)}</span>
                <span class="node-label">Solar</span>
              </div>
            `:""}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${v.x/500*100}%; top: ${v.y/m*100}%;"
          @click=${()=>p(t.bms?.soc_entity||t.entities?.battery_power)}
          title="Battery Storage"
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
                stroke="${A}"
                stroke-dasharray="${k}"
                stroke-dashoffset="${S}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${o>20?"mdi:battery-charging":C>80?"mdi:battery-high":C>30?"mdi:battery-medium":"mdi:battery-low"}"
                style="color: ${A};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${A};">
                ${C}%
              </span>
            </div>
          </div>
          <span class="node-value" style="color: ${A};">
            ${Se(Math.abs(o))}
          </span>
          <span class="node-label">${E}</span>
        </div>

        <!-- CENTRAL INVERTER NODE -->
        <div
          class="flow-node node-inverter"
          style="left: ${f.x/500*100}%; top: ${f.y/m*100}%;"
          @click=${()=>p(t.operating_mode_entity)}
          title="Inverter Status"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span
              class="inverter-status-dot"
              style="background: ${d?"#ef4444":"#10b981"}; box-shadow: 0 0 6px ${d?"#ef4444":"#10b981"};"
            ></span>
          </div>
          <span class="node-value">${c||"Inverter"}</span>
          <span class="node-label">4.2 kW</span>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${x.x/500*100}%; top: ${x.y/m*100}%;"
          @click=${()=>p(t.entities?.load_power)}
          title="Home Consumption"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <span class="node-value">${Se(s)}</span>
          <span class="node-label">Home</span>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${w.x/500*100}%; top: ${w.y/m*100}%;"
          @click=${()=>p(t.entities?.grid_power)}
          title="Power Grid"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
          </div>
          <span class="node-value">${Se(Math.abs(n))}</span>
          <span class="node-label">
            ${n>20?"Import":n<-20?"Export":"Grid"}
          </span>
        </div>
      </div>
    </div>
  `}function Ee(e,t,i=1,r="spark"){if(!e||e.length<2)return U`<div class="sparkline-placeholder"></div>`;const a=Math.min(...e),o=Math.max(...e);let n=a,s=o;if(o-a<i){const e=(a+o)/2;n=e-i/2,s=e+i/2}const l=s-n||1,c=e.map((t,i)=>{const r=i/(e.length-1)*110,a=23-(Math.max(n,Math.min(s,t))-n)/l*20;return{x:Number(r.toFixed(1)),y:Number(a.toFixed(1))}}),d=c.map(e=>`${e.x},${e.y}`).join(" "),p=`spark-grad-${r}`;return q`
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
  `}function Me(e){const{config:t,hasSolar:i=!1,batteryVoltage:r,batteryCurrent:a,gridVoltage:o,batterySoc:n,gridImportEnergyToday:s,loadEnergyToday:l,batteryDischargeEnergyToday:c,inverterLoadPercent:d,historyMap:p,onParamClick:h}=e;let g="#10b981";null===r||isNaN(r)||(r<24||r>29?g="#ef4444":r<25.6&&(g="#f59e0b"));let u="#4285f4",_="Normal";null===o||isNaN(o)||(o<190||o>255?(u="#ef4444",_=o<190?"Low (Sag)":"High (Surge)"):(o<210||o>245)&&(u="#f59e0b",_="Deviated"));const y=t.kpi_mode&&"auto"!==t.kpi_mode?t.kpi_mode:i?"self_sufficiency":"battery_soc";let m="Battery SoC",b="Battery State of Charge",f="mdi:battery-heart-variant",v=0,x="#10b981",w=t.kpi_entity||t.bms?.soc_entity||t.bms?.battery_1?.soc_entity||t.bms?.bat1_soc_entity||t.battery_voltage_entity;if("battery_soc"===y)m="Battery SoC",b="Battery State of Charge",f=a&&a>.5?"mdi:battery-charging-high":"mdi:battery-heart-variant",v=null==n||isNaN(n)?0:Math.max(0,Math.min(100,Math.round(n))),x=v>=75?"#10b981":v>=30?"#f59e0b":"#ef4444";else if("battery_autonomy"===y)m="Battery Autonomy",b="Daily Load Powered by Battery",f="mdi:shield-battery-outline",w=t.kpi_entity||t.daily_energy?.battery_discharge_entity||t.daily_energy?.load_energy_entity,v=0,null!==l&&l>0&&null!=c&&(v=Math.max(0,Math.min(100,Math.round(Math.max(0,c)/l*100)))),x=v>=75?"#10b981":v>=30?"#f59e0b":"#ef4444";else if("inverter_load"===y)m="Inverter Load",b="Current Inverter Load %",f="mdi:gauge",w=t.kpi_entity||t.entities?.load_power,v=null==d||isNaN(d)?0:Math.max(0,Math.min(100,Math.round(d))),x=v<60?"#10b981":v<85?"#f59e0b":"#ef4444";else{if(m="Self-Sufficiency",b="Daily Solar Self-Sufficiency",f=i?"mdi:shield-sun":"mdi:shield-battery-outline",w=t.kpi_entity||t.daily_energy?.grid_import_entity,v=100,null!==l&&l>0){const e=null!==s?Math.max(0,s):0;v=Math.max(0,Math.min(100,Math.round(100*(1-e/l))))}x=v>=75?"#10b981":v>=40?"#f59e0b":"#ef4444"}const $=p.get("battery_voltage")||[],C=p.get("grid_voltage")||[];return U`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(t.battery_voltage_entity)}
        title="Battery Telemetry"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">Battery DC</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${g}">
            ${null===r||isNaN(r)?"N/A":`${r.toFixed(1)}V`}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${a&&a>0?"#10b981":"#f59e0b"}">
            ${null===a||isNaN(a)?"N/A":`${a>0?"+":""}${a.toFixed(1)}A`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Ee($,g,1.5,"bat")}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${()=>h(t.grid_voltage_entity)}
        title="Grid AC Voltage"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">Grid AC</span>
          <span class="param-badge" style="background: ${u}22; color: ${u}">
            ${_}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${u}">
            ${null===o||isNaN(o)?"N/A":`${Math.round(o)}V`}
          </span>
        </div>
        <div class="param-chart-box">
          ${Ee(C,u,20,"grid")}
        </div>
      </div>

      <!-- TILE 3: KPI (BATTERY SOC / SELF-SUFFICIENCY / AUTONOMY / LOAD) -->
      <div
        class="param-tile"
        @click=${()=>h(w)}
        title="${b}"
      >
        <div class="param-header">
          <ha-icon icon="${f}"></ha-icon>
          <span class="param-title">${m}</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${x}">
            ${v}%
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
  `}(v,x)}
          </div>
        </div>
      </div>
    </div>
  `}function Ne(e){const{dailyConfig:t,loadEnergy:i,gridImportEnergy:r,batteryChargeEnergy:a,batteryDischargeEnergy:o,onEnergyClick:n}=e,s=null!==i?Math.max(0,i):0,l=null!==r?Math.max(0,r):0,c=null!==a?Math.max(0,a):0,d=null!==o?Math.max(0,o):0,p=Math.max(s,l,c,d,.1),h=[{id:t.load_energy_entity,label:"Home Consumption",value:s,color:"#e2e8f0",icon:"mdi:home-lightning-bolt",pct:s>0?100:0},{id:t.grid_import_entity,label:"Grid Import",value:l,color:"#4285f4",icon:"mdi:transmission-tower",pct:s>0?Math.round(l/s*100):0},{id:t.battery_charge_entity,label:"Battery Charged",value:c,color:"#10b981",icon:"mdi:battery-plus-variant",pct:s>0?Math.round(c/s*100):0},{id:t.battery_discharge_entity,label:"Battery Discharged",value:d,color:"#f59e0b",icon:"mdi:battery-minus-variant",pct:s>0?Math.round(d/s*100):0}];return U`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>Daily Energy Balance</span>
        </div>
        <span class="energy-total-pill">Total: ${function(e,t=1){return null==e||isNaN(e)?"0.0 kWh":`${e.toFixed(t)} kWh`}(s)}</span>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${h.map(e=>{const t=Math.max(3,Math.min(100,Math.round(e.value/p*100)));return U`
            <div
              class="energy-row"
              @click=${()=>n(e.id)}
              title="${e.label}: ${e.value.toFixed(2)} kWh"
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
                  ${e.value.toFixed(1)} <small>kWh</small>
                </span>
                ${e.pct>0&&100!==e.pct?U`<span class="energy-pct">(${e.pct}%)</span>`:""}
              </div>
            </div>
          `})}
      </div>
    </div>
  `}const Be={0:{code:0,title:"Normal",description:"Inverter is operating normally. No faults detected.",recommendation:"System is functioning properly.",severity:"info"},1:{code:1,title:"Fan Locked",description:"Cooling fan is locked or stopped by an obstruction.",recommendation:"Inspect cooling vents, remove dust or foreign objects from fans.",severity:"critical"},2:{code:2,title:"Inverter Over-Temperature",description:"Internal heatsink temperature exceeded the safe operating limit (>100°C).",recommendation:"Ensure adequate ventilation, reduce inverter load and allow it to cool down.",severity:"critical"},3:{code:3,title:"Battery Over-Voltage",description:"Battery terminal voltage exceeded the maximum safety threshold.",recommendation:"Verify Bulk/Float charging voltage settings and BMS parameters.",severity:"critical"},4:{code:4,title:"Battery Under-Voltage (Critical Discharge)",description:"Battery voltage dropped below the critical cut-off protection threshold.",recommendation:"Connect AC grid power to charge the battery or shed heavy loads.",severity:"warning"},5:{code:5,title:"Output Short Circuit",description:"Short circuit or extreme over-current detected on the AC output circuit.",recommendation:"Immediately disconnect AC load breakers and resolve short circuits in wiring or appliances.",severity:"critical"},6:{code:6,title:"Output Voltage Too High",description:"Inverter AC output voltage exceeded the safe operating range (>260V).",recommendation:"Disconnect sensitive appliances, restart inverter. If error persists, service is required.",severity:"critical"},7:{code:7,title:"Overload Time-Out",description:"Connected load exceeded rated inverter power longer than allowed duration.",recommendation:"Disconnect high-power loads (heaters, water heaters, kettles).",severity:"warning"},8:{code:8,title:"DC Bus Over-Voltage",description:"Internal DC bus voltage exceeded the maximum safety limit.",recommendation:"Restart inverter. If issue persists, check solar panel array Voc specifications.",severity:"critical"},9:{code:9,title:"DC Bus Soft-Start Failed",description:"High-voltage DC bus pre-charge circuit failed during startup.",recommendation:"Check battery and PV input voltages, then restart the inverter.",severity:"critical"},10:{code:10,title:"PV Over-Current",description:"Solar array input current exceeded MPPT controller maximum rating.",recommendation:"Verify solar string configuration and parallel panel wiring.",severity:"critical"},11:{code:11,title:"PV Over-Voltage",description:"Solar panel open-circuit voltage (Voc) exceeded the maximum MPPT limit.",recommendation:"Immediately disconnect solar input, reduce number of panels in series.",severity:"critical"},12:{code:12,title:"DC-DC Converter Over-Current",description:"Over-current detected in the battery DC-DC converter stage.",recommendation:"Check battery cable integrity, terminal torque, and eliminate surge loads.",severity:"critical"},13:{code:13,title:"Inverter Current Surge",description:"Hardware protection triggered due to sudden current spike or inrush surge.",recommendation:"Avoid simultaneous starting of heavy inductive loads (motors, pumps, compressors).",severity:"critical"},14:{code:14,title:"DC Bus Under-Voltage",description:"DC bus voltage dropped below minimum required operating level.",recommendation:"Check battery health under load and AC grid input stability.",severity:"warning"},51:{code:51,title:"Inverter Over-Current",description:"Hardware over-current protection triggered on power bridge transistors (IGBT/MOSFET).",recommendation:"Disconnect devices with high inrush currents, power cycle the inverter.",severity:"critical"},52:{code:52,title:"DC Bus Voltage Low",description:"DC bus voltage dropped sharply below 230V generation threshold.",recommendation:"Inspect battery condition, terminal connections, and cable lugs.",severity:"warning"},53:{code:53,title:"Inverter Soft-Start Failed",description:"Failed to establish smooth AC output waveform during startup.",recommendation:"Disconnect all AC output loads before powering on the inverter.",severity:"critical"},55:{code:55,title:"DC Voltage on AC Output",description:"Dangerous DC voltage component detected on the 230V AC output.",recommendation:"Hazardous to transformers and motors! Immediately disconnect loads and contact service.",severity:"critical"},56:{code:56,title:"Battery Connection Open",description:"Inverter did not detect a connected battery during operation.",recommendation:"Check battery breaker, DC fuse, and terminal connections.",severity:"critical"},57:{code:57,title:"Current Sensor Failed",description:"Internal current measurement sensor (Hall sensor) communication or calibration failure.",recommendation:"Restart the inverter. If error persists, main control board repair is needed.",severity:"critical"},58:{code:58,title:"Output Voltage Too Low",description:"Inverter cannot maintain 230V AC output (voltage dropped below 190V) due to overload.",recommendation:"Reduce load on the inverter.",severity:"warning"},59:{code:59,title:"Control Board Communication Error",description:"Internal communication loss between control board and power module.",recommendation:"Restart the inverter. If error persists, inspect internal ribbon cables.",severity:"critical"},60:{code:60,title:"Grid Feedback / Sync Error",description:"Reverse power flow detected or grid synchronization failed during bypass switch.",recommendation:"Verify AC grid input parameters and phase polarity.",severity:"warning"},71:{code:71,title:"Firmware / BMS Incompatibility",description:"Firmware version mismatch or lost communication with lithium battery BMS.",recommendation:"Check BMS communication cable and selected battery protocol settings.",severity:"critical"},72:{code:72,title:"BMS Critical Error",description:"Battery Management System triggered an emergency protection signal.",recommendation:"Check battery health and error logs in the BMS app.",severity:"critical"},80:{code:80,title:"Parallel CAN Bus Fault",description:"Lost communication over CAN bus between parallel inverters.",recommendation:"Check parallel communication cables and bus termination resistors.",severity:"critical"},81:{code:81,title:"Host Loss in Parallel System",description:"Follower inverter lost communication with Master unit.",recommendation:"Check power and state of the Master inverter and cable connections.",severity:"critical"},82:{code:82,title:"AC Phase Sync Loss",description:"Parallel inverters failed to synchronize AC output phases.",recommendation:"Ensure simultaneous AC grid connection to all parallel units.",severity:"critical"}},Pe={0:{title:"No Warnings",description:"System operating normally without warnings."},1:{title:"Fan Slowed / Locked",description:"Cooling fan operating at low speed or dust accumulated."},2:{title:"Inverter High Temperature",description:"Heatsink temperature elevated, fans running at maximum speed."},3:{title:"Battery Over-Charged",description:"Battery voltage close to high cut-off threshold."},4:{title:"Low Battery Voltage",description:"Battery voltage below warning threshold (recharge recommended)."},7:{title:"Overload Warning",description:"Home consumption approaching rated inverter limit (4.2 kW)."},8:{title:"Battery Disconnected",description:"Battery circuit open or battery not detected."},10:{title:"Output Power Derating",description:"Inverter automatically derating power to prevent overheating."},12:{title:"Solar Charger Stopped: Low Battery",description:"MPPT charger suspended due to deep battery discharge."},13:{title:"Solar Charger Stopped: High PV Voltage",description:"Solar array voltage exceeded safe operating range of MPPT.",isPvRelated:!0},14:{title:"Solar Charger Stopped: Overload / Fan",description:"Solar charger derated or stopped due to overload or fan speed drop."},15:{title:"PV Energy Weak",description:"Solar voltage below MPPT operating threshold (dusk, night, or panels not connected).",isPvRelated:!0},16:{title:"Parallel / Grid Comm Fault",description:"Synchronization error between units or unstable AC line."},19:{title:"Lithium Battery Comm Failure",description:"Lost data telemetry with lithium battery protocol."},20:{title:"BMS Communication Lost",description:"No response from battery BMS over CAN/RS485 cable."},21:{title:"Lithium Battery Over-Current",description:"Current through battery exceeded BMS protection threshold."},32:{title:"Communication Board / EEPROM Warning",description:"Internal communication bus or EEPROM memory warning."},61:{title:"Battery Discharge Over-Current",description:"Battery discharge current exceeded rated parameter."},62:{title:"Battery Charge Over-Current",description:"Total charge current from grid and solar exceeded battery limit."},63:{title:"Battery Over-Temperature",description:"Battery cell temperature probe exceeded safety threshold."},64:{title:"PV Low Voltage",description:"Solar array voltage below MPPT operating threshold (panels not connected or overcast).",isPvRelated:!0},65:{title:"Battery Under-Temperature",description:"Battery temperature too low for charging (LiFePO4 risk below 0°C)."},67:{title:"Critical Battery Under-Voltage",description:"Battery voltage approaching inverter shutdown threshold."},68:{title:"Charge Stopped: High Battery Temp",description:"Charging halted automatically due to battery overheating."},69:{title:"Charge Stopped: Low Battery Temp",description:"Charging halted to protect battery cells from freezing."},70:{title:"Discharge Stopped: High Battery Temp",description:"Discharging halted to protect cells from thermal stress."},72:{title:"Lithium Battery Comm Lost",description:"Inverter is not receiving telemetry from lithium battery."},73:{title:"BMS Protection Active",description:"Battery built-in BMS entered protection mode."}},Oe=[{bit:0,mask:1,code:1,title:"W01: Fan Slowed",description:"Cooling fan operating at reduced speed or blocked by dust."},{bit:1,mask:2,code:2,title:"W02: Inverter Over-Temperature",description:"Internal heatsink temperature is elevated."},{bit:2,mask:4,code:4,title:"W04: Low Battery Voltage",description:"Battery voltage has dropped below warning threshold."},{bit:3,mask:8,code:8,title:"W08: Battery Disconnected",description:"Battery circuit is open or battery is not detected."},{bit:4,mask:16,code:7,title:"W07: Overload Warning",description:"Home consumption is approaching rated inverter power (4.2 kW)."},{bit:5,mask:32,code:32,title:"W32: Comm Board / EEPROM Error",description:"Internal communication bus or configuration memory failure."},{bit:6,mask:64,code:64,title:"W64: PV Low Voltage",description:"Solar array voltage below MPPT startup range (panels not connected or overcast).",isPvRelated:!0},{bit:7,mask:128,code:53,title:"Inverter Soft-Start Warning",description:"Inverter bridge soft-start pre-charge warning."},{bit:8,mask:256,code:55,title:"DC Voltage on AC Output",description:"DC voltage component detected on the 230V AC output."},{bit:9,mask:512,code:56,title:"Battery Open Circuit",description:"Inverter detected open battery circuit during operation."},{bit:10,mask:1024,code:57,title:"Current Sensor Fault",description:"Inverter current sensor calibration deviation."},{bit:11,mask:2048,code:11,title:"MPPT Over-Current",description:"Solar input current exceeded MPPT controller limit.",isPvRelated:!0},{bit:12,mask:4096,code:12,title:"MPPT Over-Temperature",description:"Solar charger heatsink temperature is high.",isPvRelated:!0},{bit:13,mask:8192,code:13,title:"MPPT High Battery Voltage",description:"Solar charger detected high battery terminal voltage."},{bit:14,mask:16384,code:14,title:"MPPT Low Battery Voltage",description:"Battery voltage is too low for MPPT charger startup."},{bit:15,mask:32768,code:15,title:"AC Line Abnormal",description:"Utility grid AC voltage or frequency out of acceptable bounds."}];function Te(e){const{safetyConfig:t,isFault:i,faultCode:r,faultDetailsText:a,isWarning:o,warningCode:n,warningDetailsText:s,onAlertClick:l}=e;if(!i&&!o)return U``;const c=r??0,d=function(e,t){const i=Be[e];return i?t&&t!==i.title&&"N/A"!==t&&"0"!==t?{...i,description:`${i.description} (Inverter: ${t})`}:i:{code:e,title:t||`Fault Code F${e}`,description:t?`Inverter reports error: ${t}`:"Hardware or firmware fault detected by inverter.",recommendation:"Check inverter LCD display messages and documentation.",severity:"critical"}}(c,a),p=n??0,h=function(e,t){if(0===e||isNaN(e))return{title:"No Warnings",description:"Warnings are absent.",isBitmask:!1,isPv:!1};const i=Oe.filter(t=>0!==(e&t.mask));if(i.length>1){const e=i.map(e=>e.title).join("; "),r=i.map(e=>`${e.title}: ${e.description}`).join(" | "),a=i.some(e=>e.isPvRelated);return{title:e,description:t?`${r} (Status: ${t})`:r,isBitmask:!0,isPv:a}}const r=Pe[e];if(r)return{title:r.title,description:t&&t!==r.title?`${r.description} (Status: ${t})`:r.description,isBitmask:!1,isPv:!!r.isPvRelated};if(1===i.length){const e=i[0];return{title:e.title,description:t&&t!==e.title?`${e.description} (Status: ${t})`:e.description,isBitmask:!0,isPv:!!e.isPvRelated}}return{title:t||`Warning W${e}`,description:t?`Inverter reports: ${t}`:"Inverter reported an operational parameter deviation.",isBitmask:!1,isPv:64===e||15===e}}(p,s);return U`
    <div class="alert-section-wrapper">
      <!-- Critical Inverter Fault Banner -->
      ${i?U`
            <div
              class="alert-box alert-critical"
              @click=${()=>l(t.fault_details_entity||t.fault_code_entity||t.fault_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">FAULT F${c}</span>
                  <span class="alert-title">${d.title}</span>
                </div>
                <p class="alert-desc">${d.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${d.recommendation}</span>
                </div>
              </div>
            </div>
          `:""}

      <!-- Inverter Warning Banner -->
      ${o&&!i?U`
            <div
              class="alert-box alert-warn"
              @click=${()=>l(t.warning_details_entity||t.warning_code_entity||t.warnings_active_entity)}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">WARNING W${p}</span>
                  <span class="alert-title">${h.title}</span>
                </div>
                <p class="alert-desc">${h.description}</p>
              </div>
            </div>
          `:""}
    </div>
  `}console.info("%c  ANINEREL-POWER-CARD  %c  Version 1.1.1  ","color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;","color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;");let Ie=class extends ce{constructor(){super(...arguments),this._controlsExpanded=!1,this._historyMap=new Map,this._maxHistoryPoints=32,this._lastHistoryFetch=0,this._historyFetchInterval=9e5}static{this.styles=[ke]}setConfig(e){if(!e)throw new Error("Invalid card configuration");if(!e.entities)throw new Error('Required "entities" block is not defined in configuration');if(!e.entities.load_power)throw new Error("At least entities.load_power must be specified");this._config={...me,...e,entities:{...e.entities},bms:e.bms?{...e.bms}:void 0,controls:e.controls?{...e.controls}:void 0,safety:e.safety?{...e.safety}:void 0,daily_energy:e.daily_energy?{...e.daily_energy}:void 0,colors:e.colors?{...e.colors}:void 0}}set hass(e){const t=this._hass;this._hass=e,t||this._fetchHistory(),t&&!this._hasRelevantEntitiesChanged(t,e)||(this._updateHistoryBuffers(),this.requestUpdate())}get hass(){return this._hass}firstUpdated(){this._fetchHistory()}getCardSize(){return 14}getLayoutOptions(){return{grid_rows:14,grid_columns:4,grid_min_rows:8,grid_min_columns:2}}static getStubConfig(){return Ce}static async getConfigElement(){return await Promise.resolve().then(function(){return Fe}),document.createElement("aninerel-power-card-editor")}async _fetchHistory(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity,t=this._config.grid_voltage_entity,i=[];if(e&&i.push(e),t&&i.push(t),0===i.length)return;const r=Date.now();if(!(r-this._lastHistoryFetch<this._historyFetchInterval&&this._historyMap.size>0)){this._lastHistoryFetch=r;try{const a=new Date(r-864e5).toISOString();let o=null;if("function"==typeof this._hass.callWS)o=await this._hass.callWS({type:"history/history_during_period",start_time:a,entity_ids:i,minimal_response:!0,no_attributes:!0});else if("function"==typeof this._hass.callApi){const e=`history/period/${a}?filter_entity_id=${i.join(",")}&minimal_response&no_attributes`;o=await this._hass.callApi("GET",e)}if(o){if(e){const t=this._extractStateList(o,e),i=this._sampleHistoryPoints(t,this._maxHistoryPoints);i.length>0&&this._historyMap.set("battery_voltage",i)}if(t){const e=this._extractStateList(o,t),i=this._sampleHistoryPoints(e,this._maxHistoryPoints);i.length>0&&this._historyMap.set("grid_voltage",i)}this.requestUpdate()}}catch(e){console.warn("AninerelPowerCard: using live buffer for sparklines (history API unavailable):",e)}}}_extractStateList(e,t){if(!e)return[];if(e[t]&&Array.isArray(e[t]))return e[t];if(Array.isArray(e)){for(const i of e)if(Array.isArray(i)&&i.length>0){if(i[0]?.entity_id===t)return i}else if(i?.entity_id===t&&Array.isArray(i.states))return i.states;if(void 0!==e[0]?.state||void 0!==e[0]?.s)return e}return e.entity_id===t&&Array.isArray(e.states)?e.states:[]}_sampleHistoryPoints(e,t){if(!e||0===e.length)return[];const i=[];for(const t of e){const e=void 0!==t.s?t.s:t.state,r=parseFloat(e);!isNaN(r)&&isFinite(r)&&i.push(r)}if(0===i.length)return[];if(i.length<=t)return i;const r=[],a=(i.length-1)/(t-1);for(let e=0;e<t;e++)r.push(i[Math.min(Math.round(e*a),i.length-1)]);return r}_updateHistoryBuffers(){if(!this._config||!this._hass)return;const e=this._config.battery_voltage_entity||this._config.bms?.voltage_entity;if(e){const t=this._getNumber(e);null===t||isNaN(t)||this._pushHistory("battery_voltage",t)}if(this._config.grid_voltage_entity){const e=this._getNumber(this._config.grid_voltage_entity);null===e||isNaN(e)||this._pushHistory("grid_voltage",e)}}_pushHistory(e,t){const i=this._historyMap.get(e)||[];(0===i.length||Math.abs(i[i.length-1]-t)>.001)&&(i.push(t),i.length>this._maxHistoryPoints&&i.shift(),this._historyMap.set(e,i))}_hasRelevantEntitiesChanged(e,t){if(!this._config)return!0;const i=this._getMonitoredEntityIds();for(const r of i)if(e.states[r]!==t.states[r])return!0;return!1}_getMonitoredEntityIds(){const e=[];if(!this._config)return e;const{entities:t,bms:i,controls:r,safety:a,daily_energy:o}=this._config;if(t&&(t.solar_power&&e.push(t.solar_power),t.battery_power&&e.push(t.battery_power),t.grid_power&&e.push(t.grid_power),t.load_power&&e.push(t.load_power)),this._config.battery_voltage_entity&&e.push(this._config.battery_voltage_entity),this._config.battery_current_entity&&e.push(this._config.battery_current_entity),this._config.grid_voltage_entity&&e.push(this._config.grid_voltage_entity),this._config.operating_mode_entity&&e.push(this._config.operating_mode_entity),this._config.charging_active_entity&&e.push(this._config.charging_active_entity),this._config.inverter_temperature_entity&&e.push(this._config.inverter_temperature_entity),i){i.soc_entity&&e.push(i.soc_entity),i.voltage_entity&&e.push(i.voltage_entity),i.current_entity&&e.push(i.current_entity),i.temperature_entity&&e.push(i.temperature_entity),i.temperature_2_entity&&e.push(i.temperature_2_entity),i.cycle_count_entity&&e.push(i.cycle_count_entity),i.cell_delta_entity&&e.push(i.cell_delta_entity),i.remaining_capacity_entity&&e.push(i.remaining_capacity_entity),i.full_capacity_entity&&e.push(i.full_capacity_entity);const t=i.cell_count||8,r=i.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=t;i++)e.push(`${r}${i}`);if(i.bat1_soc_entity&&e.push(i.bat1_soc_entity),i.bat1_voltage_entity&&e.push(i.bat1_voltage_entity),i.bat1_temperature_entity&&e.push(i.bat1_temperature_entity),i.bat1_cell_prefix)for(let t=1;t<=4;t++)e.push(`${i.bat1_cell_prefix}${t}`);if(i.battery_1){const t=i.battery_1;if(t.soc_entity&&e.push(t.soc_entity),t.voltage_entity&&e.push(t.voltage_entity),t.temperature_entity&&e.push(t.temperature_entity),t.cell_voltage_prefix)for(let i=1;i<=(t.cell_count||4);i++)e.push(`${t.cell_voltage_prefix}${i}`)}if(i.bat2_soc_entity&&e.push(i.bat2_soc_entity),i.bat2_voltage_entity&&e.push(i.bat2_voltage_entity),i.bat2_temperature_entity&&e.push(i.bat2_temperature_entity),i.bat2_cell_prefix)for(let t=1;t<=4;t++)e.push(`${i.bat2_cell_prefix}${t}`);if(i.battery_2){const t=i.battery_2;if(t.soc_entity&&e.push(t.soc_entity),t.voltage_entity&&e.push(t.voltage_entity),t.temperature_entity&&e.push(t.temperature_entity),t.cell_voltage_prefix)for(let i=1;i<=(t.cell_count||4);i++)e.push(`${t.cell_voltage_prefix}${i}`)}}return r&&(r.charge_source_entity&&e.push(r.charge_source_entity),r.output_priority_entity&&e.push(r.output_priority_entity),r.max_charge_current_entity&&e.push(r.max_charge_current_entity),r.bulk_voltage_entity&&e.push(r.bulk_voltage_entity),r.float_voltage_entity&&e.push(r.float_voltage_entity),r.equalization_entity&&e.push(r.equalization_entity)),a&&(a.fault_active_entity&&e.push(a.fault_active_entity),a.fault_code_entity&&(e.push(a.fault_code_entity),e.push(a.fault_code_entity.replace(/_code$/,"_details"))),a.fault_details_entity&&e.push(a.fault_details_entity),a.warnings_active_entity&&e.push(a.warnings_active_entity),a.warning_code_entity&&(e.push(a.warning_code_entity),e.push(a.warning_code_entity.replace(/_code$/,"_details"))),a.warning_details_entity&&e.push(a.warning_details_entity)),o&&(o.load_energy_entity&&e.push(o.load_energy_entity),o.grid_import_entity&&e.push(o.grid_import_entity),o.battery_charge_entity&&e.push(o.battery_charge_entity),o.battery_discharge_entity&&e.push(o.battery_discharge_entity)),e.filter(Boolean)}_findMatchingEntity(e,t){if(!(e&&t&&this._hass&&this._hass.states))return;const i=e.replace(/_code$/,t.replace(/^_+/,"_"));return this._hass.states[i]?i:void 0}_getState(e){return e&&this._hass&&this._hass.states[e]?this._hass.states[e].state:"N/A"}_getNumber(e){if(!e||!this._hass||!this._hass.states[e])return 0;const t=parseFloat(this._hass.states[e].state);return isNaN(t)?0:t}_getOptions(e){return e&&this._hass&&this._hass.states[e]&&this._hass.states[e].attributes?.options||[]}_handleEntityClick(e){if(!e)return;const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}async _handleSelectOption(e,t){if(this._hass)try{await this._hass.callService("select","select_option",{entity_id:e,option:t})}catch(e){console.error("Failed to set option:",e)}}async _handleSetNumber(e,t){if(this._hass)try{await this._hass.callService("number","set_value",{entity_id:e,value:t})}catch(e){console.error("Failed to set number value:",e)}}async _handleToggleSwitch(e,t){if(this._hass)try{await this._hass.callService("switch",t?"turn_off":"turn_on",{entity_id:e})}catch(e){console.error("Failed to toggle switch:",e)}}render(){if(!this._config)return U``;const e=Boolean(this._config.show_solar&&this._config.entities.solar_power&&""!==this._config.entities.solar_power.trim()),t=e&&this._config.entities.solar_power?this._getNumber(this._config.entities.solar_power):0,i=this._getNumber(this._config.entities.battery_power),r=this._getNumber(this._config.entities.grid_power),a=this._getNumber(this._config.entities.load_power),o=this._config.battery_voltage_entity?this._getNumber(this._config.battery_voltage_entity):null,n=this._config.battery_current_entity?this._getNumber(this._config.battery_current_entity):null,s=this._config.grid_voltage_entity?this._getNumber(this._config.grid_voltage_entity):null;let l=this._config.bms?.soc_entity?this._getNumber(this._config.bms.soc_entity):0;(l<=0||isNaN(l))&&o&&o>=20?l=o>=27.2?100:o>=26.8?Math.round(80+(o-26.8)/.4*20):o>=26.4?Math.round(50+(o-26.4)/.4*30):o>=26?Math.round(20+(o-26)/.4*30):o>=24?Math.max(5,Math.round((o-24)/2*20)):5:l<=0&&(!o||o<20)&&(l=80);const c=this._getState(this._config.operating_mode_entity),d=this._config.inverter_temperature_entity?this._getNumber(this._config.inverter_temperature_entity):null,p="on"===this._getState(this._config.charging_active_entity),h="on"===this._getState(this._config.safety?.fault_active_entity),g=this._config.safety?.fault_code_entity?parseInt(this._getState(this._config.safety.fault_code_entity),10):null,u=this._config.safety?.fault_details_entity||this._findMatchingEntity(this._config.safety?.fault_code_entity,"_fault_details"),_=u?this._getState(u):null,y=_&&"N/A"!==_&&"0"!==_?_:null;let m="on"===this._getState(this._config.safety?.warnings_active_entity);const b=this._config.safety?.warning_code_entity?parseInt(this._getState(this._config.safety.warning_code_entity),10):null,f=this._config.safety?.warning_details_entity||this._findMatchingEntity(this._config.safety?.warning_code_entity,"_warning_details"),v=f?this._getState(f):null,x=v&&"N/A"!==v&&"0"!==v?v:null;let w=b;if(!e){const{effectiveCode:e,hasNonPvWarning:t}=function(e){if(null===e||0===e||isNaN(e))return{effectiveCode:null,hasNonPvWarning:!1};if(64===e||15===e||13===e)return{effectiveCode:null,hasNonPvWarning:!1};if(64&e){const t=-65&e;return 0===t?{effectiveCode:null,hasNonPvWarning:!1}:{effectiveCode:t,hasNonPvWarning:!0}}return{effectiveCode:e,hasNonPvWarning:!0}}(b);w=e,t||(m=!1)}const $=this._config.daily_energy?.grid_import_entity?this._getNumber(this._config.daily_energy.grid_import_entity):null,C=this._config.daily_energy?.load_energy_entity?this._getNumber(this._config.daily_energy.load_energy_entity):null,k=this._config.daily_energy?.battery_charge_entity?this._getNumber(this._config.daily_energy.battery_charge_entity):null,S=this._config.daily_energy?.battery_discharge_entity?this._getNumber(this._config.daily_energy.battery_discharge_entity):null,A=this._config.bms,E=Boolean(A?.dual_battery||A?.battery_1&&A?.battery_2||A?.bat1_soc_entity||A?.bat1_voltage_entity||A?.bat2_soc_entity||A?.bat2_voltage_entity);let M,N,B=[];if(A)if(E){const e=A.battery_1,t=A.battery_2,i=A.bat1_voltage_entity||e?.voltage_entity,r=A.bat2_voltage_entity||t?.voltage_entity,a=i?this._getNumber(i):o?Number((o/2).toFixed(2)):null,n=r?this._getNumber(r):o?Number((o/2).toFixed(2)):null,s=A.bat1_soc_entity||e?.soc_entity,c=A.bat2_soc_entity||t?.soc_entity,d=s?this._getNumber(s):l||null,p=c?this._getNumber(c):l||null,h=A.bat1_temperature_entity||e?.temperature_entity,g=A.bat2_temperature_entity||t?.temperature_entity,u=h?this._getNumber(h):null,_=g?this._getNumber(g):null,y=[],m=A.bat1_cell_prefix||e?.cell_voltage_prefix||"sensor.redodo_1_cell_voltage_",b=e?.cell_count||4;for(let e=1;e<=b;e++){let t=this._getNumber(`${m}${e}`);t>100&&(t/=1e3),t<=0&&a&&a>0&&(t=Number((a/b).toFixed(3))),y.push({index:e,voltage:t>0?t:3.38,rawEntityId:`${m}${e}`})}const f=[],v=A.bat2_cell_prefix||t?.cell_voltage_prefix||"sensor.redodo_2_cell_voltage_",x=t?.cell_count||4;for(let e=1;e<=x;e++){let t=this._getNumber(`${v}${e}`);t>100&&(t/=1e3),t<=0&&n&&n>0&&(t=Number((n/x).toFixed(3))),f.push({index:e+b,voltage:t>0?t:3.38,rawEntityId:`${v}${e}`})}M={name:A.bat1_name||e?.name||"Battery #1 (12V)",voltage:a,soc:d,temperature:u,cells:y},N={name:A.bat2_name||t?.name||"Battery #2 (12V)",voltage:n,soc:p,temperature:_,cells:f},null!==d&&null!==p&&d>0&&p>0&&(l=Math.min(d,p))}else{const e=A.cell_count||8,t=A.cell_voltage_prefix||"sensor.redodo_battery_cell_voltage_";for(let i=1;i<=e;i++){const r=`${t}${i}`;let a=this._getNumber(r);a>100&&(a/=1e3),a<=0&&o&&o>0&&(a=Number((o/e).toFixed(3))),B.push({index:i,voltage:a>0?a:3.33,rawEntityId:r})}}const P=this._config.controls,O=this._config.safety,T=this._config.daily_energy;return U`
      <ha-card>
        <!-- 1. Header Bar with live status chips -->
        ${!1!==this._config.show_header?function(e){const{config:t,hasSolar:i=!1,operatingMode:r,temperature:a,isCharging:o,isFault:n,faultCode:s,isWarning:l,warningCode:c,onChipClick:d}=e,p=r?r.toLowerCase():"";let h="#10b981",g="mdi:battery-charging-60";p.includes("mains")||p.includes("line")||p.includes("grid")?(h="#3b82f6",g="mdi:transmission-tower"):p.includes("bypass")?(h="#ef4444",g="mdi:transit-connection-variant"):p.includes("battery")&&(h="#10b981",g="mdi:battery-outline");let u="#10b981";null===a||isNaN(a)||(a>55?u="#ef4444":a>42&&(u="#f59e0b"));const _=i?"mdi:solar-power-variant-outline":"mdi:home-battery-outline",y=i?"Hybrid 24V 4.2kW Inverter":"24V 4.2kW UPS Inverter";return U`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="${t.icon||_}"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${t.title||"Aninerel ANL 4200T"}</span>
          <span class="header-subtitle">${t.subtitle||y}</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${r&&"N/A"!==r?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${h}"
                @click=${()=>d(t.operating_mode_entity)}
                title="Inverter operating mode"
              >
                <ha-icon .icon=${g}></ha-icon>
                <span>${r}</span>
              </button>
            `:""}

        <!-- Inverter Temperature Chip -->
        ${null===a||isNaN(a)?"":U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${u}"
                @click=${()=>d(t.inverter_temperature_entity)}
                title="Inverter power unit temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(a)}°C</span>
              </button>
            `}

        <!-- Charging Active Flag -->
        ${o?U`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${()=>d(t.charging_active_entity)}
                title="Charging active"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>CHG</span>
              </button>
            `:""}

        <!-- Fault Active Chip -->
        ${n?U`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${()=>d(t.safety?.fault_code_entity||t.safety?.fault_active_entity)}
                title="Inverter fault status"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${s?`F${s}`:"FAULT"}</span>
              </button>
            `:""}

        <!-- Warnings Active Chip -->
        ${l&&!n?U`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${()=>d(t.safety?.warning_code_entity||t.safety?.warnings_active_entity)}
                title="Inverter warning"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${c?`W${c}`:"WARN"}</span>
              </button>
            `:""}

        <!-- System Normal Chip -->
        ${n||l?"":U`
              <div class="status-chip chip-ok" title="System normal">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>OK</span>
              </div>
            `}
      </div>
    </div>
  `}({config:this._config,hasSolar:e,operatingMode:c,temperature:d,isCharging:p,isFault:h,faultCode:g,isWarning:m,warningCode:w,onChipClick:e=>this._handleEntityClick(e)}):""}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if any faults/warnings) -->
        ${!1!==this._config.show_alerts&&O?Te({safetyConfig:O,isFault:h,faultCode:g,faultDetailsText:y,isWarning:m,warningCode:w,warningDetailsText:x,onAlertClick:e=>this._handleEntityClick(e)}):""}

        <!-- 3. Power Flow Animated Diagram -->
        ${!1!==this._config.show_flow?Ae({hass:this._hass,config:this._config,hasSolar:e,gridPosition:this._config.grid_position||"bottom",solarWatts:t,batteryWatts:i,gridWatts:r,loadWatts:a,batterySoc:l,operatingMode:"N/A"!==c?c:"Inverter",isFault:h,onNodeClick:e=>this._handleEntityClick(e)}):""}

        <!-- 4. Electrical Telemetry & Battery SoC / Self-Sufficiency KPI -->
        ${!1!==this._config.show_params?Me({config:this._config,hasSolar:e,batteryVoltage:o,batteryCurrent:n,gridVoltage:s,batterySoc:l,gridImportEnergyToday:$,loadEnergyToday:C,batteryDischargeEnergyToday:S,inverterLoadPercent:this._config.inverter_load_percent_entity?this._getNumber(this._config.inverter_load_percent_entity):this._getNumber("sensor.aninerel_anl_4200t_24l_w_pro_load_percent"),historyMap:this._historyMap,onParamClick:e=>this._handleEntityClick(e)}):""}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing (Single or Dual Battery Series) -->
        ${!1!==this._config.show_bms&&A?function(e){const{bmsConfig:t,soc:i,temperature:r,cellDelta:a,cycleCount:o,remainingCapacity:n,fullCapacity:s,cells:l,onBmsClick:c,isDual:d=!1,battery1:p,battery2:h}=e,g=3.65-3;if(d&&p&&h){const e=p.voltage??0,i=h.voltage??0,r=e>0&&i>0?Math.round(1e3*Math.abs(e-i)):0;let a="#10b981",s="Balanced";r>200?(a="#ef4444",s="Pack Imbalance!"):r>80&&(a="#f59e0b",s="Pack Drift");const l=[...p.cells,...h.cells].map(e=>e.voltage).filter(e=>e>0),d=l.length>0?Math.min(...l):3,u=l.length>0?Math.max(...l):3.65,_=l.length>0?Math.round(1e3*(u-d)):0;return U`
      <div class="bms-card-section dual-bms-section">
        <!-- Dual Battery Header -->
        <div class="bms-header">
          <div class="bms-header-title">
            <ha-icon icon="mdi:battery-sync"></ha-icon>
            <span>BMS Redodo: 2× 12V Series (24V)</span>
          </div>

          <div class="bms-header-status">
            <!-- Midpoint battery drift badge -->
            <span
              class="bms-delta-pill"
              style="--delta-color: ${a}"
              title="Pack Voltage Delta: ${s}"
            >
              <ha-icon icon="mdi:scale-balance"></ha-icon>
              <span>Δ Packs: ${r} mV</span>
            </span>

            <!-- Cell delta badge -->
            <span
              class="bms-delta-pill cell-delta-pill"
              style="--delta-color: ${_>40?"#f59e0b":"#10b981"}"
              title="Delta between highest and lowest cell"
            >
              <span>Δ Cells: ${_} mV</span>
            </span>
          </div>
        </div>

        <!-- Warning banner if series midpoint drift is significant -->
        ${r>150?U`
              <div class="series-drift-alert">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>
                  Pack voltage drift detected: ${r} mV (Battery 1: ${e.toFixed(2)}V, Battery 2: ${i.toFixed(2)}V).
                  A 24V active battery equalizer is recommended.
                </span>
              </div>
            `:""}

        <!-- Dual Battery Grid: Battery 1 and Battery 2 -->
        <div class="dual-battery-container">
          <!-- BATTERY 1 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${()=>c(t.bat1_voltage_entity||t.bat1_soc_entity||t.battery_1?.voltage_entity||t.battery_1?.soc_entity)}
              style="cursor: pointer;"
              title="Click for Battery #1 details"
            >
              <div class="pack-name-row">
                <span class="pack-name">${p.name}</span>
                ${null===p.soc||isNaN(p.soc)?"":U`<span class="pack-soc-badge">${Math.round(p.soc)}%</span>`}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">${p.voltage?`${p.voltage.toFixed(2)}V`:"-"}</span>
                ${null===p.temperature||isNaN(p.temperature)?"":U`<span class="pack-temp">${Math.round(p.temperature)}°C</span>`}
              </div>
            </div>

            <!-- 4 Cells of Battery 1 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${p.name} Cells">
              ${p.cells.map(e=>{const t=e.voltage===d&&l.length>1,i=e.voltage===u&&l.length>1,r=Math.max(15,Math.min(100,Math.round((e.voltage-3)/g*100))),a=i?"#10b981":t?"#3b82f6":"#0ea5e9";return U`
                  <div
                    class="cell-col"
                    @click=${()=>c(e.rawEntityId)}
                    title="Cell #${e.index}: ${e.voltage.toFixed(3)} V ${i?"(MAX)":t?"(MIN)":""}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${i?"cell-max":""} ${t?"cell-min":""}"
                        style="height: ${r}%; background-color: ${a};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${e.voltage>0?e.voltage.toFixed(2):"-"}V</span>
                    <span class="cell-id">#${e.index}</span>
                  </div>
                `})}
            </div>
          </div>

          <!-- Series Bridge Divider -->
          <div class="series-bridge" title="24V Series Connection (+ to -)">
            <span class="bridge-line"></span>
            <span class="bridge-badge">24V Series</span>
            <span class="bridge-line"></span>
          </div>

          <!-- BATTERY 2 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${()=>c(t.bat2_voltage_entity||t.bat2_soc_entity||t.battery_2?.voltage_entity||t.battery_2?.soc_entity)}
              style="cursor: pointer;"
              title="Click for Battery #2 details"
            >
              <div class="pack-name-row">
                <span class="pack-name">${h.name}</span>
                ${null===h.soc||isNaN(h.soc)?"":U`<span class="pack-soc-badge">${Math.round(h.soc)}%</span>`}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">${h.voltage?`${h.voltage.toFixed(2)}V`:"-"}</span>
                ${null===h.temperature||isNaN(h.temperature)?"":U`<span class="pack-temp">${Math.round(h.temperature)}°C</span>`}
              </div>
            </div>

            <!-- 4 Cells of Battery 2 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${h.name} Cells">
              ${h.cells.map(e=>{const t=e.voltage===d&&l.length>1,i=e.voltage===u&&l.length>1,r=Math.max(15,Math.min(100,Math.round((e.voltage-3)/g*100))),a=i?"#10b981":t?"#3b82f6":"#0ea5e9";return U`
                  <div
                    class="cell-col"
                    @click=${()=>c(e.rawEntityId)}
                    title="Cell #${e.index}: ${e.voltage.toFixed(3)} V ${i?"(MAX)":t?"(MIN)":""}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${i?"cell-max":""} ${t?"cell-min":""}"
                        style="height: ${r}%; background-color: ${a};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${e.voltage>0?e.voltage.toFixed(2):"-"}V</span>
                    <span class="cell-id">#${e.index}</span>
                  </div>
                `})}
            </div>
          </div>
        </div>

        <!-- Optional summary footer if cycleCount or capacity is configured -->
        ${null!==o||null!==n?U`
              <div class="bms-footer-stats">
                ${null===o||isNaN(o)?"":U`
                      <div class="bms-footer-item" @click=${()=>c(t.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>Cycles: <strong>${o}</strong></span>
                      </div>
                    `}
                ${null===n||isNaN(n)?"":U`
                      <div class="bms-footer-item" @click=${()=>c(t.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>Remaining: <strong>${n.toFixed(1)} Ah</strong></span>
                      </div>
                    `}
              </div>
            `:""}
      </div>
    `}const u=l.map(e=>e.voltage).filter(e=>e>0),_=u.length>0?Math.min(...u):3,y=u.length>0?Math.max(...u):3.65,m=null===a||isNaN(a)?u.length>0?Math.round(1e3*(y-_)):0:a;let b="#10b981",f="Balanced";return m>50?(b="#ef4444",f="Imbalance Alert"):m>20&&(b="#f59e0b",f="Normal Drift"),U`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>BMS Redodo LiFePO4</span>
          ${null===i||isNaN(i)?"":U`<span class="bms-soc-badge">${Math.round(i)}% SOC</span>`}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${b}"
            @click=${()=>c(t.cell_delta_entity)}
            title="Delta between highest and lowest cell: ${f}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${m} mV</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- 8-Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${l.map(e=>{const t=e.voltage===_&&u.length>1,i=e.voltage===y&&u.length>1,r=Math.max(15,Math.min(100,Math.round((e.voltage-3)/g*100))),a=i?"#10b981":t?"#3b82f6":"#0ea5e9";return U`
              <div
                class="cell-col"
                @click=${()=>c(e.rawEntityId)}
                title="Cell #${e.index}: ${e.voltage.toFixed(3)} V ${i?"(MAX)":t?"(MIN)":""}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${i?"cell-max":""} ${t?"cell-min":""}"
                    style="height: ${r}%; background-color: ${a};"
                  ></div>
                </div>
                <span class="cell-voltage">${e.voltage>0?e.voltage.toFixed(2):"-"}V</span>
                <span class="cell-id">#${e.index}</span>
              </div>
            `})}
        </div>

        <!-- Right Side: BMS Telemetry Columns -->
        <div class="bms-telemetry-panel">
          ${null===r||isNaN(r)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.temperature_entity)}
                  title="BMS Temperature Probe"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${r.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">Temp</span>
                  </div>
                </div>
              `}

          ${null===o||isNaN(o)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.cycle_count_entity)}
                  title="Charge/Discharge Cycle Count"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${o}</span>
                    <span class="bms-stat-lbl">Cycles</span>
                  </div>
                </div>
              `}

          ${null===n||isNaN(n)?"":U`
                <div
                  class="bms-stat-item"
                  @click=${()=>c(t.remaining_capacity_entity)}
                  title="Remaining Battery Capacity"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(n)}${s?`/${Math.round(s)}`:""}Ah
                    </span>
                    <span class="bms-stat-lbl">Capacity</span>
                  </div>
                </div>
              `}
        </div>
      </div>
    </div>
  `}({bmsConfig:A,isDual:E,battery1:M,battery2:N,soc:l,temperature:A.temperature_entity?this._getNumber(A.temperature_entity):null,temperature2:A.temperature_2_entity?this._getNumber(A.temperature_2_entity):null,cycleCount:A.cycle_count_entity?this._getNumber(A.cycle_count_entity):null,remainingCapacity:A.remaining_capacity_entity?this._getNumber(A.remaining_capacity_entity):null,fullCapacity:A.full_capacity_entity?this._getNumber(A.full_capacity_entity):null,cellDelta:A.cell_delta_entity?this._getNumber(A.cell_delta_entity):null,cells:B,onBmsClick:e=>this._handleEntityClick(e)}):""}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${!1!==this._config.show_controls&&P?function(e){const{controlsConfig:t,expanded:i,chargeSource:r,chargeSourceOptions:a,outputPriority:o,outputPriorityOptions:n,maxChargeCurrent:s,bulkVoltage:l,floatVoltage:c,isEqualization:d,onToggleExpand:p,onSelectOption:h,onSetNumber:g,onToggleSwitch:u}=e;return U`
    <div class="controls-card-section ${i?"expanded":""}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${p}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>Inverter: Controls & Settings</span>
        </div>
        <div class="controls-header-right">
          <span class="controls-quick-summary">
            ${o||"SBU"} • ${s?`${s}A`:"15A"}
          </span>
          <ha-icon
            class="chevron-icon ${i?"open":""}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${i?U`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority (SNU / Only Solar) -->
                ${t.charge_source_entity?U`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>Charge Source Priority</label>
                        </div>
                        <div class="pill-selector">
                          ${(a.length>0?a:["Solar First","Solar and Utility","Only Solar"]).map(e=>U`
                              <button
                                type="button"
                                class="pill-btn ${r===e?"active":""}"
                                @click=${()=>h(t.charge_source_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}

                <!-- Select 2: Output Source Priority (SUB, SBU, USB) -->
                ${t.output_priority_entity?U`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:power-plug-outline"></ha-icon>
                          <label>Output Source Priority</label>
                        </div>
                        <div class="pill-selector">
                          ${(n.length>0?n:["SUB","SBU","USB"]).map(e=>U`
                              <button
                                type="button"
                                class="pill-btn ${o===e?"active":""}"
                                @click=${()=>h(t.output_priority_entity,e)}
                              >
                                ${e}
                              </button>
                            `)}
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- Slider: Max AC Charging Current (2 to 30 A) -->
              ${t.max_charge_current_entity?U`
                    <div class="control-box slider-box">
                      <div class="control-box-header">
                        <div class="control-label-wrap">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <label>Max AC Charge Current</label>
                        </div>
                        <span class="control-live-val">${s??15} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">2A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="2"
                          max="30"
                          step="1"
                          .value=${String(s??15)}
                          @change=${e=>{const i=parseFloat(e.target.value);g(t.max_charge_current_entity,i)}}
                        />
                        <span class="slider-boundary">30A</span>
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
                          <label>Bulk Voltage</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((l??28.2)-.1).toFixed(1));g(t.bulk_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${l?.toFixed(1)??"28.2"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((l??28.2)+.1).toFixed(1));g(t.bulk_voltage_entity,e)}}
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
                          <label>Float Voltage</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((c??27)-.1).toFixed(1));g(t.float_voltage_entity,e)}}
                          >
                            -
                          </button>
                          <span class="stepper-val">${c?.toFixed(1)??"27.0"} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${()=>{const e=Number(((c??27)+.1).toFixed(1));g(t.float_voltage_entity,e)}}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `:""}
              </div>

              <!-- DANGER ZONE: Equalization Switch -->
              ${t.equalization_entity?U`
                    <div class="danger-switch-row ${d?"danger-active":""}">
                      <div class="danger-info">
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>Battery Equalization</span>
                        </div>
                        <span class="danger-desc">
                          ⚠️ For LiFePO4, must ALWAYS BE OFF to prevent cell overcharging!
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${d?"switch-on":"switch-off"}"
                        @click=${()=>{(d||confirm("WARNING!\nEqualization mode is strictly not recommended for LiFePO4 batteries (Redodo) and can permanently damage the cells!\n\nAre you sure you want to enable Equalization?"))&&u(t.equalization_entity,d)}}
                      >
                        ${d?"ON":"OFF"}
                      </button>
                    </div>
                  `:""}
            </div>
          `:""}
    </div>
  `}({controlsConfig:P,hass:this._hass,expanded:this._controlsExpanded,onToggleExpand:()=>{this._controlsExpanded=!this._controlsExpanded},chargeSource:P.charge_source_entity?this._getState(P.charge_source_entity):void 0,chargeSourceOptions:this._getOptions(P.charge_source_entity),outputPriority:P.output_priority_entity?this._getState(P.output_priority_entity):void 0,outputPriorityOptions:this._getOptions(P.output_priority_entity),maxChargeCurrent:P.max_charge_current_entity?this._getNumber(P.max_charge_current_entity):void 0,bulkVoltage:P.bulk_voltage_entity?this._getNumber(P.bulk_voltage_entity):void 0,floatVoltage:P.float_voltage_entity?this._getNumber(P.float_voltage_entity):void 0,isEqualization:!!P.equalization_entity&&"on"===this._getState(P.equalization_entity),onSelectOption:(e,t)=>this._handleSelectOption(e,t),onSetNumber:(e,t)=>this._handleSetNumber(e,t),onToggleSwitch:(e,t)=>this._handleToggleSwitch(e,t)}):""}

        <!-- 7. Daily Energy Statistics (Today's Production & Consumption) -->
        ${!1!==this._config.show_energy&&T?Ne({dailyConfig:T,loadEnergy:C,gridImportEnergy:$,batteryChargeEnergy:k,batteryDischargeEnergy:S,onEnergyClick:e=>this._handleEntityClick(e)}):""}
      </ha-card>
    `}};e([_e()],Ie.prototype,"_config",void 0),e([_e()],Ie.prototype,"_hass",void 0),e([_e()],Ie.prototype,"_controlsExpanded",void 0),Ie=e([pe(ye)],Ie),window.customCards=window.customCards||[],window.customCards.push({type:ye,name:"Aninerel Power Card",description:"Ultimate power card for Aninerel ANL 4200T inverter + Redodo BMS",preview:!0,documentationURL:"https://github.com/ziffmafiya/aninerel-power-card"});const Le={en:{common:{version:"Version",name:"Aninerel Power Card",description:"Ultimate card for Aninerel ANL 4200T inverter + Redodo BMS"},mode:{battery:"Battery",mains:"Mains",bypass:"Bypass",line:"Line",grid:"Grid"},nodes:{solar:"Solar",battery:"Battery",inverter:"Inverter",home:"Home",grid:"Grid"},flow:{charge:"Charge",discharge:"Discharge",standby:"Standby",import:"Import",export:"Export"},params:{battery:"Battery DC",grid:"Grid AC",self_sufficiency:"Self-Sufficiency",normal:"Normal",deviated:"Deviated",sag:"Low (Sag)",surge:"High (Surge)"},bms:{title:"BMS Redodo LiFePO4",temp:"Temp",cycles:"Cycles",capacity:"Capacity",balanced:"Balanced",drift:"Normal Drift",imbalance:"Imbalance Alert"},controls:{title:"Inverter: Controls & Automations",charge_source:"Charge Source Priority",output_priority:"Home Output Priority",max_charge_current:"Max AC Charging Current",bulk_voltage:"Bulk Voltage",float_voltage:"Float Voltage",equalization:"Equalization Mode",equalization_warning:"⚠️ For LiFePO4 MUST ALWAYS BE OFF to prevent cell damage!"},energy:{title:"Daily Energy Balance",total:"Total",load:"Home Consumption",grid_import:"Grid Import",bat_charge:"Battery Charge",bat_discharge:"Battery Discharge"},editor:{title:"Card Title",entities_group:"⚡ Real-time Power Entities (Required)",params_group:"📊 Electrical Parameters & Telemetry",bms_group:"🔋 BMS Redodo LiFePO4 Telemetry",controls_group:"🎛️ Inverter Controls & Settings",safety_group:"🛡️ Safety & Diagnostics",energy_group:"📈 Daily Energy Counters",display_group:"🎨 Layout & Visualization Toggles"}},ru:{common:{version:"Версия",name:"Aninerel Power Card",description:"Ультимативная карточка для инвертора Aninerel ANL 4200T + BMS Redodo"},mode:{battery:"Батарея",mains:"Сеть",bypass:"Байпас",line:"Сеть",grid:"Сеть"},nodes:{solar:"Солнце",battery:"АКБ",inverter:"Инвертор",home:"Дом",grid:"Сеть"},flow:{charge:"Заряд",discharge:"Разряд",standby:"Ожидание",import:"Импорт",export:"Экспорт"},params:{battery:"Батарея DC",grid:"Сеть AC",self_sufficiency:"Автономность",normal:"Норма",deviated:"Отклонение",sag:"Просадка",surge:"Перенапряжение"},bms:{title:"BMS Redodo LiFePO4",temp:"Темп.",cycles:"Циклы",capacity:"Емкость",balanced:"Сбалансировано",drift:"Естественный дрейф",imbalance:"Алерт разбаланса"},controls:{title:"Инвертор: Управление и автоматизации",charge_source:"Источник заряда",output_priority:"Приоритет питания дома",max_charge_current:"Макс. ток сетевого заряда",bulk_voltage:"Напряжение Bulk",float_voltage:"Напряжение Float",equalization:"Режим Equalization (Выравнивание)",equalization_warning:"⚠️ Для LiFePO4 должен быть ВСЕГДА ВЫКЛЮЧЕН во избежание перезаряда ячеек!"},energy:{title:"Суточный баланс энергии",total:"Итого",load:"Потребление дома",grid_import:"Импорт из сети",bat_charge:"Закачано в АКБ",bat_discharge:"Отдано батареей"},editor:{title:"Заголовок карточки",entities_group:"⚡ Мощности реального времени (Обязательно)",params_group:"📊 Электрические параметры и телеметрия",bms_group:"🔋 Телеметрия BMS Redodo LiFePO4",controls_group:"🎛️ Управление инвертором и настройки",safety_group:"🛡️ Безопасность и диагностика сбоев",energy_group:"📈 Суточные счетчики электроэнергии",display_group:"🎨 Настройки отображения и видимости секций"}}};function De(e,t,i,r){const a=(t?.locale?.language||t?.language||navigator.language||"ru").toLowerCase().split("-")[0],o=Le[a]?a:"ru";let n;try{n=e.split(".").reduce((e,t)=>e?.[t],Le[o])}catch(e){n=void 0}if(void 0===n)try{n=e.split(".").reduce((e,t)=>e?.[t],Le.ru)}catch(e){n=void 0}if(void 0===n)try{n=e.split(".").reduce((e,t)=>e?.[t],Le.en)}catch(e){n=void 0}return void 0!==n&&"string"==typeof n||(n=e),n}let ze=class extends ce{setConfig(e){const t=JSON.parse(JSON.stringify(e||{}));t.bms&&(t.bms.battery_1&&(!t.bms.bat1_name&&t.bms.battery_1.name&&(t.bms.bat1_name=t.bms.battery_1.name),!t.bms.bat1_soc_entity&&t.bms.battery_1.soc_entity&&(t.bms.bat1_soc_entity=t.bms.battery_1.soc_entity),!t.bms.bat1_voltage_entity&&t.bms.battery_1.voltage_entity&&(t.bms.bat1_voltage_entity=t.bms.battery_1.voltage_entity),!t.bms.bat1_temperature_entity&&t.bms.battery_1.temperature_entity&&(t.bms.bat1_temperature_entity=t.bms.battery_1.temperature_entity),!t.bms.bat1_cell_prefix&&t.bms.battery_1.cell_voltage_prefix&&(t.bms.bat1_cell_prefix=t.bms.battery_1.cell_voltage_prefix)),t.bms.battery_2&&(!t.bms.bat2_name&&t.bms.battery_2.name&&(t.bms.bat2_name=t.bms.battery_2.name),!t.bms.bat2_soc_entity&&t.bms.battery_2.soc_entity&&(t.bms.bat2_soc_entity=t.bms.battery_2.soc_entity),!t.bms.bat2_voltage_entity&&t.bms.battery_2.voltage_entity&&(t.bms.bat2_voltage_entity=t.bms.battery_2.voltage_entity),!t.bms.bat2_temperature_entity&&t.bms.battery_2.temperature_entity&&(t.bms.bat2_temperature_entity=t.bms.battery_2.temperature_entity),!t.bms.bat2_cell_prefix&&t.bms.battery_2.cell_voltage_prefix&&(t.bms.bat2_cell_prefix=t.bms.battery_2.cell_voltage_prefix))),this._config=t}_computeLabel(e){return e.label?e.label:De(`editor.${e.name}`,this.hass)||e.name}_valueChanged(e){const t=e.detail.value,i=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(i)}_getSchema(){return[{name:"title",label:De("editor.title",this.hass)||"Card Title",selector:{text:{}}},{name:"subtitle",label:"Card Subtitle",selector:{text:{}}},{name:"icon",label:"Header Icon (MDI)",selector:{icon:{}}},{name:"entities",type:"expandable",title:De("editor.entities_group",this.hass)||"⚡ Real-time Power Entities (Required)",schema:[{name:"solar_power",label:"Solar Generation (PV Power) [Optional]",required:!1,selector:{entity:{domain:"sensor"}}},{name:"battery_power",label:"Battery Power (+Charge / -Discharge)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"grid_power",label:"Grid Power (AC Input)",required:!0,selector:{entity:{domain:"sensor"}}},{name:"load_power",label:"Home Load Power",required:!0,selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:De("editor.params_group",this.hass)||"📊 Electrical Parameters & Telemetry",schema:[{name:"battery_voltage_entity",label:"Battery Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"battery_current_entity",label:"Battery Current (A)",selector:{entity:{domain:"sensor"}}},{name:"grid_voltage_entity",label:"Grid AC Voltage (V)",selector:{entity:{domain:"sensor"}}},{name:"operating_mode_entity",label:"Inverter Operating Mode",selector:{entity:{domain:"sensor"}}},{name:"inverter_temperature_entity",label:"Inverter Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"charging_active_entity",label:"Charging Active Flag",selector:{entity:{domain:"binary_sensor"}}},{name:"kpi_mode",label:"3rd Radial Gauge KPI Metric",selector:{select:{options:[{value:"auto",label:"Auto (Battery SoC for UPS, Self-Sufficiency for Solar)"},{value:"battery_soc",label:"Battery SoC % (State of Charge)"},{value:"battery_autonomy",label:"Battery Autonomy % (Daily Load Powered by Battery)"},{value:"self_sufficiency",label:"Solar Self-Sufficiency % (Autarky)"},{value:"inverter_load",label:"Inverter Load %"}]}}},{name:"kpi_entity",label:"Custom KPI Entity (Overrides click/gauge entity)",selector:{entity:{domain:"sensor"}}}]},{name:"bms",type:"expandable",title:De("editor.bms_group",this.hass)||"🔋 BMS Redodo LiFePO4 Telemetry",schema:[{name:"dual_battery",label:"🔋 Mode: Dual 12V Batteries in Series (24V Pack)",selector:{boolean:{}}},{name:"bat1_name",label:"Battery #1: Name (e.g. Redodo #1)",selector:{text:{}}},{name:"bat1_soc_entity",label:"Battery #1: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat1_voltage_entity",label:"Battery #1: Voltage (~13.5V)",selector:{entity:{domain:"sensor"}}},{name:"bat1_temperature_entity",label:"Battery #1: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat1_cell_prefix",label:"Battery #1: Cell Sensor Prefix (1..4)",selector:{text:{}}},{name:"bat2_name",label:"Battery #2: Name (e.g. Redodo #2)",selector:{text:{}}},{name:"bat2_soc_entity",label:"Battery #2: State of Charge (SOC %)",selector:{entity:{domain:"sensor"}}},{name:"bat2_voltage_entity",label:"Battery #2: Voltage (~13.5V)",selector:{entity:{domain:"sensor"}}},{name:"bat2_temperature_entity",label:"Battery #2: Temperature (°C)",selector:{entity:{domain:"sensor"}}},{name:"bat2_cell_prefix",label:"Battery #2: Cell Sensor Prefix (1..4)",selector:{text:{}}},{name:"soc_entity",label:"Total / Average SOC % (Single Pack)",selector:{entity:{domain:"sensor"}}},{name:"voltage_entity",label:"Total Battery Voltage via BMS (24V)",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"BMS Cell Temperature Probe (°C)",selector:{entity:{domain:"sensor"}}},{name:"cell_delta_entity",label:"Cell Imbalance (Delta mV)",selector:{entity:{domain:"sensor"}}},{name:"cycle_count_entity",label:"Battery Cycle Count",selector:{entity:{domain:"sensor"}}},{name:"remaining_capacity_entity",label:"Remaining Capacity (Ah)",selector:{entity:{domain:"sensor"}}},{name:"cell_count",label:"Single Pack Cell Count (8 for 24V)",selector:{number:{min:4,max:16,step:1,mode:"box"}}},{name:"cell_voltage_prefix",label:"Single Pack Cell Sensor Prefix (1..8)",selector:{text:{}}}]},{name:"controls",type:"expandable",title:De("editor.controls_group",this.hass)||"🎛️ Inverter Controls & Settings",schema:[{name:"charge_source_entity",label:"Charge Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"output_priority_entity",label:"Output Source Priority (Select)",selector:{entity:{domain:"select"}}},{name:"max_charge_current_entity",label:"Max AC Charge Current (Number)",selector:{entity:{domain:"number"}}},{name:"bulk_voltage_entity",label:"Bulk Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"float_voltage_entity",label:"Float Voltage Setting (Number)",selector:{entity:{domain:"number"}}},{name:"equalization_entity",label:"Battery Equalization Mode (Switch)",selector:{entity:{domain:"switch"}}}]},{name:"safety",type:"expandable",title:De("editor.safety_group",this.hass)||"🛡️ Safety & Diagnostics",schema:[{name:"fault_active_entity",label:"Fault Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"fault_code_entity",label:"Fault Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"fault_details_entity",label:"Fault Details Text [Optional]",selector:{entity:{domain:"sensor"}}},{name:"warnings_active_entity",label:"Warnings Active Flag (Binary Sensor)",selector:{entity:{domain:"binary_sensor"}}},{name:"warning_code_entity",label:"Warning Code (Sensor)",selector:{entity:{domain:"sensor"}}},{name:"warning_details_entity",label:"Warning Details Text [Optional]",selector:{entity:{domain:"sensor"}}}]},{name:"daily_energy",type:"expandable",title:De("editor.energy_group",this.hass)||"📈 Daily Energy Counters",schema:[{name:"load_energy_entity",label:"Daily Home Consumption (kWh)",selector:{entity:{domain:"sensor"}}},{name:"grid_import_entity",label:"Daily Grid Import (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_charge_entity",label:"Daily Battery Charge (kWh)",selector:{entity:{domain:"sensor"}}},{name:"battery_discharge_entity",label:"Daily Battery Discharge (kWh)",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:De("editor.display_group",this.hass)||"🎨 Layout & Visualization Toggles",schema:[{name:"max_power",label:"Scale Max Power Rating (W)",selector:{number:{min:1e3,max:2e4,step:200,mode:"box"}}},{name:"use_log_flow_model",label:"Logarithmic flow animation speed model",selector:{boolean:{}}},{name:"show_header",label:"Show header bar with status chips",selector:{boolean:{}}},{name:"show_flow",label:"Show animated power flow diagram",selector:{boolean:{}}},{name:"show_solar",label:"Show solar generation (PV)",selector:{boolean:{}}},{name:"grid_position",label:"Grid position when solar is hidden",selector:{select:{options:[{value:"bottom",label:"Bottom (Default)"},{value:"top",label:"Top (Replaces solar)"}]}}},{name:"show_params",label:"Show electrical telemetry parameters",selector:{boolean:{}}},{name:"show_bms",label:"Show Redodo BMS section",selector:{boolean:{}}},{name:"show_controls",label:"Show inverter controls & settings",selector:{boolean:{}}},{name:"show_energy",label:"Show daily energy statistics",selector:{boolean:{}}},{name:"show_alerts",label:"Show diagnostic alerts & warnings",selector:{boolean:{}}}]}]}static{this.styles=n`
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
    `:U``}};e([ue({attribute:!1})],ze.prototype,"hass",void 0),e([_e()],ze.prototype,"_config",void 0),ze=e([pe("aninerel-power-card-editor")],ze);var Fe=Object.freeze({__proto__:null,get AninerelPowerCardEditor(){return ze}});export{Ie as AninerelPowerCard};
