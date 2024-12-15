import Calculator from './calculator';

export type NodeType = 'mine' | 'sink' | 'product' | 'byproduct' | 'input' | 'recipe';

interface NodeInterface {
  id: string;
  type: NodeType;
  item: string;
  amount: number;
}

interface ItemAmount {
  item: string;
  amount: number;
}

export default class Node implements NodeInterface {
  public id: string;
  public type: NodeType;
  public item: string;
  public amount: number;
  public grossAmount: { [key: string]: number } = {};
  public usedAmount: { [key: string]: number } = {};

  constructor(
    node: {
      type: NodeType;
      item: string;
      amount: number;
    },
    public calculator: Calculator
  ) {
    this.id = node.type === 'recipe' ? node.item : `${node.item}-${node.type}`;
    this.type = node.type;
    this.item = node.item;
    this.amount = node.amount;
    if (node.type === 'recipe') {
      const recipe = this.getRecipe();
      if (recipe) {
        this.usedAmount = {};
        for (const product of recipe.products) {
          this.usedAmount[product.item] = 0;
        }
      }
    } else {
      this.usedAmount = {
        [node.item]: 0,
      };
    }
    if (node.type === 'recipe') {
      const recipe = this.getRecipe();
      if (recipe) {
        for (const product of recipe.products) {
          this.grossAmount[product.item] = product.amountMin * this.amount;
        }
      }
    } else {
      this.grossAmount = {
        [node.item]: this.amount,
      };
    }
    // this.grossAmount =
    //   node.type === 'recipe'
    //     ? this.amount * (this.getRecipe()?.cyclesMin || 0)
    //     : {
    //         [node.item]: this.amount,
    //       };
  }

  getInputs = (): ItemAmount[] => {
    // Mine or Input dont have inputs
    if (['mine', 'input', 'item'].includes(this.type)) {
      return [];
      // Recipe has ingredients
    } else if (this.type === 'recipe') {
      return (
        this.getRecipe()?.ingredients.map((i) => {
          return {
            item: i.item,
            amount: Math.round(i.amountMin * this.amount * 1000) / 1000,
          };
        }) || []
      );
      // Sink, Product, Byproduct are products
    } else {
      return [
        {
          item: this.item,
          amount: this.amount,
        },
      ];
    }
  };

  getOutputs = (): ItemAmount[] => {
    if (this.type === 'recipe') {
      return (
        this.getRecipe()?.products.map((i) => {
          return {
            item: i.item,
            amount: i.amountMin * this.amount,
          };
        }) || []
      );
    } else if (['mine', 'input'].includes(this.type)) {
      return [
        {
          item: this.item,
          amount: this.amount,
        },
      ];
    }
    return [];
  };

  getProduct = () => {
    return this.type !== 'recipe' ? this.calculator.data.getProduct(this.item) : undefined;
  };

  getRecipe = () => {
    return this.type === 'recipe' ? this.calculator.data.getRecipe(this.item) : undefined;
  };

  useAmount = (item: string, amount: number) => {
    console.log('amount', amount);
    // Check usedAmount against amount and return the amount that can be used
    // Also account for overflow
    // TODO: add item to params and add to usedAmount
    const usedAmount = this.usedAmount[item];
    const grossAmount = this.grossAmount[item];
    console.log(usedAmount, grossAmount, this.grossAmount);
    if (usedAmount + amount > grossAmount) {
      const remaining = Math.round((grossAmount - usedAmount) * 1000) / 1000;
      this.usedAmount[item] = grossAmount;
      // If remaining is negative, return 0
      return remaining < 0 ? 0 : remaining;
    } else {
      this.usedAmount[item] += amount;
      return amount;
    }
  };
}
