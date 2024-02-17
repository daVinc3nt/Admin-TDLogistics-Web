import useSWR, { mutate } from 'swr';
import { Order } from './types';

const url = 'https://65cfd4b8bdb50d5e5f5bdf8e.mockapi.io';

async function updateRequest(id: number, data: Order) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Order) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(id: number) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

async function getRequest() {
  const res = await fetch(`${url}/consignment`);
  const data = await res.json();
  const orders: Order[] = data.flatMap((consignment) => consignment.orders);
  return orders;
}

export default function useData() {
  const { data, isValidating } = useSWR(url, getRequest);

  const updateRow = async (id: number, postData: Order) => {
    await updateRequest(id, postData);
    mutate(url);
  };

  const deleteRow = async (id: number) => {
    await deleteRequest(id);
    mutate(url);
  };

  const addRow = async (postData: Order) => {
    await addRequest(postData);
    mutate(url);
  };

  return {
    data: data ?? [],
    isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
