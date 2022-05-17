(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[12],{264:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(33),o=(r(0),r(265)),a=r.n(o),c=r(17),s=r(1),i=function(e){var t=e.name,r=e.label,o=e.rules,i=e.control,l=e.rows,u=void 0===l?2:l,d=e.disabled,j=void 0!==d&&d,b=e.placeholder;return Object(s.jsx)(n.a,{control:i,name:t,rules:o,render:function(e){var t=e.field,n=e.fieldState;return Object(s.jsx)(c.c,{label:r,required:!(null===o||void 0===o||!o.required),error:n.error,disabled:j,children:Object(s.jsx)("textarea",{className:"".concat(a.a.textarea," ").concat(n.error?a.a.error:""),name:t.name,value:t.value,onChange:t.onChange,rows:u,disabled:j,placeholder:b})})}})}},265:function(e,t,r){e.exports={dark:"InputTextarea_dark__c3Uh-",textarea:"InputTextarea_textarea__29Lkx",error:"InputTextarea_error__7n4iw"}},276:function(e,t,r){e.exports={dark:"NewPostInputForm_dark__2CWsU",controls:"NewPostInputForm_controls__XxkAp"}},277:function(e,t,r){"use strict";r(0);var n=r(278),o=r.n(n),a=r(290),c=r(18),s=r(92),i=r(1),l=function(e){var t=e.posts,r=e.onPostDelete,n=e.onPostDeleteLike,c=e.authorizedUserId,s=e.onPostAddLike,l=e.onAddComment,u=e.onDeleteComment;return Object(i.jsx)("div",{className:o.a.wrapper,children:t.slice().reverse().map((function(e){return Object(i.jsx)(a.a,{post:e,commentsShown:3,onPostDelete:r,onPostDeleteLike:n,onPostAddLike:s,authorizedUserId:c,onAddComment:l,onDeleteComment:u},e._id)}))})};t.a=function(e){var t=e.posts,r=Object(c.b)(),n=Object(c.c)((function(e){var t;return null===(t=e.auth.user)||void 0===t?void 0:t._id}));return Object(i.jsx)(l,{posts:t,onPostAddLike:function(e){r(Object(s.c)(e))},onPostDeleteLike:function(e){r(Object(s.g)(e))},onAddComment:function(e,t){r(Object(s.b)(e,t))},onDeleteComment:function(e){r(Object(s.f)(e))},onPostDelete:function(e){r(Object(s.e)(e))},authorizedUserId:n})}},278:function(e,t,r){e.exports={dark:"Feed_dark__1sSCY"}},291:function(e,t,r){"use strict";var n=r(0),o=r.n(n),a=r(5),c=r.n(a);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=Object(n.forwardRef)((function(e,t){var r=e.color,n=e.size,a=i(e,["color","size"]);return o.a.createElement("svg",s({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},a),o.a.createElement("path",{d:"M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"}),o.a.createElement("path",{d:"M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"}))}));l.propTypes={color:c.a.string,size:c.a.oneOfType([c.a.string,c.a.number])},l.defaultProps={color:"currentColor",size:"1em"};var u=l,d=r(276),j=r.n(d),b=r(48),f=r(9),p=r(17),O=r(264),h=r(92),m=r(18),x=r(1);t.a=function(){var e=Object(m.c)((function(e){return e.posts.isAddPostPending})),t=Object(m.b)();return Object(x.jsx)(b.a,{children:Object(x.jsxs)(p.a,{onSubmit:function(e){var r=e.newPostText;t(Object(h.a)(r))},initialValues:{newPostText:""},resetAfterSubmit:!0,children:[Object(x.jsx)(O.a,{name:"newPostText",placeholder:"Share your thoughts and feelings!"}),Object(x.jsxs)("div",{className:j.a.controls,children:[Object(x.jsx)(f.a,{onClick:function(e){e.preventDefault(),console.log("Attach file button clicked")},type:"text",size:"sm",children:Object(x.jsx)(f.a.Icon,{children:Object(x.jsx)(u,{color:"#909BA4",size:18})})}),Object(x.jsx)(f.a,{type:"primary",size:"sm",spinner:e,children:Object(x.jsx)(f.a.Text,{children:"Send"})})]})]})})}},390:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r(277),a=r(18),c=r(92),s=function(e){return e.posts.posts.sort((function(e,t){return e.createdAt<t.createdAt?-1:e.createdAt>t.createdAt?1:0}))},i=r(62),l=r(19),u=r(291),d=r(1);t.default=function(){var e=Object(a.b)(),t=Object(a.c)(s);return Object(n.useEffect)((function(){e(Object(c.h)())}),[e]),Object(i.a)()?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(u.a,{}),Object(d.jsx)(o.a,{posts:t})]}):Object(d.jsx)(l.a,{to:"/login"})}}}]);
//# sourceMappingURL=12.952fb78e.chunk.js.map