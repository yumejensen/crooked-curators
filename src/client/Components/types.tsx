type RibbonStatus = 'BLUE' | 'WHITE' | 'RED' | 'FORGERIES';

// each individual artwork
export type Artwork = {
  id: string;
  source: string;
  status: string;
};

// containers for artworks
export type Ribbon = {
  id: RibbonStatus;
  title: string;
  points: number;
  source?: string;
};
