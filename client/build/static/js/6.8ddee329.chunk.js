(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[6],{264:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var a=r(33),n=(r(0),r(265)),i=r.n(n),o=r(17),c=r(1),s=function(e){var t=e.name,r=e.label,n=e.rules,s=e.control,l=e.rows,u=void 0===l?2:l,d=e.disabled,b=void 0!==d&&d,j=e.placeholder;return Object(c.jsx)(a.a,{control:s,name:t,rules:n,render:function(e){var t=e.field,a=e.fieldState;return Object(c.jsx)(o.c,{label:r,required:!(null===n||void 0===n||!n.required),error:a.error,disabled:b,children:Object(c.jsx)("textarea",{className:"".concat(i.a.textarea," ").concat(a.error?i.a.error:""),name:t.name,value:t.value,onChange:t.onChange,rows:u,disabled:b,placeholder:j})})}})}},265:function(e,t,r){e.exports={dark:"InputTextarea_dark__c3Uh-",textarea:"InputTextarea_textarea__29Lkx",error:"InputTextarea_error__7n4iw"}},276:function(e,t,r){e.exports={dark:"NewPostInputForm_dark__2CWsU",controls:"NewPostInputForm_controls__XxkAp"}},277:function(e,t,r){"use strict";r(0);var a=r(278),n=r.n(a),i=r(290),o=r(18),c=r(92),s=r(1),l=function(e){var t=e.posts,r=e.onPostDelete,a=e.onPostDeleteLike,o=e.authorizedUserId,c=e.onPostAddLike,l=e.onAddComment,u=e.onDeleteComment;return Object(s.jsx)("div",{className:n.a.wrapper,children:t.slice().reverse().map((function(e){return Object(s.jsx)(i.a,{post:e,commentsShown:3,onPostDelete:r,onPostDeleteLike:a,onPostAddLike:c,authorizedUserId:o,onAddComment:l,onDeleteComment:u},e._id)}))})};t.a=function(e){var t=e.posts,r=Object(o.b)(),a=Object(o.c)((function(e){var t;return null===(t=e.auth.user)||void 0===t?void 0:t._id}));return Object(s.jsx)(l,{posts:t,onPostAddLike:function(e){r(Object(c.c)(e))},onPostDeleteLike:function(e){r(Object(c.g)(e))},onAddComment:function(e,t){r(Object(c.b)(e,t))},onDeleteComment:function(e){r(Object(c.f)(e))},onPostDelete:function(e){r(Object(c.e)(e))},authorizedUserId:a})}},278:function(e,t,r){e.exports={dark:"Feed_dark__1sSCY"}},279:function(e,t,r){"use strict";r.d(t,"a",(function(){return j}));var a=r(10),n=(r(292),r(280),r(281)),i=r.n(n),o=r(33),c=r(0),s=r(293),l=r.n(s),u=r(17),d=r(1),b=function(e){var t=e.value,r=e.onChange,n=Object(c.useState)(t?new Date(t):new Date),i=Object(a.a)(n,2),o=i[0],s=i[1];return Object(d.jsx)(l.a,{dateFormat:"dd.MM.yyyy",calendarStartDay:1,selected:o,onChange:function(e){r(e),s(e)}})},j=function(e){var t=e.name,r=e.label,a=e.rules,n=e.control,c=e.disabled,s=void 0!==c&&c;return Object(d.jsx)(o.a,{control:n,name:t,rules:a,render:function(e){var t=e.field,n=e.fieldState;return Object(d.jsx)(u.c,{label:r,required:!(null===a||void 0===a||!a.required),error:n.error,disabled:s,children:Object(d.jsx)("div",{className:i.a.input,children:Object(d.jsx)(b,{value:t.value,onChange:t.onChange})})})}})}},280:function(e,t,r){},281:function(e,t,r){e.exports={dark:"InputDate_dark__1yJGL",input:"InputDate_input__3URzF",error:"InputDate_error__-bIoh"}},291:function(e,t,r){"use strict";var a=r(0),n=r.n(a),i=r(5),o=r.n(i);function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},c.apply(this,arguments)}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=Object(a.forwardRef)((function(e,t){var r=e.color,a=e.size,i=s(e,["color","size"]);return n.a.createElement("svg",c({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:r},i),n.a.createElement("path",{d:"M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"}),n.a.createElement("path",{d:"M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"}))}));l.propTypes={color:o.a.string,size:o.a.oneOfType([o.a.string,o.a.number])},l.defaultProps={color:"currentColor",size:"1em"};var u=l,d=r(276),b=r.n(d),j=r(48),f=r(9),O=r(17),m=r(264),v=r(92),p=r(18),h=r(1);t.a=function(){var e=Object(p.c)((function(e){return e.posts.isAddPostPending})),t=Object(p.b)();return Object(h.jsx)(j.a,{children:Object(h.jsxs)(O.a,{onSubmit:function(e){var r=e.newPostText;t(Object(v.a)(r))},initialValues:{newPostText:""},resetAfterSubmit:!0,children:[Object(h.jsx)(m.a,{name:"newPostText",placeholder:"Share your thoughts and feelings!"}),Object(h.jsxs)("div",{className:b.a.controls,children:[Object(h.jsx)(f.a,{onClick:function(e){e.preventDefault(),console.log("Attach file button clicked")},type:"text",size:"sm",children:Object(h.jsx)(f.a.Icon,{children:Object(h.jsx)(u,{color:"#909BA4",size:18})})}),Object(h.jsx)(f.a,{type:"primary",size:"sm",spinner:e,children:Object(h.jsx)(f.a.Text,{children:"Send"})})]})]})})}},318:function(e,t,r){e.exports={dark:"ProfileCoverImage_dark__2HZ9d",coverImage:"ProfileCoverImage_coverImage__IVzNP",image:"ProfileCoverImage_image__3Bfvt",editCoverImageButton:"ProfileCoverImage_editCoverImageButton__2ZrxJ"}},319:function(e,t,r){e.exports={dark:"ProfileHeader_dark__2UPvm",profileHeader:"ProfileHeader_profileHeader__3YlzN",avatar:"ProfileHeader_avatar__39oti",onlineIndicator:"ProfileHeader_onlineIndicator__3MNxp",profileHeaderInfo:"ProfileHeader_profileHeaderInfo__2xclS",editProfile:"ProfileHeader_editProfile__3W3ZR",name:"ProfileHeader_name__mJSKE",status:"ProfileHeader_status__31D6n",statusEditable:"ProfileHeader_statusEditable__3v2Iq",editStatus:"ProfileHeader_editStatus__wKkn8",editStatusButton:"ProfileHeader_editStatusButton__3y-Bs"}},361:function(e,t,r){e.exports={dark:"OnlineIndicator_dark__1sF-6",onlineIndicator:"OnlineIndicator_onlineIndicator__2O2M7"}},362:function(e,t,r){e.exports={dark:"ProfileInfoData_dark__OJTx5",profileInfoData:"ProfileInfoData_profileInfoData__1795W",bio:"ProfileInfoData_bio__2lKDL",profileInfoItems:"ProfileInfoData_profileInfoItems__3xvBT",item:"ProfileInfoData_item__CZVy6",itemTitle:"ProfileInfoData_itemTitle__2CmBI",itemIcon:"ProfileInfoData_itemIcon__dewqr",itemLabel:"ProfileInfoData_itemLabel__2MCn3",itemText:"ProfileInfoData_itemText__2BZIm"}},386:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),i=r(18),o=r(19),c=r(95),s=r(92),l=r(291),u=r(277),d=r(10),b=r(318),j=r.n(b),f=r(5),O=r.n(f);function m(){return m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},m.apply(this,arguments)}function v(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=Object(a.forwardRef)((function(e,t){var r=e.color,a=e.size,i=v(e,["color","size"]);return n.a.createElement("svg",m({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:r},i),n.a.createElement("path",{d:"M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"}),n.a.createElement("path",{d:"M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"}))}));p.propTypes={color:O.a.string,size:O.a.oneOfType([O.a.string,O.a.number])},p.defaultProps={color:"currentColor",size:"1em"};var h=p,x=r.p+"static/media/cover-default.70b51b24.jpg",g=r(9),_=r(120),y=r(83),w=r(62),I=r(1),P=function(e){var t=e.img,r=void 0===t?x:t,n=e.owner,i=void 0!==n&&n,o=e.onCoverImageSubmit,c=Object(a.useState)(!1),s=Object(d.a)(c,2),l=s[0],u=s[1],b=Object(w.b)().tablet;Object(a.useEffect)((function(){u(!1)}),[r]);var f=function(){return u(!0)};return Object(I.jsxs)("div",{className:j.a.coverImage,children:[Object(I.jsxs)("div",{className:j.a.editCoverImageButton,children:[i&&!b&&Object(I.jsxs)(g.a,{type:"neutral",onClick:f,size:"sm",children:[Object(I.jsx)(g.a.Icon,{children:Object(I.jsx)(h,{width:15,height:15})}),Object(I.jsx)(g.a.Text,{children:"Edit Cover Image"})]}),i&&b&&Object(I.jsx)(g.a,{type:"neutral",onClick:f,size:"lg",children:Object(I.jsx)(g.a.Icon,{children:Object(I.jsx)(h,{width:20,height:20})})})]}),Object(I.jsx)(y.a,{open:l,children:Object(I.jsx)(_.a,{aspect:3.5,onSubmit:o,closeModal:function(){return u(!1)}})}),Object(I.jsx)("img",{className:j.a.image,src:r||x,alt:""})]})},S=r(115),z=r(73),N=r.n(z),k=r(319),C=r.n(k),D=r(49),E=r(17),T=r(93),M=function(e){var t=e.onSubmit,r=e.initialStatus;return Object(I.jsx)(E.a,{onSubmit:t,submitOnBlur:!0,initialValues:{status:r},submitOnEnter:!0,children:Object(I.jsx)(T.a,{name:"status",autoFocus:!0})})},A=r(54),H=r(279),L=function(e){var t=e.initialValues,r=e.onSubmit,a=e.closeModal;return Object(I.jsxs)(E.a,{onSubmit:function(e){r(e),a&&a()},initialValues:t,children:[Object(I.jsxs)(E.b,{children:[Object(I.jsx)(g.a,{size:"md",children:Object(I.jsx)(g.a.Text,{children:"Save"})}),Object(I.jsx)("div",{style:{marginLeft:"auto"},children:Object(I.jsx)(g.a,{onClick:function(e){e.preventDefault(),a&&a()},size:"md",type:"cancel",children:Object(I.jsx)(g.a.Text,{children:"Cancel"})})})]}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"firstName",label:"First name",rules:{required:!0}})}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"lastName",label:"Last name",rules:{required:!0}})}),Object(I.jsx)(E.b,{children:Object(I.jsx)(H.a,{name:"birthDate",label:"Birth date"})}),Object(I.jsxs)(E.b,{children:[Object(I.jsx)(T.a,{name:"location.country",label:"Country"}),Object(I.jsx)(T.a,{name:"location.city",label:"City"})]}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"bio",label:"Bio"})}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"contacts.website",label:"Website"})}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"contacts.vkontakte",label:"Vkontakte"})}),Object(I.jsx)(E.b,{children:Object(I.jsx)(T.a,{name:"contacts.github",label:"Github"})})]})},B=function(e){var t=e.closeModal,r=Object(i.c)((function(e){var t,r,a,n,i,o;return{firstName:null===(t=e.profile.user)||void 0===t?void 0:t.firstName,lastName:null===(r=e.profile.user)||void 0===r?void 0:r.lastName,birthDate:null===(a=e.profile.user)||void 0===a?void 0:a.birthDate,bio:null===(n=e.profile.user)||void 0===n?void 0:n.bio,location:null===(i=e.profile.user)||void 0===i?void 0:i.location,contacts:null===(o=e.profile.user)||void 0===o?void 0:o.contacts}})),a=Object(i.b)();Object(w.a)();return r?Object(I.jsx)(L,{closeModal:t,initialValues:r,onSubmit:function(e){a(Object(c.e)(e))}}):Object(I.jsx)(A.a,{})},V=r(253),F=r(361),U=r.n(F),q=function(e){var t=e.children;return Object(I.jsx)("div",{className:U.a.onlineIndicator,children:t})},J=function(e){var t=e.online,r=void 0!==t&&t,n=e.owner,i=void 0!==n&&n,o=e.firstName,c=e.lastName,s=e.status,l=e.avatar,u=e.onAvatarSubmit,b=e.onStatusUpdate,j=Object(a.useState)(!1),f=Object(d.a)(j,2),O=f[0],m=f[1],v=Object(a.useState)(s||"What is your status?"),p=Object(d.a)(v,2),h=p[0],x=p[1];Object(a.useEffect)((function(){x(s||"What is your status?")}),[s]);var _=Object(a.useState)(!1),y=Object(d.a)(_,2),P=y[0],z=y[1],k=function(){return z(!0)},E=Object(w.b)(),T=E.tablet,A=E.phoneTablet;return Object(I.jsxs)("div",{className:C.a.profileHeader,children:[Object(I.jsxs)("div",{className:C.a.avatar,children:[Object(I.jsx)(D.a,{smallImg:null===l||void 0===l?void 0:l.small,largeImg:null===l||void 0===l?void 0:l.large,border:!0,shadow:!0,size:A?Number.parseInt(N.a.avatarProfilePhoneTablet):Number.parseInt(N.a.avatarProfile),onEdit:i?u:void 0}),r&&Object(I.jsx)("div",{className:C.a.onlineIndicator,children:Object(I.jsx)(q,{children:"Online"})})]}),Object(I.jsxs)("div",{className:C.a.profileHeaderInfo,children:[Object(I.jsxs)("div",{className:C.a.name,children:[o," ",c]}),i&&Object(I.jsxs)("div",{className:C.a.status,children:[Object(I.jsx)("div",{className:C.a.statusEditable,onClick:function(){m(!0)},children:h}),O&&Object(I.jsx)("div",{className:C.a.editStatus,children:Object(I.jsx)(M,{onSubmit:function(e){b(e.status),m(!1)},initialStatus:h})})]}),!i&&Object(I.jsx)("div",{className:C.a.status,children:s})]}),Object(I.jsx)("div",{className:C.a.editProfile,children:i&&Object(I.jsxs)("div",{children:[!T&&Object(I.jsxs)(g.a,{type:"secondary",onClick:k,size:"sm",children:[Object(I.jsx)(g.a.Icon,{children:Object(I.jsx)(V.a,{width:T?20:15,height:T?20:15})}),Object(I.jsx)(g.a.Text,{children:"Edit profile"})]}),T&&Object(I.jsx)(g.a,{type:"secondary",onClick:k,size:"lg",children:Object(I.jsx)(g.a.Icon,{children:Object(I.jsx)(V.a,{width:T?20:15,height:T?20:15})})}),Object(I.jsx)(S.a,{open:P,modal:!0,nested:!0,contentStyle:{borderRadius:5,padding:"20px"},closeOnDocumentClick:!1,children:Object(I.jsx)(B,{closeModal:function(){return z(!1)}})})]})})]})},R=r(362),W=r.n(R);function Z(){return Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},Z.apply(this,arguments)}function K(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var G=Object(a.forwardRef)((function(e,t){var r=e.color,a=e.size,i=K(e,["color","size"]);return n.a.createElement("svg",Z({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:r},i),n.a.createElement("path",{d:"M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"}),n.a.createElement("path",{d:"M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"}))}));G.propTypes={color:O.a.string,size:O.a.oneOfType([O.a.string,O.a.number])},G.defaultProps={color:"currentColor",size:"1em"};var Y=G;function X(){return X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},X.apply(this,arguments)}function Q(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var $=Object(a.forwardRef)((function(e,t){var r=e.color,a=e.size,i=Q(e,["color","size"]);return n.a.createElement("svg",X({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:r},i),n.a.createElement("path",{d:"M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"}),n.a.createElement("path",{d:"M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}))}));$.propTypes={color:O.a.string,size:O.a.oneOfType([O.a.string,O.a.number])},$.defaultProps={color:"currentColor",size:"1em"};var ee=$;function te(){return te=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},te.apply(this,arguments)}function re(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var ae=Object(a.forwardRef)((function(e,t){var r=e.color,a=e.size,i=re(e,["color","size"]);return n.a.createElement("svg",te({ref:t,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:a,height:a,fill:r},i),n.a.createElement("path",{d:"M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"}),n.a.createElement("path",{d:"M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"}))}));ae.propTypes={color:O.a.string,size:O.a.oneOfType([O.a.string,O.a.number])},ae.defaultProps={color:"currentColor",size:"1em"};var ne=ae,ie=r(91),oe=r(263),ce=function(e){var t=e.bio;return Object(I.jsx)(oe.b,{padding:"0 0 20px",children:Object(I.jsx)("div",{className:W.a.bio,children:t})})},se=function(e){var t=e.icon,r=e.label,a=e.link,i=e.iconSize,o=void 0===i?16:i,c=e.children;return Object(I.jsxs)("div",{className:W.a.item,children:[Object(I.jsxs)("div",{className:W.a.itemTitle,children:[!!t&&Object(I.jsx)("div",{className:W.a.itemIcon,children:n.a.createElement(t,{size:o})}),!!r&&Object(I.jsx)("div",{className:W.a.itemLabel,children:r})]}),!a&&Object(I.jsx)("span",{className:W.a.itemText,children:c}),!!a&&Object(I.jsx)("a",{href:a,className:W.a.itemLink,children:c})]})},le=function(e){var t=e.birthDate,r=e.location,a=e.contacts,n=e.bio;return Object(I.jsxs)("div",{className:W.a.profileInfoData,children:[n&&Object(I.jsx)(ce,{bio:n}),Object(I.jsxs)("div",{className:W.a.profileInfoItems,children:[!!t&&Object(I.jsx)(se,{icon:Y,iconSize:14,label:"Birthday",children:Object(ie.b)(t,"MMMM, D")}),!(null===r||void 0===r||!r.country)&&!(null===r||void 0===r||!r.city)&&Object(I.jsxs)(se,{icon:ee,iconSize:15,label:"Location",children:[r.country,", ",r.city]}),!(null===a||void 0===a||!a.website)&&Object(I.jsx)(se,{icon:ne,label:"Website",link:"http://"+a.website,children:a.website})]})]})},ue=r(48),de=function(e){var t=e.user,r=e.isOwner,a=e.onAvatarSubmit,n=e.onCoverImageSubmit,i=e.onStatusUpdate;return Object(I.jsxs)(ue.a,{children:[Object(I.jsx)(P,{owner:r,img:t.coverImage,onCoverImageSubmit:n}),Object(I.jsx)(J,{online:Object(ie.a)(t.updatedAt),owner:r,firstName:t.firstName,lastName:t.lastName,status:t.status,avatar:t.avatar,onAvatarSubmit:a,onStatusUpdate:i}),Object(I.jsx)(le,{birthDate:t.birthDate,location:t.location,contacts:t.contacts,bio:t.bio})]})},be=r(305);t.default=function(){var e=Object(o.g)().username,t=Object(i.b)();Object(a.useEffect)((function(){e&&(t(Object(c.b)(e)),t(Object(s.j)(e)))}),[e,t]);var r=Object(i.c)((function(e){return e.auth.user})),n=Object(i.c)((function(e){return e.profile.user})),d=(null===r||void 0===r?void 0:r._id)===n._id,b=Object(i.c)((function(e){return e.posts.posts}));return r||e?r&&!e?Object(I.jsx)(o.a,{to:"/profile/".concat(r.username)}):Object(I.jsxs)(I.Fragment,{children:[n.firstName&&n.lastName&&Object(I.jsx)(be.a,{children:Object(I.jsxs)("title",{children:[n.firstName," ",n.lastName]})}),Object(I.jsx)(de,{user:n,isOwner:d,onAvatarSubmit:function(e,r){var a=new FormData;a.append("image",e),a.append("crop",JSON.stringify(r)),t(Object(c.c)(a))},onCoverImageSubmit:function(e,r){var a=new FormData;a.append("image",e),a.append("crop",JSON.stringify(r)),t(Object(c.d)(a))},onStatusUpdate:function(e){t(Object(c.f)(e))}}),d&&Object(I.jsx)(l.a,{}),Object(I.jsx)(u.a,{posts:b})]}):Object(I.jsx)(o.a,{to:"/login"})}}}]);
//# sourceMappingURL=6.8ddee329.chunk.js.map