import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../icons/pencil-alt';
import { getInitials } from '../../utils/get-initials';
import { Scrollbar } from '../scrollbar';
import { forUrl } from '../../utils/text-normaliser';

export const TownListTable = (props) => {
  
  const {
    towns,
    state = state,
    townsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  // const [selectedTowns, setSelectedTowns] = useState([]);

  // // Reset selected towns when towns change
  // useEffect(() => {
  //     if (selectedTowns.length) {
  //       setSelectedTowns([]);
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [towns]);

  // const enableBulkActions = selectedTowns.length > 0;
  // const selectedSomeTowns = selectedTowns.length > 0
  //   && selectedTowns.length < towns.length;
  // const selectedAllTowns = selectedTowns.length === towns.length;

  return (
    <div {...other}>
      <Scrollbar>
        <Table >
          <TableHead >
            <TableRow>
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Number of Lawyers
              </TableCell>
              <TableCell>
                Lawyer Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {towns.map((town, index) => {
              const townUrl = `/lawyers/${state.short.toLowerCase()}/${town.l.toLowerCase().replace(/ /g, '-')}`;
              return (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                    <NextLink href={townUrl}>
                      {`${town.l}, ${town.p}`}
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {town.n}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      <TypeList 
                        town={town}
                        state={state} 
                        key={"l"+index}
                      />
                     {/* {  town.s.map(el => (
                        <span key={el.type}>{el.type} ({el.count}), </span>
                      )
                        )
                      }  */}
                     
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={townsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </div>
  );
};

const TypeList = (props) => {
  const {
    town,
    state,
    ...other
  } = props;
  const [showMore, setShowMore] = useState(false);

 return (
  <>
  { town.s.map((el, index) => (
    ( (!showMore && (index < 8)) || showMore ) && el.type && 
      <>
        <NextLink href={`/lawyers/${forUrl(state.short)}/${forUrl(town.l)}#${forUrl(el.type)}`}>
         {el.type}
        </NextLink>
         
        ({el.count})
      {(town.s.length - 1) !== index && <>, </> }
      </>
  ))
  }

<Button onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show more ...'}</Button>
</>
 );


}

TownListTable.propTypes = {
  towns: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  townsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
