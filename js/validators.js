$(function(){jQuery.validator.unobtrusive.adapters.add("maximumfilesize",["maximumsizebytes"],function(n){var t={maximumSizeBytes:n.params.maximumsizebytes};n.rules.maximumfilesize=t;n.message&&(n.messages.maximumfilesize=n.message)});jQuery.validator.addMethod("maximumfilesize",function(n,t,i){var r,u;return n===""?!0:(r=parseInt(i.maximumSizeBytes),t.files!=undefined&&t.files[0]!=undefined&&t.files[0].size!=undefined)?(u=parseInt(t.files[0].size),u<=r):!0})}(jQuery));$(function(){jQuery.validator.unobtrusive.adapters.add("permittedmediatype",["permittedmediatypes"],function(n){var t={permittedTypes:n.params.permittedmediatypes};n.rules.permittedmediatype=t;n.message&&(n.messages.permittedmediatype=n.message)});jQuery.validator.addMethod("permittedmediatype",function(n,t,i){return n===""?!0:i.permittedTypes&&t.files&&t.files[0]&&t.files[0].type?i.permittedTypes.split(",").indexOf(t.files[0].type)>=0:!0})}(jQuery));$(function(){"use strict";jQuery.validator.addMethod("validazurefilename",function(n){return!n||n.length>256||n.indexOf("/")>0?!1:!0},"");jQuery.validator.unobtrusive.adapters.add("validazurefilename",function(n){n.rules.validazurefilename={};n.messages.validazurefilename=n.message})}(jQuery))