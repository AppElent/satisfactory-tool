import { FieldConfig } from '@/libs/forms';
import useFormField from '@/libs/forms/use-form-field';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AutocompleteProps,
  ChipProps,
  Table as DTable,
  IconButton,
  TableRow as MUITableRow,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextFieldProps,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { FieldArray } from 'formik';
import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import Select from './Select';
import TextField from './TextField';

interface AutocompleteChipListProps {
  name?: string;
  field?: FieldConfig;
  suggestions?: string[];
  muiAutocompleteProps?: Partial<AutocompleteProps<any, any, any, any>>;
  muiChipProps?: ChipProps;
  muiTextFieldProps?: TextFieldProps;
}

const Table = ({ name, field: fieldConfig }: AutocompleteChipListProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  if (!name && !fieldConfig) {
    throw new Error('Either name or field must be provided');
  }
  const fieldName = name || fieldConfig?.name;
  const data = useFormField(fieldName as string);
  const { field, helpers } = data;
  // const [rows, setRows] = useState(
  //   field.value.map((row: any, index: number) => ({ ...row, id: index }))
  // );

  const { editable, selectable, columns = [], title } = fieldConfig?.custom?.table || {};

  // useEffect(() => {
  //     if (field.value.length === 0) {
  //         helpers.push({});
  //     }
  // }, [])

  const handleDeleteRows = () => {
    const newValues = field.value.filter((_: any, index: number) => !selected.includes(index));
    //selected.forEach((index) => deleteFn(index));
    helpers.setValue(newValues);
    setSelected([]);
  };

  const renderCell = (row: any, index: number, column: any) => {
    if (column.render) {
      return column.render(row[column.key]);
    } else if (column.type === 'select') {
      return (
        <Select
          name={`${fieldName}.${index}.${column.key}`}
          field={column.fieldDefinition}
        />
      );
    } else if (column.type === 'autocomplete') {
      return (
        <Autocomplete
          name={`${fieldName}.${index}.${column.key}`}
          field={column.fieldDefinition}
        />
      );
    }
    return (
      <TextField
        name={`${fieldName}.${index}.${column.key}`}
        field={column.fieldDefinition}
        // field={fieldConfig}
      />
    );
  };

  // const handleDeleteRow = (rowId: number) => {
  //   setRows(rows.filter((row: any) => row.id !== rowId));
  // };

  return (
    <FieldArray name={fieldName as string}>
      {({ remove, push }) => (
        <>
          <Toolbar>
            {selectable && selected.length > 0 && (
              <Tooltip title="Delete Selected">
                <IconButton
                  onClick={handleDeleteRows}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            <Typography
              variant="h6"
              id="tableTitle"
            >
              {selected.length > 0 ? `${selected.length} selected` : title || 'Table'}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              style={{ marginLeft: 'auto' }}
            >
              {' '}
              {editable && (
                <Tooltip title="Add Row">
                  <IconButton
                    onClick={() => push({})}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              )}
              {/* {editable && (
                <Tooltip title="Save">
                  <span>
                    <IconButton
                      onClick={formik.handleSubmit}
                      color="primary"
                      disabled={!formik.dirty || !formik.isValid}
                    >
                      <SaveIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )} */}
            </Stack>
          </Toolbar>
          <TableContainer>
            <DTable>
              <TableHead>
                <MUITableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column.label}</TableCell>
                  ))}
                  {(editable || selectable) && <TableCell>Actions</TableCell>}
                </MUITableRow>
              </TableHead>
              <TableBody>
                {field.value.map((row: any, index: number) => (
                  <React.Fragment key={index}>
                    <MUITableRow key={index}>
                      {columns.map((column, columnIndex) => {
                        const tableCellProps =
                          column.fieldDefinition?.custom?.muiTableCellProps || {};
                        return (
                          <TableCell
                            key={columnIndex}
                            {...tableCellProps}
                          >
                            {renderCell(row, index, column)}
                            {/* <TextField name={`${fieldName}.${index}.${column.key}`} /> */}
                          </TableCell>
                        );
                      })}
                      {(editable || selectable) && (
                        <TableCell>
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      )}
                    </MUITableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </DTable>
          </TableContainer>
        </>
      )}
    </FieldArray>
  );
};

export default Table;
