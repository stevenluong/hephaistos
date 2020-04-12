import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function News(props) {
  //var cleanedNews = props.news;
  var sortedNews = props.news.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  console.log(sortedNews)
  return (
    <React.Fragment>
      <Title id="news">News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNews.map(n => (
            <TableRow key={n.guid}>
              <TableCell><img src={n.image_link} height="40" width="40" alt=""/></TableCell>
              <TableCell>{n.datetime}</TableCell>
              <TableCell>{n.source}</TableCell>
              <TableCell><Link href={n.link}>{n.title} </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
