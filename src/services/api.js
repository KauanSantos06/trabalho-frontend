const BASE_URL = 'http://localhost:3001';

export async function getSensores() {
  const response = await fetch(`${BASE_URL}/sensores`);
  if (!response.ok) {
    throw new Error('Erro ao carregar sensores');
  }
  return response.json();
}

// Opcional: função para adicionar um sensor (POST)
export async function addSensor(sensor) {
  const response = await fetch(`${BASE_URL}/sensores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sensor),
  });
  if (!response.ok) {
    throw new Error('Erro ao adicionar sensor');
  }
  return response.json();
}