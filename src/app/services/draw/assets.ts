import { XhrFactory } from '@angular/common';
import { Trees } from './trees';

export type ImageAssetReference = {
  image: 'tree' | 'building';
  index: number;
};
export class Assets {
  public trees?: Trees;

  private toLoad = 0;
  private loaded = 0;

  private readonly imageExtensions = ['png', 'jpg', 'gif'];
  private readonly fontExtensions = ['ttf', 'otf', 'ttc', 'woff'];
  private readonly jsonExtensions = ['json'];
  private readonly audioExtensions = ['mp3', 'ogg', 'wav', 'webm'];

  private assets: {
    images: { [key: string]: HTMLImageElement };
    json: { [key: string]: Object };
  } = {
    images: {},
    json: {},
  };

  private onLoadingComplete() {
    this.trees = new Trees(Object.values(this.assets.images));
  }

  public getAsset(ref: ImageAssetReference) {
    if (ref.image === 'tree') {
      return this.trees?.tree(ref.index);
    }
    return;
  }

  public load(sources: string[]) {
    return new Promise<boolean>((resolve) => {
      let loadHandler = () => {
        this.loaded += 1;
        console.log(`loaded asset #${this.loaded}`);

        // has everything loaded?
        if (this.toLoad === this.loaded) {
          this.toLoad = 0;
          this.loaded = 0;
          console.log('Assets finished loading');

          this.onLoadingComplete();

          resolve(true);
        }
      };

      console.log('Loading assets...');

      this.toLoad = sources.length;

      sources.forEach((source) => {
        let extension = source.split('.').pop();

        if (!extension) {
          return console.log('File type not recognised: ' + source);
        }

        if (this.imageExtensions.indexOf(extension) !== -1) {
          this.loadImage(source, loadHandler);
        } else if (this.fontExtensions.indexOf(extension) !== -1) {
          this.loadFont(source, loadHandler);
        } else if (this.jsonExtensions.indexOf(extension) !== -1) {
          this.loadJson(source, loadHandler);
        } else if (this.audioExtensions.indexOf(extension) !== -1) {
          this.loadSound(source, loadHandler);
        } else {
          console.log('File type not recognised: ' + source);
        }
      });
    });
  }

  private loadImage(source: string, loadHandler: () => void) {
    let image = new Image();
    image.addEventListener('load', loadHandler, false);
    this.assets.images[source] = image;
    image.src = source;
    // image.src = source.split("/").pop() ?? "";
  }
  private loadFont(source: string, loadHandler: () => void) {
    let fontFamily = source.split('/').pop()?.split('.')[0];

    let newStyle = document.createElement('style');
    let fontFace = `@font-face {font-family: '${fontFamily}'; src: url('${source}');}`;
    newStyle.appendChild(document.createTextNode(fontFace));
    document.head.appendChild(newStyle);
  }
  private loadJson(source: string, loadHandler: () => void) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', source, true);
    xhr.responseType = 'text';
    xhr.onload = (event) => {
      if (xhr.status === 200) {
        let file = JSON.parse(xhr.responseText);
        file.name = source;
        this.assets.json[file.name] = file;
        if (file.frames) {
          this.createTilesetFrames(file, source, loadHandler);
        } else {
          loadHandler();
        }
      }
    };
    xhr.send();
  }
  private loadSound(source: string, loadHandler: () => void) {
    console.log('implemented in chapter 10');
  }
  private createTilesetFrames(
    file: File,
    source: string,
    loadHandler: () => void
  ) {
    let baseUrl = source.replace(/[^\/]*$/, '');
    // let imageSource = baseUrl + file.meta.image;
    // TODO!!!!!!!
  }
}
