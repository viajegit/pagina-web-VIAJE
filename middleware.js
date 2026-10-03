// Google Tag Gateway (configuración manual, Vercel no está en la lista de
// plataformas soportadas "sin código" — esto es el proxy hecho a mano).
// Sirve las etiquetas de Google desde nuestro propio dominio (primera parte)
// en vez de googletagmanager.com/google-analytics.com directo, para que los
// bloqueadores de anuncios no las tapen. Ver:
// https://developers.google.com/tag-platform/tag-manager/gateway/setup-guide?setup=manual
export const config = {
  matcher: ['/metrics', '/metrics/:path*'],
};

const GATEWAY_HOST = 'G-CT25KLL6NB.fps.goog';

export default async function middleware(request) {
  const url = new URL(request.url);
  // Google espera la ruta reservada completa tal cual, sin recortar el
  // prefijo "/metrics" — probado en vivo: recortarlo daba "Measurement
  // path is empty." desde el endpoint de Google.
  const target = new URL(`https://${GATEWAY_HOST}${url.pathname}${url.search}`);

  const headers = new Headers(request.headers);
  headers.set('Host', GATEWAY_HOST);

  // request.geo ya no existe en el Edge Runtime actual de Vercel; la
  // geolocalización viaja como headers que el edge inyecta automáticamente.
  const country = request.headers.get('x-vercel-ip-country');
  const region = request.headers.get('x-vercel-ip-country-region');
  if (country) headers.set('X-Forwarded-Country', country);
  if (region) headers.set('X-Forwarded-Region', region);

  return fetch(target, {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  });
}
