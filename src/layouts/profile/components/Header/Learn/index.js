import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SoftTypography from '../../../../../soft-components/SoftTypography';

const GradientBorderTableCell = ({ children }) => {
  return (
    <TableCell style={{ position: 'relative', paddingBottom: '1px' }} align='center'>
      {children}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
        }}
      ></div>
    </TableCell>
  );
};

export default function BasicTable() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
      <TableHead sx={{ display: "table-header-group" }}>
      <TableRow
      >
      <TableCell style={{minWidth:100,fontSize:13,fontWeight:"900",borderBottom: "3px solid #2a68af"}} align="center">
      <SoftTypography
      variant="button"
      color="info"
      fontWeight="medium"
      textGradient
     style={{fontWeight:'bold',fontSize:16}}

    >
    <i>TIME</i>
    </SoftTypography>
      </TableCell>
      <TableCell style={{minWidth:100,fontSize:13,fontWeight:"900",borderBottom: "3px solid #2a68af"}} align="center">
      <SoftTypography
      variant="button"
      color="info"
      fontWeight="medium"
      textGradient
     style={{fontWeight:'bold',fontSize:16}}
    >
    <i>ONLINE MEETING</i>
    </SoftTypography>
      </TableCell>
      </TableRow>
    </TableHead>
        <TableBody>
        <TableRow>
        <GradientBorderTableCell>
          <SoftTypography
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
            style={{ fontWeight: 'bold' }}
          >
            Thur, 5pm - 6pm (E.A.T)
          </SoftTypography>
        </GradientBorderTableCell>
        <GradientBorderTableCell>
          <a href='https://us02web.zoom.us/' target='_blank' rel="noreferrer" style={{ textDecoration: 'none', color: '#000' }}>
            <SoftTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{ fontWeight: 'bold' }}
            >
              Zoom Link
            </SoftTypography>
          </a>
        </GradientBorderTableCell>
      </TableRow>

            <TableRow>
            <GradientBorderTableCell>
            <SoftTypography
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
            style={{fontWeight:'bold'}}
          >
          Fri, 5pm - 6pm (E.A.T)
          </SoftTypography>
            </GradientBorderTableCell>
            <GradientBorderTableCell>
             <a href='https://us02web.zoom.us/' target='_blank' rel="noreferrer" style={{textDecoration:'none',color:'#000'}}>
             <SoftTypography
             variant="button"
             color="info"
             fontWeight="medium"
             textGradient
             style={{fontWeight:'bold'}}
           >
           Zoom Link
           </SoftTypography>
             </a>
            </GradientBorderTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}