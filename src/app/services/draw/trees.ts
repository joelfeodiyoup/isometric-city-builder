import { Grid } from '../grid';

/**
 * this class may in the future allow some more semantic accessing of tree stuff.
 */
export class Trees {
  private trees: {
    image: HTMLImageElement;
    height: 4;
  }[] = [];
  public tree(i: number) {
    return this.trees[i % this.trees.length];
  }
  constructor(images: HTMLImageElement[]) {
    this.trees = images.map((image) => {
      return {
        image,
        height: 4,
      };
    });
  }

  /**
   * Just get the tree at some index. Could be useful if you want all rows to be the same for example.
   * @param i
   * @returns
   */
  // private treeAtIndex(i: number) {
  //   const treeKey = this.treeAssets[i % this.treeAssets.length];
  //   return this.assetLoader.assets.images[treeKey];
  // }

  public randomTree() {
    const treeIndex = Math.floor(Math.random() * this.trees.length);
    return this.trees[treeIndex];
  }

  public nTrees() {
    return this.trees.length;
  }
}
