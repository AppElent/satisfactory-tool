import JsonEditor from '@/components/default/json-editor';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { productionItemSchema } from '@/schemas/satisfactory/production-item';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

const presetOptions = [
  {
    label: 'All tier 0 products',
    value: 'tier0',
  },
  {
    label: 'All tier 1 products',
    value: 'tier1',
  },
  {
    label: 'All tier 2 products',
    value: 'tier2',
  },
  {
    label: 'All tier 3 products',
    value: 'tier3',
  },
  {
    label: 'All tier 4 products',
    value: 'tier4',
  },
  {
    label: 'All tier 5 products',
    value: 'tier5',
  },
  {
    label: 'All tier 6 products',
    value: 'tier6',
  },
  {
    label: 'All tier 7 products',
    value: 'tier7',
  },
  {
    label: 'All tier 8 products',
    value: 'tier8',
  },
  {
    label: 'All end products',
    value: 'endproducts',
  },
];

const JsonConfigCard = () => {
  const { config, saveConfig } = useSatisfactoryCalculator();
  const [json, setJsonState] = useState<string>('');
  const [preset, setPreset] = useState<string>();

  const setJson = (config: any) => {
    const dataWithoutId = _.omit(config, 'id');
    setJsonState(JSON.stringify(dataWithoutId, null, 2));
  };

  useEffect(() => {
    setJson(config);
  }, [config]);

  const getPresetConfig = (key: string) => {
    const filter = (product: (typeof satisfactoryData.products)[0]) =>
      product.getRecipes().length > 0 &&
      !satisfactoryData.excludeBuildProducts.includes(product.className) &&
      !product.isResource &&
      !['consumable', 'ammo', 'equipment'].includes(product.category);
    const presetConfig = calculatorSchema.getTemplate();
    presetConfig.id = config.id;
    presetConfig.name = config.name;
    presetConfig.externalId = config.externalId;
    if (key.startsWith('tier')) {
      const tier = key.replace('tier', '');
      presetConfig.production = satisfactoryData.products
        .filter((pr) => pr.tier === tier)
        .filter((pr) => filter(pr))
        .map((product) => {
          return {
            ...productionItemSchema.getTemplate(),
            item: product.className,
            amount: 1,
          };
        });
    } else if (key === 'endproducts') {
      presetConfig.production = satisfactoryData.getEndProducts().map((product) => {
        return {
          ...productionItemSchema.getTemplate(),
          item: product.className,
          amount: 1,
        };
      });
    }
    console.log(presetConfig);
    return presetConfig;
  };

  const loadPreset = () => {
    if (preset && preset !== '') {
      const presetConfig = getPresetConfig(preset);
      setJson(presetConfig);
    }
  };

  const handleSave = () => {
    try {
      const data = JSON.parse(json);
      if (!data) {
        throw new Error('Invalid JSON');
      }
      if (saveConfig) {
        saveConfig({
          ...data,
          id: config.id,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card>
      <CardHeader
        title="JSON Configuration"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <TextField
          fullWidth
          label="JSON"
          multiline
          onChange={(e) => setJsonState(e.target.value)}
          rows={10}
          value={json}
          variant="outlined"
        />
        <Typography
          color="textSecondary"
          variant="caption"
        >
          You can load several predefined presets. Be careful when using this feature as it
          overrides all settings.
        </Typography>
        <Select
          fullWidth
          label="Preset"
          onChange={(e) => setPreset(e.target.value as string)}
          value={preset || ''}
          variant="outlined"
        >
          {presetOptions.map((option) => {
            return (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </Select>

        <JsonEditor data={config} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={loadPreset}>Load preset</Button>
        <Button
          onClick={handleSave}
          variant="contained"
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

export default JsonConfigCard;
