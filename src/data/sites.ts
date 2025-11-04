import { Site } from '@/types/site'

export const sevillaSites: Site[] = [
  {
    id: 'real-alcazar',
    name: 'Real Alcázar',
    description: 'Stunning royal palace with intricate Mudéjar architecture and lush gardens. A UNESCO World Heritage Site and Game of Thrones filming location.',
    image: 'https://images.unsplash.com/photo-1634156593845-2c0520bdd2f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287',
    duration: '2-3 hours',
    crowdLevel: 'high',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Palace'
  },
  {
    id: 'seville-cathedral',
    name: 'Seville Cathedral & Giralda',
    description: "The world's largest Gothic cathedral housing Christopher Columbus' tomb. Climb the Giralda tower for panoramic city views.",
    image: 'https://images.unsplash.com/photo-1753200012907-9798e03196bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2642',
    duration: '1.5-2 hours',
    crowdLevel: 'high',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Cathedral'
  },
  {
    id: 'plaza-espana',
    name: 'Plaza de España',
    description: 'Magnificent semicircular plaza built for the 1929 Ibero-American Exposition, featuring stunning tilework representing Spanish provinces.',
    image: 'https://plus.unsplash.com/premium_photo-1694475226740-236c5c28548b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940',
    duration: '1-1.5 hours',
    crowdLevel: 'medium',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Plaza'
  },
  {
    id: 'barrio-santa-cruz',
    name: 'Barrio de Santa Cruz',
    description: 'Charming former Jewish quarter with narrow winding streets, whitewashed houses, orange trees, and hidden plazas.',
    image: 'https://images.unsplash.com/photo-1661691050111-dfe0ada450df?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1288',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.7,
    popularity: 'must-see',
    category: 'Neighborhood'
  },
  {
    id: 'metropol-parasol',
    name: 'Metropol Parasol',
    description: "Modern wooden structure nicknamed 'Las Setas' (The Mushrooms). Walk the rooftop walkway for sunset views over the old town.",
    image: 'https://images.unsplash.com/photo-1708766196685-90270cb8dd50?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335',
    duration: '45 min - 1 hour',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'popular',
    category: 'Architecture'
  },
  {
    id: 'flamenco-triana',
    name: 'Flamenco in Triana',
    description: 'Experience authentic flamenco in the Triana neighborhood, the birthplace of this passionate art form.',
    image: 'https://images.unsplash.com/photo-1603187405780-3becb5aee688?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1344',
    duration: '1.5-2 hours',
    crowdLevel: 'medium',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Experience'
  },
  {
    id: 'maria-luisa-park',
    name: 'Parque de María Luisa',
    description: 'Beautiful public park with fountains, monuments, and shaded paths. Perfect for a relaxing stroll away from the crowds.',
    image: 'https://sevillecityguide.com/images/pabellon-mudejar-sevilla.jpg',
    duration: '1-2 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'popular',
    category: 'Park'
  },
  {
    id: 'torre-del-oro',
    name: 'Torre del Oro',
    description: '13th-century Moorish watchtower on the Guadalquivir River. Now houses a maritime museum with city history.',
    image: 'https://crucerosensevilla.com/wp-content/uploads/2023/12/forma-torre-del-oro.jpg',
    duration: '30-45 min',
    crowdLevel: 'low',
    rating: 4.3,
    popularity: 'popular',
    category: 'Monument'
  },
  {
    id: 'triana-market',
    name: 'Mercado de Triana',
    description: 'Historic market in Triana district offering fresh produce, tapas bars, and local atmosphere. Great for food lovers.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/c2/d7/95/photo1jpg.jpg?w=1200&h=-1&s=1',
    duration: '1-1.5 hours',
    crowdLevel: 'medium',
    rating: 4.5,
    popularity: 'hidden-gem',
    category: 'Market'
  },
  {
    id: 'casa-de-pilatos',
    name: 'Casa de Pilatos',
    description: 'Magnificent 16th-century palace blending Italian Renaissance and Spanish Mudéjar styles. Often less crowded than the Alcázar.',
    image: 'https://crucerosensevilla.com/wp-content/uploads/2025/05/patio-principal-casa-de-pilatos.jpg',
    duration: '1-1.5 hours',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'hidden-gem',
    category: 'Palace'
  },
  {
    id: 'archivo-indias',
    name: 'Archivo de Indias',
    description: 'Renaissance building housing invaluable documents about Spanish colonies in the Americas. UNESCO World Heritage Site.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Archivo_de_Indias_002.jpg',
    duration: '30-45 min',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'hidden-gem',
    category: 'Museum'
  },
  {
    id: 'guadalquivir-cruise',
    name: 'Guadalquivir River Cruise',
    description: 'Relaxing boat ride along the historic river offering unique views of Sevilla\'s monuments and bridges.',
    image: 'https://marinalia.es/6429-large_default/boat-tour-sevilla.jpg',
    duration: '1 hour',
    crowdLevel: 'low',
    rating: 4.5,
    popularity: 'popular',
    category: 'Experience'
  }
]
