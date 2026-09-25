import { useEffect, useRef, useState } from 'react';
import type { SVGProps } from 'react';
import { business, menuLink, openingStatus, reservationLink } from './business';
import type { OpeningStatus } from './business';

function Arrow(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Pin() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

function LiveHours() {
  const [status, setStatus] = useState<OpeningStatus | null>(null);
  useEffect(() => {
    const update = () => setStatus(openingStatus(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return <a className="opening-status" href="#visite" data-open={status?.open ?? false}>
    <span className="status-dot" aria-hidden="true" />
    {status?.text ?? 'Almoço e jantar na Vila da Serra'}
  </a>;
}

const navigation = [
  { href: '#essencia', label: 'Nossa essência' },
  { href: '#cozinha', label: 'A cozinha' },
  { href: '#visite', label: 'Sua visita' },
] as const;

export default function App() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);
  const closeMenu = () => { if (mobileMenu.current) mobileMenu.current.open = false; };

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="wordmark" href="#inicio" aria-label="Omilía Restaurante, início">omilía<span>RESTAURANTE</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <a className="button header-reservation" href={reservationLink} target="_blank" rel="noopener noreferrer">Reservar uma mesa <Arrow /></a>
      <details className="mobile-menu" ref={mobileMenu}>
        <summary aria-label="Abrir ou fechar menu"><span /><span /></summary>
        <nav aria-label="Navegação móvel">{navigation.map(item => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}<a href={reservationLink} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Consultar reserva <Arrow /></a></nav>
      </details>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span />GASTRONOMIA MINEIRA CONTEMPORÂNEA</p>
          <h1 id="hero-title">Minas à mesa.<br /><em>Conversa</em><br />sem pressa.</h1>
          <p className="hero-description">Um encontro entre as nossas raízes e novas maneiras de saborear. No coração da Vila da Serra.</p>
          <div className="hero-actions"><a className="button primary" href={reservationLink} target="_blank" rel="noopener noreferrer">Reserve seu momento <Arrow /></a><a className="text-link" href="#cozinha">Conheça a cozinha</a></div>
          <LiveHours />
        </div>
        <figure className="hero-image">
          <img src="cozinha-mineira.webp" width="1536" height="1024" alt="Composição ilustrativa de peixe com crosta dourada, risoto de tomate e pesto em prato artesanal" fetchPriority="high" />
          <div className="image-label"><span>À MESA</span><p>Sabores que<br />puxam conversa.</p></div>
          <figcaption>Imagem ilustrativa</figcaption>
        </figure>
        <a className="hero-location" href="#visite"><Pin /><span>VILA DA SERRA<br /><strong>NOVA LIMA, MG</strong></span></a>
      </section>

      <div className="intro-strip" aria-label="Nossa proposta"><span>Raízes mineiras</span><span aria-hidden="true">✳</span><span>Olhar contemporâneo</span><span aria-hidden="true">✳</span><span>Boa conversa</span></div>

      <section className="essence section-shell" id="essencia" aria-labelledby="essence-title">
        <div className="section-note"><span className="section-number">01 / A ESSÊNCIA</span><p>omilía <em>/ substantivo</em><br /><strong>Do grego, conversar.</strong></p></div>
        <div className="essence-main"><h2 id="essence-title">À mesa, a gente<br />se <em>encontra.</em></h2><div className="essence-bottom"><p>A cozinha do Omilía parte de Minas: seus ingredientes, pequenos produtores e histórias. A tradição ganha uma leitura contemporânea, feita para acompanhar os encontros que merecem tempo.</p><a href={reservationLink} className="round-link" target="_blank" rel="noopener noreferrer" aria-label="Conversar sobre uma reserva"><Arrow /></a></div></div>
      </section>

      <section className="kitchen section-shell" id="cozinha" aria-labelledby="kitchen-title">
        <div className="kitchen-heading"><span className="section-number">02 / A COZINHA</span><h2 id="kitchen-title">O conhecido.<br /><em>O surpreendente.</em></h2><p>Ingredientes da nossa terra.<br />Um jeito próprio de combinar.</p></div>
        <article className="dish-card"><span className="dish-tag">UM SABOR DO OMILÍA</span><h3>Tilápia na farinha<br />de pão de queijo</h3><p>Peixe de crosta dourada, acompanhado de risoto com tomate confitado e pesto de manjericão.</p><div className="dish-rule" /><a className="text-link" href={menuLink} target="_blank" rel="noopener noreferrer">Consultar cardápio completo <Arrow /></a><small>Consulte os valores e a disponibilidade com a equipe.</small></article>
      </section>

      <section className="visit section-shell" id="visite" aria-labelledby="visit-title">
        <div className="visit-intro"><span className="section-number">03 / SUA VISITA</span><h2 id="visit-title">A próxima<br />conversa pode<br />ser <em>aqui.</em></h2><p>Venha para o almoço.<br />Fique para o encontro.</p><a className="button primary" href={reservationLink} target="_blank" rel="noopener noreferrer">Consultar reserva <Arrow /></a></div>
        <div className="visit-details"><div className="address-block"><span className="eyebrow">ONDE ESTAMOS</span><address>{business.address}<br />{business.neighborhood}<br /><span>CEP {business.postalCode}</span></address><a className="text-link" href={business.directions} target="_blank" rel="noopener noreferrer">Traçar minha rota <Arrow /></a></div><div className="hours-block"><span className="eyebrow">HORÁRIOS DA CASA</span><dl>{business.periods.map(period => <div key={period.label}><dt>{period.label}</dt><dd>{period.hours}</dd></div>)}</dl><p className="hours-note">Em feriados e datas especiais, confirme com a equipe.</p></div><div className="contact-block"><a href={`tel:${business.telephone}`}>{business.phone}</a><a className="text-link" href={business.delivery} target="_blank" rel="noopener noreferrer">Pedir no iFood <Arrow /></a></div></div>
      </section>
      <section className="closing" aria-label="Contato"><p>A mesa aproxima.</p><a href={reservationLink} target="_blank" rel="noopener noreferrer">A conversa fica.<Arrow /></a></section>
    </main>

    <footer className="site-footer"><a className="wordmark" href="#inicio" aria-label="Omilía, voltar ao início">omilía<span>RESTAURANTE</span></a><p>Gastronomia mineira contemporânea.<br />Vila da Serra · Nova Lima</p><a className="footer-contact" href={business.whatsapp} target="_blank" rel="noopener noreferrer">Fale com o Omilía <Arrow /></a><div className="footer-bottom"><span>Omilía Restaurante · 2026</span><a href={business.reference} target="_blank" rel="noopener noreferrer">Conheça o perfil no Google</a></div></footer>
  </>;
}
