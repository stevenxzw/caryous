/**
 * Created by zhiwen on 14-2-20.
 */

var entries = [
    {"id":1, "title":"第一篇2", "body":"正文", "published":"6/2/2013"},
    {"id":2, "title":"第二篇3", "body":"正文", "published":"6/3/2013"},
    {"id":3, "title":"第三篇4", "body":"正文", "published":"6/4/2013"}
];

exports.getBlogEntries = function (){
    return entries;
}

exports.getBlogEntry = function (id){
    for(var i=0; i < entries.length; i++){
        if(entries[i].id == id) return entries[i];
    }
}
