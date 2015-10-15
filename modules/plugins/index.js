// arc internal plugins
import BoldPlugin from './bold';
import ItalicPlugin from './italic';
import H1Plugin from './h1';
import H2Plugin from './h2';
import H3Plugin from './h3';
import CenterPlugin from './center';
import QuotePlugin from './quote';
import LinkPlugin from './link';
import CodePlugin from './code';
import ImagePlugin from './image';
import YouTubePlugin from './youtube';

export default [
  { name: 'bold', src: BoldPlugin },
  { name: 'italic', src: ItalicPlugin },
  { name: 'h1', src: H1Plugin },
  { name: 'h2', src: H2Plugin },
  { name: 'h3', src: H3Plugin },
  { name: 'center', src: CenterPlugin },
  { name: 'quote', src: QuotePlugin },
  { name: 'link', src: LinkPlugin },
  { name: 'code', src: CodePlugin },
  { name: 'image', src: ImagePlugin },
  { name: 'youtube', src: YouTubePlugin },
];
