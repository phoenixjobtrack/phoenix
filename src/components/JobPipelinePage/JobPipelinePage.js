import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const JobPipelinePage = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  ['Okta', 'Customer Service', 'Phone Screen', '06/05/19', 'Katie is calling at 9:30am','Tech Interview'],
  ['Microsoft', 'System Analyst', 'Final', '06/06/19', 'Jeff will make the decision', 'Expecting Offer'],
  ['Ubisoft', 'Business analyst', 'Computer Engineer', '06/08/19', 'Bring tax documents', 'Final Move'],
  ['Prime Academy', 'Outreach', 'In-person', '06/10/19', 'Meet in Minneapollis', 'Meet the HR'],
  ['Sezzle', 'Test Analyst', 'HR Interview', '06/15/19', 'Followup with HR', 'Forward Documents'],
];

function createData(id, company, position, stage, nexttouchpoint, notes, nextstage) {
  return { id, company, position, stage, nexttouchpoint, notes, nextstage};
}

const rows = [];

for (let i = 0; i < 50; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function ReactJobPipelinePage() {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <JobPipelinePage
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 150,
            label: 'Company',
            dataKey: 'company',
          },
          {
            width: 120,
            label: 'Position',
            dataKey: 'position',
            //numeric: true,
          },
          {
            width: 120,
            label: 'Stage',
            dataKey: 'stage',
            //numeric: true,
          },
          {
            width: 120,
            label: 'Next Touch Point',
            dataKey: 'nexttouchpoint',
            numeric: true,
          },
          {
            width: 200,
            label: 'Notes',
            dataKey: 'notes',
            //numeric: true,
          },
          {
            width: 200,
            label: 'Next Stage',
            dataKey: 'nextstage',
            //numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
