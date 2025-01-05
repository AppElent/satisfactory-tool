import { Tooltip } from '@mui/material';

export interface BaseItemClass {
  className: string;
  slug: string;
  name: string;
}

export default class BaseItem implements BaseItemClass {
  public className: string;
  public slug: string;
  public name: string;
  protected staticFilePath = '/assets/satisfactory/items/';

  constructor(data: BaseItemClass) {
    this.className = data.className;
    this.slug = data.slug;
    this.name = data.name;
  }

  public toString(): string {
    return this.name;
  }

  getIcon = () => {
    return this.staticFilePath + this.className.replace(/_/g, '-').toLowerCase() + '_64.png';
  };

  getImage = () => {
    return this.staticFilePath + this.className.replace(/_/g, '-').toLowerCase() + '_256.png';
  };

  getImageComponent = (size?: number) => {
    return (
      <Tooltip title={this.name}>
        <img
          src={this.getImage()}
          alt={this.name}
          style={{
            width: size || 250,
            height: size || 250,
            //borderRadius: '50%',
            //marginRight: 4,
            //backgroundColor: '#d0d0d0',
          }}
        />
      </Tooltip>
    );
  };

  getIconComponent = (size?: number) => {
    return (
      <Tooltip title={this.name}>
        <img
          src={this.getIcon()}
          alt={this.name}
          style={{
            width: size || 24,
            height: size || 24,
            borderRadius: '50%',
            marginRight: 4,
          }}
        />
      </Tooltip>
    );
  };

  toObject() {
    return {
      className: this.className,
      slug: this.slug,
      name: this.name,
      icon: this.getIcon(),
      image: this.getImage(),
    };
  }
}
