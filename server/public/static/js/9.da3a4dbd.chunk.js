(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[9],{263:function(e,r,t){"use strict";var s=t(264),c=t.n(s),n=(t(0),t(1));r.a=function(e){var r=e.children;return Object(n.jsx)("div",{className:c.a.tabs,children:r})}},264:function(e,r,t){e.exports={dark:"NavTabs_dark__9PohY",tabs:"NavTabs_tabs__3Ylj8"}},265:function(e,r,t){"use strict";var s=t(19),c=(t(0),t(266)),n=t.n(c),a=t(1);r.a=function(e){var r=e.to,t=e.children;return Object(a.jsx)("div",{className:n.a.tab,children:Object(a.jsx)(s.b,{exact:!0,to:"".concat(r),activeClassName:n.a.active,children:t})})}},266:function(e,r,t){e.exports={dark:"NavTab_dark__YuKJM",tab:"NavTab_tab__3e6SO",active:"NavTab_active__1IRRo"}},361:function(e,r,t){e.exports={dark:"Users_dark__3c1Xq",searchForm:"Users_searchForm__15yCi"}},362:function(e,r,t){e.exports={dark:"UserItem_dark__XkC_K",userItem:"UserItem_userItem__1g2I-",info:"UserItem_info__23FA0",userName:"UserItem_userName__2UwHq",mutualFriends:"UserItem_mutualFriends__mpO6f",controls:"UserItem_controls__2GhUj",row:"UserItem_row__CatuY",button:"UserItem_button__1RRMY"}},383:function(e,r,t){"use strict";t.r(r);var s=t(2),c=t(0),n=t.n(c),a=t(47),i=t(361),u=t.n(i),o=t(362),l=t.n(o),b=t(19),d=t(49),j=t(8),h=t(255),m=t(6),O=t.n(m);function f(){return f=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},f.apply(this,arguments)}function _(e,r){if(null==e)return{};var t,s,c=function(e,r){if(null==e)return{};var t,s,c={},n=Object.keys(e);for(s=0;s<n.length;s++)t=n[s],r.indexOf(t)>=0||(c[t]=e[t]);return c}(e,r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(s=0;s<n.length;s++)t=n[s],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var v=Object(c.forwardRef)((function(e,r){var t=e.color,s=e.size,c=_(e,["color","size"]);return n.a.createElement("svg",f({ref:r,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:s,height:s,fill:t},c),n.a.createElement("path",{d:"M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"}))}));v.propTypes={color:O.a.string,size:O.a.oneOfType([O.a.string,O.a.number])},v.defaultProps={color:"currentColor",size:"1em"};var x=v,p=t(45),I=t.n(p),N=t(1),z=function(e){var r=e.authorized,t=e.authorizedUserId,s=e.user,c=e.subscribePending,n=e.isSubscribed,a=e.subscribe,i=e.unsubscribe,u=e.mutualFriendsCount,o=r&&t===s._id;return Object(N.jsxs)("div",{className:l.a.userItem,children:[Object(N.jsx)("div",{className:l.a.avatar,children:Object(N.jsx)(b.b,{to:"/profile/".concat(s.username),children:Object(N.jsx)(d.a,{smallImg:s.avatar&&s.avatar.small,online:!0,size:70})})}),Object(N.jsxs)("div",{className:l.a.info,children:[Object(N.jsx)(b.b,{to:"/profile/".concat(s.username),children:Object(N.jsx)("div",{className:l.a.userName,children:"".concat(s.firstName," ").concat(s.lastName)})}),0!==u&&u&&Object(N.jsx)(b.b,{to:"/profile/1/mutualfriends",children:Object(N.jsxs)("div",{className:l.a.mutualFriends,children:[u," mutual friends"]})})]}),Object(N.jsxs)("div",{className:l.a.controls,children:[r&&!o&&Object(N.jsxs)("div",{className:l.a.row,children:[Object(N.jsx)("div",{className:l.a.button,children:Object(N.jsx)(b.b,{to:"/dialogs/".concat(s.username),children:Object(N.jsx)(j.a,{type:"text",size:"sm",style:{padding:"0 4px"},children:Object(N.jsx)(j.a.Icon,{children:Object(N.jsx)(h.a,{size:16,color:I.a.midGrey1})})})})}),Object(N.jsx)("div",{className:l.a.button,children:Object(N.jsx)(j.a,{type:"text",size:"sm",style:{padding:"0 4px"},children:Object(N.jsx)(j.a.Icon,{children:Object(N.jsx)(x,{size:16,color:I.a.midGrey1})})})})]}),r&&!o&&Object(N.jsx)("div",{className:l.a.row,children:Object(N.jsx)("div",{className:l.a.button,children:Object(N.jsx)(j.a,{type:"neutral",size:"sm",onClick:function(){n?i(s._id):a(s._id)},spinner:c,children:Object(N.jsx)(j.a.Text,{children:n?"Unfollow":"Follow"})})})})]})]})},g=t(265),U=t(263),w=t(18),y=function(e){var r=e.authorized,t=e.authorizedUserId,s=e.authorizedUserSubscriptions,c=e.users,n=e.subscribePendingUserIds,i=e.subscribe,o=e.unsubscribe,l=Object(w.g)().filter,b=null;return l||(b=c),"subscriptions"===l&&(b=s),"blocked"===l&&(b=c),Object(N.jsxs)(a.a,{children:[r&&Object(N.jsxs)(U.a,{children:[Object(N.jsx)(g.a,{to:"/users",children:"All"}),Object(N.jsx)(g.a,{to:"/users/subscriptions",children:"Subscriptions"})]}),Object(N.jsx)("div",{className:u.a.usersItems,children:b&&b.map((function(e){return Object(N.jsx)(z,{authorized:r,authorizedUserId:t,user:e,subscribePending:n.includes(e._id),isSubscribed:s.map((function(e){return e._id})).includes(e._id),subscribe:i,unsubscribe:o,mutualFriendsCount:4},e._id)}))})]})},k=t(21),P=t(119);r.default=function(){var e=Object(k.b)(),r={authorized:Object(k.c)((function(e){return e.auth.authorized})),authorizedUserId:Object(k.c)((function(e){var r;return null===(r=e.auth.user)||void 0===r?void 0:r._id})),authorizedUserSubscriptions:Object(k.c)((function(e){var r;return(null===(r=e.auth.user)||void 0===r?void 0:r.subscriptions)||[]})),users:Object(k.c)((function(e){return e.users.users})),subscribePendingUserIds:Object(k.c)((function(e){return e.users.subscribePendingUserIds})),subscribe:function(r){return e(Object(P.b)(r))},unsubscribe:function(r){return e(Object(P.c)(r))}};return Object(c.useEffect)((function(){e(Object(P.a)())}),[e,r.authorized]),Object(N.jsx)(y,Object(s.a)({},r))}}}]);
//# sourceMappingURL=9.da3a4dbd.chunk.js.map