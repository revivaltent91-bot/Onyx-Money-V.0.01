import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'cacao-1',
    title: 'Coopérative Cacao Excellence',
    category: 'Agriculture',
    description: 'Financement de la récolte et du stockage pour 500 planteurs.',
    yield: '12%',
    impactScore: 95,
    image: 'https://images.unsplash.com/photo-1590005354167-6da97870c91c?auto=format&fit=crop&w=800&q=80',
    minInvestment: 5000,
  },
  {
    id: 'soja-1',
    title: 'Transformation Soja Bio',
    category: 'Industrie',
    description: 'Unité de production de lait et farine de soja locale.',
    yield: '15%',
    impactScore: 88,
    image: 'https://images.unsplash.com/photo-1594488651129-75324eef5181?auto=format&fit=crop&w=800&q=80',
    minInvestment: 10000,
  },
  {
    id: 'solaire-1',
    title: 'Énergie Solaire Villageoise',
    category: 'Energie',
    description: 'Installation de kits solaires pour 3 villages reculés.',
    yield: '10%',
    impactScore: 98,
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&w=800&q=80',
    minInvestment: 5000,
  },
  {
    id: 'boutique-1',
    title: 'Réseau de Boutiques de Quartier',
    category: 'Commerce',
    description: 'Modernisation de 10 points de vente de produits locaux.',
    yield: '18%',
    impactScore: 75,
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80',
    minInvestment: 5000,
  },
  {
    id: 'ecobank-1',
    title: 'Fonds de Stabilité Ecobank',
    category: 'Institutionnel',
    description: 'Placement sécurisé pour la liquidité du portefeuille.',
    yield: '6%',
    impactScore: 60,
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80',
    minInvestment: 25000,
  }
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', value: 100000 },
  { name: 'Fév', value: 105000 },
  { name: 'Mar', value: 112000 },
  { name: 'Avr', value: 118000 },
  { name: 'Mai', value: 125000 },
  { name: 'Juin', value: 140000 },
];
