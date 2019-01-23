
export function getLangCodeByKey(key){
    var langCode='CHS';
    key=(key||'').toUpperCase();
    if(key=='CHS'||key=='CHI'||key=='ENG'){
        langCode=key;
    }
    return langCode;
}