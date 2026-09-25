export interface ServicePeriod {
  readonly label: string;
  readonly hours: string;
}

export const business = {
  name: 'Omilía Restaurante',
  phone: '(31) 99724-2038',
  telephone: '+5531997242038',
  whatsapp: 'https://wa.me/5531997242038',
  address: 'Alameda do Morro, 72 — Loja 01',
  neighborhood: 'Vila da Serra, Nova Lima — MG',
  postalCode: '34000-000',
  latitude: -19.9771842,
  longitude: -43.9362937,
  directions: 'https://www.google.com/maps/dir/?api=1&destination=-19.9771842%2C-43.9362937',
  delivery: 'https://www.ifood.com.br/delivery/nova-lima-mg/omilia-vila-da-serra?utm_medium=ReserveGoogle',
  reference: 'https://business.google.com/v/_/03237735454575065719/d585/_?caid=23826497955&agid=195039500854',
  checkedOn: '25/09/2026',
  periods: [
    { label: 'Terça a sábado', hours: '12h à meia-noite' },
    { label: 'Domingo', hours: '12h às 17h' },
    { label: 'Segunda-feira', hours: 'Fechado' },
  ] satisfies readonly ServicePeriod[],
} as const;

export function whatsappLink(message: string): string {
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const reservationLink = whatsappLink('Olá! Gostaria de consultar a disponibilidade para uma reserva no Omilía.');
export const menuLink = whatsappLink('Olá! Gostaria de consultar o cardápio atualizado do Omilía.');

export interface OpeningStatus {
  readonly open: boolean;
  readonly text: string;
}

/** Uses the restaurant's timezone, regardless of the visitor's timezone. */
export function openingStatus(date: Date): OpeningStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes): string => parts.find(part => part.type === type)?.value ?? '';
  const day = value('weekday');
  const minute = Number(value('hour')) * 60 + Number(value('minute'));
  const closesAt = day === 'Sun' ? 17 * 60 : 24 * 60;
  const open = day !== 'Mon' && minute >= 12 * 60 && minute < closesAt;
  return { open, text: open ? `Aberto agora · até ${day === 'Sun' ? '17h' : 'meia-noite'}` : 'Fechado agora · veja os horários' };
}
