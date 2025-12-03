import { Site } from '@/types/site'

export const kolnSites: Site[] = [
  {
    id: 'cologne-cathedral',
    name: 'Cologne Cathedral (Kölner Dom)',
    description: 'Iconic Gothic cathedral and UNESCO World Heritage Site. Climb 533 steps to the tower for breathtaking city views. Houses the Shrine of the Three Kings.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cologne_cathedral_aerial_%2825326253726%29_b.jpg/250px-Cologne_cathedral_aerial_%2825326253726%29_b.jpg',
    duration: '2-3 hours',
    crowdLevel: 'high',
    rating: 4.9,
    popularity: 'must-see',
    category: 'Cathedral',
    coordinates: { lat: 50.9413, lng: 6.9583 }
  },
  {
    id: 'old-town',
    name: 'Old Town (Altstadt)',
    description: 'Historic heart of Cologne with colorful buildings, traditional brewhouses, and charming squares. Perfect for exploring German culture and trying authentic Kölsch beer.',
    image: 'https://latlon-guide.com/images_latlon/Cologne/Fischmarkt_altstadt_copyright_Jens_Korte_KoelnTourismusGmbH.jpg',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.7,
    popularity: 'must-see',
    category: 'Neighborhood',
    coordinates: { lat: 50.9375, lng: 6.9603 }
  },
  {
    id: 'hohenzollern-bridge',
    name: 'Hohenzollern Bridge',
    description: 'Famous bridge adorned with thousands of love locks. Offers stunning views of the cathedral and Rhine River, especially at sunset.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Hohenzollernbr%C3%BCcke_K%C3%B6ln_von_oben.jpg',
    duration: '30-45 min',
    crowdLevel: 'medium',
    rating: 4.8,
    popularity: 'must-see',
    category: 'Landmark',
    coordinates: { lat: 50.9411, lng: 6.9658 }
  },
  {
    id: 'chocolate-museum',
    name: 'Chocolate Museum',
    description: 'Interactive museum showcasing 5,000 years of chocolate history. Features a chocolate fountain and offers tastings. Perfect for families and chocolate lovers.',
    image: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/md16bvioqmlinp1vhsha/Chocolate%20Museum%20Entry%20Ticket%20in%20Cologne.jpg',
    duration: '1.5-2 hours',
    crowdLevel: 'medium',
    rating: 4.6,
    popularity: 'popular',
    category: 'Museum',
    coordinates: { lat: 50.9319, lng: 6.9649 }
  },
  {
    id: 'rhine-river-cruise',
    name: 'Rhine River Cruise',
    description: 'Relaxing boat ride along the historic Rhine offering unique views of Cologne\'s skyline, bridges, and riverside architecture.',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/36/4b/df.jpg',
    duration: '1 hour',
    crowdLevel: 'low',
    rating: 4.5,
    popularity: 'popular',
    category: 'Experience',
    coordinates: { lat: 50.9370, lng: 6.9603 }
  },
  {
    id: 'belgian-quarter',
    name: 'Belgian Quarter',
    description: 'Trendy neighborhood with boutique shops, cafes, and street art. Known for its vibrant nightlife and multicultural atmosphere.',
    image: 'https://dam.destination.one/2680569/73fe80cf7fca54e448b937829b19dd802a5bcb7bad3a9dd1250337ee830a0c14/belgian-quarter.jpg',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.6,
    popularity: 'popular',
    category: 'Neighborhood',
    coordinates: { lat: 50.9333, lng: 6.9350 }
  },
  {
    id: 'roman-germanic-museum',
    name: 'Roman-Germanic Museum',
    description: 'Archaeological museum displaying Roman artifacts found in Cologne. Houses the famous Dionysus mosaic and ancient glass collection.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sepulcher_of_Poblicius_R%C3%B6misch-Germanisches_Museum_Cologne_2.jpg/250px-Sepulcher_of_Poblicius_R%C3%B6misch-Germanisches_Museum_Cologne_2.jpg',
    duration: '1-1.5 hours',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'hidden-gem',
    category: 'Museum',
    coordinates: { lat: 50.9407, lng: 6.9581 }
  },
  {
    id: 'cologne-zoo',
    name: 'Cologne Zoo',
    description: 'One of Germany\'s oldest zoos featuring over 10,000 animals. Includes impressive aquarium and tropical rainforest house.',
    image: 'https://dam.destination.one/2979416/ccee643b1aa733904053d8be1e5dc807577ebf408722937edc8a4a0d5c395f9f/cologne-zoo.jpg',
    duration: '2-3 hours',
    crowdLevel: 'medium',
    rating: 4.6,
    popularity: 'popular',
    category: 'Attraction',
    coordinates: { lat: 50.9589, lng: 6.9742 }
  },
  {
    id: 'kolumba-museum',
    name: 'Kolumba Museum',
    description: 'Award-winning art museum built over medieval church ruins. Combines ancient foundations with modern architecture by Peter Zumthor.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Kolumba.jpg',
    duration: '1.5-2 hours',
    crowdLevel: 'low',
    rating: 4.7,
    popularity: 'hidden-gem',
    category: 'Museum',
    coordinates: { lat: 50.9394, lng: 6.9492 }
  },
  {
    id: 'rheinpark',
    name: 'Rheinpark',
    description: 'Expansive riverside park perfect for picnics, jogging, and relaxing. Take the cable car across the Rhine for panoramic city views.',
    image: 'https://dam.destination.one/173411/2cc1c56308aa0bd95922f6e99b9c6a323e02f9a582c9e62fcaf84bba2d573d64/rhine-park.jpg',
    duration: '1-2 hours',
    crowdLevel: 'low',
    rating: 4.5,
    popularity: 'popular',
    category: 'Park',
    coordinates: { lat: 50.9475, lng: 6.9847 }
  },
  {
    id: 'eau-de-cologne',
    name: 'Farina Fragrance Museum',
    description: 'Birthplace of Eau de Cologne (Kölnisch Wasser). Learn about the 300-year history of the world\'s oldest fragrance brand.',
    image: 'https://cdn.regiondo.net/media/catalog/product/b/i/big-ticket-image-688249d576a61324702970-cropped600-400.jpg',
    duration: '1 hour',
    crowdLevel: 'low',
    rating: 4.4,
    popularity: 'hidden-gem',
    category: 'Museum',
    coordinates: { lat: 50.9367, lng: 6.9572 }
  },
  {
    id: 'st-gereon',
    name: 'St. Gereon\'s Basilica',
    description: 'Remarkable Romanesque church with a unique decagonal dome. One of twelve Romanesque churches in Cologne\'s historic center.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/St._Gereon_K%C3%B6ln_-_Ostseite_%282520%29.jpg',
    duration: '30-45 min',
    crowdLevel: 'low',
    rating: 4.6,
    popularity: 'hidden-gem',
    category: 'Church',
    coordinates: { lat: 50.9431, lng: 6.9464 }
  }
]
