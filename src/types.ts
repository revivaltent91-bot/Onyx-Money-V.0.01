export interface Project {
  id: string;
  title: string;
  category: 'Agriculture' | 'Industrie' | 'Commerce' | 'Energie' | 'Institutionnel';
  description: string;
  yield: string;
  impactScore: number;
  image: string;
  minInvestment: number;
}

export interface Transaction {
  id: string;
  type: 'depot' | 'retrait' | 'investissement' | 'transfert_p2p' | 'dividende';
  amount: number;
  date: string;
  description: string;
  status: 'termine' | 'en_attente' | 'echoue';
}

export interface Asset {
  projectId: string;
  title: string;
  amount: number;
  sector: 'Terre' | 'Usine' | 'Boutique' | 'Energie';
}
