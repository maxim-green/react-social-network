(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[0],{263:function(e,t,r){"use strict";r.d(t,"b",(function(){return j})),r.d(t,"a",(function(){return u})),r.d(t,"c",(function(){return b}));var n=r(6),o=r(0),a=r.n(o),c=r(270),i=r.n(c),s=r(16),l=r.n(s),d=r(1),j=function(e){var t=e.children,r=e.verticalAlign,o=void 0===r?"start":r,c=e.horizontalAlign,s=void 0===c?"start":c,j=e.padding,u=void 0===j?0:j,b=e.gap,m=void 0===b?0:b,h=e.bordered;return Object(d.jsxs)("div",{className:l()(i.a.row,Object(n.a)({},i.a.bordered,h)),style:{alignItems:"stretch",justifyContent:s,padding:u},children:[t instanceof Array&&t.map((function(e,r){return"boolean"!==typeof e&&a.a.cloneElement(e,{key:r,style:{marginRight:r===t.length-1?0:m,justifyContent:o},className:e.props.className+" "+i.a.col})})),t&&"boolean"!==typeof t&&!(t instanceof Array)&&a.a.cloneElement(t,{style:{marginRight:0,justifyContent:o},className:t.props.className+" "+i.a.col})]})},u=function(e){var t=e.children,r=e.style,o=e.verticalAlign,c=e.horizontalAlign,s=void 0===c?"start":c,j=e.padding,u=void 0===j?0:j,b=e.gap,m=void 0===b?0:b,h=e.bordered,p=e.stretch,O=void 0!==p&&p;return Object(d.jsx)("div",{className:l()(i.a.col,Object(n.a)({},i.a.bordered,h)),style:{padding:u,marginRight:null===r||void 0===r?void 0:r.marginRight,alignItems:s,justifyContent:o||(null===r||void 0===r?void 0:r.justifyContent),flex:O?1:void 0},children:a.a.Children.map(t,(function(e){return Object(d.jsx)("div",{className:i.a.item,style:{marginBottom:m},children:e})}))})},b=function(){return Object(d.jsx)("div",{className:i.a.space})}},270:function(e,t,r){e.exports={dark:"Flex_dark__10I9f",row:"Flex_row__3_1u3",bordered:"Flex_bordered__1vTO2",col:"Flex_col__1rgou",item:"Flex_item__3eYY8",space:"Flex_space__2U2zF"}},290:function(e,t,r){"use strict";var n=r(10),o=r(0),a=r.n(o),c=r(48),i=r(91),s=r(312),l=r.n(s),d=r(20),j=r(49),u=r(263),b=r(9),m=r(5),h=r.n(m);function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},p.apply(this,arguments)}function O(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var f=Object(o.forwardRef)((function(e,t){var r=e.color,n=e.size,o=O(e,["color","size"]);return a.a.createElement("svg",p({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},o),a.a.createElement("path",{d:"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"}))}));f.propTypes={color:h.a.string,size:h.a.oneOfType([h.a.string,h.a.number])},f.defaultProps={color:"currentColor",size:"1em"};var x=f,v=r(44),g=r.n(v),y=r(313),_=r.n(y),w=r(83),z=r(1),C=function(e){var t=e.open,r=e.children,n=e.confirmButtonText,o=void 0===n?"Ok":n,a=e.declineButtonText,c=void 0===a?"Cancel":a,i=e.onConfirm,s=e.onDecline,l=e.important,d=void 0!==l&&l;return Object(z.jsx)(w.a,{open:t,children:Object(z.jsxs)("div",{children:[Object(z.jsx)("div",{className:_.a.question,children:r}),Object(z.jsxs)("div",{className:_.a.buttons,children:[Object(z.jsx)(b.a,{type:d?"cancel":"primary",onClick:i,children:Object(z.jsx)(b.a.Text,{children:o})}),Object(z.jsx)(b.a,{type:d?"primary":"secondary",onClick:s,children:Object(z.jsx)(b.a.Text,{children:c})})]})]})})},k=function(e){var t=e.onDelete,r=e.warningMessage,a=e.disabled,c=void 0!==a&&a,i=Object(o.useState)(!1),s=Object(n.a)(i,2),l=s[0],d=s[1];return Object(z.jsxs)(b.a,{onClick:r?function(){return d(!0)}:t,type:"text",size:"sm",disabled:c,children:[Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(x,{color:g.a.textMid,size:16})}),Object(z.jsx)(C,{open:l,onConfirm:t,onDecline:function(){return d(!1)},important:!0,children:r})]})},P=r(253),I=function(e){var t=e.id,r=e.date,n=e.author,o=e.isAuthor,a=e.onDelete;return Object(z.jsxs)(u.b,{padding:20,gap:20,children:[Object(z.jsx)(d.b,{to:"/profile/".concat(n.username),children:Object(z.jsx)(j.a,{smallImg:n.avatar.small,online:Object(i.a)(n.updatedAt),size:50})}),Object(z.jsxs)(u.a,{verticalAlign:"center",children:[Object(z.jsx)(d.b,{to:"/profile/".concat(n.username),children:Object(z.jsx)("div",{className:l.a.userName,children:n.firstName+" "+n.lastName})}),Object(z.jsx)(d.b,{to:"/post/".concat(t),children:Object(z.jsxs)("div",{className:l.a.date,children:["posted on ",r]})})]}),Object(z.jsx)(u.c,{}),o&&Object(z.jsx)(u.a,{children:Object(z.jsxs)(u.b,{children:[Object(z.jsx)(b.a,{type:"text",size:"sm",children:Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(P.a,{color:g.a.textMid,size:16})})}),Object(z.jsx)(k,{onDelete:a,warningMessage:"Are you sure you want to delete this post?"})]})})]})},A=r(314),N=r.n(A),S=function(e){var t=e.children;return Object(z.jsx)(u.b,{padding:"10px 40px 30px",verticalAlign:"start",bordered:!0,children:Object(z.jsx)("div",{className:N.a.text,children:t})})};function T(){return T=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T.apply(this,arguments)}function E(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var D=Object(o.forwardRef)((function(e,t){var r=e.color,n=e.size,o=E(e,["color","size"]);return a.a.createElement("svg",T({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},o),a.a.createElement("path",{d:"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"}))}));D.propTypes={color:h.a.string,size:h.a.oneOfType([h.a.string,h.a.number])},D.defaultProps={color:"currentColor",size:"1em"};var F=D;function M(){return M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},M.apply(this,arguments)}function R(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var B=Object(o.forwardRef)((function(e,t){var r=e.color,n=e.size,o=R(e,["color","size"]);return a.a.createElement("svg",M({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},o),a.a.createElement("path",{fillRule:"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"}))}));B.propTypes={color:h.a.string,size:h.a.oneOfType([h.a.string,h.a.number])},B.defaultProps={color:"currentColor",size:"1em"};var H=B;function L(){return L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},L.apply(this,arguments)}function U(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var q=Object(o.forwardRef)((function(e,t){var r=e.color,n=e.size,o=U(e,["color","size"]);return a.a.createElement("svg",L({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},o),a.a.createElement("path",{d:"M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"}))}));q.propTypes={color:h.a.string,size:h.a.oneOfType([h.a.string,h.a.number])},q.defaultProps={color:"currentColor",size:"1em"};var V=q;function W(){return W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},W.apply(this,arguments)}function Y(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var J=Object(o.forwardRef)((function(e,t){var r=e.color,n=e.size,o=Y(e,["color","size"]);return a.a.createElement("svg",W({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:n,height:n,fill:r},o),a.a.createElement("path",{d:"M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"}))}));J.propTypes={color:h.a.string,size:h.a.oneOfType([h.a.string,h.a.number])},J.defaultProps={color:"currentColor",size:"1em"};var X=J,K=function(e){var t=e.likes,r=e.isLiked,n=e.onLikeClick,o=e.onCommentClick,a=e.onShareClick;return Object(z.jsxs)(u.b,{verticalAlign:"center",children:[Object(z.jsx)(u.a,{bordered:!0,padding:5,horizontalAlign:"center",stretch:!0,children:Object(z.jsxs)(b.a,{type:"text",size:"sm",onClick:n,children:[Object(z.jsx)(b.a.Text,{children:t.length}),!r&&Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(F,{color:g.a.accent,size:16})}),r&&Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(H,{color:g.a.accent,size:16})})]})}),!!o&&Object(z.jsx)(u.a,{bordered:!0,padding:5,horizontalAlign:"center",stretch:!0,children:Object(z.jsx)(b.a,{type:"text",size:"sm",onClick:o,children:Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(V,{color:g.a.accent,size:16})})})}),Object(z.jsx)(u.a,{bordered:!0,padding:5,horizontalAlign:"center",stretch:!0,children:Object(z.jsx)(b.a,{type:"text",size:"sm",onClick:a,children:Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(X,{color:g.a.accent,size:16})})})})]})},Q=r(6),G=r(315),Z=r.n(G),$=r(16),ee=r.n($),te=r(316),re=r.n(te),ne=r(17),oe=r(93),ae=r(18),ce=function(e){var t=e.onAddComment,r=e.disabled,n=void 0!==r&&r,o=Object(ae.c)((function(e){return e.auth.user}));return Object(z.jsx)(ne.a,{onSubmit:function(e){t(e.text)},initialValues:{text:""},resetAfterSubmit:!0,children:Object(z.jsxs)(ne.b,{children:[Object(z.jsx)("div",{className:re.a.avatar,children:Object(z.jsx)(d.b,{to:"/profile/".concat(null===o||void 0===o?void 0:o.username),tabIndex:n?-1:void 0,children:Object(z.jsx)(j.a,{smallImg:null===o||void 0===o?void 0:o.avatar.small,size:30})})}),Object(z.jsx)(oe.a,{name:"text",placeholder:"Write a comment",disabled:n}),Object(z.jsx)(b.a,{disabled:n,children:Object(z.jsx)(b.a.Text,{children:"Add"})})]})})},ie=r(2),se=r(317),le=r.n(se),de=function(e){var t=e._id,r=e.author,n=e.text,o=e.createdAt,a=(e.likes,e.authorizedUserId),c=e.onDelete,s=e.disabled,l=void 0!==s&&s,m=a===r._id;return Object(z.jsxs)(u.b,{padding:"10px 20px",verticalAlign:"center",gap:10,bordered:!0,children:[Object(z.jsx)(d.b,{to:"/profile/".concat(r.username),tabIndex:l?-1:void 0,children:Object(z.jsx)(j.a,{smallImg:r.avatar.small,size:40})}),Object(z.jsxs)(u.a,{gap:2,children:[Object(z.jsx)(d.b,{to:"/profile/".concat(r.username),tabIndex:l?-1:void 0,children:Object(z.jsxs)("div",{className:le.a.author,children:[r.firstName," ",r.lastName]})}),Object(z.jsx)("div",{className:le.a.date,children:Object(i.b)(o)})]}),Object(z.jsx)("div",{className:le.a.text,children:n}),Object(z.jsx)(u.c,{}),Object(z.jsx)(u.a,{children:Object(z.jsxs)(u.b,{children:[Object(z.jsx)(b.a,{type:"text",size:"sm",disabled:l,children:Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(F,{color:g.a.accent,size:16})})}),m&&Object(z.jsx)(b.a,{type:"text",size:"sm",disabled:l,children:Object(z.jsx)(b.a.Icon,{children:Object(z.jsx)(P.a,{color:g.a.textMid,size:16})})}),m&&Object(z.jsx)(k,{onDelete:function(){c(t)},warningMessage:"Are you sure you want to delete comment?",disabled:l})]})})]})},je=function(e){var t=e.children,r=e.route,n=e.disabled;return Object(z.jsxs)(z.Fragment,{children:[!!r&&Object(z.jsx)(d.b,{to:r,tabIndex:n?-1:void 0,children:Object(z.jsx)(b.a,{type:"link",disabled:n,children:Object(z.jsx)(b.a.Text,{children:t||"Show more"})})}),!r&&Object(z.jsx)(b.a,{type:"link",disabled:n,children:Object(z.jsx)(b.a.Text,{children:t||"Show more"})})]})},ue=function(e){var t=e.active,r=e.comments,n=e.commentsShown,o=void 0===n?3:n,a=e.postId,c=e.authorizedUserId,i=e.onDelete;return Object(z.jsxs)(z.Fragment,{children:[r.slice().reverse().slice(o?0:void 0,o||void 0).map((function(e){return Object(z.jsx)(de,Object(ie.a)(Object(ie.a)({},e),{},{authorizedUserId:c,onDelete:i,disabled:!t}),e._id)})),!!o&&r.length>o&&Object(z.jsx)(u.b,{padding:5,horizontalAlign:"center",bordered:!0,children:Object(z.jsx)(je,{route:"/post/".concat(a),disabled:!t})})]})},be=function(e){var t=e.active,r=e.postId,n=e.commentsShown,o=void 0===n?3:n,a=e.authorizedUserId,c=e.comments,i=e.onAddCommentClick,s=e.onDeleteCommentClick;return Object(z.jsxs)("div",{className:ee()(Z.a.comments,Object(Q.a)({},Z.a.active,t)),children:[Object(z.jsx)(u.b,{padding:"15px 30px",bordered:!0,children:Object(z.jsx)(ce,{onAddComment:i,disabled:!t})}),Object(z.jsx)(ue,{active:t,comments:c,commentsShown:o,postId:r,authorizedUserId:a,onDelete:s})]})},me=r(12),he=r(13),pe=r(14),Oe=r(15),fe=function(e){Object(pe.a)(r,e);var t=Object(Oe.a)(r);function r(e){var n;return Object(me.a)(this,r),(n=t.call(this,e)).state={hasError:!1,error:"Error :("},n}return Object(he.a)(r,[{key:"componentDidCatch",value:function(e,t){console.log(e)}},{key:"render",value:function(){return this.state.hasError?Object(z.jsx)("div",{style:{padding:10,color:"red",border:"1px solid red",borderRadius:5,backgroundColor:"white",display:"flex",justifyContent:"center",alignItems:"center"},children:this.state.error}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0,error:e.message}}}]),r}(a.a.Component);t.a=function(e){var t=e.post,r=e.comments,a=void 0===r?"folded":r,s=e.commentsShown,l=void 0===s?3:s,d=e.onPostDelete,j=e.onPostAddLike,u=e.onPostDeleteLike,b=e.authorizedUserId,m=e.onAddComment,h=e.onDeleteComment,p=Object(o.useState)("shown"===a),O=Object(n.a)(p,2),f=O[0],x=O[1],v=b===t.author._id,g=Object(i.b)(t.createdAt),y=!!b&&t.likes.map((function(e){return e._id})).includes(b);return Object(z.jsx)(fe,{children:Object(z.jsxs)(c.a,{children:[Object(z.jsx)(I,{id:t._id,date:g,isAuthor:v,author:t.author,onDelete:function(){d&&d(t._id)}}),Object(z.jsx)(S,{children:t.text}),Object(z.jsx)(K,{likes:t.likes,isLiked:y,onLikeClick:function(){y?u&&u(t._id):j&&j(t._id)},onCommentClick:"folded"===a?function(){x(!f)}:void 0,onShareClick:function(){return console.log("share clicked")}}),Object(z.jsx)(be,{postId:t._id,authorizedUserId:b,comments:t.comments,commentsShown:"shown"===a?0:l,active:f,onAddCommentClick:function(e){m(t._id,e)},onDeleteCommentClick:function(e){h(e)}})]})})}},312:function(e,t,r){e.exports={dark:"PostHeader_dark__1LQMD",userName:"PostHeader_userName__1wjNH",date:"PostHeader_date__2TczB"}},313:function(e,t,r){e.exports={dark:"ConfirmPopup_dark__3aBqg",question:"ConfirmPopup_question__1r4oF",buttons:"ConfirmPopup_buttons__3W3aK"}},314:function(e,t,r){e.exports={dark:"PostText_dark__1mSD4",text:"PostText_text__yb-T-"}},315:function(e,t,r){e.exports={dark:"PostComments_dark__15MjC",comments:"PostComments_comments__3ojHW",active:"PostComments_active__2FuPp"}},316:function(e,t,r){e.exports={dark:"AddPostCommentForm_dark___3m8P",avatar:"AddPostCommentForm_avatar__1kYXF"}},317:function(e,t,r){e.exports={dark:"PostComment_dark__1TlEw",author:"PostComment_author__3XuoT",date:"PostComment_date__1p83y"}}}]);
//# sourceMappingURL=0.927e3d6f.chunk.js.map