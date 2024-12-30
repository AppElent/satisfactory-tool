import { FieldConfig } from '@/libs/forms';
import useFormField from '@/libs/forms/use-form-field';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListProps,
  TextField,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface CustomCheckboxListProps {
  name?: string;
  field?: FieldConfig;
  muiListProps?: ListProps;
}

const CheckboxList = ({ name, field: fieldConfig }: CustomCheckboxListProps) => {
  if (!name && !fieldConfig) {
    throw new Error('Either name or field must be provided');
  }
  const [searchQuery, setSearchQuery] = useState('');
  const fieldName = name || fieldConfig?.name;
  const data = useFormField(fieldName as string, fieldConfig);
  const { field, helpers } = data;

  const optionList = fieldConfig?.options || [];
  //   const checked = field.value || [];
  const [checkedItems, setCheckedItems] = useState(new Set(field.value || []));

  useEffect(() => {
    const newCheckedItems = new Set(field.value || []);
    if (!_.isEqual(Array.from(newCheckedItems), Array.from(checkedItems))) {
      setCheckedItems(newCheckedItems);
    }
  }, [field.value, checkedItems]);

  // const label = fieldConfig?.translationKey
  //   ? t(fieldConfig?.translationKey, { defaultValue: fieldConfig?.label || fieldName })
  //   : fieldConfig?.label || name;)

  const IconComponent: React.FC<{ imageUrl: string; alt: string }> = ({ imageUrl, alt }) => (
    <Box sx={{ width: 40, height: 40 }}>
      <img
        src={imageUrl}
        alt={alt}
        width={30}
        height={30}
      />
    </Box>
  );

  const handleToggle = (key: string) => {
    const newCheckedItems = new Set(checkedItems);

    if (newCheckedItems.has(key)) {
      newCheckedItems.delete(key);
    } else {
      newCheckedItems.add(key);
    }

    setCheckedItems(newCheckedItems);
    helpers.setValue(Array.from(newCheckedItems));
  };

  const filteredOptions = optionList.filter(
    (item) =>
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          sx={{ mr: 1 }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSearchQuery('')}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            helpers.setValue(optionList.map((item) => item.key));
          }}
        >
          Select all
        </Button>
        <Button
          onClick={() => {
            helpers.setValue([]);
          }}
        >
          Select none
        </Button>
      </Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {filteredOptions.map((item) => {
          const labelId = `checkbox-list-label-${item.key}`;

          return (
            <ListItem
              key={item.key}
              disablePadding
              onClick={() => handleToggle(item.key)}
            >
              <ListItemButton
                role={undefined}
                // onClick={() => {
                //     const newCheckedItems = new Set(checkedItems);

                //     if (newCheckedItems.has(key)) {
                //       newCheckedItems.delete(key);
                //     } else {
                //       newCheckedItems.add(key);
                //     }

                //     setCheckedItems(newCheckedItems);
                //     helpers.setValue(Array.from(newCheckedItems));
                // }}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedItems.has(item.key)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                {item.img && (
                  <ListItemIcon>
                    <IconComponent
                      imageUrl={item.img}
                      alt={item.label}
                    />
                  </ListItemIcon>
                )}
                <ListItemText
                  id={labelId}
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default CheckboxList;
