// @ts-ignore
import Imposter from '../../assets/every-layout/Imposter/Imposter.js';
// @ts-ignore
import Icon from '../../assets/every-layout/Icon/Icon.js';
// @ts-ignore
import Stack from '../../assets/every-layout/Stack/Stack.js';
// @ts-ignore
import Box from '../../assets/every-layout/Box/Box.js';
// @ts-ignore
import Center from '../../assets/every-layout/Center/Center.js';
// @ts-ignore
import Cluster from '../../assets/every-layout/Cluster/Cluster.js';
// @ts-ignore
import Sidebar from '../../assets/every-layout/Sidebar/Sidebar.js';
// @ts-ignore
import Switcher from '../../assets/every-layout/Switcher/Switcher.js';
// @ts-ignore
import Cover from '../../assets/every-layout/Cover/Cover.js';
// @ts-ignore
import Grid from '../../assets/every-layout/Grid/Grid.js';
// @ts-ignore
import Frame from '../../assets/every-layout/Frame/Frame.js';
// @ts-ignore
import Reel from '../../assets/every-layout/Reel/Reel.js';

export class EveryLayout {
  private css = [
    'Imposter',
    'Icon',
    'Stack',
    'Box',
    'Center',
    'Cluster',
    'Sidebar',
    'Switcher',
    'Cover',
    'Grid',
    'Frame',
    'Reel',
  ];
  constructor() {
    new Imposter();
    new Icon();
    new Stack();
    new Box();
    new Center();
    new Cluster();
    new Sidebar();
    new Switcher();
    new Cover();
    new Grid();
    new Frame();
    new Reel();

    const promises = this.css.map((source) => {
      return this.loadStyle(`assets/every-layout/${source}/${source}.css`);
    });
    window.onload = () => {
      Promise.all(promises);
    };
    this.loadStyle(`assets/every-layout/modular-scale.css`);
  }
  private loadStyle(path: string) {
    return new Promise((resolve, reject) => {
      let link = document.createElement('link');
      link.href = path;
      link.rel = 'stylesheet';

      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`style load error for ${path}`));

      document.head.append(link);
    });
  }
}
