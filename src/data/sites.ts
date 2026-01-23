// Site data for Guadeloupe Island
// Standortdaten für die Insel Guadeloupe
import { Site } from '@/types/site'

export const guadeloupeSites: Site[] = [
  {
    id: 'la-soufriere',
    name: 'La Soufrière Volcano',
    description: 'Active volcano and highest peak in the Lesser Antilles at 1,467m. Challenging hike through tropical rainforest with stunning crater views and sulfur vents.',
    image: 'https://www.vert-intense.com/wp-content/uploads/2023/08/soufriere_guadeloupe001-e1700262658112.jpg',
    duration: '4-6 hours',
    crowdLevel: 'medium',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Nature',
    coordinates: { lat: 16.0447, lng: -61.6647 }
  },
  {
    id: 'pointe-des-chateaux',
    name: 'Pointe des Châteaux',
    description: 'Dramatic rocky peninsula where the Atlantic Ocean meets the Caribbean Sea. Features stunning coastal views, a cross monument, and pristine beaches.',
    image: 'https://karibbeancars.fr/wp-content/uploads/2019/02/80635600.jpg',
    duration: '2-3 hours',
    crowdLevel: 'high',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Landmark',
    coordinates: { lat: 16.2450, lng: -61.1700 }
  },
  {
    id: 'carbet-falls',
    name: 'Carbet Falls',
    description: 'Three spectacular waterfalls cascading through lush rainforest in the Basse-Terre National Park. The second fall (110m) is the most accessible.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/c0/50/36/carbet-falls-chutes-de.jpg?w=1200&h=-1&s=1',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.7,
    popularity: 'must-see',
    category: 'Nature',
    coordinates: { lat: 16.0167, lng: -61.7000 }
  },
  {
    id: 'memorial-acte',
    name: 'Memorial ACTe',
    description: 'World-class museum dedicated to the history and memory of slavery and the slave trade. Housed in a striking modern building in Pointe-à-Pitre.',
    image: 'https://memoire-esclavage.org/sites/default/files/styles/large/public/2021-06/memorial-acte-vacance-guadeloupe.jpeg?itok=k88SyUHR',
    duration: '2-3 hours',
    crowdLevel: 'low',
    rating: 4.8,
    popularity: 'popular',
    category: 'Museum',
    coordinates: { lat: 16.2400, lng: -61.5350 }
  },
  {
    id: 'grande-anse-beach',
    name: 'Grande Anse Beach',
    description: 'Long golden sand beach on Basse-Terre with calm waters, palm trees, and local food vendors. Perfect for swimming and relaxation.',
    image: 'https://www.lodge-coco.com/wp-content/uploads/2020/05/Plage-Grande-Anse-Deshaies-Guadeloupe-1000.jpg',
    duration: '2-4 hours',
    crowdLevel: 'medium',
    rating: 4.7,
    popularity: 'popular',
    category: 'Beach',
    coordinates: { lat: 16.3000, lng: -61.7900 }
  },
  {
    id: 'cousteau-reserve',
    name: 'Jacques Cousteau Reserve',
    description: 'Protected marine park around Pigeon Island with coral reefs, sea turtles, and tropical fish. Premier snorkeling and diving destination.',
    image: 'https://www.rentiles.fr/client/cache/_webp/contenu/615_461_1527770137_80_615_461____1__image-principale_1140.webp',
    duration: '3-4 hours',
    crowdLevel: 'medium',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Experience',
    coordinates: { lat: 16.1667, lng: -61.7833 }
  },
  {
    id: 'les-saintes',
    name: 'Les Saintes Archipelago',
    description: 'Charming island group with Fort Napoleon, Pain de Sucre beach, and colorful villages. Day trip by ferry from Trois-Rivières.',
    image: 'https://www.lesilesdeguadeloupe.com/app/uploads/2025/02/guadeloupe-19797-aurelien-brusini-1.webp',
    duration: '6-8 hours',
    crowdLevel: 'medium',
    rating: 4.8,
    popularity: 'popular',
    category: 'Experience',
    coordinates: { lat: 15.8667, lng: -61.5833 }
  },
  {
    id: 'pointe-noire',
    name: 'Pointe-Noire',
    description: 'Picturesque coastal village known for wood crafts, vanilla plantations, and beautiful black sand beaches. Gateway to the rainforest.',
    image: 'https://www.lesilesdeguadeloupe.com/app/uploads/2025/07/pointenoire-plage-petiteanse-5-min.webp',
    duration: '2-3 hours',
    crowdLevel: 'low',
    rating: 4.5,
    popularity: 'hidden-gem',
    category: 'Village',
    coordinates: { lat: 16.2067, lng: -61.7800 }
  },
  {
    id: 'distillery-damoiseau',
    name: 'Damoiseau Distillery',
    description: 'Working rum distillery offering tours and tastings. Learn about traditional rhum agricole production on Grande-Terre.',
    image: 'https://www.france-voyage.com/visuals/photos/distillerie-damoiseau-29162_w600.webp',
    duration: '1-2 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'popular',
    category: 'Experience',
    coordinates: { lat: 16.3300, lng: -61.4300 }
  },
  {
    id: 'la-desirade',
    name: 'La Désirade Island',
    description: 'Remote, peaceful island with unspoiled beaches, hiking trails, and traditional Creole culture. Accessible by ferry from Saint-François.',
    image: 'https://i0.wp.com/guadeloupe-destination.com/wp-content/uploads/2019/11/desirade-01.jpg?fit=1029%2C684&ssl=1',
    duration: '6-8 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'hidden-gem',
    category: 'Island',
    coordinates: { lat: 16.3167, lng: -61.0167 }
  },
  {
    id: 'jardin-botanique',
    name: 'Botanical Garden of Deshaies',
    description: 'Stunning 7-hectare tropical garden with exotic plants, waterfalls, and colorful birds. Former property of French singer Coluche.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdg4EVczDniAnCEggQAA6jXG0VYcoK1mptPg&s',
    duration: '1.5-2 hours',
    crowdLevel: 'low',
    rating: 4.7,
    popularity: 'popular',
    category: 'Garden',
    coordinates: { lat: 16.3100, lng: -61.7950 }
  },
  {
    id: 'port-louis',
    name: 'Port-Louis Beach',
    description: 'Beautiful beach with golden sand and turquoise waters on Grande-Terre\'s north coast. Popular for swimming and local cuisine.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VDKbMGFE9jjhO7WOt6CL19GTykh983lT4g&s',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.5,
    popularity: 'popular',
    category: 'Beach',
    coordinates: { lat: 16.4300, lng: -61.5300 }
  }
]
