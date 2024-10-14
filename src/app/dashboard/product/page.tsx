import { Form } from './components/form';

import { api } from '@/services/api';
import { getCookiesSever } from '@/lib/cookieServer';

export default async function Category() {
  const token = getCookiesSever();

  const response = await api.get("/category/list", {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <main>
      <Form categories={response.data} />
    </main>
  );
}