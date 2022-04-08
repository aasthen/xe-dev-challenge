import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const PropertyTable = (props) => {
    const {
        data
    } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ 
                    minWidth: 650 ,
                }} 
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell className='headerCell'>Title</TableCell>
                        <TableCell className='headerCell'>Type</TableCell>
                        <TableCell className='headerCell'>Area</TableCell>
                        <TableCell className='headerCell'>PlaceId</TableCell>
                        <TableCell className='headerCell'>Price</TableCell>
                        <TableCell className='headerCell'>ExtraDescription</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index ) => (
                        <TableRow
                            key={row.title}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell data-testid={('titleCell').concat(index)} >{row.title}</TableCell>
                            <TableCell data-testid={('typeCell').concat(index)} >{row.type}</TableCell>
                            <TableCell data-testid={('areaCell').concat(index)} >{row.area}</TableCell>
                            <TableCell data-testid={('placeCell').concat(index)} >{row.placeId}</TableCell>
                            <TableCell data-testid={('priceCell').concat(index)} >{row.price}</TableCell>
                            <TableCell data-testid={('extraInfoCell').concat(index)} >{row.extraInfo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

PropertyTable.defaultProps = {
    data: []
}

export default PropertyTable;