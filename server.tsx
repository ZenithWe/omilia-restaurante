import { renderToString } from 'react-dom/server';
import App from './App';
import { business } from './business';

export const render = (): string => renderToString(<App />);
export const structuredData = {
  '@context': 'https://schema.org', '@type': 'Restaurant', name: business.name,
  description: 'Gastronomia mineira contemporânea na Vila da Serra, em Nova Lima.',
  servesCuisine: ['Mineira', 'Brasileira'], telephone: business.telephone,
  address: { '@type': 'PostalAddress', streetAddress: 'Alameda do Morro, 72, Loja 01, Vila da Serra', addressLocality: 'Nova Lima', addressRegion: 'MG', postalCode: business.postalCode, addressCountry: 'BR' },
  geo: { '@type': 'GeoCoordinates', latitude: business.latitude, longitude: business.longitude },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '12:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '17:00' },
  ],
  hasMap: business.directions,
};
