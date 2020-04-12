import React from 'react';
import Title from './Title';
import Link from '@material-ui/core/Link';


export default function Keywords(props) {
  var keywords = {}
  //console.log(props.news)
  props.news.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    return s.map(i =>{
      if(i in keywords)
        keywords[i] = keywords[i]+1;
      else
        keywords[i] = 1
      return keywords[i]
    })
  })
  var rawKeywords = []
  for(var key in keywords){
    if(key.length>4) //FILTER
      rawKeywords.push({
        word:key,
        count:keywords[key]
      })
  }
  //console.log(rawKeywords)
  rawKeywords.sort(function(a, b){return b.count - a.count});
  var filteredKeywords = [];
  for(var i=0;i<20;i++){
      //console.log(rawKeywords);
      if(rawKeywords[i] && rawKeywords[i].count>1){
        var keyword = rawKeywords[i].word;
        var count = rawKeywords[i].count;
        filteredKeywords.push(<span key={i}><Link href="/#">{keyword}</Link> ({count}) </span>)
      }
  }
  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Keywords</Title>
      <p>
      {filteredKeywords}
      </p>
    </React.Fragment>
  );
}
