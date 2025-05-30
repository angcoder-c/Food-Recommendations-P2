import { GET } from '../get-products-more-likes/route';

describe('GET /api/products/get-products-more-likes', () => {
  it('should return a JSON with an array of products with correct structure', async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty('productos');
    expect(Array.isArray(body.productos)).toBe(true);

    if (body.productos.length > 0) {
      const producto = body.productos[0];
      expect(producto).toHaveProperty('nombre');
      expect(producto).toHaveProperty('tipo');
      expect(producto).toHaveProperty('img');
      expect(producto).toHaveProperty('restaurante');
      expect(producto).toHaveProperty('likes');

      expect(typeof producto.nombre).toBe('string');
      expect(typeof producto.tipo).toBe('string');
      expect(typeof producto.img).toBe('string');
      expect(typeof producto.restaurante).toBe('string');
      expect(typeof producto.likes).toBe('number');
    }
  });
});
